import { useBoardStore } from "../../store/useBoardStore";
import type { Task as TaskType } from "../../types/task";
import "./Task.scss";
import { useDraggable } from "@dnd-kit/core";

interface Props {
    task: TaskType;
}

export default function Task({ task }: Props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: task.id,
    });

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : undefined;

    const deleteTask = useBoardStore((state) => state.deleteTask);

    return (
        <div ref={setNodeRef} style={style}>
            <div {...listeners} {...attributes} className="task-drag-handle">
                <div className="task-title">{task.title}</div>
                    {task.description && (
                        <div className="task-description">{task.description}</div>
                    )}
                    <div className="task-priority">
                        {task.priority === "low" && "Низкий приоритет"}
                        {task.priority === "medium" && "Средний приоритет"}
                        {task.priority === "high" && "Высокий приоритет"}
                    </div>
            </div>

            <button className="task-delete-btn" onClick={() => deleteTask(task.id)}>
                Удалить задачу
            </button>
        </div>
    )
}
