// Central technology-logo map. Every logo in the UI comes from here; no
// component hardcodes a /tech/ path.
//
// Files live in public/tech/. Sources: Devicon (MIT, colour originals) and
// Simple Icons (CC0, recoloured for the dark background); AlgoLeague's mark is
// cropped from its own site's logo-white.svg, NeetCode's is its 48px favicon.
// Never crop a logo out of the decorative tech-stack wallpaper.
//
// `match` is tested against a project's own data — `language`, every `stack`
// item and every tag — so a logo only appears when the project lists it.

export const TECH = {
  python:      { label: 'Python',       src: '/tech/python.svg',      match: /^python\b/i },
  c:           { label: 'C',            src: '/tech/c.svg',           match: /^c( \(c99\))?$/i },
  cplusplus:   { label: 'C++',          src: '/tech/cplusplus.svg',   match: /^c\+\+/i },
  typescript:  { label: 'TypeScript',   src: '/tech/typescript.svg',  match: /^typescript\b/i },
  javascript:  { label: 'JavaScript',   src: '/tech/javascript.svg',  match: /^javascript\b/i },
  rust:        { label: 'Rust',         src: '/tech/rust.svg',        match: /^rust$/i },
  astro:       { label: 'Astro',        src: '/tech/astro.svg',       match: /^astro$/i },
  pytorch:     { label: 'PyTorch',      src: '/tech/pytorch.svg',     match: /^pytorch\b/i },
  tensorflow:  { label: 'TensorFlow',   src: '/tech/tensorflow.svg',  match: /^tensorflow\b/i },
  opencv:      { label: 'OpenCV',       src: '/tech/opencv.svg',      match: /^opencv\b/i },
  mediapipe:   { label: 'MediaPipe',    src: '/tech/mediapipe.svg',   match: /^mediapipe\b/i },
  huggingface: { label: 'Hugging Face', src: '/tech/huggingface.svg', match: /^(hugging ?face|transformers$|sentence-?transformers$)/i },
  numpy:       { label: 'NumPy',        src: '/tech/numpy.svg',       match: /^numpy\b/i },
  pandas:      { label: 'pandas',       src: '/tech/pandas.svg',      match: /^pandas\b/i },
  scikitlearn: { label: 'scikit-learn', src: '/tech/scikitlearn.svg', match: /^scikit-learn\b/i },
  scipy:       { label: 'SciPy',        src: '/tech/scipy.svg',       match: /^scipy\b/i },
  matplotlib:  { label: 'Matplotlib',   src: '/tech/matplotlib.svg',  match: /^matplotlib\b/i },
  plotly:      { label: 'Plotly',       src: '/tech/plotly.svg',      match: /^plotly\b/i },
  jupyter:     { label: 'Jupyter',      src: '/tech/jupyter.svg',     match: /^jupyter\b/i },
  colab:       { label: 'Google Colab', src: '/tech/googlecolab.svg', match: /^google colab\b/i },
  streamlit:   { label: 'Streamlit',    src: '/tech/streamlit.svg',   match: /^streamlit\b/i },
  ollama:      { label: 'Ollama',       src: '/tech/ollama.svg',      match: /^ollama\b/i },
  claude:      { label: 'Claude',       src: '/tech/claude.svg',      match: /^(anthropic claude|claude desktop)\b/i },
  fastapi:     { label: 'FastAPI',      src: '/tech/fastapi.svg',     match: /^fastapi\b/i },
  nextjs:      { label: 'Next.js',      src: '/tech/nextjs.svg',      match: /^next\.js\b/i },
  react:       { label: 'React',        src: '/tech/react.svg',       match: /^react( \d+)?$/i },
  tailwind:    { label: 'Tailwind CSS', src: '/tech/tailwindcss.svg', match: /^tailwind/i },
  vite:        { label: 'Vite',         src: '/tech/vite.svg',        match: /^vite$/i },
  tauri:       { label: 'Tauri',        src: '/tech/tauri.svg',       match: /^tauri\b/i },
  postgresql:  { label: 'PostgreSQL',   src: '/tech/postgresql.svg',  match: /^postgresql\b/i },
  sqlite:      { label: 'SQLite',       src: '/tech/sqlite.svg',      match: /^sqlite\b/i },
  docker:      { label: 'Docker',       src: '/tech/docker.svg',      match: /^docker\b/i },
  pytest:      { label: 'pytest',       src: '/tech/pytest.svg',      match: /^pytest\b/i },
  raylib:      { label: 'raylib',       src: '/tech/raylib.svg',      match: /^raylib\b/i },
  html:        { label: 'HTML',         src: '/tech/html5.svg',       match: /^html$/i },
  css:         { label: 'CSS',          src: '/tech/css3.svg',        match: /^css$/i },
  git:         { label: 'Git',          src: '/tech/git.svg',         match: /^git$/i },
  github:      { label: 'GitHub',       src: '/tech/github.svg',      match: /^github$/i },
};

// Algorithm platforms, used by AlgorithmJourney. `competitive` has no single
// brand, so it has no logo.
export const PLATFORM_LOGOS = {
  leetcode:   { label: 'LeetCode',   src: '/tech/leetcode.svg' },
  algoleague: { label: 'AlgoLeague', src: '/tech/algoleague.svg' },
  neetcode:   { label: 'NeetCode',   src: '/tech/neetcode.png' },
  hackerrank: { label: 'HackerRank', src: '/tech/hackerrank.svg' },
};

const findTech = (text) => {
  const s = String(text || '').trim();
  return Object.keys(TECH).find((k) => TECH[k].match.test(s));
};

// The project's own technologies that have a logo, most identifying first:
// the primary language, then frameworks and libraries in the order the
// project lists them, then other languages, then tags. Never pads.
export function projectTech(p, limit = 3) {
  const stack = p.stack || [];
  const ordered = [
    p.language,
    ...stack.filter((g) => g.label !== 'Languages').flatMap((g) => g.items),
    ...stack.filter((g) => g.label === 'Languages').flatMap((g) => g.items),
    ...(p.tags || []),
  ];
  const keys = [];
  for (const item of ordered) {
    const k = findTech(item);
    if (k && !keys.includes(k)) keys.push(k);
    if (keys.length === limit) break;
  }
  return keys.map((k) => ({ key: k, ...TECH[k] }));
}
