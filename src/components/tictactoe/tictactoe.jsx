import React, { useState } from "react";
import "./tictactoe.css"; 

const TicTacToe = () => {
  const [N, setN] = useState(3); 
  const [M, setM] = useState(3); 
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill("")));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  

  const resetGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill("")));
    setXTurn(true);
    setWinner(null);
    setN(3);
    setM(3);

  };

  const checkWinner = (newBoard) => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const current = newBoard[i][j];
        if (current === "") continue;

        for (const [dx, dy] of directions) {
          let count = 1;
          for (let step = 1; step < M; step++) {
            const ni = i + dx * step;
            const nj = j + dy * step;
            if (ni < 0 || nj < 0 || ni >= N || nj >= N || newBoard[ni][nj] !== current) break;
            count++;
          }
          if (count >= M) return current;
        }
      }
    }

    if (newBoard.flat().every(cell => cell !== "")) return "Draw";
    return null;
  };

  const handleClick = (i, j) => {
    if (board[i][j] !== "" || winner) return;
    const newBoard = board.map(row => [...row]);
    newBoard[i][j] = xTurn ? "X" : "O";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) setWinner(result);
    else setXTurn(!xTurn);
    

  };

  return (
    <div className="game-container">
      <h3 className="wel">WELCOME TO THE <span className="game">ULTIMATE GAME</span></h3>
      <h1 className="heading">Tic-Tac-Toe</h1>

      <div className="settings">
        <label>
          <p className="var">Board Size (N):</p>
          <input
            type="number"
            value={N}
            min={3}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setN(val);
              setBoard(Array(val).fill(null).map(() => Array(val).fill("")));
              setWinner(null);
            }}
          />
        </label>
         <br /><br />
        <label className="winM">
         <p className="var">Win Condition (M):</p> 
          <input
            type="number"
            value={M}
            min={3}
            max={N}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setM(val);
              setWinner(null);
            }}
          />
        </label>
      </div>

      <h3 className="direct">
        {`Turn: ${xTurn ? "X" : "O"}`}
      </h3>

      {winner && (
  <div className="modal-overlay">
    <div className="modal-content" >
      <p className="result">{winner === "Draw" ? "It's a Draw!" : ` '${winner}' WON!!🎉 `}</p>
      <br />
      <button onClick={resetGame}>Play Again</button>
    </div>
  </div>
)}

      <div className="board" style={{ gridTemplateColumns: `repeat(${N}, 60px)` }}>
        {board.map((row, i) => (
          <div key={i} className="board-row">
            {row.map((cell, j) => (
              <button
  key={j}
  className={`cell ${cell === "X" ? "x-cell" : cell === "O" ? "o-cell" : ""}`}
  onClick={() => handleClick(i, j)}
>
  {cell}
</button>

            ))}
          </div>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
