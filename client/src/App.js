import React from "react";
import Results from "./pages/Results";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  function handleQueryChange(event) {
    setQuery(event.target.value);
  }

  async function handleSearch(query) {
    const res = await fetch(
      "http://localhost:5050/tales?" +
        new URLSearchParams({
          q: query,
        })
    );
    const data = await res.json();
    setResults(data);
    console.log("Searched!", query, results);
  }

  return (
    <Routes>
      <Route
        index
        element={
          <Home
            query={query}
            onQueryChange={handleQueryChange}
            onSearch={handleSearch}
          />
        }
      />
      <Route
        path="/results"
        element={
          <Results
            query={query}
            onQueryChange={handleQueryChange}
            onSearch={handleSearch}
            results={results}
          />
        }
      />
    </Routes>
  );
}

export default App;
