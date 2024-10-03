import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Context } from "../../context/context";

export default function Navbar() {
  const { user, setUser, setActive } = useContext(Context);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("login");
    setUser(null);
    navigate("/");
  };

  return (
    <header>
      <Link to="/">
        <img className="home" src="../../logo.svg" alt="logo" />
      </Link>
      <nav>
        {user ? (
          <>
            <div className="nickName">{user}</div>
            <Link to="/favorites">Favorites</Link>
            <div className="logout" onClick={logout}>
              Logout
            </div>
          </>
        ) : (
          <div className="loginNav" onClick={() => setActive(true)}>
            Login
          </div>
        )}
      </nav>
    </header>
  );
}
