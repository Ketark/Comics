import React, { useState } from "react";
import "./Modal.css";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function Modal({
  active,
  setActive,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLogin, setIsLogin] = useState(true);
  const toggleModal = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div onClick={() => setActive(false)}>X</div>
        {isLogin ? <Login /> : <Register />}
        <button onClick={toggleModal}>{isLogin ? "Register" : "Login"}</button>
      </div>
    </div>
  );
}
