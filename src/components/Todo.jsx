import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import { insertNewTodo, fetchTodos, fetchAnonTodos, updateTodo, deleteTodo } from "../firebase/firebase";

export default function Todo({currentUser}) {
    //create the todos array with useState
    const [todos, setTodos] = useState([]);

    //run when component is initialized
    useEffect(() => {
        const retrieveUserTodos = async () => {
            let todosList = [];
            if (currentUser.isAnonymous) {
                todosList = await fetchAnonTodos();
            } else {
                todosList = await fetchTodos(currentUser.uid);
            }

            setTodos([...todosList]);
        }

        retrieveUserTodos();
        // eslint-disable-next-line
    }, []);
    
    const todoTaskRef = useRef();

    const handleSubmit = (e) => {
        //prevent refreshing the page when submiting
        e.preventDefault();
        handleCreateTodo();
    }

    const handleCreateTodo = async () => {
        //get the value that is on the input and check if it's not an empty string
        const task = todoTaskRef.current.value;
        if (task === "") return;

        const newTodo = { 
            id: uuidv4(), 
            task: task, 
            completed: false,
            isAnon: currentUser.isAnonymous,
            uid: currentUser.uid
        };

        //add the new todo to the database and get the docId as response
        const res = await insertNewTodo(newTodo);

        newTodo.docId = res;

        //add the new todo to the array and reset the value of the input
        setTodos((prevTodos) => {
            return [...prevTodos, newTodo];
        });
        todoTaskRef.current.value = null;
    };

    const handleUpdateTask = async (docId, newTask) => {
        const newTodos = [...todos];
        //find the specific todo and replace the old task with the new one
        const todo = newTodos.find((todo) => todo.docId === docId);
        todo.task = newTask;

        setTodos(newTodos);

        //update todo task in database
        await updateTodo(docId, todo);
    };

    const handleToggleCompletion = async (docId) => {
        const newTodos = [...todos];
        //find the specific todo and toggle the completed bool
        const todo = newTodos.find((todo) => todo.docId === docId);
        todo.completed = !todo.completed;
        
        setTodos(newTodos);

        //update todo task in database
        await updateTodo(docId, todo);
    };

    const handleDeleteTodo = async (docId) => {
        //make a new array that doesn't have that one todo
        const newTodos = todos.filter((todo) => todo.docId !== docId);
        
        setTodos(newTodos);

        //delete todo from the database
        await deleteTodo(docId);
    };

    const handleClearCompleted = () => {
        const completedTodos = todos.filter((todo) => todo.completed);
        //make a new array that gets rid of every todo that is completed
        const newTodos = todos.filter((todo) => !todo.completed);
        
        setTodos(newTodos);

        if (completedTodos) {
            completedTodos.forEach(async (todo) => {
                //delete todo from the database
                await deleteTodo(todo.docId);
            });
        }
    };

    return (
        <>
            <div className="flex flex-col items-center mt-5 text-xl sm:flex-row">
                <form id="todo-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        ref={todoTaskRef}
                        placeholder="e.g., Do the laundry"
                        className="p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                        autoComplete="off"
                    ></input>
                </form>
                <div className="flex w-full justify-evenly my-3">
                    <button
                        className="text-3xl sm:ml-5 motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl"
                        onClick={handleCreateTodo}
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
                    handleToggleCompletion={handleToggleCompletion}
                    handleUpdateTask={handleUpdateTask}
                    handleDeleteTodo={handleDeleteTodo}
                />
            </div>
        </>
    );
}
