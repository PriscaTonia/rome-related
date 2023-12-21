import { Request, Response } from "express";

import response from "../../utils/response";

import categoryService from "./categories.service";

import { IReqAdmin } from "../admins/admins.types";
import { slugify } from "../../utils/slugify";

import { IReqCategory } from "./categories.types";

class CategoryController {
  async create(req: Request & { admin: IReqAdmin }, res: Response) {
    let category = req.body as IReqCategory;
    const slug = slugify(`${category.name}`);

    await categoryService.create({ ...category, slug });

    res.send(response("Category created successfully"));
  }

  async update(req: Request & { admin: IReqAdmin }, res: Response) {
    const { id } = req.params;

    let updateQuery = req.body as Partial<IReqCategory>;

    console.log({ updateQuery });

    const updatedCategory = await categoryService.update(id, updateQuery);

    res.send(response("Category updated successfully", updatedCategory));
  }

  async getCategoryBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const category = await categoryService.findBySlug(slug);

    res.send(response("Category retrieved successfully", category));
  }

  async getCategories(req: Request, res: Response) {
    const categories = await categoryService.getCategories();

    res.send(response("Categories retrieved successfully", categories));
  }

  // async delete(req: Request & { admin: IReqAdmin }, res: Response) {
  //   const { id } = req.params;
  //   await categoryService.delete(id);

  //   res.send(response("Category deleted successfully"));
  // }
}

export default new CategoryController();
