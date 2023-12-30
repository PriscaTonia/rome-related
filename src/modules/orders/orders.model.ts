import { model, Schema } from "mongoose";

import { IOrder } from "./orders.types";

const orderSchema = new Schema<IOrder>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    customerInfo: {
      address: {
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        line1: {
          type: String,
          required: true,
        },
        line2: {
          type: String,
          default: "",
        },
        postal_code: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    comments: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered", "Disputed", "Refunded"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default model("order", orderSchema);
