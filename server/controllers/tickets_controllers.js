import TicketModel from "../models/ticketModel.js";

export const addTicketController = async (req, res) => {
  try {
    const ticket = await TicketModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error(`Add Ticket Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
export const getAllTicketController = async (req, res) => {
  try {
    const ticket = await TicketModel.find();

    res.status(200).json({
      success: true,
      message: "Get successfully",
      ticket,
    });
  } catch (error) {
    console.error(`Get Ticket Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
