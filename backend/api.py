from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

# Load the CSV with your assessment names and URLs
df = pd.read_csv("shl_catalog.csv", usecols=["assessment_name", "url"])

def recommend(query: str, top_k: int = 5):
    query = query.lower()
    keywords = query.split()  # split query into words
    # Check if any keyword is in assessment name
    mask = df['assessment_name'].str.lower().apply(lambda name: any(k in name for k in keywords))
    results = df[mask].head(top_k)
    return results.to_dict(orient="records")

# Initialize FastAPI app
app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/recommend")
def get_recommendations(
    q: str = Query(..., description="Search query"),
    top_k: int = Query(5, description="Number of recommendations to return")
):
    results = recommend(q, top_k)
    if not results:
        return {"query": q, "results": [], "message": "No results found"}
    return {"query": q, "results": results}
