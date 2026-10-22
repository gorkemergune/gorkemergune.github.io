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
      summary:
        'A review of lip reading, from hand-crafted features through CNN-RNN, Conformer and self-supervised pretraining to LLM-based systems. Its sharpest point: an LLM bolted on as the decoder is not the win; the LLM earns its place as a corrector.',
      summaryTr:
        'Dudak okumanın el yapımı özelliklerden CNN-RNN’e, Conformer’a, self-supervised ön eğitime ve LLM’li sistemlere uzanan derlemesi. En keskin tespiti: LLM’i doğrudan decoder olarak takmak kazanç değil; LLM yerini düzeltici olarak hak ediyor.',

      notes: [
        {
          heading: 'What stuck with me',
          headingTr: 'Aklımda kalan',
          points: [
            'The hard part of VSR is not really visual. /p/ and /b/ look identical on the lips, so viseme ambiguity never fully goes away. It only shrinks with context and language knowledge, which makes lip reading half a language problem.',
            'The real break was not LLMs, it was the Conformer. In-the-wild WER went from 50–63% on LRS2 with RNN back-ends to about 22.6 on LRS2 and 19.1 on LRS3.',
          ],
          pointsTr: [
            'VSR’nin zor tarafı aslında görsel değil. /p/ ile /b/ dudakta birebir aynı görünüyor; viseme belirsizliği hiçbir zaman tamamen kalkmıyor, sadece bağlam ve dil bilgisiyle azalıyor. Yani dudak okuma yarı yarıya bir dil problemi.',
            'Asıl kırılma LLM’lerle değil, Conformer’la gelmiş. Doğal ortamda RNN arka uçlarıyla LRS2’de %50–63 olan WER, LRS2’de ~22,6’ya, LRS3’te ~19,1’e inmiş.',
          ],
        },
        {
          heading: 'LLMs are not plug-and-play',
          headingTr: 'LLM tak-çalıştır değil',
          points: [
            'Feeding visual features straight into an LLM lands at 30.8 WER on LRS3, worse than a good Conformer. The wins come when the LLM corrects: VALLR at 18.7, AVGER at 17.2 by giving the LLM N-best candidates plus a compressed “look again” at the video.',
            'Lower WER does not mean the model saw more. An LLM can write a fluent sentence the lips never said. I want visual faithfulness measured next to WER, and I would not trust a gap under 1% without repeated runs.',
          ],
          pointsTr: [
            'Görsel özellikleri doğrudan LLM’e vermek LRS3’te 30,8 WER’de kalıyor; iyi bir Conformer’dan kötü. Kazanç LLM düzeltici olunca geliyor: VALLR 18,7, AVGER ise LLM’e N-best adaylarla birlikte videoya sıkıştırılmış bir “bir kez daha bak” vererek 17,2.',
            'Düşük WER, modelin daha çok gördüğü anlamına gelmiyor. LLM dudakların hiç söylemediği akıcı bir cümle kurabilir. WER’in yanında görsel sadakatin de ölçülmesini isterim; tekrarlı deney yoksa %1’in altındaki farka da güvenmem.',
          ],
        },
        {
          heading: 'Note to self',
          headingTr: 'Kendi işim için not',
          points: [
            'The AV-HuBERT trick is reusable well beyond speech: pretrain with audio and video, randomly drop the audio, infer from video alone. The extra modality is privileged information during training only.',
            'For anything real-time: a light encoder on-device, the LLM called only when confidence is low, and latency, RTF and memory reported next to WER.',
          ],
          pointsTr: [
            'AV-HuBERT’in numarası konuşmanın çok ötesinde işe yarar: ses ve görüntüyle ön eğit, sesi rastgele düşür, çıkarımı sadece görüntüyle yap. Ek modalite yalnızca eğitimde ayrıcalıklı bilgi.',
            'Gerçek zamanlı her şey için: cihazda hafif bir encoder, LLM sadece güven düşükken devreye girsin; WER’in yanında gecikme, RTF ve bellek de raporlansın.',
          ],
        },
      ],

      board: {
        caption: 'LRS3 WER (%) as reported in the review’s results tables. Lower is better. The numbers come from different papers, and the review itself warns against comparing them one to one.',
        captionTr: 'Derlemenin sonuç tablolarındaki LRS3 WER (%) değerleri. Düşük olan iyi. Sayılar farklı makalelerden geliyor ve derlemenin kendisi bunları birebir karşılaştırmamak gerektiğini söylüyor.',
        columns: ['LRS3 WER'],
        columnsTr: ['LRS3 WER'],
        rows: [
          {
            name: 'Conformer (Ma 2023)',
            scores: ['19.1'],
            verdict: 'The baseline to beat. No LLM, and still ahead of naive LLM decoding.',
            verdictTr: 'Geçilmesi gereken çizgi. LLM yok ve yine de düz LLM çözmenin önünde.',
          },
          {
            name: 'Direct visual → LLM',
            scores: ['30.8'],
            verdict: 'The LLM as decoder with no real visual alignment. The worst of the set.',
            verdictTr: 'Gerçek görsel hizalama olmadan decoder olarak LLM. Listenin en kötüsü.',
          },
          {
            name: 'Prompt-based',
            scores: ['28.5'],
            verdict: 'Better prompting helps a little, not enough.',
            verdictTr: 'İyi prompt biraz yardım ediyor, yetmiyor.',
          },
          {
            name: 'VALLR',
            scores: ['18.7'],
            verdict: 'Two stages through phonemes. Edges past the Conformer.',
            verdictTr: 'Fonem üzerinden iki aşama. Conformer’ı az farkla geçiyor.',
          },
          {
            name: 'AVGER',
            scores: ['17.2'],
            verdict: 'Best in the review: the LLM corrects N-best candidates while looking at the video again.',
            verdictTr: 'Derlemedeki en iyisi: LLM, videoya tekrar bakarak N-best adayları düzeltiyor.',
          },
        ],
      },
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
      summary:
        'No new model: the team takes its own 2022 Turkish lip reader (ResNet-18 + BiLSTM) and asks where it goes wrong. The answers are b/p/m, look-alike words and short words.',
      summaryTr:
        'Yeni model yok: ekip 2022’deki kendi Türkçe dudak okuma modelini (ResNet-18 + BiLSTM) alıp nerede yanıldığını soruyor. Cevaplar b/p/m, birbirine benzeyen kelimeler ve kısa kelimeler.',

      notes: [
        {
          heading: 'What stuck with me',
          headingTr: 'Aklımda kalan',
          points: [
            'b, p and m cut both ways. Words that contain one reach 0.8823 WRR against 0.7562 for words without, and all of the best 15 words have one. Yet the top confusions are exactly those letters: Meyve was read as Perde 35 times, because on the lips p, b and m look the same.',
            'Short, similar words are where it breaks. The worst 15 words average 6.46 letters against 9.66 for the best 15, and confused pairs sit at a Levenshtein distance of 6.01 against 7.42 for the whole set.',
          ],
          pointsTr: [
            'b, p ve m iki yönlü kesiyor. Bu harflerden birini içeren kelimeler 0,8823 WRR’ye çıkarken içermeyenler 0,7562’de kalıyor ve en iyi 15 kelimenin hepsinde biri var. Ama en çok karışanlar da tam bu harfler: Meyve 35 kez Perde diye okunmuş, çünkü dudakta p, b ve m aynı görünüyor.',
            'Model kısa ve birbirine benzeyen kelimelerde kırılıyor. En kötü 15 kelime ortalama 6,46 harf, en iyi 15 ise 9,66; karışan çiftlerin Levenshtein mesafesi 6,01, tüm sette 7,42.',
          ],
        },
        {
          heading: 'Recall alone lies',
          headingTr: 'Recall tek başına yanıltıyor',
          points: [
            '“Ama” scores 100% WRR, but its precision is 0.70. Köpek, Kaplan and Baba keep getting predicted as “Ama”. A short word turns into a sink class, and per-class recall hides it completely.',
          ],
          pointsTr: [
            '“Ama” %100 WRR alıyor ama precision’ı 0,70. Köpek, Kaplan ve Baba sürekli “Ama” diye tahmin ediliyor. Kısa bir kelime çöp sınıfına dönüşüyor ve sınıf bazında recall bunu tamamen gizliyor.',
          ],
        },
        {
          heading: 'What I’m not convinced by',
          headingTr: 'İkna olmadığım yerler',
          points: [
            'The suffixed-word set (SDW) is the most Turkish part of the paper, and it has no number. The abstract talks about a clear drop, but no table shows SDW accuracy. The paper also does not say whether the 75/25 split is speaker-independent, and it does not separate word length from the b/p/m effect.',
          ],
          pointsTr: [
            'Ekli kelime seti (SDW) makalenin en Türkçe’ye özgü kısmı ve hiç sayısı yok. Özet belirgin bir düşüşten bahsediyor ama SDW doğruluğunu gösteren tablo yok. 75/25 bölmenin konuşmacıdan bağımsız olup olmadığı da yazmıyor; kelime uzunluğu ile b/p/m etkisi de birbirinden ayrılmamış.',
          ],
        },
        {
          heading: 'Note to self',
          headingTr: 'Kendi işim için not',
          points: [
            'If I build something like this: split by speaker, report precision and F1 per class, treat p/b/m as one viseme, and measure word similarity on visemes instead of letters. Levenshtein on letters misses the similarity the model actually sees.',
          ],
          pointsTr: [
            'Böyle bir şey kurarsam: konuşmacıya göre böleceğim, sınıf bazında precision ve F1 raporlayacağım, p/b/m’yi tek viseme sayacağım ve kelime benzerliğini harf yerine viseme üzerinden ölçeceğim. Harf düzeyinde Levenshtein, modelin gerçekte gördüğü benzerliği kaçırıyor.',
          ],
        },
      ],
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
