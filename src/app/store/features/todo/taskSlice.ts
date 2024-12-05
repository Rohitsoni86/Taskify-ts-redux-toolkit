"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/app/models/taskModel";

// Define the initial state for tasks
interface TaskState {
	tasks: Task[];
}

const initialState: TaskState = {
	tasks: [
		{
			id: 1,
			name: "Rohit",
			description: "Rohit",
			status: "pending",
		},
	],
};

export const taskSlice = createSlice({
	name: "task", // Slice name
	initialState,
	reducers: {
		addNewTask: (state, action: PayloadAction<Task>) => {
			console.log("Adding New Task", action.payload);
			state.tasks.push(action.payload);
		},

		updateTask: (
			state,
			action: PayloadAction<{
				id: number;
				description: string;
			}>
		) => {
			const task = state.tasks.find((task) => task.id === action.payload.id);
			if (task) {
				task.description = action.payload.description;
			}
		},

		deleteTask: (state, action: PayloadAction<number>) => {
			console.log("Deleting New Task", action.payload);
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},

		changeTaskStatus: (
			state,
			action: PayloadAction<{
				id: number;
				status: "pending" | "in-progress" | "completed";
			}>
		) => {
			const task = state.tasks.find((task) => task.id === action.payload.id);
			if (task) {
				task.status = action.payload.status;
			}
		},
	},
});

// Export actions
export const { addNewTask, updateTask, deleteTask, changeTaskStatus } =
	taskSlice.actions;

// Export the reducer
export default taskSlice.reducer;
