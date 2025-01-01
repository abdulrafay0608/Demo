import ProjectModel from "../../models/projects/ProjectModel.js";

export const addProjectsController = async (req, res) => {
  try {
    const project = await ProjectModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(`Add Project Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getAllProjectsController = async (req, res) => {
  try {
    const projects = await ProjectModel.find()
      .populate("customer")
      .populate("status")
      .populate("member.value");

    res.status(200).json({
      success: true,
      message: "Get Projects successfully",
      projects,
    });
  } catch (error) {
    console.error(`Get All Projects Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getSingleProjectController = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Get Single Project successfully",
      project,
    });
  } catch (error) {
    console.error(`Get Single Project Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getUserProjectsController = async (req, res) => {
  try {
    const projects = await ProjectModel.find({ customer: req.params.id })
      .populate("customer")
      .populate("status")
      .populate("member.value");

    res.status(200).json({
      success: true,
      message: "Get User Project successfully",
      projects,
    });
  } catch (error) {
    console.error(`Get User Project Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const UpdateProjectStatusController = async (req, res) => {
  try {
    const project = await TicketModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.selectedStatus },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update successfully",
      project,
    });
  } catch (error) {
    console.error(`Update Project Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
