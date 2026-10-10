// Experience page data — the source of truth is what Görkem supplied on
// 10 October 2026 (Phase 3 brief). Nothing here comes from LinkedIn scraping
// or from guesses: no invented dates, employers, results or technologies.
//
// Dates are 'YYYY-MM'; `end: null` means ongoing. Turkish copy sits in the
// `…Tr` field next to the English one. Confidential roles never carry an
// employer name, a logo or a link.
//
// Logos live in public/orgs/ and come from each organisation's own website
// (see PORTFOLIO_RULES §3 "Logos"). `logoLight: true` puts a dark-on-light
// logo on a light plate so it stays legible.

export const EDUCATION = [
  {
    id: 'yeditepe-prep',
    org: 'Yeditepe University',
    orgTr: 'Yeditepe Üniversitesi',
    title: 'Preparatory School',
    titleTr: 'Hazırlık Okulu',
    detail: 'English Preparatory Program.',
    detailTr: 'İngilizce Hazırlık Programı.',
    start: '2024-09',
    end: '2025-06',
    status: 'completed',
    logo: '/orgs/yeditepe-university.svg',
    logoLight: true,
    url: 'https://yeditepe.edu.tr',
  },
  {
    id: 'yeditepe-ce',
    org: 'Yeditepe University',
    orgTr: 'Yeditepe Üniversitesi',
    title: 'Computer Engineering',
    titleTr: 'Bilgisayar Mühendisliği',
    detail: 'B.Sc. in Computer Engineering.',
    detailTr: 'Bilgisayar Mühendisliği lisans programı.',
    start: '2025-09',
    end: '2029-06',
    endExpected: true, // expected graduation, not a completed degree
    status: 'in-progress',
    logo: '/orgs/yeditepe-university.svg',
    logoLight: true,
    url: 'https://yeditepe.edu.tr',
  },
];

export const WORK = [
  {
    id: 'spotbox',
    org: 'Spotbox',
    role: 'Product Developer',
    roleTr: 'Ürün Geliştirici',
    type: 'Freelance',
    typeTr: 'Serbest',
    start: '2026-10',
    end: null,
    summary: 'Working on product development and software-related tasks.',
    summaryTr: 'Ürün geliştirme ve yazılımla ilgili görevler üzerinde çalışıyorum.',
    logo: '/apps/spotbox.jpg',
    url: 'https://apps.apple.com/app/spotbox-drop-your-photos/id6749022005',
    tags: ['Product development'],
    tagsTr: ['Ürün geliştirme'],
  },
  {
    id: 'iceberg-digital',
    org: 'Iceberg Digital',
    role: 'AI Product Developer Intern',
    roleTr: 'Yapay Zekâ Ürün Geliştirici Stajyeri',
    type: 'Internship',
    typeTr: 'Staj',
    mode: 'Remote',
    modeTr: 'Uzaktan',
    start: '2026-08',
    end: null,
    summary: 'Working remotely on applied AI research and frontend prototyping for a real estate software product, evaluating practical AI opportunities and building user-facing features.',
    summaryTr: 'Bir emlak yazılımı ürünü için uzaktan uygulamalı yapay zekâ araştırması ve frontend prototipleme yapıyor; pratik yapay zekâ fırsatlarını değerlendirip kullanıcıya dönük özellikler geliştiriyorum.',
    points: [
      'Researched and evaluated AI approaches, including LLMs, RAG, and tool calling, to identify high-impact opportunities.',
      'Prototyped and tested AI-powered solutions, presenting findings and recommendations to the team.',
      'Led a team as Mission Lead for a property search prototype, overseeing architecture decisions, task planning, and Git branching and pull request workflow.',
      'Designed application state to synchronize filters, listings, and map interactions, and benchmarked real estate platforms to inform UX decisions.',
    ],
    pointsTr: [
      'Etkisi yüksek fırsatları bulmak için LLM, RAG ve tool calling dahil yapay zekâ yaklaşımlarını araştırıp değerlendirdim.',
      'Yapay zekâ destekli çözümleri prototipleyip test ettim; bulguları ve önerileri ekibe sundum.',
      'Bir emlak arama prototipinde Mission Lead olarak ekibi yönettim; mimari kararları, görev planlamasını ve Git branch ile pull request akışını yürüttüm.',
      'Filtreleri, ilanları ve harita etkileşimlerini senkron tutan uygulama state’ini tasarladım; UX kararları için emlak platformlarını karşılaştırdım.',
    ],
    logo: '/orgs/iceberg-digital.png',
    url: 'https://iceberg-digital.co.uk',
    tags: ['LLMs', 'RAG', 'Tool calling', 'Frontend prototyping'],
    tagsTr: ['LLM', 'RAG', 'Tool calling', 'Frontend prototipleme'],
  },
  {
    id: 'confidential-dl-cv',
    confidential: true,
    org: 'Confidential',
    orgTr: 'Gizli',
    role: 'DL & Computer Vision Researcher',
    roleTr: 'Derin Öğrenme ve Bilgisayarlı Görü Araştırmacısı',
    start: '2026-07',
    end: null,
    summary: 'Researching deep learning and computer vision applications.',
    summaryTr: 'Derin öğrenme ve bilgisayarlı görü uygulamaları üzerine araştırma yapıyorum.',
    note: 'Organization and project details will be disclosed when the work is completed.',
    noteTr: 'Kurum ve proje ayrıntıları çalışma tamamlandığında paylaşılacak.',
    tags: ['Deep learning', 'Computer vision'],
    tagsTr: ['Derin öğrenme', 'Bilgisayarlı görü'],
  },
  {
    id: 'intertech',
    org: 'Intertech Information Technology and Marketing Inc.',
    orgShort: 'Intertech',
    role: 'Software Engineer Intern',
    roleTr: 'Yazılım Mühendisi Stajyeri',
    type: 'Internship',
    typeTr: 'Staj',
    mode: 'Remote — Istanbul, Türkiye',
    modeTr: 'Uzaktan — İstanbul, Türkiye',
    start: '2026-05',
    end: '2026-05',
    summary: 'Worked in an Agile team on product and full-stack development, using prompt engineering to support AI-assisted features.',
    summaryTr: 'Agile bir ekipte ürün ve full-stack geliştirme üzerinde çalıştım; yapay zekâ destekli özellikler için prompt engineering kullandım.',
    points: [
      'Contributed to product management tasks, including requirements, task prioritization, and sprint planning.',
      'Worked on full-stack development and applied prompt engineering to build and refine AI-powered functionality.',
    ],
    pointsTr: [
      'Gereksinimler, görev önceliklendirme ve sprint planlaması dahil ürün yönetimi görevlerine katkı verdim.',
      'Full-stack geliştirme yaptım; yapay zekâ destekli işlevleri kurmak ve iyileştirmek için prompt engineering uyguladım.',
    ],
    logo: '/orgs/intertech.svg',
    url: 'https://www.intertech.com.tr',
    tags: ['Agile', 'Full-stack', 'Prompt engineering'],
    tagsTr: ['Agile', 'Full-stack', 'Prompt engineering'],
  },
  {
    id: 'confidential-ai',
    confidential: true,
    org: 'Confidential',
    orgTr: 'Gizli',
    role: 'AI Researcher',
    roleTr: 'Yapay Zekâ Araştırmacısı',
    mode: 'On-site',
    modeTr: 'Ofiste',
    start: '2026-01',
    end: null,
    summary: 'Working on data collection, data cleaning, machine learning, deep learning, and large language model research.',
    summaryTr: 'Veri toplama, veri temizleme, makine öğrenmesi, derin öğrenme ve büyük dil modeli araştırmaları üzerinde çalışıyorum.',
    note: 'Organization and research details will be updated when the work is completed.',
    noteTr: 'Kurum ve araştırma ayrıntıları çalışma tamamlandığında güncellenecek.',
    tags: ['Data', 'ML', 'Deep learning', 'LLMs'],
    tagsTr: ['Veri', 'ML', 'Derin öğrenme', 'LLM'],
  },
  {
    id: 'yeditepe-automotive',
    org: 'Yeditepe Automotive Team',
    orgTr: 'Yeditepe Otomotiv Takımı',
    role: 'Algorithm Developer',
    roleTr: 'Algoritma Geliştirici',
    type: 'Part-time / Periodic',
    typeTr: 'Yarı zamanlı / Dönemsel',
    mode: 'Hybrid',
    modeTr: 'Hibrit',
    start: '2025-11',
    end: '2026-07',
    summary: 'Developed and tested algorithms for the team’s vehicle software, working with cross-functional subteams in a competition-oriented environment.',
    summaryTr: 'Takımın araç yazılımı için algoritmalar geliştirip test ettim; yarışma odaklı bir ortamda farklı alt ekiplerle birlikte çalıştım.',
    logo: '/orgs/yeditepe-automotive.png', // owner-supplied team logo
    logoLight: true,
    tags: ['Algorithms', 'Vehicle software'],
    tagsTr: ['Algoritmalar', 'Araç yazılımı'],
  },
  {
    id: 'nexa',
    org: 'NEXA',
    role: 'Founder & Community Lead',
    roleTr: 'Kurucu & Topluluk Lideri',
    mode: 'Hybrid',
    modeTr: 'Hibrit',
    start: '2025-11',
    end: '2026-04',
    summary: 'Founded and led a community of 15–25 ambitious engineers in Türkiye, bringing students together to build, compete, and learn.',
    summaryTr: 'Türkiye’de 15–25 hevesli mühendisten oluşan bir topluluk kurup yönettim; öğrencileri birlikte üretmek, yarışmak ve öğrenmek için bir araya getirdim.',
    points: [
      'Recruited and organized members, coordinating meetups and community management.',
      'Generated project ideas and led teams through execution.',
      'Participated in competitions and hackathons as a team.',
      'Held group algorithm-solving sessions.',
    ],
    pointsTr: [
      'Üyeleri bulup organize ettim; buluşmaları ve topluluk yönetimini koordine ettim.',
      'Proje fikirleri ürettim ve ekipleri uygulama sürecinde yönettim.',
      'Ekip olarak yarışmalara ve hackathonlara katıldık.',
      'Grup halinde algoritma çözme oturumları düzenledim.',
    ],
    logo: '/orgs/nexa.jpg',
    tags: ['Community', 'Hackathons', 'Algorithms'],
    tagsTr: ['Topluluk', 'Hackathon', 'Algoritmalar'],
  },
];

// 'YYYY-MM' → localised short month + year ("Aug 2026" / "Ağu 2026").
export function fmtMonth(ym, lang) {
  const [y, m] = ym.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { month: 'short', year: 'numeric' });
}

// "Aug 2026 – Present", "May 2026", "Sep 2025 – Jun 2029 (expected)".
export function fmtRange(e, lang, present, expected) {
  if (e.end && e.end === e.start) return fmtMonth(e.start, lang);
  const end = e.end ? fmtMonth(e.end, lang) : present;
  return `${fmtMonth(e.start, lang)} – ${end}${e.endExpected ? ` (${expected})` : ''}`;
}

// Ongoing roles first, then completed ones; within each group newest start
// first, ties broken by the later end.
const endKey = (e) => e.end || '9999-12';
export const WORK_SORTED = [...WORK].sort((a, b) =>
  (a.end ? 1 : 0) - (b.end ? 1 : 0)
  || b.start.localeCompare(a.start)
  || endKey(b).localeCompare(endKey(a)));

// The four navigation cards. Images are the four text-free photos from the
// owner's 2×2 composite (tasks/source-assets/experience/4experience.png),
// cropped at native size (~833×467, 16:9) — top-left → bottom-right in this
// order. Titles, text and arrows are real UI, never part of the image.
export const NAV_CARDS = [
  {
    id: 'competitions',
    to: '/competitions',
    label: 'Competitions', labelTr: 'Yarışmalar',
    title: 'Hackathons & Competitions', titleTr: 'Hackathonlar ve Yarışmalar',
    text: 'Explore the hackathons and competitions I’ve participated in.',
    textTr: 'Katıldığım hackathonlara ve yarışmalara göz at.',
    image: '/media/experience/cards/competitions.webp',
  },
  {
    id: 'research',
    to: '/research',
    label: 'Research', labelTr: 'Araştırma',
    title: 'Research Projects', titleTr: 'Araştırma Projeleri',
    text: 'Explore my work in AI, machine learning, and computer vision research.',
    textTr: 'Yapay zekâ, makine öğrenmesi ve bilgisayarlı görü alanındaki araştırmalarımı incele.',
    image: '/media/experience/cards/research.webp',
  },
  {
    id: 'apps',
    to: '/apps',
    label: 'Apps', labelTr: 'Uygulamalar',
    title: 'Applications', titleTr: 'Uygulamalar',
    text: 'Discover the applications and digital products I’ve built.',
    textTr: 'Geliştirdiğim uygulamaları ve dijital ürünleri keşfet.',
    image: '/media/experience/cards/apps.webp',
  },
  {
    id: 'papers',
    to: '/articles',
    label: 'Papers', labelTr: 'Makaleler',
    title: 'Publications & Papers', titleTr: 'Yayınlar ve Makaleler',
    text: 'Read my academic writing, publications, and ongoing research work.',
    textTr: 'Akademik yazılarımı, yayınlarımı ve süren araştırma çalışmalarımı oku.',
    image: '/media/experience/cards/papers.webp',
  },
];
