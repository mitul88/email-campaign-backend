import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../helper/jwt.helper";
import { ROLE_CONFIG } from "../config/role.config";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  let token = req.header("authorization");
  if (!token) {
    res.status(400).send({ message: "Access denied, no token provided!" });
    res.end();
    return;
  }

  token = token.split(" ")[1].trim();
  const decodedToken = jwtVerify(token) as JwtPayload;
  if (!decodedToken) return res.status(401).send({ message: "invalid token" });

  req.user = decodedToken;
  next();
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (req.user?.role !== ROLE_CONFIG.ADMIN) {
    res.status(403).send("request forbidden");
    res.end();
    return;
  }
  next();
};
