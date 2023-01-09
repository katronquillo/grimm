import React from "react";
import SearchBar from "../components/SearchBar";
import Result from "../components/Result";

function Results(props) {
  return (
    <div className="results">
      <SearchBar
        query={props.query}
        onQueryChange={props.onQueryChange}
        onSearch={props.onSearch}
      />
      <div className="results--list">
        {props.results.map((result) => (
          <Result
            key={result._id}
            result={{ ...result }}
          />
        ))}
      </div>
    </div>
  );
}

export default Results;
