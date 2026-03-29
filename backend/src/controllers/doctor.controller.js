import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Patient } from "../models/patient.model.js";
import { MedicalHistory } from "../models/medical_history.model.js";
import { LabReport } from "../models/lab_report.model.js";
import { MedicalRecord } from "../models/medical_record.model.js";
import { LabRequest } from "../models/lab_request.model.js";
import { Appointment } from "../models/appointment.model.js";
import { Admission } from "../models/admission.model.js";

const patientProfile = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const patient = await Patient.findById(patientId).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry");

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, patient, "Patient profile fetched successfully"));
});

const patientMedicalHistory = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const medicalHistory = await MedicalHistory.findOne({ patient_id: patientId })
    .populate("patient_id", "fullname email phone");

  if (!medicalHistory) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No medical history found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, medicalHistory, "Medical history fetched successfully"));
});

const labAllReport = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const reports = await LabReport.find({ patient_id: patientId })
    .populate({
      path: "order_id",
      populate: [
        { path: "patient_id", select: "fullname" },
        { path: "test_id", select: "test_name" },
      ],
    })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, reports, "Lab reports fetched successfully"));
});

const labReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reportId)) {
    throw new ApiError(400, "Invalid report ID");
  }

  const report = await LabReport.findById(reportId).populate({
    path: "order_id",
    populate: [
      { path: "patient_id", select: "fullname" },
      { path: "test_id", select: "test_name" },
    ],
  });

  if (!report) {
    throw new ApiError(404, "Lab report not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, report, "Lab report fetched successfully"));
});

const addMedicalRecord = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const { diagnosis, prescription, notes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  if (!diagnosis || !prescription || !notes) {
    throw new ApiError(400, "Diagnosis, prescription, and notes are required");
  }

  const doctorId = req.user._id;

  const medicalRecord = await MedicalRecord.create({
    patient_id: patientId,
    doctor_id: doctorId,
    diagnosis,
    prescription,
    notes,
    date: new Date(),
  });

  let medicalHistory = await MedicalHistory.findOne({ patient_id: patientId });
  if (medicalHistory) {
    medicalHistory.medical_record.push(medicalRecord._id);
    await medicalHistory.save();
  } else {
    await MedicalHistory.create({
      patient_id: patientId,
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

const requestLabTest = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const { testId, sample_collected_date, report_date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  if (!testId || !sample_collected_date || !report_date) {
    throw new ApiError(400, "Test ID, sample collection date, and report date are required");
  }

  const doctorId = req.user._id;

  const labRequest = await LabRequest.create({
    patient_id: patientId,
    doctor_id: doctorId,
    test_id: testId,
    status: "pending",
    sample_collected_date,
    report_date,
  });

  const createdRequest = await LabRequest.findById(labRequest._id)
    .populate("patient_id", "fullname")
    .populate("doctor_id", "fullname")
    .populate("test_id", "test_name test_cost");

  return res
    .status(201)
    .json(new ApiResponse(201, createdRequest, "Lab test requested successfully"));
});

const seeAppointment = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;
  const { status, date } = req.query;

  let query = { doctor_id: doctorId };

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

const approveDischarge = asyncHandler(async (req, res) => {
  const { admissionId } = req.params;
  const { dischargeSummary } = req.body;

  if (!mongoose.Types.ObjectId.isValid(admissionId)) {
    throw new ApiError(400, "Invalid admission ID");
  }

  const admission = await Admission.findById(admissionId);
  if (!admission) {
    throw new ApiError(404, "Admission not found");
  }

  if (admission.status === "discharged") {
    throw new ApiError(400, "Patient already discharged");
  }

  admission.status = "discharged";
  admission.discharge_date = new Date();
  
  if (dischargeSummary) {
    admission.discharge_summary = dischargeSummary;
  }

  await admission.save();

  const medicalHistory = await MedicalHistory.findOne({ patient_id: admission.patient_id });
  if (medicalHistory) {
    medicalHistory.admission_history.push(admission._id);
    await medicalHistory.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, admission, "Patient discharge approved successfully"));
});

export {
    patientProfile,
    patientMedicalHistory,
    labAllReport,
    LabReport,
    addMedicalRecord,
    requestLabTest,
    seeAppointment,
    approveDischarge
}
