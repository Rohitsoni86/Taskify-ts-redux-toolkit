"use client";

import React, { useEffect, useState } from "react";
import ListCards from "./ListCards";
import { useSelector } from "react-redux";
import { RootState } from "../store/appStore";
import { Task } from "../models/taskModel";

export default function TasksList() {
	const [filteredList, setFilteredList] = useState<Task[]>([]);
	const [selectedOption, setSelectedOption] = useState<string>(""); // Empty option for showing all tasks

	// Redux Toolkit
	const tasksList = useSelector((state: RootState) => state.tasksStore.tasks);

	useEffect(() => {
		let updatedList = [...tasksList]; // Start with all tasks

		if (selectedOption === "A_Z") {
			updatedList.sort((a, b) => a.name.localeCompare(b.name)); // A-Z sort
		} else if (selectedOption === "First") {
			updatedList.sort((a, b) => a.id - b.id); // Created First (Assuming lower IDs are created first)
		} else if (selectedOption === "Last") {
			updatedList.sort((a, b) => b.id - a.id); // Created Last (Reverse sorting of ID)
		} else if (selectedOption === "Pending") {
			updatedList = updatedList.filter((task) => task.status === "pending");
		} else if (selectedOption === "Completed") {
			updatedList = updatedList.filter((task) => task.status === "completed");
		}

		// If no filter is selected (empty option), show all tasks
		if (selectedOption === "") {
			updatedList = [...tasksList];
		}

		setFilteredList(updatedList); // Update the filtered list
	}, [tasksList, selectedOption]); // Run effect when tasks or selectedOption changes

	return (
		<>
			<div className="bg-cyan-400 flex justify-end text-right p-4 md:p-2">
				<div className="w-full md:w-[300px] rounded-lg">
					<div className="relative">
						<select
							onChange={(event) => {
								console.log("Selected Option", event?.target.value);
								setSelectedOption(event?.target.value);
							}}
							value={selectedOption} // Ensure the dropdown shows the current selected option
							className="w-full rounded-lg placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200  pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
						>
							<option value="">Select Filter</option>{" "}
							{/* Empty option to reset filter */}
							<option value="A_Z">A-Z</option>
							<option value="First">Created First</option>
							<option value="Last">Created Last</option>
							<option value="Pending">Pending</option>
							<option value="Completed">Completed</option>
						</select>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.2"
							stroke="currentColor"
							className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
							/>
						</svg>
					</div>
				</div>
			</div>
			<div
				className="flex justify-center md:justify-around gap-4 px-8 py-4  flex-wrap h-full bg-cyan-400"
				style={{ minHeight: "calc(100vh - 210px)" }}
			>
				{filteredList?.length > 0 ? (
					<>
						{filteredList?.map((task: Task, index) => {
							return (
								<ListCards
									idF={task.id}
									key={task.id}
									description={task.description}
									status={task.status}
									index={index}
								/>
							);
						})}
					</>
				) : (
					<div className="p-3">
						<h3 className="text-xl font-bold text-teal-800">
							Hurray 🥳 ! No task to do. Enjoy!
						</h3>
					</div>
				)}
			</div>
		</>
	);
}
