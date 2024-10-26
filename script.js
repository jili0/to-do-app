const taskInputField = document.querySelector("#taskInput");
const createTaskBtn = document.querySelector("#createTask");
const taskContainer = document.querySelector("#tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = () => {
  taskContainer.innerHTML = "";
  if (tasks.length) {
    tasks.forEach((task) => {
    const taskHtml = `
    <div class="taskItem" id="task-${task.taskID}">
      <p id="text-${task.taskID}" style=${
      task.isDone ? "text-decoration:line-through;" : "text-decoration:none;"
    }>${task.task}</p>
      <div class="controlBtns">
        <button id="check-${
          task.taskID
        }"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="${
      task.isDone
        ? "M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"
        : "M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
    }"></path></svg></button>
        <button id="delete-${
          task.taskID
        }"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
      </div>
    </div>
    `;
    taskContainer.innerHTML += taskHtml;
  });  
  } else {
    taskContainer.textContent = "You don't have any task now.";
  }

};

renderTasks();

const createTask = () => {
  if (taskInputField.value) {
    const task = taskInputField.value;
    const id = `${Math.floor(Math.random() * 1000)}`;
    tasks.unshift({ task: task, isDone: false, taskID: id });
    taskInputField.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

const checkTask = (e) => {
  const id = e.target.closest("button").id.slice(6);
  tasks = tasks.map((task) =>
    task.taskID === id
      ? { task: task.task, isDone: !task.isDone, taskID: id }
      : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const deleteTask = (e) => {
  const id = e.target.closest("button").id.slice(7);
  tasks = tasks.filter((task) => task.taskID !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const handleClick = (e) => {
  e.preventDefault();
  if (!e.target.closest("button")) return;
  if (e.target.id === "createTask") {
    createTask();
    renderTasks();
  } else if (e.target.closest("button").id.includes("check")) {
    checkTask(e);
  } else if (e.target.closest("button").id.includes("delete")) {
    deleteTask(e);
  }
};

document.body.addEventListener("click", handleClick);
