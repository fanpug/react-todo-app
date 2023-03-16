import React, {useState, useRef, useEffect} from 'react';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
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
            <Navbar />
            <main className='flex flex-col items-center justify-center'>
                <div className='flex items-center w-96 mt-5 text-xl'>
                    <input type="text" ref={todoTaskRef} placeholder='Nueva Tarea' className="p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"></input>
                    <button className='ml-8 text-3xl' onClick={handleTodoAdd}>➕</button>
                    <button className='ml-2 text-3xl' onClick={handleClearCompleted}>🗑️</button>
                </div>

                <div className='w-96 mt-5 text-xl break-all'>
                    <TodoList todos={todos} toggleTodo={toggleTodo} />
                </div>
                
                <div>Te quedan <b>{todos.filter((todo) => !todo.completed).length}</b> tareas por terminar</div>
            </main>
        </>
    );
}


export default App;
