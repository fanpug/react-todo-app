import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, handleToggleCompletion, handleUpdateTask, handleDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.docId}
          todo={todo}
          handleToggleCompletion={handleToggleCompletion}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </ul>
  );
}
