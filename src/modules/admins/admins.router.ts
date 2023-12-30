const router = require("express").Router();

import { adminAuth } from "../../middlewares/admin-auth";
import adminController from "../../modules/admins/admins.controller";
import validateBy from "../../middlewares/validator";
import { addAdminValSchema, loginValSchema } from "./admins.validators";

router.post(
  "/admins",
  validateBy(addAdminValSchema),
  adminController.create
);


router.get("/admins", adminAuth, adminController.getAllAdmins);
router.get("/admins/verify-access", adminAuth, adminController.verifyAccess);
router.post("/admins/login", validateBy(loginValSchema), adminController.login);
router.get("/admins/:id", adminAuth, adminController.getAdminDetails);

router.post("/admins/logout", adminController.logout);

router.put("/admins/:id", adminAuth, adminController.updateAdmin);
router.delete("/admins/:id", adminAuth, adminController.deleteAdmin);
export default router;
