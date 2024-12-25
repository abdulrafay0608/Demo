import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    cc: {
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
    priority: {
      type: String,
      // enum: ["Low", "Medium", "High"], // Restricts to specific values
      default: "Medium",
    },
    status: {
      type: String,
      // enum: ["Low", "Medium", "High"], // Restricts to specific values
      default: "Open",
    },
    knowledge: {
      type: String,
      required: true,
    },
    assign_ticket: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: false,
    },
    ticket_body: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const TicketModel = mongoose.model("Ticket", ticketSchema);

export default TicketModel;
