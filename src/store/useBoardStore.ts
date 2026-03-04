import { create } from "zustand";
import type { Board } from "../types/board";
import type { Task } from "../types/task";
import type { Column } from "../types/column";

interface BoardStore extends Board {
    addColumn: (column: Column) => void;
    addTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, updateFields: Partial<Task>) => void;
    moveTask: (taskId: string, newColumnId: string) => void;
}

const savedTasks = localStorage.getItem("tasks");
const savedColumns = localStorage.getItem("columns");

export const useBoardStore = create<BoardStore>((set) => ({
    columns: savedColumns ? JSON.parse(savedColumns) : [
        { id: "todo", title: "Сделать", order: 1 },
        { id: "inprogress", title: "В работе", order: 2 },
        { id: "review", title: "На проверке", order: 3 },
        { id: "done", title: "Сделано", order: 4 }
    ],
    tasks: savedTasks ? JSON.parse(savedTasks) : [],
    addColumn: (column: Column) => 
        set((state) => ({
            columns: [...state.columns, column]
        })),
    addTask: (task: Task) => 
        set((state) => {
            const newTasks = [...state.tasks, task];
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return { tasks: newTasks };
        }),
    deleteTask: (id: string) =>
        set((state) => {
            const newTasks = state.tasks.filter((t) => t.id !== id);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return { tasks: newTasks };
        }),
    editTask: (id: string, updateFields: Partial<Task>) =>
        set((state) => {
            const newTasks = state.tasks.map(task => task.id === id ? {...task, ...updateFields} : task);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return { tasks: newTasks };
        }),
    moveTask: (taskId: string, newColumnId: string) =>
        set((state) => {
            const newTasks = state.tasks.map(task => task.id === taskId ? {...task, columnId: newColumnId} : task);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return { tasks: newTasks };
        })
}))