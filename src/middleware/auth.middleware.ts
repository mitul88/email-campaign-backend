import { Request, Response, NextFunction } from "express-serve-static-core";
import { jwtVerify } from "../helper/jwt.helper";
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user: string | JwtPayload;
  }
}

export const authCheck = async (
  req: Request,
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
