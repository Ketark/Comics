import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { comicAPI } from "../../services/comicServices";
import "./ComicPage.css";
import useFavorites from "../../hooks/useFavorites";

export default function ComicPage() {
  const { id } = useParams();
  const { data } = comicAPI.useFetchOneComicsQuery(id);
  const comic = data?.data.results[0];
  const navigate = useNavigate();
  const [isFavorite, getFavorites] = useFavorites(Number(id));

  return (
    <article className="comicContainer">
      <article className="oneComic" key={comic?.id}>
        <div className="oneTitleContainer">
          <div className="oneTitle">{comic?.title}</div>
        </div>
        <img
          className="onePoster"
          src={
            comic?.thumbnail.path !==
            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
              ? `${comic?.thumbnail.path}.${comic?.thumbnail.extension}`
              : process.env.PUBLIC_URL + "/NotFound.jpg"
          }
          alt="cover"
        />
        <button className="favoriteButton" onClick={getFavorites}>
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
        <div className="info">
          <div>Number of pages: {comic?.pageCount || "не указано"}</div>
          <div>
            Characters:{" "}
            {comic?.characters.items.length !== 0
              ? comic?.characters.items.map((character, index, arr) =>
                  index === arr.length - 1
                    ? `${character.name}.`
                    : `${character.name}, `
                )
              : "не указаны"}
          </div>
          <div>
            Creators:{" "}
            {comic?.creators.items.length !== 0
              ? comic?.creators.items.map((creator, index, arr) =>
                  index === arr.length - 1
                    ? `${creator.name}(${creator.role}).`
                    : `${creator.name}(${creator.role}), `
                )
              : "не указаны"}
          </div>
          <div>
            Description:{" "}
            {comic?.textObjects[0]?.text.replace(/<br>/gi, "") || "не указано"}
          </div>
        </div>
        <button className="backButton" onClick={() => navigate(-1)}>
          Back
        </button>
      </article>
    </article>
  );
}
