import {
  Response,
  NextFunction,
  UserDataRequest,
} from "express-serve-static-core";
import { jwtVerify } from "../helper/jwt.helper";
import { userDataPayload } from "jsonwebtoken";
import { ROLE_CONFIG } from "../config/role.config";

declare module "express-serve-static-core" {
  interface UserDataRequest extends Request {
    user: userDataPayload;
  }
}

export const authCheck = async (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("authorization");
  if (!token) {
    return res
      .status(400)
      .send({ message: "Access denied, no token provided!" });
  }

  token = token.split(" ")[1].trim();
  const decodedToken = jwtVerify(token);
  if (!decodedToken) return res.status(401).send({ message: "invalid token" });

  req.user = decodedToken;
  next();
};

export const checkAdmin = async (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== ROLE_CONFIG.ADMIN) {
    return res.status(403).send("request forbidden");
  }
  next();
};
