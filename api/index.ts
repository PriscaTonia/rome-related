import "express-async-errors";
// import os from "os";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";

import { NotFoundError } from "../src/config/errors";
import errorMiddleware from "../src/middlewares/error";
import routes from "../src/config/routes";
import env from "../src/config/env";
import logger from "../src/config/logger";
import openDBConnection from "../src/config/db";

const app = express();
openDBConnection();

const PORT = env.PORT;
const mode = env.NODE_ENV;

// CORS Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3200",
      "http://localhost:3600",
      "https://romerelated.nz",
      "https://admin.romerelated.nz",
      "https://rome-related.vercel.app",
      "https://rome-related-admin.vercel.app",
    ],
    credentials: true,
    allowedHeaders: [
      "rr-adm-token",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
// Other Middleware
app.use(compression());
app.use(morgan("dev"));
// disabled for vercel
// app.use(express.static("public"));
// app.use("/api/v1/static", express.static("uploads"));

app.post("/api/v1/webhooks/stripe", express.raw({ type: "application/json" }));

app.use(express.json({ limit: "1mb", type: "application/json" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Uncommented

// Routes
app.use("/ping", (req, res) => res.send(`Live`));
app.use("/api/v1/ping", (req, res) => res.send(`Live`));
app.use("/api/v1", routes);

// Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});
app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`app listening at port ${PORT} in ${mode} mode`);
});
