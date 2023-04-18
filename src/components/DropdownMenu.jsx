import React, { useState } from 'react';

import { IoLogOut } from 'react-icons/io5';

export default function DropdownMenu({ currentUser, handleLogout, handleDisplayName }) {
    const [drpMenuState, setDrpMenuState] = useState(false);

    const handleToggle = () => {
        setDrpMenuState(!drpMenuState);
    }

    return (
        <>
            <div className='hidden sm:block relative'>
                <button onClick={handleToggle} className="z-10 relative block h-11 w-11 rounded-full shadow hover:shadow-md overflow-hidden border-2 border-fuchsia-600 focus:border-fuchsia-700 object-cover">
                    <img className='h-full w-full object-cover' src={currentUser.photoURL} alt="User's avatar" referrerPolicy="no-referrer" />
                </button>

                {drpMenuState ?
                <>
                    <button onClick={handleToggle} className='fixed inset-0 h-full w-full cursor-default' tabIndex="-1"></button>
                    <div className="absolute right-0 bg-slate-50 rounded-lg py-1.5 w-40 shadow-xl">
                        <span className='block py-2 font-bold text-slate-700 capitalize'>{handleDisplayName(currentUser.displayName)}</span>
                        <div className='w-full border my-1'></div>
                        <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-900 font-bold hover:bg-fuchsia-600 active:bg-fuchsia-700 hover:text-white ease-linear transition-all duration-75">Log out<IoLogOut className='inline ml-1 -translate-y-0.5 h-6 w-6' /></button>
                    </div>
                </>
                :
                    null
                }
            </div>
        </>
    )
}
