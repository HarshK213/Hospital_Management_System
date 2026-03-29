import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { LabReport } from "../models/lab_report.model.js";
import { LabRequest } from "../models/lab_request.model.js";

const viewLabRequest = asyncHandler(async (req, res) => {
  const { status } = req.query;

  let query = {};

  if (status) {
    query.status = status;
  }

  const labRequests = await LabRequest.find(query)
    .populate("patient_id", "fullname email phone")
    .populate("doctor_id", "fullname")
    .populate("test_id", "test_name test_cost description")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, labRequests, "Lab requests fetched successfully"));
});

const collectSample = asyncHandler(async (req, res) => {
  const { requestId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw new ApiError(400, "Invalid request ID");
  }

  const labRequest = await LabRequest.findById(requestId);
  if (!labRequest) {
    throw new ApiError(404, "Lab request not found");
  }

  if (labRequest.status !== "pending") {
    throw new ApiError(400, "Sample already collected or request is not pending");
  }

  labRequest.status = "sample_collected";
  labRequest.sample_collected_date = new Date();
  await labRequest.save();

  const updatedRequest = await LabRequest.findById(requestId)
    .populate("patient_id", "fullname email")
    .populate("doctor_id", "fullname")
    .populate("test_id", "test_name");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedRequest, "Sample collected successfully"));
});

const updateTestStatus = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw new ApiError(400, "Invalid request ID");
  }

  const validStatuses = ["pending", "sample_collected", "processing", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  const labRequest = await LabRequest.findById(requestId);
  if (!labRequest) {
    throw new ApiError(404, "Lab request not found");
  }

  labRequest.status = status;
  await labRequest.save();

  return res
    .status(200)
    .json(new ApiResponse(200, labRequest, "Test status updated successfully"));
});

const enterTestResult = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { result, remarks } = req.body;

  if (!requestId || !result || !remarks) {
    throw new ApiError(400, "Request ID, result, and remarks are required");
  }

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw new ApiError(400, "Invalid request ID");
  }

  const labRequest = await LabRequest.findById(requestId);
  if (!labRequest) {
    throw new ApiError(404, "Lab request not found");
  }

  const existingReport = await LabReport.findOne({ order_id: requestId });
  if (existingReport) {
    existingReport.result = result;
    existingReport.remarks = remarks;
    await existingReport.save();
    
    labRequest.status = "completed";
    labRequest.report_date = new Date();
    await labRequest.save();

    return res
      .status(200)
      .json(new ApiResponse(200, existingReport, "Test result updated successfully"));
  }

  const labReport = await LabReport.create({
    order_id: requestId,
    result,
    remarks,
    report_file: "",
  });

  labRequest.status = "completed";
  labRequest.report_date = new Date();
  await labRequest.save();

  const createdReport = await LabReport.findById(labReport._id)
    .populate("order_id");

  return res
    .status(201)
    .json(new ApiResponse(201, createdReport, "Test result entered successfully"));
});

const uploadTestReport = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  const { reportFile } = req.body;

  if (!requestId || !reportFile) {
    throw new ApiError(400, "Request ID and report file are required");
  }

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    throw new ApiError(400, "Invalid request ID");
  }

  const labRequest = await LabRequest.findById(requestId);
  if (!labRequest) {
    throw new ApiError(404, "Lab request not found");
  }

  const labReport = await LabReport.findOne({ order_id: requestId });
  if (!labReport) {
    throw new ApiError(404, "No test result found for this request");
  }

  labReport.report_file = reportFile;
  await labReport.save();

  return res
    .status(200)
    .json(new ApiResponse(200, labReport, "Test report uploaded successfully"));
});

export {
  viewLabRequest,
  collectSample,
  updateTestStatus,
  enterTestResult,
  uploadTestReport
}
