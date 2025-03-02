import express from 'express';
import auth from '../../middleware/auth';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', auth('admin'), AdminControllers.blockUser);

router.delete('/users/:id', auth('admin'), AdminControllers.deleteUserByAdmin);

export const AdminRoutes = router;
