import express, { type Application, type Request, type Response } from "express"
import logger from "./middleware/logger";
const app :Application = express();



app.use(express.json());
app.use(logger)

app.get('/', (req: Request, res:Response) => {
  res.send('Hello World!');
});


export default app;