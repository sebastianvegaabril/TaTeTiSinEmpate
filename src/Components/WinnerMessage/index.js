import React from "react";
//import "./index.css";


const WinnerMessage = ({ winner, onClick }) => {
  return (
    <div className="message">
            {`¡Ganó ${winner}!`}
            <button className="btn" onClick={onClick}>
              VOLVER A JUGAR
            </button>
    </div>
  );
};

export default WinnerMessage;