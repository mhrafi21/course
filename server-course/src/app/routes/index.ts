import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { courseRoutes } from '../modules/Course/course.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
