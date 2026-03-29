import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Patient } from "../models/patient.model.js";
import { MedicalHistory } from "../models/medical_history.model.js";
import { NursingNote } from "../models/nursing_note.model.js";
import { Admission } from "../models/admission.model.js";

const viewPatientProfile = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const patient = await Patient.findById(patientId).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry -providerIds");

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const admissions = await Admission.find({ patient_id: patientId, status: "admitted" })
    .populate({
      path: "bed_id",
      populate: { path: "ward", select: "ward_no" }
    })
    .sort({ createdAt: -1 });

  const nursingNotes = await NursingNote.find({ admission_id: { $in: admissions.map(a => a._id) } })
    .populate("nurse_id", "fullname")
    .sort({ recorded_at: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { patient, admissions, nursingNotes }, "Patient profile fetched successfully"));
});

const viewPatientMedicalHistory = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const medicalHistory = await MedicalHistory.findOne({ patient_id: patientId })
    .populate({
      path: "medical_record",
      populate: { path: "doctor_id", select: "fullname" }
    });

  if (!medicalHistory) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No medical history found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, medicalHistory, "Medical history fetched successfully"));
});

const recordNursingNote = asyncHandler(async (req, res) => {
  const { admissionId } = req.params;
  const { note } = req.body;

  if (!admissionId || !note) {
    throw new ApiError(400, "Admission ID and note are required");
  }

  if (!mongoose.Types.ObjectId.isValid(admissionId)) {
    throw new ApiError(400, "Invalid admission ID");
  }

  const admission = await Admission.findById(admissionId);
  if (!admission) {
    throw new ApiError(404, "Admission not found");
  }

  const nurseId = req.user._id;

  const nursingNote = await NursingNote.create({
    admission_id: admissionId,
    nurse_id: nurseId,
    note,
    recorded_at: new Date(),
  });

  const createdNote = await NursingNote.findById(nursingNote._id)
    .populate("nurse_id", "fullname");

  return res
    .status(201)
    .json(new ApiResponse(201, createdNote, "Nursing note recorded successfully"));
});

const updatePatientStatus = asyncHandler(async (req, res) => {
  const { admissionId } = req.params;
  const { status } = req.body;

  if (!admissionId || !status) {
    throw new ApiError(400, "Admission ID and status are required");
  }

  if (!mongoose.Types.ObjectId.isValid(admissionId)) {
    throw new ApiError(400, "Invalid admission ID");
  }

  const validStatuses = ["admitted", "discharged", "critical", "stable", "observation"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const admission = await Admission.findById(admissionId);
  if (!admission) {
    throw new ApiError(404, "Admission not found");
  }

  admission.status = status;
  await admission.save();

  return res
    .status(200)
    .json(new ApiResponse(200, admission, "Patient status updated successfully"));
});

export {
  viewPatientProfile,
  viewPatientMedicalHistory,
  recordNursingNote,
  updatePatientStatus
}
