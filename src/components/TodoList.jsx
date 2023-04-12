import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({todos, toggleTodo, editTodo, deleteTodo}) {
  return (
    <ul>
        {todos.map( (todo) => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
        ))}
    </ul>
  )
}
