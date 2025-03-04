export interface ICourse {
    _id?: string;
    title: string;
    description: string;
    slug: string;
    price: number;
    instructor?: string;
    studentEnrolled?: string[];
    status: "pending" | "approved"
}

export interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "instructor" | "student";
    agreeToTerms: boolean
}

export interface IUser  {
    _id?: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    needsPasswordChange?: boolean;
    resetPasswordToken?: string;
    role?: 'student' | 'instructor' | 'admin';
    resetPasswordExpires?: Date;
    agreeToTerms: boolean
}

export interface TSToken  {
    username: string | null;
    email: string;
    role: string;
}

export interface TToken {
    accessToken : null | string;
    needsPasswordChange?: boolean;
}
export interface AuthState {
    token: null | string;
}