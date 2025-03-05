import { Action, Reducer } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

// const persistingConfig = {
//     key: "auth",
//     storage: storage
// }

// export const rootReducer = combineReducers({
//     auth: persistReducer(persistingConfig, authReducer)
// })

// for reusable;
interface IPersistingConfig {
    key: string;
    storage: typeof storage;
}

const persistingConfig: IPersistingConfig = {
    key: "auth",
    storage: storage
}

export const makePersistReducer = (reducer: Reducer<any, Action<any>>): Reducer<any, Action<any>> => {
    return persistReducer(persistingConfig, reducer)
}