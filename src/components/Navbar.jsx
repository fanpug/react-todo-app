import React from 'react';
import AboutModal from "./AboutModal";
import { BiLogOut } from "react-icons/bi"

const buttonClasses = 'bg-slate-200 text-gray-800 hover:bg-slate-300 active:bg-slate-400 font-bold uppercase text-sm px-5 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150';

export default function Navbar({currentUser, state, handleLogout}) {
  return (
    <header className='sticky left-0 bottom-0 shadow-md z-40'>
        <nav className='h-[72px] min-h-full w-full flex items-center justify-between bg-red-300'>
                <li className='list-none pl-14'><AboutModal /></li>
                {state === 2 ?
                  <>
                    <li className='list-none pr-14'><button className={`${buttonClasses} flex items-center justify-center`} onClick={handleLogout}><BiLogOut className="text-lg inline mr-2" />Log Out</button></li>
                  </>
                :
                  null
                }
        </nav>
    </header>
  )
}
