module.exports = mongoose => {
    const Todo = mongoose.model("todo", mongoose.Schema({
                task: String,
                dueDate: String,
                status: String
            }));

    return Todo;
}