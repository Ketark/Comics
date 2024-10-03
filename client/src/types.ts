import { Dispatch, SetStateAction } from "react";

export interface ComicPosterPath {
  path: string;
  extension: string;
}

export interface ComicInfo {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  thumbnail: ComicPosterPath;
  characters: {
    items: { name: string }[];
  };
  creators: {
    items: { name: string; role: string }[];
  };
  textObjects: { text: string }[];
}

export interface ComicsInfo {
  data: {
    results: ComicInfo[];
  };
}

export interface ContextValue  {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

export interface ProtectedRoutePropsType {
  user: string | null;
  setActive: Dispatch<SetStateAction<boolean>>;
}