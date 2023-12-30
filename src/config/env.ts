require("dotenv").config();
const envName = process.env.NODE_ENV || "development";

interface Ienv {
  NODE_ENV: string;
  DB_URI: string;
  PORT: number | string;
  APP_NAME: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_ENDPOINT_SECRET_KEY: string;
  CLOUDINARY_CONFIG: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  };
  authCookieConfig: { [key: string]: any };
  CLOUDINARY_FOLDER: string;
  ADMIN_URL: string;
  CLIENT_URL: string;
  [key: string]: any;
}

interface IenvMap {
  [key: string]: Ienv;
}

//acommon environmental variables for all environments
const common: any = {
  APP_NAME: process.env.APP_NAME || "rome-related",
  BASE_URL: process.env.BASE_URL,
  PORT: process.env.PORT || 3400,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLOUDINARY_CONFIG: {
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  },
};
const development: Ienv = {
  NODE_ENV: "development",
  DB_URI: `mongodb://localhost:27017/${common.APP_NAME}`,
  authCookieConfig: {
    httpOnly: true,
    domain: "localhost",
    secure: false,
    sameSite: "strict",
  },
  CLIENT_URL: "http://localhost:3200",
  ADMIN_URL: "http://localhost:3600",
  CLOUDINARY_FOLDER: "rome-related_dev",
  STRIPE_SECRET_KEY: process.env.STRIPE_TEST_SECRET_KEY,
  STRIPE_ENDPOINT_SECRET_KEY: process.env.STRIPE_TEST_ENDPOINT_SECRET_KEY,
  ...common,
};

const production: Ienv = {
  NODE_ENV: "production",
  DB_URI: process.env.DB_URI,
  STRIPE_SECRET_KEY: process.env.STRIPE_LIVE_SECRET_KEY,
  STRIPE_ENDPOINT_SECRET_KEY: process.env.STRIPE_LIVE_ENDPOINT_SECRET_KEY,
  authCookieConfig: {
    httpOnly: true,
    domain: "rome-related.nz",
    secure: true,
    sameSite: "strict",
  },
  CLIENT_URL: "https://rome-related.nz",
  ADMIN_URL: "https://admin.rome-related.nz",
  CLOUDINARY_FOLDER: "rome-related_prod",
  ...common,
};

const test: Ienv = {
  NODE_ENV: "test",
  DB_URI: `mongodb://localhost:27017/${common.APP_NAME}_test`,
  ...common,
};

const config: IenvMap = {
  development,
  production,
  test,
};

export default config[envName];
