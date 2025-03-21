import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { courseRoutes } from '../modules/Course/course.route';
import { enrolmentRoutes } from '../modules/Enrollment/enrollment.route';
import { paymentRoutes } from '../modules/Payment/payment.route';
import { lectureRoutes } from '../modules/Lecture/lecture.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
  {
    path: '/enroll',
    route: enrolmentRoutes,
  },
  {
    path: "/lectures",
    route: lectureRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
