import mongoose from "mongoose";

const { Schema } = mongoose;

const StartGameFromSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    weeks: {
      type: Number,
      required: true,
    },
    initialInventory: {
      type: Number,
      required: true,
    },
    deliveryLeadTime: {
      type: Number,
      required: true,
    },
    holdingCost: {
      type: Number,
      required: true,
    },
    backorderCost: {
      type: Number,
      required: true,
    },
    retailer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    distributor: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    wholesaler: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    manufacturer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    weeksData: {
      type: [Schema.Types.ObjectId],
      ref: "Week",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StartGame", StartGameFromSchema);
