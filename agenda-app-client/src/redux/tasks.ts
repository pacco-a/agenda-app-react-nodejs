import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";

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
    currentDate: dayjs().format("YYYY-MM-DD"),
    currentTasks: [],
};

export const fetchCurrentDateTasks = createAsyncThunk(
    "tasks/fetchCurrentDateTasks",
    async (dateString: string) => {
        console.log("api call for fetch tasks");

        const res = await axios.get(
            `/api/tasks/week?date=${dayjs(dateString).format("YYYY-MM-DD")}`
        );

        console.log(res.data);

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

export const updateOneTask = createAsyncThunk(
    "tasks/updateOneTask",
    async (task: ITask) => {
        if (!task.id) {
            throw new Error("ITask objects needed ID for update request");
        }

        const res = await axios.patch("/api/tasks", task);
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

            if (dayjs(state.currentDate).isSame(taskPayload.date, "week")) {
                state.currentTasks.push(taskPayload);
            }
        });

        builder.addCase(updateOneTask.fulfilled, (state, action): any => {
            const payloadTask: ITask = action.payload;
            state.currentTasks = state.currentTasks.map((task) => {
                if (task.id === payloadTask.id) {
                    return payloadTask;
                }

                return task;
            });
        });
    },
});

export const { setDate } = tasksSlice.actions;

export default tasksSlice.reducer;
