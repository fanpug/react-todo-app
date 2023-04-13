import React from 'react';

export default function Navbar({toggleModal}) {
  return (
    <header className='sticky left-0 bottom-0 shadow-md'>
        <nav className='h-[72px] min-h-full w-full flex items-center justify-end bg-red-300'>
            <ul className='list-none flex'>
                <li className='pr-14'><button className='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' onClick={toggleModal}>About</button></li>
            </ul>
        </nav>
    </header>
  )
}
