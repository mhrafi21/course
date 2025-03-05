import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errors/AppError";
import { IUser } from "../User/user.interface";

const registrationUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registrationUserIntoDB(req.body as IUser);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User is registered successfully!',
    data: result,
  })
});


const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Login failed');
  }
  const { accessToken, refreshToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});


const forgotPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgotPasswordFromDB(req.body.email as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email is sent successfully!',
    data: result,
  })
})

const resetPassword = catchAsync(async(req,res)=>{
  const result = await AuthServices.resetPasswordFromDB(req.body as { resetToken: string, password: string, confirmPassword: string });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is reset successfully!',
    data: result,
  })
 
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenFromDB(refreshToken as string);
  if (!result) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  const { accessToken, newRefreshToken } = result;
  res.cookie('refreshToken', newRefreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: accessToken,
  });
});

export const AuthControllers = {
  registrationUser,
  loginUser,
  forgotPassword,
  resetPassword,
  refreshToken,
};
