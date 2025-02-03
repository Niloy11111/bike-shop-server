import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHanler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import bikeRouter from './app/modules/bike/bike.router';
import orderRouter from './app/modules/order/order.router';
const app: Application = express();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors());

//importing router from routes/index.ts
app.use('/api/products', bikeRouter);
app.use('/api/orders', orderRouter);

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
