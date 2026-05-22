import type { Request, Response } from "express";
import { issuesService } from "./issues.services";

const issuesGetController = async (req: Request, res: Response) => {
  const result = await issuesService.issuesGetIntoDb()
  res.status(201).json({ success: true, message: "Issue created successfully", data: result });
};
const issuesGetSingelController = async (req: Request, res: Response) => {
  const {id} = req.params;
  console.log(typeof(id))
  const result = await issuesService.issuesGetSingelIntoDb( id as string )
  res.status(201).json({success: true, data: result });
};
const issueCreateController = async (req: Request, res: Response) => {
  const user = req.user;
  const result = await issuesService.issuesCreateIntoDB(req.body , user?.id as number);
  res.status(201).json({ message: "Issue created successfully", data: result });
};

export const issuesController = {
  issueCreateController,
  issuesGetController,
  issuesGetSingelController
};
