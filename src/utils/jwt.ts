import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import type { JwtPayloadType } from "../types";

export const signToken = (payload: JwtPayloadType) => {
  const accessToken = jwt.sign(payload, config.accessToken as string, {
    expiresIn: "1h",
  });
   const refreshToken = jwt.sign(payload, config.refresh_secret as string, {
    expiresIn: "30d",
  });
  return { accessToken,refreshToken };
};


export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret = type === "refresh" ? config.refresh_secret : config.accessToken;
  const decoded = jwt.verify(token, secret as string) as JwtPayload;
  return decoded;
};