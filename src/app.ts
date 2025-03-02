import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHanler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'https://bike-shop-server-beta.vercel.app',
    credentials: true,
  }),
);

//importing router from routes/index.ts

app.use('/api/v1', router);
// app.use('/api/orders', orderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server live',
  });
});

app.use(globalErrorHanler);

// not found route
app.use(notFound);

export default app;
