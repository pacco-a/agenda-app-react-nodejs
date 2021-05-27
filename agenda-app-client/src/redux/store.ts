import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks";
import uiReducer from "./ui";

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
