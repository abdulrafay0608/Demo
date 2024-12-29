import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Status name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const StatusModel = mongoose.model("Status", statusSchema);

export default StatusModel;
