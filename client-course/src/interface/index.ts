export interface ICourse  {
    _id?: string;
    title: string;
    category: string;
    category_slug: string;
    description: string;
    price: number;
    discountPrice: number;
    duration?: string;
    thumbnail: string;
    language: string;
    lesson: number;
    slug: string;
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

export type TSToken = {
    id?: string;
    username: string;
    email: string;
    role: string;
}

export interface TToken {
    accessToken : null | string;
    needsPasswordChange?: boolean;
}
export interface AuthState {
    token:  string;
}