import express, { type Application, type Request, type Response } from "express"
import logger from "./middleware/logger";
import { authRoute } from "./modules/auth/auth.routes";
import globalErrorHandler from "./middleware/globalErrorHandeler";
const app :Application = express();
app.use(express.json());
app.use(logger);


app.get('/', (req: Request, res:Response) => {
  res.status(200).json({
    message :"Server is Running"
  })
});

app.use("/api/auth",authRoute)

app.use(globalErrorHandler)


export default app;