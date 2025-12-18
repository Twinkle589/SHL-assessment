from recommender import recommend

query = "accounts finance knowledge test"

results = recommend(query)

for r in results:
    print(r)
