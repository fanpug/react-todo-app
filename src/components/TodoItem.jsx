import React from 'react';

export default function TodoItem({todo, toggleTodo, editTodo, deleteTodo}) {
  const {id, task, completed} = todo;

  const handleTodoClick = () => {
    toggleTodo(id);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleEdit = () => {
    editTodo(id);
  };

  return (
    <li className='mb-1'>
      <input type='checkbox' className='w-6 h-6 mr-1 translate-y-0.5' checked={completed} onChange={handleTodoClick} />
      <span className={completed ? 'line-through' : '' }>{task}</span>
      <button className='ml-2 mr-1 motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition' onClick={handleEdit}>✏️</button>
      <button className='motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition' onClick={handleDelete}>❌</button>
    </li>
  )
}
