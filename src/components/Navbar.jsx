import React, { useEffect, useState } from 'react';
import AboutModal from "./AboutModal";
import DropdownMenu from './DropdownMenu';

import { IoLogOut } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

export default function Navbar({currentUser, state, handleLogout}) {
  const [menuState, setMenuState] = useState(false);
  const [menuClass, setMenuClass] = useState("hidden");

  useEffect(() => {
    if (menuState) {
      setMenuClass("block");
    } else {
      setMenuClass("hidden");
    }
  }, [menuState])

  //Function to handle the user's name (TODO: there must be a better way to do this)
  const handleDisplayName = (name) => {
    const nameArray = name.split(" ");
    if(nameArray.length >= 3){
        return `${nameArray[0]} ${nameArray[2]}`.toLowerCase();
    } else {
        return name.toLowerCase();
    }
  }

  return (
    <header className='bg-red-400 sm:flex sm:justify-between sm:px-6 sm:py-3 sm:items-center'>
      <div className='flex items-center justify-between px-4 py-3 sm:p-0'>
        <div>
          LOGO
        </div>
        
        <div className='sm:hidden'>
          <button onClick={() => setMenuState(!menuState)} type='button' className='block text-gray-100 hover:text-white focus:text-white focus:outline-none'>
            {menuState ?
              <RxCross2 className='h-6 w-6' />
            :
              <GiHamburgerMenu className='h-6 w-6' />
            }
          </button>
        </div>
      </div>

      {/*Hide the menu if closed*/}
      <div className={`${menuClass} px-2 py-2 text-center sm:p-0 sm:flex sm:items-center`}>
        {/*Only shows on mobile and if user is logged in*/}
        {state === 2 ?
          <span className='sm:hidden block mt-1 w-full px-2 py-3 font-bold text-slate-100 capitalize rounded ease-linear transition-all duration-150'>{handleDisplayName(currentUser.displayName)}</span>
        :
          null
        }
        
        {/*Button shows on mobile and desktop*/}
        <AboutModal />
        
        {/*Button only shows on desktop and if user is logged in*/}
        {state === 2 ?
          <DropdownMenu currentUser={currentUser} handleLogout={handleLogout} handleDisplayName={handleDisplayName} />
        :
          null
        }

        {/*Button only shows on mobile and if user is logged in*/}
        {state === 2 ?
          <button onClick={handleLogout} className='sm:hidden mt-1 w-full px-2 py-3 font-bold text-slate-50 rounded bg-rose-500 active:bg-fuchsia-700 ease-linear transition-all duration-150'>Log Out<IoLogOut className='inline ml-1 -translate-y-0.5 h-6 w-6' /></button>
        :
          null
        }
      </div>
      
    </header>
  )
}
