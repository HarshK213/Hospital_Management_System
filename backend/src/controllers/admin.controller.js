import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Staff } from "../models/staff.model.js";
import { Patient } from "../models/patient.model.js";
// import { LabReport } from "../models/lab_report.model.js";
import { MedicalHistory } from "../models/medical_history.model.js";

function generateUserId(name, role) {
  const cleanName = name.split(" ")[0].toUpperCase();
  const roleCode = role.substring(0, 3).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  return `${roleCode}-${cleanName}-${randomNum}`;
}

const addStaff = asyncHandler(async (req, res) => {
  const { fullname, email, phone, about, role } = req.body;

  if (!fullname || !email || !phone || !about || !role) {
    throw new ApiError(400, "All fields are required");
  }

  let user_id = generateUserId(fullname, role);
  
  let existingStaff = await Staff.findOne({ user_id });
  
  const formattedRole = role.toLowerCase();

  while(existingStaff){
    user_id = generateUserId(fullname, role);
    existingStaff = await Staff.findOne({ user_id });
  }

  const password = "welcome@123";

  const hashedPassword = await bcrypt.hash(password, 5);

  const staff = await Staff.create({
    fullname,
    user_id,
    email,
    phone,
    password : hashedPassword,
    about,
    role: formattedRole,
  });

  const createdStaff = await Staff.findById(staff._id).select("-password -refreshToken");

  return res
    .status(201)
    .json(new ApiResponse(201, createdStaff, "Staff added successfully"));
});

const staffStatus = asyncHandler(async (req, res) => {
  const { staffID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(staffID)) {
    throw new ApiError(400, "Invalid staff ID");
  }

  const staff = await Staff.findById(staffID);
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, staff, "Staff fetched successfully"));
});

const getStaffByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const staff = await Staff.findOne({ user_id: userId }).select("-password -refreshToken");
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, staff, "Staff fetched successfully"));
});

const deleteStaff = asyncHandler(async (req, res) => {
  const { staffId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(staffId)) {
    throw new ApiError(400, "Invalid staff ID");
  }

  const staff = await Staff.findByIdAndDelete(staffId);
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Staff deleted successfully"));
});

// const viewReport = asyncHandler(async (req, res) => {
//   const { patientId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(patientId)) {
//     throw new ApiError(400, "Invalid patient ID");
//   }

//   const reports = await LabReport.find({ patient_id: patientId })
//     .populate("order_id")
//     .sort({ createdAt: -1 });

//   return res
//     .status(200)
//     .json(new ApiResponse(200, reports, "Lab reports fetched successfully"));
// });

const viewMedicalHistory = asyncHandler(async (req, res) => {
  const { patientEmail } = req.params;

  const patient = await Patient.findOne({ email: patientEmail });
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const medicalHistory = await MedicalHistory.findOne({ patient_id: patient._id })
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
    getStaffByUserId,
    deleteStaff,
    viewMedicalHistory,
    // viewReport
}
