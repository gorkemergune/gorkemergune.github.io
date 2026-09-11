// Articles — the reading log and the writing shelf.
// `read` holds papers I have read with my own notes; `written` holds pieces
// I publish myself. Fields with a Tr suffix hold the Turkish localization;
// the UI falls back to the English field when a Tr variant is missing.
//
// Adding a paper: append to `read` with a new slug. Everything on the page
// is driven from here — no component changes needed.
// `pdf` may point to a file under public/papers/ when redistribution of the
// annotated copy is permitted by the paper's license; otherwise leave it null
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
        'VLM’ler ince ayrıntı gerektiren görevlerde, görüntü kodlayıcı ayrıntıyı kaybettiği için değil, dil modelinin o ayrıntı için bir kelimesi olmadığı için başarısız oluyor. Nesneye bir isim ver — herhangi bir isim — performans sıçrıyor.',

      notes: [
        {
          heading: 'Why I kept reading',
          headingTr: 'Neden okumayı bırakmadım',
          points: [
            'The claim is sharper than the usual "VLMs are bad at vision" paper: the information is still inside the model, it just cannot come out through text. They prove it by probing hidden states instead of reading the model’s answer.',
            'Probing a keypoint directly from the hidden representations gives 68.7% where the model’s own written answer gives 36.6%. That 32-point hole is the whole paper.',
            'The trick they use to test the hypothesis is what sold me: strip the name away. Same image, same task, but the reference point sits somewhere unnameable — the junction between a handlebar and its stem instead of "the pedal". Accuracy drops for every model, every size, both families.',
          ],
          pointsTr: [
            'İddia, alışıldık “VLM’ler görmede kötü” makalelerinden daha keskin: bilgi hâlâ modelin içinde, sadece metinden dışarı çıkamıyor. Bunu modelin cevabını okumak yerine gizli katmanları problayarak kanıtlıyorlar.',
            'Bir keypoint’i doğrudan gizli temsillerden problamak %68,7 veriyor; modelin kendi yazdığı cevap %36,6. Bu 32 puanlık boşluk makalenin tamamı.',
            'Hipotezi test etme şekli beni ikna etti: ismi ortadan kaldır. Aynı görüntü, aynı görev, ama referans nokta isimlendirilemez bir yerde — “pedal” yerine gidonla boru arasındaki birleşim. Her modelde, her boyutta, her iki ailede doğruluk düşüyor.',
          ],
        },
        {
          heading: 'Chain-of-thought is not free',
          headingTr: 'Chain-of-thought bedava değil',
          points: [
            'CoT helps a lot when the thing has a name (Qwen3VL-2B: +20.8 points) and barely helps when it does not (+9.8). Reading the traces explains why: the model writes the name of the point, then does string matching. It is not comparing pixels, it is comparing words.',
            'On unnameable shapes CoT actively hurts. Qwen3VL-8B loses 19.4 points with CoT on unknown shapes. Without an anchor, the reasoning turns into invented description and the model talks itself out of the right answer.',
            'Practical takeaway for my own work: turning on CoT for a visual matching task is a decision, not a default. If the target has no obvious label, measure before you ship it.',
          ],
          pointsTr: [
            'CoT, nesnenin bir adı varsa çok yardım ediyor (Qwen3VL-2B: +20,8 puan), yoksa neredeyse hiç (+9,8). İz kayıtlarını okuyunca sebebi anlaşılıyor: model önce noktanın adını yazıyor, sonra metin eşleştirmesi yapıyor. Piksel değil, kelime karşılaştırıyor.',
            'İsimlendirilemeyen şekillerde CoT resmen zarar veriyor. Qwen3VL-8B, bilinmeyen şekillerde CoT ile 19,4 puan kaybediyor. Bir çıpa yokken muhakeme uydurma tarife dönüşüyor ve model kendini doğru cevaptan konuşarak uzaklaştırıyor.',
            'Kendi işim için pratik sonuç: görsel eşleştirme görevinde CoT açmak bir karar, varsayılan değil. Hedefin belirgin bir etiketi yoksa yayına almadan önce ölç.',
          ],
        },
        {
          heading: 'The fix that surprised me',
          headingTr: 'Beni şaşırtan çözüm',
          points: [
            'They invent names for shapes the model has never seen and fine-tune it on those names. Qwen3VL-2B goes from 29.0% to 86.0% — above its own 74.2% representation probe. A made-up word unlocked information the model already had.',
            'Ordinary words ("brick") beat human names beat random strings — 86.0 / 70.2 / 62.8. Tokenization length tracks the same order (1 token vs ~1.4 vs ~4.7). Shorter, more familiar labels are easier to hang a concept on.',
            'But naming is a shortcut, not understanding. The CoT after name-training reads: "REF is a brick and Choice D is a brick so the answer is D." It never looks at the shape again.',
            'Task-specific fine-tuning is the better fix. Train on one shape family, and the model generalizes to mazes it has never seen (Gemma3-4B: 99.3% on complex mazes), plus +16% on faces and +10.7% on real-image correspondence for Qwen3VL-2B. That is real visual comparison, not label matching.',
          ],
          pointsTr: [
            'Modelin hiç görmediği şekillere isim uydurup o isimlerle ince ayar yapıyorlar. Qwen3VL-2B %29,0’dan %86,0’a çıkıyor — kendi %74,2’lik temsil probunun da üstüne. Uydurma bir kelime, modelin zaten sahip olduğu bilginin kilidini açtı.',
            'Sıradan kelimeler (“tuğla”) insan isimlerini, o da rastgele dizileri geçiyor — %86,0 / %70,2 / %62,8. Tokenleşme uzunluğu da aynı sırada (1 token / ~1,4 / ~4,7). Kısa ve tanıdık etiketlere kavram asmak daha kolay.',
            'Ama isim vermek anlamak değil, kestirme. İsim eğitiminden sonraki CoT şöyle: “REF bir tuğla, D seçeneği de tuğla, cevap D.” Şekle bir daha hiç bakmıyor.',
            'Asıl çözüm göreve özel ince ayar. Tek bir şekil ailesiyle eğitiyorsun, model hiç görmediği labirentlere genelliyor (Gemma3-4B: karmaşık labirentlerde %99,3), üstüne Qwen3VL-2B yüzlerde +%16, gerçek görüntü eşleştirmesinde +%10,7 kazanıyor. Bu etiket eşleştirme değil, gerçek görsel karşılaştırma.',
          ],
        },
        {
          heading: 'Reading the graphs at the back',
          headingTr: 'Arkadaki grafikleri okumak',
          points: [
            'Figures 8–10 (layer-wise probing): the named curve sits above the unnamed curve at every single layer, and both peak in the middle of the network, not at the end. Whatever the decoder does in the last layers, it is not adding visual detail — it is spending it.',
            'Figure 15 is the one to remember if you ever probe Gemma: accuracy collapses after layer 4 and only recovers around layer 19. Qwen improves smoothly across all layers. Pick the wrong layer on Gemma and you will conclude the information is not there when it is.',
            'Figure 4 (Jaccard distance between decoded token sets): after name training, unknown shapes become as distinguishable in token space as known ones, and the ordering Ordinary > Human > Random matches the accuracy ordering exactly. Semantic separability and accuracy move together.',
            'Figure 6 is the quiet punchline. Task-specific fine-tuning has lower Jaccard distance than name training — less semantic separation — yet higher accuracy (98.7% vs 86.0%). Two different mechanisms close the same gap, and the better one does not run through language at all.',
            'Figure 17 (CLEVR-Change): a model fine-tuned on abstract squiggles gets better at describing changes in rendered 3D scenes in free text. Mean judge score 4.507 → 5.087, top-bracket answers 24.7% → 33.1%. The skill transferred across both domain and output format, which is the strongest evidence in the paper that something real was learned.',
          ],
          pointsTr: [
            'Şekil 8–10 (katman bazlı problama): isimli eğri her katmanda isimsiz eğrinin üstünde ve ikisi de ağın sonunda değil ortasında tepe yapıyor. Dekoder son katmanlarda ne yapıyorsa, görsel ayrıntı eklemiyor — harcıyor.',
            'Gemma problayacaksan aklında tutman gereken şekil 15: doğruluk 4. katmandan sonra çöküyor ve ancak 19. katman civarında toparlıyor. Qwen’de iyileşme tüm katmanlarda düzgün. Gemma’da yanlış katmanı seçersen, bilgi oradayken “yok” sonucuna varırsın.',
            'Şekil 4 (çözülen token kümeleri arasındaki Jaccard uzaklığı): isim eğitiminden sonra bilinmeyen şekiller, token uzayında bilinenler kadar ayırt edilebilir hâle geliyor ve Sıradan > İnsan > Rastgele sıralaması doğruluk sıralamasıyla birebir örtüşüyor. Anlamsal ayrışabilirlik ile doğruluk birlikte hareket ediyor.',
            'Asıl sessiz vuruş şekil 6. Göreve özel ince ayarın Jaccard uzaklığı isim eğitiminden daha düşük — yani anlamsal ayrışma daha az — ama doğruluğu daha yüksek (%98,7 vs %86,0). Aynı boşluğu iki farklı mekanizma kapatıyor ve daha iyi olanı dilden hiç geçmiyor.',
            'Şekil 17 (CLEVR-Change): soyut karalamalarla ince ayar yapılan model, 3B sahnelerdeki değişiklikleri serbest metinle anlatmada da iyileşiyor. Ortalama jüri puanı 4,507 → 5,087, en üst dilimdeki cevaplar %24,7 → %33,1. Beceri hem alan hem çıktı formatı değişmesine rağmen aktarılmış; makaledeki en güçlü kanıt bu.',
          ],
        },
        {
          heading: 'What I would actually do with this',
          headingTr: 'Bununla pratikte ne yapardım',
          points: [
            'If a product needs a VLM to point at something without a common name — a defect, a cell, an unlabeled part — do not expect prompting to fix it. Budget for a small fine-tune instead. A thousand synthetic pairs were enough here.',
            'When benchmarking my own grounding work, split the set by whether the referent is nameable. A single average number hides the failure completely.',
            'Probing the hidden states is a cheap upper bound: if the probe is high and the text output is low, the problem is decoding, not perception. That changes what you fix.',
          ],
          pointsTr: [
            'Bir ürün, VLM’den yaygın bir adı olmayan bir şeyi göstermesini istiyorsa — bir kusur, bir hücre, etiketsiz bir parça — bunu prompt’la çözmeyi bekleme. Bunun yerine küçük bir ince ayara bütçe ayır. Burada bin sentetik çift yetmiş.',
            'Kendi grounding çalışmamı ölçerken kümeyi, hedefin isimlendirilebilir olup olmamasına göre ayıracağım. Tek bir ortalama sayı bu başarısızlığı tamamen gizliyor.',
            'Gizli katmanları problamak ucuz bir üst sınır: prob yüksek, metin çıktısı düşükse sorun algıda değil, çözümlemede. Bu, neyi düzelteceğini değiştirir.',
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
            verdict: 'Gains the most from CoT (+20.8 on named) and the most from being taught a name: 29.0 → 86.0 on unknown shapes.',
            verdictTr: 'CoT’tan en çok fayda gören model (+20,8 isimlide) ve isim öğretmekten en çok kazanan: bilinmeyen şekillerde 29,0 → 86,0.',
          },
          {
            name: 'Qwen3VL-4B',
            scores: ['52.5 / 37.2', '84.2 / 56.9', '93.5 / 48.4'],
            verdict: 'The value pick. Matches the 8B on known faces and nearly doubles the 2B on shapes.',
            verdictTr: 'Fiyat/performans noktası. Bilinen yüzlerde 8B’yi yakalıyor, şekillerde 2B’yi neredeyse ikiye katlıyor.',
          },
          {
            name: 'Qwen3VL-8B',
            scores: ['53.8 / 40.3', '83.9 / 65.7', '99.7 / 57.1'],
            verdict: 'Best overall, and the only model that nearly closes the probe-to-text gap on named points (3.3 pts). Still 13.7 on unnamed.',
            verdictTr: 'Genel olarak en iyisi ve isimli noktalarda prob-metin farkını neredeyse kapatan tek model (3,3 puan). İsimsizde hâlâ 13,7.',
          },
          {
            name: 'Gemma3-4B',
            scores: ['25.7 / 24.8', '49.8 / 32.4', '50.6 / 30.5'],
            verdict: 'At chance on real-image keypoints — do not use it for that. But its internals are strong (91.7 probe on unknown shapes) and it is the best learner: 99.3% on unseen mazes after fine-tuning.',
            verdictTr: 'Gerçek görüntü keypoint’lerinde şans seviyesinde — bu iş için kullanma. Ama içi güçlü (bilinmeyen şekillerde 91,7 prob) ve en iyi öğrenen o: ince ayardan sonra görülmemiş labirentlerde %99,3.',
          },
          {
            name: 'Gemma3-12B',
            scores: ['31.2 / 27.5', '50.4 / 36.5', '72.7 / 40.2'],
            verdict: 'Unlike the 4B it shows the expected named-advantage pattern, and it carries to art style too: 58.0 known vs 39.2 unknown painters.',
            verdictTr: '4B’nin aksine beklenen “isimli avantajı” desenini gösteriyor ve bu sanat stiline de taşınıyor: tanıdığı ressamlarda 58,0, tanımadıklarında 39,2.',
          },
          {
            name: 'InternVL3.5-2B',
            scores: ['28.1 / 24.8', 'n/a', '46.1 / 26.1'],
            verdict: 'Near the 25% random baseline on real images. Too weak to show the effect at all.',
            verdictTr: 'Gerçek görüntülerde %25’lik rastgele tabana çok yakın. Etkiyi gösteremeyecek kadar zayıf.',
          },
          {
            name: 'InternVL3.5-8B',
            scores: ['34.3 / 28.2', 'n/a', '66.4 / 27.7'],
            verdict: 'Knows geometric shapes but cannot recognize celebrities, so it sits out the face task. Largest probe-to-text gap in the paper on unknown shapes: 59.1 points.',
            verdictTr: 'Geometrik şekilleri biliyor ama ünlüleri tanımıyor, bu yüzden yüz görevine giremiyor. Bilinmeyen şekillerde makaledeki en büyük prob-metin farkı onda: 59,1 puan.',
          },
          {
            name: 'InternVL3.5-14B',
            scores: ['31.9 / 28.4', 'n/a', '55.1 / 32.6'],
            verdict: 'Bigger is not better here — it trails the 8B on known shapes while holding a 57.8-point probe-to-text gap. The information is in there; the model cannot say it.',
            verdictTr: 'Burada büyük olmak daha iyi değil — bilinen şekillerde 8B’nin gerisinde kalırken 57,8 puanlık prob-metin farkını koruyor. Bilgi içeride; model söyleyemiyor.',
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
