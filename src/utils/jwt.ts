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
