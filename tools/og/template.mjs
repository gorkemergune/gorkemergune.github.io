// Shared chrome for every OG card: background, grid, corner brackets, footer.
// Sampled from public/og/email-phishing-detection.png so new cards sit in the
// same family as the 26 that already exist.
export const T = {
  W: 1200, H: 630,
  bg: '#0b0b13', bgMid: '#0e0d18',
  accent: '#7c5cff', accentDim: '#6b4fdb', bracket: '#423287',
  title: '#eef0f6', body: '#9a9ab0', faint: '#2a2545',
  grid: '#12101f',
};

export const chrome = (t) => `
  <defs>
    <radialGradient id="glow" cx="80%" cy="50%" r="34%">
      <stop offset="0%" stop-color="#4a37a0" stop-opacity="0.72"/>
      <stop offset="50%" stop-color="#241c4c" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#0b0b13" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheen" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#0b0b13" stop-opacity="0"/>
      <stop offset="58%" stop-color="#221b42" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#0b0b13" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="${T.grid}" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${T.W}" height="${T.H}" fill="${T.bg}"/>
  <rect x="92" y="0" width="1014" height="${T.H}" fill="${T.bgMid}"/>
  <rect x="92" y="0" width="1014" height="${T.H}" fill="url(#grid)"/>
  <rect x="92" y="0" width="1014" height="${T.H}" fill="url(#sheen)"/>
  <rect x="92" y="0" width="1014" height="${T.H}" fill="url(#glow)"/>
  <line x1="92" y1="0" x2="92" y2="${T.H}" stroke="${T.faint}" stroke-width="1" opacity="0.6"/>
  <line x1="1106" y1="0" x2="1106" y2="${T.H}" stroke="${T.faint}" stroke-width="1" opacity="0.6"/>

  ${[[130,35,1,1],[1068,35,-1,1],[130,595,1,-1],[1068,595,-1,-1]]
    .map(([x,y,sx,sy]) => `<path d="M${x} ${y+sy*50} L${x} ${y} L${x+sx*50} ${y}" fill="none" stroke="${T.bracket}" stroke-width="2"/>`)
    .join('')}

  <rect x="170" y="89" width="11" height="11" fill="${T.accent}"/>
  <text x="197" y="101" font-family="JetBrains Mono" font-size="17" letter-spacing="4.5" fill="${T.accent}">${t.mark}</text>
  <text x="170" y="162" font-family="JetBrains Mono" font-size="16" letter-spacing="6.5" fill="${T.accentDim}">${t.codename}</text>
  <text x="168" y="258" font-family="Instrument Serif" font-size="${t.titleSize || 74}" fill="${T.title}">${t.title}</text>
  <text x="170" y="313" font-family="Instrument Sans" font-size="23" fill="${T.body}">${t.subtitle}</text>

  ${chips(t.chips)}

  <circle cx="176" cy="567" r="5" fill="${T.accent}"/>
  <text x="196" y="573" font-family="JetBrains Mono" font-size="14" letter-spacing="3.2" fill="#6e6a86">SYSTEM ONLINE</text>
  <text x="1046" y="573" font-family="JetBrains Mono" font-size="14" letter-spacing="3.2" fill="#1e1a33" text-anchor="end">STARK INDUSTRIES</text>
`;

const chips = (list) => {
  let x = 170; const y = 476, h = 36;
  return list.map((label) => {
    const w = label.length * 9.6 + 30;
    const el = `<g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#171331" stroke="${T.accent}" stroke-opacity="0.55" stroke-width="1"/>
      <text x="${x + w / 2}" y="${y + 24}" font-family="JetBrains Mono" font-size="15" fill="#c3b6ff" text-anchor="middle">${label}</text>
    </g>`;
    x += w + 14;
    return el;
  }).join('');
};

export const panel = (x, y, w, h, title) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="#0d0b1c" stroke="${T.bracket}" stroke-opacity="0.85" stroke-width="1.5"/>
  <rect x="${x}" y="${y}" width="${w}" height="34" rx="7" fill="#151130"/>
  <rect x="${x}" y="${y+24}" width="${w}" height="10" fill="#151130"/>
  ${[0,1,2].map(i=>`<circle cx="${x+20+i*16}" cy="${y+17}" r="4.5" fill="${i===0?'#7c5cff':'#332b5c'}"/>`).join('')}
  <text x="${x+w-18}" y="${y+22}" font-family="JetBrains Mono" font-size="12" letter-spacing="2" fill="#5b5480" text-anchor="end">${title}</text>
`;

export const bracketsAround = (cx, cy, r) => `
  <path d="M${cx-r-22} ${cy-46} a ${r+22} ${r+22} 0 0 0 0 92" fill="none" stroke="${T.accent}" stroke-opacity="0.5" stroke-width="2.5"/>
  <path d="M${cx+r+22} ${cy-46} a ${r+22} ${r+22} 0 0 1 0 92" fill="none" stroke="${T.accent}" stroke-opacity="0.5" stroke-width="2.5"/>
`;
