import React from "react";

function Result({ result }) {
  return (
    <div className="result">
      <div className="result--header">
        <a href={result.url}>
          <h3 className="result--title">{result.title}</h3>
        </a>
        <h3 className="result--score">
          {Math.round(result.contentScore * 100) / 100}
        </h3>
      </div>
      <p className="result--summary">{result.intro}</p>
    </div>
  );
}

export default Result;
