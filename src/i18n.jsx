import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const en = {
  // Nav
  navAbout: 'About',
  navJourney: 'Journey',
  navFocus: 'Focus',
  navBlog: 'Blog',
  navContact: 'Contact',

  // Hero
  heroChip: 'Portfolio / Version 2.10 / 2026',
  heroRole: 'ROLE',
  heroRoleValue: '2nd year Computer Engineering student',
  heroBasedIn: 'BASED IN',
  heroBasedInValue: 'Istanbul, Türkiye',
  heroStatus: 'STATUS',
  heroStatusValue: 'Currently focused on improving',
  heroTagline1: 'Focus on improving yourself, not proving yourself',
  heroTagline2: "Just trying to get better every day. — ",
  heroUnhurried: 'ambition or discipline?',

  // Marquee
  marquee: ['Portfolio', 'Blog', 'Focus', 'Moments', 'Journal', 'Field guide', 'Archive'],

  // Intro (home identity section)
  introKicker: 'IDENTITY // WHO IS BEHIND THE ARMOR',
  introLeadPre: "I'm Görkem — a second-year Computer Engineering student turning ",
  introLeadEm: 'curiosity into working systems',
  introLeadPost: '. I build AI that sees, reads, and reasons: object detectors, translation models, phishing classifiers — and the full-stack apps that put them in people’s hands.',
  introBody: 'I learn by shipping. Every armor in the hall is something I designed, trained, broke, and rebuilt — from bare-metal operating systems to production ML pipelines. The goal is simple: to become the kind of AI engineer whose work speaks before he does.',
  introRolesLabel: 'OPERATING DOMAINS',
  introRoles: ['AI Engineer', 'Machine Learning', 'Computer Vision', 'Deep Learning', 'Full-Stack Development', 'Open Source', 'Research'],
  introStats: [
    { n: 14, suffix: '', label: 'Projects shipped' },
    { n: 25, suffix: '+', label: 'Technologies used' },
    { n: 99, suffix: '%', label: 'Peak model F1' },
    { n: 6, suffix: '', label: 'Domains explored' },
  ],
  introCtaProjects: 'Explore the Armory',
  introCtaBlog: 'Read the Blog',
  introCtaContact: 'Start a conversation',

  // Home hero + sections
  heroTagline: 'AI ENGINEER IN PROGRESS',
  heroSubtext: 'Building computer vision systems, machine learning pipelines, and intelligent software with a research-driven mindset.',
  ctaResume: 'Download Résumé',
  ctaViewWork: 'View Work',

  metricsKicker: 'FEATURED METRICS // LIVE TELEMETRY',
  mProjects: 'Featured Projects',
  mRepos: 'Public Repositories',
  mCommits: 'GitHub Commits',
  mResearch: 'Research Projects (in progress)',
  mModels: 'AI Models Deployed',
  mImages: 'Images Processed',
  mDataset: 'Custom Dataset Images',
  mF1: 'Best Model F1 Score',
  metricLive: 'LIVE',

  featuredKicker: 'FEATURED PROJECT',
  featuredCta: 'Read the case study',

  buildingKicker: 'CURRENTLY BUILDING',
  buildingSub: 'Active experiments and work in progress',
  buildingItems: [
    { title: 'LLM Experiments', desc: 'Prompting, fine-tuning, and small agentic tools around open models.', status: 'Exploring' },
    { title: 'Computer Vision', desc: 'Custom detectors and detection pipelines beyond single-class YOLO.', status: 'Building' },
    { title: 'Writing Analyzer', desc: 'Extending the bilingual stylometric risk engine and its API.', status: 'Iterating' },
  ],

  activityKicker: 'GITHUB ACTIVITY // LATEST REPOSITORIES',
  activitySub: 'Pulled live from GitHub — always current',
  activityCta: 'View GitHub profile',
  activityUpdated: 'Updated',
  activityStars: 'stars',

  // About
  aboutLabel: 'About',
  aboutLead: 'CS student, building things and writing about the process.',
  statCurrently: 'Currently',
  statCurrentlyVal: 'Building & writing',
  statPreviously: 'Previously',
  statPreviouslyVal: 'Community / Team lead',
  statTools: 'Tools',
  statToolsVal: 'Python · React · Node',
  statLanguages: 'Languages',
  statLanguagesVal: 'TR · EN',
  statMail: 'Mail',

  // Journey
  journeyLabel: 'Life flow',
  journeySub: 'A short chronology',
  journeyItems: [
    { year: 'Sep 2024 Aug 2025', title: 'English Prep School', body: 'Built English foundation. Reached speaking fluency for daily use. Started Python and basic problem solving. First introduction to LLM concepts.' },
    { year: 'Sep 2025 Jun 2026', title: '1/4 Computer Engineering', body: 'Started core CS journey. Learned C and improved algorithm skills. Studied ML & DL fundamentals. Built small Python/C projects. Began experimenting with LLM ideas. Increased Social Media, GitHub and LinkedIn activity.' },
    { year: 'Sep 2026 Jun 2027', title: '2/4 Computer Engineering', body: 'Coming soon..' },
    { year: 'Sep 2027 Jun 2028', title: '3/4 Computer Engineering', body: 'Coming soon..' },
    { year: 'Sep 2028 Jun 2029', title: '4/4 Computer Engineering', body: 'Coming soon..' },
  ],

  // Focus
  focusLabel: 'Focus',
  focusSub: "What I'm paying attention to, now",
  focusItems: [
    { label: 'Reading', value: 'Title — Author' },
    { label: 'Building', value: 'A quiet project in progress' },
    { label: 'Learning', value: 'Something new, one hour a day' },
    { label: 'Listening', value: 'An album on repeat' },
  ],

  // Blog
  blogLabel: 'Blog',
  blogSub: 'Notes on AI, engineering, and the student life behind them',
  blogItems: [
    { category: 'University', date: 'Jun 2026', readTime: '4 min', title: 'How to Get AA in Calculus 1-2', excerpt: 'The habits — not the talent — that carried me through two semesters of calculus with a top grade.', slug: 'calculus-aa' },
    { category: 'Programming', date: 'May 2026', readTime: '4 min', title: 'Python from Scratch', excerpt: 'A beginner-friendly path into Python: what to learn first, and what to happily ignore for now.', slug: 'python-from-scratch' },
    { category: 'Programming', date: 'Apr 2026', readTime: '4 min', title: 'C from Scratch', excerpt: 'Pointers, memory, and the compiler that finally taught me how a computer actually works.', slug: 'c-from-scratch' },
    { category: 'Career', date: 'Mar 2026', readTime: '4 min', title: 'Should You Study Computer Engineering?', excerpt: 'An honest look at the field — who it fits, who it frustrates, and what nobody tells you first.', slug: 'should-you-study-cs' },
  ],

  // Puzzle
  puzzleLabel: 'Puzzle',
  puzzleSub: 'Can you crack the algorithm?',
  puzzleIntro: 'There are 10 colored balls, each hiding a value from 1 to 10. Every round, find the minimum of the remaining set. Use comparisons to deduce the order.',
  puzzleRound: 'ROUND',
  puzzleComparisons: 'COMPARISONS',
  puzzleLives: 'LIVES',
  puzzleCompare: 'Compare',
  puzzleClaim: 'Claim Minimum',
  puzzleRemaining: 'Remaining',
  puzzleSorted: 'Sorted',
  puzzleCompLog: 'Comparison log',
  puzzleSelectTwo: 'Click two balls to compare them',
  puzzleSelectOne: 'Click the first ball',
  puzzleSelectSecond: 'Now click the second ball',
  puzzleSelectMin: 'Click the ball with the smallest value',
  puzzleCorrect: 'Correct!',
  puzzleWrong: 'Wrong!',
  puzzleHadValue: 'had value',
  puzzleHasSmaller: 'has a smaller value',
  puzzleLifeLost: '−1 life',
  puzzleWon: 'You sorted all 10 balls!',
  puzzleLost: 'Game over! You ran out of lives.',
  puzzleScore: 'Score',
  puzzleReset: 'New Game',
  puzzleReveal: 'Well-Ordering Principle',
  puzzleHide: 'Hide',
  puzzleExTitle: 'The Well-Ordering Principle',
  puzzleExP1: 'Every non-empty subset of positive integers has a least (minimum) element.',
  puzzleExP2: 'In this puzzle, you proved this by repeatedly finding the minimum of each remaining subset — essentially performing selection sort. The principle guarantees that a minimum always exists, so your task is always solvable.',
  puzzleExP3: 'Optimal strategy: use transitivity. If A < B and B < C, then A < C — no need to compare A and C directly.',
  puzzlePlayAgain: 'Play Again',

  // Contact
  contactLabel: 'Contact',
  contactLine1: "Reach out",
  contactLine1Em: 'anytime',
  contactLine2: 'Open to collaboration',

  // Footer
  footerBuilt: 'Built slowly, by hand.',

  // Nav Fun
  navFun: 'Fun',

  // Fun Hub
  funLabel: 'Fun',
  funSub: 'Surprises to share with friends',
  funBack: 'Home',
  funBadge: 'FUN',
  funSorryTitle: "I'm Sorry",
  funSorryDesc: 'Send this to a friend and make peace.',
  funBirthdayTitle: 'Birthday',
  funBirthdayDesc: 'Create a custom birthday cake for your friend.',
  funHangmanTitle: 'Hangman',
  funHangmanDesc: 'Guess CS terms, one letter at a time.',
  funPuzzleTitle: 'Puzzle',
  funPuzzleDesc: 'Can you crack the sorting algorithm?',
  funHanoiTitle: 'Tower of Hanoi',
  funHanoiDesc: 'Move all disks to the last peg.',
  funMothersDayTitle: "Mother's Day",
  funMothersDayDesc: 'A surprise for your mom with flowers and love.',
  funGoOutTitle: 'Shall We Go Out?',
  funGoOutDesc: 'Send this to a friend and get them outside.',

  // Mother's Day Page
  mothersDayTitle: "Happy Mother's Day,\nMy Dear Mom",
  mothersDaySub: 'You are the most beautiful flower in the world',
  mothersDayMessage: 'Thank you for everything you do. You are the light of my life, the warmth of my heart. I love you more than words can say.',

  // Go Out Page
  goOutPageTitle: 'Shall We Go Out?',
  goOutPageSub: "Come on, let's go outside!",
  goOutYes: 'Yes!',
  goOutNo: 'No',
  goOutYayTitle: "Let's Go!",
  goOutYayText: "Get ready, we're heading out! The world awaits! ☀️",

  // Hanoi Page
  hanoiPageBack: 'Fun',
  hanoiLabel: 'Tower of Hanoi',
  hanoiSub: 'The classic recursion puzzle',
  hanoiSelectDisks: 'Select number of disks',
  hanoiDisks: 'DISKS',
  hanoiStart: 'Start',
  hanoiMoves: 'MOVES',
  hanoiMaxMoves: 'MAX',
  hanoiSelectSource: 'Click a peg to pick up the top disk',
  hanoiSelectTarget: 'Now click a peg to place the disk',
  hanoiInvalidMove: 'Cannot place a larger disk on a smaller one',
  hanoiEmptyPeg: 'This peg is empty',
  hanoiWon: 'You solved it!',
  hanoiLost: 'Out of moves!',
  hanoiWonDesc: 'All disks moved to the last peg.',
  hanoiLostDesc: 'You used all your moves before finishing.',
  hanoiMovesUsed: 'Moves used',
  hanoiOptimal: 'Optimal',
  hanoiNewGame: 'New Game',
  hanoiPlayAgain: 'Play Again',
  hanoiPeg: 'Peg',
  hanoiReveal: 'How it works',
  hanoiHide: 'Hide',
  hanoiExTitle: 'Tower of Hanoi & Recursion',
  hanoiExP1: 'The minimum number of moves to solve Tower of Hanoi with n disks is 2ⁿ − 1.',
  hanoiExP2: 'The recursive strategy: move n−1 disks to the auxiliary peg, move the largest disk to the target, then move n−1 disks from auxiliary to target.',
  hanoiExP3: 'Auxiliary: Peg 2 — Target: Peg 3. This puzzle demonstrates exponential growth — each additional disk doubles the minimum moves and adds one.',

  // Sorry Page
  sorryPageTitle: "I'm Sorry...",
  sorryPageSub: 'Can we make up?',
  sorryYes: 'Yes',
  sorryNo: 'No',
  sorryYayTitle: 'Yaaay!',
  sorryYayText: "We made up! Let's never fight again! 🎉",

  // Birthday Page
  bdayPageTitle: 'Birthday Celebration!',
  bdayNameLabel: "Friend's name",
  bdayNamePlaceholder: 'Enter name...',
  bdayAgeLabel: 'Age',
  bdayAgePlaceholder: 'Enter age...',
  bdayCreate: 'Create Cake!',
  bdayHappy: 'Happy Birthday',
  bdayWish: 'Wishing you an amazing year ahead!',
  bdayShare: 'Share',
  bdayReset: 'Create Another',
  bdayCandles: 'candles',

  // Hangman Page
  hangmanPageTitle: 'Hangman',
  hangmanPageSub: 'CS Edition — Easy Level',
  hangmanWon: 'You got it!',
  hangmanLost: 'Game Over!',
  hangmanTheWord: 'The word was',
  hangmanNewGame: 'New Game',
  hangmanRemaining: 'Remaining',
  hangmanUsed: 'Used letters',
  hangmanHint: 'Hint',

  // Puzzle Page
  puzzlePageBack: 'Fun',

  // Blog Hub
  blogHubBack: 'Home',

  // Nav
  navProject: 'Project',
  navLifeFlow: 'Life Flow',

  // Hero buttons
  heroBtnBlog: 'Blog',
  heroBtnFun: 'Fun',
  heroBtnContact: 'Contact',
  heroBtnProject: 'Project',
  heroBtnLifeFlow: 'Life Flow',

  // Contact Page
  contactBack: 'Home',
  contactBadge: 'CONTACT',
  contactCreator: 'CONTENT CREATOR',

  // Journey Page
  journeyBack: 'Home',
  journeyBadge: 'LIFE FLOW',
  journeyStatusDone: 'COMPLETE',
  journeyStatusActive: 'IN PROGRESS',
  journeyStatusLocked: 'LOCKED',
  journeyPhase: 'PHASE',
  journeyTimeline: 'MISSION TIMELINE',
  journeySoon: 'Encrypted — unlocks in sequence.',

  // Project Page
  projectBack: 'Home',
  projectDetailBack: 'Hall of Armor',
  projectBadge: 'HALL OF ARMOR',
  projectLabel: 'Armory',
  projectSub: 'Fourteen armors, one per project. Open a capsule to inspect its specs, architecture, and results.',
  projectOpen: 'Open Project',

  // Project Detail
  sysOnline: 'SYSTEM ONLINE',
  pdVisualFeed: 'Visual Feed',
  pdOverview: 'Overview',
  pdHighlights: 'Project Highlights',
  pdStack: 'Technical Stack',
  pdArchitecture: 'Architecture',
  pdResults: 'Results',
  pdSource: 'Source',
  pdViewGithub: 'View on GitHub',
  pdOpenRepo: 'Open Repository',
  pdSourceNote: 'Full source, README, and build instructions.',
  pdNotFoundTitle: 'Armor not found',
  pdNotFoundDesc: 'This armor is not in the vault. Return to the Hall of Armor.',
  stackLabels: {},

  // Blog detail
  rdBack: 'Blog',
  rdBadge: 'BLOG',
  rdNotFoundTitle: 'Page not found',
  rdNotFoundDesc: 'This blog post does not exist yet.',
  rdBottomNote: 'Placeholder article — written to set the tone. Real content will replace it soon.',
  rdBottomLink: 'Back to all Blog posts',
  rdNextUp: 'Next up',
  blogSoon: 'COMING SOON',

  // Hall of Armor
  hallStatusLeft: 'ARMOR VAULT',
  hallStatusCenter: '41.0082° N · 28.9784° E · ISTANBUL',
  hallPlatformLabel: 'ARC REACTOR — ONLINE',
  hallInit: 'INITIALIZING SYSTEMS...',
  hallDeploy: 'DEPLOY',
  bootLine1: 'JARVIS online — all systems nominal',
  bootLine2: 'Loading armor configurations...',
  bootLine3: 'Scanning project database...',
  bootLine4: 'Initializing Hall of Armor...',
  bootLine5: 'Welcome back, Mr. Ergune.',

  // Nav (new pages)
  navExperience: 'Experience',
  navStack: 'Stack',
  navResearch: 'Research',
  navResume: 'Résumé',
  navHome: 'Home',

  // Experience page
  expBack: 'Home',
  expBadge: 'EXPERIENCE',
  expLabel: 'Experience',
  expSub: 'Hackathons, applied engineering, and ongoing research — framed as professional work.',
  expItems: [
    {
      org: 'BTK Hackathon 2026', role: 'Full-Stack & AI Developer', period: 'May 2026', type: 'Hackathon', accent: '#ff9f1c',
      summary: 'Built “Find The Best”, a shopping-intelligence platform for the e-commerce track.',
      points: [
        'Designed a multi-store price-comparison engine across Turkish and international marketplaces.',
        'Integrated Google Gemini for product analysis, buy-timing advice, and fake-review detection.',
        'Shipped a bilingual Next.js + FastAPI + PostgreSQL stack under Docker Compose.',
      ],
      tags: ['Next.js', 'FastAPI', 'Gemini', 'PostgreSQL'], link: '/project/find-the-best',
    },
    {
      org: 'Independent AI / ML Engineering', role: 'Builder & Open-Source Author', period: '2024 — Present', type: 'Applied', accent: '#00d4ff',
      summary: 'Self-directed engineering across computer vision, NLP, ML, systems, and full-stack.',
      points: [
        'Shipped 14 documented projects — from a bare-metal x86 OS to production ML pipelines.',
        'Trained a single-class YOLO11 detector to 90.3% mAP@50 on a self-collected dataset.',
        'Benchmarked a two-stage face-detection pipeline across 140,000 images with zero failures.',
        'Fine-tuned MarianMT for Turkish→English, lifting BLEU from ~36 to ~43.',
      ],
      tags: ['PyTorch', 'YOLO11', 'FastAPI', 'C'], link: '/project',
    },
    {
      org: 'Independent Research', role: 'Undergraduate Researcher', period: '2025 — Present', type: 'Research', accent: '#7c5cff',
      summary: 'Ongoing, in-progress studies growing out of applied projects (no published papers yet).',
      points: [
        'Stylometric signals for detecting AI-generated text in English and Turkish.',
        'A detect-and-verify method for recovering small and occluded faces.',
        'Fine-tuning strategies for low-resource Turkish→English machine translation.',
      ],
      tags: ['NLP', 'Computer Vision', 'Evaluation'], link: '/research',
    },
  ],

  // Tech Stack page
  stackBack: 'Home',
  stackBadge: 'TECH STACK',
  stackLabel: 'Tech Stack',
  stackSub: 'The tools I actually build with, grouped by domain — with an honest proficiency level for each.',
  stackLegend: 'Proficiency',
  stackLevels: ['Advanced', 'Proficient', 'Familiar'],
  stackGroups: [
    { category: 'AI / ML', accent: '#00d4ff', items: [
      { name: 'PyTorch', level: 2 }, { name: 'scikit-learn', level: 1 }, { name: 'Ultralytics YOLO11', level: 2 },
      { name: 'Hugging Face', level: 2 }, { name: 'MediaPipe', level: 2 }, { name: 'OpenCV', level: 2 }, { name: 'Google Gemini API', level: 2 },
    ]},
    { category: 'Backend', accent: '#00e5a0', items: [
      { name: 'FastAPI', level: 1 }, { name: 'REST APIs', level: 1 }, { name: 'PostgreSQL', level: 2 }, { name: 'Redis', level: 3 }, { name: 'Node.js', level: 3 },
    ]},
    { category: 'Frontend', accent: '#4d96ff', items: [
      { name: 'React', level: 1 }, { name: 'Next.js', level: 2 }, { name: 'Tailwind CSS', level: 2 }, { name: 'Vite', level: 2 }, { name: 'Streamlit', level: 2 },
    ]},
    { category: 'Languages', accent: '#ffd166', items: [
      { name: 'Python', level: 1 }, { name: 'JavaScript', level: 1 }, { name: 'TypeScript', level: 2 }, { name: 'C', level: 2 }, { name: 'x86 Assembly', level: 3 }, { name: 'Rust', level: 3 },
    ]},
    { category: 'DevOps', accent: '#ff6b35', items: [
      { name: 'Git & GitHub', level: 1 }, { name: 'Docker / Compose', level: 2 }, { name: 'GitHub Pages', level: 2 }, { name: 'Google Colab', level: 2 },
    ]},
    { category: 'Tools', accent: '#f472b6', items: [
      { name: 'Jupyter', level: 1 }, { name: 'SQLite', level: 2 }, { name: 'Tauri', level: 3 }, { name: 'Ruff / pre-commit', level: 2 }, { name: 'raylib', level: 2 },
    ]},
  ],

  // Research page
  researchBack: 'Home',
  researchBadge: 'RESEARCH',
  researchLabel: 'Research',
  researchSub: 'Independent, in-progress studies growing out of my applied work.',
  researchDisclaimer: 'These are ongoing, self-directed research projects — not published papers. Nothing here claims peer review or publication.',
  researchStatus: 'In Progress',
  researchMethods: 'Methods',
  researchExpected: 'Expected Outcomes',
  researchPdf: 'Read draft (PDF)',
  researchItems: [
    {
      title: 'Stylometric Detection of AI-Generated Text (EN + TR)',
      field: 'NLP · Stylometry', accent: '#ff4d6d',
      abstract: 'A study of language-independent statistical signals — repetition, burstiness, transition overuse, lexical variety — that separate human writing from formulaic, model-generated prose, with native pipelines for both English and Turkish.',
      methods: ['Six orthogonal stylometric analyzers over a shared tokenization', 'Turkish morphology via Zeyrek; English stemming via Porter', 'Weighted composite scoring calibrated on human vs LLM samples'],
      expected: 'A transparent, per-signal risk score that is interpretable rather than a black-box classifier, and a benchmark contrasting the two languages.',
    },
    {
      title: 'Detect-and-Verify for Small and Occluded Faces',
      field: 'Computer Vision', accent: '#00d4ff',
      abstract: 'An investigation into recovering faces that off-the-shelf short-range detectors miss, without inflating false positives — by pairing a permissive first pass with a zoom-in re-verification stage.',
      methods: ['Low-threshold regional candidate search over image halves', 'Zoom-in re-detection with a stricter confidence gate', 'IoU-based deduplication and a human-review queue for edge cases'],
      expected: 'Measurably higher recall on tiny faces at equal or better precision, quantified over a 140,000-image benchmark.',
    },
    {
      title: 'Fine-Tuning MarianMT for Low-Resource TR→EN Translation',
      field: 'Machine Translation', accent: '#4d96ff',
      abstract: 'A reproducible study of how far a lightweight, pretrained MarianMT model can be pushed on Turkish→English with a modest parallel corpus and a single free GPU.',
      methods: ['Cleaning and 80/10/10 splitting of the Tatoeba corpus', 'Tokenization comparison (char / word / byte / BPE)', 'fp16 fine-tuning with SacreBLEU evaluation and beam search'],
      expected: 'A documented BLEU lift (~36 → ~43) and a recipe others can rerun end-to-end on a Colab T4.',
    },
  ],

  // Resume page
  resumeBack: 'Home',
  resumeBadge: 'RÉSUMÉ',
  resumeTitle: 'Görkem Ergüne',
  resumeRole: 'Computer Engineering Student · AI Engineer',
  resumePrint: 'Save as PDF',
  resumeSummary: 'Second-year Computer Engineering student and self-directed AI engineer building computer-vision systems, machine-learning pipelines, and full-stack software — with a research-driven mindset and a habit of shipping.',
  resumeSecEducation: 'Education',
  resumeSecExperience: 'Experience',
  resumeSecProjects: 'Selected Projects',
  resumeSecSkills: 'Skills',
  resumeSecResearch: 'Research (in progress)',
  resumeEduSchool: 'B.Sc. Computer Engineering',
  resumeEduDetail: 'Undergraduate · 2025 — Present',

  // Case study
  csBack: 'Project',
  csBadge: 'CASE STUDY',
  csRead: 'Read Case Study',
  csProblem: 'Problem',
  csSolution: 'Solution',
  csArchitecture: 'Architecture',
  csChallenges: 'Challenges',
  csResults: 'Results',
  csLessons: 'Lessons Learned',
  csNone: 'No case study for this project yet.',

  // Blog detail content
  blogPosts: {
    'calculus-aa': {
      title: 'How to Get AA in Calculus 1-2',
      category: 'University', date: 'Jun 2026', readTime: '4 min',
      description: 'The habits — not the talent — that carried me through two semesters of calculus with a top grade.',
      body: [
        'Calculus has a reputation for separating the “math people” from everyone else. After two semesters, I’m convinced that reputation is mostly wrong. The students who scored highest were rarely the most naturally gifted — they were the ones who treated calculus like a skill to be practiced daily rather than a talent you either have or don’t.',
        'The single biggest lever was doing problems, not reading them. I could watch a lecture, nod along, and feel like I understood limits or integration by parts — right until a blank problem stared back at me. Understanding a solution and being able to produce it are two completely different abilities, and only one of them shows up on the exam. So I front-loaded practice: a handful of problems every single day, not a marathon the night before.',
        'The second was building the chain, not memorizing links. Derivatives feed into integrals; limits underpin both. When I skipped a shaky topic, it quietly sabotaged everything downstream. Going back to patch the weak link always paid off more than pushing ahead.',
        'The rest is unglamorous: redo the problems you got wrong until they’re boring, keep a page of the tricks that keep reappearing, and ask early when something doesn’t click. AA isn’t a lightning strike of talent — it’s a hundred small, consistent reps.',
      ],
    },
    'python-from-scratch': {
      title: 'Python from Scratch',
      category: 'Programming', date: 'May 2026', readTime: '4 min',
      description: 'A beginner-friendly path into Python: what to learn first, and what to happily ignore for now.',
      body: [
        'Python is the language I recommend to anyone starting out, and not because it’s trendy. It gets out of your way. You can express an idea in a line or two, run it instantly, and see whether you were right — which is exactly the fast feedback a beginner needs to stay motivated.',
        'If I were starting over, I’d spend the first weeks on the boring fundamentals until they feel automatic: variables, strings and numbers, if/else, loops, lists and dictionaries, and functions. That’s genuinely most of the language you’ll use day to day. Resist the urge to jump into frameworks or fancy libraries before these are second nature — you’ll only be fighting two unknowns at once.',
        'The mistake I see most often is passive learning: watching tutorial after tutorial and mistaking recognition for ability. The fix is to type everything yourself, break it on purpose, and build tiny things — a number guessing game, a to-do list, a script that renames your files. Small finished projects teach more than any playlist.',
        'What can you happily ignore at first? Decorators, metaclasses, async, and the deep object-oriented rabbit holes. They matter eventually, not now. Learn enough to be dangerous, build something real, and let the gaps in your knowledge pull you forward.',
      ],
    },
    'c-from-scratch': {
      title: 'C from Scratch',
      category: 'Programming', date: 'Apr 2026', readTime: '4 min',
      description: 'Pointers, memory, and the compiler that finally taught me how a computer actually works.',
      body: [
        'After the comfort of Python, C felt like someone had taken away the safety rails. Suddenly I had to think about memory, types, and the fact that the machine will do exactly what I say — even when what I said makes no sense. It was frustrating, and it was the most valuable thing I learned all year.',
        'C teaches you what higher-level languages hide. A pointer is just an address — a number that says “the thing you want lives over here.” Once that clicked, a huge amount of computing stopped being magic: how arrays really work, why passing something to a function copies it, what the stack and the heap actually are. Python hadn’t lied to me, exactly, but it had spared me the truth.',
        'The compiler becomes your strict, humourless teacher. A missing semicolon or the wrong type gets rejected on the spot. Segmentation faults punish sloppy memory handling without mercy. Annoying at first — but that strictness forces a mental model of the machine you never quite build in a forgiving language.',
        'My advice: don’t learn C to build your next app. Learn it to understand the ground everything else stands on. Write small programs, draw the memory on paper, and let the pointers hurt a little. Everything above C makes more sense afterward.',
      ],
    },
    'should-you-study-cs': {
      title: 'Should You Study Computer Engineering?',
      category: 'Career', date: 'Mar 2026', readTime: '4 min',
      description: 'An honest look at the field — who it fits, who it frustrates, and what nobody tells you first.',
      body: [
        'People ask me whether they should study computer engineering, usually hoping for a clean yes or no. The honest answer is: it depends on whether you enjoy being confused. That sounds like a joke, but it’s the most useful filter I’ve found. This field is a permanent state of not-quite-understanding-yet, and the people who thrive are the ones who find that exciting rather than exhausting.',
        'What nobody tells you first is how much of the work is problem solving, not coding. Writing code is the easy, late part. The real job is breaking a fuzzy problem into pieces small enough to solve, and being comfortable when your first three attempts don’t work. If debugging a stubborn error feels like a puzzle rather than a punishment, that’s a very good sign.',
        'It fits people who are curious, patient, and quietly stubborn — who like building things and don’t need instant results. It frustrates people who want a fixed syllabus of facts to memorize, because the tools change constantly and the answer is often “it depends.”',
        'You don’t need to be a math genius or to have coded since age ten. You need persistence and genuine interest. If you have those, the rest is learnable — and the field will keep handing you interesting problems for as long as you want them.',
      ],
    },
  },
};

const tr = {
  // Nav
  navAbout: 'Hakkımda',
  navJourney: 'Yolculuk',
  navFocus: 'Odak',
  navBlog: 'Blog',
  navContact: 'İletişim',

  // Hero
  heroChip: 'Portfolyo / Sürüm 2.10 / 2026',
  heroRole: 'ROL',
  heroRoleValue: '2. sınıf Bilgisayar Mühendisliği öğrencisi',
  heroBasedIn: 'KONUM',
  heroBasedInValue: 'İstanbul, Türkiye',
  heroStatus: 'DURUM',
  heroStatusValue: 'Şu an kendimi geliştirmeye odaklandım',
  heroTagline1: 'Kendini kanıtlamaya değil, geliştirmeye odaklan',
  heroTagline2: 'Her gün biraz daha iyi olmaya çalışıyorum. — ',
  heroUnhurried: 'hırs mı, disiplin mi?',

  // Marquee
  marquee: ['Portfolyo', 'Blog', 'Odak', 'Anlar', 'Günlük', 'Saha Rehberi', 'Arşiv'],

  // Intro (home identity section)
  introKicker: 'KİMLİK // ZIRHIN ARDINDAKİ',
  introLeadPre: 'Ben Görkem — ikinci sınıf Bilgisayar Mühendisliği öğrencisiyim ve ',
  introLeadEm: 'merakı çalışan sistemlere',
  introLeadPost: ' dönüştürüyorum. Gören, okuyan ve akıl yürüten yapay zekâlar geliştiriyorum: nesne dedektörleri, çeviri modelleri, oltalama sınıflandırıcıları — ve bunları insanların eline veren tam yığın uygulamalar.',
  introBody: 'Üreterek öğreniyorum. Depodaki her zırh; tasarladığım, eğittiğim, bozup yeniden inşa ettiğim bir şey — doğrudan donanımda çalışan işletim sistemlerinden üretim seviyesi ML işlem hatlarına kadar. Amacım basit: işi kendisinden önce konuşan türden bir yapay zekâ mühendisi olmak.',
  introRolesLabel: 'ÇALIŞMA ALANLARI',
  introRoles: ['Yapay Zekâ Mühendisi', 'Makine Öğrenmesi', 'Bilgisayarlı Görü', 'Derin Öğrenme', 'Tam Yığın Geliştirme', 'Açık Kaynak', 'Araştırma'],
  introStats: [
    { n: 14, suffix: '', label: 'Yayınlanan proje' },
    { n: 25, suffix: '+', label: 'Kullanılan teknoloji' },
    { n: 99, suffix: '%', label: 'En yüksek model F1' },
    { n: 6, suffix: '', label: 'Keşfedilen alan' },
  ],
  introCtaProjects: 'Cephaneliği Keşfet',
  introCtaBlog: 'Blog’u Oku',
  introCtaContact: 'Bir sohbet başlat',

  // Home hero + sections
  heroTagline: 'YAPAY ZEKÂ MÜHENDİSİ — GELİŞİM HÂLİNDE',
  heroSubtext: 'Araştırma odaklı bir yaklaşımla bilgisayarlı görü sistemleri, makine öğrenmesi işlem hatları ve akıllı yazılımlar geliştiriyorum.',
  ctaResume: 'CV’yi İndir',
  ctaViewWork: 'Çalışmalar',

  metricsKicker: 'ÖNE ÇIKAN METRİKLER // CANLI TELEMETRİ',
  mProjects: 'Öne Çıkan Projeler',
  mRepos: 'Public Depolar',
  mCommits: 'GitHub Commit',
  mResearch: 'Araştırma Projesi (devam eden)',
  mModels: 'Yayınlanan YZ Modeli',
  mImages: 'İşlenen Görsel',
  mDataset: 'Özel Veri Kümesi Görseli',
  mF1: 'En İyi Model F1 Skoru',
  metricLive: 'CANLI',

  featuredKicker: 'ÖNE ÇIKAN PROJE',
  featuredCta: 'Vaka analizini oku',

  buildingKicker: 'ŞU AN GELİŞTİRİLENLER',
  buildingSub: 'Aktif denemeler ve devam eden çalışmalar',
  buildingItems: [
    { title: 'LLM Denemeleri', desc: 'Açık modeller çevresinde prompt, ince ayar ve küçük ajan araçları.', status: 'Keşif' },
    { title: 'Bilgisayarlı Görü', desc: 'Tek sınıflı YOLO’nun ötesinde özel dedektörler ve tespit hatları.', status: 'Geliştirme' },
    { title: 'Writing Analyzer', desc: 'İki dilli stilometrik risk motorunu ve API’sini genişletme.', status: 'İyileştirme' },
  ],

  activityKicker: 'GITHUB ETKİNLİĞİ // SON DEPOLAR',
  activitySub: 'Doğrudan GitHub’dan canlı çekilir — her zaman güncel',
  activityCta: 'GitHub profilini gör',
  activityUpdated: 'Güncellendi',
  activityStars: 'yıldız',

  // About
  aboutLabel: 'Hakkımda',
  aboutLead: 'Bilgisayar mühendisliği öğrencisiyim; bir şeyler üretiyor, süreci de yazıyorum.',
  statCurrently: 'Şu anda',
  statCurrentlyVal: 'Üretiyor & yazıyorum',
  statPreviously: 'Daha önce',
  statPreviouslyVal: 'Topluluk / Takım lideri',
  statTools: 'Araçlar',
  statToolsVal: 'Python · React · Node',
  statLanguages: 'Diller',
  statLanguagesVal: 'TR · EN',
  statMail: 'E-posta',

  // Journey
  journeyLabel: 'Hayat akışı',
  journeySub: 'Kısa bir kronoloji',
  journeyItems: [
    { year: 'Eyl 2024 – Ağu 2025', title: 'İngilizce Hazırlık', body: 'İngilizce temelimi oluşturdum. Günlük kullanımda akıcı konuşma seviyesine ulaştım. Python’a ve temel problem çözmeye başladım. LLM kavramlarıyla ilk kez tanıştım.' },
    { year: 'Eyl 2025 – Haz 2026', title: 'Bilgisayar Mühendisliği 1/4', body: 'Temel bilgisayar bilimi yolculuğuma başladım. C öğrendim, algoritma becerilerimi geliştirdim. Makine Öğrenmesi ve Derin Öğrenme temellerini çalıştım. Küçük Python/C projeleri geliştirdim. LLM fikirleri üzerinde denemelere başladım. Sosyal medya, GitHub ve LinkedIn etkinliğimi artırdım.' },
    { year: 'Eyl 2026 – Haz 2027', title: 'Bilgisayar Mühendisliği 2/4', body: 'Çok yakında...' },
    { year: 'Eyl 2027 – Haz 2028', title: 'Bilgisayar Mühendisliği 3/4', body: 'Çok yakında...' },
    { year: 'Eyl 2028 – Haz 2029', title: 'Bilgisayar Mühendisliği 4/4', body: 'Çok yakında...' },
  ],

  // Focus
  focusLabel: 'Odak',
  focusSub: 'Şu sıralar nelere odaklanıyorum',
  focusItems: [
    { label: 'Okuma', value: 'Kitap — Yazar' },
    { label: 'Geliştirme', value: 'Sessiz sedasız ilerleyen bir proje' },
    { label: 'Öğrenme', value: 'Her gün bir saat, yeni bir şey' },
    { label: 'Dinleme', value: 'Tekrar tekrar dinlenen bir albüm' },
  ],

  // Blog
  blogLabel: 'Blog',
  blogSub: 'Yapay zekâ, mühendislik ve arkasındaki öğrencilik üzerine notlar',
  blogItems: [
    { category: 'Üniversite', date: 'Haz 2026', readTime: '4 dk', title: 'Calculus 1-2’de Nasıl AA Alınır', excerpt: 'İki dönem calculus’ı yüksek notla bitirmemi sağlayan şey yetenek değil, alışkanlıklardı.', slug: 'calculus-aa' },
    { category: 'Programlama', date: 'May 2026', readTime: '4 dk', title: 'Sıfırdan Python', excerpt: 'Yeni başlayanlar için Python’a giriş: önce ne öğrenmeli, şimdilik neyi gönül rahatlığıyla görmezden gelmeli.', slug: 'python-from-scratch' },
    { category: 'Programlama', date: 'Nis 2026', readTime: '4 dk', title: 'Sıfırdan C', excerpt: 'İşaretçiler, bellek ve bir bilgisayarın gerçekte nasıl çalıştığını bana nihayet öğreten derleyici.', slug: 'c-from-scratch' },
    { category: 'Kariyer', date: 'Mar 2026', readTime: '4 dk', title: 'Bilgisayar Mühendisliği Okumalı mısın?', excerpt: 'Alana dürüst bir bakış — kime uyar, kimi bunaltır ve kimsenin önceden söylemediği şey nedir.', slug: 'should-you-study-cs' },
  ],

  // Puzzle
  puzzleLabel: 'Bulmaca',
  puzzleSub: 'Algoritmayı çözebilir misin?',
  puzzleIntro: 'Her biri 1 ile 10 arasında bir değer saklayan 10 renkli top var. Her turda kalan kümenin en küçüğünü bul. Karşılaştırmalar yaparak sıralamayı çıkar.',
  puzzleRound: 'TUR',
  puzzleComparisons: 'KARŞILAŞTIRMA',
  puzzleLives: 'CAN',
  puzzleCompare: 'Karşılaştır',
  puzzleClaim: 'En Küçüğü Seç',
  puzzleRemaining: 'Kalan',
  puzzleSorted: 'Sıralanan',
  puzzleCompLog: 'Karşılaştırma geçmişi',
  puzzleSelectTwo: 'Karşılaştırmak için iki topa tıkla',
  puzzleSelectOne: 'İlk topa tıkla',
  puzzleSelectSecond: 'Şimdi ikinci topa tıkla',
  puzzleSelectMin: 'En küçük değere sahip topa tıkla',
  puzzleCorrect: 'Doğru!',
  puzzleWrong: 'Yanlış!',
  puzzleHadValue: 'topunun değeri:',
  puzzleHasSmaller: 'daha küçük bir değere sahip',
  puzzleLifeLost: '−1 can',
  puzzleWon: '10 topun hepsini sıraladın!',
  puzzleLost: 'Oyun bitti! Canların tükendi.',
  puzzleScore: 'Skor',
  puzzleReset: 'Yeni Oyun',
  puzzleReveal: 'İyi Sıralama İlkesi',
  puzzleHide: 'Gizle',
  puzzleExTitle: 'İyi Sıralama İlkesi (Well-Ordering Principle)',
  puzzleExP1: 'Pozitif tam sayıların boş olmayan her alt kümesinin bir en küçük elemanı vardır.',
  puzzleExP2: 'Bu bulmacada, kalan her alt kümenin en küçüğünü bularak bu ilkeyi doğruladın — aslında seçmeli sıralama (selection sort) uyguladın. İlke, her zaman bir en küçük elemanın var olduğunu garanti eder; bu yüzden görev her zaman çözülebilir.',
  puzzleExP3: 'En iyi strateji: geçişlilik özelliğini kullan. A < B ve B < C ise A < C’dir — A ile C’yi ayrıca karşılaştırmaya gerek yok.',
  puzzlePlayAgain: 'Tekrar Oyna',

  // Contact
  contactLabel: 'İletişim',
  contactLine1: 'İstediğin zaman',
  contactLine1Em: 'yaz',
  contactLine2: 'İş birliğine açığım',

  // Footer
  footerBuilt: 'Acele etmeden, elle yapıldı.',

  // Nav Fun
  navFun: 'Eğlence',

  // Fun Hub
  funLabel: 'Eğlence',
  funSub: 'Arkadaşlarına göndermelik sürprizler, kafa dağıtmalık bulmacalar',
  funBack: 'Ana Sayfa',
  funBadge: 'EĞLENCE',
  funSorryTitle: 'Özür Dilerim',
  funSorryDesc: 'Bir arkadaşına gönder ve barışın.',
  funBirthdayTitle: 'Doğum Günü',
  funBirthdayDesc: 'Arkadaşın için özel bir doğum günü pastası hazırla.',
  funHangmanTitle: 'Adam Asmaca',
  funHangmanDesc: 'Bilgisayar terimlerini harf harf tahmin et.',
  funPuzzleTitle: 'Bulmaca',
  funPuzzleDesc: 'Sıralama algoritmasını çözebilir misin?',
  funHanoiTitle: 'Hanoi Kulesi',
  funHanoiDesc: 'Tüm diskleri son çubuğa taşı.',
  funMothersDayTitle: 'Anneler Günü',
  funMothersDayDesc: 'Annen için çiçekli ve sevgi dolu bir sürpriz.',
  funGoOutTitle: 'Dışarı Çıkalım mı?',
  funGoOutDesc: 'Bir arkadaşına gönder, onu dışarı çıkar.',

  // Mother's Day Page
  mothersDayTitle: 'Anneler Günün Kutlu Olsun,\nCanım Annem',
  mothersDaySub: 'Dünyanın en güzel çiçeği sensin',
  mothersDayMessage: 'Her şey için teşekkür ederim. Hayatımın ışığı, kalbimin sıcaklığısın. Seni kelimelerle anlatamayacağım kadar çok seviyorum.',

  // Go Out Page
  goOutPageTitle: 'Dışarı Çıkalım mı?',
  goOutPageSub: 'Hadi, dışarı çıkalım!',
  goOutYes: 'Evet!',
  goOutNo: 'Hayır',
  goOutYayTitle: 'Hadi Gidelim!',
  goOutYayText: 'Hazırlan, dışarı çıkıyoruz! Dünya bizi bekliyor! ☀️',

  // Hanoi Page
  hanoiPageBack: 'Eğlence',
  hanoiLabel: 'Hanoi Kulesi',
  hanoiSub: 'Klasik özyineleme bulmacası',
  hanoiSelectDisks: 'Disk sayısını seç',
  hanoiDisks: 'DİSK',
  hanoiStart: 'Başla',
  hanoiMoves: 'HAMLE',
  hanoiMaxMoves: 'MAKS',
  hanoiSelectSource: 'Üstteki diski almak için bir çubuğa tıkla',
  hanoiSelectTarget: 'Şimdi diski yerleştirmek için bir çubuğa tıkla',
  hanoiInvalidMove: 'Büyük bir disk küçük bir diskin üzerine konamaz',
  hanoiEmptyPeg: 'Bu çubuk boş',
  hanoiWon: 'Çözdün!',
  hanoiLost: 'Hamle hakkın bitti!',
  hanoiWonDesc: 'Tüm diskler son çubuğa taşındı.',
  hanoiLostDesc: 'Bitiremeden tüm hamlelerini kullandın.',
  hanoiMovesUsed: 'Kullanılan hamle',
  hanoiOptimal: 'En iyi',
  hanoiNewGame: 'Yeni Oyun',
  hanoiPlayAgain: 'Tekrar Oyna',
  hanoiPeg: 'Çubuk',
  hanoiReveal: 'Nasıl çalışır?',
  hanoiHide: 'Gizle',
  hanoiExTitle: 'Hanoi Kulesi ve Özyineleme',
  hanoiExP1: 'n diskli Hanoi Kulesi’ni çözmek için gereken en az hamle sayısı 2ⁿ − 1’dir.',
  hanoiExP2: 'Özyinelemeli strateji: n−1 diski yardımcı çubuğa taşı, en büyük diski hedefe taşı, ardından n−1 diski yardımcı çubuktan hedefe taşı.',
  hanoiExP3: 'Yardımcı: 2. çubuk — Hedef: 3. çubuk. Bu bulmaca üstel büyümeyi gösterir — eklenen her disk, en az hamle sayısını iki katına çıkarıp bir artırır.',

  // Sorry Page
  sorryPageTitle: 'Özür Dilerim...',
  sorryPageSub: 'Barışalım mı?',
  sorryYes: 'Evet',
  sorryNo: 'Hayır',
  sorryYayTitle: 'Yaşasın!',
  sorryYayText: 'Barıştık! Bir daha hiç kavga etmeyelim! 🎉',

  // Birthday Page
  bdayPageTitle: 'Doğum Günü Kutlaması!',
  bdayNameLabel: 'Arkadaşının adı',
  bdayNamePlaceholder: 'İsim gir...',
  bdayAgeLabel: 'Yaş',
  bdayAgePlaceholder: 'Yaş gir...',
  bdayCreate: 'Pasta Oluştur!',
  bdayHappy: 'Doğum Günün Kutlu Olsun',
  bdayWish: 'Harika bir yıl geçirmen dileğiyle!',
  bdayShare: 'Paylaş',
  bdayReset: 'Yenisini Oluştur',
  bdayCandles: 'mum',

  // Hangman Page
  hangmanPageTitle: 'Adam Asmaca',
  hangmanPageSub: 'Bilgisayar Mühendisliği — Kolay Seviye',
  hangmanWon: 'Bildin!',
  hangmanLost: 'Oyun Bitti!',
  hangmanTheWord: 'Doğru kelime',
  hangmanNewGame: 'Yeni Oyun',
  hangmanRemaining: 'Kalan hak',
  hangmanUsed: 'Kullanılan harfler',
  hangmanHint: 'İpucu',

  // Puzzle Page
  puzzlePageBack: 'Eğlence',

  // Blog Hub
  blogHubBack: 'Ana Sayfa',

  // Nav
  navProject: 'Proje',
  navLifeFlow: 'Hayat Akışı',

  // Hero buttons
  heroBtnBlog: 'Blog',
  heroBtnFun: 'Eğlence',
  heroBtnContact: 'İletişim',
  heroBtnProject: 'Proje',
  heroBtnLifeFlow: 'Hayat Akışı',

  // Contact Page
  contactBack: 'Ana Sayfa',
  contactBadge: 'İLETİŞİM',
  contactCreator: 'İÇERİK ÜRETİCİ',

  // Journey Page
  journeyBack: 'Ana Sayfa',
  journeyBadge: 'HAYAT AKIŞI',
  journeyStatusDone: 'TAMAMLANDI',
  journeyStatusActive: 'DEVAM EDİYOR',
  journeyStatusLocked: 'KİLİTLİ',
  journeyPhase: 'AŞAMA',
  journeyTimeline: 'GÖREV ZAMAN ÇİZELGESİ',
  journeySoon: 'Şifreli — sırası gelince açılır.',

  // Project Page
  projectBack: 'Ana Sayfa',
  projectDetailBack: 'Zırh Deposu',
  projectBadge: 'ZIRH DEPOSU',
  projectLabel: 'Cephanelik',
  projectSub: 'On dört zırh, her biri bir proje. Özellikleri, mimariyi ve sonuçları incelemek için bir kapsül aç.',
  projectOpen: 'Projeyi Aç',

  // Project Detail
  sysOnline: 'SİSTEM ÇEVRİMİÇİ',
  pdVisualFeed: 'Görsel Akış',
  pdOverview: 'Genel Bakış',
  pdHighlights: 'Öne Çıkan Özellikler',
  pdStack: 'Teknoloji Yığını',
  pdArchitecture: 'Mimari',
  pdResults: 'Sonuçlar',
  pdSource: 'Kaynak Kodu',
  pdViewGithub: 'GitHub’da Görüntüle',
  pdOpenRepo: 'Depoyu Aç',
  pdSourceNote: 'Kaynak kodun tamamı, README ve derleme talimatları.',
  pdNotFoundTitle: 'Zırh bulunamadı',
  pdNotFoundDesc: 'Bu zırh depoda yok. Zırh Deposu’na geri dön.',
  stackLabels: {
    'Languages': 'Programlama Dilleri',
    'Libraries': 'Kütüphaneler',
    'Frameworks': 'Uygulama Çatıları',
    'Tools': 'Araçlar',
    'AI Models': 'Yapay Zekâ Modelleri',
  },

  // Blog detail
  rdBack: 'Blog',
  rdBadge: 'BLOG',
  rdNotFoundTitle: 'Sayfa bulunamadı',
  rdNotFoundDesc: 'Bu blog yazısı henüz mevcut değil.',
  rdBottomNote: 'Yer tutucu yazı — tonu belirlemek için yazıldı. Gerçek içerik yakında bunun yerini alacak.',
  rdBottomLink: 'Tüm blog yazılarına dön',
  rdNextUp: 'Sıradaki',
  blogSoon: 'YAKINDA',

  // Hall of Armor
  hallStatusLeft: 'ZIRH DEPOSU',
  hallStatusCenter: '41.0082° K · 28.9784° D · İSTANBUL',
  hallPlatformLabel: 'ARK REAKTÖRÜ — ÇEVRİMİÇİ',
  hallInit: 'SİSTEMLER BAŞLATILIYOR...',
  hallDeploy: 'BAŞLAT',
  bootLine1: 'JARVIS çevrimiçi — tüm sistemler normal',
  bootLine2: 'Zırh konfigürasyonları yükleniyor...',
  bootLine3: 'Proje veritabanı taranıyor...',
  bootLine4: 'Zırh Deposu başlatılıyor...',
  bootLine5: 'Hoş geldiniz, Bay Ergüne.',

  // Nav (new pages)
  navExperience: 'Deneyim',
  navStack: 'Teknolojiler',
  navResearch: 'Araştırma',
  navResume: 'CV',
  navHome: 'Ana Sayfa',

  // Experience page
  expBack: 'Ana Sayfa',
  expBadge: 'DENEYİM',
  expLabel: 'Deneyim',
  expSub: 'Hackathonlar, uygulamalı mühendislik ve devam eden araştırmalar — profesyonel çalışma olarak.',
  expItems: [
    {
      org: 'BTK Hackathon 2026', role: 'Full-Stack & Yapay Zekâ Geliştiricisi', period: 'Mayıs 2026', type: 'Hackathon', accent: '#ff9f1c',
      summary: 'E-ticaret kategorisi için “Find The Best” alışveriş zekâsı platformunu geliştirdim.',
      points: [
        'Türk ve uluslararası pazaryerlerinde çoklu mağaza fiyat karşılaştırma motoru tasarladım.',
        'Ürün analizi, alım zamanlaması ve sahte yorum tespiti için Google Gemini’yi entegre ettim.',
        'İki dilli bir Next.js + FastAPI + PostgreSQL yığınını Docker Compose ile yayına aldım.',
      ],
      tags: ['Next.js', 'FastAPI', 'Gemini', 'PostgreSQL'], link: '/project/find-the-best',
    },
    {
      org: 'Bağımsız Yapay Zekâ / ML Mühendisliği', role: 'Geliştirici & Açık Kaynak Yazarı', period: '2024 — Günümüz', type: 'Uygulamalı', accent: '#00d4ff',
      summary: 'Bilgisayarlı görü, NLP, ML, sistemler ve full-stack alanlarında kendi kendine yönlendirdiğim mühendislik.',
      points: [
        'Doğrudan donanımda çalışan x86 işletim sisteminden üretim ML hatlarına 14 belgeli proje yayınladım.',
        'Kendi topladığım veri kümesinde tek sınıflı YOLO11 dedektörünü %90,3 mAP@50’ye eğittim.',
        'İki aşamalı yüz tespiti hattını 140.000 görselde sıfır hatayla test ettim.',
        'MarianMT’yi Türkçe→İngilizce için ince ayarlayıp BLEU’yu ~36’dan ~43’e çıkardım.',
      ],
      tags: ['PyTorch', 'YOLO11', 'FastAPI', 'C'], link: '/project',
    },
    {
      org: 'Bağımsız Araştırma', role: 'Lisans Araştırmacısı', period: '2025 — Günümüz', type: 'Araştırma', accent: '#7c5cff',
      summary: 'Uygulamalı projelerden doğan, devam eden çalışmalar (henüz yayınlanmış makale yok).',
      points: [
        'İngilizce ve Türkçede yapay zekâ üretimi metni tespit için stilometrik sinyaller.',
        'Küçük ve kapalı yüzleri yakalamak için tespit-et-doğrula yöntemi.',
        'Düşük kaynaklı Türkçe→İngilizce çeviri için ince ayar stratejileri.',
      ],
      tags: ['NLP', 'Bilgisayarlı Görü', 'Değerlendirme'], link: '/research',
    },
  ],

  // Tech Stack page
  stackBack: 'Ana Sayfa',
  stackBadge: 'TEKNOLOJİLER',
  stackLabel: 'Teknoloji Yığını',
  stackSub: 'Gerçekten kullandığım araçlar, alanlara göre gruplanmış — her biri için dürüst bir yetkinlik seviyesiyle.',
  stackLegend: 'Yetkinlik',
  stackLevels: ['İleri', 'Yetkin', 'Aşina'],
  stackGroups: [
    { category: 'Yapay Zekâ / ML', accent: '#00d4ff', items: [
      { name: 'PyTorch', level: 2 }, { name: 'scikit-learn', level: 1 }, { name: 'Ultralytics YOLO11', level: 2 },
      { name: 'Hugging Face', level: 2 }, { name: 'MediaPipe', level: 2 }, { name: 'OpenCV', level: 2 }, { name: 'Google Gemini API', level: 2 },
    ]},
    { category: 'Backend', accent: '#00e5a0', items: [
      { name: 'FastAPI', level: 1 }, { name: 'REST API', level: 1 }, { name: 'PostgreSQL', level: 2 }, { name: 'Redis', level: 3 }, { name: 'Node.js', level: 3 },
    ]},
    { category: 'Frontend', accent: '#4d96ff', items: [
      { name: 'React', level: 1 }, { name: 'Next.js', level: 2 }, { name: 'Tailwind CSS', level: 2 }, { name: 'Vite', level: 2 }, { name: 'Streamlit', level: 2 },
    ]},
    { category: 'Diller', accent: '#ffd166', items: [
      { name: 'Python', level: 1 }, { name: 'JavaScript', level: 1 }, { name: 'TypeScript', level: 2 }, { name: 'C', level: 2 }, { name: 'x86 Assembly', level: 3 }, { name: 'Rust', level: 3 },
    ]},
    { category: 'DevOps', accent: '#ff6b35', items: [
      { name: 'Git & GitHub', level: 1 }, { name: 'Docker / Compose', level: 2 }, { name: 'GitHub Pages', level: 2 }, { name: 'Google Colab', level: 2 },
    ]},
    { category: 'Araçlar', accent: '#f472b6', items: [
      { name: 'Jupyter', level: 1 }, { name: 'SQLite', level: 2 }, { name: 'Tauri', level: 3 }, { name: 'Ruff / pre-commit', level: 2 }, { name: 'raylib', level: 2 },
    ]},
  ],

  // Research page
  researchBack: 'Ana Sayfa',
  researchBadge: 'ARAŞTIRMA',
  researchLabel: 'Araştırma',
  researchSub: 'Uygulamalı çalışmalarımdan doğan, bağımsız ve devam eden araştırmalar.',
  researchDisclaimer: 'Bunlar devam eden, kendi kendine yürütülen araştırma projeleridir — yayınlanmış makale değildir. Hiçbiri hakemlik ya da yayın iddiası taşımaz.',
  researchStatus: 'Devam Ediyor',
  researchMethods: 'Yöntemler',
  researchExpected: 'Beklenen Sonuçlar',
  researchPdf: 'Taslağı oku (PDF)',
  researchItems: [
    {
      title: 'Yapay Zekâ Üretimi Metnin Stilometrik Tespiti (EN + TR)',
      field: 'NLP · Stilometri', accent: '#ff4d6d',
      abstract: 'İnsan yazısını kalıplaşmış, model üretimi metinden ayıran dilden bağımsız istatistiksel sinyallerin — tekrar, ritim (burstiness), geçiş aşırı kullanımı, kelime çeşitliliği — hem İngilizce hem Türkçe için yerel işlem hatlarıyla incelenmesi.',
      methods: ['Ortak tokenizasyon üzerinde altı bağımsız stilometrik analizci', 'Türkçe için Zeyrek biçimbilimi, İngilizce için Porter kök bulma', 'İnsan ve LLM örnekleriyle kalibre edilmiş ağırlıklı bileşik puanlama'],
      expected: 'Kara kutu bir sınıflandırıcı yerine yorumlanabilir, sinyal bazlı bir risk skoru ve iki dili karşılaştıran bir kıyaslama.',
    },
    {
      title: 'Küçük ve Kapalı Yüzler için Tespit-et-Doğrula',
      field: 'Bilgisayarlı Görü', accent: '#00d4ff',
      abstract: 'Hazır kısa menzilli dedektörlerin kaçırdığı yüzleri, hatalı tespitleri artırmadan yakalamanın araştırılması — esnek bir ilk geçişi yakınlaştırmalı bir yeniden doğrulama aşamasıyla eşleyerek.',
      methods: ['Görsel yarıları üzerinde düşük eşikli bölgesel aday araması', 'Daha katı güven eşiğiyle yakınlaştırmalı yeniden tespit', 'IoU tabanlı tekilleştirme ve sınır durumları için insan inceleme kuyruğu'],
      expected: 'Küçük yüzlerde eşit ya da daha iyi kesinlikle ölçülebilir biçimde daha yüksek duyarlılık; 140.000 görsellik test üzerinde ölçülmüş.',
    },
    {
      title: 'Düşük Kaynaklı TR→EN Çeviri için MarianMT İnce Ayarı',
      field: 'Makine Çevirisi', accent: '#4d96ff',
      abstract: 'Hafif, önceden eğitilmiş bir MarianMT modelinin, mütevazı bir paralel derlem ve tek bir ücretsiz GPU ile Türkçe→İngilizce çeviride ne kadar ileri gidebileceğinin yeniden üretilebilir bir çalışması.',
      methods: ['Tatoeba derleminin temizlenmesi ve %80/%10/%10 bölünmesi', 'Tokenizasyon karşılaştırması (karakter / kelime / bayt / BPE)', 'SacreBLEU değerlendirmesi ve ışın aramasıyla fp16 ince ayar'],
      expected: 'Belgelenmiş bir BLEU artışı (~36 → ~43) ve başkalarının Colab T4’te uçtan uca çalıştırabileceği bir reçete.',
    },
  ],

  // Resume page
  resumeBack: 'Ana Sayfa',
  resumeBadge: 'CV',
  resumeTitle: 'Görkem Ergüne',
  resumeRole: 'Bilgisayar Mühendisliği Öğrencisi · Yapay Zekâ Mühendisi',
  resumePrint: 'PDF olarak kaydet',
  resumeSummary: 'İkinci sınıf Bilgisayar Mühendisliği öğrencisi ve kendi kendine yönlenen bir yapay zekâ mühendisi; araştırma odaklı bir yaklaşımla bilgisayarlı görü sistemleri, makine öğrenmesi işlem hatları ve full-stack yazılım geliştiriyorum — ve üretmeyi alışkanlık hâline getirdim.',
  resumeSecEducation: 'Eğitim',
  resumeSecExperience: 'Deneyim',
  resumeSecProjects: 'Seçili Projeler',
  resumeSecSkills: 'Yetenekler',
  resumeSecResearch: 'Araştırma (devam eden)',
  resumeEduSchool: 'Bilgisayar Mühendisliği Lisans',
  resumeEduDetail: 'Lisans · 2025 — Günümüz',

  // Case study
  csBack: 'Proje',
  csBadge: 'VAKA ANALİZİ',
  csRead: 'Vaka Analizini Oku',
  csProblem: 'Problem',
  csSolution: 'Çözüm',
  csArchitecture: 'Mimari',
  csChallenges: 'Zorluklar',
  csResults: 'Sonuçlar',
  csLessons: 'Çıkarımlar',
  csNone: 'Bu proje için henüz vaka analizi yok.',

  // Blog detail content
  blogPosts: {
    'calculus-aa': {
      title: 'Calculus 1-2’de Nasıl AA Alınır',
      category: 'Üniversite', date: 'Haz 2026', readTime: '4 dk',
      description: 'İki dönem calculus’ı yüksek notla bitirmemi sağlayan şey yetenek değil, alışkanlıklardı.',
      body: [
        'Calculus’ın “matematikçiler” ile geri kalan herkesi ayırdığına dair bir ünü vardır. İki dönemin ardından bu ünün büyük ölçüde yanlış olduğuna ikna oldum. En yüksek notu alan öğrenciler nadiren en yetenekli olanlardı — onlar calculus’a, sahip olduğun ya da olmadığın bir yetenek gibi değil, her gün çalışılacak bir beceri gibi yaklaşanlardı.',
        'En büyük fark, problemleri okumak değil çözmekti. Bir dersi izleyip başımı sallayabilir, limitleri ya da kısmi integrali anladığımı hissedebilirdim — ta ki boş bir problem karşıma dikilene kadar. Bir çözümü anlamak ile onu üretebilmek tamamen farklı iki yetenektir ve sınavda yalnızca biri işe yarar. Bu yüzden pratiği öne çektim: bir gece önce maraton yerine, her gün birkaç problem.',
        'İkincisi, halkaları ezberlemek değil zinciri kurmaktı. Türevler integrallere akar; limitler ikisinin de altını döşer. Sağlam olmayan bir konuyu atladığımda, sessizce sonraki her şeyi sabote ediyordu. Geri dönüp zayıf halkayı onarmak, ileri itmekten her zaman daha çok kazandırdı.',
        'Gerisi gösterişsiz: yanlış yaptığın problemleri sıkılana kadar tekrar çöz, sürekli karşına çıkan püf noktalarını bir sayfada topla ve bir şey oturmadığında erkenden sor. AA bir yetenek şimşeği değildir — yüzlerce küçük, istikrarlı tekrardır.',
      ],
    },
    'python-from-scratch': {
      title: 'Sıfırdan Python',
      category: 'Programlama', date: 'May 2026', readTime: '4 dk',
      description: 'Yeni başlayanlar için Python’a giriş: önce ne öğrenmeli, şimdilik neyi gönül rahatlığıyla görmezden gelmeli.',
      body: [
        'Yeni başlayan herkese Python’ı öneririm; gündemde olduğu için değil. Yolundan çekilir. Bir fikri bir iki satırda ifade edip anında çalıştırabilir ve haklı olup olmadığını görebilirsin — ki yeni başlayanın motive kalması için tam da bu hızlı geri bildirim gerekir.',
        'Baştan başlasam, ilk haftaları otomatikleşene kadar sıkıcı temellere ayırırdım: değişkenler, metin ve sayılar, if/else, döngüler, listeler ve sözlükler, ve fonksiyonlar. Günlük kullanacağın dilin gerçekten çoğu bu. Bunlar içselleşmeden framework’lere ya da gösterişli kütüphanelere atlama dürtüsüne diren — yoksa aynı anda iki bilinmezle boğuşursun.',
        'En sık gördüğüm hata pasif öğrenmedir: art arda öğretici izleyip tanımayı yetenek sanmak. Çözüm, her şeyi kendin yazmak, bilerek bozmak ve minik şeyler yapmaktır — bir sayı tahmin oyunu, bir yapılacaklar listesi, dosyalarını yeniden adlandıran bir betik. Bitmiş küçük projeler her oynatma listesinden çok öğretir.',
        'Başta neyi gönül rahatlığıyla görmezden gelebilirsin? Dekoratörler, metasınıflar, async ve derin nesne yönelimli tavşan delikleri. Zamanla önem kazanırlar, şimdi değil. Tehlikeli olacak kadarını öğren, gerçek bir şey yap ve bilgindeki boşlukların seni ileri çekmesine izin ver.',
      ],
    },
    'c-from-scratch': {
      title: 'Sıfırdan C',
      category: 'Programlama', date: 'Nis 2026', readTime: '4 dk',
      description: 'İşaretçiler, bellek ve bir bilgisayarın gerçekte nasıl çalıştığını bana nihayet öğreten derleyici.',
      body: [
        'Python’ın konforundan sonra C, sanki birileri güvenlik bariyerlerini söküp almış gibi hissettirdi. Birden belleği, tipleri ve makinenin tam olarak söylediğim şeyi yapacağını — söylediğim şey saçma olsa bile — düşünmem gerekiyordu. Sinir bozucuydu ve o yıl öğrendiğim en değerli şeydi.',
        'C, üst seviye dillerin sakladığını öğretir. Bir işaretçi yalnızca bir adrestir — “istediğin şey şurada duruyor” diyen bir sayı. Bu oturunca, bilişimin büyük bir kısmı sihir olmaktan çıktı: dizilerin gerçekte nasıl çalıştığı, bir şeyi fonksiyona geçirmenin neden onu kopyaladığı, yığının (stack) ve öbeğin (heap) aslında ne olduğu. Python bana yalan söylememişti ama gerçeği de esirgemişti.',
        'Derleyici, katı ve mizahtan yoksun öğretmenin olur. Eksik bir noktalı virgül ya da yanlış bir tip anında geri çevrilir. Segmentation fault’lar özensiz bellek yönetimini acımasızca cezalandırır. Başta can sıkıcı — ama bu katılık, hoşgörülü bir dilde asla tam kuramadığın bir makine zihinsel modelini kurmaya zorlar.',
        'Tavsiyem: C’yi bir sonraki uygulamanı yapmak için değil, geri kalan her şeyin üzerinde durduğu zemini anlamak için öğren. Küçük programlar yaz, belleği kâğıda çiz ve işaretçilerin biraz canını yakmasına izin ver. C’nin üstündeki her şey sonrasında daha anlamlı gelir.',
      ],
    },
    'should-you-study-cs': {
      title: 'Bilgisayar Mühendisliği Okumalı mısın?',
      category: 'Kariyer', date: 'Mar 2026', readTime: '4 dk',
      description: 'Alana dürüst bir bakış — kime uyar, kimi bunaltır ve kimsenin önceden söylemediği şey nedir.',
      body: [
        'İnsanlar bana bilgisayar mühendisliği okumalı mıyım diye sorar, genelde net bir evet ya da hayır umarak. Dürüst cevap şu: kafanın karışık olmasından hoşlanıp hoşlanmadığına bağlı. Şaka gibi geliyor ama bulduğum en kullanışlı süzgeç bu. Bu alan, kalıcı bir “henüz tam anlamadım” hâlidir ve gelişenler bunu yorucu değil, heyecan verici bulanlardır.',
        'Kimsenin önceden söylemediği şey, işin ne kadarının kod yazmak değil problem çözmek olduğudur. Kod yazmak kolay ve en son gelen kısımdır. Asıl iş, bulanık bir problemi çözülebilecek kadar küçük parçalara bölmek ve ilk üç denemen tutmadığında rahat olabilmektir. İnatçı bir hatayı ayıklamak sana ceza değil de bulmaca gibi geliyorsa, bu çok iyi bir işarettir.',
        'Meraklı, sabırlı ve sessizce inatçı insanlara uyar — bir şeyler inşa etmeyi seven ve anında sonuç beklemeyenlere. Ezberlenecek sabit bir olgular müfredatı isteyenleri bunaltır; çünkü araçlar sürekli değişir ve cevap çoğu zaman “duruma göre değişir”dir.',
        'Matematik dâhisi olman ya da on yaşından beri kod yazıyor olman gerekmiyor. Azim ve gerçek bir ilgi gerekiyor. Bunlar sende varsa, gerisi öğrenilebilir — ve alan, istediğin sürece sana ilginç problemler vermeye devam eder.',
      ],
    },
  },
};

const translations = { en, tr };

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'en'; }
    catch { return 'en'; }
  });

  useEffect(() => {
    try { localStorage.setItem('lang', lang); }
    catch { /* noop */ }
  }, [lang]);

  const t = useCallback((key) => translations[lang][key] ?? key, [lang]);

  const toggleLang = useCallback(() => {
    setLang(l => l === 'en' ? 'tr' : 'en');
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

const fallbackT = (key) => key;
const fallbackCtx = { lang: 'en', setLang: () => {}, toggleLang: () => {}, t: fallbackT };

export function useLang() {
  return useContext(LangContext) ?? fallbackCtx;
}
