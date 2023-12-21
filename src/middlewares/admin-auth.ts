import { NextFunction, Request, Response } from "express";

import { UnAuthorizedError } from "../config/errors";
import adminsService from "../modules/admins/admins.service";
import { IAdmin } from "../modules/admins/admins.types";

export const adminAuth = async function (
  req: Request & { admin?: any },
  res: Response,
  next: NextFunction
) {
  const authToken =
    req.cookies?.["rome-related-admin-token"] ||
    req.headers?.["rome-related-admin-token"];
  if (!authToken) throw new UnAuthorizedError();
  try {
    const decoded = adminsService.verifyAuthToken(authToken);

    const admin: IAdmin = await adminsService
      .findById(decoded._id)
      .select("-password -__v")
      .lean();

    if (!admin) throw new UnAuthorizedError();

    req.admin = admin;
    next();
  } catch (error) {
    const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
    if (errors.includes(error?.name)) {
      throw new UnAuthorizedError();
    }
    next(error);
  }
};
