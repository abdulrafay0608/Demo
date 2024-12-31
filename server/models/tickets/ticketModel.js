import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    priority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket_Priority",
      default: "Medium",
    },
    severity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket_Severity",
      default: "Medium",
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket_Status",
      default: "Open",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departments",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
    subject: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    tag: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    service: {
      type: String,
      required: true,
    },
    ticket_body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

ticketSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastPriority = await this.constructor.findOne().sort({ id: -1 });
    if (lastPriority) {
      this.id = parseInt(lastPriority.id + 1);
    } else {
      this.id = "1";
    }
  }
  next();
});

const TicketModel = mongoose.model("Ticket", ticketSchema);

export default TicketModel;
