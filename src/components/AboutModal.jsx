import React, {useState} from 'react'

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
      <button className='bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' onClick={toggleModal}>About</button>
    
      {!showModal ?
        null

      :

        <div id='container' onClick={handleOnClose} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50'>
          <div className='bg-slate-100 p-3 rounded max-w-sm'>
            <h2 className='font-semibold text-2xl underline mb-3'>About this To-Do App</h2>
            <p>
              This To-Do application is based on <a className='font-medium text-blue-600 underline hover:no-underline' href='https://youtu.be/EMk6nom1aS4' target='_blank' rel="noreferrer">Carlos Azaustre's React Tutorial</a> (the GitHub repository for it can be found <a className='font-medium text-blue-600 underline hover:no-underline' href='https://github.com/carlosazaustre/react-30-minutes' target='_blank' rel="noreferrer">here</a>), serving as the initial foundation.
            </p>
            <p className='mt-2'>However, I have since expanded and customized the code to add additional features and functionalities. It now includes my own modifications and improvements, making it a unique and enhanced version of the original tutorial code.</p>
            <p className='mt-2'>I undertook this project as a way to familiarize myself with React Hooks and TailwindCSS, and I may also add a database support (probably Firebase) in the future to further enhance the app's capabilities.</p>
          </div>
        </div>
      
      }

    </>
  )
}
