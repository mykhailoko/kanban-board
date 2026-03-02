import { useForm } from "react-hook-form";
import { useBoardStore } from "../../store/useBoardStore";
import { nanoid } from "nanoid";
import "./TaskForm.scss";

interface TaskFormProps {
    columnId: string;
    onSuccess: () => void;
}

export default function TaskForm({ columnId, onSuccess }: TaskFormProps) {
    const addTask = useBoardStore((state) => state.addTask);

    const { register, handleSubmit, reset } = useForm<{
        title: string;
        description: string;
        priority: "low" | "medium" | "high";
    }>({
        defaultValues: {
            priority: "medium"
        }
    });

    const onSubmit = (data: any) => {
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

            <button type="submit">Создать</button>
        </form>
    )
}
