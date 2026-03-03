import { useState } from "react";
import type { Column as ColumnType } from "../../types/column";
import "./Column.scss";
import Modal from "../Modal/Modal";
import TaskForm from "../TaskForm/TaskForm";
import { useBoardStore } from "../../store/useBoardStore";
import Task from "../Task/Task";
import { useDroppable } from "@dnd-kit/core";

interface Props {
    column: ColumnType;
}

export default function Column({ column }: Props) {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const allTasks = useBoardStore((state) => state.tasks);
    const tasks = allTasks.filter((t) => t.columnId === column.id);

    return (
        <div className="column" id={column.id}>
            <div className="column-header">
                <h2 className="column-title">{column.title}</h2>

                <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
                    +
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <TaskForm 
                    columnId={column.id}
                    onSuccess={() => setIsModalOpen(false)}
                />
            </Modal>

            <div ref={setNodeRef} className="column-tasks">
                {tasks.map((t) => (
                    <Task key={t.id} task={t} />
                ))}
            </div>
        </div>
    )
}