// Copy for the Love Meter fun page — bilingual (EN / TR).
// Kept out of the main i18n dictionary because these are content arrays/tiers,
// not UI labels, and it keeps the feature self-contained and easy to extend.

// Playful "reading the stars" loading lines, shown one by one during the
// ~3-second calculation.
export const loadingMessages = {
  en: [
    '❤️ Reading the stars...',
    '✨ Measuring chemistry...',
    '💫 Looking for butterflies...',
    '🌸 Almost done...',
  ],
  tr: [
    '❤️ Yıldızlar okunuyor...',
    '✨ Kimya ölçülüyor...',
    '💫 Kelebekler aranıyor...',
    '🌸 Neredeyse bitti...',
  ],
};

// Score tiers, from highest to lowest. `min`/`max` are inclusive.
// tierFor() returns the matching tier for a given score.
export const loveTiers = [
  {
    min: 95, max: 100,
    en: 'Soulmate energy. The universe might know something.',
    tr: 'Ruh eşi enerjisi. Evren bir şeyler biliyor olabilir.',
  },
  {
    min: 90, max: 94,
    en: 'Someone should definitely grab a coffee together.',
    tr: 'Biriniz mutlaka bir kahve teklif etmeli.',
  },
  {
    min: 85, max: 89,
    en: 'Looking pretty promising.',
    tr: 'Oldukça umut verici görünüyor.',
  },
  {
    min: 80, max: 84,
    en: "There's definitely a spark.",
    tr: 'Ortada kesinlikle bir kıvılcım var.',
  },
  {
    min: 75, max: 79,
    en: 'You two seem to have good vibes.',
    tr: 'İkinizin arası gayet iyi görünüyor.',
  },
  {
    min: 70, max: 74,
    en: 'Could become a great friendship.',
    tr: 'Harika bir dostluğa dönüşebilir.',
  },
  {
    min: 60, max: 69,
    en: 'Every great story has to start somewhere.',
    tr: 'Her güzel hikâye bir yerden başlamak zorunda.',
  },
];

export function tierFor(score) {
  return loveTiers.find((tier) => score >= tier.min && score <= tier.max) || loveTiers[loveTiers.length - 1];
}

// Score at/above which we celebrate with confetti.
export const CONFETTI_THRESHOLD = 95;
