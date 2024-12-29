import TicketStatusModel from "../../models/tickets/ticketStatusModel.js";

export const addTicketStatusController = async (req, res) => {
  try {
    const existStatus = await TicketStatusModel.findOne({
      name: req.body.name,
    });

    if (existStatus) {
      return res.status(400).json({
        success: false,
        message: "This status already exists.",
      });
    }
    const status = await TicketStatusModel.create(req.body);
    res.status(200).json({
      success: true,
      message: "Status created successfully",
      status,
    });
  } catch (error) {
    console.error(`Add Status Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getAllTicketStatusController = async (req, res) => {
  try {
    const status = await TicketStatusModel.find();

    res.status(200).json({
      success: true,
      message: "Get successfully",
      status,
    });
  } catch (error) {
    console.error(`Get Status Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const deleteTicketStatusController = async (req, res) => {
  try {
    const status = await TicketStatusModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Delete successfully",
      status,
    });
  } catch (error) {
    console.error(`Delete Status Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const EditTicketStatusController = async (req, res) => {
  try {
    const status = await TicketStatusModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update successfully",
      status,
    });
  } catch (error) {
    console.error(`Update Status Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};