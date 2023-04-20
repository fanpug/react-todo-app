import React, {useState} from 'react';

import { AiFillQuestionCircle } from 'react-icons/ai';

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
        <button onClick={toggleModal} className='mt-1 w-full block px-2 py-3 font-bold text-slate-50 rounded sm:shadow hover:shadow-md bg-rose-500 hover:bg-fuchsia-600 active:bg-fuchsia-700 hover:text-white sm:w-fit sm:mt-0 ease-linear transition-all duration-150'>Instructions<AiFillQuestionCircle className='inline ml-1 -translate-y-0.5 h-5 w-5' /></button>
    
      {!showModal ?
        null

      :

        <div id='container' onClick={handleOnClose} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50'>
          <div className='bg-slate-100 p-3 rounded max-w-sm text-left'>
            <h2 className='font-bold text-3xl underline mb-3 text-center'>Instructions</h2>
            <ul>
              <li className='mb-1'>
                ➕ - Add a task
              </li>
              <li className='mb-1'>
                🗑️ - Delete all completed tasks
              </li>
              <li className='mb-1'>
                ✏️ - Edit a specific task
              </li>
              <li className='mb-1'>
                ❌ - Delete a specific task
              </li>
            </ul>
          </div>
        </div>
      }
    </>
  )
}
