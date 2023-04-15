import React from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
  

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center">
        <Todo />
      </main>
    </>
  );
}

export default App;
