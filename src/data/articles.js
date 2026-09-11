// Articles — the reading log and the writing shelf.
// `read` holds papers I have read with my own notes; `written` holds pieces
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
      summary:
        'VLMs fail at fine-grained visual tasks not because the vision encoder loses the detail, but because the language model has no word for it. Give the entity a name — any name — and performance jumps.',
      summaryTr:
        'VLM’ler ince ayrıntıda, görüntü kodlayıcı ayrıntıyı kaybettiği için değil, dil modelinin o ayrıntı için bir kelimesi olmadığı için takılıyor. Nesneye bir isim verildiğinde, uydurma bir isim bile olsa, performans sıçrıyor.',

      notes: [
        {
          heading: 'What stuck with me',
          headingTr: 'Aklımda kalan',
          points: [
            'The most interesting part is that VLMs do not lose the visual detail entirely. Sometimes they hold the information and cannot get it into words. Hidden-state probing reaches 68.7% while the model’s own answer stays at 36.6%, which shows the gap pretty clearly.',
          ],
          pointsTr: [
            'Makalenin en ilginç tarafı, VLM’lerin görsel detayı tamamen kaybetmemesi. Bazen bilgi içeride duruyor ama dile aktarılamıyor. Hidden-state probing %68,7’ye çıkarken modelin kendi cevabı %36,6’da kalıyor; fark bayağı net.',
          ],
        },
        {
          heading: 'When the name disappears',
          headingTr: 'İsim ortadan kalkınca',
          points: [
            'What really made me think is that performance drops as soon as the target becomes unnameable. When the model can go through a word like "pedal", it grabs a semantic anchor instead of actually comparing the images.',
          ],
          pointsTr: [
            'Beni asıl düşündüren şey, hedef isimlendirilemez hâle gelince performansın düşmesi. Model “pedal” gibi bir kelime üzerinden ilerleyebildiğinde görsel karşılaştırma yapmak yerine semantik bir anchor’a tutunuyor.',
          ],
        },
        {
          heading: 'CoT does not fix it',
          headingTr: 'CoT bunu çözmüyor',
          points: [
            'Chain-of-thought does not solve this automatically. On some unnameable shapes it makes things worse. A longer reasoning trace does not mean the model actually looked at the image more.',
          ],
          pointsTr: [
            'CoT bunu otomatik olarak çözmüyor. Hatta bazı unnameable şekillerde sonucu daha da kötüleştiriyor. Reasoning çıktısının uzun olması, modelin görsele daha çok baktığı anlamına gelmiyor.',
          ],
        },
        {
          heading: 'Note to self',
          headingTr: 'Kendi işim için not',
          points: [
            'In grounding benchmarks it makes sense to measure the nameable and unnameable split separately. One average number hides the whole thing.',
            'The distance between a hidden-state probe and the text output is a good signal for whether the problem is perception or decoding.',
          ],
          pointsTr: [
            'Grounding benchmark’larında nameable / unnameable ayrımını ayrıca ölçmek mantıklı. Tek bir ortalama sayı bunu tamamen gizliyor.',
            'Hidden-state probe ile metin çıktısı arasındaki fark, problemin perception mı yoksa decoding mi olduğunu anlamak için iyi bir sinyal.',
          ],
        },
      ],

      board: {
        caption: 'Direct-answer accuracy (%) from the paper’s tables, per subset. Higher is better; the second number is the unnameable case.',
        captionTr: 'Makalenin tablolarından doğrudan-cevap doğruluğu (%), alt küme bazında ve makaledeki gösterimle. Yüksek olan iyi; ikinci sayı isimlendirilemeyen durum.',
        columns: ['SPair-71k · named / no-name', 'Faces · known / unknown', '2D shapes · known / unknown'],
        columnsTr: ['SPair-71k · isimli / isimsiz', 'Yüzler · bilinen / bilinmeyen', '2B şekil · bilinen / bilinmeyen'],
        rows: [
          {
            name: 'Qwen3VL-2B',
            scores: ['36.6 / 32.4', '77.1 / 41.1', '54.1 / 29.0'],
            verdict: 'The one that jumps most when you teach it a name: 29.0 to 86.0 on unknown shapes.',
            verdictTr: 'İsim öğretince en çok sıçrayan model: bilinmeyen şekillerde 29,0’dan 86,0’a.',
          },
          {
            name: 'Qwen3VL-4B',
            scores: ['52.5 / 37.2', '84.2 / 56.9', '93.5 / 48.4'],
            verdict: 'The value pick. Matches the 8B on known faces.',
            verdictTr: 'Fiyat/performans noktası. Bilinen yüzlerde 8B’yi yakalıyor.',
          },
          {
            name: 'Qwen3VL-8B',
            scores: ['53.8 / 40.3', '83.9 / 65.7', '99.7 / 57.1'],
            verdict: 'Best overall. Probe-to-text gap of 3.3 on named points, 13.7 on unnamed.',
            verdictTr: 'Genel olarak en iyisi. İsimli noktalarda probe-text farkı 3,3, isimsizde 13,7.',
          },
          {
            name: 'Gemma3-4B',
            scores: ['25.7 / 24.8', '49.8 / 32.4', '50.6 / 30.5'],
            verdict: 'At chance on real images, but the information is in there: 91.7 probe on unknown shapes.',
            verdictTr: 'Gerçek görüntüde şans seviyesinde ama içi dolu: bilinmeyen şekillerde probe 91,7.',
          },
          {
            name: 'Gemma3-12B',
            scores: ['31.2 / 27.5', '50.4 / 36.5', '72.7 / 40.2'],
            verdict: 'The Gemma that shows the expected pattern, art style included: 58.0 known painters vs 39.2 unknown.',
            verdictTr: 'Beklenen deseni gösteren Gemma. Sanat stilinde de aynı: tanıdığı ressamlarda 58,0, tanımadıklarında 39,2.',
          },
          {
            name: 'InternVL3.5-2B',
            scores: ['28.1 / 24.8', 'n/a', '46.1 / 26.1'],
            verdict: 'Near chance almost everywhere.',
            verdictTr: 'Neredeyse her yerde şans seviyesinde.',
          },
          {
            name: 'InternVL3.5-8B',
            scores: ['34.3 / 28.2', 'n/a', '66.4 / 27.7'],
            verdict: 'Sits out the face task because it cannot recognize celebrities. Probe-to-text gap of 59.1 on unknown shapes.',
            verdictTr: 'Ünlüleri tanımadığı için yüz görevine giremiyor. Bilinmeyen şekillerde probe-text farkı 59,1.',
          },
          {
            name: 'InternVL3.5-14B',
            scores: ['31.9 / 28.4', 'n/a', '55.1 / 32.6'],
            verdict: 'Bigger did not help: it trails the 8B on known shapes, with a 57.8-point probe-to-text gap.',
            verdictTr: 'Büyük olmak işe yaramamış: bilinen şekillerde 8B’nin gerisinde, probe-text farkı 57,8.',
          },
        ],
      },
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
