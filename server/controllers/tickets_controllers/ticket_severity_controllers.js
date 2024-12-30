import TicketSeverityModel from "../../models/tickets/ticketSeverityModel.js";

export const addTicketSeverityController = async (req, res) => {
  try {
    const existSeverity = await TicketSeverityModel.findOne({
      name: req.body.name,
    });

    if (existSeverity) {
      return res.status(400).json({
        success: false,
        message: "This severity already exists.",
      });
    }
    const severity = await TicketSeverityModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Severity created successfully",
      severity,
    });
  } catch (error) {
    console.error(`Add Severity Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getAllTicketSeverityController = async (req, res) => {
  try {
    const severity = await TicketSeverityModel.find();

    res.status(200).json({
      success: true,
      message: "Get successfully",
      severity,
    });
  } catch (error) {
    console.error(`Get Severity Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const deleteTicketSeverityController = async (req, res) => {
  try {
    const severity = await TicketSeverityModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Delete successfully",
      severity,
    });
  } catch (error) {
    console.error(`Delete Severity Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const EditTicketSeverityController = async (req, res) => {
  try {
    const existSeverity = await TicketSeverityModel.findOne({
      name: req.body.name,
    });

    if (existSeverity) {
      return res.status(400).json({
        success: false,
        message: "This severity already exists.",
      });
    }
    const severity = await TicketSeverityModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update successfully",
      severity,
    });
  } catch (error) {
    console.error(`Update Severity Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
