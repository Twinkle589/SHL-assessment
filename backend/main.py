import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load your catalog CSV
df = pd.read_csv("shl_catalog.csv", usecols=["assessment_name", "url"])

app = Flask(__name__)
CORS(app)  # allows frontend (running on another port) to access

@app.route("/recommend")
def recommend_endpoint():
    query = request.args.get("q", "").lower()
    if not query:
        return jsonify({"error": "No query provided"}), 400

    # simple filter: check if query words appear in assessment_name
    results = df[df['assessment_name'].str.lower().str.contains(query)].head(10)
    return jsonify(results.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True, port=8000)  # ensure port 8000
