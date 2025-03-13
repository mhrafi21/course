import { decodeToken } from "@/lib/decodeToken";
import { useAppSelector } from "@/redux/hooks";
export const useAuth = () => {
    const token: string = useAppSelector((state) => state?.auth?.token);
    if (token) {
        const user = decodeToken(token as string)
        return { token: token, isAuthenticated: !!token, user }
    }
}