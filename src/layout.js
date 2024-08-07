import React from "react";
import { Outlet } from "react-router-dom";
import Background from "./Components/Background";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <Background />
      <Outlet />
    </>
  );
};

export default Layout;
