import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { TTokens } from "../modules/User/user.interface";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

export const generateAccessToken = (userInfo: TTokens): string => {
    return jwt.sign(userInfo, config.jwt_access_secret as string, { expiresIn: "15m" })
}

export const generateRefreshToken = (userInfo: TTokens): string => {
    return jwt.sign(userInfo, config.jwt_refresh_secret as string, { expiresIn: "7d" })
}

export const verifyToken = (token: string, secret: string): JwtPayload => {
    const verifyTk = jwt.verify(token, secret);
    if (!verifyTk) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid token');
    }
    return verifyTk as JwtPayload;

}