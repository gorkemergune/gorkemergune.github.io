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
  introLeadPre: "I'm Görkem, and I spend my days turning ",
  introLeadEm: 'curiosity into working systems',
  introLeadPost: ': object detectors, translation models, phishing classifiers — and the apps that put them in people’s hands.',
  introBody: 'I learn by shipping. Every armor in the hall is something I designed, trained, broke, and rebuilt — from a bare-metal operating system to production ML pipelines. The goal is simple: to become the kind of AI engineer whose work speaks before he does.',
  introRolesLabel: 'OPERATING DOMAINS',
  introRoles: ['AI Engineer', 'Computer Vision (DL)', 'Machine Learning (ML)', 'Large Language Models (LLM)', 'Full-Stack Development', 'Open Source', 'Research'],
  introStats: [
    { n: 22, suffix: '', label: 'Projects shipped' },
    { n: 25, suffix: '+', label: 'Technologies used' },
    { n: 99, suffix: '%', label: 'Peak model F1' },
    { n: 6, suffix: '', label: 'Domains explored' },
  ],
  introCtaProjects: 'Explore the Armory',
  introCtaBlog: 'Read the Blog',
  introCtaContact: 'Start a conversation',

  // Home hero + sections
  heroTagline: 'AI PRODUCT DEVELOPER',
  heroSubtext: 'I build real products with AI — working on computer vision (DL), machine learning (ML), large language models (LLM), and full-stack development. What matters to me is shipping things people actually use.',
  ctaResume: 'Download Résumé',
  ctaViewWork: 'View Work',

  metricsKicker: 'FEATURED METRICS // LIVE TELEMETRY',
  mProjects: 'Featured Projects',
  mRepos: 'Public Repositories',
  mCommits: 'GitHub Commits',
  mResearch: 'Research Projects',
  mAlgo: 'Algorithm Problems',
  mCompetitions: 'Competitions',
  mModels: 'AI Models Deployed',
  mImages: 'Images Processed',
  mDataset: 'Custom Dataset Images',
  mF1: 'Best Model F1 Score',
  metricLive: 'LIVE',

  featuredKicker: 'FEATURED PROJECT',
  featuredCta: 'Read the case study',
  featuredLbTitle: 'MIHENK leaderboard · full set',
  featuredLbNote: '2 rows are my own fine-tunes',

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

  hfKicker: 'HUGGING FACE // MODELS & DATASETS',
  hfSub: 'What I have shipped to the Hub — fine-tunes, tokenizers, and the data behind them',
  hfCta: 'View Hugging Face profile',
  hfModel: 'MODEL',
  hfDataset: 'DATASET',
  hfViewProject: 'Project',

  lifeKicker: 'LIVE TELEMETRY // SYSTEM UPTIME',
  ageLabel: 'AGE — TIME ONLINE',
  countdownLabel: 'NEXT BIRTHDAY',
  ageCaption: 'Online since 16 Jul 2005',
  countdownCaption: 'Until 16 July',
  unitYears: 'Years',
  unitMonths: 'Months',
  unitDays: 'Days',
  unitHours: 'Hours',
  unitMinutes: 'Minutes',
  unitSeconds: 'Seconds',

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
    { category: 'University', date: 'Jun 2026', readTime: '6 min', title: 'How I Got AA in Calculus I and Calculus II', excerpt: 'The habits — not the talent — that carried me through two semesters of calculus with a top grade.', slug: 'calculus-aa' },
    { category: 'Programming', date: 'May 2026', readTime: '6 min', title: 'Python from Scratch: How to Start From Zero', excerpt: 'A beginner-friendly path into Python: what to learn first, and what to happily ignore for now.', slug: 'python-from-scratch' },
    { category: 'Programming', date: 'Apr 2026', readTime: '4 min', title: 'C from Scratch', excerpt: 'Pointers, memory, and the compiler that finally taught me how a computer actually works.', slug: 'c-from-scratch' },
    { category: 'Career', date: 'Mar 2026', readTime: '5 min', title: 'Is Computer Engineering Worth Studying in 2026?', excerpt: 'An honest look at the field — who it fits, who it frustrates, and what nobody tells you first.', slug: 'should-you-study-cs' },
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
  funGamesLabel: 'Mini-games',
  funSurpriseMeLabel: 'Surprise me',
  funSurprisesLabel: 'Surprises to send',
  funReactionTitle: 'Reaction Time',
  funReactionDesc: 'How fast are your reflexes? Click the instant it turns green.',
  funMemoryTitle: 'Memory Match',
  funMemoryDesc: 'Flip the cards and match every pair in as few moves as you can.',
  funTttTitle: 'Tic-Tac-Toe',
  funTttDesc: 'Face an unbeatable minimax AI. The best you can do is a draw.',
  funGame2048Title: '2048',
  funGame2048Desc: 'Slide and merge tiles until you reach the 2048 tile.',
  funSimonTitle: 'Simon Says',
  funSimonDesc: 'Watch the color sequence, then repeat it. It grows every round.',
  funComplimentsTitle: 'Compliment Cards',
  funComplimentsDesc: 'Flip a card and reveal a little compliment made just for you.',
  funLoveTitle: 'Love Meter',
  funLoveDesc: 'Two names, one playful compatibility score. Just for fun.',
  funWheelTitle: 'Spin the Wheel',
  funWheelDesc: 'Give it a spin and land on a little feel-good challenge.',

  // Love Meter page
  loveSub: 'Type two names and let the stars do the (completely unscientific) math.',
  loveDisclaimer: 'Just for fun — not a real compatibility test.',
  loveName1Label: 'Your Name',
  loveName1Placeholder: 'e.g. Alex',
  loveName2Label: "Crush's Name",
  loveName2Placeholder: 'e.g. Emma',
  loveCalculate: 'Calculate',
  loveCompatibility: 'Compatibility',
  loveAgain: 'Try Again',
  loveEmptyError: 'Please enter both names.',

  // Spin the Wheel page
  wheelSub: 'Thirty tiny challenges. Give the wheel a spin and see where it lands.',
  wheelSpin: 'Spin',
  wheelSpinning: 'Spinning…',
  wheelAgain: 'Spin Again',
  wheelChallengeLabel: 'Your challenge',
  wheelHint: 'Press Spin — the wheel turns for a few seconds.',

  // Compliment Cards page
  complimentsSub: 'Sixteen cards, sixteen kind words. Flip one to reveal a compliment — open them all, then shuffle again.',
  complimentsProgress: 'Opened',
  complimentsShuffle: 'Shuffle Again',
  complimentsAllOpened: 'Every card is open — hope they made you smile. Shuffle for another round.',
  complimentsCardLabel: 'Face-down card — flip to reveal a compliment',

  // Reaction game
  reactionSub: 'A quick test of your reflexes. Wait for green, then click as fast as you can.',
  reactionIdle: 'Click to start',
  reactionIdleSub: 'Wait for the green, then click instantly.',
  reactionWait: 'Wait for green…',
  reactionWaitSub: 'Don’t click yet.',
  reactionGo: 'CLICK!',
  reactionAgain: 'Click to try again',
  reactionEarly: 'Too early!',
  reactionEarlySub: 'You clicked before green. Click to retry.',
  reactionLast: 'Last (ms)',
  reactionBest: 'Best (ms)',

  // Memory game
  memorySub: 'Flip two cards at a time and find all eight matching pairs.',
  memoryMoves: 'Moves',
  memoryPairs: 'Pairs',
  memoryReset: 'Reset',
  memoryWon: 'Solved in',
  memoryWonMoves: 'moves 🎉',

  // Tic-Tac-Toe
  tttSub: 'You are X. The AI plays a perfect game with minimax — a draw is a win.',
  tttWin: 'You win! 🎉',
  tttLose: 'The AI wins.',
  tttDraw: 'Draw — well played.',
  tttYourTurn: 'Your turn (X)',
  tttW: 'Won',
  tttD: 'Draw',
  tttL: 'Lost',
  tttNewGame: 'New game',

  // 2048
  g2048Sub: 'Use arrow keys or swipe to merge tiles. Reach 2048 to win.',
  g2048Score: 'Score',
  g2048Best: 'Best',
  g2048New: 'New game',
  g2048Won: 'You made 2048! 🎉',
  g2048Over: 'Game over',
  g2048Hint: 'Arrow keys on desktop · swipe on mobile',

  // Simon
  simonSub: 'Watch the sequence light up, then repeat it. One extra step every round.',
  simonIdle: 'Press start and watch closely.',
  simonWatch: 'Watch…',
  simonRepeat: 'Your turn — repeat it!',
  simonOver: 'Wrong pad — game over.',
  simonLevel: 'Level',
  simonBest: 'Best',
  simonStart: 'Start',
  simonAgain: 'Play again',

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
  projectSub: 'Sixteen armors, one per project. Open a capsule to inspect its specs, architecture, and results.',
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
      tags: ['Next.js', 'FastAPI', 'Gemini', 'PostgreSQL'], link: '/competitions',
    },
    {
      org: 'Independent AI / ML Engineering', role: 'Builder & Open-Source Author', period: '2024 — Present', type: 'Applied', accent: '#00d4ff',
      summary: 'Self-directed engineering across computer vision, NLP, ML, systems, and full-stack.',
      points: [
        'Shipped 16 documented projects — from a bare-metal x86 OS to production ML pipelines.',
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

  // Skill groups — feeds the résumé skills section (the standalone Tech Stack page was removed)
  stackGroups: [
    { category: 'Languages', accent: '#ffd166', items: [
      { name: 'Python', level: 5 }, { name: 'C', level: 4 }, { name: 'C++', level: 3 }, { name: 'Java', level: 3 }, { name: 'JavaScript', level: 4 }, { name: 'TypeScript', level: 4 }, { name: 'SQL', level: 3 },
    ]},
    { category: 'Frontend', accent: '#4d96ff', items: [
      { name: 'React', level: 4 }, { name: 'Next.js', level: 4 }, { name: 'HTML', level: 5 }, { name: 'CSS', level: 4 }, { name: 'Tailwind', level: 4 },
    ]},
    { category: 'Backend', accent: '#00e5a0', items: [
      { name: 'Node.js', level: 3 }, { name: 'FastAPI', level: 4 }, { name: 'Express', level: 3 },
    ]},
    { category: 'AI / ML', accent: '#00d4ff', items: [
      { name: 'PyTorch', level: 4 }, { name: 'TensorFlow', level: 3 }, { name: 'OpenCV', level: 4 }, { name: 'Ultralytics YOLO', level: 4 }, { name: 'Hugging Face', level: 4 }, { name: 'Scikit-learn', level: 4 },
    ]},
    { category: 'Databases', accent: '#ff9f1c', items: [
      { name: 'PostgreSQL', level: 4 }, { name: 'SQLite', level: 4 }, { name: 'MongoDB', level: 3 },
    ]},
    { category: 'Tools', accent: '#f472b6', items: [
      { name: 'Git', level: 5 }, { name: 'GitHub', level: 5 }, { name: 'Docker', level: 4 }, { name: 'Linux', level: 4 }, { name: 'VS Code', level: 5 }, { name: 'Cursor', level: 4 }, { name: 'Claude Code', level: 4 },
    ]},
    { category: 'Other', accent: '#9d6bff', items: [
      { name: 'Full Stack Development', level: 4 }, { name: 'Algorithms', level: 4 }, { name: 'Data Structures', level: 4 }, { name: 'Computer Vision', level: 4 }, { name: 'Machine Learning', level: 4 }, { name: 'Deep Learning', level: 4 }, { name: 'Large Language Models', level: 4 }, { name: 'REST APIs', level: 4 },
    ]},
  ],

  // Research page
  researchBack: 'Home',
  researchBadge: 'RESEARCH',
  researchLabel: 'Research',
  researchSub: 'Independent, in-progress studies growing out of my applied work.',
  researchDisclaimer: 'These are ongoing, self-directed research projects — not published papers. Nothing here claims peer review or publication.',
  researchStatus: 'In Progress',
  researchCompleted: 'Completed',
  researchOutcomes: 'Outcomes',
  researchMethods: 'Methods',
  researchExpected: 'Expected Outcomes',
  researchPdf: 'Read draft (PDF)',
  researchItems: [
    {
      title: 'Email Phishing Detection',
      field: 'NLP · Security', accent: '#7c5cff', status: 'in-progress',
      abstract: 'Phishing emails cost people real money and lean on a recognizable vocabulary of urgency and impersonation. The motivation is to detect them from raw text with a simple, transparent model — and to show that how you represent the data matters as much as the model itself.',
      methods: ['Text cleaning, then TF-IDF vectorization over words and bigrams', 'Stratified 80/20 split with a fixed random seed', 'Logistic Regression classifier', 'Evaluation with accuracy, precision, recall, F1, a confusion matrix, and ROC'],
      expected: 'Future work: test on more varied, adversarial email, extend to Turkish for multilingual coverage, and compare against transformer baselines — while keeping the model interpretable.',
    },
    {
      title: 'PHQ-9 Depression Analysis',
      field: 'Data Analysis · Mental Health', accent: '#00e5a0', status: 'completed',
      abstract: 'An analysis of PHQ-9 depression-screening responses using AI and data-analysis techniques. A live study with roughly 100 participants was conducted, and the findings were presented and discussed on stage. The live study has now concluded — this is exploratory research, not a clinical tool, and not a published study.',
      methods: ['Ran a live study with ~100 real PHQ-9 responses', 'Clinical scoring with severity classification', 'Statistical analysis and machine-learning exploration of the responses', 'Findings presented and discussed on stage'],
      expected: 'With the live study concluded, the work explored how AI and data analysis can support — never replace — mental-health assessment, always with appropriate caution.',
    },
  ],

  // Resume page
  resumeBack: 'Home',
  resumeBadge: 'RÉSUMÉ',
  resumeTitle: 'Görkem Ergüne',
  resumeRole: 'Computer Engineering Student · AI Product Developer',
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

  // Algorithm Journey
  navCompetitions: 'Competitions',
  algoKicker: 'ALGORITHM JOURNEY // LIVE FROM GITHUB',
  algoSub: 'Problems solved across platforms — pulled live from my algorithms repo, updated on every push.',
  algoTotalLabel: 'Total Solved',
  algoLive: 'LIVE',

  // Competitions page
  compBack: 'Home',
  compBadge: 'COMPETITIONS',
  compLabel: 'Competitions',
  compSub: 'Hackathons, algorithm contests, and competitive-programming camps — the competitive side of the journey.',
  compScore: 'Score',
  compRank: 'Rank',
  compTeam: 'Team',
  compAchievements: 'Highlights',
  compProject: 'Project',
  compTBD: 'TBD',
  compVisit: 'Visit',

  // Life Flow (semester roadmap)
  journeyNow: 'YOU ARE HERE',
  journeyFocusLabel: 'Current focus',
  journeyFocus: ['Large Language Models', 'Computer Vision', 'Machine Learning', 'Algorithms'],
  journeyExpand: 'Expand',
  journeyLockedNote: 'Locked — unlocks in sequence.',
  semCompetitions: 'Competitions',
  semHackathons: 'Hackathons',
  semResearch: 'Research',
  semProjects: 'Projects',
  semAchievements: 'Achievements',
  journeySemesters: [
    { term: '2024 Fall', sub: '(A2 Prep)', status: 'completed', title: 'English Prep — Building the Foundation',
      competitions: [], hackathons: [], research: [], projects: [], achievements: ['Focused entirely on developing my English'] },
    { term: '2025 Spring', sub: '(B1 Prep)', status: 'completed', title: 'Prep — Reading & First Code',
      competitions: [], hackathons: [], research: [], projects: ['Started Python', 'HTML & CSS'], achievements: ['Heavy English reading — articles & academic texts', 'Started learning to code'] },
    { term: '2025 Summer', sub: '(B2 Prep)', status: 'completed', title: 'Speaking, AI & First Builds',
      competitions: [], hackathons: [], research: [], projects: ['Mini LLM project', 'Basic problem solving'], achievements: ['Developed English speaking', 'Started learning AI'] },
    { term: 'September 2025', sub: '(Year 1 · Term 1)', status: 'completed', title: 'Computer Engineering — Day One',
      competitions: [], hackathons: [], research: [], projects: [], achievements: ['Started Computer Engineering', 'Grew with Python — data structures & algorithms', 'Started competitive programming'] },
    { term: 'October 2025', sub: '(Year 1 · Term 1)', status: 'completed', title: 'First Contest & Machine Learning',
      competitions: ['IEEEXtreme'], hackathons: [], research: [], projects: ['Task Manager', 'Bank App'], achievements: ['Started ML & Data Science'] },
    { term: 'November 2025', sub: '(Year 1 · Term 1)', status: 'completed', title: 'Building & Health Research',
      competitions: [], hackathons: [], research: ['Started health-domain research'], projects: ['Quizzer', 'Small Kaggle projects'], achievements: ['Kept building small apps to practice'] },
    { term: 'December 2025', sub: '(Year 1 · Term 1)', status: 'completed', title: 'NEXA Founded',
      competitions: ['AlgoLeague Winter Camp'], hackathons: [], research: [], projects: [], achievements: ['Founded my own team, NEXA'] },
    { term: 'January 2026', sub: '(Year 1 · Term 1 · finals)', status: 'completed', title: 'Finals & First Semester Closed',
      competitions: [], hackathons: [], research: [], projects: [], achievements: ['Closed Year 1 · Term 1 through finals', 'Aced Calculus I with an AA', 'Winter break — heavy self-study'] },
    { term: 'February 2026', sub: '(Year 1 · Term 2 begins)', status: 'completed', title: 'Term 2 Begins — C from Scratch',
      competitions: ['AlgoLeague Spring Camp'], hackathons: [], research: [], projects: [], achievements: ['Started learning C from scratch'] },
    { term: 'March 2026', sub: '(Year 1 · Term 2)', status: 'completed', title: 'Learning C by Building',
      competitions: [], hackathons: [], research: [], projects: ['Sorting Visualizer', 'Space Shooter'], achievements: ['Wrote real programs in C', 'Kept grinding competitive programming'] },
    { term: 'April 2026', sub: '(Year 1 · Term 2)', status: 'completed', title: 'Bare Metal & First Hackathon',
      competitions: [], hackathons: ['BTK E-Commerce Hackathon'], research: [], projects: ['GorkemOS', 'NEXA Website'], achievements: ['Built an OS from scratch in C & Assembly', 'Intro to Deep Learning'] },
    { term: 'May 2026', sub: '(Year 1 · Term 2)', status: 'completed', title: 'Hackathons, Research & English',
      competitions: [], hackathons: ['Tıkla Gelsin Foodathon', 'Med-Health Early Warning'], research: ['PHQ-9 Depression Analysis'], projects: ['Synonym Master', 'Find The Best'], achievements: ['Reached C1-level English', 'First applied-ML research project'] },
    { term: 'June 2026', sub: '(Year 1 · Term 2 · finals)', status: 'completed', title: 'Computer Vision & Internship',
      competitions: ['AlgoLeague Summer Camp'], hackathons: [], research: ['Email Phishing Detection'], projects: ['Face Detection'], achievements: ['Completed an online internship', 'Closed Term 2 with an AA in Calculus II'] },
    { term: 'July 2026', sub: '(Current · summer)', status: 'current', title: 'The AI Wave — Models, Benchmarks & My Own Fine-Tunes',
      competitions: [], hackathons: [], research: ['Pose-Invariant Face ID'], projects: ['YOLO Custom Detector', 'Re-Minder', 'FaceLock', 'WorldCup BPE Tokenizer', 'wiki2bpe', 'ayarlicazhocam-training', 'MIHENK Benchmark', 'Tool Agent'], achievements: ['Built & benchmarked my own two LLM fine-tunes', 'Learned tool/function calling end to end', 'Deeper work in LLM · ML · DL', 'Reading papers'] },
  ],
  // Blog detail content
  blogPosts: {
    'calculus-aa': {
      title: 'How I Got AA in Calculus I and Calculus II',
      category: 'University', date: 'Jun 2026', readTime: '6 min',
      description: 'The habits — not the talent — that carried me through two semesters of calculus with a top grade.',
      body: [
        'Maths is a sore spot for a lot of us, and calculus is one of the courses engineering students struggle with most. So let me share my own experience — maybe it helps someone.',
        'Let me start from the beginning. My maths had been good since my university-entrance-exam days and I genuinely enjoyed studying it, which obviously helped a lot. Because I’d set myself a high GPA target before starting first year, I began studying calculus over the summer break. Honestly, looking back, there was no need for that — I just stressed myself out for nothing.',
        'In the first weeks I listened carefully in class, since I’d already seen most of the topics over the summer and could follow easily. But as the term went on — projects, research, other work — I let the lectures slide badly. On Thursdays I only had two hours of maths and most of the time I didn’t even go to campus. Luckily, attendance wasn’t much of a problem.',
        'Calculus I midterm: I started studying about a week before. I opened Boğaziçili’s calculus videos on YouTube and finished all the topics, then worked through past papers. But instead of just watching the solutions, I wrote each question out and wrestled with it until I could solve it myself. In total I only did past papers on two evenings, about two hours each — and since I watched the videos at 2x speed, my total study time was pretty short. The result: 96.',
        'The final, on the other hand, was an absolute disaster. The week before finals was New Year’s and my routine had completely fallen apart. Worse, I had both my English and my calculus exam on the same day, with serious gaps in both. I spent the whole night memorising English vocabulary on one side and watching calculus videos on the other, and walked into the exam almost sleepless. I got a BB in English. I thought calculus hadn’t gone as well as the midterm, but thanks to my in-term grades I closed the course with an AA.',
        'In the second semester I used the same method for the midterm. But this term I’d slacked off even more — I started studying for almost every exam just 2–3 days before. Most of my days went to projects, research, and practising algorithms. I got around 75 on the midterm; the class average was about 60, so it wasn’t bad for me. Even when I went to class I was usually in the back rows solving algorithm problems on my laptop — not exactly a model student. 😅 At finals I shut myself away for three days and studied hard, and finished Calculus II with an AA too.',
        'My advice: the secret to a high grade isn’t sitting at a desk for hours — it’s studying the right way. Definitely watch Boğaziçili’s calculus videos; instead of memorising formulas, understand why they’re true; don’t jump straight to the solutions of past questions — struggle with them yourself first; even if you can’t solve one, don’t give up, because that’s where most of the growth happens; and if you grasp the logic instead of memorising, you’ll handle unfamiliar question types too.',
        'With this method I finished both semesters with an AA. I can’t promise everyone the same result, because everyone’s maths background is different. But if you understand the logic and genuinely wrestle with past papers, your chances of at least passing with a high letter grade go up significantly. Good luck to everyone. 🚀',
      ],
    },
    'python-from-scratch': {
      title: 'Python from Scratch: How to Start From Zero',
      category: 'Programming', date: 'May 2026', readTime: '6 min',
      description: 'A beginner-friendly path into Python: what to learn first, and what to happily ignore for now.',
      body: [
        'The most common advice given to someone who wants to start programming is: “Learn Python first.” Why? Because Python really is an easy language to learn — the syntax is clean, readable, and less complex than most other languages.',
        'But contrary to what many people think, the reason beginners find it hard isn’t Python — it’s that they don’t yet know the logic of programming. I only realised this after learning C following Python. Every line of code you write goes through real operations on the computer: variables are held at addresses in memory, functions are called, data is moved. Nothing you write happens “in thin air.” Once you grasp this, you start writing more readable, more efficient, and more correct code.',
        'How did I learn Python? When I first started, my English was around B1. I bought a foreign instructor’s course on Udemy, but honestly I understood nothing. I just wrote whatever the instructor wrote without knowing why the code worked. When the course moved to web development, I completely lost the thread. Later I found a Turkish course on YouTube, and this time I actually started to understand — I remember often thinking, “Ah, so that’s what the foreign instructor was explaining.” The course took me up to classes and I thought I’d understood most of Python — but I still couldn’t write code.',
        'What actually made me improve? Over the summer break I started a different course and completely changed my method. This time, instead of watching and copying, I took notes of the key points in a notebook, then closed the video and tried to write everything I’d learned from scratch myself. For the first time I felt real progress — because learning and watching are not the same thing.',
        'The most important lesson from those 7–8 months was: don’t fall into tutorial hell. There are thousands of videos online; you jump from one course to another before finishing, then try another platform. In the end you’ve watched dozens of hours but still can’t write a program on your own. The main reason is that most tutorials make you type specific code instead of teaching you the logic.',
        'So read official documentation as much as you can. While learning C I watched almost no videos — most of the process was reading docs, and in hindsight it was one of the most effective ways to learn.',
        'Write lots of code. Once you’ve learned variables, conditionals, loops, and functions, start writing code instead of watching videos. Build small projects, solve your lab questions, solve algorithm problems. In our school’s Python labs they were asking about classes and methods in the very first weeks — far too hard for a beginner level, and many people cooled off from programming in their first term.',
        'Finally: after you learn one language, picking up another’s syntax usually takes a few days — but learning the underlying logic takes much longer. My advice: don’t keep switching tutorials, make reading documentation a habit, redo everything you watch by writing it yourself, reinforce it with small projects, and study in a planned way. If you’re starting from zero, don’t try to finish Python in 2–3 weeks; give yourself at least 3 months. Build a solid foundation and every language after it will come far more easily.',
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
      title: 'Is Computer Engineering Worth Studying in 2026?',
      category: 'Career', date: 'Mar 2026', readTime: '5 min',
      description: 'An honest look at the field — who it fits, who it frustrates, and what nobody tells you first.',
      body: [
        'One of the most classic questions of recent years: “Is it worth studying Computer Engineering these days?” It’s 2026 and AI is more advanced than ever. Tools costing $20–30 a month can do many jobs incredibly fast, and that’s creating real anxiety about the future — especially for students choosing a major: “Will I be able to find a job when I graduate?” Here’s how I see it.',
        '1. If you’re not genuinely interested, don’t study it. Don’t pick it just because it pays well or because people call it “the profession of the future.” This field demands constant problem solving, research, and building; you’ll face hard courses, long projects, and problems you sometimes can’t crack for days. If you don’t enjoy that, four years will be pretty exhausting.',
        '2. You have to keep improving yourself constantly. This isn’t a field where you can say “let me just finish school and the rest will follow.” Technology changes every day — new libraries, frameworks, and models appear. Even a few months of standing still can leave you behind.',
        '3. English matters enormously. The most up-to-date information is usually in English — documentation, papers, GitHub projects. As I said in my earlier posts, while learning software you’ll be reading a lot of documentation and articles. If your English is weak you’ll constantly be translating, which slows your learning and wastes time. Improve your English before university as much as you can.',
        '4. Be active and entrepreneurial. You don’t progress in this field by studying alone. Build projects, enter competitions, go to hackathons, contribute to open source. Follow the industry even in your free time — LinkedIn, X, YouTube, technical blogs. You may not need to code every day, but knowing what’s happening in the field is a big advantage.',
        '5. The city genuinely makes a difference — one of the least-discussed points. If you’re not in İstanbul (or at places like METU, Bilkent, or Hacettepe in Ankara), reaching events, competitions, and networking opportunities gets harder. A big part of growth is seeing people better than you and learning from them; finding teammates and building a strong circle makes a serious difference to your career.',
        'So, is it still worth studying? I think yes — but not by relying on the diploma alone. This field no longer gives you the luxury of settling for only what university teaches; you have to stay willing to keep learning, building, and improving. If you’re genuinely interested in technology, you love researching, and spending time at a computer makes you happy, it’s still a wonderful field. But if you’re choosing it only because “it guarantees a job,” I’d suggest thinking your decision over one more time.',
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
  introKicker: 'KİMLİK // ZIRHIN ARKASINDA KİM VAR',
  introLeadPre: 'Ben Görkem. Günlerimi ',
  introLeadEm: 'merakı çalışan sistemlere',
  introLeadPost: ' dönüştürerek geçiriyorum: nesne dedektörleri, çeviri modelleri, oltalama sınıflandırıcıları ve bunları insanların eline ulaştıran uygulamalar.',
  introBody: 'Üreterek öğreniyorum. Zırh Deposu’ndaki her zırh; doğrudan donanımda çalışan bir işletim sisteminden üretim seviyesindeki makine öğrenmesi hatlarına kadar tasarladığım, eğittiğim, bozup yeniden inşa ettiğim bir şey. Amacım basit: işi kendisinden önce konuşan bir yapay zekâ mühendisi olmak.',
  introRolesLabel: 'ÇALIŞMA ALANLARI',
  introRoles: ['Yapay Zekâ Mühendisi', 'Görüntü İşleme (DL)', 'Makine Öğrenmesi (ML)', 'Büyük Dil Modelleri (LLM)', 'Full-Stack Geliştirme', 'Açık Kaynak', 'Araştırma'],
  introStats: [
    { n: 22, suffix: '', label: 'Yayınlanan proje' },
    { n: 25, suffix: '+', label: 'Kullanılan teknoloji' },
    { n: 99, suffix: '%', label: 'En yüksek model F1' },
    { n: 6, suffix: '', label: 'Keşfedilen alan' },
  ],
  introCtaProjects: 'Cephaneliği Keşfet',
  introCtaBlog: 'Blog’u Oku',
  introCtaContact: 'Bir sohbet başlat',

  // Home hero + sections
  heroTagline: 'YAPAY ZEKÂ ÜRÜN GELİŞTİRİCİSİ',
  heroSubtext: 'Yapay zekâ ile gerçek ürünler geliştiriyorum; görüntü işleme (DL), makine öğrenmesi (ML), büyük dil modelleri (LLM) ve full stack üzerine çalışıyorum. Benim için önemli olan, insanların gerçekten kullandığı şeyler üretmek.',
  ctaResume: 'CV’yi İndir',
  ctaViewWork: 'Çalışmaları Gör',

  metricsKicker: 'ÖNE ÇIKAN METRİKLER // CANLI TELEMETRİ',
  mProjects: 'Öne Çıkan Projeler',
  mRepos: 'Herkese Açık Depolar',
  mCommits: 'GitHub Commit’leri',
  mResearch: 'Araştırma Projeleri',
  mAlgo: 'Algoritma Problemleri',
  mCompetitions: 'Yarışmalar',
  mModels: 'Yayınlanan Yapay Zekâ Modelleri',
  mImages: 'İşlenen Görsel',
  mDataset: 'Özel Veri Kümesi Görseli',
  mF1: 'En İyi Model F1 Skoru',
  metricLive: 'CANLI',

  featuredKicker: 'ÖNE ÇIKAN PROJE',
  featuredCta: 'Vaka analizini oku',
  featuredLbTitle: 'MIHENK liderlik tablosu · tam set',
  featuredLbNote: '2 satır kendi ince ayarlarım',

  buildingKicker: 'ŞU AN GELİŞTİRİLENLER',
  buildingSub: 'Aktif denemeler ve devam eden çalışmalar',
  buildingItems: [
    { title: 'LLM Denemeleri', desc: 'Açık modeller çevresinde prompt, ince ayar ve küçük ajan araçları.', status: 'Keşif' },
    { title: 'Bilgisayarlı Görü', desc: 'Tek sınıflı YOLO’nun ötesinde özel dedektörler ve tespit hatları.', status: 'Geliştirme' },
    { title: 'Writing Analyzer', desc: 'İki dilli stilometrik risk motorunu ve API’sini genişletme.', status: 'İyileştirme' },
  ],

  activityKicker: 'GITHUB ETKİNLİĞİ // SON DEPOLAR',
  activitySub: 'Doğrudan GitHub’dan canlı olarak çekilir ve her zaman günceldir',
  activityCta: 'GitHub profilini gör',
  activityUpdated: 'Güncellendi',
  hfKicker: 'HUGGING FACE // MODELLER & VERİ KÜMELERİ',
  hfSub: 'Hub’a yayınladıklarım — ince ayarlar, tokenizer’lar ve arkalarındaki veri',
  hfCta: 'Hugging Face profilini gör',
  hfModel: 'MODEL',
  hfDataset: 'VERİ KÜMESİ',
  hfViewProject: 'Proje',
  activityStars: 'yıldız',

  lifeKicker: 'CANLI TELEMETRİ // SİSTEM ÇALIŞMA SÜRESİ',
  ageLabel: 'YAŞ — ÇEVRİMİÇİ SÜRE',
  countdownLabel: 'SONRAKİ DOĞUM GÜNÜ',
  ageCaption: '16 Tem 2005’ten beri çevrimiçi',
  countdownCaption: '16 Temmuz’a kadar',
  unitYears: 'Yıl',
  unitMonths: 'Ay',
  unitDays: 'Gün',
  unitHours: 'Saat',
  unitMinutes: 'Dakika',
  unitSeconds: 'Saniye',

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
    { category: 'Üniversite', date: 'Haz 2026', readTime: '6 dk', title: 'Calculus I ve Calculus II’den Nasıl AA Aldım?', excerpt: 'İki dönem calculus’ı yüksek notla bitirmemi sağlayan şey yetenek değil, alışkanlıklardı.', slug: 'calculus-aa' },
    { category: 'Programlama', date: 'May 2026', readTime: '6 dk', title: 'Python’a Sıfırdan Nasıl Başlanmalı?', excerpt: 'Yeni başlayanlar için Python’a giriş: önce ne öğrenmeli, şimdilik neyi gönül rahatlığıyla görmezden gelmeli.', slug: 'python-from-scratch' },
    { category: 'Programlama', date: 'Nis 2026', readTime: '4 dk', title: 'Sıfırdan C', excerpt: 'İşaretçiler, bellek ve bir bilgisayarın gerçekte nasıl çalıştığını bana nihayet öğreten derleyici.', slug: 'c-from-scratch' },
    { category: 'Kariyer', date: 'Mar 2026', readTime: '5 dk', title: '2026’da Bilgisayar Mühendisliği Okunur mu?', excerpt: 'Alana dürüst bir bakış: kime uyar, kimi bunaltır ve kimsenin önceden söylemediği şey nedir.', slug: 'should-you-study-cs' },
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
  puzzleExP2: 'Bu bulmacada, kalan her alt kümenin en küçüğünü bularak bu ilkeyi doğruladın; aslında seçmeli sıralama (selection sort) uyguladın. İlke, her zaman bir en küçük elemanın var olduğunu garanti eder; bu yüzden görev her zaman çözülebilir.',
  puzzleExP3: 'En iyi strateji: geçişlilik özelliğini kullan. A < B ve B < C ise A < C’dir; A ile C’yi ayrıca karşılaştırmaya gerek yok.',
  puzzlePlayAgain: 'Tekrar Oyna',

  // Contact
  contactLabel: 'İletişim',
  contactLine1: 'İstediğin zaman',
  contactLine1Em: 'yaz',
  contactLine2: 'İş birliğine açığım',

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
  funGamesLabel: 'Mini oyunlar',
  funSurpriseMeLabel: 'Şaşırt beni',
  funSurprisesLabel: 'Göndermelik sürprizler',
  funReactionTitle: 'Tepki Süresi',
  funReactionDesc: 'Reflekslerin ne kadar hızlı? Yeşile döner dönmez tıkla.',
  funMemoryTitle: 'Hafıza Eşleştirme',
  funMemoryDesc: 'Kartları çevir ve tüm eşleri olabildiğince az hamlede bul.',
  funTttTitle: 'XOX',
  funTttDesc: 'Yenilmez minimax yapay zekâsıyla oyna. Yapabileceğinin en iyisi beraberlik.',
  funGame2048Title: '2048',
  funGame2048Desc: 'Kareleri kaydırıp birleştir ve 2048 karesine ulaş.',
  funSimonTitle: 'Simon',
  funSimonDesc: 'Renk dizisini izle, sonra tekrarla. Her turda uzuyor.',
  funComplimentsTitle: 'İltifat Kartları',
  funComplimentsDesc: 'Bir kart çevir ve sana özel küçük bir iltifatı ortaya çıkar.',
  funLoveTitle: 'Aşk Ölçer',
  funLoveDesc: 'İki isim, eğlencelik bir uyum puanı. Sadece keyif için.',
  funWheelTitle: 'Çarkı Çevir',
  funWheelDesc: 'Çarkı çevir ve küçük, keyifli bir göreve dön.',

  // Love Meter page
  loveSub: 'İki isim yaz ve hesabı (tamamen bilim dışı) yıldızlara bırak.',
  loveDisclaimer: 'Sadece eğlence için — gerçek bir uyum testi değildir.',
  loveName1Label: 'Senin Adın',
  loveName1Placeholder: 'örn. Alex',
  loveName2Label: 'Hoşlandığının Adı',
  loveName2Placeholder: 'örn. Emma',
  loveCalculate: 'Hesapla',
  loveCompatibility: 'Uyum',
  loveAgain: 'Tekrar Dene',
  loveEmptyError: 'Lütfen iki ismi de gir.',

  // Spin the Wheel page
  wheelSub: 'Otuz küçük görev. Çarkı çevir ve nereye geldiğini gör.',
  wheelSpin: 'Çevir',
  wheelSpinning: 'Dönüyor…',
  wheelAgain: 'Tekrar Çevir',
  wheelChallengeLabel: 'Görevin',
  wheelHint: 'Çevir’e bas — çark birkaç saniye döner.',

  // Compliment Cards page
  complimentsSub: 'On altı kart, on altı güzel söz. Bir kartı çevir ve iltifatı gör — hepsini aç, sonra yeniden karıştır.',
  complimentsProgress: 'Açılan',
  complimentsShuffle: 'Yeniden Karıştır',
  complimentsAllOpened: 'Tüm kartlar açıldı — umarım seni gülümsetmiştir. Yeni bir tur için karıştır.',
  complimentsCardLabel: 'Kapalı kart — çevirip iltifatı gör',

  // Reaction game
  reactionSub: 'Reflekslerin için kısa bir test. Yeşili bekle, sonra olabildiğince hızlı tıkla.',
  reactionIdle: 'Başlamak için tıkla',
  reactionIdleSub: 'Yeşili bekle, sonra hemen tıkla.',
  reactionWait: 'Yeşili bekle…',
  reactionWaitSub: 'Henüz tıklama.',
  reactionGo: 'TIKLA!',
  reactionAgain: 'Tekrar denemek için tıkla',
  reactionEarly: 'Çok erken!',
  reactionEarlySub: 'Yeşilden önce tıkladın. Tekrar için tıkla.',
  reactionLast: 'Son (ms)',
  reactionBest: 'En iyi (ms)',

  // Memory game
  memorySub: 'Her seferinde iki kart çevir ve sekiz eşin hepsini bul.',
  memoryMoves: 'Hamle',
  memoryPairs: 'Eş',
  memoryReset: 'Sıfırla',
  memoryWon: 'Çözüldü:',
  memoryWonMoves: 'hamle 🎉',

  // Tic-Tac-Toe
  tttSub: 'Sen X’sin. Yapay zekâ minimax ile kusursuz oynar — beraberlik bir zaferdir.',
  tttWin: 'Kazandın! 🎉',
  tttLose: 'Yapay zekâ kazandı.',
  tttDraw: 'Beraberlik — iyi oynadın.',
  tttYourTurn: 'Sıra sende (X)',
  tttW: 'Galibiyet',
  tttD: 'Beraberlik',
  tttL: 'Mağlubiyet',
  tttNewGame: 'Yeni oyun',

  // 2048
  g2048Sub: 'Kareleri birleştirmek için ok tuşlarını kullan ya da kaydır. 2048’e ulaş, kazan.',
  g2048Score: 'Skor',
  g2048Best: 'En iyi',
  g2048New: 'Yeni oyun',
  g2048Won: '2048’i yaptın! 🎉',
  g2048Over: 'Oyun bitti',
  g2048Hint: 'Masaüstünde ok tuşları · mobilde kaydırma',

  // Simon
  simonSub: 'Yanan diziyi izle, sonra tekrarla. Her turda bir adım daha eklenir.',
  simonIdle: 'Başlat’a bas ve dikkatle izle.',
  simonWatch: 'İzle…',
  simonRepeat: 'Sıra sende — tekrarla!',
  simonOver: 'Yanlış tuş — oyun bitti.',
  simonLevel: 'Seviye',
  simonBest: 'En iyi',
  simonStart: 'Başlat',
  simonAgain: 'Tekrar oyna',

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
  hanoiExP3: 'Yardımcı: 2. çubuk, Hedef: 3. çubuk. Bu bulmaca üstel büyümeyi gösterir; eklenen her disk, en az hamle sayısını iki katına çıkarıp bir artırır.',

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
  journeySoon: 'Şifreli; sırası gelince açılır.',

  // Project Page
  projectBack: 'Ana Sayfa',
  projectDetailBack: 'Zırh Deposu',
  projectBadge: 'ZIRH DEPOSU',
  projectLabel: 'Cephanelik',
  projectSub: 'On altı zırh, her biri bir proje. Özellikleri, mimariyi ve sonuçları incelemek için bir kapsül aç.',
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
  rdBottomNote: 'Tonu belirlemek için yazılmış yer tutucu bir yazı. Gerçek içerik yakında bunun yerini alacak.',
  rdBottomLink: 'Tüm blog yazılarına dön',
  rdNextUp: 'Sıradaki',
  blogSoon: 'YAKINDA',

  // Hall of Armor
  hallStatusLeft: 'ZIRH DEPOSU',
  hallStatusCenter: '41.0082° K · 28.9784° D · İSTANBUL',
  hallPlatformLabel: 'ARK REAKTÖRÜ — ÇEVRİMİÇİ',
  hallInit: 'SİSTEMLER BAŞLATILIYOR...',
  hallDeploy: 'BAŞLAT',
  bootLine1: 'JARVIS çevrimiçi; tüm sistemler normal',
  bootLine2: 'Zırh konfigürasyonları yükleniyor...',
  bootLine3: 'Proje veritabanı taranıyor...',
  bootLine4: 'Zırh Deposu başlatılıyor...',
  bootLine5: 'Hoş geldiniz, Bay Ergüne.',

  // Nav (new pages)
  navExperience: 'Deneyim',
  navResearch: 'Araştırma',
  navResume: 'CV',
  navHome: 'Ana Sayfa',

  // Experience page
  expBack: 'Ana Sayfa',
  expBadge: 'DENEYİM',
  expLabel: 'Deneyim',
  expSub: 'Hackathonlar, uygulamalı mühendislik ve devam eden araştırmalar; profesyonel çalışma çerçevesinde sunuldu.',
  expItems: [
    {
      org: 'BTK Hackathon 2026', role: 'Full-Stack & Yapay Zekâ Geliştiricisi', period: 'Mayıs 2026', type: 'Hackathon', accent: '#ff9f1c',
      summary: 'E-ticaret kategorisi için “Find The Best” alışveriş zekâsı platformunu geliştirdim.',
      points: [
        'Türk ve uluslararası pazaryerlerinde çoklu mağaza fiyat karşılaştırma motoru tasarladım.',
        'Ürün analizi, alım zamanlaması ve sahte yorum tespiti için Google Gemini’yi entegre ettim.',
        'İki dilli bir Next.js + FastAPI + PostgreSQL yığınını Docker Compose ile yayına aldım.',
      ],
      tags: ['Next.js', 'FastAPI', 'Gemini', 'PostgreSQL'], link: '/competitions',
    },
    {
      org: 'Bağımsız Yapay Zekâ / ML Mühendisliği', role: 'Geliştirici & Açık Kaynak Yazarı', period: '2024 — Günümüz', type: 'Uygulamalı', accent: '#00d4ff',
      summary: 'Bilgisayarlı görü, NLP, ML, sistemler ve full-stack alanlarında kendi kendine yönlendirdiğim mühendislik.',
      points: [
        'Doğrudan donanımda çalışan x86 işletim sisteminden üretim ML hatlarına 16 belgeli proje yayınladım.',
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
        'İngilizce ve Türkçe metinlerde yapay zekâ üretimi metni tespit etmek için stilometrik sinyaller.',
        'Küçük ve kısmen görünen yüzleri yakalamak için tespit et-doğrula yöntemi.',
        'Düşük kaynaklı Türkçe→İngilizce makine çevirisi için ince ayar stratejileri.',
      ],
      tags: ['NLP', 'Bilgisayarlı Görü', 'Değerlendirme'], link: '/research',
    },
  ],

  // Yetenek grupları — CV sayfasındaki yetenekler bölümünü besler (Teknoloji Yığını sayfası kaldırıldı)
  stackGroups: [
    { category: 'Diller', accent: '#ffd166', items: [
      { name: 'Python', level: 5 }, { name: 'C', level: 4 }, { name: 'C++', level: 3 }, { name: 'Java', level: 3 }, { name: 'JavaScript', level: 4 }, { name: 'TypeScript', level: 4 }, { name: 'SQL', level: 3 },
    ]},
    { category: 'Frontend', accent: '#4d96ff', items: [
      { name: 'React', level: 4 }, { name: 'Next.js', level: 4 }, { name: 'HTML', level: 5 }, { name: 'CSS', level: 4 }, { name: 'Tailwind', level: 4 },
    ]},
    { category: 'Backend', accent: '#00e5a0', items: [
      { name: 'Node.js', level: 3 }, { name: 'FastAPI', level: 4 }, { name: 'Express', level: 3 },
    ]},
    { category: 'Yapay Zekâ / ML', accent: '#00d4ff', items: [
      { name: 'PyTorch', level: 4 }, { name: 'TensorFlow', level: 3 }, { name: 'OpenCV', level: 4 }, { name: 'Ultralytics YOLO', level: 4 }, { name: 'Hugging Face', level: 4 }, { name: 'Scikit-learn', level: 4 },
    ]},
    { category: 'Veritabanları', accent: '#ff9f1c', items: [
      { name: 'PostgreSQL', level: 4 }, { name: 'SQLite', level: 4 }, { name: 'MongoDB', level: 3 },
    ]},
    { category: 'Araçlar', accent: '#f472b6', items: [
      { name: 'Git', level: 5 }, { name: 'GitHub', level: 5 }, { name: 'Docker', level: 4 }, { name: 'Linux', level: 4 }, { name: 'VS Code', level: 5 }, { name: 'Cursor', level: 4 }, { name: 'Claude Code', level: 4 },
    ]},
    { category: 'Diğer', accent: '#9d6bff', items: [
      { name: 'Full-Stack Geliştirme', level: 4 }, { name: 'Algoritmalar', level: 4 }, { name: 'Veri Yapıları', level: 4 }, { name: 'Bilgisayarlı Görü', level: 4 }, { name: 'Makine Öğrenmesi', level: 4 }, { name: 'Derin Öğrenme', level: 4 }, { name: 'Büyük Dil Modelleri', level: 4 }, { name: 'REST API', level: 4 },
    ]},
  ],

  // Research page
  researchBack: 'Ana Sayfa',
  researchBadge: 'ARAŞTIRMA',
  researchLabel: 'Araştırma',
  researchSub: 'Uygulamalı çalışmalarımdan doğan, bağımsız ve devam eden araştırmalar.',
  researchDisclaimer: 'Bunlar kendi yürüttüğüm, devam eden araştırma projeleridir; yayınlanmış makale değildir. Hiçbiri hakem denetimi ya da yayın iddiası taşımaz.',
  researchStatus: 'Devam Ediyor',
  researchCompleted: 'Tamamlandı',
  researchOutcomes: 'Sonuçlar',
  researchMethods: 'Yöntemler',
  researchExpected: 'Beklenen Sonuçlar',
  researchPdf: 'Taslağı oku (PDF)',
  researchItems: [
    {
      title: 'E-posta Oltalama Tespiti',
      field: 'NLP · Güvenlik', accent: '#7c5cff', status: 'in-progress',
      abstract: 'Oltalama e-postaları insanlara gerçek para kaybettirir ve aciliyet ile taklide dayalı, tanıdık bir kelime dağarcığına yaslanır. Amaç, bunları ham metinden basit ve şeffaf bir modelle tespit etmek ve verinin nasıl temsil edildiğinin en az model kadar önemli olduğunu göstermek.',
      methods: ['Metin temizleme, ardından kelimeler ve ikili öbekler üzerinde TF-IDF vektörleştirme', 'Sabit tohumlu katmanlı %80/%20 bölme', 'Lojistik Regresyon sınıflandırıcı', 'Doğruluk, kesinlik, duyarlılık, F1, karışıklık matrisi ve ROC ile değerlendirme'],
      expected: 'Gelecek çalışma: modeli yorumlanabilir tutarak daha çeşitli ve düşmanca e-postalarda test etmek, çok dilli kapsam için Türkçeye genişletmek ve transformer tabanlı modellerle karşılaştırmak.',
    },
    {
      title: 'PHQ-9 Depresyon Analizi',
      field: 'Veri Analizi · Ruh Sağlığı', accent: '#00e5a0', status: 'completed',
      abstract: 'PHQ-9 depresyon tarama yanıtlarının yapay zekâ ve veri analizi teknikleriyle incelenmesi. Yaklaşık 100 katılımcıyla canlı bir çalışma yürütüldü ve bulgular sahnede sunulup tartışıldı. Canlı çalışma artık tamamlandı. Bu keşifsel bir araştırmadır; klinik bir araç ya da yayınlanmış bir çalışma değildir.',
      methods: ['~100 gerçek PHQ-9 yanıtıyla canlı bir çalışma yürütüldü', 'Şiddet sınıflandırmalı klinik puanlama', 'Yanıtların istatistiksel analizi ve makine öğrenmesiyle keşfi', 'Bulgular sahnede sunulup tartışıldı'],
      expected: 'Tamamlanan bu çalışma; yapay zekâ ve veri analizinin ruh sağlığı değerlendirmesini, asla onun yerine geçmeden ve her zaman gerekli özenle, nasıl destekleyebileceğini inceledi.',
    },
  ],

  // Resume page
  resumeBack: 'Ana Sayfa',
  resumeBadge: 'CV',
  resumeTitle: 'Görkem Ergüne',
  resumeRole: 'Bilgisayar Mühendisliği Öğrencisi · Yapay Zekâ Ürün Geliştiricisi',
  resumePrint: 'PDF olarak kaydet',
  resumeSummary: 'İkinci sınıf Bilgisayar Mühendisliği öğrencisi ve kendi yolunu çizen bir yapay zekâ mühendisi adayıyım. Araştırma odaklı bir yaklaşımla bilgisayarlı görü sistemleri, makine öğrenmesi işlem hatları ve full-stack yazılımlar geliştiriyorum; üretip yayınlamayı alışkanlık hâline getirdim.',
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

  // Algorithm Journey
  navCompetitions: 'Yarışmalar',
  algoKicker: 'ALGORİTMA YOLCULUĞU // GITHUB’DAN CANLI',
  algoSub: 'Farklı platformlarda çözdüğüm problemler. Algorithms depomdan canlı çekilir ve her push ile güncellenir.',
  algoTotalLabel: 'Toplam Çözülen',
  algoLive: 'CANLI',

  // Competitions page
  compBack: 'Ana Sayfa',
  compBadge: 'YARIŞMALAR',
  compLabel: 'Yarışmalar',
  compSub: 'Hackathonlar, algoritma yarışmaları ve yarışmacı programlama kampları: yolculuğun rekabetçi tarafı.',
  compScore: 'Skor',
  compRank: 'Sıralama',
  compTeam: 'Takım',
  compAchievements: 'Öne Çıkanlar',
  compProject: 'Proje',
  compTBD: 'Yakında',
  compVisit: 'Git',

  // Life Flow (semester roadmap)
  journeyNow: 'BURADASIN',
  journeyFocusLabel: 'Güncel odak',
  journeyFocus: ['Büyük Dil Modelleri', 'Bilgisayarlı Görü', 'Makine Öğrenmesi', 'Algoritmalar'],
  journeyExpand: 'Aç',
  journeyLockedNote: 'Kilitli; sırası gelince açılır.',
  semCompetitions: 'Yarışmalar',
  semHackathons: 'Hackathonlar',
  semResearch: 'Araştırma',
  semProjects: 'Projeler',
  semAchievements: 'Başarılar',
  journeySemesters: [
    { term: '2024 Güz', sub: '(A2 Hazırlık)', status: 'completed', title: 'İngilizce Hazırlık — Temeli Kurmak',
      competitions: [], hackathons: [], research: [], projects: [], achievements: ['Tamamen İngilizcemi geliştirmeye odaklandım'] },
    { term: '2025 Bahar', sub: '(B1 Hazırlık)', status: 'completed', title: 'Hazırlık — Okuma & İlk Kodlar',
      competitions: [], hackathons: [], research: [], projects: ['Python’a başladım', 'HTML & CSS'], achievements: ['Yoğun İngilizce okuma: makaleler & akademik metinler', 'Kod yazmaya başladım'] },
    { term: '2025 Yaz', sub: '(B2 Hazırlık)', status: 'completed', title: 'Speaking, Yapay Zekâ & İlk Projeler',
      competitions: [], hackathons: [], research: [], projects: ['Mini LLM projesi', 'Temel problem çözme'], achievements: ['İngilizce speaking’i geliştirdim', 'Yapay zekâ öğrenmeye başladım'] },
    { term: 'Eylül 2025', sub: '(1. Yıl · 1. Dönem)', status: 'completed', title: 'Bilgisayar Mühendisliği — İlk Gün',
      competitions: [], hackathons: [], research: [], projects: [], achievements: ['Bilgisayar Mühendisliğine başladım', 'Python ile gelişim: veri yapıları & algoritmalar', 'Yarışmacı programlamaya başlangıç'] },
    { term: 'Ekim 2025', sub: '(1. Yıl · 1. Dönem)', status: 'completed', title: 'İlk Yarışma & Makine Öğrenmesi',
      competitions: ['IEEEXtreme'], hackathons: [], research: [], projects: ['Task Manager', 'Bank App'], achievements: ['ML & Data Science’a başladım'] },
    { term: 'Kasım 2025', sub: '(1. Yıl · 1. Dönem)', status: 'completed', title: 'Üretme & Sağlık Araştırması',
      competitions: [], hackathons: [], research: ['Sağlık alanında araştırmaya başladım'], projects: ['Quizzer', 'Küçük Kaggle projeleri'], achievements: ['Pratik için küçük uygulamalar geliştirdim'] },
    { term: 'Aralık 2025', sub: '(1. Yıl · 1. Dönem)', status: 'completed', title: 'NEXA Kuruldu',
      competitions: ['AlgoLeague Kış Kampı'], hackathons: [], research: [], projects: [], achievements: ['Kendi ekibim NEXA’yı kurdum'] },
    { term: 'Ocak 2026', sub: '(1. Yıl · 1. Dönem · finaller)', status: 'completed', title: 'Finaller & Kapanan İlk Dönem',
      competitions: [], hackathons: [], research: [], projects: [], achievements: ['1. Yıl · 1. Dönem’i finallerle kapattım', 'Calculus I’den AA aldım', 'Sömestr tatili — yoğun bireysel çalışma'] },
    { term: 'Şubat 2026', sub: '(1. Yıl · 2. Dönem başlangıcı)', status: 'completed', title: '2. Dönem Başladı — Sıfırdan C',
      competitions: ['AlgoLeague Bahar Kampı'], hackathons: [], research: [], projects: [], achievements: ['Sıfırdan C öğrenmeye başladım'] },
    { term: 'Mart 2026', sub: '(1. Yıl · 2. Dönem)', status: 'completed', title: 'Üreterek C Öğrenmek',
      competitions: [], hackathons: [], research: [], projects: ['Sorting Visualizer', 'Space Shooter'], achievements: ['C ile gerçek programlar yazdım', 'Yarışmacı programlamaya devam'] },
    { term: 'Nisan 2026', sub: '(1. Yıl · 2. Dönem)', status: 'completed', title: 'Donanıma Yakın & İlk Hackathon',
      competitions: [], hackathons: ['BTK E-Ticaret Hackathon'], research: [], projects: ['GorkemOS', 'NEXA Web Sitesi'], achievements: ['C & Assembly ile sıfırdan işletim sistemi', 'Derin Öğrenmeye giriş'] },
    { term: 'Mayıs 2026', sub: '(1. Yıl · 2. Dönem)', status: 'completed', title: 'Hackathonlar, Araştırma & İngilizce',
      competitions: [], hackathons: ['Tıkla Gelsin Foodathon', 'Med-Health Erken Uyarı'], research: ['PHQ-9 Depresyon Analizi'], projects: ['Synonym Master', 'Find The Best'], achievements: ['İngilizcede C1 seviyesine ulaştım', 'İlk uygulamalı ML araştırma projesi'] },
    { term: 'Haziran 2026', sub: '(1. Yıl · 2. Dönem · finaller)', status: 'completed', title: 'Görüntü İşleme & Staj',
      competitions: ['AlgoLeague Yaz Kampı'], hackathons: [], research: ['E-posta Oltalama Tespiti'], projects: ['Yüz Tespiti'], achievements: ['Online staj tamamladım', '2. Dönem’i Calculus II’den AA ile kapattım'] },
    { term: 'Temmuz 2026', sub: '(Şu an · yaz)', status: 'current', title: 'Yapay Zekâ Dalgası — Modeller, Benchmarklar & Kendi İnce Ayarlarım',
      competitions: [], hackathons: [], research: ['Poz-Değişmez Yüz Kimliği'], projects: ['YOLO Özel Dedektör', 'Re-Minder', 'FaceLock', 'WorldCup BPE Tokenizer', 'wiki2bpe', 'ayarlicazhocam-training', 'MIHENK Benchmark’ı', 'Araç Ajanı'], achievements: ['Kendi iki LLM ince ayarımı geliştirip kıyasladım', 'Araç/fonksiyon çağırmayı uçtan uca öğrendim', 'LLM · ML · DL alanında daha derin çalışma', 'Makale okumaları'] },
  ],
  // Blog detail content
  blogPosts: {
    'calculus-aa': {
      title: 'Calculus I ve Calculus II’den Nasıl AA Aldım?',
      category: 'Üniversite', date: 'Haz 2026', readTime: '6 dk',
      description: 'İki dönem calculus’ı yüksek notla bitirmemi sağlayan şey yetenek değil, alışkanlıklardı.',
      body: [
        'Birçoğumuzun kanayan yarası matematik. Özellikle mühendislik öğrencilerinin en çok zorlandığı derslerden biri de kalkülüs. Ben de kendi deneyimimi paylaşayım, belki birilerine faydası olur.',
        'En baştan başlayayım. YKS zamanından beri matematiğim iyiydi ve gerçekten severek çalışıyordum; bunun elbette büyük katkısı var. Birinci sınıfa başlamadan önce yüksek bir GPA hedefi koyduğum için yaz tatilinde Calculus çalışmaya başlamıştım. Açıkçası dönüp baktığımda buna hiç gerek yokmuş, boş yere stres yapmışım.',
        'İlk haftalarda dersleri dikkatle dinliyordum çünkü konuların çoğunu yazın gördüğüm için anlatılanları rahat anlayabiliyordum. Fakat dönem ilerledikçe projeler, araştırmalar ve diğer işler derken dersleri iyice saldım. Perşembe günleri sadece iki saat matematik dersim vardı ve çoğu zaman okula bile gitmiyordum. Neyse ki yoklama büyük bir problem oluşturmuyordu.',
        'Calculus I vizesi: sınava yaklaşık bir hafta kala çalışmaya başladım. YouTube’da Boğaziçili’nin Calculus videolarını açıp tüm konuları bitirdim, ardından çıkmış soruları çözdüm. Ama sadece çözümlerini izlemek yerine soruları tahtaya yazarak kendim çözene kadar uğraştım. Toplamda sadece iki akşam, yaklaşık ikişer saat çıkmış soru çözdüm; videoları da 2x hızda izlediğim için toplam çalışma sürem oldukça kısaydı. Sonuç: 96.',
        'Final haftası ise tam anlamıyla felaketti. Finalden önceki hafta yılbaşıydı ve çalışma düzenim tamamen bozulmuştu. Üstelik aynı gün hem İngilizce hem de Calculus sınavım vardı, iki derste de ciddi konu eksiklerim vardı. Sabaha kadar bir yandan İngilizce kelime ezberlerken diğer yandan Calculus videolarını izledim, sınava neredeyse uykusuz girdim. İngilizceden BB aldım. Calculus sınavının vize kadar iyi geçmediğini düşünüyordum ama dönem içindeki notlar sayesinde dersi AA ile kapattım.',
        'Calculus II’de de vizeye hazırlanırken yine aynı yöntemi kullandım. Fakat bu dönem dersleri daha da fazla salmıştım; neredeyse bütün sınavlara sadece 2-3 gün kala çalışmaya başladım. Günlerimin büyük kısmı projeler, araştırmalar ve algoritma çalışmakla geçiyordu. Vizeden 75 civarı aldım, benim için fena değildi ama sınıf ortalaması 60 falandı. Derslere gitsem bile çoğu zaman arka tarafta bilgisayarımı açıp algoritma soruları çözüyordum; çok örnek bir öğrenci değildim diyebilirim. 😅 Final zamanı ise üç gün boyunca kendimi kapatıp yoğun çalıştım ve Calculus II’yi de AA ile tamamladım.',
        'Benim tavsiyem: yüksek not almanın sırrı saatlerce masa başında oturmak değil, doğru şekilde çalışmak. Boğaziçili’nin Calculus videolarını mutlaka izleyin; formülleri ezberlemek yerine neden öyle olduklarını anlamaya çalışın; çıkmış soruların çözümlerini hemen açmayın, önce kendiniz uğraşın; çözemeseniz bile pes etmeyin, en çok gelişim o süreçte oluyor; ezber yerine mantığı kavrarsanız, farklı tipte sorular geldiğinde de çözebilirsiniz.',
        'Ben bu yöntemle iki dönemi de AA ile tamamladım. Aynı sonucu herkes alır diyemem çünkü herkesin matematik altyapısı farklı. Ancak mantığı anlayarak ve çıkmış sorular üzerinde gerçekten uğraşarak çalışırsanız, en azından yüksek bir harf notuyla dersi geçme ihtimaliniz ciddi şekilde artacaktır. Şimdiden herkese başarılar. 🚀',
      ],
    },
    'python-from-scratch': {
      title: 'Python’a Sıfırdan Nasıl Başlanmalı?',
      category: 'Programlama', date: 'May 2026', readTime: '6 dk',
      description: 'Yeni başlayanlar için Python’a giriş: önce ne öğrenmeli, şimdilik neyi gönül rahatlığıyla görmezden gelmeli.',
      body: [
        'Yazılıma başlamak isteyen birine en sık verilen tavsiye şudur: “Önce Python öğren.” Peki neden? Çünkü Python gerçekten öğrenmesi kolay bir dil; söz dizimi sade, okunabilir ve diğer dillere kıyasla daha az karmaşık.',
        'Fakat birçok kişinin düşündüğünün aksine, ilk başlayanlara zor gelmesinin sebebi Python değildir; yazılımın mantığını henüz bilmiyor olmalarıdır. Ben bunu ancak Python’dan sonra C öğrendiğimde fark ettim. Yazdığımız her satır kod bilgisayar tarafından belirli işlemlerden geçiriliyor: tanımladığımız değişkenler bellekte farklı adreslerde tutuluyor, fonksiyonlar çağrılıyor, veriler taşınıyor. Yazdığımız hiçbir şey “havada” gerçekleşmiyor. Bu mantığı kavradıktan sonra daha okunabilir, daha verimli ve daha doğru kod yazmaya başlıyorsunuz.',
        'Peki ben Python’u nasıl öğrendim? İlk başladığımda İngilizcem yaklaşık B1 seviyesindeydi. Udemy’den yabancı bir eğitmenin kursunu satın aldım ama açık konuşmak gerekirse hiçbir şey anlamıyordum. Eğitmen ne yazıyorsa ben de aynısını yazıyor, kodun neden çalıştığını bilmiyordum. Bir süre sonra kursta web geliştirme kısmına geçildi ve tamamen koptum. Daha sonra YouTube’da Türkçe bir kurs buldum ve bu sefer anlatılanları gerçekten anlamaya başladım; hatta sık sık “Demek yabancı eğitmen bunu anlatıyormuş” dediğimi hatırlıyorum. Kurs class’lara kadar geldi ve Python’un büyük kısmını anladığımı düşünüyordum — ama hâlâ kod yazamıyordum.',
        'Asıl gelişimi nasıl sağladım? Yaz tatilinde farklı bir kursa başladım ve çalışma yöntemimi tamamen değiştirdim. Bu kez videoyu izleyip kodu kopyalamak yerine önemli noktaları deftere not aldım, sonra videoyu kapatıp öğrendiklerimi sıfırdan kendim yazmaya çalıştım. İlk defa bu yöntemde gerçekten geliştiğimi hissettim. Çünkü öğrenmek ile izlemek aynı şey değil.',
        'Yaklaşık 7-8 aylık Python öğrenme sürecinde çıkardığım en önemli ders şu oldu: tutorial cehennemine düşmeyin. İnternette yüzlerce kurs, binlerce video var; bir kurs bitmeden başka bir kursa, sonra başka bir platforma geçiyorsunuz. Sonunda onlarca saat video izlemiş oluyorsunuz ama tek başınıza bir program yazamıyorsunuz. Bunun temel sebebi, çoğu tutorial’ın size yazılımın mantığını öğretmek yerine sadece belirli kodları yazdırması.',
        'Bu yüzden mümkün olduğunca resmi dokümantasyon okumaya çalışın. Ben C öğrenirken neredeyse hiç video izlemedim; sürecin büyük kısmı dokümantasyon okuyarak geçti ve şimdi dönüp baktığımda en verimli öğrenme yöntemlerinden biri olduğunu düşünüyorum.',
        'Bol bol kod yazın. Değişkenleri, koşulları, döngüleri ve fonksiyonları öğrendikten sonra artık video izlemek yerine kod yazmaya başlayın. Küçük de olsa projeler geliştirin, okul laboratuvarlarında verilen soruları çözün, internette algoritma problemleri çözün. Bizim okulun Python laboratuvarlarında daha ilk haftalarda class ve method soruluyordu; bence başlangıç seviyesi için gereğinden zordu ve birçok kişi daha ilk dönem yazılımdan soğudu.',
        'Son olarak: bir programlama dili öğrendikten sonra yeni bir dilin syntax’ını öğrenmek genellikle birkaç gün sürer; ama işin mantığını öğrenmek çok daha uzun bir süreçtir. Tavsiyem: sürekli tutorial değiştirmeyin, dokümantasyon okumayı alışkanlık hâline getirin, her izlediğiniz konuyu mutlaka kendiniz yazarak tekrar edin, öğrendiklerinizi küçük projelerle pekiştirin ve düzenli, planlı çalışın. Tamamen sıfırdan başlıyorsanız Python’u 2-3 haftada bitirmeye çalışmayın; kendinize en az 3 aylık bir süreç tanıyın. Sağlam bir temel oluşturursanız, sonrasında öğreneceğiniz her programlama dili çok daha kolay gelecektir.',
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
      title: '2026’da Bilgisayar Mühendisliği Okunur mu?',
      category: 'Kariyer', date: 'Mar 2026', readTime: '5 dk',
      description: 'Alana dürüst bir bakış: kime uyar, kimi bunaltır ve kimsenin önceden söylemediği şey nedir.',
      body: [
        'Son yılların en klasik sorusu: “Bu devirde Bilgisayar Mühendisliği okunur mu?” Yıl 2026, yapay zekâ hiç olmadığı kadar gelişmiş durumda. Aylık 20-30 dolarlık yapay zekâ araçları birçok işi inanılmaz hızlı yapabiliyor ve bu, özellikle üniversite tercih dönemindeki öğrencilerde ciddi bir gelecek kaygısı oluşturuyor: “Mezun olunca iş bulabilecek miyim?” Benim düşüncelerim şöyle.',
        '1. Gerçekten ilginiz yoksa okumayın. Sadece maaşı yüksek diye ya da “geleceğin mesleği” denildiği için bu bölümü seçmeyin. Bilgisayar mühendisliği sürekli problem çözmeyi, araştırmayı ve üretmeyi gerektiren bir alan; karşınıza zor dersler, uzun projeler ve bazen günlerce çözemeyeceğiniz problemler çıkacak. Bunlardan keyif almıyorsanız dört yıl sizin için oldukça yorucu geçebilir.',
        '2. Kendinizi sürekli geliştirmek zorundasınız. Bu bölüm “okulu bitireyim, gerisi gelir” diyebileceğiniz bölümlerden biri değil. Teknoloji her gün değişiyor; yeni kütüphaneler, framework’ler, yapay zekâ modelleri ve araçlar çıkıyor. Birkaç ay hiçbir şey yapmadan durduğunuzda bile birçok yeniliği kaçırabiliyorsunuz.',
        '3. İngilizce çok önemli. En güncel bilgiler genellikle İngilizce yayımlanıyor; dokümantasyonlar, akademik makaleler, GitHub projeleri ve teknik içeriklerin büyük kısmı İngilizce. Önceki blog yazılarımda da söylediğim gibi, yazılım öğrenirken bol bol dokümantasyon ve makale okuyacaksınız. İngilizceniz zayıfsa sürekli çeviri yapmak zorunda kalırsınız, bu da hem öğrenme hızınızı düşürür hem zaman kaybettirir. Üniversiteye başlamadan önce İngilizcenizi mümkün olduğunca geliştirmeye çalışın.',
        '4. Aktif ve girişimci olun. Bu bölüm sadece ders çalışarak ilerleyeceğiniz bir alan değil. Projeler geliştirin, yarışmalara katılın, hackathon’lara gidin, açık kaynak projelere katkı sağlayın. Boş zamanlarınızda bile sektörü takip edin — LinkedIn, X, YouTube veya teknik bloglar. Her gün kod yazmanız gerekmeyebilir ama sektörde neler olduğunu bilmeniz büyük avantaj sağlar.',
        '5. Şehir gerçekten fark ediyor — en az konuşulan konulardan biri. İstanbul’da (ya da Ankara’da ODTÜ, Bilkent, Hacettepe gibi üniversitelerde) değilseniz birçok etkinliğe, yarışmaya ve networking fırsatına ulaşmanız zorlaşabiliyor. Gelişimin önemli bir kısmı, sizden daha iyi insanları görmek ve onlardan bir şeyler öğrenebilmek; projelerde birlikte çalışacağınız ekip arkadaşlarını bulmak ve güçlü bir çevre oluşturmak kariyerinizde ciddi fark yaratıyor.',
        'Peki bütün bunlara rağmen okunur mu? Bence evet — ama sadece diplomasına güvenerek değil. Bu bölüm artık size sadece üniversitenin öğrettikleriyle yetinme lüksü tanımıyor; sürekli öğrenmeye, üretmeye ve kendinizi geliştirmeye istekli olmanız gerekiyor. Teknolojiye gerçekten ilginiz varsa, araştırmayı seviyorsanız ve bilgisayar başında vakit geçirmek sizi mutlu ediyorsa hâlâ çok güzel bir bölüm. Ama sadece “iş garantisi varmış” düşüncesiyle tercih edecekseniz, kararınızı bir kez daha gözden geçirmenizi öneririm.',
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
