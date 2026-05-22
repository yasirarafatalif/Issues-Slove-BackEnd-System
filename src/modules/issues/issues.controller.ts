import type { Request, Response } from "express";
import { issuesService } from "./issues.services";

const issueCreateController = async (req: Request, res: Response) => {
  const result = await issuesService.issuesCreateIntoDB(req.body);
  res.status(201).json({ message: "Issue created successfully", data: result });
};

export const issuesController = {
  issueCreateController,
};
