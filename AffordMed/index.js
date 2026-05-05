const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage
let tasks = [];
let taskId = 1;

// ================= BASIC ROUTES =================

// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// GET users
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Anjani" },
    { id: 2, name: "User2" }
  ]);
});

// POST users
app.post("/users", (req, res) => {
  const user = req.body;
  res.json({
    message: "User added",
    data: user
  });
});

// ================= TASK APIs =================

// Create Task
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: taskId++,
    title,
    completed: completed || false
  };

  tasks.push(newTask);

  res.json({
    message: "Task added",
    task: newTask
  });
});

// Get All Tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Update Task (mark completed)
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = true;

  res.json({
    message: "Task updated",
    task
  });
});

// Delete Task (bonus - good impression)
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);

  res.json({ message: "Task deleted" });
});

// ================= SERVER =================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});