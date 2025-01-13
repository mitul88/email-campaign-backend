import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../helper/jwt.helper";
import { ROLE_CONFIG } from "../config/role.config";
import { decode, JwtPayload } from "jsonwebtoken";
import _ from "lodash";

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
  if (decodedToken.exp) {
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      res.status(401).send({
        message: "token expired",
      });
      res.end();
      return;
    }
  }
  req.user = _.pick(decodedToken, ["_id", "role"]);
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
