import { IUser, TTokens } from "../User/user.interface";
import bcrypt from 'bcryptjs';
import User from "../User/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../utils/jwt";
import { sendEmail } from "../../utils/sendEmail";
import config from "../../config";
const registrationUserIntoDB = async (payload: IUser) => {
  // logic here


  const { username, email, password, confirmPassword, role,agreeToTerms } = payload;

  if (password !== confirmPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Passwords do not match');
  }

  // check if user exists
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exists');

  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await User.create({
    username,
    email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
    role,
    agreeToTerms,
    needsPasswordChange: true, // set to true for first login
  });

  return result;

}
const loginUserIntoDB = async (payload: IUser) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found',);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.confirmPassword);
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const userObj = { id: user._id ,username: user.username, email: user.email, role: user.role }

  // generate tokens
  const accessToken = generateAccessToken(userObj as TTokens);
  const refreshToken = generateRefreshToken(userObj as TTokens);
  return { accessToken, refreshToken, needsPasswordChange: user.needsPasswordChange, username: user.username, email: user.email };



}
const forgotPasswordFromDB = async (payload: string) => {
  // logic here

  const user = await User.findOne({ email: payload });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // generate reset token
  const userObj = { username: user.username, email: user.email, role: user.role }
  const resetToken = generateAccessToken(userObj as TTokens);
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  await user.save();
  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

  // send email
  const result = await sendEmail(user.email, "Password Reset", `Click here to reset your password: ${resetUrl}`);
  return result;
}

export const resetPasswordFromDB = async (payload: { resetToken: string, password: string, confirmPassword: string }) => {
  const { resetToken, password, confirmPassword } = payload;
  const decoded = verifyToken(resetToken as string, config.jwt_access_secret as string);
  const user = await User.findOne({
    email: decoded.email,
    resetPasswordToken: resetToken,
    resetPasswordExpires: { $gt: new Date() }
  });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid token for changing password');
  }

  if (password !== confirmPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Passwords do not match');
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;
  user.confirmPassword = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return user;


}

const refreshTokenFromDB = async (payload: string) => {
  const refreshToken = payload;

  // logic here
  // check if token is valid
  const decoded = verifyToken(refreshToken, config.jwt_refresh_secret as string);

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const userObj = { username: user.username, email: user.email, role: user.role }
  const accessToken = generateAccessToken(userObj as TTokens);
  const newRefreshToken = generateRefreshToken(userObj as TTokens);
  return { accessToken, newRefreshToken };
}

export const AuthServices = {
  registrationUserIntoDB,
  loginUserIntoDB,
  forgotPasswordFromDB,
  resetPasswordFromDB,
  refreshTokenFromDB,
};
