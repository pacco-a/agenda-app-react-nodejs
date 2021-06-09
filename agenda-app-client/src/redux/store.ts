import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks";
import uiReducer from "./ui";
import usersReducer from "./users";

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        ui: uiReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
