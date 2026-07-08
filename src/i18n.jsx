import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const en = {
  // Nav
  navAbout: 'About',
  navJourney: 'Journey',
  navFocus: 'Focus',
  navBlog: 'Blog',
  navContact: 'Contact',

  // Hero
  heroChip: 'Portfolio / Version 2.06 / 2026',
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
  blogSub: 'Writing & guides',
  blogItems: [
    { tag: '01', title: 'How to Get AA in Calculus 1-2', note: 'Tips and strategies for acing Calculus.', slug: 'calculus-aa', status: 'soon' },
    { tag: '02', title: 'Python from Scratch', note: 'A complete beginner guide to Python.', slug: 'python-from-scratch', status: 'soon' },
    { tag: '03', title: 'C from Scratch', note: 'Learn C from the ground up.', slug: 'c-from-scratch', status: 'soon' },
    { tag: '04', title: 'Should You Study Computer Engineering?', note: 'An honest take on the field.', slug: 'should-you-study-cs', status: 'soon' },
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

  // Project Page
  projectBack: 'Home',
  projectDetailBack: 'Hall of Armor',
  projectBadge: 'HALL OF ARMOR',
  projectLabel: 'Armory',
  projectSub: 'Twelve armors, one per project. Open a capsule to inspect its specs, architecture, and results.',
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
  rdBottomNote: 'This blog post is coming soon. Content will be added over time.',
  rdBottomLink: 'Back to all Blog posts',
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
  blogPosts: {},
};

const tr = {
  // Nav
  navAbout: 'Hakkımda',
  navJourney: 'Yolculuk',
  navFocus: 'Odak',
  navBlog: 'Blog',
  navContact: 'İletişim',

  // Hero
  heroChip: 'Portfolyo / Sürüm 2.06 / 2026',
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
  blogSub: 'Yazılar ve rehberler',
  blogItems: [
    { tag: '01', title: 'Calculus 1-2’de Nasıl AA Alınır', note: 'Calculus’ta yüksek not için ipuçları ve stratejiler.', slug: 'calculus-aa', status: 'soon' },
    { tag: '02', title: 'Sıfırdan Python', note: 'Yeni başlayanlar için eksiksiz bir Python rehberi.', slug: 'python-from-scratch', status: 'soon' },
    { tag: '03', title: 'Sıfırdan C', note: 'C’yi temelden öğrenin.', slug: 'c-from-scratch', status: 'soon' },
    { tag: '04', title: 'Bilgisayar Mühendisliği Okumalı mısın?', note: 'Alana dair dürüst bir değerlendirme.', slug: 'should-you-study-cs', status: 'soon' },
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

  // Project Page
  projectBack: 'Ana Sayfa',
  projectDetailBack: 'Zırh Deposu',
  projectBadge: 'ZIRH DEPOSU',
  projectLabel: 'Cephanelik',
  projectSub: 'On iki zırh, her biri bir proje. Özellikleri, mimariyi ve sonuçları incelemek için bir kapsül aç.',
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
  rdBottomNote: 'Bu blog yazısı yakında yayında olacak. İçerik zamanla eklenecek.',
  rdBottomLink: 'Tüm blog yazılarına dön',
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
  blogPosts: {},
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
