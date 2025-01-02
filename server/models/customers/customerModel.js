import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    ntn: {
      type: String,
      required: true,
    },
    strn: {
      type: String,
      required: true,
    },
    vat: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

customerSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastRecord = await this.constructor.findOne().sort({ id: -1 });
    if (lastRecord) {
      this.id = parseInt(lastRecord.id + 1);
    } else {
      this.id = "1";
    }
  }
  next();
});

const CustomerModel = mongoose.model("Customers", customerSchema);

export default CustomerModel;
