import mongoose, { Schema } from "mongoose";

const gameDetailsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    demand: {
      type: Number,
      default: 0,
    },
    backOrder: {
      type: Number,
      default: 0,
    },
    inventory: {
      type: Number,
      default: 0,
    },
    receivedInventory: {
      type: Number,
      default: 0,
    },
    shippedDemand: {
      type: Number,
      default: 0,
    },
    backOrderNextWeek: {
      type: Number,
      default: 0,
    },
    orderPlaced: {
      type: Number,
      default: 0,
    },
    isOrdered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const GameDetails = mongoose.model("GameDetails", gameDetailsSchema);
