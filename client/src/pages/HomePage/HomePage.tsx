import React from "react";
import './HomePage.css'
import ComicContainer from "../../components/ComicContainer/ComicContainer";

export default function HomePage() {
  return (
    <>
      <h1 className="greetings">Welcome, comic book lover!</h1>
      <ComicContainer />
    </>
  );
}
