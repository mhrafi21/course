import { TSToken } from "@/interface";
import { decodeToken } from "@/lib/decodeToken";
import { useAppSelector } from "@/redux/hooks";
export const useAuth = () => {
    const token: string = useAppSelector((state) => state?.auth?.token);
    const user = decodeToken(token as string) as TSToken
    return { token: token, isAuthenticated: !!token, user }
}