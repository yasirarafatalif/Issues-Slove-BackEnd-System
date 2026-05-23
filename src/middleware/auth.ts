import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../types";
import { verifyToken } from "../utils/jwt";
import { sql } from "../db";
import { sendResponse } from "../utils/sendResponse";

export const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const refreshToken = req.cookies?.refreshToken;
      // console.log(refreshToken);
      const token = req?.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
          error: "No token provided",
        });
      }

      const decode = verifyToken(token as string, "refresh");
      const findUser = await sql`
  SELECT id, name, email, role
  FROM users
  WHERE email = ${decode.email}
`;

      const user = findUser[0];
      // console.log(user)

      if (!findUser) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
          error: "User Not found",
        });
      }
      (req as any).user = user;
      next();
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

export const authorizeRoles = (...roles: ROLES[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendResponse(res, 403, false, "User Not Found");
    }

    if (!roles.includes(req.user.role)) {
      return sendResponse(res, 403, false, "Forbiden Access");
    }

    return next();
  };
};
