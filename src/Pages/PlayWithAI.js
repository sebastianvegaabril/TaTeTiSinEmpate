import React, { useState, useEffect } from "react";
import Board from "../Components/Board";
import github from "../assets/icons8-github-50.png";
import Score from "../Components/Score"
import WinnerMessage from "../Components/WinnerMessage"
import { Link } from "react-router-dom";
//import "./index.css";

const PlayWithAI = () => {
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

  const almostWinner = () => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winningMoves = [];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        let l1 = circleQueue;
        let l2 = xQueue

        if(circleQueue.length > 2){
            l1 = circleQueue.slice(-2);
        }
        if(xQueue.length > 2){
            l2 = xQueue.slice(-2);
        }

        if (circleBools[a] && circleBools[b] && !circleBools[c] && !xBools[c] && l1.includes(a) && l1.includes(b)) {
            winningMoves.push(c);
        }
        if (circleBools[a] && circleBools[c] && !circleBools[b] && !xBools[b] && l1.includes(a) && l1.includes(c)) {
            winningMoves.push(b);
        }
        if (circleBools[b] && circleBools[c] && !circleBools[a] && !xBools[a] && l1.includes(b) && l1.includes(c)) {
            winningMoves.push(a);
        }

        if (xBools[a] && xBools[b] && !xBools[c] && !circleBools[c] && l2.includes(a) && l2.includes(b)) {
            winningMoves.push(c);
        }
        if (xBools[a] && xBools[c] && !xBools[b] && !circleBools[b] && l2.includes(a) && l2.includes(c)) {
            winningMoves.push(b);
        }
        if (xBools[b] && xBools[c] && !xBools[a] && !circleBools[a] && l2.includes(b) && l2.includes(c)) {
            winningMoves.push(a);
        }
    }

    return winningMoves;
};

  useEffect(() => {
    if(!isXTurn){
      const newSquares = squares.slice();
      const newXQueue = xQueue.slice();
      if (newXQueue.length > 2) {
        newSquares[newXQueue[0]] = <span style={{ color: "#4C4CFF" }}>✕</span>;
        setSquares(newSquares);
      }

      setTimeout(() => {  
        const numbers = []
        const newCircleBools = circleBools.slice();
        const newCircleQueue = circleQueue.slice();

        for(let i = 0; i < xBools.length; i++){
          if(xBools[i] === false && circleBools[i] === false){
            numbers.push(i);
          }
        }

        if (newXQueue.length === 2){
          let almostWin = almostWinner();
            if(almostWin.length > 0){
                const possibilities = almostWin.filter(index => numbers.includes(index));
                const randomIndex = Math.floor(Math.random() * possibilities.length);
                newSquares[possibilities[randomIndex]] = "◯";
                newCircleBools[possibilities[randomIndex]] = true;
                newCircleQueue.push(possibilities[randomIndex]);
                
                if (newCircleQueue.length > 3) {
                    newCircleBools[newCircleQueue[0]] = false;
                    newSquares[newCircleQueue[0]] = null;
                    newCircleQueue.shift();
                }

                setCircleQueue(newCircleQueue);
                setCircleBools(newCircleBools);
                setSquares(newSquares);
                setTurn(true);
                return;
            }
        }

        const randomIndex = Math.floor(Math.random() * numbers.length);
        newSquares[numbers[randomIndex]] = "◯";
        newCircleBools[numbers[randomIndex]] = true;
        newCircleQueue.push(numbers[randomIndex]);

        if (newCircleQueue.length > 3) {
            newCircleBools[newCircleQueue[0]] = false;
            newSquares[newCircleQueue[0]] = null;
            newCircleQueue.shift();
        }

        setCircleQueue(newCircleQueue);
        setCircleBools(newCircleBools);
        setSquares(newSquares);
        setTurn(true);
        }, 400); 
    };
  }, [isXTurn]);  

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

  const handleClick = (i) => {
    if (gameOver || squares[i] || xBools[i] || circleBools[i] || !isXTurn) {
      return;
    }

    const newSquares = squares.slice();
    const newCircleBools = circleBools.slice();
    const newXBools = xBools.slice();
    const newXQueue = xQueue.slice();
    const newCircleQueue = circleQueue.slice();

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

  return (
    <>
      <Link to="/" className="link">
        <div style={{ position: 'relative' }}>
          <div className="backToHome">
            <p>Back To Home</p>
          </div>
        </div>
      </Link>

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
          <WinnerMessage
            winner = {winner}
            onClick = {handleRestart}
          />
        )}

      <Score
        playerOneWins={playerOneWins}
        playerTwoWins={playerTwoWins}
        />
    </div>
  </>
  )
};

export default PlayWithAI;
