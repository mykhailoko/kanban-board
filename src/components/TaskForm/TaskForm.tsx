import { useForm } from "react-hook-form";
import { useBoardStore } from "../../store/useBoardStore";
import { nanoid } from "nanoid";
import "./TaskForm.scss";
import type { Task as TaskType } from "../../types/task";

interface TaskFormProps {
    columnId: string;
    onSuccess: () => void;
    task?: TaskType;
}

interface TaskFormValues {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
}

export default function TaskForm({ columnId, onSuccess, task }: TaskFormProps) {
    const addTask = useBoardStore((state) => state.addTask);
    const editTask = useBoardStore((state) => state.editTask);

    const { register, handleSubmit, reset } = useForm<TaskFormValues>({
        defaultValues: task ? {
            title: task.title,
            description: task.description,
            priority: task.priority
        } : {
            priority: "medium"
        }
    });

    const onSubmit = (data: TaskFormValues) => {
        if (task) {
            editTask(task.id, data)
        } else {
            addTask({
                id: nanoid(), 
                columnId,
                ...data
            });
        }
        reset();
        onSuccess();
    }

    return (
        <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title", {required: true})} placeholder="Название" />

            <textarea {...register("description")} placeholder="Описание" />

            <select {...register("priority")}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit" className={`submit-btn ${columnId}`}>
                {task ? "Сохранить" : "Создать"}
            </button>
        </form>
    )
}
