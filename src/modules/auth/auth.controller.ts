import type { Request, Response } from "express";
import { authServices } from "./auth.services";

const singup = async (req: Request, res: Response) => {
  const reuslt = await authServices.singUpIntoDb(req.body);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data:reuslt
  });
};

export const authController = {
  singup,
};
