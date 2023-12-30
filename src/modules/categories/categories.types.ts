export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  isEnabled: boolean;
}

export interface IReqCategory
  extends Omit<ICategory, "_id" | "slug" | "isEnabled"> {}

export interface INewCategory extends IReqCategory {
  slug: string;
}
