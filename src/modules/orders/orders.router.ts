const router = require("express").Router();

import validateById from "../../middlewares/validateById";
import { adminAuth } from "../../middlewares/admin-auth";
import orderController from "./orders.controller";
import validator from "../../middlewares/validator";
import { addOrderValSchema, updateOrderValSchema } from "./orders.validators";

router.get("/orders", orderController.getOrders);

router.get("/orders/:id", [adminAuth], orderController.getOrderById);

router.post(
  "/orders",
  [adminAuth, validator(addOrderValSchema)],
  orderController.create
);

router.put(
  "/orders/:id",
  [adminAuth, validateById(), validator(updateOrderValSchema)],
  orderController.update
);

router.delete(
  "/orders/:id",
  [adminAuth, validateById()],
  orderController.delete
);
export default router;
