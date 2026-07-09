import { useEffect } from 'react';

const SITE = 'https://gorkemergune.github.io';
const DEFAULT_DESC = 'Görkem Ergüne — Computer Engineering student and AI product developer building computer-vision systems, machine-learning pipelines, and full-stack apps.';

const upsert = (attr, key, content) => {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
};

// Manages document head for the current page: title, description, Open Graph,
// Twitter Card, canonical link, and an optional JSON-LD block.
export function useSeo({ title, description, image, path, type = 'website', jsonLd } = {}) {
  const desc = description || DEFAULT_DESC;
  const ld = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    const full = title ? `${title} · Görkem Ergüne` : 'Görkem Ergüne — AI Product Developer';
    document.title = full;

    const hashPath = window.location.hash ? '/#' + window.location.hash.replace(/^#/, '') : '/';
    const url = SITE + (path ? '/#' + path : hashPath);
    const img = image ? (image.startsWith('http') ? image : SITE + image) : `${SITE}/og/default.png`;

    upsert('name', 'description', desc);
    upsert('property', 'og:site_name', 'Görkem Ergüne');
    upsert('property', 'og:title', full);
    upsert('property', 'og:description', desc);
    upsert('property', 'og:type', type);
    upsert('property', 'og:url', url);
    upsert('property', 'og:image', img);
    upsert('name', 'twitter:card', 'summary_large_image');
    upsert('name', 'twitter:title', full);
    upsert('name', 'twitter:description', desc);
    upsert('name', 'twitter:image', img);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = url;

    let script = document.getElementById('page-jsonld');
    if (ld) {
      if (!script) { script = document.createElement('script'); script.id = 'page-jsonld'; script.type = 'application/ld+json'; document.head.appendChild(script); }
      script.textContent = ld;
    } else if (script) {
      script.remove();
    }
  }, [title, desc, image, path, type, ld]);
}
