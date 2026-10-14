// Select HTML elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const message = document.getElementById("message");

const STORAGE_KEY = "my-todo-tasks";

// Load saved tasks
function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        const tasks = savedTasks ? JSON.parse(savedTasks) : [];

        if (!Array.isArray(tasks)) {
            return [];
        }

        return tasks.filter(task =>
            task &&
            typeof task.id === "string" &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean" &&
            typeof task.createdAt === "string"
        );
    } catch (error) {
        return [];
    }
}

let tasks = loadTasks();

// Save tasks
function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        showMessage("Unable to save tasks in this browser.", true);
        return false;
    }
}

// Show a message
let messageTimer;

function showMessage(text, isError = false) {
    clearTimeout(messageTimer);

    message.textContent = text;
    message.style.color = isError ? "#d33d3d" : "#6558d9";

    messageTimer = setTimeout(() => {
        message.textContent = "";
    }, 2500);
}

// Format timestamp
function formatDate(dateString) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "Unknown date";
    }

    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Add a new task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) {
        showMessage("Please enter a task.", true);
        return;
    }

    const task = {
        id: createId(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    };

    tasks.unshift(task);

    if (!saveTasks()) {
        tasks.shift();
        return;
    }

    renderTasks();

    taskInput.value = "";
    taskInput.focus();

    showMessage("Task added successfully!");
});

// Create task ID
function createId() {
    if (crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return Date.now().toString(36) +
        Math.random().toString(36).slice(2);
}

// Render pending and completed lists
function renderTasks() {
    pendingList.replaceChildren();
    completedList.replaceChildren();

    const pendingTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    pendingCount.textContent = `${pendingTasks.length} pending`;
    completedCount.textContent = `${completedTasks.length} completed`;

    if (pendingTasks.length === 0) {
        pendingList.appendChild(
            createEmptyState("No pending tasks. Add a task to get started!")
        );
    } else {
        pendingTasks.forEach(task => {
            pendingList.appendChild(createTaskCard(task));
        });
    }

    if (completedTasks.length === 0) {
        completedList.appendChild(
            createEmptyState("No completed tasks yet.")
        );
    } else {
        completedTasks.forEach(task => {
            completedList.appendChild(createTaskCard(task));
        });
    }
}

// Create empty state
function createEmptyState(text) {
    const element = document.createElement("p");
    element.className = "empty-state";
    element.textContent = text;

    return element;
}

// Create a task card
function createTaskCard(task) {
    const card = document.createElement("article");
    card.className = "task-card";

    if (task.completed) {
        card.classList.add("completed");
    }

    const main = document.createElement("div");
    main.className = "task-main";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute(
        "aria-label",
        task.completed ? "Mark task pending" : "Mark task complete"
    );

    checkbox.addEventListener("change", () => toggleTask(task.id));

    const details = document.createElement("div");
    details.className = "task-details";

    const title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.text;

    const timestamp = document.createElement("small");
    timestamp.className = "task-time";
    timestamp.textContent = `Added: ${formatDate(task.createdAt)}`;

    if (task.completed && task.completedAt) {
        timestamp.textContent +=
            ` | Completed: ${formatDate(task.completedAt)}`;
    }

    details.append(title, timestamp);
    main.append(checkbox, details);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeButton = createButton(
        task.completed ? "Mark Pending" : "Mark Complete",
        "complete-btn",
        () => toggleTask(task.id)
    );

    const editButton = createButton(
        "Edit",
        "edit-btn",
        () => editTask(task.id)
    );

    const deleteButton = createButton(
        "Delete",
        "delete-btn",
        () => deleteTask(task.id)
    );

    actions.append(completeButton, editButton, deleteButton);
    card.append(main, actions);

    return card;
}

// Create action buttons
function createButton(text, className, handler) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = className;
    button.textContent = text;
    button.addEventListener("click", handler);

    return button;
}

// Mark complete or pending
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    const oldCompleted = task.completed;
    const oldCompletedAt = task.completedAt;

    task.completed = !task.completed;
    task.completedAt = task.completed
        ? new Date().toISOString()
        : null;

    if (!saveTasks()) {
        task.completed = oldCompleted;
        task.completedAt = oldCompletedAt;
        return;
    }

    renderTasks();

    showMessage(
        task.completed
            ? "Task completed!"
            : "Task moved to pending."
    );
}

// Edit task inline
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }

    const card = [...document.querySelectorAll(".task-card")]
        .find(card => {
            const checkbox = card.querySelector(".task-checkbox");
            const editButton = [...card.querySelectorAll("button")]
                .find(button => button.textContent === "Edit");

            return checkbox && editButton &&
                checkbox.checked === task.completed &&
                card.querySelector(".task-title")?.textContent === task.text;
        });

    if (!card) {
        return;
    }

    const details = card.querySelector(".task-details");
    const actions = card.querySelector(".task-actions");

    details.replaceChildren();
    actions.replaceChildren();

    const input = document.createElement("input");
    input.type = "text";
    input.className = "edit-input";
    input.value = task.text;
    input.maxLength = 200;
    input.setAttribute("aria-label", "Edit task");

    details.appendChild(input);

    const saveButton = createButton("Save", "save-btn", saveEdit);
    const cancelButton = createButton("Cancel", "cancel-btn", renderTasks);

    actions.append(saveButton, cancelButton);

    function saveEdit() {
        const newText = input.value.trim();

        if (!newText) {
            showMessage("Task cannot be empty.", true);
            input.focus();
            return;
        }

        const oldText = task.text;
        task.text = newText;

        if (!saveTasks()) {
            task.text = oldText;
            return;
        }

        renderTasks();
        showMessage("Task updated successfully!");
    }

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            saveEdit();
        }

        if (event.key === "Escape") {
            renderTasks();
        }
    });

    input.focus();
    input.select();
}

// Delete a task
function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return;
    }

    const deletedTask = tasks.splice(index, 1)[0];

    if (!saveTasks()) {
        tasks.splice(index, 0, deletedTask);
        return;
    }

    renderTasks();
    showMessage("Task deleted successfully!");
}

// Initial display
renderTasks();
