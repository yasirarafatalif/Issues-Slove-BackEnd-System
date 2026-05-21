import Router from "express";
import { authController } from "./auth.controller";
const router = Router();


router.get("/",authController.singup);
router.post('/signup',authController.singup)
router.post('/login',authController.login)



export const  authRoute = router;