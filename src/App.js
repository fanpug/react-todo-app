import React, {useState, useRef, useEffect} from 'react';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import {v4 as uuidv4} from 'uuid';

const KEY = "todoApp.todos";

function App() {
    //create the todos array with useState
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        //search for locally stored todos
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
        //find the specific todo
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const handleTodoAdd = () => {
        //get the value that is on the input and check if it's not an empty string
        const task = todoTaskRef.current.value;
        if (task === '') return;

        //add the new todo to the array and reset the value of the input
        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task: task, completed: false}];
        });
        todoTaskRef.current.value = null;
    };

    const editTodo = (id, newTask) => {
        const newTodos = [...todos];
        //find the specific todo
        const todo = newTodos.find((todo) => todo.id === id);
        todo.task = newTask;
        setTodos(newTodos);
    }

    const deleteTodo = (id) => {
        //make a new array that doesn't have that one todo
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    }

    const handleClearCompleted = () => {
        //make a new array that gets rid of every todo that is completed
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    return (
        <>
            <Navbar />
            <main className='flex flex-col items-center justify-center'>
                <div className='flex items-center w-96 mt-5 text-xl'>
                    <input type="text" ref={todoTaskRef} placeholder='eg: Do the laundry' className="p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"></input>
                    <button className='ml-8 text-3xl motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition' onClick={handleTodoAdd}>➕</button>
                    <button className='ml-2 text-3xl motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition' onClick={handleClearCompleted}>🗑️</button>
                </div>
                
                <div>You have <b>{todos.filter((todo) => !todo.completed).length}</b> tasks pending</div>

                <div className='w-96 mt-5 text-xl break-all'>
                    <TodoList todos={todos} toggleTodo={toggleTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
                </div>
                
            </main>
        </>
    );
}


export default App;
