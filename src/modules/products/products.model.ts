import { model, Schema } from "mongoose";

import { IProduct } from "./products.types";

const productSchema = new Schema<IProduct>(
  {
    brand: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
      default: "",
    },
    condition: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
      default: "",
    },
    isSoldOut: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    publishStatus: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

export default model("product", productSchema);
