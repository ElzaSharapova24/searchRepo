import {combineReducers} from "@reduxjs/toolkit";
import {repositoriesReducers, repositoriesSlice} from "./slices/repositoriesSlice.ts";

export const rootReducers = combineReducers({
    [repositoriesSlice.name]: repositoriesReducers,
})