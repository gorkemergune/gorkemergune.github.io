// Central site config & feature flags — flip these to toggle features
// without touching component code.
export const FEATURES = {
  // Set to true to bring the "Download Résumé" CTA (hero, menu, palette) back.
  resume: false,
};

// Content-creator handle used for TikTok + Instagram links.
export const CREATOR_HANDLE = 'ayarlicazhocam';

// Birthday for the live age / countdown widgets (local time).
export const BIRTHDAY = { year: 2005, month: 7, day: 16 };

// Profile photograph for the Experience page — Görkem's own photo (original in
// tasks/source-assets/experience/gorkem-pp.jpg, cropped 4:5 and optimised).
// Set to null to fall back to the monogram; never use a generated portrait.
export const PROFILE_PHOTO = { webp: '/media/gorkem-pp-800.webp', jpg: '/media/gorkem-pp-800.jpg', width: 800, height: 1000 };
