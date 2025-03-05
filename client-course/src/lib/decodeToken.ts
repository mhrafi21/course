import { TSToken } from '@/interface';
import {jwtDecode} from 'jwt-decode';
export const decodeToken = (token: string) => {
    if (token) {
        const decoded = jwtDecode(token) ;
        if (decoded) {
            return decoded as TSToken;
        }
    }
    return null;
}