import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
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

serviceSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastService = await this.constructor.findOne().sort({ id: -1 });
    if (lastService) {
      const lastId = parseInt(lastService.id.substring(3));
      this.id = `SVC${String(lastId + 1).padStart(3, "0")}`;
    } else {
      this.id = "SVC001";
    }
  }
  next();
});

const ServiceModel = mongoose.model("Services", serviceSchema);

export default ServiceModel;
