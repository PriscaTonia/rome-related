const router = require("express").Router();

import { adminAuth } from "../../middlewares/admin-auth";
import adminController from "../../modules/admins/admins.controller";
import validateBy from "../../middlewares/validator";
import { addAdminValSchema, loginValSchema } from "./admins.validators";

router.post(
  "/admins/create",
  validateBy(addAdminValSchema),
  adminController.create
);

router.post("/admins/login", validateBy(loginValSchema), adminController.login);
router.get("/admins/verify-access", adminAuth, adminController.verifyAccess);

router.post("/admins/logout", adminController.logout);

export default router;
