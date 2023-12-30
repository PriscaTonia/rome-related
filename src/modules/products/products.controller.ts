import { Request, Response } from "express";

import response from "../../utils/response";

import productService from "./products.service";

import { IReqAdmin } from "../../modules/admins/admins.types";
import { slugify } from "../../utils/slugify";

import { INewProduct, IReqProduct } from "./products.types";
import Stripe from "stripe";
import env from "../../config/env";
import { STRIPE_COUNTRY_CODES } from "../../utils/stripe-country-codes";
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

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

    const updatedProduct = await productService.update(id, updateQuery);

    res.send(response("Product updated successfully", updatedProduct));
  }

  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    const product = await productService.findById(id).populate("category");
    console.log({ product });

    res.send(response("Product retrieved successfully", product));
  }

  async getProductDetailsBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const product = await productService.findBySlug(slug);

    res.send(response("Product retrieved successfully", product));
  }

  async getProducts(req: Request, res: Response) {
    const products = await productService
      .getProducts()
      .populate("category")
      .sort("-createdAt -isSoldOut");

    res.send(response("Products retrieved successfully", products));
  }

  async findProducts(req: Request, res: Response) {
    let { q } = req.query;
    let products = await productService.findProducts({
      query: q as string,
    });

    res.send(response("Products retrieved successfully", products));
  }

  async createCheckoutSession(req: Request, res: Response) {
    const { id } = req.params;

    const product = await productService.findById(id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        productId: product._id.toString(),
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description: product.description,
              images: product.imageUrls,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      expires_at: Date.now() + 1000 * 60 * 5, // 5 minutes
      shipping_address_collection: {
        allowed_countries: STRIPE_COUNTRY_CODES,
      },
      phone_number_collection: { enabled: true },
      mode: "payment",
      success_url: `http://localhost:3200/checkout-success`,
      cancel_url: `http://localhost:3200`,
    });

    res.send(response("Checkout created successfully", { link: session.url }));
  }

  async delete(req: Request & { admin: IReqAdmin }, res: Response) {
    const { id } = req.params;
    await productService.delete(id);

    res.send(response("Product deleted successfully"));
  }
}

export default new ProductController();
