import { Types } from "mongoose";

export interface IProduct {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  category: Types.ObjectId;
  brand: string;
  size: string;
  condition: string;
  price: number;
  imageUrls: string[];
}

export interface IPopulatedProduct extends Omit<IProduct, "category"> {
  category: {
    _id: string;
    name: string;
    slug: string;
    isEnabled: boolean;
  };
}

export interface IReqProduct {
  title: string;
  description: string;
  brand: string;
  size: string;
  condition: string;
  price: number;
  imageUrls: string[];
  category: string;
}

export interface INewProduct extends IReqProduct {
  slug: string;
}
