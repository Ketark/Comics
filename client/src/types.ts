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
  textObjects : {text: string}[]
}

export interface ComicsInfo {
  data: {
    results: ComicInfo[];
  };
}
