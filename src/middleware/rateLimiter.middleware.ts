import { NextFunction, Request, Response } from "express";
import { RATE_LIMITER_CONFIG } from "../config/rateLimiter.config";
import { rateLimiter } from "../helper/rateLimiter.helper";

export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const clientIp = req.socket.remoteAddress as string;
  const maxNumOfRequest = RATE_LIMITER_CONFIG.MAX_REQUEST;
  const tokenRefillInterval = RATE_LIMITER_CONFIG.REFILL_INTERVAL;
  const cacheExpiry = RATE_LIMITER_CONFIG.TOKEN_CACHE_EXPIRE_IN_SECOND;
  try {
    let allowed = await rateLimiter({
      key: clientIp,
      maxAmount: maxNumOfRequest,
      refillTime: tokenRefillInterval,
      expiryInSeconds: cacheExpiry,
    });
    if (allowed) {
      next();
    } else {
      return res
        .status(429)
        .send({ message: "Too many request! Please try again sometimes" });
    }
  } catch (err) {
    console.log(err);
  }
};
