import { useState } from "react";

export default function Hero({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ keyword, location });
  };

  // minimal inline styles so you don't need a CSS file
  const wrap = { padding: "16px 0", background: "transparent" };
  const bar = {
    maxWidth: 880,
    margin: "0 auto",
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "0 12px",
  };
  const input = {
    flex: "1 1 auto",
    height: 44,
    padding: "0 12px",
    border: "1px solid #d7dbe0",
    borderRadius: 8,
    fontSize: 16,
    outline: "none",
  };
  const locationInput = { ...input, maxWidth: 260 };
  const btn = {
    height: 44,
    padding: "0 18px",
    border: 0,
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
    background: "#2f6fed",
    color: "#fff",
    whiteSpace: "nowrap",
  };

  return (
    <section style={wrap}>
      <form style={bar} onSubmit={submit} role="search" aria-label="Job search">
        <input
          type="text"
          style={input}
          placeholder="Begin Your Career"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Keyword"
        />
        <input
          type="text"
          style={locationInput}
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Location"
        />
        <button style={btn} type="submit">Search</button>
      </form>
    </section>
  );
}
