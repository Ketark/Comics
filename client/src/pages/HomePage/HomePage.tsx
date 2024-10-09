import React, { useEffect, useState } from "react";
import "./HomePage.css";
import ComicContainer from "../../components/ComicContainer/ComicContainer";
import { comicAPI } from "../../services/comicServices";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { ComicsInfo } from "../../types";
import FilterComicsComponent from "../../components/FilterComicsComponent/FilterComicsComponent";

export default function HomePage() {
  const [pages, setPages] = useState(1);
  const [comics, setComics] = useState<ComicsInfo>();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const { data } = comicAPI.useFetchAllComicsQuery("");

  useEffect(() => {
    if (data) {
      setPages(Math.ceil(data?.data.results.length / 4));
      setComics(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="greetings">Welcome, comic book lover!</h1>
      <FilterComicsComponent setComics={setComics} setPages={setPages} />
      <ComicContainer
        data={comics?.data.results.slice(currentPage * 4 - 4, currentPage * 4)}
      />
      <Pagination currentPage={currentPage} pages={pages} />
    </>
  );
}
