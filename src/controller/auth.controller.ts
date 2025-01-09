import { Request, Response } from "express-serve-static-core";
import { authRequestDto, authResponseDto } from "../dto/auth.dto";
import { User } from "../models/user.model";
import { hashPassword, validatePassword } from "../helper/password.helper";
import { generateJWT } from "../helper/jwt.helper";
import { ROLE_CONFIG } from "../config/role.config";

export const login = async (
  req: Request<{}, {}, authRequestDto>,
  res: Response<authResponseDto>
) => {
  const { email, password } = req.body;
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
    const validUser = validatePassword(password, user.password);
    if (!validUser) {
      res.status(401).send({ message: "incorrect password" });
      res.send();
      return;
    }
    // send token if password match successful
    const token = generateJWT(user);
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
  const hashedPass = await hashPassword(password);
  user.password = hashedPass;
  user.role = ROLE_CONFIG.CAMPAIGN_MANAGER;
  user.save();

  res.status(201).send({ message: "user registry successfull" });
  res.end();
  return;
};
