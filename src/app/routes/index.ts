import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import bikeRoutes from '../modules/bike/bike.router';
import orderRoutes from '../modules/order/order.router';
import UserRoutes from '../modules/user/user.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/products',
    route: bikeRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
