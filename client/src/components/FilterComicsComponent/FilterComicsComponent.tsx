import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { comicAPI } from "../../services/comicServices";
import useDebounce from "../../hooks/useDebounce";
import { ComicsInfo } from "../../types";
import "./FilterComicsComponent.css";

export default function FilterComicsComponent({
  setComics,
  setPages,
}: {
  setComics: Dispatch<SetStateAction<ComicsInfo | undefined>>;
  setPages: Dispatch<SetStateAction<number>>;
}) {
  const date = new Date()
    .toLocaleDateString()
    .replace(/^(\d+)\.(\d+)\.(\d+)$/, `$3-$2-$1`);

  const [searchQuery, setSearchQuery] = useState({
    id: "",
    character: "",
    date1: "1939-10-01",
    date2: date,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [trigger, { data: characters }] =
    comicAPI.useLazyFetchCharactersByNameQuery();

  const [triggerFilter, { data: filterComics }] =
    comicAPI.useLazyFetchFilterComicsQuery();

  let debouncedSearchQuery = useDebounce(searchQuery.character, 2000);

  useEffect(() => {
    if (searchQuery.character.length > 2 && debouncedSearchQuery) {
      trigger(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, searchQuery, trigger, characters]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemClick = (name: string, id: string) => {
    setSearchQuery((prev) => ({ ...prev, id: id, character: name }));
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleButtonClick = () => {
    if (!searchQuery.id) {
      triggerFilter({ date1: searchQuery.date1, date2: searchQuery.date2 });
    } else {
      triggerFilter(searchQuery);
    }
    setSearchQuery({
      id: "",
      character: "",
      date1: "1950-01-01",
      date2: date,
    });
  };

  useEffect(() => {
    if (filterComics) {
      setPages(Math.ceil(filterComics?.data.results.length / 4));
      setComics(filterComics);
    }
  }, [filterComics]);

  return (
    <>
      <div className="filterComicsContainer">
        <div className="characterContainer">
          <input
            name="character"
            placeholder="Filter by character"
            className="searchInput"
            value={searchQuery.character}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          ></input>
          <ul className="dropdownListHome">
            {isOpen &&
              characters?.data.results
                .filter((character) => character.comics.available > 0)
                .map((character) => (
                  <li
                    className="dropdownItemHome"
                    key={character.id}
                    id={`${character.id}`}
                    onClick={() => {
                      handleItemClick(character.name, `${character.id}`);
                    }}
                  >
                    {character.name}
                  </li>
                ))}
          </ul>
        </div>
        <div className="description">Filter by date from</div>
        <input
          name="date1"
          value={searchQuery.date1}
          onChange={handleInputChange}
          className="searchInputDate"
          type="date"
        ></input>
        <div className="description">to</div>
        <input
          name="date2"
          value={searchQuery.date2}
          onChange={handleInputChange}
          className="searchInputDate"
          type="date"
        ></input>
      </div>
      <div className="buttonContainer">
        <button className="filterButton" onClick={handleButtonClick}>
          Filter
        </button>
      </div>
    </>
  );
}
