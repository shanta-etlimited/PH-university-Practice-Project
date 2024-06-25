import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
const app = express();

//parsers
app.use(express.json());
app.use(cors());

//application r outes
app.use("/api/v1/users", UserRoutes)

//application routes
app.use("/api/v1/students", StudentRoutes)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello Ph University!');
});
app.use(notFoundHandler);
app.use(errorHandler);

// console.log(process.cwd());

export default app;
