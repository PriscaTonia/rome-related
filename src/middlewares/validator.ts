import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

import { BadRequestError } from "../config/errors";

const validator = (
  schema: Yup.AnySchema<any> | undefined,
  source: "query" | "body" = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!schema) return next();

    try {
      await schema.validate(req[source]);
      next();
    } catch (error) {
      throw new BadRequestError(error.errors[0]);
    }
  };
};

export default validator;
