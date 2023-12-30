import Order from "./orders.model";
import { INewOrder, IOrder } from "./orders.types";
import { Query, Document, Types, DocumentQuery } from "mongoose";

class OrderService {
  getOrders(): DocumentQuery<IOrder[], Document<IOrder[]>> {
    return Order.find();
  }

  create(order: INewOrder): Promise<INewOrder & Document> {
    return Order.create(order);
  }

  findById(id: string): Query<(IOrder & Document) | null, IOrder & Document> {
    return Order.findById(id);
  }

  update(
    id: string,
    updateQuery: { [key: string]: any }
  ): Promise<IOrder & Document> {
    return Order.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string): Promise<IOrder & Document> {
    return Order.findByIdAndDelete(id);
  }
}

export default new OrderService();
