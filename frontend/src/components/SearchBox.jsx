import { useState } from "react";
import { fetchRecommendations } from "../recommend";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchRecommendations(query);
      if (!Array.isArray(data)) throw new Error("Backend did not return an array");
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommendations");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "P": return "#48bb78"; // green
      case "C": return "#4299e1"; // blue
      case "K": return "#ed8936"; // orange
      default: return "#a0aec0"; // gray
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "50px 20px",
      maxWidth: "800px",
      margin: "0 auto",
    }}>
      <h1 style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: "30px", color: "#2d3748" }}>
        SHL Assessment Recommender
      </h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Enter job description or query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "14px 20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            fontSize: "16px",
            outline: "none",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "14px 25px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#3182ce",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3182ce")}
        >
          Search
        </button>
      </div>

      {loading && <p style={{ textAlign: "center", color: "#3182ce", fontSize: "1.1rem" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red", fontSize: "1rem" }}>{error}</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}>
        {results.length > 0 ? results.map((r, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#2d3748" }}>{r.assessment_name}</h3>

            {r.test_type && (
              <span style={{
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "12px",
                backgroundColor: getBadgeColor(r.test_type),
                color: "#fff",
                fontSize: "0.85rem",
                marginBottom: "10px",
              }}>
                {r.test_type === "P" ? "Personality" : r.test_type === "C" ? "Cognitive" : "Knowledge"}
              </span>
            )}

            <div>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  padding: "8px 15px",
                  borderRadius: "12px",
                  backgroundColor: "#3182ce",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#2b6cb0")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#3182ce")}
              >
                View Assessment
              </a>
            </div>
          </div>
        )) : !loading && <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#718096" }}>No results found.</p>}
      </div>
    </div>
  );
}
