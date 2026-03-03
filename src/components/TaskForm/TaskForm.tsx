import { useForm } from "react-hook-form";
import { useBoardStore } from "../../store/useBoardStore";
import { nanoid } from "nanoid";
import "./TaskForm.scss";

interface TaskFormProps {
    columnId: string;
    onSuccess: () => void;
}

interface TaskFormValues {
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
}

export default function TaskForm({ columnId, onSuccess }: TaskFormProps) {
    const addTask = useBoardStore((state) => state.addTask);

    const { register, handleSubmit, reset } = useForm<TaskFormValues>({
        defaultValues: {
            priority: "medium"
        }
    });

    const onSubmit = (data: TaskFormValues) => {
        addTask({
            id: nanoid(), 
            title: data.title, 
            description: data.description, 
            priority: data.priority, 
            columnId: columnId
        });
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

            <button type="submit" className={`submit-btn ${columnId}`}>Создать</button>
        </form>
    )
}
