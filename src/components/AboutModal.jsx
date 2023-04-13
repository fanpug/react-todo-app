import React from 'react'

export default function AboutModal({visible, toggleModal}) {
  if (!visible) return null;

  //only close the modal if the user clicks on the container
  const handleOnClose = (e) => {
    if (e.target.id === "container") {
      toggleModal();
    }
  }

  return (
    <div id='container' onClick={handleOnClose} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm'>
      <div className='bg-slate-100 p-3 rounded max-w-sm'>
        <h2 className='font-semibold text-2xl underline mb-3'>About this To-Do App</h2>
        <p>
          This To-Do application is based on <a className='font-medium text-blue-600 underline hover:no-underline' href='https://youtu.be/EMk6nom1aS4' target='_blank' rel="noreferrer">Carlos Azaustre's React Tutorial</a> (the GitHub repository for it can be found <a className='font-medium text-blue-600 underline hover:no-underline' href='https://github.com/carlosazaustre/react-30-minutes' target='_blank' rel="noreferrer">here</a>), serving as the initial foundation.
        </p>
        <p className='mt-2'>However, I have since expanded and customized the code to add additional features and functionalities. It now includes my own modifications and improvements, making it a unique and enhanced version of the original tutorial code.</p>
        <p className='mt-2'>I undertook this project as a way to familiarize myself with React Hooks and TailwindCSS, and I may also add a database support (probably Firebase) in the future to further enhance the app's capabilities.</p>
      </div>
    </div>
  )
}
