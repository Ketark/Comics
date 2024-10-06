import React, { useContext } from "react";
import { ComicInfo } from "../../types";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/context";
import "./ComicPrev.css";

export default function ComicPrev({ comic }: { comic: ComicInfo }) {
  const navigate = useNavigate();
  const { user, setActive } = useContext(Context);

  return (
    <article
      className="comic"
      id={`${comic.id}`}
      onClick={() => {
        user ? navigate(`/comics/${comic.id}`) : setActive(true);
      }}
    >
      <div className="titleContainer">
        <div className="title">{comic.title}</div>
      </div>
      <img
        className="poster"
        src={
          comic.thumbnail.path !==
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
            ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
            : process.env.PUBLIC_URL + "/NotFound.jpg"
        }
        alt="cover"
      />
    </article>
  );
}
