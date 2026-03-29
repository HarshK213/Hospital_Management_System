import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { InventoryItem } from "../models/inventory_item.model.js";
import { InventoryTransaction } from "../models/inventory_transaction.model.js";
import { Supplier } from "../models/supplier.model.js";

const updateInventory = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { item_name, category, quantity, reorder_point, supplier_id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item ID");
  }

  const item = await InventoryItem.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Inventory item not found");
  }

  if (item_name) item.item_name = item_name;
  if (category) item.category = category;
  if (quantity !== undefined) item.quantity = quantity;
  if (reorder_point) item.reorder_point = reorder_point;
  if (supplier_id) {
    if (!mongoose.Types.ObjectId.isValid(supplier_id)) {
      throw new ApiError(400, "Invalid supplier ID");
    }
    item.supplier_id = supplier_id;
  }

  await item.save();

  return res
    .status(200)
    .json(new ApiResponse(200, item, "Inventory item updated successfully"));
});

const trackStockTransaction = asyncHandler(async (req, res) => {
  const { itemId, transaction_type, quantity, remarks } = req.body;

  if (!itemId || !transaction_type || !quantity || !remarks) {
    throw new ApiError(400, "Item ID, transaction type, quantity, and remarks are required");
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item ID");
  }

  if (!["IN", "OUT"].includes(transaction_type)) {
    throw new ApiError(400, "Transaction type must be 'IN' or 'OUT'");
  }

  const item = await InventoryItem.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Inventory item not found");
  }

  if (transaction_type === "OUT" && item.quantity < quantity) {
    throw new ApiError(400, "Insufficient stock");
  }

  item.quantity = transaction_type === "IN" 
    ? item.quantity + quantity 
    : item.quantity - quantity;
  await item.save();

  const transaction = await InventoryTransaction.create({
    item_id: itemId,
    transaction_type,
    quantity,
    remarks,
    transaction_date: new Date(),
  });

  const createdTransaction = await InventoryTransaction.findById(transaction._id)
    .populate("item_id", "item_name");

  return res
    .status(201)
    .json(new ApiResponse(201, createdTransaction, "Stock transaction recorded successfully"));
});

const manageSupplier = asyncHandler(async (req, res) => {
  const { supplierId } = req.params;
  const { supplier_name, contact_email, address } = req.body;

  if (supplierId) {
    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      throw new ApiError(400, "Invalid supplier ID");
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      throw new ApiError(404, "Supplier not found");
    }

    if (supplier_name) supplier.supplier_name = supplier_name;
    if (contact_email) supplier.contact_email = contact_email;
    if (address) supplier.address = address;

    await supplier.save();

    return res
      .status(200)
      .json(new ApiResponse(200, supplier, "Supplier updated successfully"));
  }

  if (!supplier_name || !contact_email || !address) {
    throw new ApiError(400, "Supplier name, contact email, and address are required");
  }

  const supplier = await Supplier.create({
    supplier_name,
    contact_email,
    address,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, supplier, "Supplier created successfully"));
});

const issueItem = asyncHandler(async (req, res) => {
  const { itemId, quantity, department, remarks } = req.body;

  if (!itemId || !quantity || !department || !remarks) {
    throw new ApiError(400, "Item ID, quantity, department, and remarks are required");
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item ID");
  }

  const item = await InventoryItem.findById(itemId);
  if (!item) {
    throw new ApiError(404, "Inventory item not found");
  }

  if (item.quantity < quantity) {
    throw new ApiError(400, "Insufficient stock");
  }

  item.quantity -= quantity;
  await item.save();

  const transaction = await InventoryTransaction.create({
    item_id: itemId,
    transaction_type: "OUT",
    quantity,
    remarks: `Issued to ${department}: ${remarks}`,
    transaction_date: new Date(),
  });

  const createdTransaction = await InventoryTransaction.findById(transaction._id)
    .populate("item_id", "item_name");

  return res
    .status(201)
    .json(new ApiResponse(201, createdTransaction, "Item issued successfully"));
});

export {
    updateInventory,
    trackStockTransaction,
    manageSupplier,
    issueItem
}
