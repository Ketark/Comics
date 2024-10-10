import React, { useContext, useEffect, useState } from "react";
import ComicContainer from "../../components/ComicContainer/ComicContainer";
import { Context } from "../../context/context";
import { comicAPI } from "../../services/comicServices";
import { ComicInfo, userInfo } from "../../types";
import Pagination from "../../components/Pagination/Pagination";
import { useSearchParams } from "react-router-dom";

export default function FavoritePage() {
  const { user, userList } = useContext(Context);
  const [pages, setPages] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const favorites = JSON.parse(userList).find(
    (el: userInfo) => el.login === user
  ).favorites;
  const userData: ComicInfo[] = [];
  for (let i = 0; i < favorites.length; i++) {
    const { data } = comicAPI.useFetchOneComicsQuery(favorites[i]);
    if (data) {
      userData.push(data.data.results[0]);
    }
  }

  useEffect(() => {
    setPages(Math.ceil(favorites.length / 4));
  }, [favorites]);

  return (
    <>
      <h1 className="greetings">Welcome, comic book lover!</h1>
      <ComicContainer
        data={userData.slice(currentPage * 4 - 4, currentPage * 4)}
      />
      <Pagination currentPage={currentPage} pages={pages} />
    </>
  );
}
