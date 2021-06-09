import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const usersSliceInitState: {
    isLogIn: boolean;
    username: string;
} = {
    isLogIn: false,
    username: "",
};

export const usersSlice = createSlice({
    name: "users",
    initialState: usersSliceInitState,
    reducers: {
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogIn = action.payload;
        },
    },
});

export const { setIsLogin } = usersSlice.actions;

export default usersSlice.reducer;
