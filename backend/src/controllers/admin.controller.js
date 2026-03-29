import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Staff } from "../models/staff.model.js";
import { LabReport } from "../models/lab_report.model.js";
import { MedicalHistory } from "../models/medical_history.model.js";

const addStaff = asyncHandler(async (req, res) => {
  const { fullname, user_id, email, phone, password, about, role } = req.body;

  if (!fullname || !user_id || !email || !phone || !password || !about || !role) {
    throw new ApiError(400, "All fields are required");
  }

  const existingStaff = await Staff.findOne({ user_id });
  if (existingStaff) {
    throw new ApiError(400, "Staff with this ID already exists");
  }

  const staff = await Staff.create({
    fullname,
    user_id,
    email,
    phone,
    password,
    about,
    role,
  });

  const createdStaff = await Staff.findById(staff._id).select("-password -refreshToken");

  return res
    .status(201)
    .json(new ApiResponse(201, createdStaff, "Staff added successfully"));
});

const staffStatus = asyncHandler(async (req, res) => {
  const { staffId } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(staffId)) {
    throw new ApiError(400, "Invalid staff ID");
  }

  const staff = await Staff.findById(staffId);
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  staff.status = status;
  await staff.save();

  return res
    .status(200)
    .json(new ApiResponse(200, staff, "Staff status updated successfully"));
});

const viewReport = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const reports = await LabReport.find({ patient_id: patientId })
    .populate("order_id")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, reports, "Lab reports fetched successfully"));
});

const viewMedicalHistory = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const medicalHistory = await MedicalHistory.findOne({ patient_id: patientId })
    .populate("patient_id", "fullname email")
    .sort({ createdAt: -1 });

  if (!medicalHistory) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No medical history found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, medicalHistory, "Medical history fetched successfully"));
});

export {
    addStaff,
    staffStatus,
    viewMedicalHistory,
    viewReport
}
