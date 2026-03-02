import type { Task } from "./task";
import type { Column } from "./column";

export interface Board {
    columns: Column[];
    tasks: Task[];
}