import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({  setActive } : {setActive: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <header>
      <Link to="/">
        <img className="home" src="../../logo.svg" alt="logo" />
      </Link>
      <nav>
        <Link to="/favorites">Избранное</Link>
        <div className="login" onClick={() => setActive(true)}>Войти</div>
        <Link to="/logout">Выйти</Link>
      </nav>
    </header>
  );
}
