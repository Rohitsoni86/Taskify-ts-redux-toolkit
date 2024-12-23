"use client";
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/todo/taskSlice";
export const makeStore = () => {
	return configureStore({
		reducer: {
			tasksStore: taskReducer,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
