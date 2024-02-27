document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todoList');
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');

    // Function to fetch todos from backend and render them
    const fetchTodos = async () => {
        try {
            const response = await fetch('/api/todos');
            const todos = await response.json();
            renderTodos(todos);
        } catch (err) {
            console.error('Error fetching todos:', err);
        }
    };

    // Function to render todos
    const renderTodos = (todos) => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo._id}">
                <label>${todo.task}</label>
                <button class="delete-btn" data-id="${todo._id}">Delete</button>
            `;
            todoList.appendChild(todoItem);
        });
    };

    // Event listener for adding a new task
    addTaskBtn.addEventListener('click', async () => {
        const task = taskInput.value.trim();
        if (task) {
            try {
                const response = await fetch('/api/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task }) // Send task data in JSON format
                });
                const newTodo = await response.json();
                fetchTodos(); // Fetch and render updated todos
                taskInput.value = ''; // Clear the task input field
            } catch (err) {
                console.error('Error adding task:', err);
            }
        }
    });

    // Fetch todos on page load
    fetchTodos();
});
