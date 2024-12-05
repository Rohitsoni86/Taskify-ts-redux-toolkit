import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Task } from "../models/taskModel";

// Define the structure of the store state
interface TaskStore {
	tasks: Task[]; // Array to hold all tasks
	addTask: (task: Task) => void; // Action to add a task
	removeTask: (taskId: number) => void; // Action to remove a task by ID
	updateTaskStatus: (taskId: number, status: Task["status"]) => void; // Action to update the status of a task
	editTask: (taskId: number, description: string) => void; // Action to edit task details
}

// Create the store with proper typing and logic
const taskStore = (set: (fn: (state: TaskStore) => void) => void) => ({
	tasks: [] as Task[], // Explicitly type the initial state as an empty array of Task

	// Action to add a task
	addTask: (task: Task) => {
		set((state: TaskStore) => {
			// Add the new task at the beginning of the tasks array
			return { tasks: [task, ...state.tasks] };
		});
	},

	// Action to remove a task by its ID
	removeTask: (taskId: number) => {
		set((state: TaskStore) => ({
			// Filter out the task that matches the taskId
			tasks: state.tasks.filter((task) => task.id !== taskId),
		}));
	},

	// Action to update the status of a task
	updateTaskStatus: (taskId: number, status: Task["status"]) => {
		set((state: TaskStore) => ({
			// Map through tasks and update the status of the matched task
			tasks: state.tasks.map((task) =>
				task.id === taskId ? { ...task, status } : task
			),
		}));
	},

	// Action to edit task details
	editTask: (taskId: number, description: string) => {
		set((state: TaskStore) => ({
			// Map through tasks and update the name and description of the matched task
			tasks: state.tasks.map((task) =>
				task.id === taskId ? { ...task, description } : task
			),
		}));
	},
});

// Create a store using Zustand, with devtools and persistence middleware
const useTaskStore = create<TaskStore>()(
	// devtools(
	// 	persist(taskStore, {
	// 		name: "tasks", // Name of the persisted storage key
	// 	})
	// )
	// OR

	devtools(taskStore) // Only using devtools, without persist
);

export default useTaskStore;
