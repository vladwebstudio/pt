// Regenerates the static SEO/link-preview snapshots (case-1.html, case-2.html, case-3.html)
// from the live casesData in js/case-detail.js, by actually running case-detail.js in a
// headless DOM (jsdom) exactly like a real browser would, then saving the resulting HTML.
//
// Why this exists: search engines that don't execute JS (and link-preview bots like
// Telegram/Facebook, which never do) need real per-case <title>/description/content in the
// HTML itself. case-detail.html?id=N only fills that in via JS after load. Rather than
// hand-duplicating the case content into 3 static files (which would drift out of sync the
// next time someone edits casesData), this script generates them mechanically from the
// single source of truth — so it must be re-run after any edit to casesData, but the static
// files themselves should never be hand-edited.
//
// Usage:
//   npm install jsdom --no-save   (one-off, not a project dependency — see note below)
//   node scripts/build-case-pages.js
//
// jsdom is deliberately NOT added to a committed package.json / node_modules for this static
// GitHub Pages site — it's only a local build-time tool for whoever regenerates these pages.

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const DEPLOY = path.join(__dirname, '..');
const shellHtml = fs.readFileSync(path.join(DEPLOY, 'case-detail.html'), 'utf8');
const jsSrc = fs.readFileSync(path.join(DEPLOY, 'js', 'case-detail.js'), 'utf8');

async function renderCase(id) {
  const dom = new JSDOM(shellHtml, {
    url: `http://localhost:8080/case-detail.html?id=${id}`,
    runScripts: 'outside-only',
    resources: undefined,
    pretendToBeVisual: true,
  });
  const { window } = dom;

  // Stub browser bits jsdom doesn't implement / that would otherwise try real network calls.
  window.HTMLCanvasElement.prototype.getContext = () => ({
    clearRect(){}, beginPath(){}, arc(){}, fill(){}, closePath(){},
  });
  window.requestAnimationFrame = () => 0;
  window.navigator.clipboard = { writeText: () => Promise.resolve() };
  // Prevent GTM/Clarity's dynamically-injected <script src> tags from hitting the network.
  const origCreateElement = window.document.createElement.bind(window.document);
  window.document.createElement = function (tag) {
    const el = origCreateElement(tag);
    if (String(tag).toLowerCase() === 'script') {
      Object.defineProperty(el, 'src', { set() {}, get() { return ''; } });
    }
    return el;
  };

  dom.window.eval(jsSrc);
  await new Promise(r => setTimeout(r, 50));

  const html = '<!DOCTYPE html>\n' + window.document.documentElement.outerHTML;
  window.close();
  return html;
}

(async () => {
  for (const id of [1, 2, 3]) {
    const html = await renderCase(id);
    const banner =
`<!-- =====================================================================
     AUTO-GENERATED static snapshot (case id ${id}) for SEO/link-preview crawlers
     (Telegram/Facebook/etc. don't run JS, so they need real content+meta here).
     Regenerate with: node scripts/build-case-pages.js
     after editing casesData in js/case-detail.js — do not hand-edit this file,
     changes will be overwritten. case-detail.js still runs on load and re-renders
     the same content, so this is a no-JS/crawler fallback, not a second source
     of truth.
     ===================================================================== -->\n`;
    const out = html.replace('<!DOCTYPE html>\n', '<!DOCTYPE html>\n' + banner);
    fs.writeFileSync(path.join(DEPLOY, `case-${id}.html`), out);
    console.log(`wrote case-${id}.html (${out.length} bytes)`);
  }
})().catch(e => { console.error(e); process.exit(1); });
