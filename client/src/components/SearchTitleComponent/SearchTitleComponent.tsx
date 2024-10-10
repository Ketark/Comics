import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { comicAPI } from "../../services/comicServices";
import "./SearchTitleComponent.css";
import useDebounce from "../../hooks/useDebounce";

export default function SearchTitleComponent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [trigger, { data }] = comicAPI.useLazyFetchComicsByTitleQuery();

  let debouncedSearchQuery = useDebounce(searchQuery, 2000);

  useEffect(() => {
    if (searchQuery.length > 2 && debouncedSearchQuery) {
      trigger(debouncedSearchQuery);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearchQuery, searchQuery, trigger, data]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleItemClick = (id: number) => {
    setSearchQuery("");
    setIsOpen(false);
    navigate(`/comics/${id}`);
  };

  return (
    <div className="searchTitleContainer">
      <input
        className="searchTitleInput"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search by title"
      ></input>
      <ul className="dropdownList">
        {isOpen &&
          data?.data.results.map((comic) => (
            <li
              className="dropdownItem"
              key={comic.id}
              onClick={() => {
                handleItemClick(comic.id);
              }}
            >
              {comic.title}
            </li>
          ))}
      </ul>
    </div>
  );
}
