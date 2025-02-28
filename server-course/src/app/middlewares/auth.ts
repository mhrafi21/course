import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { TURole } from '../modules/Auth/auth.constant';



const auth = (...requiredRoles: TURole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError(httpStatus.UNAUTHORIZED, ' Your are Unauthorized');
    }
  
    const token = authorization.split(' ')[1];
   

    if(!config.jwt_access_secret){
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'AccessToken secret, Internal Server Error');
    }

    const decoded = jwt.verify(token, config.jwt_access_secret) as JwtPayload;
    console.log(decoded.role, requiredRoles)

    if (!requiredRoles.includes(decoded.role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
    }

    req.user = decoded;

    next();
  });
};

export default auth;
