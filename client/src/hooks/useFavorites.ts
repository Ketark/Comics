import { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";
import { userInfo } from "../types";
import { useLocation } from "react-router-dom";

function useFavorites(id: number): [boolean, (e: React.SyntheticEvent<HTMLButtonElement>) => void] {
  const { user, userList, setUserList } = useContext(Context);
  const [isFavorite, setFavorite] = useState(false);
  useEffect(() => {
    if(user) {
      const favorites = JSON.parse(userList).find(
        (el: userInfo) => el.login === user
      ).favorites;
      if (favorites.includes(`${id}`)) {
        setFavorite(true);
      }
    } else {
      setFavorite(false)
    }
  }, [user]);

  const getFavorites = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (user) {
      const userListParse = JSON.parse(userList);
      const loginUserInfo = userListParse.find(
        (el: userInfo) => el.login === user
      );
      if (loginUserInfo.favorites.includes(`${id}`)) {
        loginUserInfo.favorites = loginUserInfo.favorites.filter(
          (comicId: string) => comicId !== `${id}`
        );
      } else {
        loginUserInfo.favorites.push(`${id}`);
      }
      setFavorite(!isFavorite);
      localStorage.userList = JSON.stringify(userListParse);
      setUserList(JSON.stringify(userListParse));
    }
  };

  return [isFavorite, getFavorites];
}

export default useFavorites;