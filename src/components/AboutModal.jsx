import React from 'react'

export default function AboutModal({visible, toggleModal}) {
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "container") {
      toggleModal();
    }
  }

  return (
    <div id='container' onClick={handleOnClose} className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm'>
      <div className='bg-slate-100 p-3 rounded '>
        <p>
          AboutModal
        </p>
      </div>
    </div>
  )
}
