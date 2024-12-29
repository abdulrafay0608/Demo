const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g., "createUser", "deleteUser", "viewReports"
    description: { type: String }, // For documentation purposes
  },
  { timestamps: true }
);

const permissionModel = mongoose.model("Permission", permissionSchema);

export default permissionModel;
