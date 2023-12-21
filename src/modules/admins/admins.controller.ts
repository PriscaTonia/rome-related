import { Request, Response } from "express";

import response from "../../utils/response";

import adminService from "../admins/admins.service";

import { IAdmin, IAdminLogin } from "./admins.types";
import { generateAuthToken } from "../../utils/token";
import { UnAuthorizedError } from "../../config/errors";
import omit from "lodash.omit";
import env from "../../config/env";

class AdminController {
  async create(req: Request, res: Response) {
    const admin = req.body as IAdmin;
    const createdAdmin = await adminService.create(admin);

    res.send(response("Admin created successfully", createdAdmin));
  }

  async login(req: Request, res: Response) {
    const credentials = req.body as IAdminLogin;
    const Admin = await adminService.findById(credentials.email);

    if (!Admin) throw new UnAuthorizedError("Invalid Email or Password");

    const isValidPassword = await adminService.validPassword(
      credentials.password,
      Admin.password
    );

    if (!isValidPassword)
      throw new UnAuthorizedError("Invalid Email or Password");

    const jwt = generateAuthToken(Admin);
    const admin = omit(Admin._doc, ["password", "__v"]);

    res.cookie("rome-related-admin-token", jwt, env.authCookieConfig);

    res.send(response("Admin login successful", admin));
  }

  async updateAdmin(req: Request, res: Response) {
    const { id } = req.params;
    const updateQuery = req.body;
    const admin: IAdmin = await adminService.update(id, updateQuery);

    res.send(response("Admin updated successfully", admin));
  }

  async deleteAdmin(req: Request, res: Response) {
    const { id } = req.params;
    await adminService.delete(id);

    res.send(response("Admin deleted successfully"));
  }

  async verifyAccess(req: Request & { admin: IAdmin }, res: Response) {
    res.send(response("Admin verified successfully", req.admin));
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("rome-related-admin-token", { httpOnly: true });
    res.send(response("Admin logged out successfully"));
  }
}

export default new AdminController();
