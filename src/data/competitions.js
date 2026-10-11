// Competitions, hackathons, and competitive-programming camps.
// Rank / score are only shown when publicly verifiable; when an entry has
// neither, the page shows what was built instead — never a placeholder.
// `logo` is the organiser's official mark from public/orgs/ (see
// PORTFOLIO_RULES §9); `null` falls back to the styled initials emblem.
//
// Phase 8 cleanup: `summary` only says what the title, type, score, rank and
// team do not already say (removed: "Scored 887 points — ranked 48th", "Solved
// 6/10 — ranked 23rd of 92", "Finished in the top 10", "built during a
// hackathon", camp blurbs that restated the type). `round` comes from the
// public leaderboard each rank links to (the AlgoLeague results are the
// camps' qualification rounds).
//
// score: { value, unit:{en,tr} } · rank: { value, of?, scope?:{en,tr} }
// tags: string[] (technology names, untranslated) or { en: [], tr: [] }
// Algorithm contests and camps carry exactly these two topics (release
// decision); hackathons keep their own technology tags.
const ALGO_TAGS = { en: ['Algorithms', 'Data Structures'], tr: ['Algoritmalar', 'Veri Yapıları'] };

const COMPETITIONS = [
  {
    id: 'ieeextreme',
    name: 'IEEEXtreme 19.0',
    org: 'IEEE',
    date: 'Oct 25, 2025',
    dateTr: '25 Eki 2025',
    duration: { en: '24 hours', tr: '24 saat' },
    initials: 'IX',
    accent: '#00b3ff',
    logo: '/orgs/ieee.svg',
    type: { en: 'Algorithm Contest', tr: 'Algoritma Yarışması' },
    score: { value: '887', unit: { en: 'points', tr: 'puan' } },
    rank: { value: '48', scope: { en: 'in Türkiye', tr: 'Türkiye’de' } },
    team: 'ayarlicazhocam',
    tags: ALGO_TAGS,
    summary: {
      en: 'IEEE’s worldwide competitive-programming contest for student teams.',
      tr: 'IEEE’nin öğrenci takımlarına yönelik dünya çapındaki competitive-programming yarışması.',
    },
    website: 'https://ieeextreme.org',
    leaderboard: 'https://ieeextreme.org/ieeextreme-19-0-ranking/',
  },
  {
    id: 'algoleague-summer',
    name: 'AlgoLeague Summer Camp',
    org: 'AlgoLeague',
    date: 'May 2026',
    dateTr: 'May 2026',
    initials: 'AU',
    accent: '#ffd166',
    logo: '/orgs/algoleague-mark.svg',
    type: { en: 'Competitive Camp', tr: 'Yarışma Kampı' },
    round: { en: 'Qualification round', tr: 'Eleme turu' },
    score: { value: '8/12', unit: { en: 'solved', tr: 'çözüldü' } },
    rank: { value: '11', of: '102' },
    tags: ALGO_TAGS,
    website: 'https://algoleague.com',
    leaderboard: 'https://algoleague.com/contest/algorithm-competition-summer-camp-2026-qualification-round/leaderboard',
  },
  {
    id: 'algoleague-spring',
    name: 'AlgoLeague Spring Camp',
    org: 'AlgoLeague',
    date: 'Mar 2026',
    dateTr: 'Mar 2026',
    initials: 'AS',
    accent: '#00e5a0',
    logo: '/orgs/algoleague-mark.svg',
    type: { en: 'Competitive Camp', tr: 'Yarışma Kampı' },
    round: { en: 'Qualification round', tr: 'Eleme turu' },
    score: { value: '5/10', unit: { en: 'solved', tr: 'çözüldü' } },
    rank: { value: '11', of: '90' },
    tags: ALGO_TAGS,
    website: 'https://algoleague.com',
    leaderboard: 'https://algoleague.com/contest/algorithm-program-2025-2026-spring-qualification-round/leaderboard',
  },
  {
    id: 'algoleague-winter',
    name: 'AlgoLeague Winter Camp',
    org: 'AlgoLeague',
    date: 'Jan 2026',
    dateTr: 'Oca 2026',
    initials: 'AW',
    accent: '#4d96ff',
    logo: '/orgs/algoleague-mark.svg',
    type: { en: 'Competitive Camp', tr: 'Yarışma Kampı' },
    round: { en: 'Qualification round', tr: 'Eleme turu' },
    score: { value: '6/10', unit: { en: 'solved', tr: 'çözüldü' } },
    rank: { value: '23', of: '92' },
    tags: ALGO_TAGS,
    website: 'https://algoleague.com',
    leaderboard: 'https://algoleague.com/contest/algorithm-competition-winter-camp-2026-qualification-round/leaderboard',
  },
  {
    id: 'btk-hackathon',
    name: 'BTK E-Commerce Hackathon',
    org: 'BTK',
    date: 'May 2026',
    dateTr: 'May 2026',
    initials: 'BTK',
    accent: '#ff9f1c',
    logo: '/orgs/btk-akademi.png',
    type: { en: 'Hackathon', tr: 'Hackathon' },
    score: null,
    rank: null,
    tags: ['Next.js', 'FastAPI', 'Gemini'],
    summary: {
      en: 'Built “Find The Best”: Gemini-powered price comparison and fake-review detection across 21 marketplaces.',
      tr: '“Find The Best”i geliştirdim: 21 pazaryerinde Gemini destekli fiyat karşılaştırma ve sahte yorum tespiti.',
    },
    repo: 'https://github.com/gorkemergune/find-the-best',
  },
  {
    id: 'tikla-gelsin-foodathon',
    name: 'Tıkla Gelsin Foodathon',
    org: 'Tıkla Gelsin',
    date: 'Mar 2026',
    dateTr: 'Mar 2026',
    initials: 'TG',
    accent: '#f472b6',
    logo: '/orgs/tikla-gelsin.png',
    type: { en: 'Hackathon', tr: 'Hackathon' },
    score: null,
    rank: null,
    tags: ['AI', 'Personalization'],
    summary: {
      en: 'An AI personalization engine for Tıkla Gelsin’s “Gel Al” pickup experience.',
      tr: 'Tıkla Gelsin’in “Gel Al” deneyimi için yapay zekâ destekli bir kişiselleştirme motoru.',
    },
    repo: 'https://github.com/gorkemergune/tikla-gelsin-foodathon',
  },
  {
    id: 'med-health',
    name: 'Med-Health Early Warning',
    org: 'AI4Purpose',
    date: 'Feb 2026',
    dateTr: 'Şub 2026',
    initials: 'MH',
    accent: '#00f0ff',
    logo: '/orgs/ai4purpose.png',
    type: { en: 'Hackathon', tr: 'Hackathon' },
    score: null,
    rank: { value: '10', top: true },
    tags: ['Python', 'Health AI'],
    summary: {
      en: 'An early-warning system for Mediterranean health risks.',
      tr: 'Akdeniz sağlık riskleri için bir erken uyarı sistemi.',
    },
    repo: 'https://github.com/gorkemergune/med-health-early-warning',
  },
];

export default COMPETITIONS;
