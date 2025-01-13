import { Request, Response } from "express";
import { authRequestDto, authResponseDto } from "../dto/auth.dto";
import { User } from "../models/user.model";
import { hashPassword, validatePassword } from "../helper/password.helper";
import { generateJWT, jwtVerify } from "../helper/jwt.helper";
import { ROLE_CONFIG } from "../config/role.config";
import { validateLogin } from "../helper/validateInput.helper";
import _ from "lodash";
import { ENV_CONFIG } from "../config/env.config";
import { JwtPayload } from "jsonwebtoken";

export const login = async (
  req: Request<{}, {}, authRequestDto>,
  res: Response<authResponseDto>
) => {
  const { email, password } = req.body;
  const { error } = validateLogin(_.pick(req.body, ["email", "password"]));
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    res.end();
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({
        message: "user email not found",
      });
      res.end();
      return;
    }
    // verify user by password
    const validUser = await validatePassword(
      password.toString(),
      user.password
    );
    if (!validUser) {
      res.status(401).send({ message: "incorrect password" });
      res.end();
      return;
    }
    // send token if password match successful
    const token = generateJWT(
      _.pick(user, ["_id", "email", "name", "role"]),
      ENV_CONFIG.JWT.EXPIRATION
    );
    const refreshToken = generateJWT(
      {
        ..._.pick(user, ["_id", "role"]),
        tokenId: ENV_CONFIG.JWT.REFRESH_TOKEN_ID,
        iat: Date.now(),
        exp: ENV_CONFIG.JWT.REFRESH_TOKEN_EXPIRATION,
      },
      ENV_CONFIG.JWT.REFRESH_TOKEN_EXPIRATION
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
    res.status(200).send({ message: "login successful", token });
    res.end();
    return;
  } catch (error) {
    res.status(500).send({ message: "internal error" });
    res.end();
    return;
  }
};

export const register = async (
  req: Request<{}, {}, authRequestDto>,
  res: Response<authResponseDto>
) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).send({ message: "Email already registered" });
    res.end();
    return;
  }
  // register new user
  const user = new User({ email, name });
  const hashedPass = await hashPassword(password.toString());
  user.password = hashedPass;
  user.role = ROLE_CONFIG.CAMPAIGN_MANAGER;
  user.save();

  res.status(201).send({ message: "user registry successfull" });
  res.end();
  return;
};

export const refreshTokenHandler = (req: Request, res: Response): void => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).send({ message: "refresh token missing" });
    res.end();
    return;
  }

  try {
    const payload = jwtVerify({
      ...refreshToken,
      tokenId: ENV_CONFIG.JWT.REFRESH_TOKEN_ID,
      iat: Date.now(),
      exp: ENV_CONFIG.JWT.REFRESH_TOKEN_EXPIRATION,
    }) as JwtPayload;
    const token = generateJWT(payload, ENV_CONFIG.JWT.EXPIRATION);
    res.status(200).send({ message: "new access token fetched", token });
    res.end();
    return;
  } catch (error) {
    res.status(403).send({ message: "invalid refresh token" });
    res.end();
    return;
  }
};
