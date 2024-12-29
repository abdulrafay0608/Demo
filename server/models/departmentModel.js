import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
    },
    department_email: {
      type: String,
      required: [true, "Department email is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const DepartmentModel = mongoose.model("Departments", departmentSchema);

export default DepartmentModel;
