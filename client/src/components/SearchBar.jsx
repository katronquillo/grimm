import React from "react";

function SearchBar(props) {
  const [query, setQuery] = React.useState("");

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }
  return (
    <div className="searchbar">
      <h2 className="searchbar--title">Grimm</h2>
      <div className="searchbar--input">
        <input
          className="searchbar--query"
          type="text"
          name="q"
          value={props.query}
          onChange={(event) => handleQueryChange(event)}
          placeholder="Search the Grimm Tales"
        />
        <button
          className="searchbar--submit"
          onClick={() => props.onSearch(query)}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
