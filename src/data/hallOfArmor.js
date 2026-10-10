// The Hall of Armor — presentation categories for the Projects page.
//
// The scene (public/media/hall/armor-hall*.webp) is tasks/armor.png with the
// top 110px cropped off (that strip had a baked-in avatar and menu icon), so
// the image is 1672 × 831. It shows TWELVE bays, six per floor. Nine carry a
// category; the robot bay (upper floor, 2nd), the drone bay (lower-left) and
// the leaf bay (lower floor, 4th) stay purely visual — never invent a
// category to fill them.
//
// `bay` = the bay's rectangle in percent of that image: [left, top, width,
// height]. Measured against the image, not spaced evenly — see PORTFOLIO_RULES.
//
// Membership: PROJECT_CATEGORY maps every slug to exactly ONE category. No
// secondary memberships, no project in two bays. The original `category`
// field in projects.js is untouched and still drives the "All projects"
// grouping. Counts are always derived from this map, never written by hand.

import PROJECTS from './projects';

const W = 1672;
const H = 831;
const rect = (x0, y0, x1, y1) => [(x0 / W) * 100, ((y0 - 110) / H) * 100, ((x1 - x0) / W) * 100, ((y1 - y0) / H) * 100];

// Approved by the owner on 11 Oct 2026 after a per-project audit of
// projects.js and the repository READMEs (table in PORTFOLIO_RULES §3).
export const PROJECT_CATEGORY = {
  'mihenk-benchmark': 'benchmarks',
  'llm-lora-finetuning': 'llm-nlp',
  'ayarlicazhocam-tool-agent': 'agents-tools',
  'ayarlicazhocam-agent': 'agents-tools',
  'turkish-medical-rag': 'medical-ai',
  'pose-invariant-face-id': 'benchmarks',
  'pose-robust-face-login': 'computer-vision',
  'turkish-english-nmt': 'llm-nlp',
  'miniature-transformers-from-scratch': 'llm-nlp',
  'face-detection-pipeline': 'computer-vision',
  'yolo-custom-detector': 'computer-vision',
  'facelock': 'computer-vision',
  'worldcup-bpe-tokenizer': 'llm-nlp',
  'wiki2bpe': 'hugging-face',
  'tr-sts-dataset': 'hugging-face',
  'writing-analyzer': 'llm-nlp',
  'depression-phq9-analysis': 'medical-ai',
  'email-phishing-detection': 'machine-learning',
  'gorkem-os': 'systems-graphics',
  'build-your-target-body': 'applications',
  'nexa-website': 'applications',
  're-mind': 'applications',
  'synonym-master': 'applications',
  'raylib-space-shooter': 'systems-graphics',
  'pynput-macos-macro': 'agents-tools',
  'sorting-visualizer': 'systems-graphics',
  'automotive-racing-assistant': 'agents-tools',
  'vlm-groundbench': 'benchmarks',
  'algorithm-mentor-mcp': 'agents-tools',
};

export const HALL_CATEGORIES = [
  // ---- upper floor, left → right (robot bay, 2nd, is visual only) ----
  {
    id: 'machine-learning', icon: 'Brain', tone: 'cyan', floor: 'upper',
    bay: rect(62, 150, 252, 405),
    label: 'Machine Learning', labelTr: 'Makine Öğrenmesi',
    desc: 'Classical machine learning on real data: a TF-IDF and logistic-regression phishing classifier, evaluated end to end.',
    descTr: 'Gerçek veri üzerinde klasik makine öğrenmesi: uçtan uca değerlendirilen, TF-IDF ve lojistik regresyon tabanlı bir phishing sınıflandırıcısı.',
  },
  {
    id: 'computer-vision', icon: 'Eye', tone: 'cyan', floor: 'upper',
    bay: rect(470, 250, 652, 415),
    label: 'Computer Vision', labelTr: 'Bilgisayarlı Görü',
    desc: 'Image and video at the centre: face detection, recognition and login, and a custom-trained object detector.',
    descTr: 'Merkezde görüntü ve video: yüz tespiti, tanıma ve yüzle giriş, ayrıca özel olarak eğitilmiş bir nesne dedektörü.',
  },
  {
    id: 'medical-ai', icon: 'HeartPulse', tone: 'amber', floor: 'upper',
    bay: rect(1032, 250, 1212, 415),
    label: 'Medical AI', labelTr: 'Tıbbi Yapay Zekâ',
    desc: 'Healthcare as the purpose: a source-gated Turkish medical RAG system and a PHQ-9 depression-screening analysis. Research tools, not clinical ones.',
    descTr: 'Amacı sağlık olan projeler: kaynakla sınırlandırılmış Türkçe tıbbi RAG sistemi ve PHQ-9 depresyon taraması analizi. Klinik değil, araştırma araçları.',
  },
  {
    id: 'systems-graphics', icon: 'Cpu', tone: 'cyan', floor: 'upper',
    bay: rect(1225, 215, 1420, 405),
    label: 'Systems & Graphics', labelTr: 'Sistem & Grafik',
    desc: 'Low-level C: a bare-metal x86 operating system, a raylib space shooter and an animated sorting visualizer.',
    descTr: 'Alt seviye C: bare-metal bir x86 işletim sistemi, raylib ile bir uzay oyunu ve animasyonlu bir sıralama görselleştiricisi.',
  },
  {
    id: 'benchmarks', icon: 'Trophy', tone: 'amber', floor: 'upper',
    bay: rect(1428, 150, 1620, 400),
    label: 'Benchmarks & Evaluation', labelTr: 'Benchmark & Değerlendirme',
    desc: 'Projects whose deliverable is the measurement: a bilingual LLM reasoning benchmark, a face-verification pose study and a frozen VLM grounding protocol.',
    descTr: 'Asıl çıktısı ölçümün kendisi olan projeler: iki dilli bir LLM muhakeme benchmark’ı, yüz doğrulamada poz çalışması ve dondurulmuş bir VLM grounding protokolü.',
  },
  // ---- lower floor, left → right (drone bay, 1st, and leaf bay, 4th, are visual only) ----
  {
    id: 'agents-tools', icon: 'Bot', tone: 'cyan', floor: 'lower',
    bay: rect(278, 450, 458, 648),
    label: 'AI Agents & Tools', labelTr: 'Yapay Zekâ Ajanları & Araçlar',
    desc: 'Models that act through real tools — function-calling agents, an offline workshop assistant, an MCP mentoring server — plus a macOS automation utility.',
    descTr: 'Gerçek araçlar üzerinden iş yapan modeller — tool calling ajanları, çevrimdışı bir atölye asistanı, bir MCP mentorluk sunucusu — ve bir macOS otomasyon aracı.',
  },
  {
    id: 'hugging-face', icon: 'Package', tone: 'amber', floor: 'lower',
    bay: rect(470, 462, 652, 640),
    label: 'Hugging Face', labelTr: 'Hugging Face',
    desc: 'Work whose deliverable is published on the Hugging Face Hub: a Turkish similarity dataset and a Wikipedia-to-tokenizer pipeline that pushes to the Hub.',
    descTr: 'Asıl çıktısı Hugging Face Hub’da yayınlanan işler: Türkçe bir benzerlik veri kümesi ve Wikipedia’dan Hub’a tokenizer üreten bir pipeline.',
  },
  {
    id: 'applications', icon: 'Globe', tone: 'cyan', floor: 'lower',
    bay: rect(1225, 450, 1420, 648),
    label: 'Applications', labelTr: 'Uygulamalar',
    desc: 'Products people use: a full-stack fitness tracker, a community website, a native macOS app and a desktop quiz.',
    descTr: 'İnsanların kullandığı ürünler: full-stack fitness takipçisi, topluluk sitesi, yerel bir macOS uygulaması ve masaüstü quiz.',
  },
  {
    id: 'llm-nlp', icon: 'BookOpen', tone: 'amber', floor: 'lower',
    bay: rect(1428, 430, 1620, 662),
    label: 'LLMs & NLP', labelTr: 'LLM & Doğal Dil İşleme',
    desc: 'Language models and language data: LoRA fine-tunes, translation, a transformer written from scratch, tokenizers and stylometric text analysis.',
    descTr: 'Dil modelleri ve dil verisi: LoRA fine-tune’ları, çeviri, sıfırdan yazılmış bir transformer, tokenizer’lar ve stilometrik metin analizi.',
  },
];

// Bays in the scene that carry no category (shown dimmed, not clickable).
export const INERT_BAYS = [
  { id: 'robot', bay: rect(278, 215, 458, 410) },
  { id: 'drones', bay: rect(62, 430, 252, 662) },
  { id: 'leaf', bay: rect(1032, 462, 1212, 640) },
];

export const getHallCategory = (id) => HALL_CATEGORIES.find((c) => c.id === id);

const BY_SLUG = Object.fromEntries(PROJECTS.map((p) => [p.slug, p]));

// Projects of a category, in MARK order (the order of projects.js).
export function projectsInCategory(id) {
  return PROJECTS.filter((p) => PROJECT_CATEGORY[p.slug] === id);
}

if (import.meta.env && import.meta.env.DEV) {
  const ids = new Set(HALL_CATEGORIES.map((c) => c.id));
  const unknown = Object.keys(PROJECT_CATEGORY).filter((s) => !BY_SLUG[s]);
  const missing = PROJECTS.filter((p) => !PROJECT_CATEGORY[p.slug]).map((p) => p.slug);
  const badCat = Object.entries(PROJECT_CATEGORY).filter(([, c]) => !ids.has(c)).map(([s]) => s);
  const empty = HALL_CATEGORIES.filter((c) => !projectsInCategory(c.id).length).map((c) => c.id);
  if (unknown.length) console.warn('[hallOfArmor] unknown project slugs:', unknown);
  if (missing.length) console.warn('[hallOfArmor] projects in no category:', missing);
  if (badCat.length) console.warn('[hallOfArmor] unknown category for:', badCat);
  if (empty.length) console.warn('[hallOfArmor] empty categories:', empty);
}
