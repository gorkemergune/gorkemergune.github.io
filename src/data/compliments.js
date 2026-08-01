// Compliment deck for the "Compliment Cards" fun page.
// Each language has exactly 16 entries; a card at position `i` shows the
// compliment at the shuffled index for the *currently selected* language, so
// toggling the site language re-localizes every revealed card in place.
export const compliments = {
  tr: [
    'Gülüşün bulunduğun yeri aydınlatıyor.',
    'Gözlerin gerçekten çok etkileyici.',
    'Saçların sana çok yakışıyor.',
    'Tarzın gerçekten çok hoş.',
    'Pozitif enerjin bulaşıcı.',
    'Seninle konuşmak çok keyifli.',
    'Kahkahan insanı mutlu ediyor.',
    'Çok zarif görünüyorsun.',
    'Etrafına mutluluk yayıyorsun.',
    'Samimiyetin hemen hissediliyor.',
    'Bakışların çok anlamlı.',
    'Gülümsemen günümü güzelleştirdi.',
    'Sesin huzur veriyor.',
    'Auran gerçekten çok güzel.',
    'İyi ki böyle birisin.',
    'Işığın herkesten farklı.',
  ],
  en: [
    'Your smile lights up every room.',
    'Your eyes are truly captivating.',
    'Your hair looks amazing.',
    'You have an incredible sense of style.',
    'Your positive energy is contagious.',
    'Talking with you is always enjoyable.',
    'Your laugh is wonderful.',
    'You look incredibly elegant.',
    'You spread happiness wherever you go.',
    'Your kindness stands out instantly.',
    'Your eyes tell a beautiful story.',
    'Your smile made my day brighter.',
    'Your voice is so calming.',
    'You have a beautiful aura.',
    'The world is better with you in it.',
    'You shine in your own unique way.',
  ],
};

export const CARD_COUNT = 16;
