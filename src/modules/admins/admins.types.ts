import { Types } from "mongoose";

export interface IAdmin {
  name: string;
  email: string;
  password: string;
}

export interface IAdminLogin {
  email: string;
  password: string;
}

export interface IReqAdmin {
  _id: Types.ObjectId;
  email: string;
  name: string;
}
