const app = Vue.createApp({
    data() {
        return {
            title: 'My Todo List',
            newTodo: '',
            todos: [],
        }
    }
})

app.mount('#app')
