import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PlayWithAI from "./Pages/PlayWithAI";
import Play from "./Pages/Play";
import PlayWithAIHard from "./Pages/PlayWithAIHard";
import Layout from "./layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="play" element={<Play />} />
          <Route path="playWithAI/easy" element={<PlayWithAI />} />
          <Route path="playWithAI/hard" element={<PlayWithAIHard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
