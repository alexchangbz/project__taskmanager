import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../redux/project/projectSlice"
import detailReducer from "../redux/detail/detailSlice"
import subTaskReducer from "../redux/subtask/subTaskSlice"

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        detail: detailReducer,
        subtask: subTaskReducer
    }
})