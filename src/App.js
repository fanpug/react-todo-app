import React, { useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase/firebase";
import { BsPersonCircle, BsGoogle } from "react-icons/bs"

import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

const buttonClasses = 'bg-slate-200 text-gray-800 hover:bg-slate-300 active:bg-slate-400 font-bold uppercase text-sm px-5 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    const handleGoogleAuth = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                setCurrentUser(result.user);
                //console.log("Signed in with google", result.user.displayName);
            }).catch((error) => {
                console.error(error.code);
                alert(error.message);
            });
    }
    
    const handleAnonAuth = () => {
        signInAnonymously(auth)
        .then(() => {
            setCurrentUser("Anonymous");
            //console.log("Signed in anonymously");
        })
        .catch((error) => {
            console.error(error.code);
            alert(error.message);
        });
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            setCurrentUser(null);
            //console.log("User signed out")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <>
            <Navbar currentUser={currentUser} handleLogout={handleLogout} />
            <main className="flex flex-col items-center justify-center">
                {!currentUser ?
                    <>
                        <button className={`${buttonClasses} w-60 mt-10 flex items-center justify-center`} onClick={handleGoogleAuth}><BsGoogle className="inline mr-4" />Sign in with Google</button>
                        <button className={`${buttonClasses} w-60 mt-4 flex items-center justify-center`} onClick={handleAnonAuth}><BsPersonCircle className="inline mr-4" />Sign in Anonymously</button>
                    </> 
                :
                    <>                        
                        <Todo />
                    </>
                }
                
            </main>
        </>
    );
}

export default App;
