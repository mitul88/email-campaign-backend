import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../config/env.config";

declare module "jsonwebtoken" {
  interface userDataPayload extends jwt.JwtPayload {
    _id: string;
    name: string;
    email: string;
    role: string;
  }
}

export const generateJWT = function (userData: any, expiry: any) {
  const token = jwt.sign(
    {
      _id: userData["id"],
      email: userData["email"],
      name: userData["name"],
      role: userData["role"],
    },
    ENV_CONFIG.JWT.SECRET_KEY,
    { expiresIn: expiry }
  );

  return token;
};

export const jwtVerify = (token: string) => {
  return <jwt.userDataPayload>jwt.verify(token, ENV_CONFIG.JWT.SECRET_KEY);
};
