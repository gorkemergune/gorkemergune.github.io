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
  heroBasedInValue: 'Istanbul, T\u00fcrkiye',
  heroStatus: 'STATUS',
  heroStatusValue: 'Currently focused on improving',
  heroTagline1: 'Focus on improving yourself, not proving yourself',
  heroTagline2: "Just trying to get better every day. \u2014 ",
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
  statToolsVal: 'Python \u00b7 React \u00b7 Node',
  statLanguages: 'Languages',
  statLanguagesVal: 'TR \u00b7 EN',
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
    { label: 'Reading', value: 'Title \u2014 Author' },
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
  puzzleLifeLost: '\u22121 life',
  puzzleWon: 'You sorted all 10 balls!',
  puzzleLost: 'Game over! You ran out of lives.',
  puzzleScore: 'Score',
  puzzleReset: 'New Game',
  puzzleReveal: 'Well-Ordering Principle',
  puzzleHide: 'Hide',
  puzzleExTitle: 'The Well-Ordering Principle',
  puzzleExP1: 'Every non-empty subset of positive integers has a least (minimum) element.',
  puzzleExP2: 'In this puzzle, you proved this by repeatedly finding the minimum of each remaining subset \u2014 essentially performing selection sort. The principle guarantees that a minimum always exists, so your task is always solvable.',
  puzzleExP3: 'Optimal strategy: use transitivity. If A < B and B < C, then A < C \u2014 no need to compare A and C directly.',
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
  hanoiExP1: 'The minimum number of moves to solve Tower of Hanoi with n disks is 2\u207F \u2212 1.',
  hanoiExP2: 'The recursive strategy: move n\u22121 disks to the auxiliary peg, move the largest disk to the target, then move n\u22121 disks from auxiliary to target.',
  hanoiExP3: 'Auxiliay: Peg 2 \u2014 Target: Peg 3. This puzzle demonstrates exponential growth \u2014 each additional disk doubles the minimum moves and adds one.',

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
  projectBadge: 'PROJECT',
  projectLabel: 'Project',
  projectSub: "What I'm paying attention to, now",

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
  armorMark1Name: 'The Algorithm',
  armorMark2Name: 'Cyber Scraping',
  armorMark3Name: 'Core Machine',
  armorMark4Name: 'Bio-Neural',
  armorMark5Name: 'Team Commander',
  armorMark1Desc: 'Foundation of computation. Every data structure, every sorting algorithm — mastered through obsessive practice.',
  armorMark2Desc: 'Intelligent web scraping meets AI reasoning. Finds the best options so you don\'t have to.',
  armorMark3Desc: 'Neural networks, deep learning architectures, and machine intelligence. The power core of the vault.',
  armorMark4Desc: 'Machine learning applied to medical diagnostics. Early Parkinson\'s detection via neural pattern analysis.',
  armorMark5Desc: 'Leadership module. Coordinating teams, managing projects, and building organizational systems.',
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
  navAbout: 'Hakkimda',
  navJourney: 'Yolculuk',
  navFocus: 'Odak',
  navBlog: 'Blog',
  navContact: 'Iletisim',

  // Hero
  heroChip: 'Portfolyo / Sürüm 2.06 / 2026',
  heroRole: 'ROL',
  heroRoleValue: 'Gelistirici \u00b7 Yaratici \u00b7 Merakli zihin',
  heroBasedIn: 'KONUM',
  heroBasedInValue: 'Istanbul, T\u00fcrkiye',
  heroStatus: 'DURUM',
  heroStatusValue: 'Sohbetlere acik',
  heroTagline1: 'Internette kucuk bir kose; urettiklerimi, okudugumu',
  heroTagline2: 've yurumekte oldugum yolu biraraya topladim \u2014 ',
  heroUnhurried: 'acelesiz',

  // Marquee
  marquee: ['Portfolyo', 'Blog', 'Odak', 'Anlar', 'Jurnal', 'Alan rehberi', 'Arsiv'],

  // About
  aboutLabel: 'Hakkimda',
  aboutLead: 'Bilgisayar muhendisligi ogrencisi, bir seyler yapip surecini yaziyorum.',
  statCurrently: 'Su anda',
  statCurrentlyVal: 'Yaziyorum & gelistiriyorum',
  statPreviously: 'Oncesinde',
  statPreviouslyVal: 'Topluluk / Takim lideri',
  statTools: 'Araclar',
  statToolsVal: 'React \u00b7 Node \u00b7 Python',
  statLanguages: 'Diller',
  statLanguagesVal: 'TR \u00b7 EN',
  statMail: 'E-posta',

  // Journey
  journeyLabel: 'Hayat akisi',
  journeySub: 'Kisa bir kronoloji',
  journeyItems: [
    { year: '20XX', title: 'Baslangic', body: 'Her seyin basladigi yer. Seni ceken sey hakkinda kisa bir satir.' },
    { year: '20XX', title: 'Ilk proje', body: 'Olusturucu bir deneyim \u2014 kurdagun bir ekip, gonderdigin bir site, yonettigin bir kulup.' },
    { year: '20XX', title: 'Donum noktasi', body: 'Degisimi anlat. Dusunceni ne degistirdi.' },
    { year: 'Simdi', title: 'Su an', body: 'Su anki bolumun neyle ilgili. Durust kal.' },
  ],

  // Focus
  focusLabel: 'Odak',
  focusSub: 'Su an neye odaklaniyorum',
  focusItems: [
    { label: 'Okuma', value: 'Baslik \u2014 Yazar' },
    { label: 'Gelistirme', value: 'Sessiz bir proje devam ediyor' },
    { label: 'Ogrenme', value: 'Her gun bir saat, yeni bir sey' },
    { label: 'Dinleme', value: 'Tekrarda bir album' },
  ],

  // Blog
  blogLabel: 'Blog',
  blogSub: 'Yazilar & rehberler',
  blogItems: [
    { tag: '01', title: "Calculus 1-2'de Nasil AA Alinir", note: 'Calculus icin ipuclari ve stratejiler.', slug: 'calculus-aa', status: 'soon' },
    { tag: '02', title: 'Sifirdan Python', note: 'Yeni baslayanlar icin Python rehberi.', slug: 'python-from-scratch', status: 'soon' },
    { tag: '03', title: 'Sifirdan C', note: "C'yi temelden ogren.", slug: 'c-from-scratch', status: 'soon' },
    { tag: '04', title: 'Bilgisayar Muhendisligi Yazilir mi?', note: 'Alan hakkinda durust bir bakis.', slug: 'should-you-study-cs', status: 'soon' },
  ],

  // Puzzle
  puzzleLabel: 'Bulmaca',
  puzzleSub: 'Algoritmayi cozebilir misin?',
  puzzleIntro: '10 renkli topun arkasinda 1-10 arasi gizli degerler var. Her turda kalan toplarin en kucugunu bul. Karsilastirmalar yaparak siralamayi coz.',
  puzzleRound: 'TUR',
  puzzleComparisons: 'KARSILASTIRMA',
  puzzleLives: 'CAN',
  puzzleCompare: 'Karsilastir',
  puzzleClaim: 'En Kucugu Sec',
  puzzleRemaining: 'Kalan',
  puzzleSorted: 'Siralanan',
  puzzleCompLog: 'Karsilastirma gecmisi',
  puzzleSelectTwo: 'Karsilastirmak icin iki top sec',
  puzzleSelectOne: 'Ilk topu sec',
  puzzleSelectSecond: 'Simdi ikinci topu sec',
  puzzleSelectMin: 'En kucuk degere sahip topu sec',
  puzzleCorrect: 'Dogru!',
  puzzleWrong: 'Yanlis!',
  puzzleHadValue: 'degeri',
  puzzleHasSmaller: 'daha kucuk bir degere sahip',
  puzzleLifeLost: '\u22121 can',
  puzzleWon: '10 topun hepsini siraladiniz!',
  puzzleLost: 'Oyun bitti! Canlariniz tukendi.',
  puzzleScore: 'Skor',
  puzzleReset: 'Yeni Oyun',
  puzzleReveal: 'Iyi Siralama Ilkesi',
  puzzleHide: 'Gizle',
  puzzleExTitle: 'Iyi Siralama Ilkesi (Well-Ordering Principle)',
  puzzleExP1: 'Pozitif tam sayilarin her bos olmayan alt kumesinin bir en kucuk elemani vardir.',
  puzzleExP2: 'Bu bulmacada, kalan her alt kumenin en kucugunu bularak bu ilkeyi kanitladiniz \u2014 esasen secimli siralama (selection sort) yaptiniz. Ilke, her zaman bir en kucuk elemanin var oldugunu garanti eder.',
  puzzleExP3: 'Optimal strateji: Gecislilik ozelligini kullanin. A < B ve B < C ise, A < C\'dir \u2014 A ile C\'yi dogrudan karsilastirmaya gerek yok.',
  puzzlePlayAgain: 'Tekrar Oyna',

  // Contact
  contactLabel: 'Iletisim',
  contactLine1: '',
  contactLine1Em: 'Konusalim',
  contactLine2: 'Ya da sadece merhaba de.',

  // Footer
  footerBuilt: 'Yavasca, elle yapildi.',

  // Nav Fun
  navFun: 'Eglence',

  // Fun Hub
  funLabel: 'Eglence',
  funSub: 'Arkadaslara göndermelik surprizler ve kafa dağıtmalık bulmacalar',
  funBack: 'Ana Sayfa',
  funBadge: 'EGLENCE',
  funSorryTitle: 'Özür Dilerim',
  funSorryDesc: 'Arkadaşına gönder ve baris.',
  funBirthdayTitle: 'Dogum Gunu',
  funBirthdayDesc: 'Arkadasina ozel dogum gunu pastasi olustur.',
  funHangmanTitle: 'Adam Asmaca',
  funHangmanDesc: 'Bilgisayar muhendisligi terimlerini tahmin et.',
  funPuzzleTitle: 'Bulmaca',
  funPuzzleDesc: 'Siralama algoritmasini cozebilir misin?',
  funHanoiTitle: 'Hanoi Kulesi',
  funHanoiDesc: 'Tum diskleri son cubuga tasi.',
  funMothersDayTitle: 'Anneler Günü',
  funMothersDayDesc: 'Annen için çiçekli ve sevgi dolu bir sürpriz.',
  funGoOutTitle: 'Dışarı Çıkalım mı?',
  funGoOutDesc: 'Arkadaşına gönder ve dışarı çıkar.',

  // Mother's Day Page
  mothersDayTitle: 'Anneler Günün Kutlu Olsun,\nCanım Annem',
  mothersDaySub: 'Dünyanın en güzel çiçeği sensin',
  mothersDayMessage: 'Her şeyin için teşekkür ederim. Hayatımın ışığı, kalbimin sıcaklığısın. Seni kelimelerle anlatamayacağım kadar çok seviyorum.',

  // Go Out Page
  goOutPageTitle: 'Dışarı Çıkalım mı?',
  goOutPageSub: 'Hadi dışarı çıkalım!',
  goOutYes: 'Evet!',
  goOutNo: 'Hayır',
  goOutYayTitle: 'Haydi Gidelim!',
  goOutYayText: 'Hazırlan, dışarı çıkıyoruz! Dünya bizi bekliyor! ☀️',

  // Hanoi Page
  hanoiPageBack: 'Eglence',
  hanoiLabel: 'Hanoi Kulesi',
  hanoiSub: 'Klasik rekirsiyon bulmacasi',
  hanoiSelectDisks: 'Disk sayisini sec',
  hanoiDisks: 'DISK',
  hanoiStart: 'Basla',
  hanoiMoves: 'HAMLE',
  hanoiMaxMoves: 'MAKS',
  hanoiSelectSource: 'Ust diski almak icin bir cubuga tikla',
  hanoiSelectTarget: 'Simdi diski yerlestirmek icin bir cubuga tikla',
  hanoiInvalidMove: 'Buyuk disk kucuk diskin uzerine konamaz',
  hanoiEmptyPeg: 'Bu cubuk bos',
  hanoiWon: 'Tebrikler, cozdin!',
  hanoiLost: 'Hamle hakkin bitti!',
  hanoiWonDesc: 'Tum diskler son cubuga tasinidi.',
  hanoiLostDesc: 'Bitirmeden once tum hamlelerini kullandin.',
  hanoiMovesUsed: 'Kullanilan hamle',
  hanoiOptimal: 'Optimal',
  hanoiNewGame: 'Yeni Oyun',
  hanoiPlayAgain: 'Tekrar Oyna',
  hanoiPeg: 'Cubuk',
  hanoiReveal: 'Nasil calisir',
  hanoiHide: 'Gizle',
  hanoiExTitle: 'Hanoi Kulesi ve Rekirsiyon',
  hanoiExP1: 'n diskli Hanoi Kulesi\'ni cozmek icin gereken minimum hamle sayisi 2\u207F \u2212 1\'dir.',
  hanoiExP2: 'Rekursif strateji: n\u22121 diski yardimci cubuga tasi, en buyuk diski hedefe tasi, sonra n\u22121 diski yardimcidan hedefe tasi.',
  hanoiExP3: 'Bu bulmaca ustel buyumeyi gosterir \u2014 her ek disk minimum hamle sayisini iki katina cikarip bir ekler.',

  // Sorry Page
  sorryPageTitle: 'Özür Dilerim...',
  sorryPageSub: 'Barışalım mı?',
  sorryYes: 'Evet',
  sorryNo: 'Hayir',
  sorryYayTitle: 'Yaaaaaaa!',
  sorryYayText: 'Barıştık! Bir daha hiç kavga etmeyelim! 🎉',

  // Birthday Page
  bdayPageTitle: 'Doğum Günü Kutlaması!',
  bdayNameLabel: 'Arkadaşının adı',
  bdayNamePlaceholder: 'İsim gir...',
  bdayAgeLabel: 'Yaş',
  bdayAgePlaceholder: 'Yaş gir...',
  bdayCreate: 'Pasta Oluştur!',
  bdayHappy: 'Doğum Günün Kutlu Olsun',
  bdayWish: 'Harika bir yıl diliyoruz!',
  bdayShare: 'Paylaş',
  bdayReset: 'Yenisini Oluştur',
  bdayCandles: 'mum',

  // Hangman Page
  hangmanPageTitle: 'Adam Asmaca',
  hangmanPageSub: 'Bilgisayar Mühendisliği — Kolay Seviye',
  hangmanWon: 'Bildin!',
  hangmanLost: 'Oyun Bitti!',
  hangmanTheWord: 'Kelime',
  hangmanNewGame: 'Yeni Oyun',
  hangmanRemaining: 'Kalan hak',
  hangmanUsed: 'Kullanilan harfler',
  hangmanHint: 'Ipucu',

  // Puzzle Page
  puzzlePageBack: 'Eglence',

  // Blog Hub
  blogHubBack: 'Ana Sayfa',

  // Nav
  navProject: 'Proje',
  navLifeFlow: 'Hayat Akisi',

  // Hero buttons
  heroBtnBlog: 'Blog',
  heroBtnFun: 'Eglence',
  heroBtnContact: 'Iletisim',
  heroBtnProject: 'Proje',
  heroBtnLifeFlow: 'Hayat Akisi',

  // Contact Page
  contactBack: 'Ana Sayfa',
  contactBadge: 'ILETISIM',

  // Journey Page
  journeyBack: 'Ana Sayfa',
  journeyBadge: 'HAYAT AKISI',

  // Project Page
  projectBack: 'Ana Sayfa',
  projectBadge: 'PROJE',
  projectLabel: 'Proje',
  projectSub: 'Su an neye odaklaniyorum',

  // Blog detail
  rdBack: 'Blog',
  rdBadge: 'BLOG',
  rdNotFoundTitle: 'Sayfa bulunamadi',
  rdNotFoundDesc: 'Bu blog yazisi henuz mevcut degil.',
  rdBottomNote: 'Bu blog yazisi yakinda gelecek. Icerik zamanla eklenecek.',
  rdBottomLink: 'Tum Blog yazilarini gor',
  blogSoon: 'YAKINDA',

  // Hall of Armor
  hallStatusLeft: 'ZIRH DEPOSU',
  hallStatusCenter: '41.0082° K · 28.9784° D · İSTANBUL',
  hallPlatformLabel: 'ARK REAKTÖRÜ — ÇEVRİMİÇİ',
  armorMark1Name: 'The Algorithm',
  armorMark2Name: 'Siber Kazıma',
  armorMark3Name: 'Çekirdek Makine',
  armorMark4Name: 'Bio-Nöral',
  armorMark5Name: 'Takım Komutanı',
  armorMark1Desc: 'Hesaplamanın temeli. Her veri yapısı, her sıralama algoritması — takıntılı pratikle ustalasıldı.',
  armorMark2Desc: 'Akıllı web kazıma yapay zeka mantığıyla bulusur. En iyi seçenekleri senin yerine bulur.',
  armorMark3Desc: 'Sinir ağları, derin öğrenme mimarileri ve makine zekası. Deposunun güç çekirdeği.',
  armorMark4Desc: 'Tıbbi tanıya uygulanan makine öğrenimi. Nörolojik örüntü analizi ile erken Parkinson tespiti.',
  armorMark5Desc: 'Liderlik modülü. Takım koordinasyonu, proje yönetimi ve organizasyonel sistem kurma.',
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
