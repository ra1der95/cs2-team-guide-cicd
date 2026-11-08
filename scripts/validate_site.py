from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

root = Path(__file__).resolve().parents[1]
errors = []
class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'):
            if a['id'] in self.ids: errors.append('Duplicate id: ' + a['id'])
            self.ids.add(a['id'])
        if tag == 'img' and not a.get('alt'): errors.append('Missing image alt')
        for key in ('src', 'href'):
            if a.get(key): self.links.append(a[key])

for name in ('index.html', 'style.css', 'main.js'):
    if not (root / name).is_file(): errors.append('Missing file: ' + name)
html = (root / 'index.html').read_text(encoding='utf-8')
audit = Audit()
audit.feed(html)
for link in audit.links:
    u = urlsplit(link)
    if u.scheme or u.netloc: continue
    if u.path and not (root / unquote(u.path).lstrip('/')).is_file():
        errors.append('Missing resource: ' + u.path)
    if not u.path and u.fragment and unquote(u.fragment) not in audit.ids:
        errors.append('Missing anchor: ' + u.fragment)
if '</html>' not in html.lower(): errors.append('Missing closing html tag')
if errors:
    raise SystemExit(chr(10).join(errors))
print('Site check passed: HTML, anchors and local resources are valid.')
