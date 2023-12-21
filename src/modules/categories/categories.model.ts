import { model, Schema } from "mongoose";

import { ICategory } from "./categories.types";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("categories", categorySchema);
