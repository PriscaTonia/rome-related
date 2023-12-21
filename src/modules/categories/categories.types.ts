export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  isDisabled: boolean;
}

export interface IReqCategory
  extends Omit<ICategory, "_id" | "slug" | "isDisabled"> {}

export interface INewCategory extends IReqCategory {
  slug: string;
}