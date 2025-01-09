import { Request, Response } from "express-serve-static-core";
import { loginRequestDto, loginResponseDto } from "../dto/login.dto";
import { User } from "../models/user.model";
import { validatePassword } from "../helper/password.helper";
import { generateJWT } from "../helper/jwt.helper";

export const login = async (
  req: Request<{}, {}, loginRequestDto>,
  res: Response<loginResponseDto>
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
