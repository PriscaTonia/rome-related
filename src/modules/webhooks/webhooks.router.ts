const router = require("express").Router();

import { Request, Response } from "express";
import response from "../../utils/response";
import webhooksController from "./webhooks.controller";

router.post("/webhooks/paystack", async (req: Request, res: Response) => {
  res.send(response("transaction complete"));
});

router.post("/webhooks/stripe", webhooksController.handleStripe);

export default router;
 