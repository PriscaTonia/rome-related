import { Request, Response } from "express";
import response from "../../utils/response";
import Stripe from "stripe";
import env from "../../config/env";
import { BadRequestError } from "../../config/errors";
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
    res.send();
  }
}

export default new WebhooksController();
