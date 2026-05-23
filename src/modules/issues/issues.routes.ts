import Router from "express";
import { issuesController } from "./issues.controller";
import { USER_ROLE } from "../../types";
import { authMiddleware, authorizeRoles } from "../../middleware/auth";


const router = Router();
router.post("/",authMiddleware(),authorizeRoles(USER_ROLE.contributor),issuesController.issueCreateController);
router.get("/",issuesController.issuesGetController);
router.get("/:id",issuesController.issuesGetSingelController);
router.put("/:id",authMiddleware(),issuesController.issueUpdateController);
router.delete("/:id",authMiddleware(), authorizeRoles(USER_ROLE.maintainer),issuesController.issueDeleteController);


export const  issueRoute = router;