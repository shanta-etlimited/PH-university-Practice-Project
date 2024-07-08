import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1", router)

const test = async(req: Request, res: Response)=>{
  Promise.reject();
}

//root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Ph University!');
});

//middleware of error handling and not found
app.use(globalErrorHandler)
app.use(notFound)

// console.log(process.cwd());

export default app;
