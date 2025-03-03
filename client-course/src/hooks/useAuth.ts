import { useAppSelector } from "@/redux/hooks"
import { RootState } from "../redux/store";
import { PersistPartial } from "redux-persist/es/persistReducer";

interface IToken extends PersistPartial {
    token?: string
}


export const useAuth = () => {
    const  {token} : IToken   = useAppSelector((state: RootState) => state.reducer.auth);
    return {token: token}
}