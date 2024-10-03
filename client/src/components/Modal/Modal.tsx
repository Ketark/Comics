import React, { useContext, useState } from "react";
import "./Modal.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Context } from "../../context/context";

export default function Modal() {
  const [isLogin, setIsLogin] = useState(true);

  const { active, setActive } = useContext(Context);

  const toggleModal = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={() => setActive(false)}>
          X
        </button>
        {isLogin ? <Login /> : <Register />}
        <button className="toggle" onClick={toggleModal}>
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}
