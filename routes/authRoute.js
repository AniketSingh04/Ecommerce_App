import express from "express";
import { registerController, loginController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Create a new router object
const router = express.Router();

// REGISTER route || METHOD: POST
// This route will call the registerController function when a POST request is made to '/register'
router.post('/register', registerController);

//LOGIN || METHOD: POST
router.post('/login',loginController);

//test route
router.get('/test',requireSignIn, isAdmin,testController);

// Export the router object to be used in other parts of the application
export default router;
