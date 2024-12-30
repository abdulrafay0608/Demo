import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
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

departmentSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastDepartment = await this.constructor.findOne().sort({ id: -1 });
    if (lastDepartment) {
      const lastId = parseInt(lastDepartment.id.substring(3));
      this.id = `DPT${String(lastId + 1).padStart(3, "0")}`;
    } else {
      this.id = "DPT001";
    }
  }
  next();
});

const DepartmentModel = mongoose.model("Departments", departmentSchema);

export default DepartmentModel;
