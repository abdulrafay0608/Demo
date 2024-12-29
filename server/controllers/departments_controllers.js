import DepartmentModel from "../models/departmentModel.js";

export const addDepartmentController = async (req, res) => {
  try {
    const existDepart = await DepartmentModel.findOne({
      name: req.body.name,
    });

    if (existDepart) {
      return res.status(400).json({
        success: false,
        message: "This department already exists.",
      });
    }
    const department = await DepartmentModel.create(req.body);
    res.status(200).json({
      success: true,
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    console.error(`Add Department Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getAllDepartmentController = async (req, res) => {
  try {
    const department = await DepartmentModel.find();

    res.status(200).json({
      success: true,
      message: "Get successfully",
      department,
    });
  } catch (error) {
    console.error(`Get Department Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const deleteDepartmentController = async (req, res) => {
  try {
    const department = await DepartmentModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Delete successfully",
      department,
    });
  } catch (error) {
    console.error(`Delete Department Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const EditDepartmentController = async (req, res) => {
  try {
    const department = await DepartmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update successfully",
      department,
    });
  } catch (error) {
    console.error(`Update Department Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
