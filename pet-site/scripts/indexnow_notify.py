#!/usr/bin/env python3
"""Restrict pet IndexNow notifications to explicitly approved, live indexable pages."""
from html.parser import HTMLParser
import os
from pathlib import Path
import re
import subprocess
import urllib.error
import urllib.request
from urllib.parse import urlsplit

ORIGIN = "https://pet.japanmedai.com"
KEY = "02665677707787c9ab712f090a86e364"
KEY_URL = f"{ORIGIN}/{KEY}.txt"
ALLOWLIST = Path("pet-site/indexnow-approved-urls.txt")
MAX_BATCH = 300  # Founder 2026-11-13: one-time backfill of all approved sitemap URLs

class MetaRules(HTMLParser):
    def __init__(self):
        super().__init__()
        self.noindex = False
        self.canonical = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("name", "").lower() in ("robots", "bingbot"):
            self.noindex |= "noindex" in attrs.get("content", "").lower()
        if tag == "link" and "canonical" in attrs.get("rel", "").lower().split():
            self.canonical = attrs.get("href")

def url_allowed(url):
    parsed = urlsplit(url)
    return (parsed.scheme == "https" and parsed.netloc == "pet.japanmedai.com"
            and not parsed.query and not parsed.fragment and url == ORIGIN + (parsed.path or "/"))

def fetch(url, tries=10, wait=20):
    """The workflow starts on push, before Vercel finishes deploying: retry 404/5xx for up to ~3 minutes."""
    import time
    for i in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": "RiChongTong-IndexNow/1.0"})
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                return resp.status, resp.geturl(), resp.headers, resp.read()
        except urllib.error.HTTPError as e:
            if e.code not in (404, 500, 502, 503, 504) or i == tries - 1:
                raise
            time.sleep(wait)

def main():
    approved = {line.strip() for line in ALLOWLIST.read_text(encoding="utf-8").splitlines()
                if line.strip() and not line.lstrip().startswith("#")}
    if any(not url_allowed(url) for url in approved):
        raise SystemExit("HOLD: invalid URL in approval manifest")
    if os.getenv("EVENT_NAME") == "push":
        before = os.getenv("BEFORE_SHA", "")
        if not re.fullmatch(r"[a-f0-9]{40}", before or "") or before == "0"*40:
            raise SystemExit("HOLD: cannot inspect manifest changes")
        previous = subprocess.check_output(
            ["git", "show", before + ":pet-site/indexnow-approved-urls.txt"], stderr=subprocess.DEVNULL
        ).decode("utf-8") if subprocess.run(
            ["git", "cat-file", "-e", before + ":pet-site/indexnow-approved-urls.txt"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
        ).returncode == 0 else ""
        earlier = {x.strip() for x in previous.splitlines() if x.strip() and not x.lstrip().startswith("#")}
        urls = sorted(approved - earlier)
    else:
        urls = [os.environ.get("REQUESTED_URL", "").strip()]
    if not urls:
        print("No newly approved URL. No request sent.")
        return
    if len(urls) > MAX_BATCH or any(url not in approved for url in urls):
        raise SystemExit(f"HOLD: unapproved URL or >{MAX_BATCH} URLs")
    status, resolved, headers, data = fetch(KEY_URL)
    if status != 200 or resolved != KEY_URL or data.decode("utf-8").strip() != KEY:
        raise SystemExit("HOLD: public domain key check failed")
    safe = []
    for url in urls:
        status, resolved, headers, data = fetch(url)
        if status != 200 or resolved != url:
            raise SystemExit(f"HOLD: live page invalid: {url}")
        if "text/html" not in headers.get("Content-Type", "").lower():
            raise SystemExit(f"HOLD: not HTML: {url}")
        if "noindex" in headers.get("X-Robots-Tag", "").lower():
            raise SystemExit(f"HOLD: X-Robots-Tag noindex: {url}")
        head = MetaRules()
        head.feed(data.decode("utf-8", errors="replace"))
        if head.noindex or (head.canonical and head.canonical != url):
            raise SystemExit(f"HOLD: HTML noindex/canonical mismatch: {url}")
        safe.append(url)
    import json
    body = json.dumps({"host": "pet.japanmedai.com", "key": KEY, "keyLocation": KEY_URL, "urlList": safe}).encode("utf-8")
    req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, method="POST",
                                 headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "RiChongTong-IndexNow/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            code = r.status
    except urllib.error.HTTPError as e:
        code = e.code
    print(f"IndexNow batch: {len(safe)} URLs => HTTP {code}")
    if code not in (200, 202):
        raise SystemExit(f"IndexNow did not accept: HTTP {code}")

if __name__ == "__main__":
    main()
