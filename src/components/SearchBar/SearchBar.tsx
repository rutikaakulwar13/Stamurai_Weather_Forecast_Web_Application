import React, { useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      {/* <input
        type="text"
        placeholder="Search cities..."
        value={query}
        onChange={handleChange}
      /> */}
    </div>
  );
};

export default SearchBar;
