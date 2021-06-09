import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "./tasks";

const uiSliceInitialstate: {
    addTaskPopupOn: boolean;
    taskItemPopupOn: boolean;
    loginPopupOn: boolean;
    taskItemPopup: ITask;
} = {
    addTaskPopupOn: false,
    taskItemPopupOn: false,
    loginPopupOn: false,
    taskItemPopup: {
        resume: "none",
        color: "none",
        date: "none",
        details: "none",
        done: false,
    },
};

export const uiSlice = createSlice({
    name: "ui",
    initialState: uiSliceInitialstate,
    reducers: {
        toggleAddTaskPopup: (state) => {
            state.addTaskPopupOn = !state.addTaskPopupOn;
        },
        toggleTaskItemPopup: (state) => {
            state.taskItemPopupOn = !state.taskItemPopupOn;
        },
        setTaskItem: (state, action: PayloadAction<ITask>) => {
            state.taskItemPopup = action.payload;
        },
        setLoginPopupOn: (state, action: PayloadAction<boolean>) => {
            state.loginPopupOn = action.payload;
        },
    },
});

export const {
    setLoginPopupOn,
    toggleAddTaskPopup,
    toggleTaskItemPopup,
    setTaskItem,
} = uiSlice.actions;

export default uiSlice.reducer;
