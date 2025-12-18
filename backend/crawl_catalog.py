import csv
import time
from playwright.sync_api import sync_playwright

# Read URLs
with open("assessment_urls.txt", "r", encoding="utf-8") as f:
    urls = [line.strip() for line in f if line.strip()]

rows = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    for i, url in enumerate(urls, start=1):
        print(f"[{i}/{len(urls)}] Crawling:", url)
        try:
            page.goto(url, timeout=60000)
            page.wait_for_timeout(2000)

            name = page.locator("h1").first.text_content()
            body_text = page.locator("body").text_content().lower()

            if "personality" in body_text:
                test_type = "P"
            elif "cognitive" in body_text:
                test_type = "C"
            else:
                test_type = "K"

            rows.append({
                "assessment_name": name.strip() if name else "",
                "url": url,
                "test_type": test_type
            })

        except Exception as e:
            print("Error:", e)

        time.sleep(1)

    browser.close()

# Save CSV
if not rows:
    print("❌ No data collected")
else:
    with open("shl_catalog.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    print("✅ CSV saved with", len(rows), "rows")
