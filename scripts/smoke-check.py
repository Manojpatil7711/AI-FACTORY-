from html.parser import HTMLParser
from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
html = (root / "index.html").read_text(encoding="utf-8")
js = (root / "app.js").read_text(encoding="utf-8")

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.assets = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            if attrs["id"] in self.ids:
                raise AssertionError(f"Duplicate HTML id: {attrs['id']}")
            self.ids.add(attrs["id"])
        if tag == "script" and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.assets.append(attrs.get("href", ""))

page = PageParser()
page.feed(html)
required_ids = {
    "main", "search-input", "hero-search", "finder-form", "finder-goal",
    "finder-budget", "finder-feedback", "tool-grid", "results-count",
    "empty-state", "category-tabs", "sort-select", "reset-filters",
    "menu-toggle", "year",
}
missing = sorted(required_ids - page.ids)
if missing:
    raise AssertionError(f"Missing required UI IDs: {', '.join(missing)}")

for asset in page.assets:
    if asset.startswith(("http://", "https://", "//")):
        continue
    if not (root / asset).is_file():
        raise AssertionError(f"Missing local asset: {asset}")

records = re.findall(r'\{name:"([^"]+)",maker:"([^"]+)",category:"([^"]+)",.*?price:"([^"]+)",url:"([^"]+)"', js)
if len(records) != 30:
    raise AssertionError(f"Expected 30 directory entries, found {len(records)}")
names = [record[0] for record in records]
if len(names) != len(set(names)):
    raise AssertionError("Duplicate tool names found")
allowed_categories = {"Writing", "Design", "Video", "Research", "Coding", "Productivity", "Audio"}
bad_categories = sorted({record[2] for record in records} - allowed_categories)
if bad_categories:
    raise AssertionError(f"Invalid categories: {', '.join(bad_categories)}")
bad_urls = [name for name, _, _, _, url in records if not url.startswith("https://")]
if bad_urls:
    raise AssertionError(f"Tool links must use HTTPS: {', '.join(bad_urls)}")

print(f"Smoke checks passed: {len(records)} unique tools, required UI IDs, local assets, categories and HTTPS links.")
