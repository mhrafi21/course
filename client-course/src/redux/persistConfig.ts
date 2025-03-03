import { Action, Reducer } from "@reduxjs/toolkit"
import { persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit";

interface IPersist {
    key: string;
    storage: typeof storage;
}

const persistingConfig: IPersist = {
    key: "root",
    storage: storage
}

// export const rootReducer = combineReducers({
//     auth: persistReducer(persistingConfig, authReducer)
// })

// for reusable;
export const makePersistReducer = (reducer: Reducer<unknown, Action> ) => {
    return  combineReducers({
        auth: persistReducer(persistingConfig, reducer)
    })
}