import mongoose from "mongoose";

const Projectchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    project_name: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    member: [
      {
        value: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
      },
    ],
    project_description: {
      type: String,
      required: true,
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket_Status",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

Projectchema.pre("save", async function (next) {
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

const ProjectModel = mongoose.model("Projects", Projectchema);

export default ProjectModel;
