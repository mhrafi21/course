export interface ICourse {
    _id?:string;
    title: string;
    description: string;
    price: number;
    instructor?: string;
    studentEnrolled?: string[];
    status: "pending" | "approved"
}