import { Request, Response } from 'express';
import Order from '../order/order.model';

const calculatetotalRevenue = async (req: Request, res: Response) => {
  try {
    // calculate sum of the totalPrice field using $group with mongodb aggregation
    const totalAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);

    res.send({
      message: 'Revenue calculated successfully',
      status: true,
      data: totalAmount[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: { name: error.name, errors: error.errors },
      stack: error instanceof Error ? error.stack : null,
    });
  }
};

export const revenueController = {
  calculatetotalRevenue,
};
