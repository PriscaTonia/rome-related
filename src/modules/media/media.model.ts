import { NextFunction } from "express";

import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { InternalServerError } from "../../config/errors";
import { IMedia } from "./media.types";

const mediaSchema = new Schema<IMedia>(
  {
    url: { type: String, default: null },
    duration: { type: Number, default: null },
    size: { type: Number },
    type: { type: String },
    public_id: { type: String },
    filename: { type: String },
    metadata: { type: Object },
  },
  {
    timestamps: true,
  }
);
export default model("media", mediaSchema);
