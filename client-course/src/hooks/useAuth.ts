import { decodeToken } from "@/lib/decodeToken";
import { useAppSelector } from "@/redux/hooks";
export const useAuth = () => {
    const token: string = useAppSelector((state) => state?.auth?.token);
    if (!token) {
        console.error("Token is not exists")
    }
    try {
        const user = decodeToken(token as string)
        return { token: token, isAuthenticated: !!token, user }

    } catch (error) {
        console.error("Error in decoding token", error)
        return { token: "", isAuthenticated: !!token, user: null }
    }
}