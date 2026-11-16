// Articles — the reading log and the writing shelf.
// `read` is the list of papers I have read: title, authors, venue and link
// only. Reading notes and summaries are no longer published (owner decision,
// 16 Nov 2026 — they are kept privately). `written` holds pieces
// I publish myself. Fields with a Tr suffix hold the Turkish localization;
// the UI falls back to the English field when a Tr variant is missing.
//
// Adding a paper: append to `read` with a new slug. Everything on the page
// is driven from here — no component changes needed.
// `pdf` may point to a file under public/papers/ when redistribution of the
// annotated copy is permitted by the paper’s license; otherwise leave it null
// and readers go to `url`.

const ARTICLES = {
  read: [
    {
      slug: 'vlms-need-words',
      accent: '#22d3ee',
      title: 'VLMs Need Words: Vision Language Models Ignore Visual Detail In Favor of Semantic Anchors',
      authors: ['Haz Sameen Shahgir', 'Xiaofu Chen', 'Yu Fu', 'Erfan Shayegani', 'Nael Abu-Ghazaleh', 'Yova Kementchedjhieva', 'Yue Dong'],
      affiliations: 'UC Riverside · MBZUAI',
      venue: 'COLM 2026',
      arxiv: 'arXiv:2604.02486',
      url: 'https://arxiv.org/pdf/2604.02486',
      pdf: null,
      date: 'Aug 2026',
      readOn: 'September 2026',
      readOnTr: 'Eylül 2026',
      category: 'Computer Vision',
      categoryTr: 'Bilgisayarlı Görü',
      tags: ['Vision-Language Models', 'Multimodal', 'Interpretability'],
      tagsTr: ['Görsel-Dil Modelleri', 'Multimodal', 'Yorumlanabilirlik'],
    },

    {
      slug: 'vsr-review-dl-to-llm',
      accent: '#fb923c',
      title: 'From Deep Learning to Large Language Models: A Review of Visual Speech Recognition',
      authors: ['Xiang Wang', 'Xiangzhen He', 'Wenhao Jiang', 'Xue Ding', 'Xianghe Meng', 'Tingting Du', 'Yangxu Ou', 'Ruolei Shan', 'Shibiao Shi', 'Haotian Zhu', 'Jingbin Hao'],
      affiliations: 'Intelligent Systems with Applications, vol. 32, 200704',
      venue: 'ISWA 2026',
      arxiv: 'DOI 10.1016/j.iswa.2026.200704',
      url: 'https://doi.org/10.1016/j.iswa.2026.200704',
      pdf: null,
      // Journal issue date, not a guess: Crossref (checked 11 Oct 2026) lists
      // Intelligent Systems with Applications vol. 32, article 200704,
      // published-print / issued 2026-12; the DOI was registered 2026-07-11, so
      // the article was out before its December issue. ScienceDirect's own
      // "available online" date could not be fetched (bot wall), so it is not used.
      date: 'Dec 2026',
      readOn: 'October 2026',
      readOnTr: 'Ekim 2026',
      category: 'Computer Vision',
      categoryTr: 'Bilgisayarlı Görü',
      tags: ['Visual Speech Recognition', 'LLM', 'Survey'],
      tagsTr: ['Görsel Konuşma Tanıma', 'LLM', 'Derleme'],
    },

    {
      slug: 'turkish-lip-reading-errors',
      accent: '#a78bfa',
      title: 'Challenges and Enhancements in Turkish Automatic Lip Reading Using Deep Learning Models',
      authors: ['Furkan Sabaz', 'Ümit Atila', 'Murat Dörterler', 'Alaettin Uçan'],
      affiliations: 'Signal, Image and Video Processing, vol. 20, 237',
      venue: 'SIVP 2026',
      arxiv: 'DOI 10.1007/s11760-026-05252-2',
      url: 'https://doi.org/10.1007/s11760-026-05252-2',
      // Springer, standard TDM licence (Crossref, checked 20 Oct 2026): no
      // redistribution of the annotated copy.
      pdf: null,
      date: 'Mar 2026',
      readOn: 'October 2026',
      readOnTr: 'Ekim 2026',
      category: 'Computer Vision',
      categoryTr: 'Bilgisayarlı Görü',
      tags: ['Lip Reading', 'Turkish', 'Error Analysis'],
      tagsTr: ['Dudak Okuma', 'Türkçe', 'Hata Analizi'],
    },
    {
      slug: 'turkish-lip-reading-bilstm',
      accent: '#34d399',
      title: 'Turkish Lip-Reading Using Bi-LSTM and Deep Learning Models',
      authors: ['Ümit Atila', 'Furkan Sabaz'],
      affiliations: 'Engineering Science and Technology, an International Journal, vol. 35, 101206',
      venue: 'JESTECH 2022',
      arxiv: 'DOI 10.1016/j.jestch.2022.101206',
      url: 'https://doi.org/10.1016/j.jestch.2022.101206',
      pdf: null,
      // Crossref (checked 16 Nov 2026): published-print / issued 2022-11.
      date: 'Nov 2022',
      category: 'Computer Vision',
      categoryTr: 'Bilgisayarlı Görü',
      tags: ['Lip Reading', 'Turkish', 'Bi-LSTM'],
      tagsTr: ['Dudak Okuma', 'Türkçe', 'Bi-LSTM'],
    },
    {
      slug: 'scaling-multilingual-vsr',
      accent: '#f472b6',
      title: 'Scaling Multilingual Visual Speech Recognition',
      authors: ['K R Prajwal', 'Sindhu Hegde', 'Andrew Zisserman'],
      affiliations: 'University of Oxford (VGG)',
      venue: 'ICASSP 2025',
      arxiv: 'DOI 10.1109/ICASSP49660.2025.10890395',
      url: 'https://doi.org/10.1109/icassp49660.2025.10890395',
      pdf: null,
      // Crossref (checked 16 Nov 2026): ICASSP 2025, issued 2025-04-06.
      date: 'Apr 2025',
      category: 'Computer Vision',
      categoryTr: 'Bilgisayarlı Görü',
      tags: ['Visual Speech Recognition', 'Multilingual'],
      tagsTr: ['Görsel Konuşma Tanıma', 'Çok Dilli'],
    },
  ],

  written: [
    {
      slug: 'coming-soon',
      status: 'coming-soon',
      title: 'Coming Soon',
      titleTr: 'Çok Yakında',
      summary: 'I am working on new essays, research write-ups, and technical notes. They will land here soon.',
      summaryTr: 'Yeni yazılar, araştırmalar ve teknik notlar üzerinde çalışıyorum. Çok yakında burada.',
    },
  ],
};

export default ARTICLES;
