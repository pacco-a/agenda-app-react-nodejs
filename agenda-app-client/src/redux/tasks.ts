import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

export interface ITask {
    id?: number;
    date: string;
    details: string;
    resume: string;
    color: string;
    done: boolean;
}

const tasksSliceInitialState: {
    currentDate: string;
    currentTasks: ITask[];
} = {
    currentDate: new Date(Date.now()).toISOString().substring(0, 10),
    currentTasks: [],
};

export const fetchCurrentDateTasks = createAsyncThunk(
    "tasks/fetchCurrentDateTasks",
    async (dateString: string) => {
        console.log("api call for fetch tasks");

        const res = await axios.get(
            `/api/tasks/week?date=${new Date(dateString)
                .toISOString()
                .substring(0, 10)}`
        );

        return res.data;
    }
);

export const addOneTask = createAsyncThunk(
    "tasks/addOneTask",
    async (task: ITask) => {
        console.log("api call for add one task");

        const res = await axios.post(`/api/tasks`, task);

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

        builder.addCase(addOneTask.fulfilled, (state, action) => {
            const taskPayload: ITask = action.payload;

            // si la tache ajoutée est de la même semaine que nous, alors
            // - on l'ajoute dans currentTasks
            if (moment(state.currentDate).isSame(taskPayload.date, "week")) {
                state.currentTasks.push(taskPayload);
            }
        });
    },
});

export const { setDate } = tasksSlice.actions;

export default tasksSlice.reducer;
