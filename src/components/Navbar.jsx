import React from 'react';
import AboutModal from "./AboutModal";

export default function Navbar({toggleModal}) {
  return (
    <header className='sticky left-0 bottom-0 shadow-md z-40'>
        <nav className='h-[72px] min-h-full w-full flex items-center justify-end bg-red-300'>
            <ul className='list-none flex'>
                <li className='pr-14'><AboutModal /></li>
            </ul>
        </nav>
    </header>
  )
}
