import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Patient } from "../models/patient.model.js";
import { MedicalHistory } from "../models/medical_history.model.js";
// import { LabReport } from "../models/lab_report.model.js";
import { MedicalRecord } from "../models/medical_record.model.js";
// import { LabRequest } from "../models/lab_request.model.js";
import { Appointment } from "../models/appointment.model.js";
// import { Admission } from "../models/admission.model.js";

const patientProfile = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(patientId)) {
  //   throw new ApiError(400, "Invalid patient ID");
  // }

  const patient = await Patient.findOne({username: patientId}).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry");

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, patient, "Patient profile fetched successfully"));
});

const patientMedicalHistory = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patient = await Patient.findOne({username: patientId})
  if(!patient){
    throw new ApiError(404, "Patient not found");
  }

  const medicalHistory = await MedicalHistory.findOne({ patient_id: patient._id })
    .populate("patient_id", "fullname email phone");

  if (!medicalHistory) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No medical history found"));
  }

  const recordIds = medicalHistory.medical_record.map(id => new mongoose.Types.ObjectId(id));
  
  const medicalRecords = await MedicalRecord.find({ _id: { $in: recordIds } })
    .populate("doctor_id", "fullname");

  return res
    .status(200)
    .json(new ApiResponse(200, { 
      patient: medicalHistory.patient_id,
      medical_records: medicalRecords
    }, "Medical history fetched successfully"));
});

const addMedicalRecord = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const { diagnosis, prescription, notes } = req.body;

  console.log(patientId)

  // if (!mongoose.Types.ObjectId.isValid(patientId)) {
  //   throw new ApiError(400, "Invalid patient ID");
  // }

  if (!diagnosis || !prescription || !notes) {
    throw new ApiError(400, "Diagnosis, prescription, and notes are required");
  }

  const patient = await Patient.findOne({username: patientId})
  if(!patient){
    throw new ApiError(404, "Patient not found");
  }

  const doctorId = req.user._id;

  const medicalRecord = await MedicalRecord.create({
    patient_id: patient._id,
    doctor_id: doctorId,
    diagnosis,
    prescription,
    notes,
    date: new Date(),
  });

  let medicalHistory = await MedicalHistory.findOne({ patient_id: patient._id });
  if (medicalHistory) {
    medicalHistory.medical_record.push(medicalRecord._id);
    await medicalHistory.save();
  } else {
    await MedicalHistory.create({
      patient_id: patient._id,
      medical_record: [medicalRecord._id],
      lap_report: [],
      admission_history: [],
    });
  }

  const createdRecord = await MedicalRecord.findById(medicalRecord._id)
    .populate("doctor_id", "fullname");

  return res
    .status(201)
    .json(new ApiResponse(201, createdRecord, "Medical record added successfully"));
});

const seeAppointment = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const { status, date } = req.query;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let query = { doctor_id: doctorId, date: { $gte: today } };

  if (status) {
    query.status = status;
  }

  if (date) {
    query.date = new Date(date);
  }

  const appointments = await Appointment.find(query)
    .populate("patient_id", "fullname email phone")
    .populate("doctor_id", "fullname")
    .sort({ date: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, appointments, "Appointments fetched successfully"));
});

export {
    patientProfile,
    patientMedicalHistory,
    addMedicalRecord,
    seeAppointment,
}
