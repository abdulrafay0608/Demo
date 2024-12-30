import mongoose from "mongoose";

const ticketSeveritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ticket severity is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const TicketSeverityModel = mongoose.model(
  "Ticket_Severity",
  ticketSeveritySchema
);

export default TicketSeverityModel;
