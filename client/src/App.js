import React from "react";
import SearchBar from "./components/SearchBar";
import Result from "./components/Result";

function App() {
  const [results, setResults] = React.useState([]);

  async function handleSearch(query) {
    const res = await fetch(
      "http://localhost:5050/tales?" +
        new URLSearchParams({
          q: query,
        })
    );
    const data = await res.json();
    setResults(data);
    console.log("We made a request!", `query: ${query}`, data);
  }

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <div className="results">
        {results.map((result) => (
          <Result
            key={result._id}
            result={{ ...result }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
