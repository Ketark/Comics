import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Context } from "../../context/context";
import SearchTitleComponent from "../SearchTitleComponent/SearchTitleComponent";

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
      <Link className="home" to="/">
        <img
          className="homeLogo"
          src={process.env.PUBLIC_URL + "/logo.svg"}
          alt="logo"
        />
      </Link>
      <SearchTitleComponent/>
      <nav className="navbar">
        {user ? (
          <>
            <div className="nickName">{user}</div>
            <Link className="favorites" to="/favorites">
              Favorites
            </Link>
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
