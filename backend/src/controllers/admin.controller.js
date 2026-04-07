import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Staff } from "../models/staff.model.js";
import { Patient } from "../models/patient.model.js";
import { MedicalHistory } from "../models/medical_history.model.js";
import { MedicalRecord } from "../models/medical_record.model.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

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

  while (existingStaff) {
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
    password: hashedPassword,
    about,
    role: formattedRole,
  });

  const createdStaff = await Staff.findById(staff._id).select(
    "-password -refreshToken"
  );

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

  const staff = await Staff.findOne({ user_id: userId }).select(
    "-password -refreshToken"
  );
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode,
    );

    if (!emailResponse.success) {
      throw new ApiError(500, emailResponse.message);
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

const viewMedicalHistory = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patient = await Patient.findOne({ username: patientId }).select(
    "-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry"
  );

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const medicalHistory = await MedicalHistory.findOne({
    patient_id: patient._id,
  })
    .populate("patient_id", "fullname email")
    .sort({ createdAt: -1 });

  if (!medicalHistory) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No medical history found"));
  }

  const recordIds = medicalHistory.medical_record.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const medicalRecords = await MedicalRecord.find({ _id: { $in: recordIds } })
    .populate("doctor_id", "fullname")
    .sort({ visit_date: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { medical_records: medicalRecords },
        "Medical history fetched successfully"
      )
    );
});

const allStaff = asyncHandler(async (req, res) => {
  const staff = await Staff.find().select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, staff, "Staff fetched successfully"));
});

export {
  addStaff,
  staffStatus,
  getStaffByUserId,
  deleteStaff,
  viewMedicalHistory,
  allStaff,
};
