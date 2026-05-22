import type { Request, Response } from "express";
import { issuesService } from "./issues.services";

const issueCreateController = async (req: Request, res: Response) => {
  const user = req.user;
  const result = await issuesService.issuesCreateIntoDB(req.body , user?.id as number);
  res.status(201).json({ message: "Issue created successfully", data: result });
};

export const issuesController = {
  issueCreateController,
};
