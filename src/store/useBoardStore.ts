import { create } from "zustand";
import type { Board } from "../types/board";
import type { Task } from "../types/task";
import type { Column } from "../types/column";

interface BoardStore extends Board {
    addColumn: (column: Column) => void;
    addTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    moveTask: (taskId: string, newColumnId: string) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
    columns: [
        { id: "todo", title: "Сделать", order: 1 },
        { id: "inprogress", title: "В работе", order: 2 },
        { id: "review", title: "На проверке", order: 3 },
        { id: "done", title: "Сделано", order: 4 }
    ],
    tasks: [],
    addColumn: (column: Column) => 
        set((state) => ({
            columns: [...state.columns, column]
        })),
    addTask: (task: Task) => 
        set((state) => ({
            tasks: [...state.tasks, task]
        })),
    deleteTask: (id: string) =>
        set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id)
        })),
    moveTask: (taskId: string, newColumnId: string) =>
        set((state) => ({
            tasks: state.tasks.map(task => task.id === taskId ? {...task, columnId: newColumnId} : task)
        }))
}))