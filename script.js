const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    saveTask(taskText, false);
    taskInput.value = "";
  }
});

// Add task to UI
function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskText;

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Done";
  completeBtn.classList.add("complete-btn");
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update tasks in localStorage
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}
