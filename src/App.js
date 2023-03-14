import React, {useState, useRef, useEffect} from 'react';
import TodoList from './components/TodoList';
import {v4 as uuidv4} from 'uuid';

const KEY = "todoApp.todos";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const todoTaskRef = useRef();

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === '') return;
        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), title: task, completed: false}];
        });
        todoTaskRef.current.value = null;
    };

    const handleClearCompleted = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type="text" placeholder='Nueva Tarea'></input>
            <button onClick={handleTodoAdd}>➕</button>
            <button onClick={handleClearCompleted}>🗑️</button>
            <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
        </>
    );
}


export default App;
