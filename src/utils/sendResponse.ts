import express, { type Response } from "express";
export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  result?: any,
) => {
  res.status(statusCode).json({
    success,
    message,
    result,
  });
};
