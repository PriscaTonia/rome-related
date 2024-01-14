import Product from "./products.model";
import { INewProduct, IProduct } from "./products.types";
import { Query, Document, Types, DocumentQuery } from "mongoose";

class ProductService {
  getProducts(): DocumentQuery<IProduct[], Document<IProduct[]>> {
    return Product.find();
  }

  create(product: INewProduct): Promise<INewProduct & Document> {
    return Product.create(product);
  }

  findProducts({
    query,
  }: {
    query: string;
  }): DocumentQuery<IProduct[], Document<IProduct[]>> {
    return Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
      ],
    });
  }

  checkExistingCategory(
    categoryId: string
  ): DocumentQuery<IProduct[], Document<IProduct[]>> {
    return Product.find({ category: Types.ObjectId(categoryId) });
  }

  findById(
    id: string
  ): Query<(IProduct & Document) | null, IProduct & Document> {
    return Product.findById(id);
  }

  findBySlug(slug: string) {
    return Product.findOne({ slug });
  }

  update(
    id: string,
    updateQuery: { [key: string]: any }
  ): Promise<IProduct & Document> {
    return Product.findByIdAndUpdate(id, updateQuery, { new: true });
  }
  
  delete(id: string): Promise<IProduct & Document> {
    return Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }
}

export default new ProductService();
