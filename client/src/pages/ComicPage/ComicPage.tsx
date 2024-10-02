import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { comicAPI } from "../../services/comicServices";
import "./ComicPage.css";

export default function ComicPage() {
  const { id } = useParams();
  const { data } = comicAPI.useFetchOneComicsQuery(id);
  const comic = data?.data.results[0];
  const navigate = useNavigate();

  return (
    <article className="comicContainer">
      <article className="oneComic" key={comic?.id}>
        <div className="oneTitleContainer">
          <div className="oneTitle">{comic?.title}</div>
        </div>
        <img
          className="onePoster"
          src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
          alt="cover"
        />
        <div className="info">
          <div>Количество страниц: {comic?.pageCount || "не указано"}</div>
          <div>
            Персонажи:{" "}
            {comic?.characters.items.length !== 0
              ? comic?.characters.items.map((character, index, arr) =>
                  index === arr.length - 1
                    ? `${character.name}.`
                    : `${character.name}, `
                )
              : "не указаны"}
          </div>
          <div>
            Создатели:{" "}
            {comic?.creators.items.length !== 0
              ? comic?.creators.items.map((creator, index, arr) =>
                  index === arr.length - 1
                    ? `${creator.name}(${creator.role}).`
                    : `${creator.name}(${creator.role}), `
                )
              : "не указаны"}
          </div>
          <div>
            Описание:{" "}
            {comic?.textObjects[0]?.text.replace(/<br>/gi, "") || "не указано"}
          </div>
        </div>
        <div className="back" onClick={() => navigate(-1)}>Вернуться</div>
      </article>
    </article>
  );
}
