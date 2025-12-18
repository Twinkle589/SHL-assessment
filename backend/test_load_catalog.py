import pandas as pd

# Load the CSV
df = pd.read_csv("shl_catalog.csv")

print("Total assessments loaded:", len(df))
print("\nSample rows:")
print(df.head())
