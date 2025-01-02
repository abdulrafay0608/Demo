import AuthModel from "../../models/authModel.js";
import CustomerModel from "../../models/customers/customerModel.js";
import { hashPassword } from "../../utils/helpers.js";

export const addCustomerController = async (req, res) => {
  const session = await CustomerModel.startSession();
  session.startTransaction();

  try {
    const { email, password, ...customerData } = req.body;

    // Check if email already exists
    const isExist = await AuthModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message:
          "This email address is already registered. Please use a different email or try logging in.",
      });
    }

    // Hash password
    const hashpass = await hashPassword(password);

    // Create user
    const [user] = await AuthModel.create([{ email, password: hashpass }], {
      session,
    });

    if (!user) {
      throw new Error("Failed to create user in AuthModel");
    }

    // Create customer
    const customer = await CustomerModel.create(
      [
        {
          ...customerData,
          user_id: user._id, // Link customer to the created user
        },
      ],
      { session }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    console.error(`Add Customer Error: ${error}`);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

export const getAllCustomersController = async (req, res) => {
  try {
    const customers = await CustomerModel.find().populate("user_id");

    res.status(200).json({
      success: true,
      message: "Get customers successfully",
      customers,
    });
  } catch (error) {
    console.error(`Get All Customers Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

export const getSingleCustomerController = async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Get Single Customers successfully",
      customers,
    });
  } catch (error) {
    console.error(`Get Single Customers Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};

// export const getUserProjectsController = async (req, res) => {
//   try {
//     const projects = await ProjectModel.find({ customer: req.params.id })
//       .populate("customer")
//       .populate("status")
//       .populate("member.value");

//     res.status(200).json({
//       success: true,
//       message: "Get User Project successfully",
//       projects,
//     });
//   } catch (error) {
//     console.error(`Get User Project Error: ${error}`);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong. Please try again",
//     });
//   }
// };

export const UpdateCustomerStatusController = async (req, res) => {
  try {
    console.log("req.body, req.params", req.body, req.params);
    const customers = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update successfully",
      customers,
    });
  } catch (error) {
    console.error(`Update Customers Status Error: ${error}`);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
};
