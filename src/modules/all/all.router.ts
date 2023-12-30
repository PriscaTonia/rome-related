const router = require("express").Router();

import response from "../../utils/response";
import { adminAuth } from "../../middlewares/admin-auth";
import adminsService from "../admins/admins.service";
import { IAdmin } from "../admins/admins.types";
import categoriesService from "../categories/categories.service";
import productsService from "../products/products.service";
import { Response, Request } from "express";
import ordersService from "../orders/orders.service";

router.get(
  "/all",
  adminAuth,
  async (req: Request & { admin: IAdmin }, res: Response) => {
    const products = await productsService.getProducts().sort("-createdAt");
    const admins = await adminsService.getAllAdmins().select("name email");
    const categories = await categoriesService.getCategories();
    const orders = await ordersService.getOrders().populate("product");

    res.send(
      response("All Data retrieved successfully", {
        products,
        admins,
        categories,
        orders,
        currentAdmin: req.admin,
      })
    );
  }
);

export default router;
