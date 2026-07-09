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
  heroRoleValue: '1st year Computer Engineering student',
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
  introLeadPre: "I'm Görkem — a first-year Computer Engineering student turning ",
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
    { category: 'Career', date: 'Jun 2026', readTime: '3 min', title: 'Why I Build in Public', excerpt: 'Shipping small projects openly turned out to be the fastest way to learn — and the scariest.', slug: 'why-i-build-in-public' },
    { category: 'Computer Vision', date: 'Jun 2026', readTime: '3 min', title: 'My First Real Computer Vision Model', excerpt: 'What 117 photos of a single pen taught me about datasets, overfitting, and patience.', slug: 'computer-vision-first-model' },
    { category: 'Deep Learning', date: 'May 2026', readTime: '4 min', title: 'A Gentle Intuition for Transformers', excerpt: 'Attention is just asking every word which other words it should listen to. Here is the picture in my head.', slug: 'transformers-intuition' },
    { category: 'Machine Learning', date: 'May 2026', readTime: '3 min', title: 'Why TF-IDF Still Beats Fancy Models', excerpt: 'A logistic regression on TF-IDF hit 0.99 F1 on phishing email. Sometimes the boring tool wins.', slug: 'tfidf-still-matters' },
    { category: 'Algorithms', date: 'Apr 2026', readTime: '3 min', title: 'The Day Big-O Finally Clicked', excerpt: 'Watching sorting algorithms animate frame by frame did what a hundred lecture slides could not.', slug: 'big-o-that-clicked' },
    { category: 'Software Engineering', date: 'Apr 2026', readTime: '4 min', title: 'Clean Code Lessons I Learned the Hard Way', excerpt: 'Every naming and structure rule I now follow came from a past project I could no longer read.', slug: 'clean-code-student' },
    { category: 'University Life', date: 'Mar 2026', readTime: '3 min', title: 'Surviving First-Year Computer Engineering', excerpt: 'Calculus, C pointers, and the quiet realization that consistency beats intensity every time.', slug: 'surviving-first-year-ce' },
    { category: 'AI', date: 'Mar 2026', readTime: '4 min', title: 'The Roadmap I Would Give My First-Year Self', excerpt: 'If I could start over, this is the order I would learn AI engineering in — and what I would skip.', slug: 'ai-engineer-roadmap' },
    { category: 'Computer Vision', date: 'Feb 2026', readTime: '3 min', title: 'Teaching a Model to See One Object', excerpt: 'Single-class detection sounds trivial until you try it. Diversity in the data is everything.', slug: 'small-data-detection' },
    { category: 'Technology', date: 'Feb 2026', readTime: '3 min', title: 'The Tools That Earn Their Place', excerpt: 'A short, honest list of the software I actually keep open all day — and why the rest got deleted.', slug: 'tools-that-earn-their-place' },
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

  // Blog detail content
  blogPosts: {
    'why-i-build-in-public': {
      title: 'Why I Build in Public',
      category: 'Career', date: 'Jun 2026', readTime: '3 min',
      description: 'Shipping small projects openly turned out to be the fastest way to learn — and the scariest.',
      body: [
        'For a long time I kept my projects in private repositories, telling myself I would share them once they were "good enough." That day never came. There is always one more bug, one more feature, one more excuse. At some point I realized the polish I was waiting for was just fear wearing a nicer outfit.',
        'Building in public flipped that. When a project has a README, screenshots, and a link someone might actually click, I hold myself to a different standard. I write cleaner commits. I explain my decisions. I catch mistakes I would have shrugged off in private. The audience does not even have to be large — the mere possibility of one is enough to raise the bar.',
        'It is also the fastest feedback loop I have found. A stranger pointing out a flaw in my approach teaches me more in five minutes than a week of solo debugging. And every finished, visible project becomes a small proof of work: not a promise that I can build something, but evidence that I already did.',
        'My advice to anyone hesitating: ship the small thing. Not the perfect thing. The small, honest, finished thing. Momentum compounds, and confidence is a side effect of shipping, not a prerequisite for it.',
      ],
    },
    'computer-vision-first-model': {
      title: 'My First Real Computer Vision Model',
      category: 'Computer Vision', date: 'Jun 2026', readTime: '3 min',
      description: 'What 117 photos of a single pen taught me about datasets, overfitting, and patience.',
      body: [
        'I wanted to train an object detector on something that existed in no public dataset, so I picked the most ordinary object on my desk: a single mechanical pencil. The plan sounded easy — take some photos, label them, fine-tune a model. The reality was a crash course in why data quality matters more than model choice.',
        'My first batch of photos was all shot on the same desk, in the same light, from the same angle. The model reached great numbers in training and then failed the moment I showed it the pen anywhere else. It had not learned the pen; it had memorized my desk. Fixing that meant going back and reshooting under different lighting, distances, backgrounds, and partial occlusions.',
        'That single change — diversity in the data — did more for accuracy than any hyperparameter I touched. The final model reached over 90% mAP@50 from only 117 images, because those images actually taught it what the object was rather than where it usually sat.',
        'The lesson stuck: when a model underperforms, the instinct is to reach for a bigger architecture. More often, the answer is hiding in your dataset.',
      ],
    },
    'transformers-intuition': {
      title: 'A Gentle Intuition for Transformers',
      category: 'Deep Learning', date: 'May 2026', readTime: '4 min',
      description: 'Attention is just asking every word which other words it should listen to.',
      body: [
        'Transformers sound intimidating until you strip them down to one idea: attention. Everything else — the layers, the normalization, the feed-forward blocks — is scaffolding around that single mechanism.',
        'Here is the picture in my head. Take a sentence and turn each word into a vector. Attention lets every word look at every other word and decide how much to care about it. In "the animal did not cross the street because it was tired," the word "it" quietly asks the rest of the sentence, "who am I referring to?" and attention lets it lean most heavily on "animal." No hand-written grammar rules; the model learns those relationships from data.',
        'Because every word attends to every other word at once, transformers process a whole sequence in parallel instead of one step at a time like older recurrent models. That parallelism is why they scale so well and why they took over natural language processing so quickly.',
        'You do not need the math to build a working intuition. Once you picture attention as words voting on which other words matter, papers that used to look like walls of symbols start reading like descriptions of something you already understand.',
      ],
    },
    'tfidf-still-matters': {
      title: 'Why TF-IDF Still Beats Fancy Models',
      category: 'Machine Learning', date: 'May 2026', readTime: '3 min',
      description: 'Sometimes the boring, decades-old tool is the right answer.',
      body: [
        'While building a phishing email classifier, I expected the interesting result to come from some heavyweight model. Instead, a logistic regression trained on plain TF-IDF features hit 0.99 F1 on the test set. The boring, decades-old approach won.',
        'TF-IDF works by weighting words: terms that are distinctive to a specific email count for a lot, while words that appear in every message count for almost nothing. Phishing mail leans on a recognizable vocabulary — verify, suspended, urgent, click here — and that signal survives beautifully in a simple bag-of-words representation. A linear model on top of it is more than enough to draw the line.',
        'The more instructive experiment was the comparison. I also trained a model on eight hand-crafted numerical features — word count, link count, and so on — and it topped out around 0.68 F1. Same problem, same classifier family, wildly different result. The difference was entirely in how the data was represented.',
        'The takeaway I keep coming back to: reach for the simplest model that could work, and spend your energy on the features. The representation of your data often matters more than the sophistication of your model.',
      ],
    },
    'big-o-that-clicked': {
      title: 'The Day Big-O Finally Clicked',
      category: 'Algorithms', date: 'Apr 2026', readTime: '3 min',
      description: 'Seeing sorting algorithms animate did what lecture slides could not.',
      body: [
        'I understood Big-O notation on paper long before I understood it in my gut. I could recite that quicksort is O(n log n) and bubble sort is O(n²), but the numbers stayed abstract — just symbols to reproduce on an exam.',
        'What changed things was building a sorting visualizer. Watching bars rearrange themselves frame by frame, I could finally see the difference. Bubble sort crawls: it compares neighbors over and over, and the whole array barely moves. Quicksort snaps: it partitions the data and collapses toward order in a fraction of the steps. The same input, wildly different amounts of work, right there on the screen.',
        'That visual made the growth curves real. O(n²) is not just a slower label; it is the algorithm visibly grinding as the array grows, while O(n log n) stays brisk. Seeing comparison counters tick up side by side turned a definition into an instinct.',
        'It reminded me that for a lot of computer science, the fastest path to understanding is to make the invisible visible. If a concept refuses to click, try to build the thing that lets you watch it happen.',
      ],
    },
    'clean-code-student': {
      title: 'Clean Code Lessons I Learned the Hard Way',
      category: 'Software Engineering', date: 'Apr 2026', readTime: '4 min',
      description: 'Every rule I follow came from a past project I could no longer read.',
      body: [
        'Nobody convinced me to write clean code with an argument. My own old projects did it, by becoming unreadable. Nothing humbles you like opening a file you wrote three months ago and having no idea what it does.',
        'The first lesson was naming. A variable called data or a function called process tells you nothing. When I came back to code full of names like that, I had to re-derive the logic from scratch every time. Names that say what they mean — participantScores, fetchResponses — are free documentation that never goes out of date.',
        'The second was structure. Early on I wrote enormous functions that did five things at once. They worked, right up until I needed to change one of those five things and could not touch it without risking the other four. Splitting logic into small, single-purpose pieces is not academic tidiness; it is what lets you change one part without holding your breath.',
        'The third was consistency. A tidy folder layout, a predictable file naming scheme, one obvious place for configuration — these sound trivial, but they are what turn a project into something you can navigate months later without a map.',
        'None of this is glamorous. But writing code your future self can read is one of the highest-return habits I have picked up, and it cost nothing but the discipline to slow down slightly today.',
      ],
    },
    'surviving-first-year-ce': {
      title: 'Surviving First-Year Computer Engineering',
      category: 'University Life', date: 'Mar 2026', readTime: '3 min',
      description: 'Consistency beats intensity, every single time.',
      body: [
        'First-year computer engineering is a strange mix of the abstract and the brutally concrete. One afternoon you are proving something in calculus that feels miles from any computer, and the next you are staring at a segmentation fault in C, learning exactly how unforgiving a pointer can be.',
        'The biggest thing I got wrong at the start was treating effort as something you summon in bursts before a deadline. Cramming works for a memorized fact and fails completely for a skill. You cannot cram your way into understanding recursion or into writing code that compiles under pressure. Those come from showing up in small doses, often.',
        'What actually worked was almost boring: a little every day. An hour of problems beats a panicked six-hour session the night before, because the daily version gives your brain time to consolidate between sessions. Consistency compounds; intensity just exhausts.',
        'The other quiet lesson was that struggling is not a sign you do not belong. Everyone around me was also confused, just about different things. The students who pulled ahead were rarely the "naturals" — they were the ones who kept going after the confusing part instead of concluding it meant they were not cut out for it.',
      ],
    },
    'ai-engineer-roadmap': {
      title: 'The Roadmap I Would Give My First-Year Self',
      category: 'AI', date: 'Mar 2026', readTime: '4 min',
      description: 'The order I would learn AI engineering in, and what I would skip.',
      body: [
        'If I could hand my first-year self a single page, it would not be a list of trendy models. It would be an order of operations, because most of the frustration in learning AI comes from doing the right things in the wrong sequence.',
        'Start with Python until it is boring. Not fancy Python — just fluent, comfortable, "I can express any idea quickly" Python. Everything downstream assumes it, and fighting the language while also fighting a new concept is twice the difficulty for no reason.',
        'Then learn the classics before the neural networks. Linear and logistic regression, train/test splits, overfitting, evaluation metrics. They are the vocabulary of the whole field, and a surprising number of real problems never need anything heavier. Skipping them to jump straight to deep learning is like learning to sprint before you can stand.',
        'Only then reach for deep learning, and learn it by building. One small computer vision project teaches you more about datasets, training, and failure than a month of watching lectures. Finish things, even tiny things, because a finished project forces you to confront the unglamorous 20% that tutorials quietly skip.',
        'What would I skip? Chasing every new model release, and collecting courses I never apply. Depth on a few fundamentals beats a shallow tour of everything.',
      ],
    },
    'small-data-detection': {
      title: 'Teaching a Model to See One Object',
      category: 'Computer Vision', date: 'Feb 2026', readTime: '3 min',
      description: 'Single-class detection sounds trivial until you try it.',
      body: [
        'Detecting a single class sounds like the easy version of object detection. Only one thing to find — how hard can it be? Harder than it looks, and for an interesting reason: with one class, the model has no other categories to contrast against, so everything rides on how well your data defines the object itself.',
        'The trap is uniformity. If every training photo shows the object in the same setting, the model quietly learns the setting instead of the object. It will score beautifully in validation and then fall apart on anything new, because it never had to separate the thing from its usual background.',
        'The fix is deliberate variety. Different lighting teaches it that the object is not defined by warm or cold color. Different distances teach scale. Cluttered backgrounds force it to isolate the object rather than the scene. Partial occlusions teach it to fire on incomplete evidence, which is exactly what real photos demand.',
        'Once I stopped thinking about the number of images and started thinking about the diversity of them, a small dataset became more than enough. Single-class detection is a good teacher precisely because it gives you nowhere to hide: the quality of your data is the quality of your model.',
      ],
    },
    'tools-that-earn-their-place': {
      title: 'The Tools That Earn Their Place',
      category: 'Technology', date: 'Feb 2026', readTime: '3 min',
      description: 'The software I actually keep open all day, and why the rest got deleted.',
      body: [
        'I used to collect tools the way some people collect browser tabs — compulsively, and with a vague sense that having them meant I was being productive. Eventually I realized most of them just added friction. So I ran a quiet experiment: if I did not reach for something in a month, it got uninstalled.',
        'What survived was a short list. A fast editor I know deeply, because familiarity beats features. A terminal, because the command line is the one interface that never goes out of style. Git, which quietly turned out to be the tool I would least want to give up. A single notes file for anything I want to remember. That is most of it.',
        'The pattern in the survivors is that they get out of the way. They are fast, they are predictable, and I do not have to think about the tool itself while I use it. The ones I deleted were usually the opposite — flashy, feature-rich, and demanding of my attention just to operate.',
        'The real lesson was not about any specific app. It was that the best setup is a small one you understand completely, not a large one you half-configure and never master. Tools should earn their place by disappearing.',
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
  heroRoleValue: '1. sınıf Bilgisayar Mühendisliği öğrencisi',
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
  introLeadPre: 'Ben Görkem — birinci sınıf Bilgisayar Mühendisliği öğrencisiyim ve ',
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
    { category: 'Kariyer', date: 'Haz 2026', readTime: '3 dk', title: 'Neden Açıkta Üretiyorum', excerpt: 'Küçük projeleri açıkça paylaşmak öğrenmenin en hızlı — ve en korkutucu — yolu çıktı.', slug: 'why-i-build-in-public' },
    { category: 'Bilgisayarlı Görü', date: 'Haz 2026', readTime: '3 dk', title: 'İlk Gerçek Bilgisayarlı Görü Modelim', excerpt: 'Tek bir kalemin 117 fotoğrafı bana veri kümeleri, aşırı öğrenme ve sabır hakkında çok şey öğretti.', slug: 'computer-vision-first-model' },
    { category: 'Derin Öğrenme', date: 'May 2026', readTime: '4 dk', title: 'Transformer’lara Sezgisel Bir Bakış', excerpt: 'Dikkat mekanizması aslında her kelimenin diğer hangi kelimeleri dinlemesi gerektiğini sormasıdır.', slug: 'transformers-intuition' },
    { category: 'Makine Öğrenmesi', date: 'May 2026', readTime: '3 dk', title: 'TF-IDF Neden Hâlâ Gösterişli Modelleri Yener', excerpt: 'TF-IDF üzerine kurulu bir lojistik regresyon, oltalama e-postada 0,99 F1 yaptı. Bazen sıkıcı araç kazanır.', slug: 'tfidf-still-matters' },
    { category: 'Algoritmalar', date: 'Nis 2026', readTime: '3 dk', title: 'Big-O’nun Kafamda Oturduğu Gün', excerpt: 'Sıralama algoritmalarını kare kare izlemek, yüz slaytın yapamadığını yaptı.', slug: 'big-o-that-clicked' },
    { category: 'Yazılım Mühendisliği', date: 'Nis 2026', readTime: '4 dk', title: 'Zor Yoldan Öğrendiğim Temiz Kod Dersleri', excerpt: 'Uyguladığım her isimlendirme ve yapı kuralı, artık okuyamadığım eski bir projeden geldi.', slug: 'clean-code-student' },
    { category: 'Üniversite Hayatı', date: 'Mar 2026', readTime: '3 dk', title: 'Bilgisayar Mühendisliğinde İlk Yıldan Sağ Çıkmak', excerpt: 'Calculus, C işaretçileri ve istikrarın yoğunluğu her seferinde yendiğine dair sessiz bir kavrayış.', slug: 'surviving-first-year-ce' },
    { category: 'Yapay Zekâ', date: 'Mar 2026', readTime: '4 dk', title: 'İlk Sınıftaki Kendime Vereceğim Yol Haritası', excerpt: 'Baştan başlasam yapay zekâ mühendisliğini hangi sırayla öğrenirdim — ve neyi atlardım.', slug: 'ai-engineer-roadmap' },
    { category: 'Bilgisayarlı Görü', date: 'Şub 2026', readTime: '3 dk', title: 'Bir Modele Tek Bir Nesneyi Görmeyi Öğretmek', excerpt: 'Tek sınıflı tespit denemeden önce basit görünür. Verideki çeşitlilik her şeydir.', slug: 'small-data-detection' },
    { category: 'Teknoloji', date: 'Şub 2026', readTime: '3 dk', title: 'Yerini Hak Eden Araçlar', excerpt: 'Gün boyu gerçekten açık tuttuğum yazılımların kısa, dürüst bir listesi — ve gerisini neden sildiğim.', slug: 'tools-that-earn-their-place' },
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

  // Blog detail content
  blogPosts: {
    'why-i-build-in-public': {
      title: 'Neden Açıkta Üretiyorum',
      category: 'Kariyer', date: 'Haz 2026', readTime: '3 dk',
      description: 'Küçük projeleri açıkça paylaşmak öğrenmenin en hızlı — ve en korkutucu — yolu çıktı.',
      body: [
        'Uzun süre projelerimi özel depolarda tuttum; kendime “yeterince iyi olunca” paylaşırım dedim. O gün hiç gelmedi. Her zaman düzeltilecek bir hata, eklenecek bir özellik, uydurulacak bir bahane oluyordu. Bir noktada fark ettim ki beklediğim o cila, aslında daha şık bir kılığa girmiş korkudan başka bir şey değildi.',
        'Açıkta üretmek bunu tersine çevirdi. Bir projenin README’si, ekran görüntüleri ve gerçekten tıklanabilecek bir bağlantısı olunca kendimi bambaşka bir çıtaya tutuyorum. Daha temiz commit’ler yazıyorum. Kararlarımı açıklıyorum. Özelde omuz silkip geçeceğim hataları yakalıyorum. İzleyici kitlesinin büyük olması bile gerekmiyor — bir kişinin olma ihtimali bile çıtayı yükseltmeye yetiyor.',
        'Ayrıca bulduğum en hızlı geri bildirim döngüsü bu. Bir yabancının yaklaşımımdaki kusuru göstermesi, bana tek başıma bir haftalık hata ayıklamadan daha fazlasını beş dakikada öğretiyor. Bitmiş ve görünür her proje, küçük bir emek kanıtına dönüşüyor: bir şey üretebileceğime dair bir söz değil, çoktan ürettiğime dair bir delil.',
        'Tereddüt eden herkese tavsiyem: küçük olanı yayınla. Mükemmel olanı değil. Küçük, dürüst, bitmiş olanı. İvme kendini katlar ve özgüven, yayınlamanın bir ön koşulu değil, yan ürünüdür.',
      ],
    },
    'computer-vision-first-model': {
      title: 'İlk Gerçek Bilgisayarlı Görü Modelim',
      category: 'Bilgisayarlı Görü', date: 'Haz 2026', readTime: '3 dk',
      description: 'Tek bir kalemin 117 fotoğrafı bana veri kümeleri, aşırı öğrenme ve sabır hakkında çok şey öğretti.',
      body: [
        'Hiçbir açık veri kümesinde bulunmayan bir şey üzerinde nesne tespiti eğitmek istedim; bu yüzden masamdaki en sıradan nesneyi seçtim: tek bir mekanik kalem. Plan kolay kulağa geliyordu — birkaç fotoğraf çek, etiketle, bir modeli ince ayarla. Gerçekse, veri kalitesinin neden model seçiminden daha önemli olduğunu anlatan hızlandırılmış bir ders oldu.',
        'İlk fotoğraf grubunu hep aynı masada, aynı ışıkta, aynı açıdan çekmiştim. Model eğitimde harika sayılar tutturdu, sonra kalemi başka bir yerde gösterdiğim an çöktü. Kalemi öğrenmemişti; masamı ezberlemişti. Bunu düzeltmek, geri dönüp farklı ışıklarda, mesafelerde, arka planlarda ve kısmi kapanmalarla yeniden çekim yapmak demekti.',
        'İşte o tek değişiklik — verideki çeşitlilik — doğruluğa dokunduğum herhangi bir hiperparametreden çok daha fazlasını kattı. Nihai model yalnızca 117 görselle %90’ın üzerinde mAP@50’ye ulaştı; çünkü artık o görseller ona nesnenin genelde nerede durduğunu değil, ne olduğunu öğretiyordu.',
        'Ders aklımda kaldı: bir model beklentiyi karşılamayınca ilk içgüdü daha büyük bir mimariye uzanmak olur. Oysa cevap çoğu zaman veri kümenin içinde saklıdır.',
      ],
    },
    'transformers-intuition': {
      title: 'Transformer’lara Sezgisel Bir Bakış',
      category: 'Derin Öğrenme', date: 'May 2026', readTime: '4 dk',
      description: 'Dikkat mekanizması aslında her kelimenin diğer hangi kelimeleri dinlemesi gerektiğini sormasıdır.',
      body: [
        'Transformer’lar, tek bir fikre indirgeyene kadar korkutucu gelir: dikkat (attention). Geri kalan her şey — katmanlar, normalleştirme, ileri beslemeli bloklar — bu tek mekanizmanın etrafına kurulmuş iskeledir.',
        'Kafamdaki resim şöyle. Bir cümle al ve her kelimeyi bir vektöre dönüştür. Dikkat, her kelimenin diğer tüm kelimelere bakıp onlara ne kadar önem vereceğine karar vermesini sağlar. “Hayvan yorgun olduğu için karşıya geçmedi” cümlesinde “o” kelimesi sessizce cümlenin geri kalanına “ben kimi kastediyorum?” diye sorar ve dikkat, en çok “hayvan” kelimesine yaslanmasını sağlar. Elle yazılmış dilbilgisi kuralı yok; model bu ilişkileri veriden öğrenir.',
        'Her kelime aynı anda diğer tüm kelimelere dikkat ettiği için, transformer’lar bir diziyi eski yinelemeli modellerdeki gibi adım adım değil, bütün hâlinde paralel işler. Bu paralellik, hem neden bu kadar iyi ölçeklendiklerinin hem de doğal dil işlemeyi bu kadar hızlı ele geçirmelerinin nedenidir.',
        'Çalışan bir sezgi için matematiğe ihtiyacın yok. Dikkati, kelimelerin hangi diğer kelimelerin önemli olduğuna dair oy vermesi olarak zihninde canlandırdığında, eskiden semboller duvarı gibi görünen makaleler, zaten anladığın bir şeyin tarifi gibi okunmaya başlar.',
      ],
    },
    'tfidf-still-matters': {
      title: 'TF-IDF Neden Hâlâ Gösterişli Modelleri Yener',
      category: 'Makine Öğrenmesi', date: 'May 2026', readTime: '3 dk',
      description: 'Bazen sıkıcı, onlarca yıllık araç doğru cevaptır.',
      body: [
        'Bir oltalama e-posta sınıflandırıcısı yaparken, ilginç sonucun ağır sıklet bir modelden geleceğini bekliyordum. Bunun yerine, düz TF-IDF özellikleri üzerinde eğitilmiş bir lojistik regresyon test kümesinde 0,99 F1 tutturdu. Sıkıcı, onlarca yıllık yaklaşım kazandı.',
        'TF-IDF kelimeleri ağırlıklandırarak çalışır: belirli bir e-postaya özgü terimler çok, her mesajda geçen kelimeler ise neredeyse hiç sayılır. Oltalama postası tanıdık bir kelime dağarcığına yaslanır — doğrula, askıya alındı, acil, buraya tıkla — ve bu sinyal, basit bir kelime torbası temsilinde harikulade biçimde korunur. Üstüne konan doğrusal bir model, sınırı çizmeye fazlasıyla yeter.',
        'Daha öğretici deney ise karşılaştırmaydı. Elle çıkarılmış sekiz sayısal özellik — kelime sayısı, bağlantı sayısı vb. — üzerinde de bir model eğittim ve tavanı yaklaşık 0,68 F1’de kaldı. Aynı problem, aynı sınıflandırıcı ailesi, uçurum kadar farklı sonuç. Fark tamamen verinin nasıl temsil edildiğindeydi.',
        'Sürekli döndüğüm çıkarım şu: işe yarayabilecek en basit modele uzan ve enerjini özelliklere harca. Verinin temsili çoğu zaman modelin karmaşıklığından daha çok şey ifade eder.',
      ],
    },
    'big-o-that-clicked': {
      title: 'Big-O’nun Kafamda Oturduğu Gün',
      category: 'Algoritmalar', date: 'Nis 2026', readTime: '3 dk',
      description: 'Sıralama algoritmalarını izlemek, ders slaytlarının yapamadığını yaptı.',
      body: [
        'Big-O gösterimini kâğıt üzerinde, içime sinmesinden çok önce anlamıştım. Quicksort’un O(n log n), bubble sort’un O(n²) olduğunu ezbere sayabiliyordum ama sayılar soyut kalıyordu — sınavda tekrar üretilecek sembollerden ibaretti.',
        'İşleri değiştiren şey bir sıralama görselleştiricisi yapmak oldu. Çubukların kare kare yeniden dizilişini izleyince farkı nihayet görebildim. Bubble sort sürünür: komşuları defalarca karşılaştırır ve tüm dizi zar zor kımıldar. Quicksort ise adeta şaklar: veriyi bölümler ve çok daha az adımda düzene doğru çöker. Aynı girdi, ekranın orada gözler önünde, uçurum kadar farklı miktarda iş.',
        'O görsel, büyüme eğrilerini gerçek kıldı. O(n²) sadece “daha yavaş” etiketli değil; dizi büyüdükçe algoritmanın gözle görülür biçimde ağırlaşması demek — O(n log n) ise çevik kalıyor. Karşılaştırma sayaçlarının yan yana tıkır tıkır artışını görmek, bir tanımı bir içgüdüye dönüştürdü.',
        'Bana bilgisayar biliminin çoğu için anlamaya giden en hızlı yolun, görünmezi görünür kılmak olduğunu hatırlattı. Bir kavram bir türlü oturmuyorsa, onu izlemene imkân veren şeyi inşa etmeyi dene.',
      ],
    },
    'clean-code-student': {
      title: 'Zor Yoldan Öğrendiğim Temiz Kod Dersleri',
      category: 'Yazılım Mühendisliği', date: 'Nis 2026', readTime: '4 dk',
      description: 'Uyguladığım her kural, artık okuyamadığım eski bir projeden geldi.',
      body: [
        'Beni temiz kod yazmaya bir argüman ikna etmedi. Kendi eski projelerim, okunmaz hâle gelerek bunu yaptı. Üç ay önce yazdığın bir dosyayı açıp ne yaptığına dair hiçbir fikrinin olmaması kadar insanı hizaya sokan az şey vardır.',
        'İlk ders isimlendirmeydi. data adında bir değişken ya da process adında bir fonksiyon sana hiçbir şey anlatmaz. Bu tür isimlerle dolu koda geri döndüğümde, mantığı her seferinde sıfırdan çıkarmam gerekiyordu. Ne anlama geldiğini söyleyen isimler — katilimciSkorlari, yanitlariGetir — asla eskimeyen bedava belgelemedir.',
        'İkincisi yapıydı. Başlarda aynı anda beş iş yapan devasa fonksiyonlar yazıyordum. O beş işten birini değiştirmem gerekene kadar çalışıyorlardı; sonra diğer dördünü riske atmadan hiçbirine dokunamıyordum. Mantığı küçük, tek amaçlı parçalara bölmek akademik bir titizlik değildir; bir bölümü nefesini tutmadan değiştirebilmeni sağlayan şeydir.',
        'Üçüncüsü tutarlılıktı. Derli toplu bir klasör düzeni, öngörülebilir bir dosya adlandırması, yapılandırma için tek ve bariz bir yer — kulağa önemsiz gelir ama bir projeyi, aylar sonra haritasız gezebileceğin bir şeye dönüştüren tam da bunlardır.',
        'Bunların hiçbiri göz alıcı değil. Ama gelecekteki kendinin okuyabileceği kod yazmak, edindiğim en yüksek getirili alışkanlıklardan biri ve bugün biraz yavaşlama disiplininden başka hiçbir maliyeti yok.',
      ],
    },
    'surviving-first-year-ce': {
      title: 'Bilgisayar Mühendisliğinde İlk Yıldan Sağ Çıkmak',
      category: 'Üniversite Hayatı', date: 'Mar 2026', readTime: '3 dk',
      description: 'İstikrar, yoğunluğu her seferinde yener.',
      body: [
        'Bilgisayar mühendisliğinin ilk yılı, soyutla acımasızca somut olanın tuhaf bir karışımı. Bir öğleden sonra calculus’ta herhangi bir bilgisayardan fersah fersah uzak gibi duran bir şeyi ispatlıyorsun; hemen ardından C’de bir segmentation fault’a bakıp bir işaretçinin ne kadar affetmez olabileceğini birebir öğreniyorsun.',
        'Başta en yanlış yaptığım şey, çabayı bir teslim tarihinden önce patlamalarla toplanan bir şey gibi görmekti. Ezber, bir bilgi parçası için işe yarar; bir beceri için tamamen başarısız olur. Özyinelemeyi anlamayı ya da baskı altında derlenen kod yazmayı ezberleyemezsin. Bunlar sık sık, küçük dozlarda ortaya çıkmaktan gelir.',
        'Gerçekten işe yarayan şey neredeyse sıkıcıydı: her gün biraz. Bir saatlik problem çözümü, bir gece önceki panikli altı saatlik seansı yener; çünkü günlük hâli beynine seanslar arasında pekiştirme fırsatı verir. İstikrar kendini katlar; yoğunluksa sadece yorar.',
        'Diğer sessiz ders, zorlanmanın oraya ait olmadığının bir işareti olmadığıydı. Etrafımdaki herkes de kafası karışıktı, sadece farklı şeylerde. Öne geçen öğrenciler nadiren “doğuştan yetenekli” olanlardı — onlar, kafa karıştıran kısımdan sonra “demek ki bu iş bana göre değil” diye düşünmek yerine devam edenlerdi.',
      ],
    },
    'ai-engineer-roadmap': {
      title: 'İlk Sınıftaki Kendime Vereceğim Yol Haritası',
      category: 'Yapay Zekâ', date: 'Mar 2026', readTime: '4 dk',
      description: 'Yapay zekâ mühendisliğini hangi sırayla öğrenirdim ve neyi atlardım.',
      body: [
        'İlk sınıftaki kendime tek bir sayfa uzatabilseydim, bu, gündemdeki modellerin bir listesi olmazdı. Bir işlem sırası olurdu; çünkü yapay zekâ öğrenirken yaşanan sıkıntının çoğu, doğru şeyleri yanlış sırayla yapmaktan gelir.',
        'Python’la, sıkılana kadar başla. Gösterişli Python’la değil — sadece akıcı, rahat, “herhangi bir fikri hızlıca ifade edebilirim” diyebildiğin Python’la. Sonraki her şey bunu varsayar ve yeni bir kavramla boğuşurken bir de dille boğuşmak, sebepsiz yere iki kat zorluk demektir.',
        'Sonra sinir ağlarından önce klasikleri öğren. Doğrusal ve lojistik regresyon, eğitim/test bölmesi, aşırı öğrenme, değerlendirme metrikleri. Bunlar tüm alanın kelime dağarcığı ve şaşırtıcı sayıda gerçek problem hiçbir zaman daha ağır bir şeye ihtiyaç duymaz. Doğrudan derin öğrenmeye atlamak için bunları atlamak, ayakta durmadan koşmayı öğrenmeye benzer.',
        'Ancak ondan sonra derin öğrenmeye uzan ve onu inşa ederek öğren. Küçük bir bilgisayarlı görü projesi, sana veri kümeleri, eğitim ve başarısızlık hakkında bir aylık ders izlemekten daha fazlasını öğretir. Küçük de olsa işleri bitir; çünkü bitmiş bir proje, öğreticilerin sessizce atladığı o gösterişsiz %20’lik kısımla yüzleşmeye zorlar.',
        'Neyi atlardım? Her yeni model duyurusunun peşinden koşmayı ve hiç uygulamadığım kursları biriktirmeyi. Birkaç temelde derinlik, her şeyin yüzeysel bir turundan iyidir.',
      ],
    },
    'small-data-detection': {
      title: 'Bir Modele Tek Bir Nesneyi Görmeyi Öğretmek',
      category: 'Bilgisayarlı Görü', date: 'Şub 2026', readTime: '3 dk',
      description: 'Tek sınıflı tespit denemeden önce basit görünür.',
      body: [
        'Tek bir sınıfı tespit etmek, nesne tespitinin kolay sürümü gibi kulağa gelir. Bulunacak tek bir şey var — ne kadar zor olabilir ki? Göründüğünden zor ve ilginç bir nedenle: tek sınıfla modelin karşılaştıracağı başka kategori yoktur, dolayısıyla her şey verinin nesnenin kendisini ne kadar iyi tanımladığına bağlıdır.',
        'Tuzak, tekdüzeliktir. Her eğitim fotoğrafı nesneyi aynı ortamda gösteriyorsa, model sessizce nesne yerine ortamı öğrenir. Doğrulamada harika puan alır, sonra yeni herhangi bir şeyde dağılır; çünkü nesneyi alışıldık arka planından ayırması hiç gerekmemiştir.',
        'Çözüm, bilinçli çeşitliliktir. Farklı ışık, nesnenin sıcak ya da soğuk renkle tanımlanmadığını öğretir. Farklı mesafeler ölçeği öğretir. Karmaşık arka planlar, sahneyi değil nesneyi yalıtmaya zorlar. Kısmi kapanmalar, eksik ipuçlarına dayanarak karar vermeyi öğretir — ki gerçek fotoğrafların talep ettiği tam da budur.',
        'Görsel sayısını düşünmeyi bırakıp onların çeşitliliğini düşünmeye başladığımda, küçük bir veri kümesi fazlasıyla yeterli hâle geldi. Tek sınıflı tespit iyi bir öğretmendir; çünkü saklanacak hiçbir yer bırakmaz: verinin kalitesi, modelinin kalitesidir.',
      ],
    },
    'tools-that-earn-their-place': {
      title: 'Yerini Hak Eden Araçlar',
      category: 'Teknoloji', date: 'Şub 2026', readTime: '3 dk',
      description: 'Gün boyu gerçekten açık tuttuğum yazılımlar ve gerisini neden sildiğim.',
      body: [
        'Eskiden araçları, bazı insanların tarayıcı sekmeleri biriktirdiği gibi biriktirirdim — kompulsif biçimde ve onlara sahip olmanın verimli olduğum anlamına geldiğine dair belirsiz bir histe. Sonunda çoğunun yalnızca sürtünme eklediğini fark ettim. Böylece sessiz bir deney yaptım: bir ay boyunca uzanmadığım her şeyi kaldırdım.',
        'Hayatta kalanlar kısa bir listeydi. Derinlemesine bildiğim hızlı bir editör; çünkü aşinalık, özellikleri yener. Bir terminal; çünkü komut satırı, asla modası geçmeyen tek arayüz. Git — sessiz sedasız, en son vazgeçmek isteyeceğim araç çıktı. Hatırlamak istediğim her şey için tek bir not dosyası. Aşağı yukarı hepsi bu.',
        'Hayatta kalanlardaki ortak nokta, yoldan çekilmeleri. Hızlılar, öngörülebilirler ve onları kullanırken aracın kendisini düşünmek zorunda kalmıyorum. Sildiklerim genelde tam tersiydi — gösterişli, özellik dolu ve sırf çalıştırmak için bile dikkatimi talep eden.',
        'Asıl ders belirli bir uygulamayla ilgili değildi. En iyi kurulumun, yarım yamalak ayarlayıp asla ustalaşamadığın büyük bir düzenek değil, tamamen anladığın küçük bir düzenek olduğuydu. Araçlar, yerlerini gözden kaybolarak hak etmelidir.',
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
