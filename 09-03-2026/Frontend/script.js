const apiUrl = "http://localhost:5107/api/todo";

let allTasks = [];
let currentFilter = "all";

// ─── Load tasks
function loadTasks() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      allTasks = data;
      applyFilterAndSearch();
    })
    .catch(() => showToast("Could not connect to server.", "error"));
}

// ─── Apply current filter + search together 
function applyFilterAndSearch() {
  const searchText = document.getElementById("search").value.toLowerCase();

  let tasks = [...allTasks];

  if (currentFilter === "active")    tasks = tasks.filter(t => !t.isCompleted);
  if (currentFilter === "completed") tasks = tasks.filter(t =>  t.isCompleted);

  if (searchText) {
    tasks = tasks.filter(t => t.title.toLowerCase().includes(searchText));
  }

  displayTasks(tasks);
}

// ─── Display tasks ─────────────────────────────────────────────────────────────
function displayTasks(tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `
      <li style="border:none;background:none;box-shadow:none;justify-content:center;padding:40px 0;">
        <div class="empty-state">
          <span class="emoji">${currentFilter === "completed" ? "🏆" : currentFilter === "active" ? "🎯" : "✨"}</span>
          <p>${currentFilter === "completed" ? "Nothing completed yet." : currentFilter === "active" ? "No active tasks!" : "You're all clear! Add a task above."}</p>
        </div>
      </li>`;
    updateMeta();
    return;
  }

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = task.isCompleted ? "completed" : "";
    li.style.animationDelay = `${i * 40}ms`;

    li.innerHTML = `
      <div class="task-check" onclick="toggleComplete(${task.id}, '${escHtml(task.title)}', ${task.isCompleted})" title="Mark ${task.isCompleted ? 'incomplete' : 'complete'}">
        ${task.isCompleted ? "✓" : ""}
      </div>
      <span class="task-text">${escHtml(task.title)}</span>
      <button class="task-action-btn edit-btn" onclick="openEditModal(${task.id}, '${escHtml(task.title)}', ${task.isCompleted})" title="Edit task">
        ✏️
      </button>
      <button class="task-delete" onclick="deleteTask(${task.id})" title="Delete task">✕</button>
    `;

    list.appendChild(li);
  });

  updateMeta();
}

// ─── Add task ──────────────────────────────────────────────────────────────────
function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) {
    input.focus();
    input.style.borderColor = "var(--accent)";
    setTimeout(() => input.style.borderColor = "", 1000);
    return;
  }

  const btn = document.querySelector(".btn-add");
  btn.textContent = "...";
  btn.disabled = true;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, isCompleted: false })
  })
    .then(() => {
      input.value = "";
      input.focus();
      loadTasks();
      showToast("Task added!");
    })
    .catch(() => showToast("Failed to add task.", "error"))
    .finally(() => {
      btn.textContent = "+ Add";
      btn.disabled = false;
    });
}

// ─── Delete task ───────────────────────────────────────────────────────────────
function deleteTask(id) {
  fetch(`${apiUrl}/${id}`, { method: "DELETE" })
    .then(() => {
      loadTasks();
      showToast("Task deleted.");
    })
    .catch(() => showToast("Failed to delete.", "error"));
}

// ─── Toggle complete ───────────────────────────────────────────────────────────
function toggleComplete(id, title, status) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, isCompleted: !status })
  })
    .then(() => loadTasks())
    .catch(() => showToast("Failed to update.", "error"));
}

// ─── Edit task — modal instead of prompt ───────────────────────────────────────
function openEditModal(id, oldTitle, status) {
  // Remove existing modal if any
  document.getElementById("editModal")?.remove();

  const overlay = document.createElement("div");
  overlay.id = "editModal";
  overlay.innerHTML = `
    <div class="modal-backdrop" onclick="closeEditModal()"></div>
    <div class="modal-box">
      <p class="modal-label">Edit Task</p>
      <input class="modal-input" id="editInput" type="text" value="${escHtml(oldTitle)}" autocomplete="off">
      <div class="modal-actions">
        <button class="modal-cancel" onclick="closeEditModal()">Cancel</button>
        <button class="modal-save" onclick="saveEdit(${id}, ${status})">Save</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const inp = document.getElementById("editInput");
  inp.focus();
  inp.select();

  inp.addEventListener("keydown", e => {
    if (e.key === "Enter")  saveEdit(id, status);
    if (e.key === "Escape") closeEditModal();
  });

  requestAnimationFrame(() => overlay.classList.add("visible"));
}

function closeEditModal() {
  const m = document.getElementById("editModal");
  if (m) { m.classList.remove("visible"); setTimeout(() => m.remove(), 200); }
}

function saveEdit(id, status) {
  const newTitle = document.getElementById("editInput").value.trim();
  if (!newTitle) return;

  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title: newTitle, isCompleted: status })
  })
    .then(() => {
      closeEditModal();
      loadTasks();
      showToast("Task updated!");
    })
    .catch(() => showToast("Failed to update.", "error"));
}

// ─── Filter ────────────────────────────────────────────────────────────────────
function filterTasks(type, el) {
  currentFilter = type;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  if (el) el.classList.add("active");
  applyFilterAndSearch();
}

// ─── Search ────────────────────────────────────────────────────────────────────
function searchTask() {
  applyFilterAndSearch();
}

// ─── Dark mode ─────────────────────────────────────────────────────────────────
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("darkToggle");
  if (btn) btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// ─── Toast notification ────────────────────────────────────────────────────────
function showToast(message, type = "success") {
  document.getElementById("toast")?.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = message;
  toast.className = `toast toast-${type}`;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── Footer meta count ─────────────────────────────────────────────────────────
function updateMeta() {
  const all  = document.querySelectorAll("#taskList li:not(.empty-state)");
  const done = document.querySelectorAll("#taskList li.completed");
  const countEl     = document.getElementById("taskCount");
  const completedEl = document.getElementById("completedCount");
  if (countEl)     countEl.textContent     = `${allTasks.length} ${allTasks.length === 1 ? "task" : "tasks"}`;
  if (completedEl) completedEl.textContent = `${allTasks.filter(t => t.isCompleted).length} done`;
}

// ─── Escape HTML to prevent XSS ────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ─── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Date label
  const dateEl = document.getElementById("dateLabel");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric"
    });
  }

  // Enter key on task input
  document.getElementById("taskInput")?.addEventListener("keydown", e => {
    if (e.key === "Enter") addTask();
  });

  loadTasks();
});