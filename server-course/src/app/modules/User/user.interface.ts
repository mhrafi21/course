import { Document } from "mongoose";
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    needsPasswordChange?: boolean;
    resetPasswordToken?: string;
    role?: string;
    resetPasswordExpires?: Date;
}

export type TTokens = {
    username: string;
    email: string;
    role: string;
}