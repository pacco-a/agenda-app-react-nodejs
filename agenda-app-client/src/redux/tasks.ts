import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITask {
    id?: number;
    date: string;
    details: string;
    resume: string;
}

const tasksSliceInitialState: {
    currentDate: string;
    currentTasks: ITask[];
} = {
    currentDate: new Date(Date.now()).toISOString(),
    currentTasks: [],
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: tasksSliceInitialState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload;
        },
    },
});

export const { setDate } = tasksSlice.actions;

export default tasksSlice.reducer;
