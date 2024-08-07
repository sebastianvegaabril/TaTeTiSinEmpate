import React from "react";
//import "./index.css";


const Score = ({ playerOneWins, playerTwoWins }) => {
  return (
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
  );
};

export default Score;