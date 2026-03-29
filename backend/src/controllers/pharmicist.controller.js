import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Medicine } from "../models/medicines.model.js";
import { PharmacySale } from "../models/pharmacy_sale.model.js";
import { PharmacySaleItem } from "../models/pharmacy_sale_item.model.js";
import { Bill } from "../models/bill.model.js";

const viewInventory = asyncHandler(async (req, res) => {
  const { category, lowStock } = req.query;

  let query = {};

  if (category) {
    query.category = category;
  }

  if (lowStock === "true") {
    query.stock_quantity = { $lte: 10 };
  }

  const medicines = await Medicine.find(query).sort({ name: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, medicines, "Inventory fetched successfully"));
});

const dispatchMedicine = asyncHandler(async (req, res) => {
  const { patientId, medicines } = req.body;

  if (!patientId || !medicines || !Array.isArray(medicines) || medicines.length === 0) {
    throw new ApiError(400, "Patient ID and medicines array are required");
  }

  let totalAmount = 0;
  const saleItems = [];

  for (const item of medicines) {
    const medicine = await Medicine.findById(item.medicineId);
    if (!medicine) {
      throw new ApiError(404, `Medicine with ID ${item.medicineId} not found`);
    }

    if (medicine.stock_quantity < item.quantity) {
      throw new ApiError(400, `Insufficient stock for medicine: ${medicine.name}`);
    }

    const itemTotal = medicine.price * item.quantity;
    totalAmount += itemTotal;

    medicine.stock_quantity -= item.quantity;
    await medicine.save();

    saleItems.push({
      medicine_id: item.medicineId,
      quantity: item.quantity,
      price: medicine.price,
    });
  }

  const sale = await PharmacySale.create({
    patient_id: patientId,
    sale_date: new Date(),
    total_amount: totalAmount,
  });

  for (const item of saleItems) {
    await PharmacySaleItem.create({
      sale_id: sale._id,
      medicine_id: item.medicine_id,
      quantity: item.quantity,
      price: item.price,
    });
  }

  const bill = await Bill.create({
    patient_id: patientId,
    appointment_id: null,
    admission_id: null,
    amount: totalAmount,
    type: "medicine",
    date: new Date(),
    status: "pending",
  });

  const createdSale = await PharmacySale.findById(sale._id)
    .populate("patient_id", "fullname")
    .populate({
      path: "sale_items",
      populate: { path: "medicine_id", select: "name" }
    });

  return res
    .status(201)
    .json(new ApiResponse(201, { sale: createdSale, bill }, "Medicine dispatched successfully"));
});

const generateMedicineBill = asyncHandler(async (req, res) => {
  const { patientId, medicines } = req.body;

  if (!patientId || !medicines || !Array.isArray(medicines)) {
    throw new ApiError(400, "Patient ID and medicines array are required");
  }

  let totalAmount = 0;

  for (const item of medicines) {
    const medicine = await Medicine.findById(item.medicineId);
    if (!medicine) {
      throw new ApiError(404, `Medicine with ID ${item.medicineId} not found`);
    }
    totalAmount += medicine.price * item.quantity;
  }

  const bill = await Bill.create({
    patient_id: patientId,
    appointment_id: null,
    admission_id: null,
    amount: totalAmount,
    type: "medicine",
    date: new Date(),
    status: "pending",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, bill, "Medicine bill generated successfully"));
});

const trackStock = asyncHandler(async (req, res) => {
  const { expiryStatus, lowStock } = req.query;

  let medicines;

  if (expiryStatus === "expired") {
    medicines = await Medicine.find({ expiry_date: { $lt: new Date() } });
  } else if (expiryStatus === "expiring_soon") {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    medicines = await Medicine.find({
      expiry_date: { $gte: new Date(), $lte: thirtyDaysFromNow }
    });
  } else if (lowStock === "true") {
    medicines = await Medicine.find({ stock_quantity: { $lte: 10 } });
  } else {
    medicines = await Medicine.find().sort({ stock_quantity: 1 });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, medicines, "Stock tracking information fetched"));
});

const updateMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;
  const { name, category, price, stock_quantity, expiry_date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(medicineId)) {
    throw new ApiError(400, "Invalid medicine ID");
  }

  const medicine = await Medicine.findById(medicineId);
  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  if (name) medicine.name = name;
  if (category) medicine.category = category;
  if (price) medicine.price = price;
  if (stock_quantity) medicine.stock_quantity = stock_quantity;
  if (expiry_date) medicine.expiry_date = new Date(expiry_date);

  await medicine.save();

  return res
    .status(200)
    .json(new ApiResponse(200, medicine, "Medicine updated successfully"));
});

export {
  viewInventory,
  dispatchMedicine,
  generateMedicineBill,
  trackStock,
  updateMedicine
}
