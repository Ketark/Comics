import React, { ChangeEvent, useContext, useState } from "react";
import { Context } from "../../context/context";

export default function Register() {
  const [inputs, setInputs] = useState({
    login: "",
    password1: "",
    password2: "",
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
          user.login === inputs.login
      )
    ) {
      setMessage("Такой пользователь уже существует");
    } else if(!inputs.login) {
      setMessage("Введите имя пользователя");
    } else if (inputs.password1.length < 6) {
      setMessage("Пароль должен содержать не меньше 6 символов");
    } else if (inputs.password1 !== inputs.password2) {
      setMessage("Пароли не соответствуют");
    } else {
      userListParse.push({ login: inputs.login, password: inputs.password1 });
      console.log(userListParse);
      localStorage.userList = JSON.stringify(userListParse);
      localStorage.login = inputs.login;
      setUser(inputs.login);
      setInputs({ login: "", password1: "", password2: "" });
      setActive(false);
    }
  };

  return (
    <div className="login">
      <h2>Register</h2>
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
          name="password1"
          placeholder="Enter your password"
          type="password"
          value={inputs.password1}
          onChange={changeInputs}
        />
        <input
          className="loginInput"
          name="password2"
          placeholder="Repeat your password"
          type="password"
          value={inputs.password2}
          onChange={changeInputs}
        />
        <div className="errMsg">{message}</div>
        <button className="loginButton" onClick={getLogin}>
          Register
        </button>
      </form>
    </div>
  );
}
