import React from 'react';

export default function TodoItem({todo, toggleTodo}) {
  const {id, title, completed} = todo;

  const handleTodoClick = () => {
    toggleTodo(id);
  };

  return (
    <li className='mb-1'>
      <input type='checkbox' className='w-6 h-6 mr-1' checked={completed} onChange={handleTodoClick} />
      <span className={completed ? 'line-through' : '' }>{title}</span>
    </li>
  )
}
