const router = require("express").Router();

import validateById from "../../middlewares/validateById";
import { adminAuth } from "../../middlewares/admin-auth";
import productController from "./products.controller";
import validator from "../../middlewares/validator";
import { addProductValSchema } from "./products.validators";

router.get("/products/search", productController.findProducts);

router.post(
  "/products",
  [adminAuth, validator(addProductValSchema)],
  productController.create
);

router.put(
  "/products/:id",
  [adminAuth, validateById, validator(addProductValSchema)],
  productController.update
);

router.delete(
  "/products/:id",
  [adminAuth, validateById],
  productController.delete
);

router.get("/products", productController.getProducts);

router.get("/products/:slug", productController.getProductDetailsBySlug);

export default router;
