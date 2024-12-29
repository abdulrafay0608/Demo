import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceModel = mongoose.model("Services", serviceSchema);

export default ServiceModel;
