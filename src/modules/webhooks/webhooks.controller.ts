import { Request, Response } from "express";
import Stripe from "stripe";
import env from "../../config/env";
import { BadRequestError } from "../../config/errors";
import ordersService from "../orders/orders.service";
import { Types } from "mongoose";
import productsService from "../products/products.service";
import response from "../../utils/response";
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

const endpointSecret = env.STRIPE_ENDPOINT_SECRET_KEY;
class WebhooksController {
  async handleStripe(req: Request, res: Response) {
    // console.log(req.body);
    const sig = req.headers["stripe-signature"] as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      throw new BadRequestError("Stripe Webhook Error:" + err.message);
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      await handleCheckoutSessionCompleted(session);
    }
    res.send(response("Stripe Webhook Handled Successfully"));
  }
}

const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
) => {
  const productId = Types.ObjectId(session.metadata.productId as string);
  const existingProduct = await productsService.findById(
    session.metadata.productId
  );

  if (session.payment_status !== "paid" || !existingProduct) return;

  await ordersService.create({
    product: productId,
    customerInfo: {
      email: session.customer_details.email,
      name: session.customer_details.name,
      phone: session.customer_details.phone,
      address: {
        city: session.customer_details.address.city,
        country: session.customer_details.address.country,
        line1: session.customer_details.address.line1,
        line2: session.customer_details.address.line2,
        postal_code: session.customer_details.address.postal_code,
        state: session.customer_details.address.state,
      },
    },
  });
  await productsService.update(session.metadata.productId, { isSoldOut: true });
};

export default new WebhooksController();
