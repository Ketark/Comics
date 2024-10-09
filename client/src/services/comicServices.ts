import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CharactersInfo, ComicsInfo } from "../types";

export const comicAPI = createApi({
  reducerPath: "comicAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://gateway.marvel.com/v1/public/`,
  }),
  endpoints: (build) => ({
    fetchAllComics: build.query<ComicsInfo, string>({
      query: () => ({
        url: `/comics?apikey=${process.env.REACT_APP_APIKEY}&hash=${process.env.REACT_APP_HASH}&limit=20&title=SPIDER-MAN`,
      }),
    }),
    fetchOneComics: build.query<ComicsInfo, string | undefined>({
      query: (id) => ({
        url: `/comics/${id}?apikey=${process.env.REACT_APP_APIKEY}&hash=${process.env.REACT_APP_HASH}`,
      }),
    }),
    fetchComicsByTitle: build.query<ComicsInfo, string>({
      query: (title) => ({
        url: `/comics?apikey=${process.env.REACT_APP_APIKEY}&hash=${process.env.REACT_APP_HASH}&limit=10`,
        params: { titleStartsWith: title },
      }),
    }),
    fetchCharactersByName: build.query<CharactersInfo, string>({
      query: (name) => ({
        url: `/characters?apikey=${process.env.REACT_APP_APIKEY}&hash=${process.env.REACT_APP_HASH}&limit=20`,
        params: { nameStartsWith: name },
      }),
    }),
    fetchFilterComics: build.query<ComicsInfo, {id? : string, date1: string, date2: string}>({
      query: ({id, date1, date2}) => ({
        url: `/comics?apikey=${process.env.REACT_APP_APIKEY}&hash=${process.env.REACT_APP_HASH}&limit=20`,
          params: { characters: id, dateRange: `${date1},${date2}` },
      }),
    }),
  }),
});
