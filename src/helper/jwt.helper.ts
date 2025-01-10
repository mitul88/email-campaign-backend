import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "../config/env.config";
import { IUser } from "../types/user_data_type";

declare module "jsonwebtoken" {
  interface userDataPayload extends jwt.JwtPayload {
    _id: string;
    name: string;
    email: string;
    role: string;
  }
}

export const generateJWT = function (userData: IUser): string {
  const token = jwt.sign(
    {
      _id: userData["id"],
      email: userData["email"],
      name: userData["name"],
      role: userData["role"],
    },
    ENV_CONFIG.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return token;
};

export const jwtVerify = (token: string) => {
  return <jwt.userDataPayload>jwt.verify(token, ENV_CONFIG.JWT_SECRET);
};
