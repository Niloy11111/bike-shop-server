import { Router } from 'express';
import { bikeController } from './bike.controller';
const bikeRouter = Router();

bikeRouter.post('/', bikeController.createBike);
bikeRouter.get('/', bikeController.getAllBikes);
bikeRouter.get('/:productId', bikeController.getSingleBike);
bikeRouter.put('/:productId', bikeController.updateBike);
bikeRouter.delete('/:productId', bikeController.deleteBike);

export default bikeRouter;
