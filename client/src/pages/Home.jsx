import React from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";

function Home(props) {
  const navigate = useNavigate();

  function homeSearch(query) {
    props.onSearch(query);
    navigate("/results");
  }

  return (
    <div className="home">
      <h1 className="home--title">Grimm Search</h1>
      <SearchInput
        query={props.query}
        onQueryChange={props.onQueryChange}
        onSearch={(query) => homeSearch(query)}
      />
    </div>
  );
}

export default Home;
