import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ComicsInfo } from "../types";

export const comicAPI = createApi({
  reducerPath: "comicAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://gateway.marvel.com/v1/public/`,
  }),
  endpoints: (build) => ({
    fetchAllComics: build.query<ComicsInfo, string>({
      query: () => ({
        url: `/comics?apikey=${process.env.REACT_APP_APIKEY}&hash=${process.env.REACT_APP_HASH}&limit=10`,
      }),
    }),
    fetchOneComics: build.query<ComicsInfo, string | undefined>({
      query: (id) => ({
        url: `/comics/${id}?apikey=${process.env.REACT_APP_APIKEY}&hash=${process.env.REACT_APP_HASH}`,
      }),
    }),
  }),
});

// http://gateway.marvel.com/v1/public/comics?limit=10&title=SPIDER-MAN&orderBy=title&apikey=2720138929bdebb6aa8be19dd6f5bfd9&hash=e661f4b3be6486e698ed0d410598dd3bafa14b68
