import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const KEY = "todoApp.todos";

export default function Todo() {
    //create the todos array with useState
    const [todos, setTodos] = useState(() => {
        //retrieve from local storage any todos or start from a new array
        return JSON.parse(localStorage.getItem(KEY)) || [];
    });

    //everytime there are changes in the todo array, save them to local storage
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
        if (task === "") return;

        //add the new todo to the array and reset the value of the input
        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), task: task, completed: false }];
        });
        todoTaskRef.current.value = null;
    };

    const editTodo = (id, newTask) => {
        const newTodos = [...todos];
        //find the specific todo
        const todo = newTodos.find((todo) => todo.id === id);
        todo.task = newTask;
        setTodos(newTodos);
    };

    const deleteTodo = (id) => {
        //make a new array that doesn't have that one todo
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const handleClearCompleted = () => {
        //make a new array that gets rid of every todo that is completed
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    return (
        <>
            <div
                id="todo-input"
                className="flex flex-col items-center mt-5 text-xl sm:flex-row "
            >
                <input
                    type="text"
                    ref={todoTaskRef}
                    placeholder="e.g., Do the laundry"
                    className="p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                ></input>
                <div className="flex w-full justify-evenly my-3">
                    <button
                        className="text-3xl sm:ml-5 motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl"
                        onClick={handleTodoAdd}
                    >
                        ➕
                    </button>
                    <button
                        className="text-3xl sm:ml-3 motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl"
                        onClick={handleClearCompleted}
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <div id="todo-pending" className="text-xl sm:mt-3">
                You have <b>{todos.filter((todo) => !todo.completed).length}</b> tasks
                pending
            </div>

            <div
                id="todo-container"
                className="max-w-xs mt-5 text-xl sm:max-w-xl lg:w-1/2"
            >
                <TodoList
                    todos={todos}
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </>
    );
}
