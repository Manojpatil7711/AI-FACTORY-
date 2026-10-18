from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
html = (root / "index.html").read_text(encoding="utf-8")
js = (root / "app.js").read_text(encoding="utf-8")

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
    raise AssertionError("Cross-promotion must link to the intended Toolora and Vidzora sites")
if "ai-factory-cross-promo-dismissed" not in js or "20000" not in js or "0.55" not in js:
    raise AssertionError("Cross-promotion must be delayed, dismissible and scroll-aware")
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
if len(sitemap_urls) != len(set(sitemap_urls)):
    raise AssertionError("Duplicate sitemap URLs found")
if any(not url.startswith("https://ai-factory-tools.pages.dev/") for url in sitemap_urls):
    raise AssertionError("Sitemap must use the stable canonical hostname, not a preview alias")

expected_sitemap_paths = {"", "privacy.html", "terms.html"}
if (root / "marketplace-india.html").is_file():
    expected_sitemap_paths.add("marketplace-india.html")
expected_sitemap_paths.update(path.name for path in root.glob("category-*.html"))
expected_sitemap_paths.update(path.name for path in root.glob("tool-*.html"))
if (root / "marketplace.html").is_file():
    expected_sitemap_paths.add("marketplace.html")
actual_sitemap_paths = {urlparse(url).path.lstrip("/") for url in sitemap_urls}
missing_sitemap_paths = sorted(expected_sitemap_paths - actual_sitemap_paths)
unknown_sitemap_paths = sorted(actual_sitemap_paths - expected_sitemap_paths)
if missing_sitemap_paths or unknown_sitemap_paths:
    raise AssertionError(
        f"Sitemap/page mismatch. Missing: {missing_sitemap_paths}; "
        f"unexpected: {unknown_sitemap_paths}"
    )
robots = (root / "robots.txt").read_text(encoding="utf-8")
if "Sitemap: https://ai-factory-tools.pages.dev/sitemap.xml" not in robots:
    raise AssertionError("robots.txt must point to the stable canonical sitemap")

category_pages = sorted(root.glob("category-*.html"))
if len(category_pages) != 7:
    raise AssertionError(f"Expected 7 category pages, found {len(category_pages)}")
sitemap_paths = {urlparse(url).path.lstrip("/") for url in sitemap_urls}
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


tool_pages = sorted(root.glob("tool-*.html"))
if len(tool_pages) != 10:
    raise AssertionError(f"Expected 10 priority tool guides, found {len(tool_pages)}")
for tool_page in tool_pages:
    content = tool_page.read_text(encoding="utf-8")
    parser = PageParser()
    parser.feed(content)
    if parser.h1_count != 1:
        raise AssertionError(f"{tool_page.name} must contain exactly one H1, found {parser.h1_count}")
    if parser.title_count != 1:
        raise AssertionError(f"{tool_page.name} must contain exactly one title")
    if not parser.canonical or not parser.canonical.endswith("/" + tool_page.name):
        raise AssertionError(f"{tool_page.name} must have its own canonical URL")
    if parser.json_ld_count < 1:
        raise AssertionError(f"{tool_page.name} must include structured data")
    if "faq-section" not in content:
        raise AssertionError(f"{tool_page.name} is missing its FAQ section")

marketplace_page = root / "marketplace-india.html"
if marketplace_page.is_file():
    marketplace_content = marketplace_page.read_text(encoding="utf-8")
    marketplace_parser = PageParser()
    marketplace_parser.feed(marketplace_content)
    if marketplace_parser.h1_count != 1:
        raise AssertionError("marketplace-india.html must contain exactly one H1")
    if marketplace_parser.title_count != 1:
        raise AssertionError("marketplace-india.html must contain exactly one title")
    if not marketplace_parser.canonical or not marketplace_parser.canonical.endswith("/marketplace-india.html"):
        raise AssertionError("marketplace-india.html must have its own canonical URL")
    required_marketplace_ids = {
        "market-search", "market-listings", "seller-preview-form",
        "seller-preview-result", "market-toast", "market-empty"
    }
    missing_marketplace_ids = sorted(required_marketplace_ids - set(marketplace_parser.ids))
    if missing_marketplace_ids:
        raise AssertionError(f"Marketplace page is missing required IDs: {missing_marketplace_ids}")
    if "NOT CONNECTED" not in marketplace_content or "illustrative" not in marketplace_content.lower():
        raise AssertionError("Marketplace must clearly disclose non-live payments and illustrative listings")
    marketplace_js = (root / "marketplace-india.js").read_text(encoding="utf-8")
    if "LOCAL PREVIEW ONLY" not in marketplace_js:
        raise AssertionError("Seller preview must disclose that it is local-only")
    if "fetch(" in marketplace_js or "XMLHttpRequest(" in marketplace_js:
        raise AssertionError("Marketplace preview must not submit data over the network")
    if "localStorage" in marketplace_js:
        raise AssertionError("Marketplace seller preview must not persist submitted data locally")

payment_test_page = root / "payment-test.html"
if payment_test_page.is_file():
    payment_test_content = payment_test_page.read_text(encoding="utf-8")
    payment_test_parser = PageParser()
    payment_test_parser.feed(payment_test_content)
    if 'name="robots" content="noindex, nofollow, noarchive"' not in payment_test_content:
        raise AssertionError("payment-test.html must remain noindex")
    if "Razorpay Test Mode" not in payment_test_content or "Live keys are rejected" not in payment_test_content:
        raise AssertionError("Payment test page must clearly state test-only restrictions")
    if "RAZORPAY_KEY_SECRET" in payment_test_content or "RAZORPAY_WEBHOOK_SECRET" in payment_test_content:
        raise AssertionError("Payment secrets must never appear in browser HTML")
    if "payment-test.html" in actual_sitemap_paths:
        raise AssertionError("Private payment test page must not be listed in the sitemap")
    for endpoint in (
        "functions/api/payments/status.js",
        "functions/api/payments/create-order.js",
        "functions/api/payments/verify.js",
        "functions/api/payments/webhook.js",
    ):
        if not (root / endpoint).is_file():
            raise AssertionError(f"Missing payment endpoint: {endpoint}")
    if not (root / "migrations/0001_razorpay_test.sql").is_file():
        raise AssertionError("Missing dedicated Razorpay test database migration")
    if not (root / "docs/razorpay-test-setup.md").is_file():
        raise AssertionError("Missing Razorpay test setup instructions")

print(
    f"Smoke checks passed: {len(records)} unique tools, required UI IDs, local assets, "
    f"7 category pages with canonical/structured data/FAQs, published-page inventory, "
    f"{len(sitemap_urls)} valid sitemap URLs and HTTPS official links."
)
