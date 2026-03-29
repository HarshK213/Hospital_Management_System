import mongoose from "mongoose";

const inventoryTransactionSchema = mongoose.Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InventoryItem",
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ["IN", "OUT"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  transaction_date: {
    type: Date,
    default: Date.now,
  },
  remarks: {
    type: String,
    required: true,
  },
});

export const InventoryTransaction = mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema
);
