import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
// import { AuthValidation } from './auth.validation';

const router = express.Router();
router.post('/register', AuthControllers.registrationUser);
router.post('/login', AuthControllers.loginUser);

router.post(
  '/change-password',
  // auth(USER_ROLE.student as TURole, USER_ROLE.admin as TURole),
  // validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.forgotPassword,
);

// reset-password

router.post('/reset-password', AuthControllers.resetPassword);

router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
