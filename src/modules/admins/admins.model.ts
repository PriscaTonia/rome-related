import { NextFunction } from "express";

import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { InternalServerError } from "../../config/errors";

import { IAdmin } from "../../modules/admins/admins.types";

const adminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    password: {
      type: String,
      default: null,
      minlength: 1,
      maxlength: 1024,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.pre(["save"], async function (next: NextFunction) {
  try {
    if (!this.isNew || !this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;

    next();
  } catch (error) {
    throw new InternalServerError(error);
  }
});

adminSchema.pre(["updateOne"], async function (next: NextFunction) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.password, salt);
    this.password = hashed;

    next();
  } catch (error) {
    throw new InternalServerError(error);
  }
});

export default model("admin", adminSchema);
