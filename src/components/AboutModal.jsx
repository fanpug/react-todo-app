import React, {useState} from 'react';

import { AiFillInfoCircle } from 'react-icons/ai';

export default function AboutModal() {
  //create the variable that will track the state of the modal
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //only close the modal if the user clicks on the container
  const handleOnClose = (e) => {
    if (e.target.id === "container") {
      toggleModal();
    }
  }

  return (
    <>
        <button onClick={toggleModal} className='mt-1 w-full block px-2 py-3 font-bold text-slate-50 rounded sm:shadow hover:shadow-md bg-rose-500 hover:bg-fuchsia-600 active:bg-fuchsia-700 hover:text-white sm:w-fit sm:mt-0 sm:mx-4 ease-linear transition-all duration-150'>About<AiFillInfoCircle className='inline ml-1 -translate-y-0.5 h-5 w-5' /></button>
    
      {!showModal ?
        null

      :

        <div id='container' onClick={handleOnClose} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50'>
          <div className='bg-slate-100 p-3 rounded max-w-sm text-left'>
            <h2 className='font-semibold text-2xl underline my-3 text-center'>About this To-Do App</h2>
            <p>
              This To-Do application is based on <a className='font-medium text-blue-600 underline hover:no-underline' href='https://youtu.be/EMk6nom1aS4' target='_blank' rel="noreferrer">Carlos Azaustre's React Tutorial</a> (the GitHub repository for it can be found <a className='font-medium text-blue-600 underline hover:no-underline' href='https://github.com/carlosazaustre/react-30-minutes' target='_blank' rel="noreferrer">here</a>), serving as the initial foundation.
            </p>
            <p className='mt-2'>
              I expanded and customized the code to add additional features and functionalities. It now includes my own modifications and improvements, making it a unique and enhanced version of the original tutorial code.
            </p>
            <p className='mt-2'>
              I undertook this project as a way to familiarize myself with React Hooks, TailwindCSS, and Firebase's services.
            </p>
            <p className='mt-2'>
              In the future I would like to migrate from create-react-app to Vite to further optimize the app's functionality, refactor some of the components and their functions and maybe choose another color palette.
            </p>
          </div>
        </div>
      
      }

    </>
  )
}
