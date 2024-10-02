import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import ComicPage from "./pages/ComicPage/ComicPage";
import Modal from "./components/Modal/Modal";

function App() {
  useEffect(() => {
    if(!localStorage.getItem('login')) {
      localStorage.setItem('login', 'no');
    }
  }, [])
  const [active, setActive] = useState(false);
  return (
    <>
      <Navbar setActive={setActive} />
      <Modal active={active} setActive={setActive} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/comics/:id" element={<ComicPage />} />
      </Routes>
    </>
  );
}

export default App;
