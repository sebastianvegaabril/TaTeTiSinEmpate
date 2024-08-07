import React, { useState, useEffect } from "react";
import Square from "../Square";
import "./index.css";
import github from "./../../assets/icons8-github-50.png";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setTurn] = useState(true);
  const [circleBools, setCircleBools] = useState(Array(9).fill(false));
  const [xBools, setXBools] = useState(Array(9).fill(false));
  const [xQueue, setXQueue] = useState([]);
  const [circleQueue, setCircleQueue] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerOneWins, setPlayerOneWin] = useState(0);
  const [playerTwoWins, setPlayerTwoWin] = useState(0);

  useEffect(() => {
    const result = checkWinner();
    if (result) {
      setWinner(result);
      setGameOver(true);
    }
  }, [squares, circleBools, xBools]);

  const renderSquare = (i) => {
    return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const handleClick = (i) => {
    if (gameOver || xBools[i] || circleBools[i]) {
      return;
    }

    const newSquares = squares.slice();
    const newCircleBools = circleBools.slice();
    const newXBools = xBools.slice();
    const newXQueue = xQueue.slice();
    const newCircleQueue = circleQueue.slice();

    if (newCircleQueue.length > 2) {
      newSquares[newCircleQueue[0]] = (
        <span style={{ color: "#FF3232" }}>◯</span>
      );
      setSquares(newSquares);
    }

    if (newXQueue.length > 2) {
      newSquares[newXQueue[0]] = <span style={{ color: "#4C4CFF" }}>✕</span>;
      setSquares();
    }

    if (isXTurn) {
      newSquares[i] = "✕";
      newXBools[i] = true;
      newXQueue.push(i);
      if (newXQueue.length > 3) {
        newXBools[newXQueue[0]] = false;
        newSquares[newXQueue[0]] = " ";
        newXQueue.shift();
      }
      setXQueue(newXQueue);
      setXBools(newXBools);
    } else {
      newSquares[i] = "◯";
      newCircleBools[i] = true;
      newCircleQueue.push(i);
      if (newCircleQueue.length > 3) {
        newCircleBools[newCircleQueue[0]] = false;
        newSquares[newCircleQueue[0]] = " ";
        newCircleQueue.shift();
      }
      setCircleQueue(newCircleQueue);
      setCircleBools(newCircleBools);
    }

    setSquares(newSquares);
    setTurn(!isXTurn);
  };

  const checkWinner = () => {
    const newCircleBools = circleBools.slice();
    const newXBools = xBools.slice();

    if (
      (newCircleBools[0] && newCircleBools[1] && newCircleBools[2]) ||
      (newCircleBools[3] && newCircleBools[4] && newCircleBools[5]) ||
      (newCircleBools[6] && newCircleBools[7] && newCircleBools[8]) ||
      (newCircleBools[0] && newCircleBools[3] && newCircleBools[6]) ||
      (newCircleBools[1] && newCircleBools[4] && newCircleBools[7]) ||
      (newCircleBools[2] && newCircleBools[5] && newCircleBools[8]) ||
      (newCircleBools[0] && newCircleBools[4] && newCircleBools[8]) ||
      (newCircleBools[2] && newCircleBools[4] && newCircleBools[6])
    ) {
      setPlayerTwoWin(playerTwoWins + 1);
      return "el ◯";
    }

    if (
      (newXBools[0] && newXBools[1] && newXBools[2]) ||
      (newXBools[3] && newXBools[4] && newXBools[5]) ||
      (newXBools[6] && newXBools[7] && newXBools[8]) ||
      (newXBools[0] && newXBools[3] && newXBools[6]) ||
      (newXBools[1] && newXBools[4] && newXBools[7]) ||
      (newXBools[2] && newXBools[5] && newXBools[8]) ||
      (newXBools[0] && newXBools[4] && newXBools[8]) ||
      (newXBools[2] && newXBools[4] && newXBools[6])
    ) {
      setPlayerOneWin(playerOneWins + 1);
      return "la ✕";
    }

    return null;
  };

  const renderMessage = () => {
    if (winner) {
      return (
        <div className="message">
          {`¡Ganó ${winner}!`}
          <button className="btn" onClick={() => reset()}>
            REINICIAR
          </button>
        </div>
      );
    }
    return null;
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setTurn(true);
    setCircleBools(Array(9).fill(false));
    setXBools(Array(9).fill(false));
    setCircleQueue([]);
    setXQueue([]);

    setWinner(null);
    setGameOver(false);
  };

  return (
    <>
      <div
        className="github"
        onClick={() =>
          window.open("https://github.com/sebastianvegaabril", "_blank")
        }
      >
        <img src={github} alt="GitHub icon" />
      </div>

      <div className="container">
        <header className="header">Ta Te Ti Sin Empate</header>
        <div className="board">{squares.map((_, i) => renderSquare(i))}</div>
        {renderMessage()}
        <div className="counter">
          <div className="playerOne">
            <p className="playerTitle">Jugador Uno</p>
            <p className="playerWins">{playerOneWins}</p>
          </div>
          <div className="playerTwo">
            <p className="playerTitle">Jugador Dos</p>
            <p className="playerWins">{playerTwoWins}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
