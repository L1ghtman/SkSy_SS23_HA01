const db = require("../models");
const Todo = db.todos;

exports.create = (req, res) => {
    if(!req.body.task) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    const todo = new Todo({
        task: req.body.task,
        dueDate: req.body.dueDate,
        status: req.body.status
    });

    todo.save(todo).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || 'An error occurred while creating the Todo.' });
    });
};

exports.findAll = (req, res) => {
    const id = req.query.title;
    var condition = id ? { id: { $regex: new RegExp(id), $options: 'i' } } : {};
    Todo.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || 'An error occurred while retrieving the Todo.' });
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({ message: 'Data to update cannot be empty!' });
    }

    const id = req.params.id;

    Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if(!data) {
            res.status(404).send({ message: `Cannot update Todo with id ${id}. Todo was not found.` });
        } else res.send({ message: 'Todo was updated successfully.' });
        })
        .catch(err => {
            res.status(500).send({ 
            message: `Error updating Todo with id ${id}`
        });
    });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndRemove(id).then(data => {
        if(!data) {
            res.status(404).send({ message: `Cannot delete Todo with id ${id}. Todo was not found.` });
        } else {
            res.send({ message: 'Todo was deleted successfully.' });
        }
    }).catch(err => {
        res.status(500).send({ message: `Could not delete Todo with id ${id}` });
    });
};

