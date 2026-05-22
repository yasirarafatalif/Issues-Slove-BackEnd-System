import express, { type Application, type Request, type Response } from "express"
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.routes";
import globalErrorHandler from "./middleware/globalErrorHandeler";
import cookieParser from "cookie-parser";
import { issueRoute } from "./modules/issues/issues.routes";
const app :Application = express();
app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.get('/', (req: Request, res:Response) => {
  res.status(200).json({
    message :"Server is Running"
  })
});

app.use("/api/auth",authRoute)
app.use("/api/issues",issueRoute);

app.use(globalErrorHandler)


export default app;