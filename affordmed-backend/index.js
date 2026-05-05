const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Create task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  const task = {
    id: id++,
    title,
    completed: false
  };

  tasks.push(task);

  res.status(201).json(task);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Not found" });
  }

  task.completed = true;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on 3000"));