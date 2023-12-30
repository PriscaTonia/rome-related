const router = require("express").Router();

import validateById from "../../middlewares/validateById";
import { adminAuth } from "../../middlewares/admin-auth";
import productController from "./products.controller";
import validator from "../../middlewares/validator";
import {
  addProductValSchema,
  updateProductValSchema,
} from "./products.validators";

router.get("/products/search", productController.findProducts);

router.get("/products", productController.getProducts);

router.get("/products/id/:id", productController.getProductById);

router.get("/products/:slug", productController.getProductDetailsBySlug);

router.post("/products/checkout/:id", productController.createCheckoutSession);

router.post(
  "/products",
  [adminAuth, validator(addProductValSchema)],
  productController.create
);

router.put(
  "/products/:id",
  [adminAuth, validateById(), validator(updateProductValSchema)],
  productController.update
);

router.delete(
  "/products/:id",
  [adminAuth, validateById()],
  productController.delete
);
export default router;
