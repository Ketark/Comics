import "./ComicContainer.css";
import { ComicInfo } from "../../types";
import ComicPrev from "../ComicPrev/ComicPrev";

export default function ComicContainer({
  data,
}: {
  data: ComicInfo[] | undefined;
}) {
  return (
    <article className="comicsContainer">
      {data?.map((comic) => (
        <ComicPrev key={comic.id} comic={comic} />
      ))}
    </article>
  );
}
