export interface IProduct {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  brand: string;
  price: number;
  imageUrls: string[];
}

export interface IReqProduct {
  title: string;
  description: string;
  brand: string;
  price: number;
  imageUrls: string[];
}

export interface INewProduct extends IReqProduct {
  slug: string;
}

