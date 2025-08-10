const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Sample in-memory database
let tasks = [
  { id: 1, title: "Set up environment", description: "Install Node.js, npm, and git", completed: true },
  { id: 2, title: "Learn Express", description: "Understand routing and middleware", completed: false }
];

// Validation helper
function validateTask(task) {
  if (
    typeof task.title !== "string" ||
    typeof task.description !== "string" ||
    typeof task.completed !== "boolean"
  ) {
    return false;
  }
  return true;
}

// Create Task
app.post("/tasks", (req, res) => {
  if (!validateTask(req.body)) return res.status(400).send();
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get All Tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get Task by ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send();
  res.json(task);
});

// Update Task
app.put("/tasks/:id", (req, res) => {
  if (!validateTask(req.body)) return res.status(400).send();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send();
  Object.assign(task, req.body);
  res.json(task);
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send();
  tasks.splice(index, 1);
  res.status(200).send();
});

module.exports = app;
