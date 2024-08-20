import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//POST Register
export const registerController = async (req, res) => {
  try {
    // Extract user details from request body
    const { name, email, password, phone, address, answer } = req.body;

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
    if (!answer) {
      return res.send({ message: "Answer is Required" });
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
      answer,
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
      expiresIn: "1d",
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

//POST Forgot Password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    //validation
    if (!email) {
      res.status(400).send({ message: "Email is required!" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required!" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required!" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!!!",
      error,
    });
  }
};

//testController
export const testController = (req, res) => {
  console.log(`Protected Router`);
  res.send("Protected Route");
};

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 char long!!!" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};
