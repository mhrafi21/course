import { TSToken } from '@/interface';
import { jwtDecode } from 'jwt-decode';
export const decodeToken = (token: string) => {
    if (!token) {
        console.error("Token is invalid")
    } else {
        return null
    }

    try {
        if (token) {
            return jwtDecode(token) as TSToken;
        }
    } catch (error) {
        console.log("Failed to decode the token", error);
        return null;
    }

}