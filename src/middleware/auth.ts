import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../types";

const authMiddleware = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        // console.log(refreshToken);
        const token = req?.headers.authorization;
        console.log("token", token)
        if (!refreshToken) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: "No token provided",
          });
        }
        next()

    } catch (error: any) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: "Unauthorized",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};

export default authMiddleware;
