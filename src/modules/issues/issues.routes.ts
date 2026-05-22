import Router from "express";
import { issuesController } from "./issues.controller";
import authMiddleware from "../../middleware/auth";
import { USER_ROLE } from "../../types";


const router = Router();
router.post("/",authMiddleware(USER_ROLE.contributor),issuesController.issueCreateController);
router.get("/",issuesController.issuesGetController);
router.get("/:id",issuesController.issuesGetSingelController);


export const  issueRoute = router;