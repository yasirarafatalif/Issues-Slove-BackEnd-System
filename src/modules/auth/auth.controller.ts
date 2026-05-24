import type { Request, Response } from "express";
import { authServices } from "./auth.services";
import { signToken } from "../../utils/jwt";
import { sendResponse } from "../../utils/sendResponse";

const singup = async (req: Request, res: Response) => {
  const reuslt = await authServices.singUpService(req.body);
  sendResponse(res, 201, true, "User registered successfully", reuslt);
};
const login = async (req: Request, res: Response) => {
  const reuslt = await authServices.loginService(req.body);
  const { id, name, email, role } = reuslt;
  const { accessToken, refreshToken } = signToken({ id, name, email, role });

  res.cookie("accessToken", accessToken, {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  });

  sendResponse(res, 200, true, "Login successful", {
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
