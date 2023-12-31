import { Request, Response } from "express";

import response from "../../utils/response";

import adminService from "../admins/admins.service";

import { IAdmin, IAdminLogin } from "./admins.types";
import { generateAuthToken } from "../../utils/token";
import { UnAuthorizedError } from "../../config/errors";
import omit from "lodash.omit";
import env from "../../config/env";
import productsService from "../products/products.service";
import categoriesService from "../categories/categories.service";

class AdminController {
  async create(req: Request, res: Response) {
    const admin = req.body as IAdmin;
    const createdAdmin = await adminService.create(admin);

    res.send(response("Admin created successfully", createdAdmin));
  }

  async login(req: Request, res: Response) {
    const credentials = req.body as IAdminLogin;
    const Admin = await adminService.findByEmail(credentials.email);

    if (!Admin) throw new UnAuthorizedError("Invalid Email or Password");

    const isValidPassword = await adminService.validPassword(
      credentials.password,
      Admin.password
    );

    if (!isValidPassword)
      throw new UnAuthorizedError("Invalid Email or Password");

    const filteredAdmin = omit(Admin, ["password", "__v"]);

    const jwt = generateAuthToken(filteredAdmin);

    res.cookie("rr-adm-token", jwt, env.authCookieConfig);

    res.send(response("Admin login successful"));
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
    res.clearCookie("rr-adm-token", { httpOnly: true });
    res.send(response("Admin logged out successfully"));
  }

  async getAllAdmins(req: Request & { admin: IAdmin }, res: Response) {
    const admins = await adminService.getAllAdmins().select("name email");

    res.send(response("All Admins retrieved successfully", admins));
  }

  async getAdminDetails(req: Request & { admin: IAdmin }, res: Response) {
    const { id } = req.params;
    const admin = await adminService.findById(id).select("name email");

    res.send(response("Admin details retrieved successfully", admin));
  }

  async dashboardHome(req: Request & { admin: IAdmin }, res: Response) {
    const products = await productsService.getProducts();
    const admins = await adminService.getAllAdmins().select("name email");
    const categories = await categoriesService.getCategories();

    res.send(
      response("All Data retrieved successfully", {
        products,
        admins,
        categories,
        currentAdmin: req.admin,
      })
    );
  }
}

export default new AdminController();
