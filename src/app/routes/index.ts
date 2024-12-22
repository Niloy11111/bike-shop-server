import { Router } from 'express';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
