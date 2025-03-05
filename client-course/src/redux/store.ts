import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "./baseApi";
import { persistStore } from "redux-persist"
import authReducer from "./features/Auth/authSlice"
import { makePersistReducer } from "./persistConfig";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: makePersistReducer(authReducer)

    }, // Your root reducer goes here. Replace with your actual reducer.

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
       }).concat(baseApi.middleware), // Add the api middleware
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);