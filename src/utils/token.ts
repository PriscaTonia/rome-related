import jwt from "jsonwebtoken";
import env from "../config/env";

interface ITokenOptions {
  length: number;
  range: string[] | number[];
  prefix: string;
}

const generateToken = ({ length, range, prefix }: ITokenOptions) => {
  prefix = prefix || "";
  let token = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * range.length);
    token += range[randomIndex];
  }
  return prefix + token;
};

const generateSignUpToken = () => {
  let range = Array.from(Array(10).keys());
  let tokenOptions = { length: 5, range, prefix: "SZ-" };
  let newToken = generateToken(tokenOptions);

  return newToken;
};

const generateAuthToken = (user: any) => {
  let dataToSign = { _id: user._id, email: user.email };
  return jwt.sign({ ...dataToSign }, env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

function generateRandomString(length: number = 4) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export { generateSignUpToken, generateAuthToken, generateRandomString };
