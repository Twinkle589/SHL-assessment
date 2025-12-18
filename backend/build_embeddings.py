import pandas as pd
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer

df = pd.read_csv("shl_assessments.csv")

model = SentenceTransformer("all-MiniLM-L6-v2")

texts = df["name"].tolist()
embeddings = model.encode(texts, show_progress_bar=True)

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(np.array(embeddings))

faiss.write_index(index, "shl.index")
df.to_pickle("shl.pkl")

print("Embeddings created and saved")
