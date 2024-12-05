"use client";

import React from "react";
import ListCards from "./ListCards";
import useTaskStore from "../store/tasksStore";

export default function TasksList() {
	// Zustand

	const { tasks } = useTaskStore();
	return (
		<>
			<div
				className="flex justify-center md:justify-around gap-4 px-8 py-4  flex-wrap h-full bg-cyan-400"
				style={{ minHeight: "calc(100vh - 210px)" }}
			>
				{tasks?.length > 0 ? (
					<>
						{tasks?.map((task, index) => {
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
							Hurray 🥳 ! No task to do Enjoy.{" "}
						</h3>
					</div>
				)}
				{/* <ListCards /> */}
			</div>
		</>
	);
}
