import mongoose from "mongoose";

const ticketStatusSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
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
ticketStatusSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastStatus = await this.constructor.findOne().sort({ id: -1 });
    if (lastStatus) {
      const lastId = parseInt(lastStatus.id.substring(3));
      this.id = `TKT${String(lastId + 1).padStart(3, "0")}`;
    } else {
      this.id = "TKT001";
    }
  }
  next();
});

const TicketStatusModel = mongoose.model("Ticket_Status", ticketStatusSchema);

export default TicketStatusModel;
