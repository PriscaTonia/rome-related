const router = require("express").Router();

import adminRouter from "../modules/admins/admins.router";
import productRouter from "../modules/products/products.router";
import categoryRouter from "../modules/categories/categories.router";
import mediaRouter from "../modules/media/media.router";
import allRouter from "../modules/all/all.router";
import ordersRouter from "../modules/orders/orders.router";

import webhooksRouter from "../modules/webhooks/webhooks.router";

router.use(adminRouter);
router.use(productRouter);
router.use(categoryRouter);
router.use(webhooksRouter);
router.use(mediaRouter);
router.use(allRouter);
router.use(ordersRouter);
export default router;
