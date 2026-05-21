import Router from "express";
import { authController } from "./auth.controller";
const router = Router();


router.get("/",authController.singup);
router.post('/signup',authController.singup)



export const  authRoute = router;