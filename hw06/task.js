var Task = /** @class */ (function () {
    function Task(id, title, description, completed) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._completed = completed;
    }
    Object.defineProperty(Task.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "completed", {
        get: function () {
            return this._completed;
        },
        set: function (value) {
            this._completed = value;
        },
        enumerable: false,
        configurable: true
    });
    return Task;
}());
var TaskBuilder = /** @class */ (function () {
    function TaskBuilder() {
        this._id = 0;
        this._title = "";
        this._description = "";
        this._completed = false;
    }
    TaskBuilder.prototype.setId = function (id) {
        this._id = id;
        return this;
    };
    TaskBuilder.prototype.setTitle = function (title) {
        this._title = title;
        return this;
    };
    TaskBuilder.prototype.setDescription = function (description) {
        this._description = description;
        return this;
    };
    TaskBuilder.prototype.setCompleted = function (completed) {
        this._completed = completed;
        return this;
    };
    TaskBuilder.prototype.build = function () {
        return new Task(this._id, this._title, this._description, this._completed);
    };
    return TaskBuilder;
}());
var TaskProxy = /** @class */ (function () {
    function TaskProxy(id, title, description, completed) {
        this._task = new Task(id, title, description, completed);
    }
    Object.defineProperty(TaskProxy.prototype, "id", {
        get: function () {
            return this._task.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskProxy.prototype, "title", {
        get: function () {
            return this._task.title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskProxy.prototype, "description", {
        get: function () {
            return this._task.description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TaskProxy.prototype, "completed", {
        get: function () {
            return this._task.completed;
        },
        set: function (value) {
            this._task.completed = value;
        },
        enumerable: false,
        configurable: true
    });
    return TaskProxy;
}());
var TaskList = /** @class */ (function () {
    function TaskList() {
        this._tasks = [];
    }
    TaskList.prototype.addTask = function (task) {
        this._tasks.push(task);
    };
    TaskList.prototype.removeTask = function (task) {
        var index = this._tasks.indexOf(task);
        if (index >= 0) {
            this._tasks.splice(index, 1);
        }
    };
    TaskList.prototype.updateTask = function (task) {
        this._tasks = this._tasks.map(function (t) {
            if (t.id === task.id) {
                return task;
            }
            else {
                return t;
            }
        });
    };
    TaskList.prototype.getTaskById = function (id) {
        var tasks = this._tasks.filter(function (t) { return t.id === id; });
        if (tasks.length > 0) {
            return tasks[0];
        }
        else {
            return undefined;
        }
    };
    TaskList.prototype.getTasks = function () {
        return this._tasks;
    };
    return TaskList;
}());
var taskBuilder = new TaskBuilder();
var task = taskBuilder.setId(1).setTitle("Task 1").setDescription("Description 1").setCompleted(false).build();
// Использование паттерна Прокси
var taskProxy = new TaskProxy(2, "Task 2", "Description 2", true);
console.log(taskProxy.title); // "Task 2"
taskProxy.completed = false;
var taskList = new TaskList();
taskList.addTask(task);
taskList.addTask(new Task(3, "Task 3", "Description 3", false));
console.log(taskList.getTasks());
var taskToUpdate = taskList.getTaskById(1);
if (taskToUpdate) {
    taskToUpdate.completed = true;
    taskList.updateTask(taskToUpdate);
}
taskList.removeTask(taskList.getTaskById(3));
console.log(taskList.getTasks());
