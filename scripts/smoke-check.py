from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
html = (root / "index.html").read_text(encoding="utf-8")
js = (root / "app.js").read_text(encoding="utf-8")
deploy_workflow = (root / ".github/workflows/deploy.yml").read_text(encoding="utf-8")

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.assets = []
        self.h1_count = 0
        self.title_count = 0
        self.canonical = None
        self.json_ld_count = 0
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            if attrs["id"] in self.ids:
                raise AssertionError(f"Duplicate HTML id: {attrs['id']}")
            self.ids.add(attrs["id"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.title_count += 1
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.json_ld_count += 1
        if tag == "script" and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in {"stylesheet", "icon"}:
            self.assets.append(attrs.get("href", ""))

page = PageParser()
page.feed(html)
for legal_page in ("privacy.html", "terms.html"):
    if not (root / legal_page).is_file():
        raise AssertionError(f"Missing required legal page: {legal_page}")
required_ids = {
    "main", "search-input", "hero-search", "finder-form", "finder-goal",
    "finder-budget", "finder-feedback", "tool-grid", "results-count",
    "empty-state", "show-more-tools", "category-tabs", "sort-select", "reset-filters",
    "menu-toggle", "year",
    "compare-one", "compare-two", "compare-three", "compare-results",
    "prompt-form", "prompt-task", "prompt-audience", "prompt-tone",
    "prompt-details", "prompt-output", "prompt-copy", "prompt-download",
    "prompt-feedback", "cross-promo", "cross-promo-close",
}
missing = sorted(required_ids - page.ids)
if missing:
    raise AssertionError(f"Missing required UI IDs: {', '.join(missing)}")

for asset in page.assets:
    if asset.startswith(("http://", "https://", "//")):
        continue
    if not (root / asset).is_file():
        raise AssertionError(f"Missing local asset: {asset}")

if "https://gettoolora.in/" not in html or "https://vidzora-pi.vercel.app/" not in html:
    raise AssertionError("Cross-promotion must link to the official Toolora and Vidzora sites")
if "ai-factory-cross-promo-dismissed" not in js or "20000" not in js or "0.55" not in js:
    raise AssertionError("Cross-promotion must be delayed, dismissible, and scroll-aware")
if "prefers-reduced-motion:reduce" not in (root / "styles.css").read_text(encoding="utf-8"):
    raise AssertionError("Cross-promotion must respect reduced-motion preferences")

sitemap_path = root / "sitemap.xml"
if not sitemap_path.is_file():
    raise AssertionError("Missing sitemap.xml")
try:
    sitemap_root = ET.parse(sitemap_path).getroot()
except ET.ParseError as exc:
    raise AssertionError(f"sitemap.xml is not valid XML: {exc}") from exc
ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
sitemap_urls = [node.text for node in sitemap_root.findall("sm:url/sm:loc", ns)]
if len(sitemap_urls) != 20:
    raise AssertionError(f"Expected 20 sitemap URLs, found {len(sitemap_urls)}")
if len(sitemap_urls) != len(set(sitemap_urls)):
    raise AssertionError("Duplicate sitemap URLs found")
if any(not url.startswith("https://ai-factory-tools.pages.dev/") for url in sitemap_urls):
    raise AssertionError("Sitemap must use the stable canonical hostname, not a preview alias")
robots = (root / "robots.txt").read_text(encoding="utf-8")
if "Sitemap: https://ai-factory-tools.pages.dev/sitemap.xml" not in robots:
    raise AssertionError("robots.txt must point to the stable canonical sitemap")

category_pages = sorted(root.glob("category-*.html"))
if len(category_pages) != 7:
    raise AssertionError(f"Expected 7 category pages, found {len(category_pages)}")
if "cp category-*.html tool-*.html dist/" not in deploy_workflow:
    raise AssertionError("Production deployment workflow must copy all category pages into dist/")
sitemap_paths = {urlparse(url).path.lstrip("/") for url in sitemap_urls}
tool_pages = sorted(root.glob("tool-*.html"))
if len(tool_pages) != 10:
    raise AssertionError(f"Expected 10 individual tool guides, found {len(tool_pages)}")
for tool_page in tool_pages:
    source = tool_page.read_text(encoding="utf-8")
    parser = PageParser()
    parser.feed(source)
    if parser.h1_count != 1 or parser.title_count != 1:
        raise AssertionError(f"{tool_page.name} must contain exactly one H1 and one title")
    if not parser.canonical or not parser.canonical.endswith("/" + tool_page.name):
        raise AssertionError(f"{tool_page.name} must have its own canonical URL")
    if parser.json_ld_count < 2:
        raise AssertionError(f"{tool_page.name} must include WebPage and FAQ structured data")
    if "getting-started" not in source or "faq-list" not in source:
        raise AssertionError(f"{tool_page.name} is missing practical guide content")
    if tool_page.name not in sitemap_paths:
        raise AssertionError(f"{tool_page.name} missing from sitemap")

for category_page in category_pages:
    filename = category_page.name
    if filename not in sitemap_paths:
        raise AssertionError(f"Category page missing from sitemap: {filename}")
    parser = PageParser()
    parser.feed(category_page.read_text(encoding="utf-8"))
    if parser.h1_count != 1:
        raise AssertionError(f"{filename} must contain exactly one H1, found {parser.h1_count}")
    if parser.title_count != 1:
        raise AssertionError(f"{filename} must contain exactly one title")
    if not parser.canonical or not parser.canonical.endswith("/" + filename):
        raise AssertionError(f"{filename} must have its own canonical URL")
    if parser.json_ld_count < 1:
        raise AssertionError(f"{filename} must include structured data")
    if "faq-section" not in category_page.read_text(encoding="utf-8"):
        raise AssertionError(f"{filename} is missing its FAQ section")

records = re.findall(r'\{name:"([^"]+)",maker:"([^"]+)",category:"([^"]+)",.*?price:"([^"]+)",url:"([^"]+)"', js)
if len(records) != 50:
    raise AssertionError(f"Expected 50 directory entries, found {len(records)}")
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

print(
    f"Smoke checks passed: {len(records)} unique tools, required UI IDs, local assets, "
    f"7 category pages with canonical/structured data/FAQs, deploy inclusion, "
    f"{len(tool_pages)} individual tool guides, {len(sitemap_urls)} valid sitemap URLs and HTTPS official links."
)
