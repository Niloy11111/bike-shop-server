import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import globalErrorHanler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import { BlogRouter } from './app/modules/Blog/blog.route';
import router from './app/routes';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cookieParser());

//importing router from routes/index.ts
app.use('/api', router);
app.use('/api', BlogRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server live',
  });
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'api not found',
  });
});

app.use(globalErrorHanler);

// not found route
app.use(notFound);

export default app;
