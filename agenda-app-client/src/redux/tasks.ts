import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ITask {
    id?: number;
    date: string;
    details: string;
    resume: string;
    done: boolean;
}

const tasksSliceInitialState: {
    currentDate: string;
    currentTasks: ITask[];
} = {
    currentDate: new Date(Date.now()).toISOString(),
    currentTasks: [],
};

export const fetchCurrentDateTasks = createAsyncThunk(
    "tasks/fetchCurrentDateTasks",
    async (dateString: string) => {
        console.log("api call for tasks");

        const res = await axios.get(
            `/api/tasks/week?date=${new Date(dateString)
                .toISOString()
                .substring(0, 10)}`
        );

        return res.data;
    }
);

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: tasksSliceInitialState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentDateTasks.fulfilled, (state, action) => {
            state.currentTasks = action.payload;
        });
    },
});

export const { setDate } = tasksSlice.actions;

export default tasksSlice.reducer;
