from flask import Flask, request, jsonify
from recommender import recommend

app = Flask(__name__)

@app.route("/recommend")
def get_recommendations():
    query = request.args.get("q", "")
    if not query:
        return jsonify({"error": "No query provided"}), 400
    
    recs = recommend(query)
    return jsonify(recs)

if __name__ == "__main__":
    app.run(debug=True)
