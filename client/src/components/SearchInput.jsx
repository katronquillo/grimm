import React from "react";

function SearchInput(props) {
  return (
    <div className="searchbar--input">
      <input
        className="searchbar--query"
        type="text"
        name="q"
        value={props.query}
        onChange={(event) => props.onQueryChange(event)}
        placeholder="Search the Grimm Tales"
      />
      <button
        className="searchbar--submit"
        onClick={() => props.onSearch(props.query)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchInput;
