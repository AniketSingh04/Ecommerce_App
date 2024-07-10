import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//route - create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//route - update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//route - getall category
router.get("/get-category", categoryController);

//route - single category
router.get("/single-category/:slug", singleCategoryController);

//route - delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
