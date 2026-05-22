import dotenv from "dotenv";

import path from "path";
dotenv.config({ quiet: true });
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const config = {
  connection_string: process.env.CONNECTIONSTRING as string,
  port: process.env.PORT,
  accessToken: process.env.JWT_SECRET,
  node_env: process.env.NODE,
  refresh_secret: process.env.RWT_SECRE
};
