import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { bikeService } from './bike.service';

const createBike = async (req: Request, res: Response) => {
  try {
    // take the given json data from request as payload
    const payload = req.body;
    const result = await bikeService.createBike(payload);

    res.status(200).json({
      success: true,
      message: 'Bike created successfully',
      data: result,
    });
  } catch (error: any) {
    // handling error for invalid input
    if (error.name === 'ValidationError' && error.errors) {
      const field = Object.keys(error.errors)[0];
      if (error.errors[field].name === 'CastError') {
        const invalidValue = error.errors[field].value;
        return res.status(404).json({
          message: `Invalid input for ${field}: ${invalidValue}`,
          success: false,
        });
      }
    }

    //handling error with giving suggesestions
    res.status(500).json({
      message: error._message,
      success: false,
      error: { name: error.name, errors: error.errors },
      stack: error instanceof Error ? error.stack : null,
    });
  }
};

const getBikes = async (req: Request, res: Response) => {
  try {
    // searchTerm can be name,category,brand getting as query
    const searchTerm = req.query.searchTerm as string;

    // get all bikes from Bike model and also filtering by searchTerm
    const result = await bikeService.getBikes(searchTerm);
    res.status(200).send({
      message: 'Bikes retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: { name: error.name, errors: error.errors },
      stack: error instanceof Error ? error.stack : null,
    });
  }
};

const getSingleBike = async (req: Request, res: Response) => {
  try {
    // get the _id of bike in params to retrieve the correct bike
    const productId = req.params.productId;
    // check if the productId is valid _id from bikes collection
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid product ID',
      });
    }
    const result = await bikeService.getSingleBike(productId);

    if (result === null) {
      throw new Error('Invalid Input');
    }
    res.status(200).send({
      message: 'Bike retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: { name: error.name, errors: error.errors },
      stack: error instanceof Error ? error.stack : null,
    });
  }
};

const updateBike = async (req: Request, res: Response) => {
  try {
    // get the productId in parmas
    const productId = req.params.productId;
    // take the json body of bike details from response and send it to update function
    const body = req.body;
    const result = await bikeService.updateBike(productId, body);

    res.send({
      message: 'Bike updated successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    if (error.name === 'CastError') {
      res.status(500).json({
        message: `Invalid input for ${error.path}: ${error.value}`,
        success: false,
      });
    }
    res.status(500).json({
      message: error._message,
      success: false,
      error: { name: error.name, errors: error.errors },
      stack: error instanceof Error ? error.stack : null,
    });
  }
};

const deleteBike = async (req: Request, res: Response) => {
  try {
    // get the productId from params and send it to delete function
    const productId = req.params.productId;
    // check if the productId is valid _id from bikes collection
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid product ID',
      });
    }

    await bikeService.deleteBike(productId);
    res.send({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: { name: error.name, errors: error.errors },
      stack: error instanceof Error ? error.stack : null,
    });
  }
};

export const bikeController = {
  createBike,
  getBikes,
  getSingleBike,
  updateBike,
  deleteBike,
};
