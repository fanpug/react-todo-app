import React, {useState, useRef} from 'react';

export default function TodoItem({todo, toggleTodo, editTodo, deleteTodo}) {
  const [editing, setEditing] = useState(false);

  const editTaskRef = useRef();

  const {id, task, completed} = todo;

  const isEditing = () => {
    setEditing(!editing);
  };

  const handleTodoClick = () => {
    toggleTodo(id);
  };

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleEdit = () => {
    const task = editTaskRef.current.value;
    if (task === '') return;
    
    editTodo(id, task);
    editTaskRef.current.value = null;
    isEditing();
  };

  return (
    <li className='mb-1'>
      {/*if we're NOT editing then display the normal todo, if we ARE then show the input field to edit it*/}
      {!editing ?
        <>
          <input type='checkbox' className='w-6 h-6 mr-1 translate-y-0.5' checked={completed} onChange={handleTodoClick} />
          <span className={completed ? 'line-through break-normal' : 'break-normal' }>{task}</span>
          <button className={completed ? 'hidden' : 'ml-2 mr-1 motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl'} onClick={isEditing}>✏️</button>
          <button className={completed ? 'hidden' : 'motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl'} onClick={handleDelete}>❌</button>
        </>
      : 
        <>
          <input type="text" ref={editTaskRef} className="p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"></input>
          <button className={completed ? 'hidden' : 'ml-2 mr-1 motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl'} onClick={handleEdit}>✔️</button>
          <button className={completed ? 'hidden' : 'motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl'} onClick={isEditing}>✖️</button>
        </>
      }
      
    </li>
  )
}
