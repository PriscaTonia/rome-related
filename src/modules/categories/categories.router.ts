const router = require("express").Router();

import validateById from "../../middlewares/validateById";
import { adminAuth } from "../../middlewares/admin-auth";
import categoryController from "./categories.controller";
import validator from "../../middlewares/validator";
import {
  addCategoryValSchema,
  updateCategoryValSchema,
} from "./categories.validators";

router.get("/categories", categoryController.getCategories);

router.get("/categories/id/:id", categoryController.getCategoryById);
router.get("/categories/:slug", categoryController.getCategoryBySlug);

router.post(
  "/categories",
  [adminAuth, validator(addCategoryValSchema)],
  categoryController.create
);

router.put(
  "/categories/:id",
  [adminAuth, validateById(), validator(updateCategoryValSchema)],
  categoryController.update
);

router.delete(
  "/categories/:id",
  [adminAuth, validateById()],
  categoryController.delete
);

export default router;
