const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST new task
app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(task);
    res.json(task);
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (task) {
        task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).send("Task not found");
    }
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.send("Task deleted");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});