import { Request, Response } from "express";

import response from "../../utils/response";

import orderService from "./orders.service";

import { IReqAdmin } from "../admins/admins.types";

import { IReqOrder } from "./orders.types";
import Stripe from "stripe";
import env from "../../config/env";
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

class OrderController {
  async create(req: Request & { admin: IReqAdmin }, res: Response) {
    let order = req.body as IReqOrder;

    await orderService.create({ ...order });

    res.send(response("Order created successfully"));
  }

  async update(req: Request & { admin: IReqAdmin }, res: Response) {
    const { id } = req.params;

    let updateQuery = req.body as Partial<IReqOrder>;

    const updatedOrder = await orderService.update(id, updateQuery);

    res.send(response("Order updated successfully", updatedOrder));
  }

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const order = await orderService.findById(id).populate("product");
    console.log({ order });

    res.send(response("Order retrieved successfully", order));
  }

  async getOrders(req: Request, res: Response) {
    const orders = await orderService
      .getOrders()
      .populate("category")
      .sort("-createdAt -isSoldOut");

    res.send(response("Orders retrieved successfully", orders));
  }

  async delete(req: Request & { admin: IReqAdmin }, res: Response) {
    const { id } = req.params;
    await orderService.delete(id);

    res.send(response("Order deleted successfully"));
  }
}

export default new OrderController();
