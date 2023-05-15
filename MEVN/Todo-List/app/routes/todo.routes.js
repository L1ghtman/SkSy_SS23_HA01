module.exports = app => {
    const todos = require("../controller/todo.controller.js");
    var router = require("express").Router();
    router.post("/", todos.create);
    router.get("/", todos.findAll);
    router.put("/:id", todos.update);
    router.delete("/:id", todos.delete);
    app.use('/api/todos', router);
};