import Admin from "./admins.model";
import { IAdmin } from "../admins/admins.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document, DocumentQuery, Query } from "mongoose";

class AdminService {
  getAllAdmins(): DocumentQuery<IAdmin[], Document<IAdmin[]>> {
    return Admin.find();
  }

  create(admin: IAdmin) {
    return Admin.create(admin);
  }

  findById(id: string) {
    return Admin.findById(id);
  }

  findByEmail(
    email: string
  ): Query<(IAdmin & Document) | null, IAdmin & Document> {
    return Admin.findOne({ email });
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    if (updateQuery.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(updateQuery.password, salt);
      updateQuery.password = hashed;
    }
    return Admin.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Admin.findByIdAndDelete(id);
  }

  async resetPassword(email: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    password = hashed;
    return Admin.findOneAndUpdate({ email }, { password });
  }

  verifyAuthToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY) as {
      _id: string;
      email: string;
    };
  }

  async validPassword(input: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(input, hash || "");
  }
}

export default new AdminService();
