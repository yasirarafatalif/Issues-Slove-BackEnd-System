import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import type { JwtPayloadType, User } from "../types";

export const signToken = (payload: JwtPayloadType) => {
  const accessToken = jwt.sign(payload, config.accessToken as string, {
    expiresIn: "1h",
  });
  return { accessToken };
};
