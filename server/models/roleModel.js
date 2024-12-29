const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g., Admin, Manager, User
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Assign permissions dynamically
  },
  { timestamps: true }
);

const RoleModel = mongoose.model("Role", roleSchema);

export default RoleModel;
