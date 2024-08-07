import React, { useEffect } from "react";
import Square from "../Square";
import "./index.css";

const Board = ({ squares, handleClick, circleBools, xBools,  onBoardData, winner}) => {
  const renderSquare = (i) => {
    return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (circleBools[a] && circleBools[b] && circleBools[c]) {
        return "el ◯";
      }
      if (xBools[a] && xBools[b] && xBools[c]) {
        return "la ✕";
      }
    }
    return null;
  };

  winner = checkWinner();

  useEffect(() => {
    const data = {winner};
    onBoardData(data);
  }, [winner]);

  return (
    <div className="container">
      <header className="header">Ta Te Ti Sin Empate</header>
      <div className="board">{squares.map((_, i) => renderSquare(i))}</div>
    </div>
  );
};

export default Board;