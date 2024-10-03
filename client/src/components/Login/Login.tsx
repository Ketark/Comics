import React, { ChangeEvent, useContext, useState } from "react";
import "./Login.css";
import { Context } from "../../context/context";

export default function Login() {
  const [inputs, setInputs] = useState({
    login: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const { setActive } = useContext(Context);

  const changeInputs = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { setUser } = useContext(Context);

  const getLogin = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    let userList = localStorage.getItem("userList");
    if (userList === null) {
      userList = "[]";
    }

    const userListParse = JSON.parse(userList);

    if (
      userListParse.some(
        (user: { login: string; password: string }) =>
          user.login === inputs.login && user.password === inputs.password
      )
    ) {
      localStorage.login = inputs.login;
      setUser(inputs.login);
      setInputs({ login: "", password: "" });
      setActive(false);
    } else {
      setMessage("Неверный логин или пароль");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="loginForm">
        <input
          className="loginInput"
          name="login"
          placeholder="Enter your login"
          type="text"
          value={inputs.login}
          onChange={changeInputs}
        />
        <input
          className="loginInput"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={inputs.password}
          onChange={changeInputs}
        />
        <div className="errMsg">{message}</div>
        <button className="loginButton" onClick={getLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
