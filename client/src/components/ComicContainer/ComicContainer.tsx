import React from "react";
import { comicAPI } from "../../services/comicServices";
import { useNavigate } from "react-router-dom";
import "./ComicContainer.css"

export default function ComicContainer() {
  const { data } = comicAPI.useFetchAllComicsQuery('');
  const navigate = useNavigate();

  return (
    <article className="comicsContainer">
      {data?.data.results.map((comic) => (
        <article
          className="comic"
          key={comic.id}
          onClick={() => navigate(`/comics/${comic.id}`)}
        >
          <div className="titleContainer">
            <div className="title">{comic.title}</div>
          </div>
          <img
            className="poster"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt="cover"
          />
        </article>
      ))}
    </article>
  );
}
