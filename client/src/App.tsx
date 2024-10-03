import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import ComicPage from "./pages/ComicPage/ComicPage";
import Modal from "./components/Modal/Modal";
import { Context } from "./context/context";
import { ProtectedRoute } from "./middlewares/protectedRoute";

function App() {
  const { user, setActive } = useContext(Context);

  return (
    <>
      <Navbar />
      <Modal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute user={user} setActive={setActive} />}>
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/comics/:id" element={<ComicPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
