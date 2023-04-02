class Task {
    private _id: number;
    private _title: string;
    private _description: string;
    private _completed: boolean;

    constructor(id: number, title: string, description: string, completed: boolean) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._completed = completed;
    }

    public get id(): number {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get completed(): boolean {
        return this._completed;
    }

    public set completed(value: boolean) {
        this._completed = value;
    }
}

class TaskBuilder {
    private _id: number;
    private _title: string;
    private _description: string;
    private _completed: boolean;

    constructor() {
        this._id = 0;
        this._title = "";
        this._description = "";
        this._completed = false;
    }

    public setId(id: number): TaskBuilder {
        this._id = id;
        return this;
    }

    public setTitle(title: string): TaskBuilder {
        this._title = title;
        return this;
    }

    public setDescription(description: string): TaskBuilder {
        this._description = description;
        return this;
    }

    public setCompleted(completed: boolean): TaskBuilder {
        this._completed = completed;
        return this;
    }

    public build(): Task {
        return new Task(this._id, this._title, this._description, this._completed);
    }
}


class TaskProxy {
    private _task: Task;

    constructor(id: number, title: string, description: string, completed: boolean) {
        this._task = new Task(id, title, description, completed);
    }

    public get id(): number {
        return this._task.id;
    }

    public get title(): string {
        return this._task.title;
    }

    public get description(): string {
        return this._task.description;
    }

    public get completed(): boolean {
        return this._task.completed;
    }

    public set completed(value: boolean) {
        this._task.completed = value;
    }
}


interface TaskMediator {
    addTask(task: Task): void;
    removeTask(task: Task): void;
    updateTask(task: Task): void;
}

class TaskList implements TaskMediator {
    private _tasks: Task[];

    constructor() {
        this._tasks = [];
    }

    public addTask(task: Task): void {
        this._tasks.push(task);
    }

    public removeTask(task: Task): void {
        const index = this._tasks.indexOf(task);
        if (index >= 0) {
            this._tasks.splice(index, 1);
        }
    }

    public updateTask(task: Task): void {
        this._tasks = this._tasks.map((t) => {
            if (t.id === task.id) {
                return task;
            } else {
                return t;
            }
        });
    }

    public getTaskById(id: number): Task | undefined {
        const tasks = this._tasks.filter((t) => t.id === id);
        if (tasks.length > 0) {
            return tasks[0];
        } else {
            return undefined;
        }
    }

    public getTasks(): Task[] {
        return this._tasks;
    }
}


const taskBuilder = new TaskBuilder();
const task = taskBuilder.setId(1).setTitle("Task 1").setDescription("Description 1").setCompleted(false).build();

// Использование паттерна Прокси
const taskProxy = new TaskProxy(2, "Task 2", "Description 2", true);
console.log(taskProxy.title); // "Task 2"
taskProxy.completed = false;


const taskList = new TaskList();
taskList.addTask(task);
taskList.addTask(new Task(3, "Task 3", "Description 3", false));
console.log(taskList.getTasks());
const taskToUpdate = taskList.getTaskById(1);
if (taskToUpdate) {
    taskToUpdate.completed = true;
    taskList.updateTask(taskToUpdate);
}
taskList.removeTask(taskList.getTaskById(3) as Task);
console.log(taskList.getTasks());
