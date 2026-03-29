import mongoose from "mongoose";

const inventoryItemSchema = mongoose.Schema({
  item_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reorder_point: {
    type: Number,
    required: true,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
});

export const InventoryItem = mongoose.model(
  "InventoryItem",
  inventoryItemSchema
);
