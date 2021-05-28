import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "./tasks";

const uiSliceInitialstate: {
    addTaskPopupOn: boolean;
    taskItemPopupOn: boolean;
    taskItemPopup: ITask;
} = {
    addTaskPopupOn: false,
    taskItemPopupOn: false,
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
    },
});

export const { toggleAddTaskPopup, toggleTaskItemPopup, setTaskItem } =
    uiSlice.actions;

export default uiSlice.reducer;
