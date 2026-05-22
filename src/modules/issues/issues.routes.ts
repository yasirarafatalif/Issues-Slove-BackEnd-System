import Router from "express";
import { issuesController } from "./issues.controller";
import authMiddleware from "../../middleware/auth";
import { USER_ROLE } from "../../types";


const router = Router();
router.post("/",authMiddleware(USER_ROLE.contributor),issuesController.issueCreateController);


export const  issueRoute = router;