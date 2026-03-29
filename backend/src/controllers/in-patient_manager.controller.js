import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Bed } from "../models/bed.model.js";
import { Ward } from "../models/ward.model.js";
import { Admission } from "../models/admission.model.js";

const assignBed = asyncHandler(async (req, res) => {
  const { patientId, wardId } = req.body;

  if (!patientId || !wardId) {
    throw new ApiError(400, "Patient ID and Ward ID are required");
  }

  if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(wardId)) {
    throw new ApiError(400, "Invalid patient or ward ID");
  }

  const availableBed = await Bed.findOne({ ward: wardId, status: "available" });
  if (!availableBed) {
    throw new ApiError(400, "No available beds in this ward");
  }

  availableBed.status = "occupied";
  await availableBed.save();

  const admission = await Admission.create({
    patient_id: patientId,
    bed_id: availableBed._id,
    admission_date: new Date(),
    status: "admitted",
  });

  const createdAdmission = await Admission.findById(admission._id)
    .populate("patient_id", "fullname email phone")
    .populate({
      path: "bed_id",
      populate: { path: "ward", select: "ward_no" }
    });

  return res
    .status(201)
    .json(new ApiResponse(201, createdAdmission, "Bed assigned successfully"));
});

const updateBed = asyncHandler(async (req, res) => {
  const { bedId } = req.params;
  const { status, wardId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(bedId)) {
    throw new ApiError(400, "Invalid bed ID");
  }

  const bed = await Bed.findById(bedId);
  if (!bed) {
    throw new ApiError(404, "Bed not found");
  }

  if (status) {
    if (!["available", "occupied", "maintenance"].includes(status)) {
      throw new ApiError(400, "Invalid status value");
    }
    bed.status = status;
  }

  if (wardId) {
    if (!mongoose.Types.ObjectId.isValid(wardId)) {
      throw new ApiError(400, "Invalid ward ID");
    }
    bed.ward = wardId;
  }

  await bed.save();

  return res
    .status(200)
    .json(new ApiResponse(200, bed, "Bed updated successfully"));
});

const trackAdmission = asyncHandler(async (req, res) => {
  const { status, wardId } = req.query;

  let query = {};

  if (status) {
    query.status = status;
  }

  if (wardId) {
    query.bed_id = { $in: await Bed.find({ ward: wardId }).select("_id") };
  }

  const admissions = await Admission.find(query)
    .populate("patient_id", "fullname email phone")
    .populate({
      path: "bed_id",
      populate: { path: "ward", select: "ward_no" }
    })
    .sort({ admission_date: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, admissions, "Admissions tracked successfully"));
});

const assignNurse = asyncHandler(async (req, res) => {
  const { wardId } = req.params;
  const { nurseId } = req.body;

  if (!wardId || !nurseId) {
    throw new ApiError(400, "Ward ID and Nurse ID are required");
  }

  if (!mongoose.Types.ObjectId.isValid(wardId) || !mongoose.Types.ObjectId.isValid(nurseId)) {
    throw new ApiError(400, "Invalid ward or nurse ID");
  }

  const { Staff } = await import("../models/staff.model.js");
  
  const nurse = await Staff.findOne({ _id: nurseId, role: "nurse" });
  if (!nurse) {
    throw new ApiError(404, "Nurse not found or invalid role");
  }

  const ward = await Ward.findById(wardId);
  if (!ward) {
    const newWard = await Ward.create({
      ward_no: parseInt(wardId) || 1,
      nurse_assigned: nurseId,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, newWard, "Nurse assigned to new ward successfully"));
  }

  ward.nurse_assigned = nurseId;
  await ward.save();

  return res
    .status(200)
    .json(new ApiResponse(200, ward, "Nurse assigned to ward successfully"));
});

export {
  assignBed,
  updateBed,
  trackAdmission,
  assignNurse
}
