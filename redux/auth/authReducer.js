import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    nickName: null,
    stateChande: false,
    currentPosition: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickName: payload.nickName,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChande: payload.stateChande,
        }),
        authSignOut: () => state,
        updateCurrentPosition: (state, { payload }) => ({
            ...state,
            currentPosition: payload.currentPosition,
        }),
    },
});
