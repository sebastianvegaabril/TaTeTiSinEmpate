import React, { useState, useEffect } from "react";
import Board from "../Components/Board";
import github from "../assets/icons8-github-50.png";

const Play = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setTurn] = useState(true);
  const [xBools, setXBools] = useState(Array(9).fill(false));
  const [circleBools, setCircleBools] = useState(Array(9).fill(false));
  const [xQueue, setXQueue] = useState([]);
  const [circleQueue, setCircleQueue] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [playerOneWins, setPlayerOneWin] = useState(0);
  const [playerTwoWins, setPlayerTwoWin] = useState(0);

  const handleClick = (i) => {
    if (gameOver || squares[i] || xBools[i] || circleBools[i]) {
      return;
    }

    const newSquares = squares.slice();
    const newCircleBools = circleBools.slice();
    const newXBools = xBools.slice();
    const newXQueue = xQueue.slice();
    const newCircleQueue = circleQueue.slice();

    if (newCircleQueue.length > 2) {
      setSquares(newSquares);
      newSquares[newCircleQueue[0]] = (<span style={{ color: "#FF3232" }}>◯</span>);
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
        newSquares[newXQueue[0]] = null;
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
        newSquares[newCircleQueue[0]] = null;
        newCircleQueue.shift();
      }
      setCircleQueue(newCircleQueue);
      setCircleBools(newCircleBools);
    }

    setSquares(newSquares);
    setTurn(!isXTurn);
  };

  const handleBoardData = (data) => {
    if(data.winner === "la ✕"){
      setWinner(data.winner);
      setPlayerOneWin(playerOneWins + 1);
      setGameOver(true);
    }
    else if(data.winner === "el ◯"){
      setWinner(data.winner);
      setPlayerTwoWin(playerTwoWins + 1);
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setGameOver(false);
    setSquares(Array(9).fill(null));
    setTurn(true);
    setXBools(Array(9).fill(false));
    setCircleBools(Array(9).fill(false));
    setXQueue([]);
    setCircleQueue([]);
    setWinner(null);
  }

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
      <Board 
        squares={squares} 
        handleClick={handleClick}
        winner={winner}
        circleBools={circleBools}
        xBools={xBools}
        onBoardData={handleBoardData}
        />

        {winner && (
        <div className="message">
            {`¡Ganó ${winner}!`}
            <button className="btn" onClick={handleRestart}>
              REINICIAR
            </button>
          </div>
        )}

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

export default Play;