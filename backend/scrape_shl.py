from playwright.sync_api import sync_playwright
import pandas as pd
import time

BASE_URL = "https://www.shl.com"
CATALOG_URL = "https://www.shl.com/solutions/products/product-catalog/"

results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # keep false so you SEE it
    page = browser.new_page()

    page.goto(CATALOG_URL, timeout=60000)
    time.sleep(10)  # let JS fully load

    anchors = page.query_selector_all("a")

    for a in anchors:
        href = a.get_attribute("href")
        text = a.inner_text().strip()

        if not href or not text:
            continue

        if "/solutions/products/" in href:
            if "Pre-packaged" in text:
                continue

            results.append({
                "name": text,
                "url": BASE_URL + href
            })

    browser.close()

df = pd.DataFrame(results).drop_duplicates()

df.to_csv("shl_assessments.csv", index=False)

print("Total assessments saved:", len(df))
