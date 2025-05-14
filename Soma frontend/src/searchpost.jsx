import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPost = () => {
  const queryParam = useQuery().get("query") || "";
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  React.useEffect(() => {
    if (!queryParam) return;
    fetch("http://localhost:5001/posts/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ searchInput: queryParam }),
    })
      .then(res => res.json())
      .then(data => {
        setResults(data.results || []);
        setSearched(true);
      });
  }, [queryParam]);

  return (
    <div className="container" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Search Results for "{queryParam}"</h2>
      {searched ? (
        results.length > 0 ? (
          <ul>
            {results.map(post => (
              <li key={post._id || post.id}>
                <Link to={`/posts/${post._id || post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )
      ) : (
        <p>Searching...</p>
      )}
    </div>
  );
};

export default SearchPost;
