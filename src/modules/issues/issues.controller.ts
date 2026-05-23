import type { Request, Response } from "express";
import { issuesService } from "./issues.services";
import { sendResponse } from "../../utils/sendResponse";

const issuesGetController = async (req: Request, res: Response) => {
  const result = await issuesService.issuesGetIntoDb();
  res.status(200).json({
    success: true,
    message: "Issue created successfully",
    data: result,
  });
};
const issuesGetSingelController = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(typeof id);
  const result = await issuesService.issuesGetSingelIntoDb(id as string);
  res.status(200).json({ success: true, data: result });
};
const issueCreateController = async (req: Request, res: Response) => {
  const user = req.user;
  const result = await issuesService.issuesCreateIntoDB(
    req.body,
    user?.id as number,
  );
  res.status(201).json({ message: "Issue created successfully", data: result });
};
const issueUpdateController = async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  const result = await issuesService.issuesUpdateIntoDb(
    req.body,
    id as string,
    user,
  );
  res.status(200).json({ message: "Issue update successfully", data: result });
};
const issueDeleteController = async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  const result = await issuesService.issuesDeleteIntoDb(id as string);
  return sendResponse(res,201,true,"Issue deleted successfully")
};

export const issuesController = {
  issueCreateController,
  issuesGetController,
  issuesGetSingelController,
  issueUpdateController,
  issueDeleteController,
};
