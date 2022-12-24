import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        flag1: true,
        flag2: true,
        token: null
    },
    reducers: {
        setToken(state, { payload }) {
            state.token = payload;
        },
        setFlag1(state, { payload }) {
            state.flag1 = payload;
        },
        setFlag2(state, { payload }) {
            state.flag2 = payload;
        }
    }
})

export const selectToken = (state) => state.user.token
export const selectFlag1 = (state) => state.user.flag1
export const selectFlag2 = (state) => state.user.flag2

export const {
    setToken: setTokenAction,
    setFlag1: setFlag1Action,
    setFlag2: setFlag2Action
} = userSlice.actions

export default userSlice.reducer