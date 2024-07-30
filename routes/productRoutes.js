import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

//create-products
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//upadte-product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get-products
router.get("/get-product", getProductController);

//get-single-product
router.get("/get-product/:slug", getSingleProductController);

//get-photo
router.get("/product-photo/:pid", productPhotoController);

//filter-product
router.post("/product-filters", productFiltersController);

//product-count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//delete router
router.delete("/delete-product/:pid", deleteProductController);

//search product
router.get("/search/:keyword", searchProductController);

//similar products
router.get("/related-product/:pid/:cid", relatedProductController);
export default router;
