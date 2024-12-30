import mongoose from "mongoose";

const ticketSeveritySchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
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
ticketSeveritySchema.pre("save", async function (next) {
  if (!this.id) {
    const lastDepartment = await this.constructor.findOne().sort({ id: -1 });
    if (lastDepartment) {
      const lastId = parseInt(lastDepartment.id.substring(3));
      this.id = `SEV${String(lastId + 1).padStart(3, "0")}`;
    } else {
      this.id = "SEV001";
    }
  }
  next();
});
const TicketSeverityModel = mongoose.model(
  "Ticket_Severity",
  ticketSeveritySchema
);

export default TicketSeverityModel;
