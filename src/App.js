import React, { useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    onAuthStateChanged,
    signOut,
    deleteUser,
} from "firebase/auth";
import { auth } from "./firebase/firebase";

import { BsPersonCircle, BsGoogle } from "react-icons/bs"

import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

const buttonClasses = 'flex items-center justify-center w-60 bg-slate-200 text-gray-800 hover:bg-slate-300 active:bg-slate-400 font-bold uppercase text-sm px-5 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150';

/* 
    States
    0 - Initialized
    1 - Loading
    2 - Logged in
    3 - No one is logged in
*/

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [state, setCurrentState] = useState(0);
    let loginStatus = <div>Loading...</div>;

    useEffect(() => {
        setCurrentState(1);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentState(2);
                if (user.isAnonymous) {
                    user.displayName = "Anonymous";
                    user.photoURL = "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
                }
                setCurrentUser(user);
            } else {
                setCurrentState(3);
                console.log("No users logged in...");
            }
        })
    }, []);

    const handleGoogleAuth = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //const credential = GoogleAuthProvider.credentialFromResult(result);
                //const token = credential.accessToken;
                //console.log("Signed in with google", result.user.displayName);
            }).catch((error) => {
                console.error(error.code);
                alert(error.message);
            });
    }
    
    const handleAnonAuth = () => {
        signInAnonymously(auth)
        .then(() => {
            //console.log("Signed in anonymously");
        })
        .catch((error) => {
            console.error(error.code);
            alert(error.message);
        });
    }

    const handleLogout = () => {
        if (currentUser.isAnonymous) {
            deleteUser(currentUser).then(() => {
                // User deleted.
            }).catch((error) => {
                console.error(error.code);
                alert(error.message);
            });
        }
        signOut(auth).then(() => {
            setCurrentUser(null);
            //console.log("User signed out")
        }).catch((error) => {
            console.error(error.code);
            alert(error.message);
        });
    }

    
    if(state === 1) {
        loginStatus = <div>Loading...</div>;
    }

    if(state === 3) {
        loginStatus = <>
                        <h1 className="mt-5 flex flex-col justify-center items-center bg-cover bg-clip-text bg-center uppercase text-transparent text-center text-4xl sm:text-7xl font-extrabold tracking-wide antialiased" style={{ backgroundImage: "url(https://media.giphy.com/media/xTiTniuHdUjpOlNo1q/source.gif)" }}>Welcome to my <span>To-Do App!</span></h1>
                        <p className="mt-4 flex flex-col justify-center items-center max-w-xs sm:max-w-xl text-lg sm:text-xl text-center font-extrabold font-eczar">
                            <span>Unleash your productivity with this robust task management tool, and conquer your tasks effortlessly by taking action now!</span>
                            <span className="mt-6 text-base sm:text-lg font-semibold">Sign in with your Google account for a personalized experience:</span>
                        </p>
                        <button className={`${buttonClasses} mt-4`} onClick={handleGoogleAuth}><BsGoogle className="inline mr-4" />Sign in with Google</button>
                        <p className="mt-10 text-base sm:text-lg font-semibold text-[#452F2C] font-eczar">or simply try it out as an anonymous user:</p>
                        <button className={`${buttonClasses} mt-4`} onClick={handleAnonAuth}><BsPersonCircle className="inline mr-4" />Sign in Anonymously</button>
                    </>;
    }

    return (
        <>
            <Navbar currentUser={currentUser} state={state} handleLogout={handleLogout} />
            <main className="flex flex-col items-center justify-center">
                {state !== 2 ?
                    <>
                        {loginStatus}
                    </> 
                :
                    <>                        
                        <Todo currentUser={currentUser} />
                    </>
                }
            </main>
        </>
    );
}

export default App;
