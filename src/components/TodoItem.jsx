import React, {useState} from 'react';

export default function TodoItem({todo, handleToggleCompletion, handleUpdateTask, handleDeleteTodo}) {
  const [editing, setEditing] = useState(false);
  const {docId, task, completed} = todo;

  const [newTask, setNewTask] = useState(task);

  const isEditing = () => {
    setEditing(!editing);
  };

  const handleSubmit = (e) => {
    //prevent refreshing the page when submiting
    e.preventDefault();
    handleEdit();
  }

  const handleEdit = () => {
    const updatedTask = newTask;
    if (updatedTask === '') return;
    
    handleUpdateTask(docId, updatedTask);
    isEditing();
  };

  const handleTodoChecked = () => {
    handleToggleCompletion(docId);
  };

  const handleDelete = () => {
    handleDeleteTodo(docId);
  };

  return (
    <li key={docId} className='mb-1'>
      {/*if we're NOT editing then display the normal todo, if we ARE then show the input field to edit it*/}
      {!editing ?
        <>
          <input type='checkbox' className='w-6 h-6 mr-1 translate-y-0.5' checked={completed} onChange={handleTodoChecked} />
          <span className={completed ? 'line-through break-normal' : 'break-normal' }>{task}</span>
          <button className={completed ? 'hidden' : 'ml-2 mr-1 motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl'} onClick={isEditing}>✏️</button>
          <button className={completed ? 'hidden' : 'motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl'} onClick={handleDelete}>❌</button>
        </>
      : 
        <>
          <form onSubmit={handleSubmit} className='inline'>
            <input 
              type="text" 
              value={newTask} 
              onChange={e => setNewTask(e.target.value)} 
              className="w-10/12 p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
            </input>
          </form>
          <button className={completed ? 'hidden' : 'ml-2 mr-1 motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl'} onClick={handleEdit}>✔️</button>
          <button className={completed ? 'hidden' : 'motion-safe:hover:scale-125 motion-safe:hover:-translate-y-0.5 motion-safe:transition hover:drop-shadow-xl'} onClick={isEditing}>✖️</button>
        </>
      }
      
    </li>
  )
}
