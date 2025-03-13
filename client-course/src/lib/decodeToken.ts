import { TSToken } from '@/interface';
import { jwtDecode } from 'jwt-decode';
export const decodeToken = (token: string) => {

    if (!token) {
        console.error("Token is invalid")
    }

    try {
        if (token) {
         const tuser=jwtDecode(token) as TSToken;
         return tuser;
        }
    } catch (error) {
        console.log("Failed to decode the token", error);
        return null;
    }

}