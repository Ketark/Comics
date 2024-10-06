import React, { useEffect, useState } from "react";
import "./HomePage.css";
import ComicContainer from "../../components/ComicContainer/ComicContainer";
import { comicAPI } from "../../services/comicServices";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

export default function HomePage() {
  const [pages, setPages] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const { data } = comicAPI.useFetchAllComicsQuery("");
  useEffect(() => {
    if (data) {
      setPages(Math.ceil(data?.data.results.length / 10));
    }
  }, [data]);

  return (
    <>
      <h1 className="greetings">Welcome, comic book lover!</h1>
      <ComicContainer
        data={data?.data.results.slice(currentPage * 10 - 10, currentPage * 10)}
      />
      <Pagination currentPage={currentPage} pages={pages} />
    </>
  );
}
