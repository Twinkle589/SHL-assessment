import { useState } from "react";

export default function QueryInput({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (!query) return alert("Please enter a query!");
    onSubmit(query);
  };

  return (
    <div className="p-5">
      <textarea
        className="w-full border rounded p-2"
        rows={4}
        placeholder="Enter job description or query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Get Recommendations
      </button>
    </div>
  );
}
