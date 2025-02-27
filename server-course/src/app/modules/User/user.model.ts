import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password is required'],
    },
    needsPasswordChange: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    resetPasswordExpires: Date,
}, { timestamps: true });

const  User = model<IUser>('User', userSchema);

export default User;