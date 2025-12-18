export async function fetchRecommendations(query) {
  const res = await fetch(`http://127.0.0.1:8000/recommend?q=${encodeURIComponent(query)}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch recommendations");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : []; // ensure it's always an array
}
