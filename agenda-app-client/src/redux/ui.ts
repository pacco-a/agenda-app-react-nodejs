import { createSlice } from "@reduxjs/toolkit";

const uiSliceInitialstate: {
    addTaskPopupOn: boolean;
} = {
    addTaskPopupOn: false,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState: uiSliceInitialstate,
    reducers: {
        toggleAddTaskPopup: (state) => {
            state.addTaskPopupOn = !state.addTaskPopupOn;
        },
    },
});

export const { toggleAddTaskPopup } = uiSlice.actions;

export default uiSlice.reducer;
