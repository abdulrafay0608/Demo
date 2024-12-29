import mongoose from "mongoose";

const ticketStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "status name is required"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "color is required"],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, "order is required"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TicketStatusModel = mongoose.model("Ticket_Status", ticketStatusSchema);

export default TicketStatusModel;
