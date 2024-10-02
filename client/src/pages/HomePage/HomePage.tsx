import React from "react";
import './HomePage.css'
import ComicContainer from "../../components/ComicContainer/ComicContainer";

export default function HomePage() {
  return (
    <>
      <h1 className="greetings">Добро пожаловать, любитель комиксов!</h1>
      <ComicContainer />
    </>
  );
}
