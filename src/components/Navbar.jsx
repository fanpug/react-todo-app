import React from 'react';

export default function Navbar() {
  return (
    <header className='sticky left-0 bottom-0 shadow-md'>
        <nav className='h-[72px] min-h-full w-full flex items-center justify-end bg-red-300'>
            <ul className='list-none flex'>
                <li className='pr-14'><a href="#welcome-section">About</a></li>
            </ul>
        </nav>
    </header>
  )
}
