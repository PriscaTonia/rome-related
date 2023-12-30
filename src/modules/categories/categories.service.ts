import Category from "./categories.model";
import { ICategory, INewCategory, IReqCategory } from "./categories.types";
import { Query, Document, Types, DocumentQuery } from "mongoose";

class CategoryService {
  getCategories(): DocumentQuery<ICategory[], Document<ICategory[]>> {
    return Category.find();
  }

  create(category: INewCategory): Promise<INewCategory & Document> {
    return Category.create(category);
  }

  findById(
    id: string
  ): Query<(ICategory & Document) | null, ICategory & Document> {
    return Category.findById(id);
  }

  findBySlug(slug: string) {
    return Category.findOne({ slug });
  }

  update(
    id: string,
    updateQuery: { [key: string]: any }
  ): Promise<ICategory & Document> {
    return Category.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  // disable(id: string) {
  //   return Category.findByIdAndUpdate(id, { isEnabled: true }, { new: true });
  // }

  delete(id: string) {
    return Category.findByIdAndDelete(id);
  }
}

export default new CategoryService();
