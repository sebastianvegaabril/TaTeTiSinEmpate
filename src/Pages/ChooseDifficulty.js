import React from "react";
import { Link } from "react-router-dom";
import Background from "../Components/Background";
import github from "../assets/icons8-github-50.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <Link to="/" className="link">
          <div className="backToHome">
            <p>VOLVER ATRAS</p>
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
        <header className="header">Ta Te Ti Sin Empate</header>
        <Link to="/playwithai/easy" className="link">
          <div className="mode">
            <p>FACIL</p>
          </div>
        </Link>
        <Link to="/playwithai/hard" className="link">
          <div className="mode">
          <p>DIFICIL</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
