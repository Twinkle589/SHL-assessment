import pandas as pd

# Load the CSV with your assessment names and URLs
df = pd.read_csv("shl_catalog.csv", usecols=["assessment_name", "url"])

def recommend(query: str, top_k: int = 5):
    query = query.lower()
    keywords = query.split()  # split into words
    mask = df['assessment_name'].str.lower().apply(lambda name: any(k in name for k in keywords))
    results = df[mask].head(top_k)
    return results.to_dict(orient="records")
