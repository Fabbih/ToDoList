document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addBtn").addEventListener("click", function() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  fetch("tasks.php", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "action=add&task=" + encodeURIComponent(text)
  })
  .then(res => res.json())
  .then(tasks => {
    renderTasks(tasks);
    input.value = "";
  });
});

function loadTasks() {
  fetch("tasks.php")
    .then(res => res.json())
    .then(tasks => renderTasks(tasks));
}

function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${i})">✔</button>
        <button onclick="deleteTask(${i})">✖</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function toggleTask(id) {
  fetch("tasks.php", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "action=toggle&id=" + id
  })
  .then(res => res.json())
  .then(tasks => renderTasks(tasks));
}

function deleteTask(id) {
  fetch("tasks.php", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "action=delete&id=" + id
  })
  .then(res => res.json())
  .then(tasks => renderTasks(tasks));
}
