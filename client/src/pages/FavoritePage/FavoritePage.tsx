import React, { useContext } from "react";
import ComicContainer from "../../components/ComicContainer/ComicContainer";
import { Context } from "../../context/context";
import { comicAPI } from "../../services/comicServices";
import { ComicInfo, userInfo } from "../../types";

export default function FavoritePage() {
  const { user, userList } = useContext(Context);
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
  
  return (
    <>
      <h1 className="greetings">Welcome, comic book lover!</h1>
      <ComicContainer data={userData} />
    </>
  );
}
