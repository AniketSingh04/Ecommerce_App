import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Create a new router object
const router = express.Router();

// REGISTER route || METHOD: POST
// This route will call the registerController function when a POST request is made to '/register'
router.post("/register", registerController);

//LOGIN || METHOD: POST
router.post("/login", loginController);

//Forgot password || METHOD: POST
router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Export the router object to be used in other parts of the application
export default router;
