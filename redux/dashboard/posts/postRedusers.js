import { createSlice } from "@reduxjs/toolkit";

const state = {
    postsAll: null,
    userPosts: null,
};

export const postSlice = createSlice({
    name: "post",
    initialState: state,
    reducers: {
        getAllPost: (state, { payload }) => ({
            ...state,
            postsAll: payload.postsAll,
        }),
        getUserPosts: (state, { payload }) => ({
            ...state,
            userPosts: payload.userPosts,
        }),
    },
});