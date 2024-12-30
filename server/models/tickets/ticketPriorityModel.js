import mongoose from "mongoose";

const ticketPrioritySchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Ticket priority is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
ticketPrioritySchema.pre("save", async function (next) {
  if (!this.id) {
    const lastPriority = await this.constructor.findOne().sort({ id: -1 });
    if (lastPriority) {
      const lastId = parseInt(lastPriority.id.substring(3));
      this.id = `PRI${String(lastId + 1).padStart(3, "0")}`;
    } else {
      this.id = "PRI001";
    }
  }
  next();
});
const TicketPriorityModel = mongoose.model(
  "Ticket_Priority",
  ticketPrioritySchema
);

export default TicketPriorityModel;
