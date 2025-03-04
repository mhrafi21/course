import { useAppSelector } from "@/redux/hooks"
import { RootState } from "../redux/store";
import { PersistPartial } from "redux-persist/es/persistReducer";
import { decodeToken } from "@/lib/decodeToken";


interface IToken extends PersistPartial {
    token?: string
}


export const useAuth = () => {
    const  {token} : IToken   = useAppSelector((state: RootState) => state.reducer.auth);
   const decoded  = decodeToken(token as  string | null );
    return {token: token, isAuthenticated: !!token, user: decoded}
}