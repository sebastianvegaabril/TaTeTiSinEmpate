import React from "react";
import { Link } from "react-router-dom";
import Background from "../Components/Background";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="container">
        <header className="header">Ta Te Ti Sin Empate</header>
        <Link to="/play" className="link">
          <div className="mode">
            <p>1 VS 1</p>
          </div>
        </Link>
        <Link to="/playwithai" className="link">
          <div className="mode">
          <p>1 VS AI</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
