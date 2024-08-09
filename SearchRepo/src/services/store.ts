import {configureStore} from "@reduxjs/toolkit";
import {rootReducers} from "./rootReducers.ts";

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
    reducer: rootReducers,
})