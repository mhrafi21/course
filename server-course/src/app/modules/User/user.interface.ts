import { Document } from 'mongoose';
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  needsPasswordChange?: boolean;
  resetPasswordToken?: string;
  role?: 'student' | 'instructor' | 'admin';
  resetPasswordExpires?: Date;
  agreeToTerms: boolean;
}

export type TTokens = {
  username: string;
  email: string;
  role: string;
};
