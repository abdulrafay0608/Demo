import StatusModel from "../models/statusModel.js";

export const addStatusController = async (req, res) => {
  try {
    const existStatus = await StatusModel.findOne({
      name: req.body.name,
    });

    if (existStatus) {
      return res.status(400).json({
        success: false,
        message: "This status already exists.",
      });
    }
    const status = await StatusModel.create(req.body);
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

export const getAllStatusController = async (req, res) => {
  try {
    const status = await StatusModel.find();

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

export const deleteStatusController = async (req, res) => {
  try {
    const status = await StatusModel.findByIdAndDelete(req.params.id);

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

export const EditStatusController = async (req, res) => {
  try {
    const status = await StatusModel.findByIdAndUpdate(
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