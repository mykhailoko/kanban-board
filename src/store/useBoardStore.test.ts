import { useBoardStore } from "./useBoardStore";
import { describe, test, expect, beforeEach } from "vitest";

describe("useBoardStore", () => {
    const createTask = () => ({
        id: "1", 
        title: "Test task", 
        description: "test", 
        priority: "medium" as const, 
        columnId: "todo" 
    })

    beforeEach(() => {
        useBoardStore.setState({ tasks: [], columns: [
            { id: "todo", title: "Сделать", order: 1 },
            { id: "inprogress", title: "В работе", order: 2 },
            { id: "review", title: "На проверке", order: 3 },
            { id: "done", title: "Сделано", order: 4 }
        ]});
    });

    test("addTask добавляет задачу", () => {
        const task = createTask();

        useBoardStore.getState().addTask(task);

        expect(useBoardStore.getState().tasks).toHaveLength(1);
        expect(useBoardStore.getState().tasks[0]).toEqual(task);
    });

    test("deleteTask удаляет задачу", () => {
        const task = createTask();

        useBoardStore.getState().addTask(task);
        useBoardStore.getState().deleteTask("1");

        expect(useBoardStore.getState().tasks).toHaveLength(0);
    })

    test("editTask изменение задачи", () => {
        const task = createTask();

        useBoardStore.getState().addTask(task);
        useBoardStore.getState().editTask("1", {title: "Updated task", priority: "high" });

        expect(useBoardStore.getState().tasks[0].title).toBe("Updated task");
        expect(useBoardStore.getState().tasks[0].priority).toBe("high");
    })

    test("moveTask перемещение задачи", () => {
        const task = createTask();

        useBoardStore.getState().addTask(task);
        useBoardStore.getState().moveTask("1", "done");

        expect(useBoardStore.getState().tasks[0].columnId).toBe("done");
    })
})