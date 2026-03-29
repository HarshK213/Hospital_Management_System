import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { Appointment } from "../models/appointment.model.js";
import { MedicalHistory } from "../models/medical_history.model.js";
// import { LabReport } from "../models/lab_report.model.js";
import { Bill } from "../models/bill.model.js";
import { Payment } from "../models/payment.model.js";
import { Patient } from "../models/patient.model.js";



const registerPatient = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  console.log(req.body);

  if (!fullname || !email || !password) {
    throw new ApiError(400, "Fullname, email, and password are required");
  }

  const existingUser = await Patient.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const username = email.split('@')[0];
  const phone = req.body.phone || null;

  const hashedPass = await bcrypt.hash(password, 5);
  const emailVerifyToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

  const user = await Patient.create({
    username: username || email.split('@')[0],
    fullname,
    email,
    phone: phone || null,
    password: hashedPass,
    isVerified: false,
    emailVerifyToken,
    emailVerificationTokenExpiry,
    providers: "credentials",
    providerIds: null
  });

  const createdUser = await Patient.findById(user._id).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry -providerIds");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const user = await Patient.findOne({
    emailVerifyToken: token,
    emailVerificationTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or Expired token");
  }

  user.isVerified = true;
  // user.emailVerifyToken = null;
  // user.emailVerificationTokenExpiry = null;

  await user.save();

  const updatedUser = await Patient.findById(user._id).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry -providerIds");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Email Verified Successfully"));
});



const bookAppointment = asyncHandler(async (req, res) => {
  const { doctorId, date, time, reason } = req.body;
  const patientId = req.user._id;

  if (!doctorId || !date || !time || !reason) {
    throw new ApiError(400, "Doctor ID, date, time, and reason are required");
  }

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    throw new ApiError(400, "Invalid doctor ID");
  }

  const appointment = await Appointment.create({
    patient_id: patientId,
    doctor_id: doctorId,
    date: new Date(date),
    time,
    reason,
    status: "pending",
  });

  const createdAppointment = await Appointment.findById(appointment._id)
    .populate("doctor_id", "fullname");

  return res
    .status(201)
    .json(new ApiResponse(201, createdAppointment, "Appointment booked successfully"));
});

const listAllDoctor = asyncHandler(async (req, res) => {
  const { Staff } = await import("../models/staff.model.js");
  
  const doctors = await Staff.find({ role: "doctor" })
    .select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
});

const viewAllBill = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  const bills = await Bill.find({ patient_id: patientId })
    .populate("appointment_id", "date")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, bills, "Bills fetched successfully"));
});

const viewBill = asyncHandler(async (req, res) => {
  const { billId } = req.params;
  const patientId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(billId)) {
    throw new ApiError(400, "Invalid bill ID");
  }

  const bill = await Bill.findOne({ _id: billId, patient_id: patientId })
    .populate("appointment_id", "date");

  if (!bill) {
    throw new ApiError(404, "Bill not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, bill, "Bill fetched successfully"));
});

const viewMedicalHistory = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  const medicalHistory = await MedicalHistory.findOne({ patient_id: patientId })
    .populate({
      path: "medical_record",
      populate: { path: "doctor_id", select: "fullname" }
    })
    .populate("lap_report");

  if (!medicalHistory) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "No medical history found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, medicalHistory, "Medical history fetched successfully"));
});

const viewPaymentHistory = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  const bills = await Bill.find({ patient_id: patientId, status: "paid" })
    .populate({
      path: "appointment_id",
      select: "date"
    });

  const payments = await Payment.find({
    bill_id: { $in: bills.map(b => b._id) }
  }).sort({ date: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, payments, "Payment history fetched successfully"));
});

// const viewReport = asyncHandler(async (req, res) => {
//   const patientId = req.user._id;

//   const reports = await LabReport.find({ patient_id: patientId })
//     .populate({
//       path: "order_id",
//       populate: [
//         { path: "test_id", select: "test_name" },
//         { path: "doctor_id", select: "fullname" }
//       ]
//     })
//     .sort({ createdAt: -1 });

//   return res
//     .status(200)
//     .json(new ApiResponse(200, reports, "Lab reports fetched successfully"));
// });

// const downloadReport = asyncHandler(async (req, res) => {
//   const { reportId } = req.params;
//   const patientId = req.user._id;

//   if (!mongoose.Types.ObjectId.isValid(reportId)) {
//     throw new ApiError(400, "Invalid report ID");
//   }

//   const report = await LabReport.findOne({ _id: reportId, patient_id: patientId });

//   if (!report) {
//     throw new ApiError(404, "Report not found");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, report, "Report data retrieved successfully"));
// });

const updateDetails = asyncHandler(async (req, res) => {
  const { fullname, phone } = req.body;
  const patientId = req.user._id;

  const patient = await Patient.findById(patientId);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  if (fullname) patient.fullname = fullname;
  if (phone) patient.phone = phone;

  await patient.save();

  const updatedPatient = await Patient.findById(patientId).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry -providerIds");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPatient, "Patient details updated successfully"));
});

export {
  registerPatient,
  verifyUser,
  // loginPatient,
  bookAppointment,
  listAllDoctor,
  viewAllBill,
  viewBill,
  viewMedicalHistory,
  viewPaymentHistory,
  // viewReport,
  // downloadReport,
  updateDetails
}
