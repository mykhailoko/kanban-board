import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useBoardStore } from "../../store/useBoardStore";
import type { Task } from "../../types/task";
import Column from "../Column/Column";
import "./Board.scss";

export default function Board() {
    const moveTask = useBoardStore((state) => state.moveTask);
    const columns = useBoardStore((state) => state.columns);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        const newColumnId = over.id as Task['columnId'];

        moveTask(taskId, newColumnId);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="board">
                {columns.map((col) => (
                    <Column key={col.id} column={col}/>
                ))}
            </div>
        </DndContext>
    )
}
