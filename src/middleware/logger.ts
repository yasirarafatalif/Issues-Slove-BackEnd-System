import type { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logger.txt");

const logger = (req: Request, res: Response, next: NextFunction) => {
  const currentTime = new Date().toLocaleString();

  const logMessage = `
==============================
Method : ${req.method}
Route  : ${req.originalUrl}
Time   : ${currentTime}
IP     : ${req.ip}
==============================
`;

//   console.log(logMessage);

  // Save Log File
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      // console.error("Logger Error:", err);
    }
  });

  next();
};

export default logger;