import { Request, Response } from "express";

import response from "../../utils/response";


import productService from "./products.service";


import { IReqAdmin } from "../../modules/admins/admins.types";
import { slugify } from "../../utils/slugify";

import { INewProduct, IReqProduct } from "./products.types";

class ProductController {
  async create(req: Request & { admin: IReqAdmin }, res: Response) {
    let product = req.body as IReqProduct;
    const slug = slugify(`${product.title}`);

    await productService.create({ ...product, slug });

    res.send(response("Product created successfully"));
  }

  async update(req: Request & { admin: IReqAdmin }, res: Response) {
    const { id } = req.params;

    let updateQuery = req.body as Partial<IReqProduct>;

    console.log({ updateQuery });

    const updatedProduct = await productService.update(id, updateQuery);

    res.send(response("Product updated successfully", updatedProduct));
  }

  async getProductDetailsBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const product = await productService.findBySlug(slug);

    res.send(response("Product retrieved successfully", product));
  }

  async getProducts(req: Request, res: Response) {
    const products = await productService.getProducts();

    res.send(response("Products retrieved successfully", products));
  }

  async findProducts(req: Request, res: Response) {
    let { q } = req.query;
    let products = await productService.findProducts({
      query: q as string,
    });

    res.send(response("Products retrieved successfully", products));
  }

  async delete(req: Request & { admin: IReqAdmin }, res: Response) {
    const { id } = req.params;
    await productService.delete(id);

    res.send(response("Product deleted successfully"));
  }
}

export default new ProductController();
