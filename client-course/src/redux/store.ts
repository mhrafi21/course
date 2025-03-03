import { Action, configureStore, Reducer } from "@reduxjs/toolkit"
import { baseApi } from "./baseApi";
import { persistStore } from "redux-persist"
import authReducer from "./features/Auth/authSlice"
import { makePersistReducer } from "./persistConfig";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        reducer: makePersistReducer(authReducer as Reducer<unknown, Action> )

    }, // Your root reducer goes here. Replace with your actual reducer.

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware( {serializableCheck: false }).concat(baseApi.middleware), // Add the api middleware
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);