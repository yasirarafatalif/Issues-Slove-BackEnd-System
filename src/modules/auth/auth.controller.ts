import type { Request, Response } from "express";
import { authServices } from "./auth.services";
import { signToken } from "../../utils/jwt";

const singup = async (req: Request, res: Response) => {
  const reuslt = await authServices.singUpIntoDb(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: reuslt,
  });
};
const login = async (req: Request, res: Response) => {
  const reuslt = await authServices.loginIntoDb(req.body);
  const { id, name, email, role } = reuslt;
  const { accessToken } = signToken({ id, name, email, role });
  res.status(201).json({
    success: true,
    message: "Login successful",
    data: {
      token: accessToken,
      user: reuslt,
    },
  });
};

export const authController = {
  singup,
  login,
};
