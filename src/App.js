import React, { useEffect, useState } from "react";
import TicTacToe from "./components/tictactoe/tictactoe";
import welcomeImg from "./components/assets/bg_tictactoe.avif"


function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (

        <div className="loading-screen">
          
          <h2 className="load">Loading Game...</h2>
          <div className="loader" id="loading-bar">
            
          </div>
        </div>
      ) : (
        <TicTacToe/>
      )}
    </div>
  );
}

export default App;
