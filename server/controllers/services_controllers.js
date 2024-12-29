import ServiceModel from "../models/servicesModel.js";

export const addServiceController = async (req, res) => {
  try {
    const existService = await ServiceModel.findOne({
      name: req.body.name,
    });

    if (existService) {
      return res.status(400).json({
        success: false,
        message: "This services already exists.",
      });
    }
    const services = await ServiceModel.create(req.body);
    res.status(200).json({
      success: true,
      message: "Service created successfully",
      services,
    });
  } catch (error) {
    console.error(`Add service Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getAllServiceController = async (req, res) => {
  try {
    const services = await ServiceModel.find();

    res.status(200).json({
      success: true,
      message: "Get successfully",
      services,
    });
  } catch (error) {
    console.error(`Get Services Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const deleteServiceController = async (req, res) => {
  try {
    const services = await ServiceModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Delete successfully",
      services,
    });
  } catch (error) {
    console.error(`Delete service Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const EditServicesController = async (req, res) => {
  try {
    const services = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update successfully",
      services,
    });
  } catch (error) {
    console.error(`Update Service Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};