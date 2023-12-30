import { Types } from "mongoose";

export interface IOrder {
  _id?: string;
  product: Types.ObjectId;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      country: string;
      postal_code: string;
    };
  };
  comments?: string;
  status?: "Pending" | "Confirmed" | "Delivered" | "Disputed" | "Refunded";
}

export interface IPopulatedOrder extends Omit<IOrder, "product"> {
  product: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    brand: string;
    price: number;
    imageUrls: string[];
    category: {
      _id: string;
      name: string;
      slug: string;
      isEnabled: boolean;
    };
  };
}

export interface IReqOrder extends Omit<IOrder, "_id"> {}

export interface INewOrder extends IReqOrder {}
