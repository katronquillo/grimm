import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

function SearchBar(props) {
  return (
    <div className="searchbar">
      <Link to="/">
        <h2 className="searchbar--title">Grimm</h2>
      </Link>
      <SearchInput
        query={props.query}
        onQueryChange={props.onQueryChange}
        onSearch={props.onSearch}
      />
    </div>
  );
}

export default SearchBar;
