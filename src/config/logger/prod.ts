import { format, createLogger, transports } from "winston";
const { combine, printf, json, label, timestamp, errors } = format;

const consoleFormat = printf(
  ({ level, message, label, timestamp, stack }: ILogParams) => {
    return `${timestamp}\n[${label}] ${level}:\n${stack || message}\n`;
  }
);

import env from "../../config/env";
import { ILogParams } from "../../lib/interfaces";
const { APP_NAME } = env;

const logger = createLogger({
  format: combine(
    label({ label: APP_NAME }),
    timestamp(),
    errors({ stack: true }),
    json()
  ),
  transports: [
    new transports.Console({
      format: combine(consoleFormat),
    }),
    new transports.File({ filename: "errors.log", level: "error" }),
    new transports.File({ filename: "all-logs.log" }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "unhandled-rejections.log" }),
  ],
});

export default logger;
