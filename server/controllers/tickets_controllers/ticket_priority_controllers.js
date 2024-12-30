import TicketPriorityModel from "../../models/tickets/ticketPriorityModel.js";
import TicketSeverityModel from "../../models/tickets/ticketSeverityModel.js";

export const addTicketPriorityController = async (req, res) => {
  try {
    const existPriority = await TicketPriorityModel.findOne({
      name: req.body.name,
    });

    if (existPriority) {
      return res.status(400).json({
        success: false,
        message: "This priority already exists.",
      });
    }
    const priority = await TicketPriorityModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Priority created successfully",
      priority,
    });
  } catch (error) {
    console.error(`Add Priority Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getAllTicketPriorityController = async (req, res) => {
  try {
    const priority = await TicketPriorityModel.find();

    res.status(200).json({
      success: true,
      message: "Get successfully",
      priority,
    });
  } catch (error) {
    console.error(`Get Priority Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const deleteTicketPriorityController = async (req, res) => {
  try {
    const priority = await TicketPriorityModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Delete successfully",
      priority,
    });
  } catch (error) {
    console.error(`Delete Priority Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const EditTicketPriorityController = async (req, res) => {
  try {
    const existPriority = await TicketPriorityModel.findOne({
      name: req.body.name,
    });

    if (existPriority) {
      return res.status(400).json({
        success: false,
        message: "This priority already exists.",
      });
    }
    const priority = await TicketPriorityModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update successfully",
      priority,
    });
  } catch (error) {
    console.error(`Update Priority Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
