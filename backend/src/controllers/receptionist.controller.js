import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { Appointment } from "../models/appointment.model.js";
import { Admission } from "../models/admission.model.js";
import { Patient } from "../models/patient.model.js";
import { Bill } from "../models/bill.model.js";

const registerPatient = asyncHandler(async (req, res) => {
  const { username, fullname, email, phone, password } = req.body;

  if (!fullname || !email || !password) {
    throw new ApiError(400, "Fullname, email, and password are required");
  }

  const existingUser = await Patient.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User with this email already exists");
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const emailVerifyToken = crypto.randomBytes(32).toString("hex");
  const emailVerificationTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

  const patient = await Patient.create({
    username: username || email.split('@')[0],
    fullname,
    email,
    phone: phone || null,
    password: hashedPass,
    isVerified: true,
    emailVerifyToken,
    emailVerificationTokenExpiry,
    providers: "credentials",
    providerIds: null
  });

  const createdPatient = await Patient.findById(patient._id).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry -providerIds");

  return res
    .status(201)
    .json(new ApiResponse(201, createdPatient, "Patient registered successfully"));
});

const bookAppointment = asyncHandler(async (req, res) => {
  const { patientId, doctorId, date, time, reason } = req.body;

  if (!patientId || !doctorId || !date || !time || !reason) {
    throw new ApiError(400, "Patient ID, Doctor ID, date, time, and reason are required");
  }

  if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(doctorId)) {
    throw new ApiError(400, "Invalid patient or doctor ID");
  }

  const appointment = await Appointment.create({
    patient_id: patientId,
    doctor_id: doctorId,
    date: new Date(date),
    time,
    reason,
    status: "confirmed",
  });

  const createdAppointment = await Appointment.findById(appointment._id)
    .populate("patient_id", "fullname email")
    .populate("doctor_id", "fullname");

  return res
    .status(201)
    .json(new ApiResponse(201, createdAppointment, "Appointment booked successfully"));
});

const updateAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const { date, time, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    throw new ApiError(400, "Invalid appointment ID");
  }

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  if (date) appointment.date = new Date(date);
  if (time) appointment.time = time;
  if (status) appointment.status = status;

  await appointment.save();

  const updatedAppointment = await Appointment.findById(appointmentId)
    .populate("patient_id", "fullname email")
    .populate("doctor_id", "fullname");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedAppointment, "Appointment updated successfully"));
});

const admitEntry = asyncHandler(async (req, res) => {
  const { patientId, bedId } = req.body;

  if (!patientId || !bedId) {
    throw new ApiError(400, "Patient ID and Bed ID are required");
  }

  if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(bedId)) {
    throw new ApiError(400, "Invalid patient or bed ID");
  }

  const admission = await Admission.create({
    patient_id: patientId,
    bed_id: bedId,
    admission_date: new Date(),
    status: "admitted",
  });

  const createdAdmission = await Admission.findById(admission._id)
    .populate("patient_id", "fullname email phone")
    .populate("bed_id", "bed_number ward");

  return res
    .status(201)
    .json(new ApiResponse(201, createdAdmission, "Patient admitted successfully"));
});

const viewPatientProfile = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new ApiError(400, "Invalid patient ID");
  }

  const patient = await Patient.findById(patientId).select("-password -refreshToken -emailVerifyToken -emailVerificationTokenExpiry -providerIds");

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const admissions = await Admission.find({ patient_id: patientId })
    .populate("bed_id", "bed_number ward")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { patient, admissions }, "Patient profile fetched successfully"));
});

const generateOPDBill = asyncHandler(async (req, res) => {
  const { patientId, appointmentId, amount, type } = req.body;

  if (!patientId || !appointmentId || !amount || !type) {
    throw new ApiError(400, "Patient ID, appointment ID, amount, and type are required");
  }

  if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(appointmentId)) {
    throw new ApiError(400, "Invalid patient or appointment ID");
  }

  const bill = await Bill.create({
    patient_id: patientId,
    appointment_id: appointmentId,
    admission_id: null,
    amount,
    type,
    date: new Date(),
    status: "pending",
  });

  const createdBill = await Bill.findById(bill._id)
    .populate("patient_id", "fullname email")
    .populate("appointment_id", "date");

  return res
    .status(201)
    .json(new ApiResponse(201, createdBill, "OPD Bill generated successfully"));
});

export {
  registerPatient,
  bookAppointment,
  updateAppointment,
  admitEntry,
  viewPatientProfile,
  generateOPDBill
}
