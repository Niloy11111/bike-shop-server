import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.const';
import { bikeController } from './bike.controller';
import { BikeValidations } from './bike.validation';
const bikeRoutes = Router();

bikeRoutes.post(
  '/create-bike',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidations.createBikeValidationSchema),
  bikeController.createBike,
);
bikeRoutes.get('/bikes', bikeController.getAllBikes);
bikeRoutes.get('/:productId', bikeController.getSingleBike);
bikeRoutes.patch('/:productId', bikeController.updateBike);
bikeRoutes.delete('/:productId', bikeController.deleteBike);

export default bikeRoutes;
