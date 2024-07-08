import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//POST Register
export const registerController = async (req, res) => {
  try {
    // Extract user details from request body
    const { name, email, password, phone, address } = req.body;

    // Validate required fields
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone No. is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    // Check if user already exists with the given email
    const existinguser = await userModel.findOne({ email });

    // If user exists, send a message to login
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, Please Login",
      });
    }

    // Hash the password for security
    const hashedPassword = await hashPassword(password);

    // Create and save the new user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    // Send a success response with user details
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    // Log any errors and send an error response
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate if email or password is missing
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user with the given email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email isn't Registered",
      });
    }

    // Compare the provided password with the stored hashed password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password doesn't match",
      });
    }

    // Generate a JWT token with the user ID as the payload
    const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send a successful response with user details and token
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    // Log any errors and send an error response
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//testController
export const testController = (req, res) => {
  console.log(`Protected Router`);
  res.send("Protected Route");
};
