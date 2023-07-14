import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { postSlice } from "./dashboard/posts/postRedusers";

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [postSlice.name]: postSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer
}) 