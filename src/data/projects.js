// Hall of Armor — project database.
// Each entry is one armor. Slugs map to /project/<slug> and to the
// screenshot folders under public/projects/<slug>/.
// Fields with a Tr suffix hold the Turkish localization; the UI falls
// back to the English field when a Tr variant is missing.

const gh = (repo) => `https://github.com/gorkemergune/${repo}`;

const PROJECTS = [
  {
    slug: 'mihenk-benchmark',
    category: 'Research & Benchmarks',
    cover: '/projects/mihenk-benchmark/cover.svg',
    mark: 'MARK I',
    codename: 'The Proving Ground',
    title: 'MIHENK Benchmark',
    subtitle: 'Measures whether an LLM reasons or just recalls, in Turkish and English, across 800 original items nobody has trained on',
    subtitleTr: 'Bir LLM’in muhakeme mi yoksa ezber mi yaptığını ölçer; Türkçe ve İngilizce, üzerinde kimsenin eğitilmediği 800 özgün soruyla',
    oneLiner: 'Designed and generated 800 original reasoning items in two languages, then put every model I could reach through them — my own fine-tunes included.',
    oneLinerTr: 'İki dilde 800 özgün muhakeme sorusu tasarlayıp ürettim, sonra erişebildiğim her modeli bunlardan geçirdim — kendi fine-tune’larım dahil.',
    language: 'Python',
    color: '#f5b301',
    glow: 'rgba(245,179,1,0.5)',
    tags: ['LLM Eval', 'Benchmark', 'TR + EN'],
    github: gh('mihenk-benchmark'),
    // Field Notes — migrated verbatim from caseStudies.js (12 Sep 2026).
    challenges: [
      'The hard part of a benchmark is proving it actually discriminates rather than being "too easy" or "broken". If everything scores 100% or everything scores 30%, it measures nothing.',
      'The other trap is the short-answer format: reasoning models and chatty fine-tunes love to over-explain, and a verbose but correct answer that breaks the ≤7-word rule has to score 0 — that is a deliberate signal, not a bug, but it means the scorer has to be strict and predictable.',
    ],
    challengesTr: [
      'Bir benchmark’ın zor kısmı, “çok kolay” ya da “bozuk” olmak yerine gerçekten ayırt ettiğini kanıtlamaktır. Her şey %100 ya da her şey %30 alıyorsa, hiçbir şey ölçmüyordur.',
      'Diğer tuzak kısa-cevap formatıdır: muhakeme modelleri ve konuşkan fine-tune’lar aşırı açıklamayı sever ve ≤7 kelime kuralını bozan ayrıntılı ama doğru bir cevap 0 almak zorundadır — bu bir hata değil, bilinçli bir sinyaldir, ama puanlayıcının katı ve öngörülebilir olmasını gerektirir.',
    ],
    lessons: [
      'A benchmark you author yourself forces you to be precise about what "reasoning" even means — every ambiguous item is one you have to resolve before a model ever sees it.',
      'Automatic, strict scoring is worth more than a bigger dataset. Reproducibility comes from the scorer being boringly deterministic, not from volume.',
      'Measuring my own models against their bases — and publishing the regressions — taught me more than a flattering number would have.',
    ],
    lessonsTr: [
      'Kendi yazdığın bir benchmark, “muhakemenin” ne demek olduğu konusunda kesin olmaya zorlar — her belirsiz soru, model onu görmeden önce çözmen gereken bir sorudur.',
      'Otomatik, katı puanlama daha büyük bir veri kümesinden daha değerlidir. Yeniden üretilebilirlik, puanlayıcının sıkıcı derecede deterministik olmasından gelir, hacimden değil.',
      'Kendi modellerimi tabanlarına karşı ölçmek — ve gerilemeleri yayınlamak — bana gurur okşayan bir sayıdan çok daha fazlasını öğretti.',
    ],
    images: [
      { src: '/projects/mihenk-benchmark/leaderboard.svg', caption: 'Full-set leaderboard (800 items): a 12B saturates at ~98%, a 3B lands at ~49% — a clean capability spread', captionTr: 'Tam set liderlik tablosu (800 soru): 12B ~%98’de doyar, 3B ~%49’da kalır — temiz bir yetenek yelpazesi' },
      { src: '/projects/mihenk-benchmark/finetune-vs-base.svg', caption: 'My own fine-tune, measured weight-matched against its base — the honest trade-off, visualized', captionTr: 'Kendi fine-tune’um, kendi base modeliyle eşleştirilerek ölçüldü — dürüst takas, görselleştirildi' },
      { src: '/projects/mihenk-benchmark/disciplines.svg', caption: '20 disciplines × 2 languages × 2 formats × 4 tiers — every item objectively scorable', captionTr: '20 disiplin × 2 dil × 2 format × 4 seviye — her soru nesnel olarak puanlanabilir' },
    ],
    overview:
      'MIHENK (Multilingual Intelligence, High-level Evaluation and Neural Knowledge) is a benchmark I designed from scratch to measure reasoning rather than memorized recall. Every one of its 800 items is original and generated rather than copied from any examination bank — each record declares its provenance — exists in both Turkish and English as its own item rather than a translation, and is automatically and objectively scorable — so results are reproducible and comparable over time. Items deliberately include irrelevant premises, forcing a model to isolate what matters. I then ran 11 models through it, from a 3B up to a 12B, cloud and local — and included my own two fine-tunes, each measured against its own base.',
    overviewTr:
      'MIHENK (Multilingual Intelligence, High-level Evaluation and Neural Knowledge), ezberden hatırlamayı değil muhakemeyi ölçmek için sıfırdan tasarladığım bir benchmark. 800 sorunun her biri özgün ve herhangi bir soru bankasından kopyalanmak yerine üretilmiş — her kayıt kendi kaynağını beyan eder — hem Türkçe hem İngilizce olarak çeviri değil kendi sorusu hâlinde mevcut ve otomatik ile nesnel biçimde puanlanabilir — böylece sonuçlar yeniden üretilebilir ve zaman içinde karşılaştırılabilir. Sorular bilinçli olarak alakasız öncüller içerir; model neyin önemli olduğunu ayıklamak zorunda kalır. Ardından 3B’den 12B’ye, bulut ve yerel, 11 modeli bu benchmark’tan geçirdim — kendi iki fine-tune’umu da her biri kendi base modeline karşı ölçerek dahil ettim.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Libraries', items: ['anthropic', 'openai (Ollama/OpenRouter-compatible)', 'transformers', 'bitsandbytes'] },
      { label: 'Tools', items: ['Ollama (local)', 'OpenRouter (cloud)', 'Hugging Face Hub', 'llama.cpp (GGUF)'] },
      { label: 'AI Models', items: ['Evaluated: Gemma-4/2, Qwen2.5, DeepSeek-R1, Llama-3.2, Phi-3.5, Mistral, Claude Haiku 4.5, + 2 own fine-tunes'] },
    ],
    architecture: [
      'Every item follows a fixed JSON schema — id, language, discipline, format, difficulty, question, choices/answer or answer_short/answer_aliases, explanation (always English metadata, never shown to the model), source, version, and split. scoring/score.py is the single reference scorer: exact-letter regex for multiple choice, and lowercased, punctuation-normalized canonical/alias matching with numeric tolerance for short answer.',
      'scripts/evaluate.py builds a standardized 0-shot prompt per format, calls a model through a pluggable backend (a reference anthropic backend, plus any OpenAI-compatible endpoint for Ollama/OpenRouter, and a dryrun for CI), scores every item, and prints per-discipline, per-language, per-difficulty, and per-format breakdowns plus the LCI. scripts/evaluate_local.py runs 4-bit HF inference on a 12 GB GPU and merges a LoRA adapter for weight-matched finetune-vs-base comparisons. validate.py, assign_splits.py, and build_hf.py keep the data schema-valid, difficulty-balanced, and reproducible, with a CHANGELOG recording every item change.',
    ],
    architectureTr: [
      'Her soru sabit bir JSON şemasını izler — id, dil, disiplin, format, zorluk, soru, seçenekler/cevap ya da answer_short/answer_aliases, açıklama (her zaman İngilizce meta veri; modele asla gösterilmez), kaynak, sürüm ve split. scoring/score.py tek referans puanlayıcıdır: çoktan seçmeli için tam-harf regex; kısa cevap için küçük harfe indirgenmiş, noktalama-normalleştirilmiş kanonik/alias eşleştirme ve sayısal tolerans.',
      'scripts/evaluate.py format başına standart 0-shot prompt kurar, modeli takılabilir bir backend üzerinden çağırır (referans anthropic backend’i, Ollama/OpenRouter için OpenAI-uyumlu herhangi bir endpoint ve CI için dryrun), her soruyu puanlar ve disiplin, dil, zorluk ve format bazında dökümleri artı LCI’yi yazdırır. scripts/evaluate_local.py 12 GB GPU’da 4-bit HF inference’ı yapar ve fine-tune ile base model karşılaştırmaları için bir LoRA adaptörünü birleştirir. validate.py, assign_splits.py ve build_hf.py veriyi şema-geçerli, zorluk-dengeli ve yeniden üretilebilir tutar; bir CHANGELOG her soru değişikliğini kaydeder.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'research',
    tier: 'featured',
    problem:
      'LLM benchmarks leak into training data, and nearly all of them are English-only. There was no clean way to ask whether a model reasons in Turkish or merely recalls — and no way to measure a fine-tune against its own base on identical ground.',
    problemTr:
      'LLM benchmark’ları eğitim verisine sızıyor ve neredeyse hepsi yalnızca İngilizce. Bir modelin Türkçede muhakeme mi yoksa ezber mi yaptığını sormanın temiz bir yolu yoktu — bir fine-tune’u kendi base modeliyle aynı zeminde ölçmenin de.',
    flow: 'Item spec → 800 JSON records (TR + EN) → pluggable backend (Anthropic / OpenAI-compatible / local 4-bit HF) → reference scorer → per-discipline, per-language, per-difficulty breakdown + LCI',
    flowTr: 'Soru şeması → 800 JSON kaydı (TR + EN) → takılabilir backend (Anthropic / OpenAI-uyumlu / yerel 4-bit HF) → referans puanlayıcı → disiplin, dil ve zorluk kırılımları + LCI',
    metrics: [
      { label: 'Items', value: '800 · 400 TR / 400 EN', condition: 'dataset scope — 20 disciplines, 4 tiers (L1–L4)' },
      { label: 'Top score', value: '97.6%', condition: 'model performance — gemma4:12b, complete data set, all splits' },
      { label: 'Capability spread', value: '49.0%', condition: 'model performance — llama3.2:3b on the same set' },
      { label: 'Language consistency', value: 'LCI 2.2 vs 20.0', condition: 'model performance — 12B vs 3B, mean absolute TR/EN gap' },
      { label: 'Models evaluated', value: '11', condition: 'evaluation scope — cloud + local, including both own fine-tunes' },
      { label: 'Published', value: '80 of 800', condition: 'release scope — public split on the Hub, 720 held back privately' },
    ],
    metricsTr: [
      { label: 'Soru', value: '800 · 400 TR / 400 EN', condition: 'veri kümesi kapsamı — 20 disiplin, 4 seviye (L1–L4)' },
      { label: 'En yüksek skor', value: '%97,6', condition: 'model performansı — gemma4:12b, tam veri kümesi, tüm split’ler' },
      { label: 'Yetenek yelpazesi', value: '%49,0', condition: 'model performansı — aynı kümede llama3.2:3b' },
      { label: 'Dil tutarlılığı', value: 'LCI 2,2 — 20,0', condition: 'model performansı — 12B ve 3B, ortalama mutlak TR/EN farkı' },
      { label: 'Değerlendirilen model', value: '11', condition: 'değerlendirme kapsamı — bulut + yerel, iki fine-tune dahil' },
      { label: 'Yayınlanan', value: '800’ün 80’i', condition: 'yayın kapsamı — Hub’da herkese açık bölüm, 720 kayıt private' },
    ],
    useCases: [
      'Turkish LLM evaluation, where most public benchmarks do not reach',
      'Comparing a fine-tune against its own base on identical items',
      'Surfacing cross-lingual weakness that an English-only benchmark hides',
    ],
    useCasesTr: [
      'Türkçe LLM değerlendirmesi — çoğu açık benchmark’ın ulaşmadığı yer',
      'Bir fine-tune’u kendi base modeliyle aynı sorular üzerinde karşılaştırmak',
      'Yalnızca İngilizce bir benchmark’ın gizlediği diller arası zayıflığı görünür kılmak',
    ],
    decisions: [
      { choice: 'Two auto-scorable formats only — multiple choice and short answer', why: 'Removes grader variance entirely, so a score means the same thing across runs and across months', tradeoff: 'Off-format answers score zero, which doubles as an instruction-following test but penalises verbose models' },
    ],
    decisionsTr: [
      { choice: 'Yalnızca iki otomatik puanlanabilir format — çoktan seçmeli ve kısa cevap', why: 'Puanlayıcı değişkenliğini tamamen kaldırır; bir skor koşular ve aylar arasında aynı şeyi ifade eder', tradeoff: 'Format dışı cevaplar sıfır alır; bu talimat takibini de ölçer ama ayrıntılı cevap veren modelleri cezalandırır' },
    ],
    contribution: [
      'The benchmark design: 20 disciplines × 2 languages × 2 auto-scorable formats × 4 calibrated difficulty tiers, with each language authored as its own item rather than translated.',
      'The reference scorer in scoring/score.py — exact-letter matching for multiple choice, normalised canonical/alias matching with numeric tolerance for short answer.',
      'The LCI metric, and the contamination policy: a 720/80 private/public split with provenance recorded on every record.',
      'The evaluation harness across three backends and the eleven runs behind leaderboard.md. The models themselves are third-party.',
    ],
    contributionTr: [
      'Benchmark tasarımı: 20 disiplin × 2 dil × 2 otomatik puanlanabilir format × 4 kalibre edilmiş zorluk seviyesi; her dil çeviri değil kendi sorusu olarak yazıldı.',
      'scoring/score.py içindeki referans puanlayıcı — çoktan seçmeli için tam harf eşleştirme, kısa cevap için normalleştirilmiş kanonik/alias eşleştirme ve sayısal tolerans.',
      'LCI metriği ve kontaminasyon politikası: her kayıtta kaynak bilgisiyle 720/80 private/public bölünmesi.',
      'Üç backend üzerinde değerlendirme koşucusu ve leaderboard.md’nin arkasındaki on bir koşu. Modellerin kendisi üçüncü taraf.',
    ],
    limitations: [
      'Items are model-generated, so they inherit the generator’s blind spots as well as its coverage.',
      'A 12B saturating at 97.6% compresses the top of the scale — the benchmark separates weak from strong better than strong from stronger.',
      'Two frontier Claude runs were interrupted by an OpenRouter credit shortfall and are still missing from the leaderboard.',
    ],
    limitationsTr: [
      'Sorular model üretimi, dolayısıyla üreticinin kapsamını olduğu kadar kör noktalarını da devralıyor.',
      '12B’nin %97,6’da doyması ölçeğin üst ucunu sıkıştırıyor — benchmark zayıfı güçlüden, güçlüyü daha güçlüden olduğundan daha iyi ayırıyor.',
      'İki frontier Claude koşusu OpenRouter kredisi yetmediği için yarıda kaldı ve liderlik tablosunda hâlâ eksik.',
    ],
    provenance: 'generated',
    provenanceNote:
      'All 800 items were model-generated, not hand-written — every record declares source: orijinal-AI-üretim. The design, schema, scorer and evaluation protocol are the authored part.',
    provenanceNoteTr:
      '800 sorunun tamamı model tarafından üretildi, elle yazılmadı — her kayıt source: orijinal-AI-üretim beyanını taşır. Tasarım, şema, puanlayıcı ve değerlendirme protokolü kaleme alınan kısım.',
  },
  {
    slug: 'llm-lora-finetuning',
    category: 'LLM & NLP',
    cover: '/projects/llm-lora-finetuning/cover.svg',
    mark: 'MARK II',
    codename: 'The Apprentice',
    title: 'ayarlicazhocam-training',
    subtitle: 'The training pipeline behind my bilingual assistant, and the record of the bug that quietly destroyed the first version',
    subtitleTr: 'İki dilli asistanımın arkasındaki eğitim pipeline’ı ve ilk sürümü sessizce mahveden hatanın kaydı',
    oneLiner: 'Two fine-tunes, one honest arc: a chat-template bug silently wrecked v1, and finding it is what made v2 work.',
    oneLinerTr: 'İki fine-tune, tek dürüst hikâye: bir chat-template hatası v1’i sessizce mahvetti; onu bulmak v2’yi çalışır kıldı.',
    language: 'Python',
    color: '#a06bff',
    glow: 'rgba(160,107,255,0.5)',
    tags: ['QLoRA', 'Unsloth', 'Tool Calling'],
    github: gh('ayarlicazhocam-training'),
    // Field Notes — migrated verbatim from caseStudies.js (12 Sep 2026).
    challenges: [
      'The result was bad, and the benchmark told me exactly how bad: 20.65% on Turkish MMLU — statistically identical to random guessing on 5-choice questions, 61st out of 67 models, and roughly half the score of the stock llama3.2:latest of the same size.',
      'Digging in, two symptoms stood out. The model followed the multiple-choice format 0% of the time — it echoed the prompt instead of answering. And asked "Who is Gorkem?", it invented a completely different biography every single run (a model, a blockchain figure, an actor), even though the correct answer is right there in the training data.',
    ],
    challengesTr: [
      'Sonuç kötüydü ve benchmark tam olarak ne kadar kötü olduğunu söyledi: Türkçe MMLU’da %20,65 — 5 şıklı sorularda rastgele tahminle istatistiksel olarak aynı, 67 model içinde 61., ve aynı boyuttaki stok llama3.2:latest’in yaklaşık yarısı.',
      'Derine indikçe iki belirti öne çıktı. Model çoktan seçmeli formatı %0 oranında takip etti — cevap vermek yerine prompt’u tekrarladı. Ve “Görkem kimdir?” diye sorulduğunda, doğru cevap eğitim verisinde dururken her koşuda bambaşka bir biyografi uydurdu (model, blockchain figürü, oyuncu).',
    ],
    lessons: [
      'The chat template is not a formatting detail — it is load-bearing. A template mismatch can quietly zero out an entire training run while every step still "succeeds".',
      'A negative result you can explain is worth more than a positive one you can’t. Measuring the failure properly taught me more than a lucky success would have.',
      'Fine-tuning shifts weight distributions; it does not memorize facts on command. Weak, malformed signal means the base model’s priors win — and you get confident hallucination.',
    ],
    lessonsTr: [
      'Chat template bir biçimlendirme ayrıntısı değil — taşıyıcı bir öğedir. Bir template uyumsuzluğu, her adım “başarılı” görünürken tüm bir eğitim koşusunu sessizce sıfırlayabilir.',
      'Açıklayabildiğin bir olumsuz sonuç, açıklayamadığın bir olumludan daha değerlidir. Başarısızlığı düzgün ölçmek bana şanslı bir başarıdan çok daha fazlasını öğretti.',
      'İnce ayar ağırlık dağılımlarını kaydırır; komutla gerçek ezberlemez. Zayıf, bozuk sinyal, temel modelin önsel eğilimlerinin kazanması demektir — ve karşılığında kendinden emin halüsinasyon alırsın.',
    ],
    images: [
      { src: '/projects/llm-lora-finetuning/v1-vs-v2.svg', caption: 'The headline: two fine-tunes measured side by side — v1 (Llama 3.2-3B) vs v2 (Gemma-4-E4B). Tool-calling 17% → 92%, identity and chat template both fixed', captionTr: 'Ana bulgu: yan yana ölçülen iki fine-tune — v1 (Llama 3.2-3B) vs v2 (Gemma-4-E4B). Tool calling %17 → %92; kimlik ve chat template düzeltildi' },
      { src: '/projects/llm-lora-finetuning/pipeline.svg', caption: 'Bilingual dataset from scraping, hand-authoring, and synthetic pairs — v2 adds ~20% thinking traces and tool-calling examples', captionTr: 'Kazıma, elle yazım ve sentetik çiftlerden iki dilli veri kümesi — v2, ~%20 düşünme izi ve tool calling örnekleri ekler' },
      { src: '/projects/llm-lora-finetuning/training.svg', caption: 'v2: text-only 4-bit QLoRA on Gemma-4-E4B, trained locally on an RTX 5070 (12 GB) — multimodal towers offloaded to CPU, 9.8 GB peak', captionTr: 'v2: Gemma-4-E4B üzerinde metin-only 4-bit QLoRA, yerelde RTX 5070 (12 GB) ile eğitildi — multimodal kuleler CPU’ya taşındı, tepe 9,8 GB' },
      { src: '/projects/llm-lora-finetuning/benchmark.svg', caption: 'The honest arc: v1 scored ~random on MMLU (chat-template bug); v2 fixes the template and reaches 92% correct-tool rate', captionTr: 'Dürüst hikâye: v1 MMLU’da ~rastgele aldı (chat-template hatası); v2 template’i düzeltir ve %92 doğru-araç oranına ulaşır' },
      { src: '/projects/llm-lora-finetuning/hallucination.svg', caption: 'v1 invented a new bio for "Who is Gorkem?" every run; v2 learned a single consistent identity', captionTr: 'v1, “Görkem kimdir?” sorusuna her koşuda yeni bir biyografi uydurdu; v2 tek ve tutarlı bir kimlik öğrendi' },
    ],
    overview:
      'The full training pipeline behind “ayarlicazhocam,” my bilingual assistant — and a research log I keep honest across two versions. v1 fine-tuned Llama 3.2-3B and failed in an instructive way: a mismatched chat template quietly zeroed out most of the training, which the benchmark caught. v2 rebuilds on the open-source Gemma-4-E4B with QLoRA, fixes the root cause, and adds two real capabilities — native thinking and tool/function calling — trained locally on a single 12 GB GPU. Both models and datasets are published to the Hugging Face Hub, failures and fixes documented in the open.',
    overviewTr:
      '“ayarlicazhocam” adlı iki dilli asistanımın arkasındaki eksiksiz eğitim pipeline’ı — ve iki sürüm boyunca dürüst tuttuğum bir araştırma günlüğü. v1, Llama 3.2-3B’yi fine-tune etti ve öğretici biçimde başarısız oldu: yanlış eşleşen bir chat template eğitimin çoğunu sessizce sıfırladı ve bunu benchmark yakaladı. v2, açık kaynaklı Gemma-4-E4B üzerine QLoRA ile yeniden kurulur, kök nedeni düzeltir ve iki gerçek yetenek ekler — thinking ve araç/function calling — üstelik tek bir 12 GB GPU’da yerelde eğitilerek. Her iki modelin ve veri kümesinin tamamı Hugging Face Hub’a yayınlandı; başarısızlıklar ve düzeltmeler açıkça belgelendi.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Frameworks', items: ['Unsloth', 'Hugging Face Transformers', 'TRL', 'PEFT'] },
      { label: 'Libraries', items: ['BitsAndBytes', 'Hugging Face Datasets'] },
      { label: 'Tools', items: ['RTX 5070 (local, 12 GB)', 'Google Colab (v1)', 'Hugging Face Hub', 'ollama (GGUF eval)'] },
      { label: 'AI Models', items: ['v2 base: google/gemma-4-E4B-it · v2 adapter: gorkemergune/ayarlicazhocam-gemma-4-e4b', 'v1 (retired): unsloth/Llama-3.2-3B · gorkemergune/ayarlicazhocam-llama-3.2-3b'] },
    ],
    architecture: [
      'The dataset is assembled under scrapers/: dedicated scrapers pull from public developer sources (dev.to, GitHub trending, Hugging Face, Stack Overflow, arXiv, Wikipedia), hand-written conversations shape the persona, and generate_bulk_*.py scripts emit 34 English and 36 Turkish synthetic batches. merge_all.py combines everything; v2’s corpus (gorkemergune/ayarlicazhocam_finetune_v2) additionally layers in ~20% thinking traces and explicit tool-calling turns.',
      'v2 training runs in src/phase*.py: Gemma-4-E4B is loaded text-only in 4-bit (its multimodal towers and elastic per-layer embeddings offloaded to CPU so it fits in 12 GB), a QLoRA adapter is trained, and the chat template is always pulled from the model’s own AutoProcessor and verified with a mandatory round-trip test — the exact guard that surfaced v1’s failure. Evaluation is deliberately rigorous: a held-out 12-scenario tool-calling set and the MIHENK benchmark score the merged model weight-matched against its own base. v1 (src/Llama3.2-3BFinetune.ipynb, BENCHMARK_REPORT.md) is kept as the research record of the chat-template mismatch it fixed.',
    ],
    architectureTr: [
      'Veri kümesi scrapers/ altında toplanır: özel kazıyıcılar herkese açık geliştirici kaynaklarından (dev.to, GitHub trending, Hugging Face, Stack Overflow, arXiv, Wikipedia) veri çeker; elle yazılmış konuşmalar personayı şekillendirir; generate_bulk_*.py betikleri 34 İngilizce ve 36 Türkçe sentetik grup üretir. merge_all.py hepsini birleştirir; v2’nin derlemi (gorkemergune/ayarlicazhocam_finetune_v2) buna ek olarak ~%20 düşünme izi ve açık tool calling turları katmanlar.',
      'v2 eğitimi src/phase*.py içinde yürür: Gemma-4-E4B metin-only 4-bit yüklenir (multimodal kuleleri ve esnek katman-başı embedding’leri 12 GB’a sığması için CPU’ya taşınır), bir QLoRA adaptörü eğitilir ve chat template her zaman modelin kendi AutoProcessor’ından alınıp zorunlu bir gidiş-dönüş testiyle doğrulanır — bu, v1’in başarısızlığını ortaya çıkaran korumadır. Değerlendirme bilinçli olarak titizdir: ayrılmış 12 senaryoluk tool calling kümesi ve MIHENK benchmark’ı, birleştirilmiş modeli kendi base modeliyle eşleştirerek puanlar. v1 (src/Llama3.2-3BFinetune.ipynb, BENCHMARK_REPORT.md), düzelttiği chat-template uyumsuzluğunun araştırma kaydı olarak saklanır.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'featured',
    problem:
      'Small open models carry no consistent identity and cannot call tools. Worse, a fine-tune can fail silently — training runs, loss falls, and the model learns almost nothing. That is exactly what happened to v1, and only the benchmark caught it.',
    problemTr:
      'Küçük açık modellerin tutarlı bir kimliği yok ve araç çağıramıyorlar. Daha kötüsü, bir fine-tune sessizce başarısız olabiliyor — eğitim koşuyor, kayıp düşüyor, model neredeyse hiçbir şey öğrenmiyor. v1’de tam olarak bu oldu ve yalnızca benchmark yakaladı.',
    flow: 'Scraped + hand-written + synthetic pairs → merge → text-only 4-bit QLoRA on Gemma-4-E4B (multimodal towers offloaded to CPU) → held-out tool-calling set + MIHENK, weight-matched against the base',
    flowTr: 'Kazınmış + elle yazılmış + sentetik çiftler → birleştirme → Gemma-4-E4B üzerinde metin-only 4-bit QLoRA (multimodal kuleler CPU’ya taşınır) → ayrılmış tool calling kümesi + MIHENK, base modelle eşleştirilerek',
    metrics: [
      { label: 'Tool-calling', value: '17% → 92%', condition: 'model performance — correct-tool rate, held-out 12-scenario set including one unseen tool' },
      { label: 'MIHENK, v2 vs base', value: '73.4% vs 76.6%', condition: 'model performance — complete 800-item set, adapter merged, weight-matched' },
      { label: 'Peak VRAM', value: '9.8 GB', condition: 'training footprint — one RTX 5070, 12 GB, text-only 4-bit QLoRA' },
      { label: 'Synthetic batches', value: '70', condition: 'dataset scope — 34 EN + 36 TR, layered on scraped and hand-written pairs' },
    ],
    metricsTr: [
      { label: 'Tool calling', value: '%17 → %92', condition: 'model performansı — ayrılmış 12 senaryoluk kümede doğru-araç oranı, biri görülmemiş araç' },
      { label: 'MIHENK, v2 ve base', value: '%73,4 — %76,6', condition: 'model performansı — tam 800 soruluk küme, adaptör birleştirilmiş, ağırlık eşleşmeli' },
      { label: 'Tepe VRAM', value: '9,8 GB', condition: 'eğitim ayak izi — tek RTX 5070, 12 GB, metin-only 4-bit QLoRA' },
      { label: 'Sentetik grup', value: '70', condition: 'veri kümesi kapsamı — 34 EN + 36 TR, kazınmış ve elle yazılmış çiftlerin üstüne' },
    ],
    useCases: [
      'Domain-specific assistant training on a single consumer GPU',
      'Catching a silent fine-tune failure before it ships',
    ],
    useCasesTr: [
      'Tek tüketici GPU’sunda alan-özel asistan eğitimi',
      'Sessiz bir fine-tune başarısızlığını yayınlamadan önce yakalamak',
    ],
    decisions: [
      { choice: 'The chat template is always read from the model’s own AutoProcessor, guarded by a mandatory round-trip test', why: 'A hand-copied template is what silently destroyed v1; reading it from the model makes that class of bug impossible', tradeoff: 'Adds a required test to every run — which is how Gemma-4 was caught dropping a "thinking" field, where the correct key is "reasoning"' },
    ],
    decisionsTr: [
      { choice: 'Chat template her zaman modelin kendi AutoProcessor’ından okunur ve zorunlu bir gidiş-dönüş testiyle korunur', why: 'v1’i sessizce mahveden şey elle kopyalanmış bir template’ti; modelden okumak bu hata sınıfını imkânsız kılıyor', tradeoff: 'Her koşuya zorunlu bir test ekliyor — Gemma-4’ün bir "thinking" alanını düşürdüğü, doğru anahtarın "reasoning" olduğu böyle yakalandı' },
    ],
    contribution: [
      'The dataset architecture: three sources combined, with roughly 20% thinking traces and explicit tool-calling turns layered in for v2.',
      'The chat-template diagnosis — the root cause of v1’s failure — and the round-trip guard that now prevents it.',
      'Fitting Gemma-4-E4B into 12 GB by offloading the multimodal towers and elastic per-layer embeddings to CPU.',
      'The evaluation protocol: a held-out scenario set plus MIHENK, always weight-matched against the model’s own base. Unsloth, TRL and PEFT are off the shelf.',
    ],
    contributionTr: [
      'Veri kümesi mimarisi: üç kaynağın birleştirilmesi, v2 için ~%20 düşünme izi ve açık tool calling turlarının katmanlanması.',
      'Chat template teşhisi — v1’in başarısızlığının kök nedeni — ve bunu artık engelleyen gidiş-dönüş koruması.',
      'Multimodal kuleleri ve esnek katman-başı embedding’leri CPU’ya taşıyarak Gemma-4-E4B’yi 12 GB’a sığdırmak.',
      'Değerlendirme protokolü: ayrılmış senaryo kümesi artı MIHENK, her zaman modelin kendi base’iyle ağırlık eşleşmeli. Unsloth, TRL ve PEFT hazır.',
    ],
    limitations: [
      'v2 trades a modest overall MIHENK dip for a large tool-calling gain — short-answer accuracy regresses because the model became more verbose.',
      'The tool-calling gain is measured on 12 held-out scenarios, which shows the direction and does not bound the error.',
    ],
    limitationsTr: [
      'v2, mütevazı bir genel MIHENK düşüşünü büyük bir tool calling kazancıyla takas ediyor — model daha ayrıntılı konuştuğu için kısa cevap geriliyor.',
      'Tool calling kazancı 12 ayrılmış senaryoda ölçüldü; bu yönü gösterir, hatayı sınırlamaz.',
    ],
    provenance: 'mixed',
    provenanceNote:
      'The training corpus combines scraped public developer sources, hand-written persona conversations, and 70 programmatically generated batches. Declared in the repository README.',
    provenanceNoteTr:
      'Eğitim derlemi üç kaynağı birleştiriyor: kazınmış açık geliştirici kaynakları, elle yazılmış persona konuşmaları ve programatik üretilmiş 70 grup. Depo README’sinde beyan edilmiş.',
  },
  {
    slug: 'ayarlicazhocam-tool-agent',
    category: 'AI Agents & Tooling',
    cover: '/projects/ayarlicazhocam-tool-agent/cover.svg',
    mark: 'MARK III',
    codename: 'The Operator',
    title: 'ayarlicazhocam · Tool Agent',
    subtitle: 'What a small open model can do once it can call real APIs, with every tool call visible as it happens',
    subtitleTr: 'Küçük bir açık model gerçek API’leri çağırabildiğinde neler yapabiliyor; her tool call anında görünür',
    oneLiner: 'Gemma-4 calls a real public API through function calling, then answers in persona — every tool call shown, live.',
    oneLinerTr: 'Gemma-4, function calling ile gerçek bir açık API’yi çağırır, sonra persona’sıyla yanıtlar — her tool call canlı gösterilir.',
    language: 'Python',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.5)',
    tags: ['Function Calling', 'Gemma-4', 'Gradio'],
    github: gh('ayarlicazhocam-tool-agent'),
    images: [
      { src: '/projects/ayarlicazhocam-tool-agent/demo.png', caption: 'The live Gradio app — the persona answer plus expandable "Araç Çağrısı" (tool call) blocks, one per invocation', captionTr: 'Canlı Gradio uygulaması — persona yanıtı ve her çağrı için bir tane açılabilir “Araç Çağrısı” bloğu' },
      { src: '/projects/ayarlicazhocam-tool-agent/cover.svg', caption: 'The tool-calling loop: model → validated function call → real Open-Meteo request → function response → final answer', captionTr: 'Tool calling döngüsü: model → doğrulanmış fonksiyon çağrısı → gerçek Open-Meteo isteği → fonksiyon yanıtı → nihai cevap' },
    ],
    overview:
      'The third piece of the ayarlicazhocam ecosystem: after the fine-tune (identity) and MIHENK (reasoning), this is interaction with the outside world. A live Gradio app on Hugging Face Spaces where Gemma-4 (served through the Gemini API with native function calling) fetches live weather from the public Open-Meteo API and converts temperature units. It can chain several tools across turns — two get_weather calls, then two convert_temperature calls, then compute a difference itself — and after every answer the UI transparently shows which tools were called, with which arguments, and what they returned.',
    overviewTr:
      'ayarlicazhocam ekosisteminin üçüncü parçası: fine-tune’dan (kimlik) ve MIHENK’ten (muhakeme) sonra, bu, dış dünyayla etkileşim. Hugging Face Spaces üzerinde canlı bir Gradio uygulaması; Gemma-4 (yerel function calling’li Gemini API üzerinden sunulur), açık Open-Meteo API’sinden canlı hava durumu çeker ve sıcaklık birimlerini çevirir. Turlar boyunca birden fazla aracı zincirleyebilir — iki get_weather çağrısı, sonra iki convert_temperature çağrısı, ardından farkı kendisi hesaplar — ve her yanıttan sonra arayüz, hangi araçların hangi argümanlarla çağrıldığını ve ne döndürdüğünü şeffafça gösterir.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Frameworks', items: ['Gradio', 'google-genai SDK'] },
      { label: 'Tools', items: ['Open-Meteo API (public, no key)', 'Hugging Face Spaces'] },
      { label: 'AI Models', items: ['Gemma-4 (gemma-4-26b-a4b-it, MoE ~4B active) via the Gemini API — native function calling'] },
    ],
    architecture: [
      'app.py holds the Gemini API client, the tool schemas, the tool-calling loop, and the Gradio UI. The persona (the ayarlicazhocam identity) is applied via system_instruction. When the model returns a function_call, the Python side validates the arguments, makes the real Open-Meteo request (geocoding → forecast), and sends the result back as a function_response; the model then produces the final natural-language answer. The loop supports several tool calls per turn and across turns.',
      'tools.py implements get_weather and convert_temperature as plain, offline-testable functions, decoupled from the model so they can be unit-tested without any API. The model ID is not hard-coded — it is resolved from the Gemini API’s live model list (overridable via MODEL_ID) — and the GOOGLE_API_KEY is loaded from a git-ignored .env locally and from Spaces Secrets in deployment.',
    ],
    architectureTr: [
      'app.py; Gemini API istemcisini, araç şemalarını, tool calling döngüsünü ve Gradio arayüzünü barındırır. Persona (ayarlicazhocam kimliği) system_instruction ile uygulanır. Model bir function_call döndürdüğünde Python tarafı argümanları doğrular, gerçek Open-Meteo isteğini yapar (geocoding → tahmin) ve sonucu bir function_response olarak geri gönderir; model ardından nihai doğal dil cevabını üretir. Döngü, tur başına ve turlar arası birkaç tool call’ını destekler.',
      'tools.py; get_weather ve convert_temperature’ı modelden ayrık, çevrimdışı test edilebilir sade fonksiyonlar olarak uygular; böylece hiçbir API olmadan birim testi yapılabilir. Model kimliği sabit kodlanmaz — Gemini API’sinin canlı model listesinden çözülür (MODEL_ID ile geçersiz kılınabilir) — ve GOOGLE_API_KEY yerelde git-yok-sayılan bir .env’den, dağıtımda ise Spaces Secrets’tan yüklenir.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'A small open model that can call real APIs is more useful than a bigger one that cannot. But when an agent answers, the user has no way to tell whether it called anything or made the answer up.',
    problemTr:
      'Gerçek API çağırabilen küçük bir açık model, çağıramayan büyük bir modelden daha kullanışlı. Ama ajan cevap verdiğinde kullanıcı, gerçekten bir şey çağırdığını mı yoksa cevabı uydurduğunu mu anlayamıyor.',
    flow: 'User turn → model emits a typed function call → arguments validated in Python → real Open-Meteo request → function response → persona answer, with every call rendered as its own block',
    flowTr: 'Kullanıcı turu → model tipli bir fonksiyon çağrısı üretir → argümanlar Python’da doğrulanır → gerçek Open-Meteo isteği → fonksiyon yanıtı → persona cevabı, her çağrı kendi bloğunda gösterilir',
    metrics: null,
    metricsTr: null,
    useCases: [],
    useCasesTr: [],
    decisions: [
      { choice: 'Python always makes the HTTP request, never the model', why: 'Keeps a hard boundary between deciding and doing — the model is never given code execution', tradeoff: 'Every new tool needs a hand-written executor' },
      { choice: 'Tool schemas as typed google.genai FunctionDeclarations instead of hand-written JSON', why: 'A malformed schema fails at definition time rather than mid-conversation', tradeoff: 'Ties the project to the google-genai SDK' },
    ],
    decisionsTr: [
      { choice: 'HTTP isteğini her zaman Python yapar, model asla', why: 'Karar vermekle iş yapmak arasında sert bir sınır kurar — modele hiç kod çalıştırma verilmez', tradeoff: 'Her yeni araç için elle yazılmış bir çalıştırıcı gerekir' },
      { choice: 'Araç şemaları elle yazılmış JSON yerine tipli google.genai FunctionDeclaration’ları', why: 'Bozuk bir şema konuşmanın ortasında değil tanım anında hata verir', tradeoff: 'Projeyi google-genai SDK’sına bağlar' },
    ],
    contribution: [
      'The transparency surface: every tool call, its arguments and its return rendered as an expandable block under the answer.',
      'The validation boundary — arguments are type- and format-checked before execution — and resolving the model id from the live model list instead of hard-coding it. Gradio and the google-genai SDK are off the shelf.',
    ],
    contributionTr: [
      'Şeffaflık yüzeyi: her tool çağrısı, argümanları ve dönüşü cevabın altında açılabilir bir blok olarak gösterilir.',
      'Doğrulama sınırı — argümanlar çalıştırılmadan önce tip ve format açısından denetlenir — ve model kimliğinin sabit kodlanmak yerine canlı model listesinden çözülmesi. Gradio ve google-genai SDK hazır.',
    ],
    limitations: [
      'Two tools and no evaluation set. This demonstrates the loop; it does not measure it.',
    ],
    limitationsTr: [
      'İki araç ve değerlendirme kümesi yok. Bu, döngüyü gösteriyor; ölçmüyor.',
    ],
  },
  {
    slug: 'ayarlicazhocam-agent',
    unverified: [
      'results.Groq latency — the \'0.8-1.1 s\' range is not stated in the repository; the README gives \'0.8-7 s locally\' and a single provider reading of ~1.1 s. Only the verified local figure was carried into metrics.',
    ],

    category: 'AI Agents & Tooling',
    cover: '/projects/ayarlicazhocam-agent/cover.svg',
    mark: 'MARK IV',
    codename: 'The Concierge',
    title: 'ayarlicazhocam · Task Agent',
    subtitle: 'Keeps your tasks in a real database and lets an LLM run them, so nothing it tells you is invented',
    subtitleTr: 'Görevlerini gerçek bir veritabanında tutar ve bir LLM’in yönetmesini sağlar; sana söylediği hiçbir şey uydurma değildir',
    oneLiner: 'Talk to it in Turkish or English; it creates, lists, and updates real tasks through tool calls grounded in SQLite.',
    oneLinerTr: 'Türkçe ya da İngilizce konuş; SQLite’a dayalı tool call’larıyla gerçek görevler oluşturur, listeler ve günceller.',
    language: 'Python',
    color: '#e879f9',
    glow: 'rgba(232,121,249,0.5)',
    tags: ['Tool Calling', 'SQLite', 'Ollama'],
    github: gh('ayarlicazhocam-agent'),
    images: [
      { src: '/projects/ayarlicazhocam-agent/architecture.svg', caption: 'Layered architecture — Gradio UI → agent orchestrator → tool registry → TaskService → repository → SQLite', captionTr: 'Katmanlı mimari — Gradio arayüz → ajan orkestratörü → araç kaydı → TaskService → depo → SQLite' },
      { src: '/projects/ayarlicazhocam-agent/tools.svg', caption: 'Three task tools behind a single standardized result envelope — success / data / message / error', captionTr: 'Tek bir standartlaştırılmış sonuç zarfının ardındaki üç görev aracı — success / data / message / error' },
      { src: '/projects/ayarlicazhocam-agent/providers.svg', caption: 'One agent interface, four back-ends — Ollama, Groq, Gemini, and my own fine-tuned Gemma, verified end to end', captionTr: 'Tek ajan arayüzü, dört backend — Ollama, Groq, Gemini ve kendi fine-tune’lu Gemma’m, uçtan uca doğrulandı' },
    ],
    overview:
      'A conversational task manager that lets an LLM do real work instead of just talking about it. You chat in Turkish or English, and behind the scenes the agent runs a bounded tool-calling loop against a SQLite database — creating, listing, and updating tasks — with every claim grounded in what the database actually returns. It is the down-to-earth, product side of the ayarlicazhocam line: not a fine-tune this time, but the agent scaffolding that makes native tool-calling models genuinely useful.',
    overviewTr:
      'Bir LLM’in sadece konuşmak yerine gerçek iş yapmasını sağlayan konuşma tabanlı bir görev yöneticisi. Türkçe ya da İngilizce sohbet edersin; perde arkasında ajan, SQLite veritabanına karşı sınırlı bir tool calling döngüsü çalıştırır — görev oluşturur, listeler ve günceller — ve her iddia veritabanının gerçekten döndürdüğüne dayanır. Bu, ayarlicazhocam serisinin ayakları yere basan, ürün tarafıdır: bu kez bir fine-tune değil, yerel araç-çağıran modelleri gerçekten faydalı kılan ajan iskelesi.',
    stack: [
      { label: 'Languages', items: ['Python 3.11+'] },
      { label: 'Interface', items: ['Gradio'] },
      { label: 'Storage', items: ['SQLite'] },
      { label: 'LLM Providers', items: ['Ollama (qwen2.5:7b)', 'Groq (llama-3.3-70b)', 'Google Gemini 2.0 Flash', 'fine-tuned Gemma'] },
      { label: 'Testing', items: ['pytest — 112 tests'] },
    ],
    architecture: [
      'The system is layered top to bottom: Gradio UI → agent orchestrator → tool registry → task tools → TaskService → repository → SQLite. The orchestrator runs a bounded tool-calling loop — it hands the model a small set of function schemas, executes whatever it calls, normalizes each result into a standard envelope (success, data, message, error), and feeds that back so the next turn reasons over real state rather than a guess. Execution telemetry (arguments, status, duration) is captured per call and surfaced in the trace UI.',
      'Persistence is a repository over five tables — projects, tasks, daily_plans, daily_plan_items, work_logs — seeded idempotently with a small demo (3 projects, 5 tasks). Provider choice is a swap behind the same interface: qwen2.5:7b on local Ollama is the default for reliable native tool-calling, with Groq and Gemini available for speed or reach, and a custom fine-tuned Gemma with its own Jinja chat template as the in-house option. The result is an agent that treats the database as ground truth and refuses to answer beyond it.',
    ],
    architectureTr: [
      'Sistem yukarıdan aşağıya katmanlıdır: Gradio arayüz → ajan orkestratörü → araç kaydı → görev araçları → TaskService → depo → SQLite. Orkestratör, sınırlı bir tool calling döngüsü çalıştırır — modele küçük bir fonksiyon şeması kümesi verir, çağırdığı her şeyi yürütür, her sonucu standart bir zarfa (success, data, message, error) normalleştirir ve bunu geri besler; böylece sonraki tur bir tahmin üzerinde değil, gerçek durum üzerinde akıl yürütür. Yürütme telemetrisi (argümanlar, durum, süre) çağrı başına yakalanır ve iz arayüzünde gösterilir.',
      'Kalıcılık, beş tablo üzerinde bir depodur — projects, tasks, daily_plans, daily_plan_items, work_logs — küçük bir demoyla (3 proje, 5 görev) yinelenebilir biçimde tohumlanır. Sağlayıcı seçimi, aynı arayüzün ardında bir değiş-tokuştur: güvenilir yerel tool calling için varsayılan yerel Ollama’da qwen2.5:7b, hız ya da erişim için Groq ve Gemini, ve kendi Jinja sohbet şablonuna sahip özel fine-tune’lu bir Gemma şirket-içi seçenek olarak. Sonuç, veritabanını mutlak gerçek sayan ve onun ötesinde cevap vermeyi reddeden bir ajandır.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'An LLM can talk about your tasks convincingly without touching them, and once it does change something you still cannot tell whether its confirmation matches what is in the database.',
    problemTr:
      'Bir LLM, görevlerine hiç dokunmadan onlar hakkında ikna edici biçimde konuşabilir; bir şeyi gerçekten değiştirdiğinde de verdiği onayın veritabanındakiyle örtüşüp örtüşmediğini anlayamazsın.',
    flow: 'Gradio → orchestrator → tool registry → task tools → TaskService → repository → SQLite, with each result normalised into one envelope and fed back into the next turn',
    flowTr: 'Gradio → orkestratör → tool registry → görev araçları → TaskService → repository → SQLite; her sonuç tek bir zarfa normalleştirilip sonraki tura geri beslenir',
    metrics: [
      { label: 'Tests', value: '112 passing', condition: 'validation scope — verified 2026-08-02' },
      { label: 'Providers', value: '4', condition: 'system scope — Ollama qwen2.5:7b, Groq, Google Gemini, own fine-tuned Gemma' },
      { label: 'Local latency', value: '0.8–7 s per turn', condition: 'runtime — local Ollama, varies with model size' },
      { label: 'Storage', value: '5 tables', condition: 'system scope — projects, tasks, daily_plans, daily_plan_items, work_logs' },
    ],
    metricsTr: [
      { label: 'Test', value: '112 geçiyor', condition: 'doğrulama kapsamı — 2026-08-02’de doğrulandı' },
      { label: 'Sağlayıcı', value: '4', condition: 'sistem kapsamı — Ollama qwen2.5:7b, Groq, Google Gemini, kendi fine-tune’lu Gemma' },
      { label: 'Yerel gecikme', value: 'tur başına 0,8–7 sn', condition: 'çalışma zamanı — yerel Ollama, model boyutuna göre değişir' },
      { label: 'Depolama', value: '5 tablo', condition: 'sistem kapsamı — projects, tasks, daily_plans, daily_plan_items, work_logs' },
    ],
    useCases: [
      'Database-backed conversational interfaces where every answer must be grounded',
      'A provider-agnostic agent layer',
    ],
    useCasesTr: [
      'Her cevabın veriye dayanması gereken veritabanı destekli konuşma arayüzleri',
      'Sağlayıcıdan bağımsız bir ajan katmanı',
    ],
    decisions: [
      { choice: 'One standard result envelope — success / data / message / error — for every tool', why: 'The model reads back what actually happened instead of assuming its call worked', tradeoff: 'Every tool has to be wrapped, even trivial ones' },
    ],
    decisionsTr: [
      { choice: 'Her araç için tek bir standart sonuç zarfı — success / data / message / error', why: 'Model, çağrısının işe yaradığını varsaymak yerine gerçekte ne olduğunu geri okur', tradeoff: 'Önemsiz olanlar dahil her aracın sarmalanması gerekir' },
    ],
    contribution: [
      'The result envelope and the bounded tool-calling loop that grounds every answer in what the database returned.',
      'The provider abstraction — four backends behind one agent interface, including the project’s own fine-tune as a drop-in — and the execution-trace UI showing arguments, status and duration per call.',
    ],
    contributionTr: [
      'Sonuç zarfı ve her cevabı veritabanının döndürdüğüne bağlayan sınırlı tool calling döngüsü.',
      'Sağlayıcı soyutlaması — tek ajan arayüzü arkasında dört backend, projenin kendi fine-tune’u da takılabilir hâlde — ve çağrı başına argüman, durum ve süreyi gösteren yürütme izi arayüzü.',
    ],
    limitations: [
      'The 112 tests cover the tools and the service layer. The agent loop itself was verified by hand across two providers, not by an automated evaluation set.',
    ],
    limitationsTr: [
      '112 test araçları ve servis katmanını kapsıyor. Ajan döngüsünün kendisi otomatik bir değerlendirme kümesiyle değil, iki sağlayıcıda elle doğrulandı.',
    ],
  },
  {
    slug: 'turkish-medical-rag',
    category: 'LLM & NLP',
    cover: '/projects/turkish-medical-rag/cover.svg',
    mark: 'MARK V',
    codename: 'The Skeptic',
    title: 'Turkish Medical RAG',
    subtitle: 'Answers Turkish medical questions only from real sources, and says nothing at all when the sources do not cover you',
    subtitleTr: 'Türkçe tıbbi sorulara yalnızca gerçek kaynaklardan cevap verir; kaynaklar seni kapsamıyorsa hiçbir şey söylemez',
    oneLiner: 'In Turkish medicine a confident wrong answer is worse than no answer, so the gate comes before the model.',
    oneLinerTr: 'Tıpta özgüvenli bir yanlış cevap, hiç cevap vermemekten kötüdür; bu yüzden eşik modelden önce gelir.',
    language: 'Python',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.5)',
    tags: ['RAG', 'ChromaDB', 'Claude'],
    github: gh('turkish-medical-rag'),
    images: [
      { src: '/projects/turkish-medical-rag/pipeline.svg', caption: 'The gated pipeline — query → E5 embedding → ChromaDB top-5 → threshold gate → grounded answer or hard reject', captionTr: 'Kapılı pipeline — sorgu → E5 embedding → ChromaDB ilk-5 → eşik kapısı → temellendirilmiş cevap ya da kesin ret' },
      { src: '/projects/turkish-medical-rag/threshold.svg', caption: 'Threshold calibration — positives (min 0.583) separate from negatives (max 0.567) by a narrow 0.0161 gap', captionTr: 'Eşik kalibrasyonu — pozitifler (min 0,583) ile negatifler (maks 0,567) yalnızca 0,0161’lik dar bir boşlukla ayrılır' },
      { src: '/projects/turkish-medical-rag/metrics.svg', caption: 'Evaluation on the 30-question benchmark — perfect retrieval and gating (calibration, not generalization)', captionTr: '30 soruluk benchmark’ta değerlendirme — kusursuz retrieval ve kapılama (genelleme değil, kalibrasyon)' },
      { src: '/projects/turkish-medical-rag/chunking.svg', caption: 'Corpus & chunking — 24,612 articles reduced to 300 docs and 2,072 deterministic chunks with zero lost words', captionTr: 'Derlem ve parçalama — 24.612 makale, sıfır kelime kaybıyla 300 dokümana ve 2.072 belirlenimci parçaya indirildi' },
    ],
    overview:
      'A retrieval-augmented generation system for Turkish medical text, built around one principle: in a domain where false confidence is dangerous, it is better to refuse than to hallucinate. A hard similarity threshold sits in front of the language model — if the best retrieved chunk is not similar enough to the question, the query is rejected with a fixed Turkish message and the LLM is never called. That makes refusal deterministic and auditable rather than a matter of prompt luck.',
    overviewTr:
      'Türkçe tıbbi metinler için, tek bir ilkeyle kurulmuş bir RAG sistemi: yanlış özgüvenin tehlikeli olduğu bir alanda uydurmaktansa reddetmek daha iyidir. Dil modelinin önünde sert bir benzerlik eşiği durur — getirilen en iyi parça soruya yeterince benzemiyorsa, sorgu sabit bir Türkçe mesajla reddedilir ve LLM hiç çağrılmaz. Bu, reddi prompt şansına bırakmak yerine belirlenimci ve denetlenebilir kılar.',
    stack: [
      { label: 'Languages', items: ['Python 3.10+'] },
      { label: 'Frameworks', items: ['ChromaDB', 'sentence-transformers', 'Streamlit'] },
      { label: 'Libraries', items: ['Hugging Face Datasets', 'tiktoken (cl100k_base)', 'NumPy', 'PyYAML'] },
      { label: 'AI Models', items: ['ytu-ce-cosmos/turkish-e5-large (1024-d)', 'Anthropic Claude — grounded answers'] },
    ],
    architecture: [
      'The pipeline is a gate, not a chain. A user question is embedded with turkish-e5-large (using the E5 instruct convention — queries wrapped in an instruction template, documents left unprefixed), then matched against a persistent ChromaDB HNSW cosine index that returns the top-5 chunks. The top-1 similarity is compared to a frozen 0.575 threshold: below it, the query is rejected with a fixed Turkish sentence and no model is called; above it, the retrieved chunks are sorted by score, capped at 6,000 characters, and passed to Claude behind a context-only prompt that forbids outside knowledge and returns source attribution separately.',
      'Everything upstream is reproducible. An eight-phase pipeline downloads and de-duplicates the umutertugrul/turkish-hospital-medical-articles dataset (24,612 → 22,162 valid), samples 300 documents with seed 42, and applies a paragraph-then-token chunker on cl100k_base that produces 2,072 verified chunks (all 1024-d, no NaN/Inf, zero lost words). The 0.575 threshold is derived from a 30-question benchmark where positives bottom out at 0.583 and negatives top out at 0.567; the midpoint of that 0.0161 gap becomes the gate. A CLI (scripts/chat.py) and a Streamlit app (scripts/app.py) expose the full evidence chain, and 107 offline tests keep the whole thing honest.',
    ],
    architectureTr: [
      'Pipeline bir zincir değil, bir kapıdır. Kullanıcı sorusu turkish-e5-large ile embedding’e çevrilir (E5 instruct kuralıyla — sorgular bir talimat şablonuna sarılır, dokümanlar öneksiz bırakılır), ardından ilk-5 parçayı döndüren kalıcı bir ChromaDB HNSW kosinüs indeksine karşı eşleştirilir. İlk-1 benzerliği dondurulmuş 0,575 eşiğiyle karşılaştırılır: altındaysa sorgu sabit bir Türkçe cümleyle reddedilir ve hiçbir model çağrılmaz; üstündeyse getirilen parçalar skora göre sıralanır, 6.000 karakterle sınırlanır ve dış bilgiyi yasaklayan, kaynak atıfını ayrıca döndüren yalnızca-bağlam prompt’unun ardında Claude’a verilir.',
      'Yukarı akıştaki her şey yeniden üretilebilir. Sekiz aşamalı bir pipeline, umutertugrul/turkish-hospital-medical-articles veri kümesini indirip tekilleştirir (24.612 → 22.162 geçerli), 42 tohumuyla 300 doküman örnekler ve cl100k_base üzerinde paragraf-sonra-token parçalayıcı uygular; sonuç 2.072 doğrulanmış parçadır (tümü 1024-d, NaN/Inf yok, sıfır kelime kaybı). 0,575 eşiği, pozitiflerin 0,583’te dibe vurduğu ve negatiflerin 0,567’de tavana çıktığı 30 soruluk bir benchmark’tan türetilir; o 0,0161’lik boşluğun ortası kapı olur. Bir CLI (scripts/chat.py) ve bir Streamlit uygulaması (scripts/app.py) tüm kanıt zincirini gösterir; 107 çevrimdışı test her şeyi dürüst tutar.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'featured',
    problem:
      'In medicine a confidently wrong answer is more dangerous than no answer. Standard RAG always returns something, even when the corpus does not cover the question, and refusal driven by a prompt depends on the model’s mood rather than a rule.',
    problemTr:
      'Tıpta kendinden emin yanlış bir cevap, cevapsızlıktan daha tehlikeli. Standart RAG, derlem soruyu kapsamasa bile her zaman bir şey döndürür; prompt’a bırakılmış ret ise kurala değil modelin o anki hâline bağlıdır.',
    flow: 'Question → turkish-e5-large embed → ChromaDB HNSW top-5 → cosine gate at 0.575 → above: Claude with context only · below: fixed Turkish refusal, the model is never called',
    flowTr: 'Soru → turkish-e5-large embed → ChromaDB HNSW top-5 → 0,575 kosinüs eşiği → üstünde: yalnızca context ile Claude · altında: sabit Türkçe ret, model hiç çağrılmaz',
    metrics: [
      { label: 'Corpus', value: '24,612 → 22,162 → 2,072 chunks', condition: 'dataset scope — de-duplicated, 300 documents sampled with seed 42, zero lost words' },
      { label: 'Retrieval', value: '20/20 at rank 1', condition: 'retrieval performance — 30-question frozen benchmark, 20 positive queries' },
      { label: 'Gate accuracy', value: 'P / R / F1 = 1.000', condition: 'classifier performance — same benchmark, 20 positive and 10 out-of-domain negative' },
      { label: 'Threshold', value: 'cosine 0.575', condition: 'calibration — midpoint of a 0.0161 gap: positives bottom at 0.583, negatives top at 0.567' },
      { label: 'Tests', value: '107 passing', condition: 'validation scope — fully offline' },
    ],
    metricsTr: [
      { label: 'Derlem', value: '24.612 → 22.162 → 2.072 chunk', condition: 'veri kümesi kapsamı — tekilleştirildi, seed 42 ile 300 doküman örneklendi, sıfır kelime kaybı' },
      { label: 'Retrieval', value: '20/20 rank-1', condition: 'retrieval performansı — 30 soruluk dondurulmuş benchmark, 20 olumlu sorgu' },
      { label: 'Gate doğruluğu', value: 'P / R / F1 = 1,000', condition: 'sınıflandırma performansı — aynı benchmark, 20 olumlu ve 10 alan dışı olumsuz' },
      { label: 'Eşik', value: 'kosinüs 0,575', condition: 'kalibrasyon — 0,0161’lik boşluğun orta noktası: olumlular 0,583’te diplerken olumsuzlar 0,567’de tavan yapıyor' },
      { label: 'Test', value: '107 geçiyor', condition: 'doğrulama kapsamı — tamamen offline' },
    ],
    useCases: [
      'Turkish medical question answering over a curated corpus',
      'Any retrieval system where a wrong answer costs more than no answer',
    ],
    useCasesTr: [
      'Seçilmiş bir derlem üzerinde Türkçe tıbbi soru-cevap',
      'Yanlış cevabın cevapsızlıktan pahalıya mal olduğu her retrieval sistemi',
    ],
    decisions: [
      { choice: 'A hard similarity gate in front of the model instead of a prompt instruction', why: 'Refusal becomes deterministic and auditable rather than a matter of prompt luck', tradeoff: 'Some answerable questions get refused when their phrasing drifts from the corpus vocabulary' },
      { choice: 'The threshold derived from the separation gap rather than chosen as a round number', why: '0.575 is the midpoint of a measured 0.0161 gap, so it is defensible rather than arbitrary', tradeoff: 'The gap was measured on the evaluation set itself, which is the project’s main limitation' },
    ],
    decisionsTr: [
      { choice: 'Prompt talimatı yerine modelin önünde sert bir benzerlik eşiği', why: 'Ret, prompt şansına değil deterministik ve denetlenebilir bir karara bağlanır', tradeoff: 'İfadesi derlem sözcük dağarcığından uzaklaşan bazı cevaplanabilir sorular reddediliyor' },
      { choice: 'Eşiğin yuvarlak bir sayı yerine ayrışma boşluğundan türetilmesi', why: '0,575, ölçülmüş 0,0161’lik boşluğun orta noktası; keyfî değil savunulabilir', tradeoff: 'Boşluk değerlendirme kümesinin kendisinde ölçüldü, projenin başlıca sınırlaması bu' },
    ],
    contribution: [
      'The gate-before-model architecture — the decision that refusal must be deterministic rather than prompted.',
      'The threshold calibration method: deriving 0.575 from the measured separation gap.',
      'The paragraph-then-token chunker on cl100k_base, verified to lose zero words across 2,072 chunks.',
      'The 30-question frozen benchmark with expected chunk ids and evidence excerpts verified at build time. The embedding model and ChromaDB are off the shelf.',
    ],
    contributionTr: [
      'Modelden-önce-eşik mimarisi — reddin prompt’a değil deterministik bir karara bağlanması.',
      'Eşik kalibrasyon yöntemi: 0,575’in ölçülmüş ayrışma boşluğundan türetilmesi.',
      'cl100k_base üzerinde paragraf-sonra-token chunker’ı; 2.072 chunk boyunca sıfır kelime kaybı doğrulandı.',
      'Beklenen chunk kimlikleri ve kanıt alıntılarıyla, derleme anında doğrulanan 30 soruluk dondurulmuş benchmark. Embedding modeli ve ChromaDB hazır.',
    ],
    limitations: [
      'The threshold is calibrated on the evaluation set itself, so the perfect gate scores reflect calibration, not generalisation. This is the most important thing to know about the project.',
      '300 documents sampled from 22,162 — the corpus is a demonstration, not medical coverage.',
    ],
    limitationsTr: [
      'Eşik, değerlendirme kümesinin kendisinde kalibre edildi; dolayısıyla kusursuz gate skorları genellemeyi değil kalibrasyonu yansıtıyor. Bu proje hakkında bilinmesi gereken en önemli şey.',
      '22.162 dokümandan 300’ü örneklendi — derlem bir gösterim, tıbbi kapsama değil.',
    ],
  },
  {
    slug: 'pose-invariant-face-id',
    category: 'Research & Benchmarks',
    cover: '/projects/pose-invariant-face-id/cover.svg',
    mark: 'MARK VI',
    codename: 'The Profiler',
    title: 'Pose-Invariant Face ID',
    subtitle: 'The uncomfortable finding: perfect accuracy can hide a margin that is quietly collapsing',
    subtitleTr: 'Rahatsız edici bulgu: kusursuz doğruluk, sessizce çöken bir marjı gizleyebiliyor',
    oneLiner: 'Does pose break face recognition? An identity-disjoint study: the decision stays perfect, but the genuine margin quietly shrinks.',
    oneLinerTr: 'Poz, yüz tanımayı bozar mı? Kimlik-ayrık bir çalışma: karar kusursuz kalır ama gerçek eşleşme marjı sessizce daralır.',
    language: 'Python',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.5)',
    tags: ['ArcFace', 'Face Recognition', 'Study'],
    github: gh('pose-invariant-face-id'),
    images: [
      { src: '/projects/pose-invariant-face-id/pipeline.svg', caption: 'The pipeline: RetinaFace detect & align → yaw pose labeling → identity-disjoint split → ArcFace embeddings → verification', captionTr: 'Pipeline: RetinaFace tespit ve hizalama → yaw poz etiketleme → kimlik-ayrık bölme → ArcFace embedding’leri → doğrulama' },
      { src: '/projects/pose-invariant-face-id/similarity-by-pose.png', caption: 'The key finding: genuine-pair similarity shrinks monotonically as views diverge — 0.867 frontal↔frontal down to 0.702 frontal↔profile', captionTr: 'Ana bulgu: gerçek çift benzerliği görüşler ayrıştıkça tekdüze azalır — cephe↔cephe 0,867’den cephe↔profil 0,702’ye' },
      { src: '/projects/pose-invariant-face-id/roc-curve.png', caption: 'ROC by pose bin — AUC ≈ 1.000 in every bin: at the decision level the model is effectively pose-invariant', captionTr: 'Poz kümesine göre ROC — her kümede AUC ≈ 1,000: karar seviyesinde model fiilen poz-değişmez' },
      { src: '/projects/pose-invariant-face-id/embedding-umap.png', caption: 'UMAP of test embeddings — 20 tight identity clusters (silhouette 0.777), while pose barely registers (−0.006)', captionTr: 'Test embedding’lerinin UMAP’i — 20 sıkı kimlik kümesi (silhouette 0,777), poz ise neredeyse hiç kaydedilmez (−0,006)' },
      { src: '/projects/pose-invariant-face-id/retrieval-crosspose.png', caption: 'Cross-pose retrieval — even profile → frontal-only gallery retrieves the right identity at rank 1', captionTr: 'Çapraz-poz retrieval — profil → yalnızca-cephe galeride bile doğru kimlik 1. sırada bulunur' },
      { src: '/projects/pose-invariant-face-id/pose-bins.png', caption: 'Pose-bin distribution — mean yaw is monotonic with the FEI capture index, validating the estimator', captionTr: 'Poz kümesi dağılımı — ortalama yaw, FEI çekim indeksiyle tekdüze; bu da tahminciyi doğrular' },
    ],
    overview:
      'A clean measurement of one question: how much does head pose (yaw) hurt face verification — "are these two photos the same person?" — when you use a modern pretrained recognition model off the shelf? The protocol is strictly identity-disjoint: the identities used to pick the decision threshold and to test are never seen during any fitting. On the controlled FEI face database (200 subjects, ~180° of rotation), pretrained ArcFace turns out to be effectively pose-invariant at the decision level — but the genuine-pair similarity margin shrinks steadily as the two views diverge, and that shrinking margin, not the saturated accuracy, is the real signal.',
    overviewTr:
      'Tek bir sorunun temiz bir ölçümü: modern, önceden eğitilmiş bir tanıma modelini hazır kullandığında, kafa pozu (yaw) yüz doğrulamayı — “bu iki fotoğraf aynı kişi mi?” — ne kadar bozar? Protokol kesinlikle kimlik-ayrıktır: karar eşiğini seçmek ve test etmek için kullanılan kimlikler hiçbir uydurma sırasında görülmez. Kontrollü FEI yüz veritabanında (200 kişi, ~180° dönüş), önceden eğitilmiş ArcFace karar seviyesinde fiilen poz-değişmez çıkar — ancak gerçek çift benzerlik marjı, iki görüş ayrıştıkça istikrarlı biçimde daralır ve asıl sinyal, doymuş doğruluk değil, bu daralan marjdır.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Frameworks', items: ['InsightFace', 'Gradio (demo)'] },
      { label: 'Libraries', items: ['NumPy', 'scikit-learn', 'UMAP', 'Matplotlib'] },
      { label: 'AI Models', items: ['RetinaFace (buffalo_l) · ArcFace w600k_r50 (512-d) — pretrained, off-the-shelf'] },
    ],
    architecture: [
      'The pipeline is measurement, not training. Every FEI image is detected and aligned with RetinaFace, labeled with a per-image yaw and binned (frontal <20°, half-profile 20–60°, profile >60°), then embedded with pretrained ArcFace (512-d, L2-normalized). Positives are all within-subject pairs; negatives are cross-subject pairs sampled to balance the six pose-bin combinations, matched 1:1 to positives. Decision thresholds are chosen on the validation identities only, frozen, and applied to the disjoint test identities; AUC and EER are threshold-free.',
      'app.py is a Gradio demo: upload two photos and it reports same/different from the cosine similarity against the frozen 0.44 threshold, with the score and its margin (e.g. a frontal and a profile of one person score 0.719 → SAME; two different people score 0.098 → DIFFERENT). The sparse profile–profile bin (21 positives) gets a 1000-resample bootstrap CI, and the whole thing is documented with its own ceiling-effect and dataset-realism limitations.',
    ],
    architectureTr: [
      'Pipeline, eğitim değil ölçümdür. Her FEI görseli RetinaFace ile tespit edilip hizalanır, görsel başına bir yaw ile etiketlenip kümelenir (cephe <20°, yarım-profil 20–60°, profil >60°), ardından önceden eğitilmiş ArcFace ile embedding’e çevrilir (512-d, L2-normalleştirilmiş). Pozitifler tüm kişi-içi çiftlerdir; negatifler, altı poz-kümesi kombinasyonunu dengelemek için örneklenen kişi-arası çiftlerdir, pozitiflerle 1:1 eşleştirilir. Karar eşikleri yalnızca doğrulama kimliklerinde seçilir, dondurulur ve ayrık test kimliklerine uygulanır; AUC ve EER eşikten bağımsızdır.',
      'app.py bir Gradio demosudur: iki fotoğraf yükle, dondurulmuş 0,44 eşiğine karşı kosinüs benzerliğinden aynı/farklı bildirir, skoru ve marjıyla birlikte (ör. bir kişinin cephe ve profili 0,719 → AYNI; iki farklı kişi 0,098 → FARKLI). Seyrek profil–profil kümesi (21 pozitif) 1000-yeniden-örnekli bootstrap GA alır ve tüm çalışma kendi tavan-etkisi ve veri-kümesi-gerçekçiliği kısıtlarıyla belgelenir.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'research',
    tier: 'featured',
    problem:
      'Everyone asks how much head pose breaks face verification, but the answer is usually produced with identity leakage between the set used to pick the threshold and the set used to test — which makes the number meaningless.',
    problemTr:
      'Kafa pozunun yüz doğrulamayı ne kadar bozduğu sık sorulur, ama cevap genelde eşiğin seçildiği kümeyle test kümesi arasında kimlik sızıntısıyla üretilir — bu da sayıyı anlamsız kılar.',
    flow: 'FEI images → RetinaFace detect + 5-point align → per-image yaw estimate and binning → pretrained ArcFace embedding → threshold frozen on validation identities → disjoint test identities',
    flowTr: 'FEI görselleri → RetinaFace tespit + 5 nokta hizalama → görsel başına yaw kestirimi ve kutulama → önceden eğitilmiş ArcFace embedding → validation kimliklerinde dondurulmuş eşik → ayrık test kimlikleri',
    metrics: [
      { label: 'Protocol', value: '200 subjects, 160/20/20', condition: 'study scope — split by identity with seed 42, no subject overlap, no pair crossing a boundary' },
      { label: 'Verification', value: 'AUC 1.000 · EER 0.000', condition: 'model performance — every pose bin, threshold frozen on validation only' },
      { label: 'The real finding', value: '0.867 → 0.702', condition: 'model performance — genuine-pair cosine, frontal↔frontal vs frontal↔profile, a ~19% relative drop while impostor scores stay flat' },
      { label: 'Embedding geometry', value: 'identity 0.777 vs pose −0.006', condition: 'analysis result — silhouette scores' },
      { label: 'Cross-pose retrieval', value: '1.000 at rank 1', condition: 'model performance — profile probe against a frontal gallery' },
      { label: 'Alignment', value: '2,782 of 2,800', condition: 'processing scope — the 18 failures are dark frontal frames, not a pose failure' },
    ],
    metricsTr: [
      { label: 'Protokol', value: '200 denek, 160/20/20', condition: 'çalışma kapsamı — seed 42 ile kimliğe göre bölündü, denek örtüşmesi yok, sınırı geçen çift yok' },
      { label: 'Doğrulama', value: 'AUC 1,000 · EER 0,000', condition: 'model performansı — her poz kutusunda, eşik yalnızca validation’da donduruldu' },
      { label: 'Asıl bulgu', value: '0,867 → 0,702', condition: 'model performansı — genuine çift kosinüsü, ön↔ön ve ön↔profil; impostor skorları sabitken ~%19 göreli düşüş' },
      { label: 'Embedding geometrisi', value: 'kimlik 0,777 — poz −0,006', condition: 'analiz sonucu — silhouette skorları' },
      { label: 'Pozlar arası retrieval', value: 'rank-1’de 1,000', condition: 'model performansı — profil sorgusu, ön yüz galerisine karşı' },
      { label: 'Hizalama', value: '2.800’ün 2.782’si', condition: 'işleme kapsamı — 18 başarısızlık karanlık ön kareler, poz kaynaklı değil' },
    ],
    useCases: [
      'Honest robustness testing of a biometric system',
      'Showing where a saturated accuracy hides a shrinking margin',
    ],
    useCasesTr: [
      'Bir biyometrik sistemin dürüst dayanıklılık testi',
      'Doymuş bir doğruluğun daralan marjı nerede gizlediğini göstermek',
    ],
    decisions: [
      { choice: 'Report the margin once accuracy saturated, instead of reporting accuracy', why: 'AUC 1.000 in every bin says the task is too easy for this dataset, not that pose is harmless — the genuine-pair margin is where the effect actually lives', tradeoff: 'The headline result becomes harder to explain than a single accuracy number' },
    ],
    decisionsTr: [
      { choice: 'Doğruluk doyunca doğruluğu değil marjı raporlamak', why: 'Her kutuda AUC 1,000, pozun zararsız olduğunu değil görevin bu veri kümesi için fazla kolay olduğunu söyler — etki asıl genuine çift marjında yaşıyor', tradeoff: 'Ana sonucu anlatmak tek bir doğruluk sayısından daha zor hale geliyor' },
    ],
    contribution: [
      'The identity-disjoint protocol — the entire point of the study, and the part such measurements most often get wrong.',
      'Per-image yaw estimation and binning, validated against the FEI capture index.',
      'A 1000-resample bootstrap CI for the sparse profile–profile bin, and the ceiling-effect write-up. No model was trained: RetinaFace and ArcFace are used entirely off the shelf, and that is the design.',
    ],
    contributionTr: [
      'Kimlik-ayrık protokol — çalışmanın bütün amacı ve bu tür ölçümlerin en sık yanlış yaptığı kısım.',
      'Görsel başına yaw kestirimi ve kutulama; FEI çekim indeksine karşı doğrulandı.',
      'Seyrek profil–profil kutusu için 1000 yeniden örneklemeli bootstrap güven aralığı ve tavan etkisi yazımı. Hiçbir model eğitilmedi: RetinaFace ve ArcFace tamamen hazır kullanıldı, tasarım da bu.',
    ],
    limitations: [
      'A ceiling effect: accuracy is 1.000 everywhere, so the decision-level result says the task is too easy for this dataset rather than that pose is harmless.',
      'FEI is a controlled studio database with uniform lighting and cooperative subjects. Nothing here transfers to surveillance conditions.',
      'The profile–profile bin holds only 21 positive pairs.',
    ],
    limitationsTr: [
      'Tavan etkisi: doğruluk her yerde 1,000, dolayısıyla karar seviyesindeki sonuç pozun zararsız olduğunu değil görevin bu veri kümesi için fazla kolay olduğunu söylüyor.',
      'FEI, tek tip ışık ve iş birliği yapan deneklerle kontrollü bir stüdyo veri kümesi. Buradaki hiçbir şey gözetleme koşullarına taşınmaz.',
      'Profil–profil kutusunda yalnızca 21 olumlu çift var.',
    ],
  },
  {
    slug: 'pose-robust-face-login',
    category: 'Computer Vision',
    cover: '/projects/pose-robust-face-login/cover.svg',
    mark: 'MARK VII',
    codename: 'The Warden',
    title: 'Pose-Robust Face Login',
    subtitle: 'Log in with your face from any angle, on an ordinary webcam, without a single photo being stored',
    subtitleTr: 'Yüzünle her açıdan giriş yap; sıradan bir webcam yeter ve tek bir fotoğraf bile saklanmaz',
    oneLiner: 'Enroll across −90° to +90° of yaw, then log in from any angle — ArcFace embeddings only, never a stored photo.',
    oneLinerTr: '−90° ile +90° yaw arasında kaydol, sonra her açıdan giriş yap — yalnızca ArcFace embedding’leri, hiç saklanan fotoğraf yok.',
    language: 'Python',
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.5)',
    tags: ['ArcFace', 'Face Login', 'SQLite'],
    github: gh('pose-robust-face-login'),
    images: [
      { src: '/projects/pose-robust-face-login/pipeline.svg', caption: 'Enroll and login as one clean-architecture pipeline — perception and persistence sit beneath the service layer', captionTr: 'Kaydol ve giriş yap, tek bir temiz-mimari pipeline olarak — algılama ve kalıcılık, servis katmanının altında durur' },
      { src: '/projects/pose-robust-face-login/login-demo.svg', caption: 'A profile probe matched against a multi-pose gallery — verification survives the pose change (0.71 ≥ 0.44 → granted)', captionTr: 'Bir profil örneği, çok-pozlu galeriye karşı eşleşir — doğrulama poz değişimine dayanır (0,71 ≥ 0,44 → izin verildi)' },
      { src: '/projects/pose-robust-face-login/coverage.svg', caption: 'Pose-bin coverage tracking guides enrollment through every yaw bin — full coverage in under 30 s', captionTr: 'Poz-kümesi kapsama takibi, kaydı her yaw kümesinden geçirir — 30 sn’nin altında tam kapsama' },
      { src: '/projects/pose-robust-face-login/perf.svg', caption: 'Runtime profile — sub-100 ms recognition per frame on CPU or CUDA, 512-d embeddings, cosine threshold 0.44', captionTr: 'Çalışma profili — CPU ya da CUDA’da kare başına 100 ms altı tanıma, 512-d embedding’ler, 0,44 kosinüs eşiği' },
    ],
    overview:
      'A real-time face-login application that handles the hard case: verifying a person even when the login angle is nothing like enrollment. Users enroll by turning their head across the full pose range (−90° to +90° yaw), and the system captures a small gallery of ArcFace embeddings indexed by pose. Login is a single webcam frame matched by cosine similarity — no passwords, and, deliberately, no images are ever stored, only normalized embeddings and metadata. It is the applied, product-facing counterpart to my pose-invariant face-ID study.',
    overviewTr:
      'Zor durumu ele alan gerçek zamanlı bir yüz-giriş uygulaması: giriş açısı kayıttakine hiç benzemese bile kişiyi doğrulamak. Kullanıcılar kafalarını tüm poz aralığında (−90° ile +90° yaw) çevirerek kaydolur ve sistem, poza göre indekslenmiş küçük bir ArcFace embedding galerisi yakalar. Giriş, kosinüs benzerliğiyle eşleştirilen tek bir webcam karesidir — parola yok ve bilinçli olarak hiç görsel saklanmaz, yalnızca normalleştirilmiş embedding’ler ve meta veri. Bu, poz-değişmez yüz-kimliği çalışmamın uygulamalı, ürüne dönük karşılığıdır.',
    stack: [
      { label: 'Languages', items: ['Python 3.12+'] },
      { label: 'Frameworks', items: ['InsightFace', 'ONNX Runtime (CPU / CUDA)'] },
      { label: 'Libraries', items: ['OpenCV 4.x', 'NumPy', 'PyYAML', 'Pillow'] },
      { label: 'Storage', items: ['SQLite (WAL journaling)'] },
      { label: 'AI Models', items: ['RetinaFace + ArcFace (buffalo_l pack) — 512-d embeddings'] },
    ],
    architecture: [
      'The codebase follows clean architecture with four layers. Perception (cv/) owns camera capture, RetinaFace detection, 5-point similarity alignment, solvePnP head-pose estimation, quality filtering, and ArcFace embedding. A service layer sits on top for coverage tracking, cosine matching, and the registration and login workflows. Persistence is a repository-pattern SQLite store with four tables — users, pose-specific embeddings as float32 BLOBs, auth sessions, and metadata — wired with foreign keys and cascade deletion. The UI (overlay rendering, coverage visualization, window management) is deliberately decoupled from the pipeline.',
      'Enrollment is a coverage problem: the app tracks which yaw bins are occupied and guides the head until the gallery spans the pose range, typically in under 30 seconds. Login embeds a single frame and scores it against the stored embeddings by cosine similarity, accepting above the configurable 0.44 threshold — the same threshold the identity-disjoint pose study landed on. Because faces are enrolled from many angles, a profile probe still matches a gallery built mostly from other views, which is exactly where naive single-shot enrollment fails.',
    ],
    architectureTr: [
      'Kod tabanı, dört katmanlı temiz mimariyi izler. Algılama (cv/); kamera yakalama, RetinaFace tespiti, 5 nokta benzerlik hizalaması, solvePnP kafa-poz tahmini, kalite filtreleme ve ArcFace embedding’ini üstlenir. Üstünde; kapsama takibi, kosinüs eşleştirme ve kayıt/giriş iş akışları için bir servis katmanı bulunur. Kalıcılık, dört tablolu, depo-desenli bir SQLite deposudur — kullanıcılar, float32 BLOB olarak poza özel embedding’ler, oturumlar ve meta veri — yabancı anahtarlar ve art arda silmeyle bağlanmıştır. Arayüz (bindirme çizimi, kapsama görselleştirme, pencere yönetimi) hattan bilinçle ayrıktır.',
      'Kayıt bir kapsama problemidir: uygulama hangi yaw kümelerinin dolu olduğunu izler ve galeri poz aralığını kaplayana dek kafayı yönlendirir; bu genelde 30 saniyenin altında olur. Giriş, tek bir kareyi gömer ve saklanan embedding’lere karşı kosinüs benzerliğiyle puanlar, yapılandırılabilir 0,44 eşiğinin üstünde kabul eder — kimlik-ayrık poz çalışmasının vardığı eşiğin aynısı. Yüzler birçok açıdan kaydedildiği için, bir profil örneği çoğunlukla başka görüşlerden kurulmuş bir galeriyle yine de eşleşir; ki bu tam da naif tek-kare kaydın başarısız olduğu yerdir.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Face login enrolled from a single frontal frame fails the moment someone logs in at an angle, and the obvious fix — storing a reference photo — creates a biometric liability.',
    problemTr:
      'Tek bir ön kareyle kaydolan yüz girişi, kişi açılı giriş yaptığı anda çöker; bariz çözüm olan referans fotoğrafı saklamak ise biyometrik bir yükümlülük yaratır.',
    flow: 'Camera → RetinaFace → 5-point align → solvePnP yaw → quality filter → ArcFace 512-d embedding → SQLite BLOB gallery indexed by pose bin → cosine match at 0.44',
    flowTr: 'Kamera → RetinaFace → 5 nokta hizalama → solvePnP yaw → kalite filtresi → ArcFace 512-d embedding → poz kutusuna göre indekslenmiş SQLite BLOB galerisi → 0,44 kosinüs eşleşmesi',
    metrics: [
      { label: 'Recognition latency', value: '< 100 ms per frame', condition: 'runtime — CPU or CUDA via ONNX Runtime' },
      { label: 'Enrollment range', value: '−90° to +90° yaw', condition: 'system scope — guided scan until every pose bin is filled' },
      { label: 'Registration time', value: '< 30 s', condition: 'runtime — for full pose coverage' },
      { label: 'Stored per user', value: '512-d embeddings only', condition: 'privacy design — L2-normalised, no image ever written to disk' },
      { label: 'Decision threshold', value: 'cosine 0.44', condition: 'calibration — carried over from the identity-disjoint study, configurable' },
    ],
    metricsTr: [
      { label: 'Tanıma gecikmesi', value: 'kare başına < 100 ms', condition: 'çalışma zamanı — ONNX Runtime üzerinden CPU ya da CUDA' },
      { label: 'Kayıt aralığı', value: '−90° ile +90° yaw', condition: 'sistem kapsamı — her poz kutusu dolana kadar rehberli tarama' },
      { label: 'Kayıt süresi', value: '< 30 sn', condition: 'çalışma zamanı — tam poz kapsaması için' },
      { label: 'Kullanıcı başına saklanan', value: 'yalnızca 512-d embedding', condition: 'gizlilik tasarımı — L2-normalize, diske hiç görsel yazılmaz' },
      { label: 'Karar eşiği', value: 'kosinüs 0,44', condition: 'kalibrasyon — kimlik-ayrık çalışmadan devralındı, yapılandırılabilir' },
    ],
    useCases: [
      'Access control and device unlock',
      'Biometric deployment where storing reference images is the liability',
    ],
    useCasesTr: [
      'Erişim kontrolü ve cihaz kilidi',
      'Referans görsel saklamanın yükümlülük olduğu biyometrik dağıtım',
    ],
    decisions: [
      { choice: 'Treat enrollment as a coverage problem instead of a single capture', why: 'A profile probe still matches a gallery built from many angles, which is exactly where single-shot enrollment fails', tradeoff: 'Enrollment takes a guided scan rather than one photo' },
    ],
    decisionsTr: [
      { choice: 'Kaydı tek bir çekim yerine bir kapsama problemi olarak ele almak', why: 'Profil sorgusu, çok açılı kurulmuş bir galeriyle hâlâ eşleşir — tek karelik kaydın çöktüğü yer tam burası', tradeoff: 'Kayıt, tek fotoğraf yerine rehberli bir tarama gerektirir' },
    ],
    contribution: [
      'Framing enrollment as pose-bin coverage, and the privacy decision to store embeddings and metadata but never an image.',
      'The four-layer architecture with the UI decoupled from the perception pipeline, over a repository-pattern SQLite store with cascade deletion. The threshold comes from the companion pose study rather than a default; InsightFace, ONNX Runtime and the buffalo_l pack are off the shelf.',
    ],
    contributionTr: [
      'Kaydın poz kutusu kapsaması olarak kurgulanması ve embedding ile meta veriyi saklayıp görseli asla saklamama kararı.',
      'Arayüzün algı pipeline’ından ayrıldığı dört katmanlı mimari; altında cascade silmeli, repository desenli SQLite deposu. Eşik varsayılan değil, eşlik eden poz çalışmasından geliyor; InsightFace, ONNX Runtime ve buffalo_l paketi hazır.',
    ],
    limitations: [
      'Latency and registration time are measured in normal use, not against a standardised benchmark.',
      'No false-accept rate is reported for this application — the 0.44 threshold was validated on a different and much cleaner dataset.',
    ],
    limitationsTr: [
      'Gecikme ve kayıt süresi standart bir benchmark’a karşı değil, normal kullanımda ölçüldü.',
      'Bu uygulama için yanlış kabul oranı raporlanmıyor — 0,44 eşiği farklı ve çok daha temiz bir veri kümesinde doğrulandı.',
    ],
  },
  {
    slug: 'turkish-english-nmt',
    category: 'LLM & NLP',
    cover: '/projects/turkish-english-nmt/cover.svg',
    mark: 'MARK VIII',
    codename: 'Polyglot',
    title: 'Turkish–English NMT',
    subtitle: 'Turkish to English translation that beats the stock model, trained end to end on hardware anyone can get for free',
    subtitleTr: 'Hazır modeli geçen Türkçe–İngilizce çeviri; baştan sona herkesin ücretsiz bulabileceği donanımda eğitildi',
    oneLiner: 'Fine-tuned MarianMT on 523K Turkish–English sentence pairs, start to finish on one free Colab GPU.',
    oneLinerTr: '523 bin Türkçe–İngilizce cümle çiftiyle MarianMT fine-tune’u; baştan sona tek bir ücretsiz Colab GPU’sunda.',
    language: 'Python',
    color: '#4d96ff',
    glow: 'rgba(77,150,255,0.5)',
    tags: ['MarianMT', 'Translation', 'Fine-Tuning'],
    github: gh('turkish-english-nmt'),
    // Field Notes — migrated verbatim from caseStudies.js (12 Sep 2026).
    challenges: [
      'Fitting a real training run into a free GPU’s memory and time budget meant fp16, gradient accumulation for an effective batch of 128, and early stopping.',
      'Turkish morphology makes tokenization choices matter more than usual, which is why the pipeline studies them explicitly.',
    ],
    challengesTr: [
      'Gerçek bir eğitimi ücretsiz bir GPU’nun bellek ve zaman bütçesine sığdırmak; fp16, 128’lik efektif batch için gradyan biriktirme ve erken durdurma demekti.',
      'Türkçe biçimbilimi, tokenizasyon seçimlerini normalden daha önemli kılar; hattın bunları açıkça incelemesinin nedeni budur.',
    ],
    lessons: [
      'A strong pretrained checkpoint plus careful fine-tuning beats training from scratch, especially with limited data and compute.',
      'For morphologically rich languages, how you tokenize is a first-class design decision, not an afterthought.',
    ],
    lessonsTr: [
      'Güçlü bir önceden eğitilmiş kontrol noktası artı özenli fine-tune, özellikle sınırlı veri ve işlem gücüyle, sıfırdan eğitmeyi yener.',
      'Biçimbilimsel açıdan zengin diller için tokenizasyon, sonradan düşünülecek bir ayrıntı değil, birinci sınıf bir tasarım kararıdır.',
    ],
    images: [
      { src: '/projects/turkish-english-nmt/training-curves.png', caption: 'Training loss and BLEU curves across 3 epochs', captionTr: '3 epoch boyunca eğitim kaybı ve BLEU eğrileri' },
      { src: '/projects/turkish-english-nmt/bleu.png', caption: 'Baseline vs fine-tuned BLEU comparison', captionTr: 'Taban model ile fine-tune’lu modelin BLEU karşılaştırması' },
    ],
    overview:
      'A neural machine translation project that fine-tunes Helsinki-NLP’s opus-mt-tr-en (MarianMT) on the ManyThings/Tatoeba Turkish–English parallel corpus. The repository covers the full workflow — data cleaning, tokenizer comparison, training, BLEU evaluation, and report generation — runnable both locally and end-to-end on a free Colab T4 GPU.',
    overviewTr:
      'Helsinki-NLP’nin opus-mt-tr-en (MarianMT) modelini ManyThings/Tatoeba Türkçe–İngilizce paralel derlemi üzerinde fine-tune eden bir nöral makine çevirisi projesi. Depo; veri temizleme, tokenizer karşılaştırması, eğitim, BLEU değerlendirmesi ve rapor üretimi dahil iş akışının tamamını kapsar ve hem yerelde hem de ücretsiz bir Colab T4 GPU’sunda uçtan uca çalıştırılabilir.',
    stack: [
      { label: 'Languages', items: ['Python 3.13'] },
      { label: 'Frameworks', items: ['PyTorch', 'Hugging Face Transformers'] },
      { label: 'Libraries', items: ['SentencePiece', 'SacreBLEU', 'sacremoses', 'accelerate'] },
      { label: 'Tools', items: ['Google Colab (T4 GPU)'] },
      { label: 'AI Models', items: ['Helsinki-NLP/opus-mt-tr-en — MarianMT, 76.6M parameters'] },
    ],
    architecture: [
      'The pipeline is split into numbered scripts. 01_data_cleaning.py normalizes the raw Tatoeba dump and produces an 80/10/10 train/validation/test split; 02_tokenization.py compares character, word, byte, and BPE tokenization on the corpus; 04_training.py fine-tunes MarianMT with the Hugging Face Trainer; 05_evaluation_and_inference.py computes BLEU with SacreBLEU and provides interactive translation using 4-beam search; 06_report_generator.py renders the training-curve and comparison charts.',
      'The model is a Transformer encoder-decoder (MarianMT) with a shared SentencePiece BPE vocabulary of 62,389 tokens, trained at max sequence length 128 in fp16. colab.py packages the same flow as one script for Colab, reading data from Drive and saving the fine-tuned checkpoint back to it.',
    ],
    architectureTr: [
      'Pipeline numaralı betiklere bölünmüştür. 01_data_cleaning.py ham Tatoeba dökümünü normalleştirir ve %80/%10/%10 eğitim/doğrulama/test bölmesi üretir; 02_tokenization.py derlem üzerinde karakter, kelime, bayt ve BPE tokenizasyonunu karşılaştırır; 04_training.py MarianMT’yi Hugging Face Trainer ile fine-tune’lar; 05_evaluation_and_inference.py SacreBLEU ile BLEU hesaplar ve 4 ışınlı arama kullanan etkileşimli çeviri sunar; 06_report_generator.py eğitim eğrisi ve karşılaştırma grafiklerini üretir.',
      'Model, 62.389 tokenlık ortak bir SentencePiece BPE sözlüğüne sahip Transformer encoder-decoder’dır (MarianMT); en fazla 128 dizi uzunluğunda, fp16 ile eğitilmiştir. colab.py aynı akışı Colab için tek betikte paketler; veriyi Drive’dan okur ve fine-tune’lu modeli yine oraya kaydeder.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Stock Turkish–English translation models leave obvious quality on the table, and fine-tuning one is widely assumed to need paid hardware.',
    problemTr:
      'Hazır Türkçe–İngilizce çeviri modelleri gözle görülür bir kaliteyi masada bırakıyor ve bunları fine-tune etmenin ücretli donanım gerektirdiği yaygın biçimde varsayılıyor.',
    flow: 'Tatoeba dump → clean and split 80/10/10 → tokenisation study → MarianMT fine-tune, fp16, effective batch 128 → SacreBLEU → charts',
    flowTr: 'Tatoeba dökümü → temizleme ve 80/10/10 bölme → tokenizasyon çalışması → MarianMT fine-tune, fp16, efektif batch 128 → SacreBLEU → grafikler',
    metrics: [
      { label: 'BLEU', value: '~36 → ~43', condition: 'model performance — baseline vs fine-tuned, held-out test split' },
      { label: 'Dataset', value: '522,975 pairs', condition: 'dataset scope — 418,380 used for training' },
      { label: 'Model', value: '76.6M parameters', condition: 'system scope — Helsinki-NLP/opus-mt-tr-en, shared SentencePiece vocab of 62,389' },
      { label: 'Training time', value: '~60–90 min', condition: 'runtime — single free Colab T4' },
    ],
    metricsTr: [
      { label: 'BLEU', value: '~36 → ~43', condition: 'model performansı — baseline ve fine-tune’lu, ayrılmış test bölümü' },
      { label: 'Veri kümesi', value: '522.975 çift', condition: 'veri kümesi kapsamı — eğitimde 418.380 kullanıldı' },
      { label: 'Model', value: '76,6M parametre', condition: 'sistem kapsamı — Helsinki-NLP/opus-mt-tr-en, 62.389 token’lık ortak SentencePiece sözlüğü' },
      { label: 'Eğitim süresi', value: '~60–90 dk', condition: 'çalışma zamanı — tek ücretsiz Colab T4' },
    ],
    useCases: [
      'Model fine-tuning under a zero-hardware budget',
    ],
    useCasesTr: [
      'Sıfır donanım bütçesiyle model fine-tune etmek',
    ],
    contribution: [
      'Splitting the workflow into numbered, re-runnable scripts, plus a single-file Colab version that reproduces the whole experiment.',
      'The tokenisation comparison across character, word, byte and BPE, and evaluating with SacreBLEU rather than a hand-rolled BLEU. The base model and the Trainer are off the shelf.',
    ],
    contributionTr: [
      'İş akışının numaralı, yeniden koşulabilir betiklere bölünmesi ve deneyin tamamını yeniden üreten tek dosyalık Colab sürümü.',
      'Karakter, kelime, byte ve BPE arasında tokenizasyon karşılaştırması ve elle yazılmış BLEU yerine SacreBLEU ile değerlendirme. Base model ve Trainer hazır.',
    ],
    limitations: [
      'Tatoeba sentences are short and clean. A +7 BLEU gain on that distribution says little about domain prose or long-form text.',
    ],
    limitationsTr: [
      'Tatoeba cümleleri kısa ve temiz. Bu dağılımda +7 BLEU kazancı, alan metni ya da uzun metin hakkında pek bir şey söylemiyor.',
    ],
  },
  {
    slug: 'miniature-transformers-from-scratch',
    unverified: [
      'results.Built — \'Aug 14 → Oct 3, 2025\' predates the first commit (2025-11-20). Plausible if built locally and pushed later, but the repository cannot confirm it. Left unchanged pending your own work records.',
    ],

    cover: '/projects/miniature-transformers-from-scratch/cover.svg',
    category: 'LLM & NLP',
    mark: 'MARK IX',
    codename: 'First Principles',
    title: 'Miniature Transformers',
    subtitle: 'The fastest way to stop treating a transformer as a black box: build every layer yourself',
    subtitleTr: 'Bir transformer’ı kara kutu olmaktan çıkarmanın en hızlı yolu: her katmanı kendin yaz',
    oneLiner: 'Wrote the tokenizer, the attention, and the decoder blocks by hand to find out what a GPT actually is underneath.',
    oneLinerTr: 'Bir GPT’nin altında gerçekte ne olduğunu görmek için tokenizer’ı, attention’ı ve decoder bloklarını elle yazdım.',
    language: 'Python',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.5)',
    tags: ['PyTorch', 'Transformer', 'From Scratch'],
    github: gh('miniature-transformers-from-scratch'),
    // Field Notes — migrated verbatim from caseStudies.js (12 Sep 2026).
    challenges: [
      'Getting causal masking and the attention shapes exactly right is unforgiving — an off-by-one in the mask silently lets the model peek at the future and quietly breaks training.',
      'Keeping the prototype small enough to train on a free GPU while still learning anything meaningful meant deliberately limiting context and vocabulary.',
    ],
    challengesTr: [
      'Nedensel maskelemeyi ve dikkat boyutlarını tam doğru yapmak affetmez — maskede bir kayma, modelin sessizce geleceğe bakmasına izin verip eğitimi usulca bozar.',
      'Prototipi ücretsiz bir GPU’da eğitilecek kadar küçük tutarken anlamlı bir şey öğrenmesini sağlamak, bağlamı ve sözlüğü bilinçli olarak sınırlamayı gerektirdi.',
    ],
    lessons: [
      'Building a transformer by hand turns the paper diagrams into something you actually understand — attention stops being magic.',
      'The hardest bugs live in shapes and masks, not in the math itself.',
    ],
    lessonsTr: [
      'Bir transformer’ı elle inşa etmek, kâğıttaki şemaları gerçekten anladığın bir şeye dönüştürüyor — dikkat artık sihir olmaktan çıkıyor.',
      'En zor hatalar matematikte değil, boyutlarda ve maskelerde yaşıyor.',
    ],
    images: [
      { src: '/projects/miniature-transformers-from-scratch/formula-1.png', caption: 'The attention math the model implements by hand', captionTr: 'Modelin elle uyguladığı dikkat matematiği' },
      { src: '/projects/miniature-transformers-from-scratch/formula-2.jpg', caption: 'Multi-head attention, worked out on paper first', captionTr: 'Önce kâğıtta çözülen çok başlı dikkat' },
      { src: '/projects/miniature-transformers-from-scratch/formula-3.png', caption: 'Decoder-block and normalization derivations', captionTr: 'Kod çözücü bloğu ve normalleştirme türetmeleri' },
    ],
    overview:
      'A learning-first language model: a decoder-only, GPT-style transformer implemented from scratch in PyTorch, with every core component written by hand instead of imported. The goal was to truly understand transformers by building each piece — tokenizer, embeddings, self- and multi-head attention with causal masking, layer norm, MLP, and decoder blocks — then assembling them into a small working model (V1: a 64-token prototype trained on Colab).',
    overviewTr:
      'Öğrenme öncelikli bir dil modeli: PyTorch’ta sıfırdan uygulanmış, decoder-only GPT tarzı bir transformer; her temel bileşen içe aktarılmak yerine elle yazıldı. Amaç; tokenizer, embedding (embedding), nedensel maskelemeli öz ve çok başlı dikkat, katman normu, MLP ve decoder bloklarının her birini inşa ederek transformer’ları gerçekten anlamak ve ardından bunları küçük, çalışan bir modelde birleştirmekti (V1: Colab’da eğitilmiş 64 tokenlık bir prototip).',
    stack: [
      { label: 'Languages', items: ['Python'] },
      { label: 'Frameworks', items: ['PyTorch'] },
      { label: 'Libraries', items: ['Hugging Face tokenizers', 'NumPy'] },
      { label: 'Tools', items: ['Google Colab', 'Jupyter'] },
    ],
    architecture: [
      'The model is decoder-only. usta_embedding maps token ids to vectors; usta_self_attention and usta_multi_head_attention implement scaled dot-product attention with causal masking; usta_layer_norm and usta_mlp form the feed-forward path; usta_decoder_block stacks attention and MLP with residual connections; and usta_model assembles the decoder blocks and projects to vocabulary logits. usta_tokenizer handles encoding and decoding.',
      'The build is split into numbered notebooks (module0 through module_3) that grow the model incrementally — from tokenization and embeddings to attention and a trainable decoder — with a PyTorch training loop and a small text corpus. V1 is a 64-token-context prototype meant for understanding, not scale.',
    ],
    architectureTr: [
      'Model decoder-only’dur. usta_embedding token kimliklerini vektörlere eşler; usta_self_attention ve usta_multi_head_attention nedensel maskelemeli ölçekli nokta-çarpım dikkatini uygular; usta_layer_norm ve usta_mlp ileri besleme yolunu oluşturur; usta_decoder_block dikkat ve MLP’yi artık bağlantılarla üst üste yığar; usta_model ise decoder bloklarını birleştirip sözlük logit’lerine yansıtır. usta_tokenizer kodlama ve kod çözmeyi üstlenir.',
      'Yapı, modeli tokenizasyon ve embedding’lerden dikkate ve eğitilebilir bir decoder’a doğru aşamalı büyüten numaralı not defterlerine (module0’dan module_3’e) bölünmüştür; bir PyTorch eğitim döngüsü ve küçük bir metin derlemi eşlik eder. V1, ölçek için değil anlamak için tasarlanmış 64 token bağlamlı bir prototiptir.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2025–2026',
    status: 'archived',
    tier: 'experimental',
    problem:
      'Calling a transformer from a library is not the same as understanding it. The only way to find out what a GPT is underneath is to write every layer yourself.',
    problemTr:
      'Bir transformer’ı kütüphaneden çağırmak onu anlamakla aynı şey değil. Bir GPT’nin altında ne olduğunu öğrenmenin tek yolu her katmanı kendin yazmak.',
    flow: 'Custom tokenizer → embeddings → self-attention → multi-head attention with causal masking → layer norm and MLP → decoder blocks → vocabulary logits',
    flowTr: 'Kendi tokenizer’ı → embedding’ler → self-attention → causal masking’li multi-head attention → layer norm ve MLP → decoder blokları → sözlük logit’leri',
    metrics: null,
    metricsTr: null,
    useCases: [],
    useCasesTr: [],
    decisions: [
      { choice: 'Build it as numbered notebooks that grow the model incrementally', why: 'Each module runs on its own, so a reader can see exactly where each piece enters', tradeoff: 'Not a reusable codebase — it is a teaching artifact and stops at a 64-token context' },
    ],
    decisionsTr: [
      { choice: 'Modeli adım adım büyüten numaralı notebook’lar olarak kurmak', why: 'Her modül kendi başına çalışıyor, böylece okuyucu her parçanın tam olarak nerede devreye girdiğini görebiliyor', tradeoff: 'Yeniden kullanılabilir bir kod tabanı değil — bir öğretim çıktısı ve 64 token bağlamda duruyor' },
    ],
    contribution: [
      'Every core component hand-written: embeddings, self- and multi-head attention, causal masking, layer norm, MLP, decoder block and tokenizer. Nothing above PyTorch primitives is imported.',
    ],
    contributionTr: [
      'Her çekirdek bileşen elle yazıldı: embedding’ler, self- ve multi-head attention, causal masking, layer norm, MLP, decoder bloğu ve tokenizer. PyTorch primitiflerinin üstünde hiçbir şey içe aktarılmadı.',
    ],
    limitations: [
      'A 64-token context prototype. It demonstrates the mechanism and has no capability worth measuring.',
    ],
    limitationsTr: [
      '64 token bağlamlı bir prototip. Mekanizmayı gösteriyor ve ölçmeye değer bir yeteneği yok.',
    ],
  },
  {
    slug: 'face-detection-pipeline',
    category: 'Computer Vision',
    cover: '/projects/face-detection-pipeline/cover.svg',
    mark: 'MARK X',
    codename: 'The Sentry',
    title: 'Face Detection Pipeline',
    subtitle: 'Turns a raw photo dump into an aligned face dataset, on a CPU, without dropping anything',
    subtitleTr: 'Ham bir fotoğraf yığınını hizalanmış bir yüz veri kümesine çevirir; CPU’da, hiçbir şeyi atlamadan',
    oneLiner: 'Detect once, verify once more, and a messy photo dump becomes a dataset you can actually train on.',
    oneLinerTr: 'Bir kez tespit et, bir kez daha doğrula; dağınık bir fotoğraf yığını gerçekten eğitilebilir bir veri kümesine dönüşür.',
    language: 'Python',
    color: '#00f0ff',
    glow: 'rgba(0,240,255,0.5)',
    tags: ['BlazeFace', 'MediaPipe', 'Two-Stage'],
    github: gh('face-detection-pipeline'),
    // Field Notes — migrated verbatim from caseStudies.js (12 Sep 2026).
    challenges: [
      'The core tension is recall vs precision: lowering the threshold finds small faces but invites false positives. The two-stage design resolves it by making the second pass do the filtering.',
      'Running a 140,000-image benchmark reliably meant per-image CSV logging, safe resume after interruption, and never crashing on a corrupt file.',
    ],
    challengesTr: [
      'Temel gerilim duyarlılık ve kesinlik arasındadır: eşiği düşürmek küçük yüzleri bulur ama hatalı tespit davet eder. İki aşamalı tasarım, filtrelemeyi ikinci geçişe yaptırarak bunu çözer.',
      '140.000 görsellik testi güvenilir çalıştırmak; görsel başına CSV kaydı, kesinti sonrası güvenli devam ve bozuk dosyada asla çökmemek demekti.',
    ],
    lessons: [
      'You can often beat a model’s limitations with a smarter pipeline around it, without touching the weights.',
      'Designing for failure — resumable runs, corrupt-file handling, a review queue — is what makes a benchmark trustworthy.',
    ],
    lessonsTr: [
      'Bir modelin sınırlarını, ağırlıklarına dokunmadan, etrafına kuracağın daha akıllı bir hatla çoğu zaman aşabilirsin.',
      'Başarısızlığa göre tasarlamak — devam ettirilebilir çalışmalar, bozuk dosya yönetimi, inceleme kuyruğu — bir testi güvenilir kılan şeydir.',
    ],
    images: [
      { src: '/projects/face-detection-pipeline/multi-face-detected.jpg', caption: 'Multiple faces detected and verified in a single pass', captionTr: 'Tek geçişte tespit edilip doğrulanan birden fazla yüz' },
      { src: '/projects/face-detection-pipeline/portrait-input.jpg', caption: 'Input image before detection', captionTr: 'Tespit öncesi girdi görseli' },
      { src: '/projects/face-detection-pipeline/portrait-detected.jpg', caption: 'Same image after the two-stage pipeline — box refined by zoom-in verification', captionTr: 'Aynı görsel iki aşamalı hattan sonra: kutu, yakınlaştırmalı doğrulamayla iyileştirilmiş' },
      { src: '/projects/face-detection-pipeline/small-face-detected.jpg', caption: 'Tiny face recovered by the regional candidate search', captionTr: 'Bölgesel aday aramasıyla yakalanan minik yüz' },
      { src: '/projects/face-detection-pipeline/noisy-background-detected.jpg', caption: 'Busy background — no false positives after re-verification', captionTr: 'Karmaşık arka plan: yeniden doğrulama sonrası hatalı tespit yok' },
      { src: '/projects/face-detection-pipeline/night-crowd-detected.jpg', caption: 'Low-light crowd scene handled on CPU', captionTr: 'CPU’da işlenen düşük ışıklı kalabalık sahnesi' },
      { src: '/projects/face-detection-pipeline/benchmark.png', caption: '140k-image benchmark summary', captionTr: '140 bin görsellik performans testi özeti' },
    ],
    overview:
      'Off-the-shelf short-range face detectors miss small faces and hallucinate faces in blurred textures — and no single confidence threshold fixes both. This project wraps MediaPipe’s BlazeFace in a two-stage detect-and-verify pipeline: candidates are collected permissively, then each is zoomed into and re-detected. Real faces re-score above 0.90 when enlarged; false positives fail re-detection. Same model, same dependencies, measurably better accuracy.',
    overviewTr:
      'Hazır kısa menzilli yüz dedektörleri küçük yüzleri kaçırır, bulanık dokularda ise olmayan yüzler görür; tek bir güven eşiği iki sorunu birden çözmez. Bu proje, MediaPipe’ın BlazeFace modelini iki aşamalı bir tespit et-doğrula hattıyla sarar: adaylar önce esnek bir eşikle toplanır, ardından her biri yakınlaştırılıp yeniden tespit edilir. Gerçek yüzler büyütüldüğünde 0,90’ın üzerinde puan alır; hatalı tespitler ise yeniden doğrulamayı geçemez. Aynı model, aynı bağımlılıklar, ölçülebilir biçimde daha iyi doğruluk.',
    stack: [
      { label: 'Languages', items: ['Python 3.12+'] },
      { label: 'Libraries', items: ['MediaPipe (Tasks API)', 'OpenCV 4.x', 'NumPy', 'kagglehub'] },
      { label: 'AI Models', items: ['BlazeFace short-range (TFLite, 230 KB, bundled)'] },
    ],
    architecture: [
      'Stage 1 runs the detector at a permissive 0.30 threshold over the full image plus its top and bottom halves — halving the frame makes small faces proportionally larger to the model. Stage 2 zooms into each candidate region and re-detects at a 0.65 threshold, accepting only faces centered in the crop and refining the box to the zoomed detection. Overlapping detections are deduplicated by IoU ≥ 0.4, keeping the higher score.',
      'detect.py implements the pipeline and box drawing; main.py batch-processes the dataset/ folder; evaluate.py drives the 140k benchmark with per-image CSV logging, resumable runs, and review-queue sampling.',
    ],
    architectureTr: [
      '1. aşama, dedektörü esnek bir 0,30 eşiğiyle görselin tamamı ile üst ve alt yarıları üzerinde çalıştırır; kareyi ikiye bölmek, küçük yüzleri modele oranla büyütür. 2. aşama her aday bölgeye yakınlaşır ve 0,65 eşiğiyle yeniden tespit yapar; yalnızca kırpmanın ortasındaki yüzleri kabul eder ve kutuyu yakınlaştırılmış tespite göre iyileştirir. Çakışan tespitler IoU ≥ 0,4 ölçütüyle tekilleştirilir; yüksek puanlı olan tutulur.',
      'detect.py pipeline’ı ve kutu çizimini uygular; main.py dataset/ klasörünü toplu işler; evaluate.py ise görsel başına CSV kaydı, devam ettirilebilir çalıştırmalar ve inceleme kuyruğu örneklemesiyle 140 binlik performans testini yürütür.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Short-range face detectors miss small faces and hallucinate faces in blurred texture. No single confidence threshold fixes both — raising it loses the small faces, lowering it keeps the phantoms.',
    problemTr:
      'Kısa menzilli yüz dedektörleri küçük yüzleri kaçırır ve bulanık dokuda olmayan yüz uydurur. Tek bir güven eşiği ikisini birden çözmez — yükseltince küçük yüzler gider, düşürünce hayaletler kalır.',
    flow: 'Full frame + top/bottom halves at threshold 0.30 → zoom into each candidate → re-detect at 0.65 with a centre check → IoU ≥ 0.4 deduplication → per-image CSV log, resumable',
    flowTr: 'Tam kare + üst/alt yarılar, eşik 0,30 → her adaya yakınlaş → merkez kontrolüyle 0,65’te yeniden tespit → IoU ≥ 0,4 tekilleştirme → görsel başına CSV log, kaldığı yerden devam eder',
    metrics: [
      { label: 'Images processed', value: '140,000 · 0 failures', condition: 'processing scope — Kaggle benchmark, single-threaded Apple M3 CPU' },
      { label: 'Speed', value: '~11 ms per image', condition: 'runtime — same run, total wall clock 25 m 17 s' },
      { label: 'Faces detected', value: '140,836', condition: 'processing scope — 1.006 average per image' },
      { label: 'Flagged for review', value: '0.26%', condition: 'processing scope — zero-face, low-confidence and many-face images routed to a review queue' },
      { label: 'Model size', value: '230 KB', condition: 'system scope — BlazeFace short-range TFLite, bundled in the repo' },
    ],
    metricsTr: [
      { label: 'İşlenen görsel', value: '140.000 · 0 hata', condition: 'işleme kapsamı — Kaggle benchmark’ı, tek çekirdek Apple M3 CPU' },
      { label: 'Hız', value: 'görsel başına ~11 ms', condition: 'çalışma zamanı — aynı koşu, toplam 25 dk 17 sn' },
      { label: 'Tespit edilen yüz', value: '140.836', condition: 'işleme kapsamı — görsel başına ortalama 1,006' },
      { label: 'İncelemeye ayrılan', value: '%0,26', condition: 'işleme kapsamı — sıfır yüzlü, düşük güvenli ve çok yüzlü görseller inceleme kuyruğuna' },
      { label: 'Model boyutu', value: '230 KB', condition: 'sistem kapsamı — BlazeFace short-range TFLite, depoda gömülü' },
    ],
    useCases: [
      'Dataset preparation at scale',
      'Batch vision work with no GPU budget',
    ],
    useCasesTr: [
      'Ölçekli veri kümesi hazırlama',
      'GPU bütçesi olmayan toplu görüntü işleme',
    ],
    decisions: [
      { choice: 'Two-stage detect-then-verify instead of tuning one threshold', why: 'Real faces re-score above 0.90 when enlarged while false positives fail re-detection, so one model does the work of two', tradeoff: 'Roughly doubles the per-image cost' },
    ],
    decisionsTr: [
      { choice: 'Tek eşiği ayarlamak yerine iki aşamalı tespit-sonra-doğrula', why: 'Gerçek yüzler büyütülünce 0,90’ın üstüne çıkarken yanlış pozitifler yeniden tespitte elenir; böylece tek model iki modelin işini yapar', tradeoff: 'Görsel başına maliyeti kabaca iki katına çıkarır' },
    ],
    contribution: [
      'The two-stage detect-and-verify idea, and halving the frame so small faces become proportionally larger to the model.',
      'Operational discipline at scale — per-image CSV logging, safe resume after interruption, and a human-review queue with full metadata. MediaPipe BlazeFace is off the shelf and unmodified.',
    ],
    contributionTr: [
      'İki aşamalı tespit-ve-doğrula fikri ve küçük yüzlerin modele oransal olarak büyümesi için karenin ikiye bölünmesi.',
      'Ölçekte operasyonel disiplin — görsel başına CSV log, kesintiden sonra güvenli devam ve tam meta veriyle insan inceleme kuyruğu. MediaPipe BlazeFace hazır ve değiştirilmemiş.',
    ],
    limitations: [
      'There is no labelled ground truth on the 140k set, so "0 failures" means zero crashes and zero unreadable images, not verified detection accuracy.',
    ],
    limitationsTr: [
      '140 binlik kümede etiketli gerçek referans yok; dolayısıyla “0 hata” doğrulanmış tespit doğruluğu değil, sıfır çökme ve sıfır okunamayan görsel demek.',
    ],
  },
  {
    slug: 'yolo-custom-detector',
    category: 'Computer Vision',
    cover: '/projects/yolo-custom-detector/cover.svg',
    mark: 'MARK XI',
    codename: 'The Hunter',
    title: 'Custom YOLO11 Detector',
    subtitle: 'What it really takes to detect an object no pretrained model has ever heard of',
    subtitleTr: 'Hazır hiçbir modelin duymadığı bir nesneyi tespit etmek gerçekte neye mal oluyor',
    oneLiner: 'Finds Rotring pens in real photos, trained on 117 images I shot myself and fast enough for a laptop CPU.',
    oneLinerTr: 'Gerçek fotoğraflarda Rotring kalem bulur; kendi çektiğim 117 görselle eğitildi ve dizüstü CPU’su için yeterince hızlı.',
    language: 'Python',
    color: '#ff3b30',
    glow: 'rgba(255,59,48,0.5)',
    tags: ['YOLO11', 'Object Detection', 'Ultralytics'],
    github: gh('yolo-custom-detector'),
    // Field Notes — migrated verbatim from caseStudies.js (12 Sep 2026).
    challenges: [
      'My first dataset was shot on one desk, in one light, from one angle — the model scored beautifully in validation and then failed on anything new. It had memorized the scene, not the object.',
      'The fix was deliberate diversity: different lighting, distances, backgrounds, rotations, and partial occlusions, so the network was forced to isolate the object’s own features.',
    ],
    challengesTr: [
      'İlk veri kümem tek bir masada, tek ışıkta, tek açıdan çekilmişti — model doğrulamada harika puan aldı, sonra yeni her şeyde çöktü. Nesneyi değil, sahneyi ezberlemişti.',
      'Çözüm bilinçli çeşitlilikti: farklı ışık, mesafe, arka plan, dönüş ve kısmi kapanmalar; böylece ağ nesnenin kendi özelliklerini yalıtmaya zorlandı.',
    ],
    lessons: [
      'When a model underperforms, the instinct is to reach for a bigger architecture. Far more often, the answer is hiding in the dataset.',
      'Diversity in the data did more for accuracy than any hyperparameter I touched.',
    ],
    lessonsTr: [
      'Bir model beklentiyi karşılamayınca ilk içgüdü daha büyük bir mimariye uzanmaktır. Oysa cevap çok daha sık veri kümesinde saklıdır.',
      'Verideki çeşitlilik, doğruluğa dokunduğum her hiperparametreden daha fazlasını kattı.',
    ],
    images: [
      { src: '/projects/yolo-custom-detector/desk-detected.jpg', caption: 'A cluttered desk — the one target pen localized inside a confidence box', captionTr: 'Karmaşık bir masa: hedef kalem güven kutusu içinde tam olarak bulunmuş' },
      { src: '/projects/yolo-custom-detector/occluded-input.jpg', caption: 'Before — the pen half-hidden between books', captionTr: 'Önce: kalem kitapların arasında yarı gizli' },
      { src: '/projects/yolo-custom-detector/occluded-detected.jpg', caption: 'After — recovered from partial evidence alone', captionTr: 'Sonra: yalnızca kısmi ipuçlarından yakalandı' },
      { src: '/projects/yolo-custom-detector/new-photo-detected.jpg', caption: 'Generalization — a brand-new photo taken after training, never seen by the model', captionTr: 'Genelleme: eğitimden sonra çekilmiş, modelin daha önce hiç görmediği yepyeni bir fotoğraf' },
      { src: '/projects/yolo-custom-detector/test-detected.jpg', caption: 'A held-out test image detected with high confidence', captionTr: 'Yüksek güvenle tespit edilen, eğitime dahil edilmemiş bir test görseli' },
      { src: '/projects/yolo-custom-detector/val-predictions.jpg', caption: 'The model’s own predictions across a validation batch', captionTr: 'Modelin bir doğrulama grubu üzerindeki kendi tahminleri' },
      { src: '/projects/yolo-custom-detector/annotation.png', caption: 'Hand-drawing bounding boxes in makesense.ai', captionTr: 'makesense.ai’de sınırlayıcı kutuların elle çizilmesi' },
      { src: '/projects/yolo-custom-detector/training-curves.png', caption: 'Losses and metrics across 50 epochs — steady convergence, no overfitting', captionTr: '50 epoch boyunca kayıplar ve metrikler: istikrarlı yakınsama, aşırı öğrenme yok' },
      { src: '/projects/yolo-custom-detector/pr-curve.png', caption: 'Precision–Recall curve — area = mAP@50 = 0.903', captionTr: 'Kesinlik–Duyarlılık eğrisi: alan = mAP@50 = 0,903' },
      { src: '/projects/yolo-custom-detector/confusion-matrix.png', caption: 'Normalized confusion matrix — single class vs background', captionTr: 'Normalleştirilmiş karışıklık matrisi: tek sınıf ile arka plan' },
      { src: '/projects/yolo-custom-detector/cli-output.png', caption: 'Command-line inference on a new image', captionTr: 'Yeni bir görsel üzerinde komut satırından inference' },
    ],
    overview:
      'A custom single-class object detector that learns one specific real-world object — my own Rotring mechanical pencil — and finds it in any photo. It is deliberately not a generic pen detector: the goal was to walk the full workflow of teaching a modern detector a brand-new object that exists in no public dataset. Every stage is done by hand, from photographing the object under varied conditions to annotating, splitting, fine-tuning YOLO11n, and running inference — reaching 90.3% mAP@50 on the validation set.',
    overviewTr:
      'Belirli tek bir gerçek nesneyi (kendi Rotring mekanik kalemimi) öğrenip herhangi bir fotoğrafta bulan, özel ve tek sınıflı bir nesne tespit modeli. Bilinçli olarak genel bir kalem dedektörü değil: amaç, hiçbir açık veri kümesinde bulunmayan yepyeni bir nesneyi modern bir dedektöre öğretmenin tüm sürecini baştan sona yaşamaktı. Nesneyi farklı koşullarda fotoğraflamaktan etiketlemeye, veriyi bölmeye, YOLO11n’i fine-tune yapmaya ve inference yapmaya kadar her adım elle yapıldı; doğrulama kümesinde %90,3 mAP@50’ye ulaşıldı.',
    stack: [
      { label: 'Languages', items: ['Python 3.11+'] },
      { label: 'Frameworks', items: ['PyTorch'] },
      { label: 'Libraries', items: ['Ultralytics YOLO11', 'OpenCV', 'NumPy'] },
      { label: 'Tools', items: ['makesense.ai (annotation)', 'YOLO11n checkpoint'] },
      { label: 'AI Models', items: ['YOLO11n — single class rotring_pen, ~2.6M parameters'] },
    ],
    architecture: [
      'The pipeline is a small set of focused scripts under src/. prepare_dataset.py verifies the raw photos and reports corruption, duplicates, and split leaks; split_dataset.py performs a deterministic 70/20/10 split; train.py fine-tunes YOLO11n from the pretrained checkpoint at 640×640 for 50 epochs with auto batch sizing and early stopping (patience 20); predict.py runs inference on any image and draws the detection box. A central config.py holds paths, the single class name, and hyperparameters.',
      'Training starts from the pretrained yolo11n.pt so the backbone already knows generic visual features, and fine-tuning only teaches the new object — which is why ~100 images is enough. The best checkpoint is copied automatically to models/best.pt, and full run artifacts (metrics, curves, weights) land under runs/.',
    ],
    architectureTr: [
      'Pipeline, src/ altında birkaç odaklı betikten oluşur. prepare_dataset.py ham fotoğrafları doğrular ve bozulma, kopya ve bölme sızıntılarını raporlar; split_dataset.py deterministik bir %70/%20/%10 bölme yapar; train.py YOLO11n’i önceden eğitilmiş kontrol noktasından 640×640 çözünürlükte, 50 epoch boyunca, otomatik batch boyutu ve erken durdurmayla (patience 20) fine-tune’lar; predict.py herhangi bir görselde inference yapıp tespit kutusunu çizer. Merkezî bir config.py yolları, tek sınıf adını ve hiperparametreleri tutar.',
      'Eğitim, önceden eğitilmiş yolo11n.pt’den başlar; böylece omurga genel görsel özellikleri zaten bilir ve fine-tune yalnızca yeni nesneyi öğretir; ~100 görselin yeterli olmasının nedeni de budur. En iyi kontrol noktası otomatik olarak models/best.pt’ye kopyalanır; çalışmanın tüm çıktıları (metrikler, eğriler, ağırlıklar) runs/ altında toplanır.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'featured',
    problem:
      'Modern detectors only know the categories in public datasets. If the object you need exists in none of them, pretrained weights alone do not help — and it is not obvious how little data you can get away with.',
    problemTr:
      'Modern dedektörler yalnızca açık veri kümelerindeki kategorileri bilir. Aradığın nesne hiçbirinde yoksa önceden eğitilmiş ağırlıklar tek başına yetmez — üstelik ne kadar az veriyle idare edilebileceği de belli değildir.',
    flow: '117 self-shot photos → hand-annotated boxes → deterministic 82/23/12 split → YOLO11n fine-tune at 640×640, 50 epochs, early stopping → inference',
    flowTr: 'Kendi çekilen 117 fotoğraf → elle etiketlenmiş kutular → deterministik 82/23/12 bölme → 640×640’ta YOLO11n fine-tune, 50 epoch, erken durdurma → inference',
    metrics: [
      { label: 'mAP@50 / mAP@50-95', value: '0.903 / 0.740', condition: 'model performance — validation set, single class rotring_pen' },
      { label: 'Precision / Recall', value: '0.90 / 0.83', condition: 'model performance — same validation set' },
      { label: 'Held-out test', value: '11 of 12 detected', condition: 'model performance — 0.88–0.95 confidence, plus one photo taken after training finished' },
      { label: 'Dataset', value: '117 photos', condition: 'dataset scope — self-collected across varied lighting, angle, distance, background and occlusion' },
      { label: 'Inference', value: '~45 ms per image', condition: 'runtime — laptop CPU, no discrete GPU; best.pt is ~5 MB' },
    ],
    metricsTr: [
      { label: 'mAP@50 / mAP@50-95', value: '0,903 / 0,740', condition: 'model performansı — doğrulama kümesi, tek sınıf rotring_pen' },
      { label: 'Kesinlik / Duyarlılık', value: '0,90 / 0,83', condition: 'model performansı — aynı doğrulama kümesi' },
      { label: 'Ayrılmış test', value: '12’nin 11’i', condition: 'model performansı — 0,88–0,95 güven, ayrıca eğitim bittikten sonra çekilen bir fotoğraf' },
      { label: 'Veri kümesi', value: '117 fotoğraf', condition: 'veri kümesi kapsamı — farklı ışık, açı, mesafe, arka plan ve kapanmayla kendi çekilen' },
      { label: 'Inference', value: 'görsel başına ~45 ms', condition: 'çalışma zamanı — dizüstü CPU, ayrık GPU yok; best.pt ~5 MB' },
    ],
    useCases: [
      'Detecting a specific object that exists in no public dataset',
    ],
    useCasesTr: [
      'Hiçbir açık veri kümesinde bulunmayan belirli bir nesneyi tespit etmek',
    ],
    decisions: [
      { choice: 'Start from the pretrained yolo11n checkpoint rather than training from scratch', why: 'The backbone already knows generic visual features, so fine-tuning only has to teach the new object — which is why ~100 images is enough', tradeoff: 'The detector inherits whatever biases the pretrained backbone carries' },
    ],
    decisionsTr: [
      { choice: 'Sıfırdan eğitmek yerine önceden eğitilmiş yolo11n kontrol noktasından başlamak', why: 'Omurga genel görsel özellikleri zaten biliyor, fine-tune yalnızca yeni nesneyi öğretiyor — ~100 görselin yetmesinin nedeni bu', tradeoff: 'Dedektör, önceden eğitilmiş omurganın taşıdığı önyargıları da devralıyor' },
    ],
    contribution: [
      'Collecting and hand-annotating the entire dataset — 117 photos shot under deliberately varied conditions. This is the actual work in the project.',
      'Deterministic splitting with corruption, duplicate and split-leak checks before training.',
      'Ultralytics training is a single command and is off the shelf; what is authored here is the data and the evaluation around it.',
    ],
    contributionTr: [
      'Veri kümesinin tamamını toplamak ve elle etiketlemek — bilinçli olarak değişken koşullarda çekilmiş 117 fotoğraf. Projedeki asıl iş bu.',
      'Eğitimden önce bozulma, tekrar ve bölme sızıntısı kontrolleriyle deterministik bölme.',
      'Ultralytics eğitimi tek komut ve hazır; burada kaleme alınan şey veri ve etrafındaki değerlendirme.',
    ],
    limitations: [
      'One class, one physical object, 117 images. The number says the pipeline works; it says nothing about a general pen detector.',
      'Twelve held-out test images is too few to bound the error.',
    ],
    limitationsTr: [
      'Tek sınıf, tek fiziksel nesne, 117 görsel. Sayı pipeline’ın çalıştığını söylüyor; genel bir kalem dedektörü hakkında hiçbir şey söylemiyor.',
      'On iki ayrılmış test görseli hatayı sınırlamak için fazla az.',
    ],
  },
  {
    slug: 'facelock',
    unverified: [
      'results.Unknown-face tests — the 0.72 / 0.79 rejection distances are not stated anywhere in the repository. Deliberately NOT carried into metrics.',
    ],

    category: 'Computer Vision',
    cover: '/projects/facelock/cover.svg',
    mark: 'MARK XII',
    codename: 'The Sentinel',
    title: 'FaceLock',
    subtitle: 'Recognizes who is in front of the webcam in real time, on an ordinary laptop with no GPU',
    subtitleTr: 'Webcam’in önündekini gerçek zamanlı tanır; GPU’suz, sıradan bir dizüstünde',
    oneLiner: 'Detect on every frame, recognize on every Nth, and the webcam feed never stutters.',
    oneLinerTr: 'Her karede tespit, her N. karede tanıma; webcam görüntüsü hiç takılmıyor.',
    language: 'Python',
    color: '#2dd4bf',
    glow: 'rgba(45,212,191,0.5)',
    tags: ['dlib', 'Real-Time', 'Face Recognition'],
    github: gh('facelock'),
    images: [
      { src: '/projects/facelock/demo_1.jpg', caption: 'A trained person recognized live — green box plus name label', captionTr: 'Eğitilmiş bir kişi canlı olarak tanınıyor: yeşil kutu ve isim etiketi' },
      { src: '/projects/facelock/demo_2.jpg', caption: 'Recognition holding steady across a different angle', captionTr: 'Farklı bir açıda da kararlı kalan tanıma' },
      { src: '/projects/facelock/demo_4.jpg', caption: 'Detection and recognition under changed lighting', captionTr: 'Değişen ışık koşullarında tespit ve tanıma' },
      { src: '/projects/facelock/demo_5.jpg', caption: 'The pipeline keeping up with movement in real time', captionTr: 'Hareket hâlindeyken bile gerçek zamanlı çalışan pipeline' },
      { src: '/projects/facelock/unknown_1.jpg', caption: 'Unknown face correctly rejected — match distance 0.72, far above the 0.50 threshold', captionTr: 'Bilinmeyen yüz doğru şekilde reddedildi: eşleşme mesafesi 0,72, 0,50 eşiğinin çok üzerinde' },
      { src: '/projects/facelock/unknown_2.jpg', caption: 'Second unknown-person test — “person not found” at distance 0.79', captionTr: 'İkinci bilinmeyen kişi testi: 0,79 mesafeyle “kişi bulunamadı”' },
    ],
    overview:
      'A real-time face detection and recognition system that watches a webcam and reacts to faces live: every human face gets a green box, trained people are greeted by name, and strangers are rejected with a “person not found”. Detection and recognition are deliberately split — a cheap detector runs on every frame while the expensive recognizer runs only every Nth frame — so the video stays smooth on an ordinary laptop CPU.',
    overviewTr:
      'Web kamerasını izleyip yüzlere canlı tepki veren bir gerçek zamanlı yüz tespiti ve tanıma sistemi: her insan yüzü yeşil bir kutuyla işaretlenir, eğitilmiş kişiler adıyla karşılanır, yabancılar ise “kişi bulunamadı” uyarısıyla reddedilir. Tespit ve tanıma bilinçli olarak ayrılmıştır — ucuz dedektör her karede, pahalı tanıyıcı ise yalnızca her N. karede çalışır — böylece görüntü sıradan bir dizüstü CPU’sunda bile akıcı kalır.',
    stack: [
      { label: 'Languages', items: ['Python 3.9–3.13'] },
      { label: 'Libraries', items: ['MediaPipe (Tasks API)', 'face_recognition (dlib)', 'OpenCV', 'NumPy'] },
      { label: 'AI Models', items: ['BlazeFace short-range (TFLite, ~230 KB, auto-downloaded)', 'dlib 128-d face encodings'] },
    ],
    architecture: [
      'main.py runs the live loop: each webcam frame goes through MediaPipe BlazeFace (Tasks API) for detection and box drawing, and once every RECOGNITION_INTERVAL frames the crop is passed to face_recognition, which computes a 128-d dlib encoding and finds the nearest neighbor in encodings.pickle. In-between frames simply reuse the last known result, which is what keeps the FPS smooth.',
      'train_model.py builds that pickle from a dataset/ folder where each subfolder name is a person: it applies EXIF transpose to phone photos, retries small faces with 2x upsampling, and stores every encoding per person rather than an average — matching against the nearest neighbor means different angles and lighting conditions all help. A distance below 0.50 is required to accept a match.',
    ],
    architectureTr: [
      'main.py canlı döngüyü çalıştırır: her web kamerası karesi tespit ve kutu çizimi için MediaPipe BlazeFace’ten (Tasks API) geçer; her RECOGNITION_INTERVAL karede bir, kırpılan bölge face_recognition’a verilir, 128 boyutlu dlib kodlaması hesaplanır ve encodings.pickle içindeki en yakın komşu bulunur. Aradaki kareler son bilinen sonucu kullanır; FPS’i akıcı tutan da budur.',
      'train_model.py bu pickle dosyasını, her alt klasörün bir kişiye karşılık geldiği dataset/ klasöründen üretir: telefon fotoğraflarına EXIF düzeltmesi uygular, küçük yüzleri 2x büyütmeyle yeniden dener ve kişi başına ortalama yerine tüm kodlamaları saklar; en yakın komşuya göre eşleştirme sayesinde farklı açılar ve ışık koşulları da katkı sağlar. Bir eşleşmenin kabulü için 0,50’nin altında bir mesafe gerekir.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'archived',
    tier: 'experimental',
    problem:
      'Running a recognition model on every webcam frame drops the frame rate far enough that the feed becomes unusable on an ordinary laptop.',
    problemTr:
      'Tanıma modelini her webcam karesinde koşturmak, kare hızını sıradan bir dizüstünde akışı kullanılamaz hale getirecek kadar düşürüyor.',
    flow: 'Webcam frame → BlazeFace detect every frame → every Nth frame the crop goes to a dlib 128-d encoding → nearest neighbour in encodings.pickle → accept below 0.50 distance',
    flowTr: 'Webcam karesi → her karede BlazeFace tespiti → her N karede bir kırpım dlib 128-d encoding’ine gider → encodings.pickle içinde en yakın komşu → 0,50 mesafenin altında kabul',
    metrics: [
      { label: 'Match threshold', value: '0.50 face distance', condition: 'system scope — strict; unknown faces are rejected rather than guessed' },
      { label: 'Training set', value: '20–30 photos per person', condition: 'dataset scope — all encodings kept, no averaging' },
    ],
    metricsTr: [
      { label: 'Eşleşme eşiği', value: '0,50 yüz mesafesi', condition: 'sistem kapsamı — sıkı; bilinmeyen yüzler tahmin edilmek yerine reddedilir' },
      { label: 'Eğitim kümesi', value: 'kişi başına 20–30 fotoğraf', condition: 'veri kümesi kapsamı — tüm encoding’ler saklanır, ortalama alınmaz' },
    ],
    useCases: [],
    useCasesTr: [],
    contribution: [
      'The two-tier cadence — cheap detector every frame, expensive recogniser every Nth — which is what keeps the feed smooth.',
      'Keeping every encoding per person instead of averaging them, so different angles and lighting all contribute to the nearest-neighbour match. MediaPipe and dlib face_recognition are off the shelf.',
    ],
    contributionTr: [
      'İki kademeli tempo — her karede ucuz dedektör, her N karede pahalı tanıyıcı — akışı akıcı tutan şey bu.',
      'Kişi başına encoding’lerin ortalaması alınmak yerine hepsinin saklanması; böylece farklı açı ve ışıklar en yakın komşu eşleşmesine katkı veriyor. MediaPipe ve dlib face_recognition hazır.',
    ],
    limitations: [
      'No measured accuracy. Superseded by the face-detection pipeline on scale and by the pose-robust login on angle.',
    ],
    limitationsTr: [
      'Ölçülmüş doğruluk yok. Ölçekte yüz tespiti pipeline’ı, açıda poz-dayanıklı giriş tarafından geride bırakıldı.',
    ],
  },
  {
    slug: 'worldcup-bpe-tokenizer',
    category: 'LLM & NLP',
    cover: '/projects/worldcup-bpe-tokenizer/cover.svg',
    mark: 'MARK XIII',
    codename: 'Wordsmith',
    title: 'WorldCup BPE Tokenizer',
    subtitle: 'Why a tiny tokenizer trained on your own domain can beat a giant general-purpose one',
    subtitleTr: 'Kendi alanında eğitilmiş minik bir tokenizer, devasa genel bir tokenizer’ı neden geçebiliyor',
    oneLiner: 'A tiny domain tokenizer that outcompresses vocabularies 150 times its size — and four small LLMs trained on top of it.',
    oneLinerTr: 'Kendisinden 150 kat büyük sözlükleri sıkıştırmada geçen minik bir alan tokenizer’ı ve üzerine eğitilmiş dört küçük LLM.',
    language: 'Python',
    color: '#ff9f1c',
    glow: 'rgba(255,159,28,0.5)',
    tags: ['BPE', 'Tokenizer', 'Domain-Specific'],
    github: gh('worldcup-bpe-tokenizer'),
    images: [
      { src: '/projects/worldcup-bpe-tokenizer/tokenizer_comparison.png', caption: 'The same sentence tokenized by our 1,024-token BPE vs the real Qwen, Gemma, and DeepSeek tokenizers', captionTr: 'Aynı cümle, 1.024 tokenlık BPE’miz ile gerçek Qwen, Gemma ve DeepSeek tokenizer’ları tarafından bölünüyor' },
      { src: '/projects/worldcup-bpe-tokenizer/bpe_encode_decode.png', caption: 'Lossless encode → decode round-trip thanks to byte-level pre-tokenization', captionTr: 'Bayt seviyesi ön-tokenizasyon sayesinde kayıpsız kodlama → çözme turu' },
      { src: '/projects/worldcup-bpe-tokenizer/token_counts.png', caption: 'Tokens per sentence — the tiny domain vocabulary is competitive with 125–250× larger ones', captionTr: 'Cümle başına token: minik alan sözlüğü, 125–250 kat büyük sözlüklerle rekabet ediyor' },
      { src: '/projects/worldcup-bpe-tokenizer/model_training.png', caption: 'Four tiny architectures trained with an identical loop — losses and generated names', captionTr: 'Birebir aynı döngüyle eğitilen dört minik mimari: kayıplar ve üretilen isimler' },
    ],
    overview:
      'Two experiments in one repository. First, a byte-level BPE tokenizer (vocab_size 1,024) trained on 2022 FIFA World Cup Wikipedia articles and compared head-to-head against the real Qwen, Gemma, and DeepSeek tokenizers — despite being 125–250× smaller, it is often shorter on football text because it learned rare names like “Mbappé” and “Lusail” as single tokens. Second, four tiny transformer architectures (Qwen3, Qwen3.5, Gemma, DeepSeek-V3) built from scratch and trained under identical conditions so any difference comes from the architecture itself.',
    overviewTr:
      'Tek depoda iki deney. Birincisi, 2022 FIFA Dünya Kupası Wikipedia makaleleri üzerinde eğitilen byte-level bir BPE tokenizer (sözlük boyutu 1.024); gerçek Qwen, Gemma ve DeepSeek tokenizer’larıyla birebir karşılaştırıldı ve 125–250 kat küçük olmasına rağmen futbol metinlerinde çoğu zaman daha kısa sonuç veriyor, çünkü “Mbappé” ve “Lusail” gibi nadir isimleri tek token olarak öğrendi. İkincisi, sıfırdan inşa edilen dört minik transformer mimarisi (Qwen3, Qwen3.5, Gemma, DeepSeek-V3); tüm farkın mimariden gelmesi için birebir aynı koşullarda eğitildi.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Frameworks', items: ['PyTorch'] },
      { label: 'Libraries', items: ['Hugging Face tokenizers', 'NumPy', 'Matplotlib'] },
      { label: 'Tools', items: ['MediaWiki API'] },
      { label: 'AI Models', items: ['TinyQwen · TinyQwen35 · TinyGemma · TinyDeepSeek — 19K–63K parameters each'] },
    ],
    architecture: [
      'Part 1 (src/train_bpe.py) downloads two World Cup Wikipedia articles via the MediaWiki extracts API, cleans them into a corpus, trains a byte-level BPE tokenizer with Hugging Face tokenizers (vocab 1,024, min_frequency 2, pad/unk/bos/eos specials), and writes an analysis report — example tokens, round-trips, and a ~1.81 tokens/word compression figure. A separate script renders the visual comparison against the real Qwen, Gemma, and DeepSeek tokenizers.',
      'Part 2 (src/train_models.py) trains four character-level architectures on Turkish first names with everything held constant — data, tokenizer, batch, steps, optimizer, seed. Each reimplements its family’s signature mechanisms: TinyQwen (RMSNorm, QK-Norm, GQA, RoPE, SwiGLU), TinyQwen35 (Gated DeltaNet linear attention interleaved with full attention), TinyGemma (sandwich norm, sliding-window attention, dual RoPE, GeGLU), and TinyDeepSeek (MLA compressed-KV attention plus MoE with a shared expert). Each model folder is also self-contained with its own train.py and generate.py.',
    ],
    architectureTr: [
      '1. bölüm (src/train_bpe.py) MediaWiki extracts API’siyle iki Dünya Kupası Wikipedia makalesini indirir, temizleyip derleme dönüştürür, Hugging Face tokenizers ile byte-level bir BPE eğitir (sözlük 1.024, min_frequency 2, pad/unk/bos/eos özel tokenları) ve analiz raporu yazar: örnek tokenlar, gidiş-dönüş testleri ve ~1,81 token/kelime sıkıştırma değeri. Ayrı bir betik, gerçek Qwen, Gemma ve DeepSeek tokenizer’larıyla görsel karşılaştırmayı üretir.',
      '2. bölüm (src/train_models.py) dört karakter seviyesi mimariyi Türkçe isimler üzerinde, her şey sabit tutularak eğitir: veri, tokenizer, batch, adım sayısı, optimizasyon ve tohum. Her model kendi ailesinin imza mekanizmalarını yeniden uygular: TinyQwen (RMSNorm, QK-Norm, GQA, RoPE, SwiGLU), TinyQwen35 (tam dikkat ile dönüşümlü Gated DeltaNet doğrusal dikkati), TinyGemma (sandviç norm, kayan pencere dikkati, çift RoPE, GeGLU) ve TinyDeepSeek (MLA sıkıştırılmış-KV dikkati ve ortak uzmanlı MoE). Her model klasörü kendi train.py ve generate.py dosyalarıyla bağımsız da çalıştırılabilir.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Production tokenizers carry 130K–260K token vocabularies and still split domain words like "Mbappé" into pieces. It is not obvious how small a domain-trained vocabulary can get before it loses to them.',
    problemTr:
      'Üretim tokenizer’ları 130B–260B token’lık sözlükler taşıyor ve yine de “Mbappé” gibi alan kelimelerini parçalara bölüyor. Alanda eğitilmiş bir sözlüğün, onlara yenilmeden ne kadar küçülebileceği belli değil.',
    flow: 'MediaWiki API → clean corpus → byte-level BPE, vocab 1,024 → head-to-head token counts against Qwen2.5, Gemma-2 and DeepSeek-V3 · separately: 4 tiny architectures trained under identical conditions',
    flowTr: 'MediaWiki API → derlem temizliği → byte-level BPE, sözlük 1.024 → Qwen2.5, Gemma-2 ve DeepSeek-V3 ile karşılıklı token sayımı · ayrıca: aynı koşullarda eğitilen 4 mini mimari',
    metrics: [
      { label: 'Vocabulary', value: '1,024 tokens', condition: 'system scope — 125–250× smaller than the production tokenizers compared against' },
      { label: 'Compression', value: '~1.81 tokens per word', condition: 'tokenizer performance — ~9,149-word World Cup corpus, round-trips lossless' },
      { label: 'Domain words', value: 'Mbappé: 1 token', condition: 'tokenizer performance — versus 2–3 in Qwen2.5, Gemma-2 and DeepSeek-V3' },
      { label: 'Best training loss', value: '0.514', condition: 'model performance — Qwen3.5 hybrid, 41,992 parameters, identical data and seed across all four' },
      { label: 'Generated names', value: '100% valid', condition: 'model performance — at temperature 0.7, Turkish first names' },
    ],
    metricsTr: [
      { label: 'Sözlük', value: '1.024 token', condition: 'sistem kapsamı — karşılaştırılan üretim tokenizer’larından 125–250 kat küçük' },
      { label: 'Sıkıştırma', value: 'kelime başına ~1,81 token', condition: 'tokenizer performansı — ~9.149 kelimelik Dünya Kupası derlemi, gidiş-dönüş kayıpsız' },
      { label: 'Alan kelimeleri', value: 'Mbappé: 1 token', condition: 'tokenizer performansı — Qwen2.5, Gemma-2 ve DeepSeek-V3’te 2–3 token' },
      { label: 'En iyi eğitim kaybı', value: '0,514', condition: 'model performansı — Qwen3.5 hibrit, 41.992 parametre, dördünde de aynı veri ve seed' },
      { label: 'Üretilen isimler', value: '%100 geçerli', condition: 'model performansı — sıcaklık 0,7’de, Türkçe ilk isimler' },
    ],
    useCases: [
      'Domain-specific model training',
      'Tokenizer cost analysis before committing to a vocabulary',
    ],
    useCasesTr: [
      'Alan-özel model eğitimi',
      'Bir sözlüğe bağlanmadan önce tokenizer maliyeti analizi',
    ],
    decisions: [
      { choice: 'Hold everything constant across the four architectures except the architecture itself', why: 'Any difference in loss can then be attributed to the mechanism rather than to data, batch size, steps, optimizer or seed', tradeoff: 'The models are tiny and trained on one narrow task, so the comparison is directional rather than conclusive' },
    ],
    decisionsTr: [
      { choice: 'Dört mimari arasında mimarinin kendisi dışında her şeyi sabit tutmak', why: 'Kayıptaki fark böylece veriye, batch boyutuna, adım sayısına, optimizer’a ya da seed’e değil mekanizmaya atfedilebilir', tradeoff: 'Modeller çok küçük ve tek dar bir görevde eğitildi, dolayısıyla karşılaştırma kesin değil yön gösterici' },
    ],
    contribution: [
      'Designing the comparison so the result means something: identical data, batch, steps, optimizer and seed across all four models.',
      'Reimplementing each family’s signature mechanism — RMSNorm/QK-Norm/GQA/RoPE, Gated DeltaNet linear attention, sliding-window attention with dual RoPE, MLA compressed-KV with MoE — and the head-to-head measurement against real production tokenizers. Hugging Face tokenizers is off the shelf.',
    ],
    contributionTr: [
      'Sonucun bir anlam taşıması için karşılaştırmanın tasarlanması: dört modelde de aynı veri, batch, adım, optimizer ve seed.',
      'Her ailenin imza mekanizmasının yeniden yazılması — RMSNorm/QK-Norm/GQA/RoPE, Gated DeltaNet lineer attention, çift RoPE’lu sliding-window attention, MoE’li MLA sıkıştırılmış KV — ve gerçek üretim tokenizer’larına karşı karşılıklı ölçüm. Hugging Face tokenizers hazır.',
    ],
    limitations: [
      'The tokenizer only wins on football text. That is the point, but it means the result is not a general claim.',
      'The four models are 19K–63K parameters trained on Turkish first names. Their losses are comparable to each other and meaningless in absolute terms.',
    ],
    limitationsTr: [
      'Tokenizer yalnızca futbol metninde kazanıyor. Amaç bu, ama sonucun genel bir iddia olmadığı anlamına da geliyor.',
      'Dört model 19B–63B parametre ve Türkçe ilk isimlerde eğitildi. Kayıpları birbirine göre karşılaştırılabilir, mutlak olarak anlamsız.',
    ],
  },
  {
    slug: 'wiki2bpe',
    category: 'LLM & NLP',
    cover: '/projects/wiki2bpe/cover.svg',
    mark: 'MARK XIV',
    codename: 'Wiki Forge',
    title: 'wiki2bpe',
    subtitle: 'Two scripts that take you from a Wikipedia topic to a tokenizer published on the Hub',
    subtitleTr: 'Bir Wikipedia konusundan Hub’da yayınlanmış bir tokenizer’a götüren iki betik',
    oneLiner: 'Scrape Wikipedia → train a 2,048-token byte-level BPE → push to the Hub, in two scripts.',
    oneLinerTr: 'Wikipedia’yı çek → 2.048 tokenlık byte-level BPE eğit → Hub’a gönder; iki betikte.',
    language: 'Python',
    color: '#2ec4b6',
    glow: 'rgba(46,196,182,0.5)',
    tags: ['BPE', 'Tokenizer', 'Hugging Face'],
    github: gh('wiki2bpe'),
    images: [
      { src: '/projects/wiki2bpe/scrape.svg', caption: 'scraper.py pulling clean article text from the Wikipedia extracts API into text.txt', captionTr: 'scraper.py, Wikipedia extracts API’sinden temiz makale metnini text.txt’ye çekiyor' },
      { src: '/projects/wiki2bpe/train.svg', caption: 'script.py training the byte-level BPE and pushing my-tokenizer to the Hub', captionTr: 'script.py byte-level BPE’yi eğitip my-tokenizer’ı Hub’a gönderiyor' },
      { src: '/projects/wiki2bpe/tokenize.svg', caption: 'Lossless encode → decode round-trip on the published tokenizer', captionTr: 'Yayınlanan tokenizer üzerinde kayıpsız kodlama → çözme turu' },
    ],
    overview:
      'A minimal, end-to-end pipeline that turns any Wikipedia article into a working tokenizer. scraper.py fetches clean article text through the MediaWiki extracts API using nothing but the Python standard library, and script.py trains a byte-level Byte-Pair Encoding tokenizer on it and publishes the result straight to the Hugging Face Hub. The published tokenizer lives at gorkemergune/my-tokenizer and loads with a single AutoTokenizer.from_pretrained call. It is the groundwork for the larger WorldCup BPE experiment.',
    overviewTr:
      'Herhangi bir Wikipedia makalesini çalışır bir tokenizer’a dönüştüren, uçtan uca ve olabildiğince yalın bir pipeline. scraper.py, yalnızca Python standart kütüphanesini kullanarak MediaWiki extracts API’si üzerinden temiz makale metnini çeker; script.py ise bunun üzerinde byte-level bir Byte-Pair Encoding tokenizer eğitir ve sonucu doğrudan Hugging Face Hub’a yayınlar. Yayınlanan tokenizer gorkemergune/my-tokenizer adresinde durur ve tek bir AutoTokenizer.from_pretrained çağrısıyla yüklenir. Daha büyük WorldCup BPE deneyinin de temelini oluşturur.',
    stack: [
      { label: 'Languages', items: ['Python 3.10+'] },
      { label: 'Libraries', items: ['Hugging Face tokenizers', 'transformers'] },
      { label: 'Tools', items: ['MediaWiki extracts API', 'Hugging Face Hub'] },
    ],
    architecture: [
      'scraper.py calls the MediaWiki extracts endpoint, strips HTML and reference markup, and writes plain text to text.txt — implemented purely with urllib and json from the standard library so it runs anywhere with no install step.',
      'script.py builds a ByteLevel pre-tokenizer + BPE model with Hugging Face tokenizers, trains it on text.txt to a 2,048-token vocabulary with four special tokens, wraps it as a PreTrainedTokenizerFast, and calls push_to_hub after huggingface-cli login. The result is a standard tokenizer any transformers model can consume.',
    ],
    architectureTr: [
      'scraper.py, MediaWiki extracts endpoint’ini çağırır, HTML ve kaynak işaretlemesini temizler ve düz metni text.txt’ye yazar; tamamen standart kütüphanedeki urllib ve json ile yazıldığından hiçbir kurulum adımı olmadan her yerde çalışır.',
      'script.py, Hugging Face tokenizers ile bir ByteLevel ön-tokenizer + BPE modeli kurar, bunu text.txt üzerinde 2.048 tokenlık sözlüğe ve dört özel tokena eğitir, PreTrainedTokenizerFast olarak sarar ve huggingface-cli login sonrası push_to_hub çağırır. Sonuç, herhangi bir transformers modelinin kullanabileceği standart bir tokenizer’dır.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'experimental',
    problem:
      'Going from a topic to a working, publishable tokenizer is usually described as a pipeline. It is actually two scripts.',
    problemTr:
      'Bir konudan çalışan, yayınlanabilir bir tokenizer’a gitmek genelde bir pipeline olarak anlatılır. Aslında iki betik.',
    flow: 'MediaWiki extracts API → text.txt → ByteLevel BPE with 4 special tokens → PreTrainedTokenizerFast → push_to_hub',
    flowTr: 'MediaWiki extracts API → text.txt → 4 özel token’lı ByteLevel BPE → PreTrainedTokenizerFast → push_to_hub',
    metrics: [
      { label: 'Vocabulary', value: '2,048 tokens', condition: 'system scope — byte-level, so any UTF-8 text tokenizes with zero unknowns' },
      { label: 'Scraper dependencies', value: '0', condition: 'system scope — Python standard library only, urllib and json' },
      { label: 'Published', value: 'gorkemergune/my-tokenizer', condition: 'release scope — loads with one AutoTokenizer.from_pretrained call' },
    ],
    metricsTr: [
      { label: 'Sözlük', value: '2.048 token', condition: 'sistem kapsamı — byte seviyesinde, dolayısıyla her UTF-8 metin sıfır bilinmeyenle tokenize olur' },
      { label: 'Kazıyıcı bağımlılığı', value: '0', condition: 'sistem kapsamı — yalnızca Python standart kütüphanesi, urllib ve json' },
      { label: 'Yayınlandı', value: 'gorkemergune/my-tokenizer', condition: 'yayın kapsamı — tek AutoTokenizer.from_pretrained çağrısıyla yüklenir' },
    ],
    useCases: [
      'Rapid domain tokenizer prototyping',
    ],
    useCasesTr: [
      'Hızlı alan tokenizer’ı prototipleme',
    ],
    contribution: [
      'The standard-library-only scraper, so the data step needs no install, and publishing the result as a standard tokenizer any transformers model can consume.',
    ],
    contributionTr: [
      'Yalnızca standart kütüphaneyle yazılmış kazıyıcı — böylece veri adımı hiçbir kurulum gerektirmiyor — ve sonucun her transformers modelinin kullanabileceği standart bir tokenizer olarak yayınlanması.',
    ],
    limitations: [
      'Two scripts and no evaluation. This is groundwork for the WorldCup BPE experiment, and the repository says so.',
    ],
    limitationsTr: [
      'İki betik ve değerlendirme yok. Bu, WorldCup BPE deneyinin hazırlık işi ve depo bunu söylüyor.',
    ],
  },
  {
    slug: 'tr-sts-dataset',
    category: 'LLM & NLP',
    cover: '/projects/tr-sts-dataset/cover.svg',
    mark: 'MARK XV',
    codename: 'The Yardstick',
    title: 'Turkish STS Dataset',
    subtitle: 'Lets you set a Turkish similarity threshold from evidence instead of guessing one',
    subtitleTr: 'Türkçe için benzerlik eşiğini tahminle değil, veriyle belirlemeni sağlar',
    oneLiner: 'Most Turkish similarity data holds only near-duplicates, so a threshold tuned on it falls apart on real text.',
    oneLinerTr: 'Türkçe benzerlik verilerinin çoğu yalnızca yakın kopyalar içerir; onunla ayarlanan bir eşik gerçek metinde dağılır.',
    language: 'Python',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.5)',
    tags: ['Dataset', 'STS', 'Embeddings'],
    github: gh('tr-sts-dataset'),
    images: [
      { src: '/projects/tr-sts-dataset/distribution.svg', caption: 'Similarity distribution — a deliberately heavy tail of near-zero (unrelated) pairs across the full [−0.04, 0.97] range', captionTr: 'Benzerlik dağılımı — tüm [−0,04, 0,97] aralığında, sıfıra yakın (ilgisiz) çiftlerden oluşan bilinçli ağır bir kuyruk' },
      { src: '/projects/tr-sts-dataset/tiers.svg', caption: 'Three relatedness tiers — unrelated (~0.148), related (~0.406), and paraphrase (~0.844) mean similarity', captionTr: 'Üç ilgililik seviyesi — ilgisiz (~0,148), ilgili (~0,406) ve yeniden-ifade (~0,844) ortalama benzerlik' },
      { src: '/projects/tr-sts-dataset/composition.svg', caption: 'Composition — 1,037 pairs (933 train / 104 test), 38 manual + 999 synthetic across 9 news domains', captionTr: 'Bileşim — 1.037 çift (933 eğitim / 104 test), 9 haber alanında 38 elle + 999 sentetik' },
    ],
    overview:
      'A semantic textual similarity (STS) dataset for Turkish, built to fix a common gap: most similarity data is paraphrase-heavy, which teaches a model to spot rewordings but not to judge how unrelated two sentences are. This set deliberately spans the whole spectrum — a large number of near-zero pairs, a band of same-topic-but-different-event pairs, and true paraphrases — so a downstream system can actually calibrate a similarity threshold rather than guess one. It is published on the Hugging Face Hub as gorkemergune/stsb-tr.',
    overviewTr:
      'Türkçe için bir anlamsal metin benzerliği (STS) veri kümesi; yaygın bir eksiği gidermek için kuruldu: benzerlik verilerinin çoğu yeniden-ifade ağırlıklıdır, bu da modele yeniden ifadeleri yakalamayı öğretir ama iki cümlenin ne kadar ilgisiz olduğunu değerlendirmeyi öğretmez. Bu küme, tüm yelpazeyi bilinçle kapsar — çok sayıda sıfıra yakın çift, aynı-konu-ama-farklı-olay çiftlerinden bir bant ve gerçek yeniden-ifadeler — böylece bir alt sistem bir benzerlik eşiğini tahmin etmek yerine gerçekten kalibre edebilir. Hugging Face Hub’da gorkemergune/stsb-tr olarak yayımlandı.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Frameworks', items: ['SentenceTransformers'] },
      { label: 'Libraries', items: ['NumPy', 'pandas', 'Matplotlib'] },
      { label: 'Publishing', items: ['Hugging Face Hub — gorkemergune/stsb-tr'] },
    ],
    architecture: [
      'The dataset is assembled from two streams. A small, hand-collected set of 38 real Turkish sentence pairs anchors the data in authentic phrasing, and a much larger synthetic generator produces 999 pairs by drawing from templates across nine news domains and three relatedness tiers — unrelated (different topics), related (same topic, different events), and paraphrase (same event, different wording). Every pair is scored with SentenceTransformers using cosine similarity over L2-normalized embeddings, and the pipeline deduplicates before writing the final 933/104 train/test split.',
      'The tiers land where they should: unrelated pairs average about 0.148, related about 0.406, and paraphrases about 0.844, with the overall scores spanning roughly −0.04 to 0.97. That graded spread — especially the deliberately large mass of near-zero pairs — is the whole point: it lets a downstream retriever or verifier choose a threshold from data instead of guessing. The repository is honest about scope: the synthetic sentences are template-generated rather than scraped news, and the scores are model outputs, not human annotations.',
    ],
    architectureTr: [
      'Veri kümesi iki akıştan birleştirilir. Elle toplanmış küçük bir 38 gerçek Türkçe cümle çifti kümesi, veriyi özgün ifadelere demirler; çok daha büyük bir sentetik üretici ise dokuz haber alanı ve üç ilgililik seviyesi — ilgisiz (farklı konular), ilgili (aynı konu, farklı olaylar) ve yeniden-ifade (aynı olay, farklı sözcükler) — arasından şablonlar çekerek 999 çift üretir. Her çift, L2-normalleştirilmiş embedding’ler üzerinde kosinüs benzerliğiyle SentenceTransformers kullanılarak puanlanır ve pipeline, son 933/104 eğitim/test bölmesini yazmadan önce tekilleştirir.',
      'Seviyeler olmaları gereken yere düşer: ilgisiz çiftler ortalama ~0,148, ilgili ~0,406 ve yeniden-ifadeler ~0,844; genel skorlar yaklaşık −0,04 ile 0,97 arasını kapsar. Bu dereceli yayılım — özellikle bilinçle büyük tutulan sıfıra yakın çift kütlesi — asıl meseledir: alt akıştaki bir getirici ya da doğrulayıcının bir eşiği tahmin etmek yerine veriden seçmesine olanak tanır. Depo, kapsam konusunda dürüsttür: sentetik cümleler kazınmış haber değil şablonla üretilmiştir ve skorlar insan işaretlemesi değil, model çıktısıdır.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Turkish similarity data is paraphrase-heavy. That teaches a model to spot rewordings but never to judge how unrelated two sentences are, so there is no evidence base for choosing a retrieval threshold and people guess one.',
    problemTr:
      'Türkçe benzerlik verisi paraphrase ağırlıklı. Bu, modele yeniden ifadeyi tanımayı öğretir ama iki cümlenin ne kadar ilgisiz olduğunu yargılamayı hiç öğretmez; dolayısıyla retrieval eşiği seçmek için kanıt tabanı yoktur ve insanlar tahmin eder.',
    flow: '38 hand-collected pairs + 999 template-generated pairs across 9 news domains and 3 relatedness tiers → SentenceTransformers cosine scoring → deduplicate → 933/104 split → Hub',
    flowTr: 'Elle toplanmış 38 çift + 9 haber alanı ve 3 ilişkililik kademesinde 999 şablon üretimli çift → SentenceTransformers ile kosinüs skorlama → tekilleştirme → 933/104 bölme → Hub',
    metrics: [
      { label: 'Size', value: '1,037 pairs', condition: 'dataset scope — 933 train / 104 test' },
      { label: 'Sources', value: '38 manual + 999 synthetic', condition: 'dataset scope — hand-collected pairs anchor the set in authentic phrasing' },
      { label: 'Tier separation', value: '0.148 / 0.406 / 0.844', condition: 'measured property — mean cosine for unrelated / related / paraphrase' },
      { label: 'Range', value: '−0.04 to 0.97', condition: 'measured property — deliberately weighted toward near-zero pairs' },
      { label: 'Published', value: 'gorkemergune/stsb-tr', condition: 'release scope — on the Hugging Face Hub' },
    ],
    metricsTr: [
      { label: 'Boyut', value: '1.037 çift', condition: 'veri kümesi kapsamı — 933 train / 104 test' },
      { label: 'Kaynak', value: '38 elle + 999 sentetik', condition: 'veri kümesi kapsamı — elle toplanan çiftler kümeyi gerçek ifadelere bağlıyor' },
      { label: 'Kademe ayrışması', value: '0,148 / 0,406 / 0,844', condition: 'ölçülmüş özellik — ilgisiz / ilgili / paraphrase ortalama kosinüsü' },
      { label: 'Aralık', value: '−0,04 ile 0,97', condition: 'ölçülmüş özellik — bilinçli olarak sıfıra yakın çiftlere ağırlık verildi' },
      { label: 'Yayınlandı', value: 'gorkemergune/stsb-tr', condition: 'yayın kapsamı — Hugging Face Hub’da' },
    ],
    useCases: [
      'Calibrating a Turkish retrieval threshold from evidence instead of guessing',
      'Embedding model evaluation',
      'Tuning a RAG gate — which is the need that produced this dataset',
    ],
    useCasesTr: [
      'Türkçe retrieval eşiğini tahminle değil kanıtla kalibre etmek',
      'Embedding modeli değerlendirmesi',
      'Bir RAG gate’ini ayarlamak — bu veri kümesini doğuran ihtiyaç da buydu',
    ],
    decisions: [
      { choice: 'Over-weight the near-zero band instead of building a balanced set', why: 'A downstream system can only pick a threshold if the data actually contains the unrelated cases it will have to reject', tradeoff: 'The set is not a drop-in replacement for a balanced STS benchmark' },
    ],
    decisionsTr: [
      { choice: 'Dengeli bir küme kurmak yerine sıfıra yakın bandı ağırlıklandırmak', why: 'Aşağı akıştaki bir sistem, ancak veri reddetmesi gereken ilgisiz durumları gerçekten içeriyorsa eşik seçebilir', tradeoff: 'Küme, dengeli bir STS benchmark’ının yerine doğrudan konulamaz' },
    ],
    contribution: [
      'The tier design — deliberately over-weighting near-zero pairs so a downstream system can calibrate a threshold from data.',
      'The nine-domain, three-tier generation scheme, the deduplication pipeline, and stating the scope limits in the README before anyone had to ask.',
    ],
    contributionTr: [
      'Kademe tasarımı — aşağı akıştaki bir sistemin eşiği veriden kalibre edebilmesi için sıfıra yakın çiftlerin bilinçli ağırlıklandırılması.',
      'Dokuz alan, üç kademeli üretim şeması, tekilleştirme pipeline’ı ve kapsam sınırlarının kimse sormadan README’de yazılması.',
    ],
    limitations: [
      'Synthetic sentences are cleaner and more regular than natural text, so paraphrase scores are optimistic.',
      'Scores are model outputs, not human annotations. This is not a human-annotated STS benchmark and should not be compared to one.',
    ],
    limitationsTr: [
      'Sentetik cümleler doğal metinden daha temiz ve düzenli, dolayısıyla paraphrase skorları iyimser.',
      'Skorlar insan etiketi değil model çıktısı. Bu, insan etiketli bir STS benchmark’ı değil ve öyle bir şeyle karşılaştırılmamalı.',
    ],
    provenance: 'mixed',
    provenanceNote:
      '999 of 1,037 pairs are template-generated rather than collected, and every similarity score is a model output rather than a human annotation. Both are declared in the repository README.',
    provenanceNoteTr:
      '1.037 çiftin 999’u toplanmış değil şablon üretimi ve her benzerlik skoru insan etiketi değil model çıktısı. İkisi de depo README’sinde beyan edilmiş.',
  },
  {
    slug: 'writing-analyzer',
    category: 'Machine Learning',
    cover: '/projects/writing-analyzer/cover.svg',
    mark: 'MARK XVI',
    codename: 'The Auditor',
    title: 'Writing Analyzer',
    subtitle: 'Extracts six stylometric signals from English and Turkish text and combines them into a weighted risk profile, showing which signal drove which part of it',
    subtitleTr: 'İngilizce ve Türkçe metinden altı stilometrik sinyal çıkarır ve bunları ağırlıklı bir risk profilinde birleştirir; hangi sinyalin hangi kısmı sürüklediğini gösterir',
    oneLiner: 'Bilingual stylometric analyzer — six signals into a 0–100 academic-risk score.',
    oneLinerTr: 'İki dilli stilometrik analiz: altı sinyalden 0–100 arası bir akademik risk skoru.',
    language: 'Python',
    color: '#ff4d6d',
    glow: 'rgba(255,77,109,0.5)',
    tags: ['Stylometry', 'FastAPI', 'Streamlit'],
    github: gh('writing-analyzer'),
    images: [
      { src: '/projects/writing-analyzer/input.png', caption: 'Text input on the Streamlit frontend', captionTr: 'Streamlit arayüzünde metin girişi' },
      { src: '/projects/writing-analyzer/results.png', caption: 'Analysis results — composite risk score, tier, and confidence', captionTr: 'Analiz sonuçları: bileşik risk skoru, seviye ve güven değeri' },
      { src: '/projects/writing-analyzer/writing-profile.png', caption: 'Six-axis writing profile radar', captionTr: 'Altı eksenli yazı profili radarı' },
      { src: '/projects/writing-analyzer/components.png', caption: 'Per-component contribution scores behind the verdict', captionTr: 'Kararın arkasındaki bileşen bazlı katkı puanları' },
      { src: '/projects/writing-analyzer/api-docs.png', caption: 'Auto-generated OpenAPI docs for the analysis API', captionTr: 'Analiz API’si için otomatik üretilen OpenAPI dokümantasyonu' },
    ],
    overview:
      'A writing-quality analysis platform that scores text across six independent linguistic dimensions and aggregates them into a composite Academic Risk Score from 0 to 100. It does not claim AI authorship with certainty — it surfaces evidence-based signals statistically associated with formulaic, repetitive, or low-variance prose. Both English and Turkish are supported natively, including Turkish morphological analysis, for academic integrity support and stylometric research.',
    overviewTr:
      'Metni altı bağımsız dilbilimsel boyutta puanlayan ve bunları 0–100 arası bileşik bir Akademik Risk Skoru’nda birleştiren bir yazı kalitesi analiz platformu. Yapay zekâ yazarlığını kesin olarak iddia etmez; kalıplaşmış, tekrarlı ya da düşük çeşitlilikteki metinlerle istatistiksel olarak ilişkili, kanıta dayalı sinyalleri ortaya koyar. Türkçe biçimbilimsel analiz dahil olmak üzere hem İngilizce hem Türkçe yerel olarak desteklenir; akademik dürüstlük desteği ve stilometrik araştırmalar için tasarlandı.',
    stack: [
      { label: 'Languages', items: ['Python 3.13'] },
      { label: 'Frameworks', items: ['FastAPI', 'Streamlit'] },
      { label: 'Libraries', items: ['Pydantic v2', 'NLTK', 'Zeyrek', 'textstat', 'langdetect', 'Plotly'] },
      { label: 'Tools', items: ['Ruff', 'pre-commit', 'pytest'] },
    ],
    architecture: [
      'Clean architecture with one class per signal: six analyzer modules operate independently on a shared tokenization, produced by a TokenizerService with a LanguageDetector choosing the English or Turkish pipeline. An AnalysisService orchestrates the analyzers and hands their outputs to an AcademicRiskScorer, which applies configurable ScoringWeights and builds per-component contribution scores. Dependencies are wired through lru_cache singletons.',
      'The scoring model is a weighted sum — repetition 0.25, burstiness 0.20, transitions 0.15, lexical poverty 0.15, cliché 0.15, readability 0.10 — mapped to four risk tiers, with confidence saturating at 300 words. The API exposes GET /health and POST /api/v1/analyze; the Streamlit frontend consumes it through a thin api_client.',
    ],
    architectureTr: [
      'Sinyal başına bir sınıf içeren temiz mimari: altı analiz modülü, LanguageDetector’ın İngilizce ya da Türkçe pipeline’ını seçtiği TokenizerService tarafından üretilen ortak tokenizasyon üzerinde bağımsız çalışır. AnalysisService analizcileri yönetir ve çıktılarını, yapılandırılabilir ScoringWeights uygulayan ve bileşen bazlı katkı puanları üreten AcademicRiskScorer’a iletir. Bağımlılıklar lru_cache tekilleriyle bağlanır.',
      'Puanlama modeli ağırlıklı bir toplamdır (tekrar 0,25; ritim 0,20; geçişler 0,15; kelime fakirliği 0,15; klişe 0,15; okunabilirlik 0,10) ve dört risk seviyesine eşlenir; güven değeri 300 kelimede doyuma ulaşır. API, GET /health ve POST /api/v1/analyze endpoint’lerini sunar; Streamlit arayüzü bunu ince bir api_client üzerinden kullanır.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'experimental',
    problem:
      'Academic integrity tools assert that a text was AI-written, which is a claim the evidence does not support. The defensible thing to surface is the stylometric signal itself, not a verdict about authorship.',
    problemTr:
      'Akademik bütünlük araçları bir metnin yapay zekâ tarafından yazıldığını iddia ediyor; oysa kanıt bunu desteklemiyor. Savunulabilir olan şey, yazarlık hakkında bir hüküm değil, stilometrik sinyalin kendisini göstermek.',
    flow: 'Text → language detection → language-specific tokenisation → 6 independent analyzers → weighted scorer (0.25 / 0.20 / 0.15 / 0.15 / 0.15 / 0.10) → 4 risk tiers with per-component contributions',
    flowTr: 'Metin → dil tespiti → dile özgü tokenizasyon → 6 bağımsız analizör → ağırlıklı puanlayıcı (0,25 / 0,20 / 0,15 / 0,15 / 0,15 / 0,10) → bileşen katkılarıyla 4 risk kademesi',
    metrics: [
      { label: 'Signals', value: '6 orthogonal dimensions', condition: 'system scope — repetition, transitions, burstiness, readability, cliché density, lexical poverty' },
      { label: 'Test suite', value: '28 test files · 12,391 lines', condition: 'validation scope — counted in the repository, 12 September 2026' },
      { label: 'Languages', value: 'English and Turkish', condition: 'system scope — Zeyrek morphology for Turkish, Porter stemming for English' },
    ],
    metricsTr: [
      { label: 'Sinyal', value: '6 bağımsız boyut', condition: 'sistem kapsamı — tekrar, geçiş kelimeleri, burstiness, okunabilirlik, klişe yoğunluğu, sözcük yoksulluğu' },
      { label: 'Test paketi', value: '28 test dosyası · 12.391 satır', condition: 'doğrulama kapsamı — 12 Eylül 2026’da depoda sayıldı' },
      { label: 'Dil', value: 'İngilizce ve Türkçe', condition: 'sistem kapsamı — Türkçe için Zeyrek morfolojisi, İngilizce için Porter stemming' },
    ],
    useCases: [
      'Stylometric research',
      'Editorial tooling for surfacing repetition and low sentence-length variance',
    ],
    useCasesTr: [
      'Stilometri araştırması',
      'Tekrarı ve düşük cümle uzunluğu değişkenliğini görünür kılan editoryal araçlar',
    ],
    decisions: [
      { choice: 'Refuse to assert authorship and report a probabilistic risk profile instead', why: 'The evidence supports a signal, not a verdict, and the repository README says so explicitly', tradeoff: 'The output is harder to act on than a yes/no answer, which is the honest trade' },
    ],
    decisionsTr: [
      { choice: 'Yazarlık hükmü vermeyi reddedip yerine olasılıksal bir risk profili raporlamak', why: 'Kanıt bir sinyali destekliyor, bir hükmü değil; depo README’si de bunu açıkça söylüyor', tradeoff: 'Çıktıyı eyleme dökmek evet/hayır cevabından daha zor — dürüst takas bu' },
    ],
    contribution: [
      'The six signals, their weighting, and building each analyzer to operate independently over a shared tokenisation.',
      'The Turkish morphological pipeline, which is the part with no off-the-shelf equivalent.',
      'Diagnosing the scoring ceiling and writing it up in docs/diagnostics.md rather than leaving it for someone else to find.',
    ],
    contributionTr: [
      'Altı sinyal, ağırlıklandırmaları ve her analizörün ortak bir tokenizasyon üzerinde bağımsız çalışacak şekilde kurulması.',
      'Türkçe morfoloji hattı — hazır karşılığı olmayan kısım burası.',
      'Puanlama tavanının teşhis edilip başkasının bulmasına bırakılmak yerine docs/diagnostics.md içinde yazıya dökülmesi.',
    ],
    limitations: [
      'There is no validation set. The benchmark folder holds four sample texts — two human, two LLM — and no measured result is committed.',
      'docs/diagnostics.md works out that the weighted sum structurally cannot exceed roughly 24.5 on typical AI text against a MODERATE threshold of 30, so the composite score does not currently separate the classes it was built to separate.',
      'The six weights are hand-set, not fitted to data.',
    ],
    limitationsTr: [
      'Doğrulama kümesi yok. benchmark klasöründe dört örnek metin var — ikisi insan, ikisi LLM — ve commit edilmiş hiçbir ölçüm sonucu yok.',
      'docs/diagnostics.md, ağırlıklı toplamın tipik yapay zekâ metninde yapısal olarak yaklaşık 24,5’i geçemediğini, MODERATE eşiğinin ise 30 olduğunu hesaplıyor; dolayısıyla bileşik skor şu an ayırmak için kurulduğu sınıfları ayırmıyor.',
      'Altı ağırlık veriye uydurulmadı, elle belirlendi.',
    ],
  },
  {
    slug: 'depression-phq9-analysis',
    unverified: [
      'metric — \'~100 live participants\' has no record in the repository: the README describes pilot scale as 10-50+ and the committed dashboard is from a run labelled \'Ornek Data\'. Deliberately NOT carried into metrics. The legacy metric field still renders on the card until the render migration.',
      'Consent, ethics approval and anonymisation are absent from the repository; participant name is used as participant id (response_fetcher.py:86).',
    ],

    category: 'Research & Benchmarks',
    cover: '/projects/depression-phq9-analysis/cover.svg',
    mark: 'MARK XVII',
    codename: 'Vitals',
    title: 'PHQ-9 Depression Analysis',
    subtitle: 'A real screening study end to end: collect the responses, score them clinically, then see what ML actually adds',
    subtitleTr: 'Uçtan uca gerçek bir tarama çalışması: yanıtları topla, klinik olarak puanla, sonra makine öğrenmesinin ne kattığını gör',
    oneLiner: 'End-to-end PHQ-9 screening — Google Forms, clinical scoring, and six ML models.',
    oneLinerTr: 'Uçtan uca PHQ-9 taraması: Google Forms, klinik puanlama ve altı makine öğrenmesi modeli.',
    language: 'Python',
    color: '#00e5a0',
    glow: 'rgba(0,229,160,0.5)',
    tags: ['PHQ-9', 'scikit-learn', 'Data Analysis'],
    github: gh('depression-phq9-analysis'),
    images: [
      { src: '/projects/depression-phq9-analysis/dashboard.png', caption: 'Interactive Plotly dashboard — aggregate charts (demo data)', captionTr: 'Etkileşimli Plotly panosu: toplu grafikler (demo verisi)' },
      { src: '/projects/depression-phq9-analysis/stats.png', caption: 'Statistical analysis overview', captionTr: 'İstatistiksel analiz özeti' },
      { src: '/projects/depression-phq9-analysis/scores.png', caption: 'PHQ-9 score distribution and severity classification', captionTr: 'PHQ-9 skor dağılımı ve şiddet sınıflandırması' },
      { src: '/projects/depression-phq9-analysis/radar.png', caption: 'Participant profile radar chart', captionTr: 'Katılımcı profili radar grafiği' },
      { src: '/projects/depression-phq9-analysis/model-comparison.png', caption: 'Six ML models compared on the demo cohort', captionTr: 'Demo grubu üzerinde karşılaştırılan altı makine öğrenmesi modeli' },
      { src: '/projects/depression-phq9-analysis/correlation-heatmap.png', caption: 'Question-level correlation heatmap', captionTr: 'Soru bazlı korelasyon ısı haritası' },
      { src: '/projects/depression-phq9-analysis/score-histogram.png', caption: 'Score histogram with severity thresholds', captionTr: 'Şiddet eşikleriyle skor histogramı' },
    ],
    overview:
      'A depression screening and analysis system built around an extended 15-question PHQ-9 scale. It creates and distributes the questionnaire through Google Forms, fetches responses via API, performs clinical scoring with severity classification, runs six machine-learning models, applies formal statistical testing, and generates interactive dashboards plus per-participant PDF reports. Built for pilot-study research settings; strictly educational and research use.',
    overviewTr:
      'Genişletilmiş 15 soruluk PHQ-9 ölçeği etrafında kurulmuş bir depresyon tarama ve analiz sistemi. Anketi Google Forms üzerinden oluşturup dağıtır, yanıtları API ile çeker, şiddet sınıflandırmalı klinik puanlama yapar, altı makine öğrenmesi modeli çalıştırır, biçimsel istatistiksel testler uygular; etkileşimli panolar ve katılımcı başına PDF raporları üretir. Pilot çalışma niteliğindeki araştırma ortamları için geliştirildi; kullanım amacı kesinlikle eğitim ve araştırmadır.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Libraries', items: ['scikit-learn', 'pandas', 'SciPy', 'Plotly', 'Matplotlib', 'ReportLab'] },
      { label: 'Tools', items: ['Google Forms API', 'Google Sheets API'] },
    ],
    architecture: [
      'main.py is a CLI with four modes: --demo (synthetic pilot run), --anket-olustur (create the Google Form), --sonuclar (fetch responses and analyze), and --full-pipeline (drive everything from a Google Sheet). The source is split by concern: google_forms/ handles form creation and response fetching, analysis/ contains the clinical PHQ-9 scoring engine, the six-model ML module with stratified 5-fold cross-validation, and the statistical test suite, while reporting/ renders the Plotly dashboard, static charts, and PDF reports.',
      'Configuration lives centrally in config/settings.py — PHQ-9 constants, severity thresholds, and the 60/40 clinical/ML ensemble weighting — so the scoring rules are auditable in one place.',
    ],
    architectureTr: [
      'main.py dört modlu bir komut satırı aracıdır: --demo (sentetik pilot çalışma), --anket-olustur (Google Form oluşturma), --sonuclar (yanıtları çekip analiz etme) ve --full-pipeline (her şeyi bir Google Sheet üzerinden yürütme). Kaynak kod sorumluluklara göre ayrılmıştır: google_forms/ form oluşturma ve yanıt çekmeyi üstlenir; analysis/ klinik PHQ-9 puanlama motorunu, katmanlı 5 katlı çapraz doğrulamalı altı modelli ML modülünü ve istatistiksel test paketini içerir; reporting/ ise Plotly panosunu, statik grafikleri ve PDF raporlarını üretir.',
      'Yapılandırma (PHQ-9 sabitleri, şiddet eşikleri ve 60/40 klinik/ML topluluk ağırlığı) merkezî olarak config/settings.py içindedir; böylece puanlama kuralları tek bir yerden denetlenebilir.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'archived',
    tier: 'research',
    problem:
      'Clinical scoring and machine learning are usually discussed separately in screening. An end-to-end setup that runs both over the same responses, and reports what ML actually adds, is harder to find than it should be.',
    problemTr:
      'Taramada klinik puanlama ve makine öğrenmesi genelde ayrı ayrı konuşulur. İkisini aynı yanıtlar üzerinde koşturan ve makine öğrenmesinin gerçekte ne kattığını raporlayan uçtan uca bir kurulum, olması gerekenden zor bulunuyor.',
    flow: 'Google Forms → API fetch → clinical PHQ-9 scoring with severity tiers → 6 ML models, stratified 5-fold → statistical tests → Plotly dashboard and per-participant PDFs',
    flowTr: 'Google Forms → API ile çekme → şiddet kademeleriyle klinik PHQ-9 puanlaması → 6 makine öğrenmesi modeli, katmanlı 5 katlı → istatistik testleri → Plotly panosu ve katılımcı başına PDF',
    metrics: [
      { label: 'Scale', value: '15-question extended PHQ-9', condition: 'instrument scope — maximum score 45, 5 severity tiers' },
      { label: 'Models', value: '6 + weighted ensemble', condition: 'analysis scope — K-Means, Random Forest, Logistic Regression, SVM, Decision Tree, Naive Bayes; 60% clinical / 40% ML' },
      { label: 'Validation', value: 'stratified 5-fold', condition: 'analysis scope — the README states the system is tuned for pilot sizes of 10–50+ participants' },
      { label: 'Statistical tests', value: '95% CI, Shapiro-Wilk, Pearson/Spearman, t-test / Mann-Whitney U', condition: 'analysis scope' },
    ],
    metricsTr: [
      { label: 'Ölçek', value: '15 soruluk genişletilmiş PHQ-9', condition: 'araç kapsamı — en yüksek skor 45, 5 şiddet kademesi' },
      { label: 'Model', value: '6 + ağırlıklı topluluk', condition: 'analiz kapsamı — K-Means, Random Forest, Logistic Regression, SVM, Decision Tree, Naive Bayes; %60 klinik / %40 makine öğrenmesi' },
      { label: 'Doğrulama', value: 'katmanlı 5 katlı', condition: 'analiz kapsamı — README sistemin 10–50+ katılımcılık pilot ölçekler için ayarlandığını söylüyor' },
      { label: 'İstatistik testleri', value: '%95 GA, Shapiro-Wilk, Pearson/Spearman, t-testi / Mann-Whitney U', condition: 'analiz kapsamı' },
    ],
    useCases: [
      'Pilot screening studies',
      'Research data collection pipelines',
    ],
    useCasesTr: [
      'Pilot tarama çalışmaları',
      'Araştırma veri toplama pipeline’ları',
    ],
    contribution: [
      'The end-to-end study design: form construction, distribution, the clinical scoring rules, the 60/40 ensemble weighting and the choice of statistical tests.',
      'Centralising the PHQ-9 constants, severity thresholds and ensemble weights in one settings module so the scoring rules are auditable in one place, plus a demo mode that runs the full pipeline on 30 synthetic participants with no Google credentials.',
    ],
    contributionTr: [
      'Uçtan uca çalışma tasarımı: form kurulumu, dağıtım, klinik puanlama kuralları, %60/%40 topluluk ağırlıklandırması ve istatistik testlerinin seçimi.',
      'PHQ-9 sabitlerinin, şiddet eşiklerinin ve topluluk ağırlıklarının tek bir ayar modülünde toplanması — böylece puanlama kuralları tek yerden denetlenebiliyor — ve Google kimlik bilgisi olmadan tüm pipeline’ı 30 sentetik katılımcıyla koşturan demo modu.',
    ],
    limitations: [
      'Consent, ethics approval and anonymisation are not addressed in the repository, and participant name is used directly as the participant id.',
      'This is a screening instrument, not a diagnostic tool, and nothing it produces should be read as a diagnosis.',
      'No test suite.',
    ],
    limitationsTr: [
      'Onam, etik kurul onayı ve anonimleştirme depoda ele alınmıyor ve katılımcı adı doğrudan katılımcı kimliği olarak kullanılıyor.',
      'Bu bir tarama aracı, tanı aracı değil; ürettiği hiçbir şey tanı olarak okunmamalı.',
      'Test paketi yok.',
    ],
  },
  {
    slug: 'email-phishing-detection',
    category: 'Machine Learning',
    cover: '/projects/email-phishing-detection/cover.svg',
    mark: 'MARK XVIII',
    codename: 'The Gatekeeper',
    title: 'Email Phishing Detection',
    subtitle: 'Flags phishing from the text alone, with a model simple enough to audit line by line',
    subtitleTr: 'Oltalamayı yalnızca metinden yakalar; model satır satır denetlenebilecek kadar basit',
    oneLiner: 'Urgency and impersonation leave a fingerprint in the words, and TF-IDF is enough to read it.',
    oneLinerTr: 'Aciliyet ve taklit, kelimelerde bir parmak izi bırakır; bunu okumak için TF-IDF yetiyor.',
    language: 'Python',
    color: '#7c5cff',
    glow: 'rgba(124,92,255,0.5)',
    tags: ['TF-IDF', 'Logistic Regression', 'Text Classification'],
    github: gh('email-phishing-detection'),
    // Field Notes — migrated verbatim from caseStudies.js (12 Sep 2026).
    challenges: [
      'The interesting tension was resisting the urge to reach for a heavyweight model. The honest experiment was to show that a simple model on the right features beats a fancier one on the wrong features.',
      'Keeping the evaluation honest — stratified splits, a fixed seed, and being explicit that 0.99 F1 reflects this dataset, not live adversarial email — mattered as much as the accuracy.',
    ],
    challengesTr: [
      'İlginç gerilim, ağır sıklet bir modele uzanma dürtüsüne direnmekti. Dürüst deney, doğru özellikler üzerindeki basit bir modelin yanlış özellikler üzerindeki gösterişli bir modeli yendiğini göstermekti.',
      'Değerlendirmeyi dürüst tutmak — katmanlı bölme, sabit tohum ve 0,99 F1’in canlı düşmanca e-postayı değil bu veri kümesini yansıttığını açıkça belirtmek — en az doğruluk kadar önemliydi.',
    ],
    lessons: [
      'Reach for the simplest model that could work, and spend your energy on the features.',
      'The representation of your data often matters more than the sophistication of your model.',
    ],
    lessonsTr: [
      'İşe yarayabilecek en basit modele uzan ve enerjini özelliklere harca.',
      'Verinin temsili çoğu zaman modelin karmaşıklığından daha çok şey ifade eder.',
    ],
    images: [
      { src: '/projects/email-phishing-detection/class-distribution.png', caption: 'Class balance in the CEAS_08 corpus — roughly 56% phishing', captionTr: 'CEAS_08 derlemindeki sınıf dengesi: yaklaşık %56 oltalama' },
      { src: '/projects/email-phishing-detection/signal-words.png', caption: 'Signal words — how often terms like “verify”, “account”, and “click” appear in phishing vs safe mail', captionTr: 'Sinyal kelimeler: “verify”, “account”, “click” gibi terimlerin oltalama ve güvenli postada görülme sıklığı' },
      { src: '/projects/email-phishing-detection/feature-averages.png', caption: 'Average of the 8 hand-crafted numerical features, phishing vs safe', captionTr: 'Elle çıkarılmış 8 sayısal özelliğin ortalaması, oltalama ve güvenli karşılaştırması' },
      { src: '/projects/email-phishing-detection/confusion-matrix.png', caption: 'Confusion matrix on the 20% held-out test set', captionTr: '%20’lik ayrılmış test kümesinde karışıklık matrisi' },
      { src: '/projects/email-phishing-detection/roc-curve.png', caption: 'ROC curve — near-perfect separation on this dataset', captionTr: 'ROC eğrisi: bu veri kümesinde neredeyse kusursuz ayrım' },
    ],
    overview:
      'An educational machine-learning project built for a university presentation and shipped as a fully documented notebook in both English and Turkish. It walks through the entire workflow step by step — cleaning, vectorization, training, evaluation, and live prediction — and deliberately compares raw-text features against a handful of hand-crafted numerical ones to show why the representation of the data matters as much as the model.',
    overviewTr:
      'Bir üniversite sunumu için hazırlanan ve hem İngilizce hem Türkçe olarak, baştan sona belgelenmiş bir not defteri biçiminde yayınlanan eğitim amaçlı bir makine öğrenmesi projesi. Temizleme, vektörleştirme, eğitim, değerlendirme ve canlı tahmin dahil tüm iş akışını adım adım anlatır; ham metin özelliklerini birkaç elle çıkarılmış sayısal özellikle bilinçli olarak karşılaştırarak, verinin temsilinin en az model kadar önemli olduğunu gösterir.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Libraries', items: ['scikit-learn', 'pandas', 'NumPy', 'Matplotlib', 'kagglehub'] },
      { label: 'Tools', items: ['Jupyter Notebook'] },
    ],
    architecture: [
      'The project lives in a single linear notebook, mirrored in English (eng.ipynb) and Turkish (tr.ipynb). Raw email text from the CEAS_08 dataset (~39,000 emails, ~56% phishing) is cleaned, then transformed by a TfidfVectorizer into thousands of weighted word and bigram features. The data is split 80/20 with stratification and a fixed seed, and a LogisticRegression classifier is trained and evaluated with accuracy, precision, recall, F1, a confusion matrix, and an ROC curve.',
      'A second, ~525,000-row dataset — carrying only 8 pre-extracted numerical features and no raw text — is used purely for contrast: because text-based steps like tokenization and TF-IDF cannot apply to it, comparing the two representations is itself the lesson. Datasets download automatically through kagglehub, and the final cell classifies any email text pasted into a variable, returning a phishing probability.',
    ],
    architectureTr: [
      'Proje, İngilizce (eng.ipynb) ve Türkçe (tr.ipynb) olarak iki dilde yansıtılan tek bir doğrusal not defterinde yaşar. CEAS_08 veri kümesinden (~39.000 e-posta, ~%56 oltalama) gelen ham e-posta metni temizlenir, ardından bir TfidfVectorizer ile binlerce ağırlıklı kelime ve ikili öbek özelliğine dönüştürülür. Veri, katmanlı ve sabit tohumlu biçimde %80/%20 bölünür; bir LogisticRegression sınıflandırıcı eğitilir ve doğruluk, kesinlik, duyarlılık, F1, karışıklık matrisi ve ROC eğrisiyle değerlendirilir.',
      'Yalnızca 8 önceden çıkarılmış sayısal özellik taşıyan, ham metni olmayan ~525.000 satırlık ikinci bir veri kümesi ise sırf karşılaştırma için kullanılır: tokenizasyon ve TF-IDF gibi metin tabanlı adımlar buna uygulanamadığından, iki temsili karşılaştırmanın kendisi bir derstir. Veri kümeleri kagglehub ile otomatik indirilir ve son hücre, bir değişkene yapıştırılan herhangi bir e-posta metnini sınıflandırarak oltalama olasılığı döndürür.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Phishing leans on a recognisable vocabulary of urgency and impersonation. The interesting question is not which classifier wins, but how much the representation of the data decides the outcome before a model is even chosen.',
    problemTr:
      'Phishing, tanınabilir bir aciliyet ve taklit sözcük dağarcığına yaslanır. İlginç soru hangi sınıflandırıcının kazandığı değil, veri temsilinin daha model seçilmeden sonucu ne kadar belirlediğidir.',
    flow: 'Raw CEAS_08 text → clean → TF-IDF over words and bigrams → stratified 80/20 → Logistic Regression → accuracy, precision, recall, F1, confusion matrix, ROC',
    flowTr: 'Ham CEAS_08 metni → temizleme → kelime ve bigram üzerinde TF-IDF → katmanlı 80/20 → Logistic Regression → doğruluk, kesinlik, duyarlılık, F1, karışıklık matrisi, ROC',
    metrics: [
      { label: 'Representation comparison', value: '0.99 vs 0.68 F1', condition: 'model performance — raw-text TF-IDF versus 8 hand-crafted numerical features, same classifier family' },
      { label: 'Text model', value: '0.99 F1', condition: 'model performance — held-out 20% of CEAS_08, ~39,000 emails, ~56% phishing' },
      { label: 'Precision / Recall', value: '0.99 / 1.00', condition: 'model performance — same held-out split' },
      { label: 'Datasets', value: '~39K + 525K rows', condition: 'dataset scope — CEAS_08 raw text, plus a feature-only set used purely for contrast' },
    ],
    metricsTr: [
      { label: 'Temsil karşılaştırması', value: '0,99 — 0,68 F1', condition: 'model performansı — ham metin TF-IDF ve elle üretilmiş 8 sayısal özellik, aynı sınıflandırıcı ailesi' },
      { label: 'Metin modeli', value: '0,99 F1', condition: 'model performansı — CEAS_08’in ayrılmış %20’si, ~39.000 e-posta, ~%56 phishing' },
      { label: 'Kesinlik / Duyarlılık', value: '0,99 / 1,00', condition: 'model performansı — aynı ayrılmış bölüm' },
      { label: 'Veri kümeleri', value: '~39B + 525B satır', condition: 'veri kümesi kapsamı — CEAS_08 ham metin, artı yalnızca karşıtlık için kullanılan özellik-only küme' },
    ],
    useCases: [
      'Text classification where the model has to stay auditable',
    ],
    useCasesTr: [
      'Modelin denetlenebilir kalması gereken metin sınıflandırması',
    ],
    contribution: [
      'Making the representation comparison the centre of the experiment rather than reporting a single score.',
      'Mirroring the whole notebook in English and Turkish, and being explicit that 0.99 reflects this dataset rather than live adversarial email. scikit-learn and both datasets are off the shelf.',
    ],
    contributionTr: [
      'Tek bir skor raporlamak yerine temsil karşılaştırmasını deneyin merkezine koymak.',
      'Notebook’un tamamının İngilizce ve Türkçe olarak aynalanması ve 0,99’un canlı düşmanca e-postayı değil bu veri kümesini yansıttığının açıkça yazılması. scikit-learn ve her iki veri kümesi hazır.',
    ],
    limitations: [
      '0.99 F1 is on a static academic dataset. Live phishing is adversarial and drifts; this number will not survive contact with it.',
      'The two datasets are not comparable like for like — the 525K set carries no raw text at all, which is the lesson but also a confound.',
    ],
    limitationsTr: [
      '0,99 F1 statik bir akademik veri kümesinde. Canlı phishing düşmanca ve sürekli değişiyor; bu sayı onunla temasta ayakta kalmaz.',
      'İki veri kümesi birebir karşılaştırılabilir değil — 525 binlik kümede hiç ham metin yok; ders de bu, karıştırıcı etken de bu.',
    ],
  },
  {
    slug: 'gorkem-os',
    category: 'Systems & Graphics',
    cover: '/projects/gorkem-os/cover.svg',
    mark: 'MARK XIX',
    codename: 'Bare Metal',
    title: 'GorkemOS',
    subtitle: 'A bootable x86 operating system written from the boot sector up to its own shell, in C and NASM assembly',
    subtitleTr: 'Boot sektöründen kendi shell’ine kadar sıfırdan yazılmış, C ve NASM assembly ile önyüklenebilir bir x86 işletim sistemi',
    oneLiner: 'Boots on bare x86 and reaches its own shell — bootloader, paging, scheduler, and drivers all written from nothing.',
    oneLinerTr: 'Çıplak x86’da açılıp kendi kabuğuna ulaşır — bootloader, sayfalama, zamanlayıcı ve sürücüler sıfırdan yazıldı.',
    language: 'C',
    color: '#ff6b35',
    glow: 'rgba(255,107,53,0.5)',
    tags: ['x86', 'Bare Metal', 'QEMU'],
    github: gh('gorkem-os'),
    // Field Notes — migrated verbatim from caseStudies.js (12 Sep 2026).
    challenges: [
      'At this level the machine does exactly what you say, even when it makes no sense — a wrong pointer or a mis-set descriptor triple-faults the whole system with no stack trace.',
      'Getting interrupts, paging, and context switching to cooperate required reasoning about the hardware directly, with QEMU and GDB as the only windows in.',
    ],
    challengesTr: [
      'Bu seviyede makine, anlamsız olsa bile tam olarak söylediğini yapar — yanlış bir işaretçi ya da hatalı kurulmuş bir tanımlayıcı, hiçbir yığın izi olmadan tüm sistemi triple-fault yapar.',
      'Kesmeleri, sayfalamayı ve bağlam değiştirmeyi uyumlu çalıştırmak, tek pencerelerin QEMU ve GDB olduğu bir ortamda donanım hakkında doğrudan akıl yürütmeyi gerektirdi.',
    ],
    lessons: [
      'Building the abstraction yourself is the fastest way to stop treating it as magic.',
      'Low-level systems reward patience and precision — the feedback is brutal, but the mental model you build is permanent.',
    ],
    lessonsTr: [
      'Soyutlamayı kendin inşa etmek, onu sihir gibi görmeyi bırakmanın en hızlı yoludur.',
      'Düşük seviye sistemler sabrı ve titizliği ödüllendirir — geri bildirim acımasızdır ama kurduğun zihinsel model kalıcıdır.',
    ],
    images: [
      { src: '/projects/gorkem-os/boot.png', caption: 'Kernel boot sequence in QEMU — subsystems initializing', captionTr: 'QEMU’da çekirdek açılış dizisi: alt sistemler başlatılıyor' },
      { src: '/projects/gorkem-os/shell-help.png', caption: 'Interactive shell — built-in command list', captionTr: 'Etkileşimli kabuk ve yerleşik komut listesi' },
      { src: '/projects/gorkem-os/sysinfo.png', caption: 'sysinfo — CPU, memory, and uptime reported by the kernel', captionTr: 'sysinfo: çekirdeğin raporladığı işlemci, bellek ve çalışma süresi' },
      { src: '/projects/gorkem-os/memory.png', caption: 'Memory manager stats — physical frames, paging, kernel heap', captionTr: 'Bellek yöneticisi istatistikleri: fiziksel çerçeveler, sayfalama, çekirdek yığını' },
      { src: '/projects/gorkem-os/snake.png', caption: 'Snake running on bare metal, VGA text mode', captionTr: 'Doğrudan donanım üzerinde çalışan Snake, VGA metin modu' },
    ],
    overview:
      'A hobby operating system for the x86 architecture, written in C and NASM Assembly as a learning project to understand how computers work at the lowest level — from the first boot sector instruction to a running shell. Everything is built by hand, guided by the OSDev Wiki and the Intel Software Developer Manual.',
    overviewTr:
      'Bilgisayarların en alt seviyede nasıl çalıştığını anlamak amacıyla C ve NASM Assembly ile yazılmış, x86 mimarisi için hobi amaçlı bir işletim sistemi. İlk önyükleme sektörü komutundan çalışan bir kabuğa kadar her şey, OSDev Wiki ve Intel Yazılım Geliştirici Kılavuzu rehberliğinde elle inşa edildi.',
    stack: [
      { label: 'Languages', items: ['C', 'x86 Assembly (NASM)'] },
      { label: 'Tools', items: ['i686-elf-gcc cross-compiler', 'NASM', 'QEMU', 'GNU Make', 'GDB'] },
    ],
    architecture: [
      'The NASM bootloader loads the kernel image from disk and jumps to a small assembly entry stub that hands control to the C kernel. The kernel then installs the GDT and IDT, remaps the PIC, and wires ISR stubs to C handlers for exceptions, the timer, and the keyboard.',
      'Memory is managed in layers: a physical memory manager hands out frames, paging maps virtual addresses, and a kernel heap sits on top for dynamic allocation. Processes are scheduled by a timer-driven scheduler whose context switch is written in assembly (switch.asm). Drivers for VGA text output, keyboard input, the PIT, and ATA disk access support the upper layers: the custom GorkemFS file system and the interactive shell — which can also launch Snake.',
    ],
    architectureTr: [
      'NASM bootloader çekirdek imajını diskten yükler ve kontrolü C çekirdeğine devreden küçük bir Assembly giriş koduna atlar. Çekirdek ardından GDT ve IDT’yi kurar, PIC’i yeniden eşler ve istisnalar, zamanlayıcı ve klavye için ISR köprülerini C işleyicilerine bağlar.',
      'Bellek katmanlar hâlinde yönetilir: fiziksel bellek yöneticisi çerçeve dağıtır, sayfalama sanal adresleri eşler, en üstte de dinamik ayırma için çekirdek yığını bulunur. Süreçler, bağlam değiştirmesi Assembly ile yazılmış (switch.asm) zamanlayıcı güdümlü bir görev zamanlayıcı tarafından çalıştırılır. VGA metin çıkışı, klavye girişi, PIT ve ATA disk erişimi sürücüleri üst katmanları besler: özel GorkemFS dosya sistemi ve Snake’i de başlatabilen etkileşimli kabuk.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Everything that has to happen before your first line of code runs — the boot sector, interrupt tables, paging, a scheduler — stays abstract until you write it yourself.',
    problemTr:
      'İlk satır kodun çalışmasından önce olması gereken her şey — boot sektörü, kesme tabloları, sayfalama, bir zamanlayıcı — sen yazana kadar soyut kalır.',
    flow: 'NASM bootloader → assembly entry stub → C kernel → GDT/IDT + PIC remap → physical memory manager → paging → kernel heap → timer-driven scheduler → drivers → GorkemFS → shell',
    flowTr: 'NASM bootloader → assembly giriş kodu → C kernel → GDT/IDT + PIC yeniden eşleme → fiziksel bellek yöneticisi → sayfalama → kernel heap → zamanlayıcı → sürücüler → GorkemFS → shell',
    metrics: null,
    metricsTr: null,
    useCases: [],
    useCasesTr: [],
    decisions: [
      { choice: 'Layered memory management — frame allocator, then paging, then heap', why: 'Each layer is testable against the one below and mirrors how real kernels are structured', tradeoff: 'A lot of code has to exist before anything visible runs' },
    ],
    decisionsTr: [
      { choice: 'Katmanlı bellek yönetimi — önce çerçeve ayırıcı, sonra sayfalama, sonra heap', why: 'Her katman altındakine karşı test edilebilir ve gerçek çekirdeklerin yapısını yansıtır', tradeoff: 'Görünür hiçbir şey çalışmadan önce çok fazla kodun var olması gerekir' },
    ],
    contribution: [
      'All of it: bootloader, interrupt infrastructure, physical memory manager, paging, kernel heap, scheduler with assembly context switching, VGA / keyboard / PIT / ATA drivers, a custom file system, a shell, and Snake on bare metal. The OSDev Wiki and the Intel manual are references, not code.',
    ],
    contributionTr: [
      'Tamamı: bootloader, kesme altyapısı, fiziksel bellek yöneticisi, sayfalama, kernel heap, assembly bağlam değiştirmeli zamanlayıcı, VGA / klavye / PIT / ATA sürücüleri, kendi dosya sistemi, bir shell ve bare metal üzerinde Snake. OSDev Wiki ve Intel kılavuzu referans, kod değil.',
    ],
    limitations: [
      'Runs under QEMU. No real-hardware validation is claimed.',
    ],
    limitationsTr: [
      'QEMU altında çalışıyor. Gerçek donanımda doğrulama iddiası yok.',
    ],
  },
  {
    slug: 'build-your-target-body',
    category: 'Apps & Tools',
    cover: '/projects/build-your-target-body/cover.svg',
    mark: 'MARK XX',
    codename: 'Body Forge',
    title: 'Build Your Target Body',
    subtitle: 'Tracks the whole picture of a body transformation and tells you when you will actually get there',
    subtitleTr: 'Bir vücut dönüşümünün bütün resmini takip eder ve hedefe gerçekte ne zaman varacağını söyler',
    oneLiner: 'Full-stack fitness tracker with a Gemini coach and goal ETA — installable PWA.',
    oneLinerTr: 'Gemini koçlu ve hedef tahminli full-stack fitness takipçisi; PWA olarak kurulabilir.',
    language: 'TypeScript',
    color: '#00ff88',
    glow: 'rgba(0,255,136,0.5)',
    tags: ['Next.js', 'FastAPI', 'Gemini', 'PWA'],
    github: gh('build-your-target-body'),
    images: [
      { src: '/projects/build-your-target-body/dashboard.png', caption: 'Analytics dashboard — weight trend, goal progress, ETA', captionTr: 'Analiz panosu: kilo eğilimi, hedef ilerlemesi, tahmini bitiş' },
      { src: '/projects/build-your-target-body/weight-tracking.png', caption: 'Daily weight log with trend chart and weekly averages', captionTr: 'Eğilim grafiği ve haftalık ortalamalarla günlük kilo kaydı' },
      { src: '/projects/build-your-target-body/nutrition.png', caption: 'Nutrition tracking — daily macros and 30-day calorie trend', captionTr: 'Beslenme takibi: günlük makrolar ve 30 günlük kalori eğilimi' },
      { src: '/projects/build-your-target-body/workouts.png', caption: 'Workout logging with volume analytics', captionTr: 'Hacim analiziyle antrenman kaydı' },
      { src: '/projects/build-your-target-body/goals.png', caption: 'Goal setup — four modes with progress engine', captionTr: 'Hedef kurulumu: ilerleme motorlu dört mod' },
      { src: '/projects/build-your-target-body/ai-coach.jpg', caption: 'Gemini AI coach answering with full user data as context', captionTr: 'Tüm kullanıcı verisini bağlam olarak kullanan Gemini yapay zekâ koçu' },
      { src: '/projects/build-your-target-body/mobile.png', caption: 'Mobile view — installable PWA', captionTr: 'Mobil görünüm: kurulabilir PWA' },
    ],
    overview:
      'A body transformation tracker built for Turkish users with full English support. It tracks weight, body fat, eight body measurements, daily macros, and workouts; visualizes trends; and computes an estimated completion date for the user’s goal. A Gemini-powered coach answers questions with the user’s complete data as context, and the whole app installs as a PWA with offline support.',
    overviewTr:
      'Türk kullanıcılar için geliştirilen, tam İngilizce desteğine sahip bir vücut dönüşüm takipçisi. Kilo, vücut yağı, sekiz vücut ölçüsü, günlük makrolar ve antrenmanları takip eder; eğilimleri görselleştirir ve kullanıcının hedefi için tahmini bir tamamlanma tarihi hesaplar. Gemini destekli koç, kullanıcının tüm verisini bağlam olarak kullanarak soruları yanıtlar; uygulamanın tamamı da çevrimdışı destekli bir PWA olarak kurulabilir.',
    stack: [
      { label: 'Languages', items: ['TypeScript', 'Python'] },
      { label: 'Frameworks', items: ['Next.js', 'React', 'FastAPI', 'Tailwind CSS'] },
      { label: 'Libraries', items: ['next-intl'] },
      { label: 'Tools', items: ['PostgreSQL', 'Docker Compose', 'Alembic', 'JWT auth', 'Sentry (optional)'] },
      { label: 'AI Models', items: ['Google Gemini API'] },
    ],
    architecture: [
      'A three-service Docker Compose stack: a Next.js frontend (PWA with service worker and offline page), a FastAPI backend with JWT authentication and Alembic-managed PostgreSQL schema, and the database itself, plus a persisted uploads volume for progress photos. Code is baked into images at build time, with separate dev and production compose files — production runs multiple Uvicorn workers, hides API docs, and keeps the DB port internal.',
      'AI features are isolated behind the Gemini service and degrade gracefully when no API key is set. Operations are scripted: backup.sh dumps the database and archives uploads on a cron schedule, restore.sh rebuilds from any snapshot, and a /health endpoint reports DB, storage, and Gemini status.',
    ],
    architectureTr: [
      'Üç servisli bir Docker Compose yığını: Next.js ön yüzü (service worker ve çevrimdışı sayfalı PWA), JWT kimlik doğrulamalı ve Alembic yönetimli PostgreSQL şemasına sahip FastAPI backend’i ve veritabanının kendisi; ayrıca ilerleme fotoğrafları için kalıcı bir yükleme birimi. Kod, derleme sırasında imajlara gömülür; geliştirme ve üretim için ayrı compose dosyaları vardır. Üretimde birden fazla Uvicorn işçisi çalışır, API dokümantasyonu gizlenir ve veritabanı portu içeride tutulur.',
      'Yapay zekâ özellikleri Gemini servisinin arkasında yalıtılmıştır ve API anahtarı yoksa uygulama sorunsuz çalışmayı sürdürür. Operasyonlar betiklerle yönetilir: backup.sh veritabanını cron takvimiyle döker ve yüklemeleri arşivler, restore.sh herhangi bir anlık görüntüden geri yükler, /health endpoint’i da veritabanı, depolama ve Gemini durumunu raporlar.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Body-transformation tracking is scattered across apps that each own one slice — weight here, macros there, photos somewhere else — and none of them answer the question that actually keeps someone going: when will I get there?',
    problemTr:
      'Vücut dönüşümü takibi, her biri tek bir dilime sahip uygulamalara dağılmış durumda — kilo burada, makrolar şurada, fotoğraflar başka yerde — ve hiçbiri insanı asıl ayakta tutan soruyu cevaplamıyor: oraya ne zaman varacağım?',
    flow: 'Next.js PWA → FastAPI with JWT → PostgreSQL via Alembic → progress engine computes goal ETA and consistency → Gemini service reads full user context, isolated and optional',
    flowTr: 'Next.js PWA → JWT’li FastAPI → Alembic üzerinden PostgreSQL → ilerleme motoru hedef ETA’sını ve tutarlılığı hesaplar → Gemini servisi kullanıcının tüm bağlamını okur, izole ve opsiyonel',
    metrics: [
      { label: 'Codebase', value: '243 source files · 37,210 lines', condition: 'project scope — counted in the repository, 12 September 2026' },
      { label: 'Tracking domains', value: '6', condition: 'feature scope — weight, body fat, 8 measurements, nutrition, workouts, progress photos' },
      { label: 'Goal modes', value: '4', condition: 'feature scope — weight loss, weight gain, recomposition, muscle gain' },
      { label: 'Deployment', value: '3-service Docker Compose', condition: 'operations scope — separate dev and production configs, multiple Uvicorn workers, DB port internal' },
      { label: 'Operations', value: 'daily backup + restore', condition: 'operations scope — cron-scheduled DB dump and uploads archive, /health reports DB, storage and Gemini' },
    ],
    metricsTr: [
      { label: 'Kod tabanı', value: '243 kaynak dosya · 37.210 satır', condition: 'proje kapsamı — 12 Eylül 2026’da depoda sayıldı' },
      { label: 'Takip alanı', value: '6', condition: 'özellik kapsamı — kilo, yağ oranı, 8 ölçü, beslenme, antrenman, ilerleme fotoğrafları' },
      { label: 'Hedef modu', value: '4', condition: 'özellik kapsamı — kilo verme, kilo alma, rekompozisyon, kas kazanımı' },
      { label: 'Dağıtım', value: '3 servisli Docker Compose', condition: 'operasyon kapsamı — ayrı dev ve üretim konfigleri, çoklu Uvicorn işçisi, DB portu içeride' },
      { label: 'Operasyon', value: 'günlük yedek + geri yükleme', condition: 'operasyon kapsamı — cron ile DB dökümü ve yükleme arşivi, /health DB, depolama ve Gemini durumunu bildirir' },
    ],
    useCases: [
      'LLM coaching over a user’s own longitudinal data',
    ],
    useCasesTr: [
      'Kullanıcının kendi uzun dönemli verisi üzerinde LLM koçluğu',
    ],
    decisions: [
      { choice: 'Isolate the Gemini service so the app degrades gracefully without an API key', why: 'Every AI feature is optional, and the core tracker works with no external dependency at all', tradeoff: 'Two code paths to keep working for anything that touches the coach' },
    ],
    decisionsTr: [
      { choice: 'Gemini servisini izole etmek, böylece uygulama API anahtarı olmadan zarifçe küçülüyor', why: 'Her yapay zekâ özelliği opsiyonel ve çekirdek takipçi hiçbir dış bağımlılık olmadan çalışıyor', tradeoff: 'Koça dokunan her şey için iki kod yolunun çalışır tutulması gerekiyor' },
    ],
    contribution: [
      'The product idea that carries it: a progress engine that turns logged data into an estimated completion date and a consistency score.',
      'Full-stack architecture across three services with Alembic-managed schema and JWT auth.',
      'The operations layer — backup, restore, health checks and separate production hardening — which is the part most personal projects skip. The repository carries a CLAUDE.md specification, so implementation was AI-assisted from a spec authored here.',
    ],
    contributionTr: [
      'Projeyi taşıyan ürün fikri: kaydedilen veriyi tahmini tamamlanma tarihine ve tutarlılık skoruna çeviren ilerleme motoru.',
      'Alembic yönetimli şema ve JWT kimlik doğrulamayla üç servis boyunca tam yığın mimari.',
      'Operasyon katmanı — yedekleme, geri yükleme, sağlık kontrolleri ve ayrı üretim sertleştirmesi — çoğu kişisel projenin atladığı kısım. Depo bir CLAUDE.md spesifikasyonu taşıyor, yani uygulama burada yazılan bir spesifikasyondan yapay zekâ destekli geliştirildi.',
    ],
    limitations: [
      'There is no measured accuracy for the ETA engine — it is a projection, not a validated model.',
      'Two test files against 243 source files.',
    ],
    limitationsTr: [
      'ETA motoru için ölçülmüş bir doğruluk yok — bu bir projeksiyon, doğrulanmış bir model değil.',
      '243 kaynak dosyaya karşı iki test dosyası.',
    ],
  },
  {
    slug: 'nexa-website',
    cover: '/projects/nexa-website/cover.svg',
    category: 'Apps & Tools',
    mark: 'MARK XXI',
    codename: 'The Collective',
    title: 'NEXA Community Website',
    subtitle: 'Front-end work on a live community site other people depend on, not a personal sandbox',
    subtitleTr: 'Kişisel bir deneme değil, başkalarının kullandığı canlı bir topluluk sitesinde ön yüz çalışması',
    oneLiner: 'Contributed a redesign, homepage, and team/recruitment sections to the NEXA community website (Astro).',
    oneLinerTr: 'NEXA topluluk web sitesine (Astro) yeniden tasarım, ana sayfa ve ekip/başvuru bölümleri katkısı.',
    language: 'Astro',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.5)',
    tags: ['Community', 'Redesign', 'Open Source'],
    github: 'https://github.com/gorkemergune/website',
    images: [
      { src: '/projects/nexa-website/cover.svg', caption: 'NEXA — the nexa-tr community website I contributed to (Astro)', captionTr: 'NEXA — katkıda bulunduğum nexa-tr topluluk web sitesi (Astro)' },
    ],
    overview:
      'A collaborative, open-source contribution: I helped build and maintain the website for NEXA (nexa-tr), a student/community organization. Working from the team’s Astro codebase, my contributions were front-end — a new design and overall concept, homepage layout and content, and the members/team and recruitment sections — delivered across roughly forty commits. This is community work as a contributor, not a solo project.',
    overviewTr:
      'İş birliğiyle yapılan, açık kaynak bir katkı: bir öğrenci/topluluk oluşumu olan NEXA (nexa-tr) için web sitesinin geliştirilmesine ve bakımına yardım ettim. Ekibin Astro kod tabanı üzerinde çalıştım ve katkılarım ön yüz odaklıydı: yeni bir tasarım ve genel konsept, ana sayfa düzeni ve içeriği, üyeler/ekip ve başvuru bölümleri; toplamda yaklaşık kırk commit. Bu, tek kişilik bir proje değil, katkıda bulunan olarak bir topluluk çalışmasıdır.',
    stack: [
      { label: 'Languages', items: ['Astro', 'HTML', 'CSS', 'JavaScript'] },
      { label: 'Tools', items: ['Git', 'GitHub'] },
    ],
    architecture: [
      'The site is a static Astro project maintained by the NEXA team. My work was front-end and content-focused: page layout and copy for the homepage, the members/team roster, the recruitment pages, and project listings, iterated over about forty commits from December 2025 to April 2026 — including a broader redesign and concept refresh in April.',
    ],
    architectureTr: [
      'Site, NEXA ekibi tarafından sürdürülen statik bir Astro projesidir. Çalışmam ön yüz ve içerik odaklıydı: ana sayfa, üyeler/ekip listesi, başvuru sayfaları ve proje listeleri için sayfa düzeni ve metinler; Nisan’daki daha kapsamlı yeniden tasarım ve konsept yenilemesi dahil, Aralık 2025’ten Nisan 2026’ya kadar yaklaşık kırk commit boyunca geliştirildi.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Contributor',
    period: '2025–2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'A community site is not a personal sandbox. It has to keep working for the people who depend on it while several contributors change it at once.',
    problemTr:
      'Bir topluluk sitesi kişisel bir deneme alanı değil. Birden fazla katkıcı aynı anda değiştirirken, ona bağımlı olan insanlar için çalışmaya devam etmesi gerekiyor.',
    flow: 'Astro static site maintained by the NEXA team — my work sits in page layout, content and section structure',
    flowTr: 'NEXA ekibinin sürdürdüğü statik Astro sitesi — benim işim sayfa düzeni, içerik ve bölüm yapısında',
    metrics: [
      { label: 'My commits', value: '41 of 51', condition: 'contribution scope — December 2025 to April 2026; another contributor holds the remaining 10' },
      { label: 'Areas', value: '4', condition: 'contribution scope — homepage, members/team roster, recruitment pages, project listings' },
      { label: 'Live', value: 'nexa-tr.com', condition: 'release scope — in production' },
    ],
    metricsTr: [
      { label: 'Benim commit’lerim', value: '51’in 41’i', condition: 'katkı kapsamı — Aralık 2025 – Nisan 2026; kalan 10 commit başka bir katkıcıya ait' },
      { label: 'Alan', value: '4', condition: 'katkı kapsamı — ana sayfa, üye/ekip listesi, işe alım sayfaları, proje listeleri' },
      { label: 'Canlı', value: 'nexa-tr.com', condition: 'yayın kapsamı — üretimde' },
    ],
    useCases: [],
    useCasesTr: [],
    contribution: [
      'Front-end and content: a new design and overall concept in April 2026, homepage layout and copy, the members/team roster, the February intake recruitment pages, and project listings.',
      'Working inside someone else’s Astro codebase and review process rather than my own.',
    ],
    contributionTr: [
      'Front-end ve içerik: Nisan 2026’da yeni bir tasarım ve genel konsept, ana sayfa düzeni ve metni, üye/ekip listesi, şubat alımı için işe alım sayfaları ve proje listeleri.',
      'Kendi kod tabanımda değil, başkasının Astro kod tabanı ve inceleme sürecinin içinde çalışmak.',
    ],
    limitations: [
      'A contributor role on a shared codebase. The site is not mine and the architecture was not my decision.',
    ],
    limitationsTr: [
      'Ortak bir kod tabanında katkıcı rolü. Site benim değil ve mimari benim kararım değildi.',
    ],
  },
  {
    slug: 're-mind',
    category: 'Apps & Tools',
    cover: '/projects/re-mind/cover.svg',
    mark: 'MARK XXII',
    codename: 'Time Keeper',
    title: 'Re-Minder',
    subtitle: 'Keeps you on task on macOS without an account, a server, or anything leaving your machine',
    subtitleTr: 'macOS’ta odağını korur; hesap yok, sunucu yok, makineden hiçbir şey çıkmaz',
    oneLiner: 'Native macOS focus app in Tauri — task reminders, break nudges, focus analytics.',
    oneLinerTr: 'Tauri ile yerel macOS odak uygulaması: görev hatırlatma, mola bildirimi, odak analizi.',
    language: 'TypeScript',
    color: '#f472b6',
    glow: 'rgba(244,114,182,0.5)',
    tags: ['Tauri', 'Rust', 'macOS'],
    github: gh('re-mind'),
    images: [
      { src: '/projects/re-mind/tasks.jpg', caption: 'Task dashboard', captionTr: 'Görev panosu' },
      { src: '/projects/re-mind/timer.png', caption: 'Floating widget — clock, next task, break countdown', captionTr: 'Yüzen bileşen: saat, sıradaki görev, mola geri sayımı' },
      { src: '/projects/re-mind/break.png', caption: 'Fullscreen break reminder overlay', captionTr: 'Tam ekran mola hatırlatma katmanı' },
      { src: '/projects/re-mind/stats.png', caption: 'Focus analytics — weekly chart and 14×18 heatmap', captionTr: 'Odak analizi: haftalık grafik ve 14×18 ısı haritası' },
      { src: '/projects/re-mind/settings.png', caption: 'Settings — break interval, pre-reminder offsets, sounds', captionTr: 'Ayarlar: mola aralığı, ön hatırlatma süreleri, sesler' },
    ],
    overview:
      'A native macOS productivity app that lives in the menu bar: it reminds you when tasks are due, nudges you to take breaks at regular intervals, and silently tracks focus time. Built with Tauri instead of Electron, so it stays light on memory and launches instantly. No account, no server, no internet — everything is stored in a local SQLite database.',
    overviewTr:
      'Menü çubuğunda yaşayan yerel bir macOS üretkenlik uygulaması: görevlerin zamanı geldiğinde hatırlatır, düzenli aralıklarla mola vermen için dürter ve odak süreni sessizce takip eder. Electron yerine Tauri ile geliştirildi; bu sayede bellekte hafif kalır ve anında açılır. Hesap yok, sunucu yok, internet yok; her şey yerel bir SQLite veritabanında saklanır.',
    stack: [
      { label: 'Languages', items: ['TypeScript 5.8 (strict)', 'Rust'] },
      { label: 'Frameworks', items: ['Tauri v2', 'React 19', 'Tailwind CSS 4'] },
      { label: 'Libraries', items: ['Zustand 5', 'rusqlite', 'tauri-plugin-notification', 'react-hot-toast', 'date-fns'] },
      { label: 'Tools', items: ['SQLite', 'Vite'] },
    ],
    architecture: [
      'A Tauri v2 shell hosts the React frontend, with all persistence in a local SQLite database (rusqlite) across four tables: tasks, break_stats, settings, and focus_sessions. The key reliability problem — WKWebView throttling JavaScript timers when the window is hidden — is solved by storing the next-break time as an absolute Unix timestamp in localStorage and having a Rust background thread emit a backend-tick event every 30 seconds; the frontend compares Date.now() against the stored timestamp regardless of throttling.',
      'Notification deduplication keys survive restarts so past-due tasks never re-notify. A useFocusTracker hook uses the Page Visibility API to record foreground time, flushing sessions to SQLite every 60 seconds split across hour boundaries — which is what makes the per-hour heatmap possible.',
    ],
    architectureTr: [
      'Tauri v2 kabuğu React ön yüzünü barındırır; tüm kalıcı veriler yerel bir SQLite veritabanında (rusqlite), dört tabloda tutulur: tasks, break_stats, settings ve focus_sessions. Temel güvenilirlik sorunu (pencere gizliyken WKWebView’in JavaScript zamanlayıcılarını kısması), bir sonraki mola zamanının mutlak Unix zaman damgası olarak localStorage’a yazılması ve bir Rust arka plan iş parçacığının her 30 saniyede bir backend-tick olayı yayınlamasıyla çözülür; ön yüz, kısıtlamadan bağımsız olarak Date.now() değerini saklanan zaman damgasıyla karşılaştırır.',
      'Bildirim tekilleştirme anahtarları yeniden başlatmalarda korunur; böylece zamanı geçmiş görevler bir daha bildirim üretmez. useFocusTracker kancası, ön planda geçirilen süreyi Page Visibility API ile kaydeder ve oturumları saat sınırlarına bölerek her 60 saniyede bir SQLite’a yazar; saat bazlı ısı haritasını mümkün kılan da budur.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Focus apps want an account and a server for data that never needs to leave the machine. And on macOS the obvious implementation quietly breaks: WKWebView throttles JavaScript timers when the window is hidden, so the reminder you are relying on never fires.',
    problemTr:
      'Odak uygulamaları, makineden hiç çıkması gerekmeyen veri için hesap ve sunucu istiyor. Üstelik macOS’ta bariz uygulama sessizce bozuluyor: pencere gizliyken WKWebView JavaScript zamanlayıcılarını kısıyor, dolayısıyla güvendiğin hatırlatma hiç çalışmıyor.',
    flow: 'Tauri v2 shell → React frontend → rusqlite → 4 SQLite tables · a Rust background thread emits a backend-tick every 30 s and the frontend compares Date.now() against an absolute stored timestamp',
    flowTr: 'Tauri v2 kabuğu → React arayüz → rusqlite → 4 SQLite tablosu · Rust arka plan thread’i 30 saniyede bir backend-tick yayınlar ve arayüz Date.now()’ı saklanan mutlak zaman damgasıyla karşılaştırır',
    metrics: [
      { label: 'Focus history', value: '28 days', condition: 'feature scope — per-hour granularity, 14-day × 18-hour heatmap' },
      { label: 'Storage', value: '4 SQLite tables', condition: 'system scope — tasks, break_stats, settings, focus_sessions, entirely local' },
      { label: 'Codebase', value: '4,362 lines', condition: 'project scope — TypeScript 5.8 strict and Rust, counted 12 September 2026' },
      { label: 'Session flush', value: 'every 60 s', condition: 'runtime — split across hour boundaries, which is what makes the heatmap possible' },
    ],
    metricsTr: [
      { label: 'Odak geçmişi', value: '28 gün', condition: 'özellik kapsamı — saat bazında ayrım, 14 gün × 18 saatlik ısı haritası' },
      { label: 'Depolama', value: '4 SQLite tablosu', condition: 'sistem kapsamı — tasks, break_stats, settings, focus_sessions, tamamen yerel' },
      { label: 'Kod tabanı', value: '4.362 satır', condition: 'proje kapsamı — TypeScript 5.8 strict ve Rust, 12 Eylül 2026’da sayıldı' },
      { label: 'Oturum yazımı', value: '60 saniyede bir', condition: 'çalışma zamanı — saat sınırlarına bölünür, ısı haritasını mümkün kılan da bu' },
    ],
    useCases: [
      'Privacy-first desktop applications',
      'Local-first data storage with no account and no sync',
    ],
    useCasesTr: [
      'Gizlilik öncelikli masaüstü uygulamaları',
      'Hesapsız ve senkronizasyonsuz, yerel-önce veri saklama',
    ],
    decisions: [
      { choice: 'Store the next break as an absolute Unix timestamp and drive it from a Rust thread', why: 'WKWebView throttling cannot break a comparison against wall-clock time, whereas it silently breaks setInterval', tradeoff: 'State lives in two places and has to stay consistent across a reload' },
    ],
    decisionsTr: [
      { choice: 'Sonraki molayı mutlak Unix zaman damgası olarak saklamak ve bir Rust thread’inden sürmek', why: 'WKWebView kısıtlaması duvar saatiyle yapılan bir karşılaştırmayı bozamaz, oysa setInterval’ı sessizce bozar', tradeoff: 'Durum iki yerde yaşıyor ve yeniden yüklemede tutarlı kalması gerekiyor' },
    ],
    contribution: [
      'Diagnosing the WKWebView timer throttling and solving it with an absolute timestamp plus a Rust-side tick. This is the actual engineering in the project.',
      'Notification deduplication keys that survive restarts so past-due tasks never re-notify, and a focus tracker on the Page Visibility API that flushes across hour boundaries. React, Zustand and the Tauri plugins are off the shelf.',
    ],
    contributionTr: [
      'WKWebView zamanlayıcı kısıtlamasının teşhisi ve mutlak zaman damgası artı Rust tarafı tick ile çözülmesi. Projedeki asıl mühendislik bu.',
      'Yeniden başlatmayı atlatan ve geçmiş görevlerin tekrar bildirim atmasını önleyen bildirim tekilleştirme anahtarları ve saat sınırlarına bölerek yazan, Page Visibility API üzerine kurulu odak takipçisi. React, Zustand ve Tauri eklentileri hazır.',
    ],
    limitations: [
      'macOS only. No cross-platform validation is claimed.',
      'No account and no sync is a deliberate choice, but it does mean no multi-device use.',
    ],
    limitationsTr: [
      'Yalnızca macOS. Platformlar arası doğrulama iddiası yok.',
      'Hesapsızlık ve senkronizasyonsuzluk bilinçli bir tercih, ama çoklu cihaz kullanımının olmadığı anlamına da geliyor.',
    ],
  },
  {
    slug: 'synonym-master',
    category: 'Apps & Tools',
    cover: '/projects/synonym-master/cover.svg',
    mark: 'MARK XXIII',
    codename: 'Lexicon',
    title: 'Synonym Master',
    subtitle: 'Drills C1 English synonyms until they stick, and runs anywhere Python does',
    subtitleTr: 'C1 İngilizce eş anlamlıları kalıcı olana kadar çalıştırır; Python’un çalıştığı her yerde çalışır',
    oneLiner: 'C1 English vocabulary quiz in pure Python — 80 word groups, zero dependencies.',
    oneLinerTr: 'Saf Python ile C1 İngilizce kelime quizi: 80 kelime grubu, sıfır bağımlılık.',
    language: 'Python',
    color: '#ffd166',
    glow: 'rgba(255,209,102,0.5)',
    tags: ['Tkinter', 'Zero Dependencies'],
    github: gh('synonym-master'),
    images: [
      { src: '/projects/synonym-master/home.png', caption: 'Home screen', captionTr: 'Ana ekran' },
      { src: '/projects/synonym-master/question.png', caption: 'Quiz round — pick the synonym from four options', captionTr: 'Quiz turu: dört seçenekten eş anlamlıyı seç' },
      { src: '/projects/synonym-master/correct.png', caption: 'Correct answer feedback', captionTr: 'Doğru cevap geri bildirimi' },
      { src: '/projects/synonym-master/wrong.png', caption: 'Wrong answer — the correct synonym is revealed', captionTr: 'Yanlış cevap: doğru eş anlamlı gösteriliyor' },
      { src: '/projects/synonym-master/notebook.png', caption: 'Mistake notebook collecting missed words during play', captionTr: 'Oyun sırasında kaçırılan kelimeleri toplayan hata defteri' },
      { src: '/projects/synonym-master/result.png', caption: 'End-of-session summary with score', captionTr: 'Skorla birlikte oturum sonu özeti' },
    ],
    overview:
      'A desktop quiz game for learning and retaining C1-level English synonyms, built in the second semester of my first year — the same stretch in which I reached C1-level English myself. Each session runs 30 rounds: a word appears and you pick its synonym from four options. Wrong answers are collected into a notebook so the words you actually struggle with come back for review.',
    overviewTr:
      'C1 seviyesi İngilizce eş anlamlıları öğrenmek ve kalıcı hâle getirmek için bir masaüstü quiz oyunu; 1. sınıfın 2. döneminde, İngilizcede C1 seviyesine ulaştığım süreçte geliştirildi. Her oturum 30 tur sürer: ekrana bir kelime gelir ve dört seçenek arasından eş anlamlısını seçersin. Yanlış cevaplar bir deftere kaydedilir; böylece gerçekten zorlandığın kelimeler tekrar karşına çıkar.',
    stack: [
      { label: 'Languages', items: ['Python 3.8+'] },
      { label: 'Libraries', items: ['Tkinter (standard library)'] },
    ],
    architecture: [
      'A single ~650-line file. A DICTIONARY list holds word/synonym groups; generate_rounds() samples 30 questions per session, allowing any member of a group to serve as the prompt with the rest as answers. A SynonymGame class owns the Tkinter widgets, score state, and the mistake notebook, swapping frames between quiz rounds and the final summary. The word list is extended by appending plain dict entries — no data files or configuration.',
    ],
    architectureTr: [
      'Yaklaşık 650 satırlık tek bir dosya. DICTIONARY listesi kelime/eş anlamlı gruplarını tutar; generate_rounds() her oturum için 30 soru örnekler ve bir grubun herhangi bir üyesinin soru, kalanların cevap olmasına izin verir. SynonymGame sınıfı Tkinter bileşenlerini, skor durumunu ve hata defterini yönetir; quiz turları ile final özeti arasında çerçeveleri değiştirir. Kelime listesi düz dict kayıtları eklenerek genişletilir; veri dosyası ya da yapılandırma gerekmez.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'archived',
    tier: 'archive',
    problem:
      'C1 vocabulary only sticks with repetition, and the words you get wrong are exactly the ones that disappear from practice.',
    problemTr:
      'C1 kelime dağarcığı ancak tekrarla yerleşir ve yanlış bildiğin kelimeler tam olarak pratikten kaybolanlardır.',
    flow: 'DICTIONARY groups → generate_rounds() samples 30 questions → Tkinter quiz loop → wrong answers collected into a notebook → end-of-game summary',
    flowTr: 'DICTIONARY grupları → generate_rounds() 30 soru örnekler → Tkinter quiz döngüsü → yanlışlar bir deftere toplanır → oyun sonu özeti',
    metrics: [
      { label: 'Word groups', value: '~80', condition: 'content scope — C1 level, each with multiple synonyms' },
      { label: 'External dependencies', value: '0', condition: 'system scope — Tkinter is standard library' },
    ],
    metricsTr: [
      { label: 'Kelime grubu', value: '~80', condition: 'içerik kapsamı — C1 seviyesi, her biri birden çok eş anlamlıyla' },
      { label: 'Dış bağımlılık', value: '0', condition: 'sistem kapsamı — Tkinter standart kütüphanede' },
    ],
    useCases: [],
    useCasesTr: [],
    contribution: [
      'All of it — a single file. Written in the second semester of first year, the same stretch in which I reached C1 myself.',
    ],
    contributionTr: [
      'Tamamı — tek dosya. Birinci sınıfın ikinci döneminde, kendimin C1’e ulaştığı dönemde yazıldı.',
    ],
    limitations: [
      'Low technical difficulty. Kept for the personal record rather than as a technical claim.',
    ],
    limitationsTr: [
      'Teknik zorluğu düşük. Teknik bir iddia olarak değil, kişisel kayıt olarak duruyor.',
    ],
  },
  {
    slug: 'raylib-space-shooter',
    category: 'Systems & Graphics',
    cover: '/projects/raylib-space-shooter/cover.svg',
    mark: 'MARK XXIV',
    codename: 'Star Fighter',
    title: 'Raylib Space Shooter',
    subtitle: 'A complete game in C you can read start to finish, commented as a lesson rather than a codebase',
    subtitleTr: 'Baştan sona okunabilen, kod tabanı gibi değil ders gibi yorumlanmış eksiksiz bir C oyunu',
    oneLiner: 'Wave-based 2D shooter drawn entirely from primitive shapes — not a single texture file.',
    oneLinerTr: 'Tamamen ilkel şekillerle çizilen dalga tabanlı 2B uzay oyunu — tek bir doku dosyası bile yok.',
    language: 'C',
    color: '#c0c0c0',
    glow: 'rgba(192,192,192,0.5)',
    tags: ['raylib', 'Game Dev'],
    github: gh('raylib-space-shooter'),
    images: [
      { src: '/projects/raylib-space-shooter/menu.png', caption: 'Menu screen with scrolling starfield', captionTr: 'Kayan yıldız alanıyla menü ekranı' },
      { src: '/projects/raylib-space-shooter/gameplay.png', caption: 'Gameplay — three enemy types with distinct shapes and behavior', captionTr: 'Oynanış: farklı şekil ve davranışlara sahip üç düşman türü' },
      { src: '/projects/raylib-space-shooter/action.png', caption: 'Later wave — faster spawns and particle explosions', captionTr: 'İlerleyen dalga: daha hızlı düşman doğuşu ve parçacık patlamaları' },
      { src: '/projects/raylib-space-shooter/gameover.png', caption: 'Game over screen with score, wave, and survival time', captionTr: 'Skor, dalga ve hayatta kalma süresini gösteren oyun sonu ekranı' },
    ],
    overview:
      'A complete 2D space shooter built with raylib, structured as a hands-on tutorial: every system in the code is documented as a numbered lesson. The goal is a codebase a beginner can read top to bottom and understand how a real game loop, entity management, and difficulty scaling fit together.',
    overviewTr:
      'raylib ile geliştirilmiş eksiksiz bir 2D uzay oyunu; uygulamalı bir eğitim olarak yapılandırıldı: koddaki her sistem numaralı bir ders olarak belgelendi. Amaç, yeni başlayan birinin baştan sona okuyup gerçek bir oyun döngüsünün, varlık yönetiminin ve zorluk ölçeklemesinin nasıl bir araya geldiğini anlayabileceği bir kod tabanı sunmak.',
    stack: [
      { label: 'Languages', items: ['C (C99)'] },
      { label: 'Libraries', items: ['raylib 5.x'] },
      { label: 'Tools', items: ['GCC / Clang', 'pkg-config'] },
    ],
    architecture: [
      'A single ~840-line main.c organized around typed entities — Player, Bullet, Enemy, Star, Particle — stored in fixed-size static arrays with active flags, so there is no dynamic allocation anywhere. A GameState enum drives the menu / playing / game-over flow.',
      'UpdateGame() advances timers, enemy spawning, movement, collision checks, and the 30-second difficulty multiplier each frame; DrawGame() renders everything with raylib shape primitives. Object pools are recycled by scanning for inactive slots, which keeps the frame loop allocation-free.',
    ],
    architectureTr: [
      'Yaklaşık 840 satırlık tek bir main.c; Player, Bullet, Enemy, Star, Particle gibi tipli varlıklar etrafında düzenlenmiştir. Varlıklar, aktiflik bayraklarıyla sabit boyutlu statik dizilerde tutulur; kodun hiçbir yerinde dinamik bellek ayırma yoktur. Menü / oynanış / oyun sonu akışını bir GameState enum’u yönetir.',
      'UpdateGame() her karede zamanlayıcıları, düşman doğuşunu, hareketi, çarpışma kontrollerini ve 30 saniyelik zorluk çarpanını ilerletir; DrawGame() her şeyi raylib şekil ilkelleriyle çizer. Nesne havuzları pasif yuvalar taranarak geri dönüştürülür; bu da kare döngüsünü bellek ayırmadan arındırır.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'experimental',
    problem:
      'Game codebases are unreadable to a beginner because asset loading and abstraction layers hide the loop that actually matters.',
    problemTr:
      'Oyun kod tabanları yeni başlayan biri için okunamaz, çünkü asset yükleme ve soyutlama katmanları asıl önemli olan döngüyü gizler.',
    flow: 'Typed entities in fixed static arrays with active flags → GameState enum → UpdateGame() advances timers, spawning, movement and collisions → DrawGame() renders with shape primitives only',
    flowTr: 'Aktif bayraklı sabit static dizilerde tipli varlıklar → GameState enum’u → UpdateGame() zamanlayıcıları, doğumu, hareketi ve çarpışmaları ilerletir → DrawGame() yalnızca şekil ilkelleriyle çizer',
    metrics: [
      { label: 'Codebase', value: '~840 lines', condition: 'project scope — single file, every system commented as a numbered lesson' },
      { label: 'Asset files', value: '0', condition: 'project scope — player, enemies, particles and starfield all drawn from primitives' },
      { label: 'Enemy types', value: '3', condition: 'system scope — different speed, HP and point values' },
    ],
    metricsTr: [
      { label: 'Kod tabanı', value: '~840 satır', condition: 'proje kapsamı — tek dosya, her sistem numaralı bir ders olarak yorumlandı' },
      { label: 'Asset dosyası', value: '0', condition: 'proje kapsamı — oyuncu, düşmanlar, parçacıklar ve yıldız alanı tamamen ilkellerden çizildi' },
      { label: 'Düşman tipi', value: '3', condition: 'sistem kapsamı — farklı hız, can ve puan değerleri' },
    ],
    useCases: [],
    useCasesTr: [],
    decisions: [
      { choice: 'No dynamic allocation anywhere — fixed-size static arrays with active flags and object-pool recycling', why: 'A beginner can follow the memory story end to end, and the frame loop has no allocator pauses', tradeoff: 'Hard entity caps are baked into the source' },
    ],
    decisionsTr: [
      { choice: 'Hiçbir yerde dinamik bellek ayırma yok — aktif bayraklı sabit boyutlu static diziler ve nesne havuzu geri dönüşümü', why: 'Yeni başlayan biri bellek hikâyesini baştan sona takip edebiliyor ve kare döngüsünde ayırıcı duraklaması olmuyor', tradeoff: 'Sert varlık limitleri kaynağa gömülü' },
    ],
    contribution: [
      'All of it, including the design constraint: fixed-size static arrays with active flags and object-pool recycling, so there is no dynamic allocation anywhere in the frame loop.',
    ],
    contributionTr: [
      'Tamamı, tasarım kısıtı dahil: aktif bayraklı sabit boyutlu static diziler ve nesne havuzu geri dönüşümü; böylece kare döngüsünün hiçbir yerinde dinamik bellek ayırma yok.',
    ],
    limitations: [
      'A teaching artifact. It is not a game anyone is meant to keep playing.',
    ],
    limitationsTr: [
      'Bir öğretim çıktısı. Kimsenin oynamaya devam etmesi beklenen bir oyun değil.',
    ],
  },
  {
    slug: 'pynput-macos-macro',
    category: 'Apps & Tools',
    cover: '/projects/pynput-macos-macro/cover.svg',
    mark: 'MARK XXV',
    codename: 'Auto-Pilot',
    title: 'macOS Toggle Macro',
    subtitle: 'Automates a repetitive key sequence on macOS and shuts down cleanly every time',
    subtitleTr: 'macOS’ta tekrar eden bir tuş dizisini otomatikleştirir ve her seferinde temiz kapanır',
    oneLiner: 'F8 starts it, F8 stops it, and nothing is left running behind.',
    oneLinerTr: 'F8 başlatır, F8 durdurur ve arkada hiçbir şey çalışır kalmaz.',
    language: 'Python',
    color: '#9d6bff',
    glow: 'rgba(157,107,255,0.5)',
    tags: ['pynput', 'macOS', 'Automation'],
    github: gh('pynput-macos-macro'),
    images: [
      { src: '/projects/pynput-macos-macro/session.svg', caption: 'Terminal session — F8 toggling the macro loop on and off', captionTr: 'Terminal oturumu: F8, makro döngüsünü açıp kapatıyor' },
      { src: '/projects/pynput-macos-macro/config.svg', caption: 'Configuration block — key sequence and delay at the top of the script', captionTr: 'Yapılandırma bloğu: betiğin başında tuş dizisi ve gecikme' },
      { src: '/projects/pynput-macos-macro/karabiner.svg', caption: 'Karabiner-Elements rule mapping mouse side buttons to F8', captionTr: 'Fare yan tuşlarını F8’e eşleyen Karabiner-Elements kuralı' },
    ],
    overview:
      'A small automation utility: press F8 and it replays a configurable key sequence (2 → 3 → 4 by default) in a loop until toggled off. Written for repetitive input tasks on macOS, where global input hooks require Accessibility permissions and mouse side buttons are invisible to Python — both of which the README documents workarounds for.',
    overviewTr:
      'Küçük bir otomasyon aracı: F8’e bastığında, yapılandırılabilir bir tuş dizisini (varsayılan olarak 2 → 3 → 4) kapatılana dek döngü hâlinde tekrarlar. macOS’teki tekrarlı girdi görevleri için yazıldı; bu platformda genel girdi kancaları Erişilebilirlik izni gerektirir ve fare yan tuşları Python tarafından görülmez; README her iki sorunun da çözüm yolunu belgeler.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Libraries', items: ['pynput'] },
      { label: 'Tools', items: ['Karabiner-Elements (optional remap)'] },
    ],
    architecture: [
      'A 51-line script with two threads. A pynput keyboard.Listener runs on the main thread watching for the toggle key; toggling on spawns a daemon thread that replays the key sequence through keyboard.Controller with a configurable delay, and toggling off sets a threading.Event that the loop checks between every key press, so it stops immediately and never leaves a key half-pressed.',
    ],
    architectureTr: [
      'İki iş parçacıklı, 51 satırlık bir betik. Ana iş parçacığında pynput keyboard.Listener açma/kapama tuşunu izler; makro açıldığında, tuş dizisini keyboard.Controller üzerinden yapılandırılabilir gecikmeyle tekrarlayan bir daemon iş parçacığı başlatılır. Kapatıldığında ise döngünün her tuş basımı arasında kontrol ettiği bir threading.Event işaretlenir; böylece döngü anında durur ve hiçbir tuş yarım basılı kalmaz.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'archived',
    tier: 'archive',
    problem:
      'Automating a repetitive key sequence on macOS runs into two obstacles: global input hooks need Accessibility permission, and pynput cannot see mouse side buttons at all.',
    problemTr:
      'macOS’ta tekrarlayan bir tuş dizisini otomatikleştirmek iki engele çarpıyor: global giriş kancaları Accessibility izni istiyor ve pynput fare yan tuşlarını hiç göremiyor.',
    flow: 'pynput Listener on the main thread → toggle spawns a daemon thread → key sequence replays through Controller → threading.Event checked between every press',
    flowTr: 'Ana thread’de pynput Listener → açma/kapama bir daemon thread başlatır → tuş dizisi Controller üzerinden tekrar oynatılır → her basış arasında threading.Event kontrol edilir',
    metrics: [
      { label: 'Codebase', value: '51 lines', condition: 'project scope — single script, two threads' },
      { label: 'Dependencies', value: '1', condition: 'system scope — pynput; Karabiner-Elements is an optional remap, not a runtime dependency' },
    ],
    metricsTr: [
      { label: 'Kod tabanı', value: '51 satır', condition: 'proje kapsamı — tek betik, iki thread' },
      { label: 'Bağımlılık', value: '1', condition: 'sistem kapsamı — pynput; Karabiner-Elements opsiyonel bir eşleme, çalışma zamanı bağımlılığı değil' },
    ],
    useCases: [],
    useCasesTr: [],
    contribution: [
      'The clean shutdown: a threading.Event checked between every key press, so toggling off stops immediately and never leaves a key half-pressed.',
      'Documenting the two macOS obstacles and shipping a Karabiner-Elements rule as the workaround for the mouse-button limitation.',
    ],
    contributionTr: [
      'Temiz kapanış: her tuş basışı arasında kontrol edilen bir threading.Event; böylece kapatınca anında duruyor ve hiçbir tuşu yarım basılı bırakmıyor.',
      'İki macOS engelinin belgelenmesi ve fare tuşu kısıtı için çözüm olarak bir Karabiner-Elements kuralının paylaşılması.',
    ],
    limitations: [
      '51 lines. Kept as a utility rather than offered as a portfolio project.',
    ],
    limitationsTr: [
      '51 satır. Portföy projesi olarak sunulmuyor, bir yardımcı araç olarak duruyor.',
    ],
  },
  {
    slug: 'sorting-visualizer',
    category: 'Systems & Graphics',
    cover: '/projects/sorting-visualizer/cover.svg',
    mark: 'MARK XXVI',
    codename: 'The Algorithm',
    title: 'Sorting Visualizer',
    subtitle: 'Makes six sorting algorithms comparable by running them side by side at the same speed',
    subtitleTr: 'Altı sıralama algoritmasını aynı hızda yan yana çalıştırarak karşılaştırılabilir kılar',
    oneLiner: 'Watching quicksort and bubble sort race at the same speed explains more than a complexity table.',
    oneLinerTr: 'Quicksort ile bubble sort’u aynı hızda yarıştırmak, bir karmaşıklık tablosundan daha çok şey anlatıyor.',
    language: 'C',
    color: '#8a8a8a',
    glow: 'rgba(138,138,138,0.5)',
    tags: ['raylib', 'Algorithms', 'Animation'],
    github: gh('sorting-visualizer'),
    images: [
      { src: '/projects/sorting-visualizer/bubble-sort.png', caption: 'Bubble sort mid-run — comparisons in yellow, sorted tail in green', captionTr: 'Kabarcık sıralaması çalışırken: karşılaştırmalar sarı, sıralanan kuyruk yeşil' },
      { src: '/projects/sorting-visualizer/merge-sort.png', caption: 'Merge sort with its explicit merge-state machine in action', captionTr: 'Birleştirme sıralaması, kendi birleştirme durum makinesiyle iş başında' },
      { src: '/projects/sorting-visualizer/quick-sort.png', caption: 'Quick sort — pivot highlighted in blue, partitions forming', captionTr: 'Hızlı sıralama: pivot mavi ile vurgulanmış, bölümler oluşuyor' },
      { src: '/projects/sorting-visualizer/completed.png', caption: 'Completed run with final comparison and swap counters', captionTr: 'Tamamlanan çalışma; toplam karşılaştırma ve takas sayaçları' },
    ],
    overview:
      'A desktop tool that animates Bubble, Selection, Insertion, Merge, Quick, and Heap sort as they run. Built to make algorithm behavior visible instead of abstract — every comparison, swap, and confirmed position is color-coded on screen. Useful for students learning data structures and for anyone who wants an intuition for why O(n log n) beats O(n²).',
    overviewTr:
      'Bubble, Selection, Insertion, Merge, Quick ve Heap sort algoritmalarını çalışırken canlandıran bir masaüstü aracı. Algoritma davranışını soyut olmaktan çıkarıp görünür kılmak için geliştirildi: her karşılaştırma, takas ve kesinleşen konum ekranda renk kodlarıyla gösterilir. Veri yapılarını öğrenen öğrenciler ve O(n log n) karmaşıklığın O(n²) karşısında neden üstün olduğunu sezgisel olarak kavramak isteyen herkes için faydalıdır.',
    stack: [
      { label: 'Languages', items: ['C (C99)'] },
      { label: 'Libraries', items: ['raylib 5.x'] },
      { label: 'Tools', items: ['GCC / Clang', 'pkg-config', 'MinGW (Windows)'] },
    ],
    architecture: [
      'The entire program is a single ~690-line C99 file. Each algorithm is implemented as an incremental state machine — bubble_step(), selection_step(), insertion_step(), and so on — that keeps its loop indices in static variables and advances exactly one comparison or swap per call. The main raylib loop invokes one step per animation tick, so sorting progress is rendered frame by frame instead of running to completion in one pass.',
      'Bar positions are interpolated through a separate display array so swaps animate smoothly, and a sorted mask keeps confirmed elements green for the rest of the run. Merge sort carries its own explicit merge-state struct since its control flow cannot live in simple loop counters.',
    ],
    architectureTr: [
      'Programın tamamı yaklaşık 690 satırlık tek bir C99 dosyasından oluşur. Her algoritma, artımlı bir durum makinesi olarak uygulanmıştır — bubble_step(), selection_step(), insertion_step() gibi fonksiyonlar döngü indekslerini statik değişkenlerde tutar ve her çağrıda tam olarak bir karşılaştırma ya da takas ilerletir. Ana raylib döngüsü her animasyon adımında bir step çağırır; böylece sıralama, tek seferde tamamlanmak yerine kare kare ekrana çizilir.',
      'Çubuk konumları, takasların akıcı görünmesi için ayrı bir görüntüleme dizisi üzerinden ara değerlerle hesaplanır; sıralanmış maskesi ise kesinleşen elemanları çalışmanın sonuna dek yeşil tutar. Merge sort, kontrol akışı basit döngü sayaçlarına sığmadığı için kendi birleştirme durumu yapısını taşır.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'experimental',
    problem:
      'A complexity table tells you O(n log n) beats O(n²) but gives no intuition for why. You have to watch them race at the same speed.',
    problemTr:
      'Bir karmaşıklık tablosu O(n log n)’in O(n²)’yi yendiğini söyler ama nedenine dair sezgi vermez. Aynı hızda yarıştıklarını görmen gerekir.',
    flow: 'raylib loop → one algorithm step per animation tick → incremental state machines hold loop indices in statics → interpolated display array → sorted mask',
    flowTr: 'raylib döngüsü → animasyon tik’i başına bir algoritma adımı → artımlı durum makineleri döngü indekslerini static’lerde tutar → enterpolasyonlu görüntü dizisi → sıralanmış maskesi',
    metrics: [
      { label: 'Algorithms', value: '6', condition: 'system scope — Bubble, Selection, Insertion, Merge, Quick and Heap, switchable at runtime' },
      { label: 'Codebase', value: '~690 lines', condition: 'project scope — single C99 file' },
      { label: 'Dependencies', value: 'raylib only', condition: 'system scope — no other third-party library' },
    ],
    metricsTr: [
      { label: 'Algoritma', value: '6', condition: 'sistem kapsamı — Bubble, Selection, Insertion, Merge, Quick ve Heap, çalışma anında değiştirilebilir' },
      { label: 'Kod tabanı', value: '~690 satır', condition: 'proje kapsamı — tek C99 dosyası' },
      { label: 'Bağımlılık', value: 'yalnızca raylib', condition: 'sistem kapsamı — başka üçüncü taraf kütüphane yok' },
    ],
    useCases: [
      'Teaching material for data structures courses',
    ],
    useCasesTr: [
      'Veri yapıları dersleri için öğretim materyali',
    ],
    decisions: [
      { choice: 'Rewrite each algorithm as an incremental state machine advancing one comparison or swap per call', why: 'A normally-blocking loop can then render frame by frame instead of running to completion in one pass', tradeoff: 'Merge sort needs its own explicit merge-state struct, because its control flow cannot live in simple loop counters' },
    ],
    decisionsTr: [
      { choice: 'Her algoritmayı, çağrı başına bir karşılaştırma ya da takas ilerleten artımlı bir durum makinesi olarak yeniden yazmak', why: 'Normalde bloklayan bir döngü böylece tek seferde sonuna kadar koşmak yerine kare kare çizilebiliyor', tradeoff: 'Merge sort kendi açık merge durumu yapısını gerektiriyor, çünkü kontrol akışı basit döngü sayaçlarında yaşayamıyor' },
    ],
    contribution: [
      'The incremental state-machine rewrite of all six algorithms, which is the real technical decision in the project.',
      'Interpolating bar positions through a separate display array so swaps animate smoothly, and a sorted mask that keeps confirmed elements marked for the rest of the run.',
    ],
    contributionTr: [
      'Altı algoritmanın tamamının artımlı durum makinesi olarak yeniden yazılması — projedeki asıl teknik karar bu.',
      'Takasların akıcı canlanması için çubuk konumlarının ayrı bir görüntü dizisi üzerinden enterpole edilmesi ve onaylanan elemanları koşunun geri kalanında işaretli tutan sıralanmış maskesi.',
    ],
    limitations: [
      'A teaching tool. The animation speed implies no performance claim.',
    ],
    limitationsTr: [
      'Bir öğretim aracı. Animasyon hızı hiçbir performans iddiası taşımıyor.',
    ],
  },
  {
    slug: 'automotive-racing-assistant',
    category: 'AI Agents & Tooling',
    cover: '/projects/automotive-racing-assistant/cover.svg',
    mark: 'MARK XXVII',
    codename: 'The Pit Crew',
    title: 'Automotive Racing Assistant',
    subtitle: 'Built for a workshop with no connection: the model decides, the tools answer, nothing is guessed',
    subtitleTr: 'Bağlantısı olmayan bir atölye için kuruldu: model karar verir, araçlar cevaplar, hiçbir şey tahmin edilmez',
    oneLiner: 'Decides which tools to call — weather, search, part status, regulations — and stays entirely offline while doing it.',
    oneLinerTr: 'Hangi araçları çağıracağına kendi karar verir — hava durumu, arama, parça durumu, kurallar — ve bunu tamamen çevrimdışı yapar.',
    language: 'Python',
    color: '#e23636',
    glow: 'rgba(226,54,54,0.5)',
    tags: ['Tool Calling', 'Ollama', 'Fully Offline'],
    github: gh('automotive-racing-assistant'),
    images: [
      { src: '/projects/automotive-racing-assistant/cover.svg', caption: 'Local Qwen2.5 7B decides which of four tools to call, then answers grounded in what they return', captionTr: 'Yerel Qwen2.5 7B dört araçtan hangisini çağıracağına karar verir, sonra döndürdüklerine dayanarak yanıtlar' },
      { src: '/projects/automotive-racing-assistant/flow.svg', caption: 'The bounded tool-calling loop — capped at 5 rounds, feeding each tool result back before answering', captionTr: 'Sınırlı tool calling döngüsü — 5 turla sınırlı, cevaptan önce her araç sonucunu geri besler' },
    ],
    overview:
      'A terminal assistant for a fictional university automotive racing team, built to show that a small local model plus disciplined scaffolding beats a heavier framework. It runs entirely offline on Qwen2.5 7B through Ollama with native tool calling — no LangChain, LangGraph, or CrewAI, just direct HTTP and a tight loop. The model itself decides when and which tools to invoke; Python executes them and feeds the results back, so every answer is grounded in real tool output and unknown questions are refused rather than invented.',
    overviewTr:
      'Kurgusal bir üniversite otomotiv yarış takımı için bir terminal asistanı; küçük bir yerel modelin, disiplinli bir iskeleyle, ağır bir framework’ü geçtiğini göstermek için kuruldu. Yerel tool calling ile Ollama üzerinden Qwen2.5 7B ile tamamen çevrimdışı çalışır — LangChain, LangGraph ya da CrewAI yok, yalnızca doğrudan HTTP ve sıkı bir döngü. Hangi araçları ne zaman çağıracağına modelin kendisi karar verir; Python bunları çalıştırıp sonuçları geri besler, böylece her cevap gerçek araç çıktısına dayanır ve bilinmeyen sorular uydurulmak yerine reddedilir.',
    stack: [
      { label: 'Languages', items: ['Python 3 (3.12)'] },
      { label: 'Libraries', items: ['requests', 'unittest'] },
      { label: 'Tools', items: ['Ollama (local)', 'Open-Meteo API', 'DuckDuckGo / Wikipedia'] },
      { label: 'AI Models', items: ['Qwen2.5 7B via Ollama — native function calling'] },
    ],
    architecture: [
      'run_conversation is a bounded tool-calling loop: it hands Qwen2.5 the system prompt and the four tool schemas, and whenever the model returns tool calls Python executes them and appends the results before querying again. The loop caps at five rounds, so multi-tool requests resolve without ever running away. The system prompt does the heavy lifting — it tells the model to lean on tools, to label mock data as fictional, and to refuse rather than invent when nothing fits.',
      'Tools are split cleanly: internet_search and get_weather hit real, keyless public endpoints, while check_part_status and get_race_regulations return demonstration data explicitly marked as fictional. Testing is two-tier — 47 deterministic unit tests that need no network, plus a 24-scenario live evaluation of tool selection that confirmed perfect categorization on core tasks and no fabrication on out-of-scope questions. Apache-2.0 licensed.',
    ],
    architectureTr: [
      'run_conversation, sınırlı bir tool calling döngüsüdür: Qwen2.5’e sistem prompt’unu ve dört araç şemasını verir; model tool call’ları döndürdükçe Python bunları çalıştırır ve tekrar sormadan önce sonuçları ekler. Döngü beş turla sınırlıdır, böylece çok araçlı istekler asla kontrolden çıkmadan çözülür. Ağır işi sistem prompt’u yapar — modele araçlara güvenmesini, sahte veriyi kurgusal olarak etiketlemesini ve hiçbir şey uymadığında uydurmak yerine reddetmesini söyler.',
      'Araçlar net biçimde ayrılmıştır: internet_search ve get_weather gerçek, anahtarsız açık endpoint’lere gider; check_part_status ve get_race_regulations ise açıkça kurgusal olarak işaretlenmiş gösterim verisi döndürür. Test iki katmanlıdır — ağ gerektirmeyen 47 belirlenimci birim testi, artı çekirdek görevlerde kusursuz kategorilemeyi ve kapsam dışı sorularda uydurma olmadığını doğrulayan 24 senaryoluk canlı araç-seçimi değerlendirmesi. Apache-2.0 lisanslı.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'supporting',
    problem:
      'Agent projects reach for heavy frameworks and assume a network connection. A workshop has neither, and a wrong answer about a part or a regulation is worse than no answer.',
    problemTr:
      'Ajan projeleri ağır framework’lere uzanıyor ve ağ bağlantısı olduğunu varsayıyor. Bir atölyede ikisi de yok, üstelik bir parça ya da kural hakkında yanlış cevap cevapsızlıktan kötü.',
    flow: 'System prompt + 4 tool schemas → Qwen2.5 7B via Ollama decides which tools to call → Python executes them and appends the results → loop, capped at 5 rounds → grounded answer or refusal',
    flowTr: 'Sistem promptu + 4 araç şeması → Ollama üzerinden Qwen2.5 7B hangi araçları çağıracağına karar verir → Python çalıştırır ve sonuçları ekler → döngü, en fazla 5 tur → veriye dayalı cevap ya da ret',
    metrics: [
      { label: 'Unit tests', value: '47 passing', condition: 'validation scope — deterministic, no network required' },
      { label: 'Live evaluation', value: '24 scenarios', condition: 'validation scope — tool-selection check; the README calls it explicitly not a statistical benchmark' },
      { label: 'Tool rounds', value: 'capped at 5', condition: 'system scope — bounded loop, no runaway calls' },
      { label: 'Dependencies', value: 'requests only', condition: 'system scope — no LangChain, LangGraph or CrewAI' },
    ],
    metricsTr: [
      { label: 'Birim test', value: '47 geçiyor', condition: 'doğrulama kapsamı — deterministik, ağ gerektirmez' },
      { label: 'Canlı değerlendirme', value: '24 senaryo', condition: 'doğrulama kapsamı — araç seçimi kontrolü; README bunun istatistiksel bir benchmark olmadığını açıkça söylüyor' },
      { label: 'Araç turu', value: 'en fazla 5', condition: 'sistem kapsamı — sınırlı döngü, kontrolsüz çağrı yok' },
      { label: 'Bağımlılık', value: 'yalnızca requests', condition: 'sistem kapsamı — LangChain, LangGraph ya da CrewAI yok' },
    ],
    useCases: [
      'Disconnected industrial environments',
      'Deployments where data cannot leave the premises',
    ],
    useCasesTr: [
      'Bağlantısız endüstriyel ortamlar',
      'Verinin tesisten çıkamadığı dağıtımlar',
    ],
    decisions: [
      { choice: 'Direct HTTP against Ollama instead of an agent framework', why: 'The whole loop stays readable in one file and there is no framework version to track', tradeoff: 'Anything a framework would give for free — retries, tracing, memory — has to be written by hand' },
    ],
    decisionsTr: [
      { choice: 'Ajan framework’ü yerine Ollama’ya doğrudan HTTP', why: 'Döngünün tamamı tek dosyada okunabilir kalıyor ve takip edilecek bir framework sürümü olmuyor', tradeoff: 'Bir framework’ün bedavaya vereceği her şey — yeniden deneme, izleme, hafıza — elle yazılmak zorunda' },
    ],
    contribution: [
      'The framework-free bounded loop — direct HTTP against Ollama — which is the whole argument of the project.',
      'The rule that mock data is always labelled fictional in the system prompt and that unknown questions are refused rather than invented, plus the two-tier test strategy: deterministic offline unit tests and a live tool-selection evaluation.',
    ],
    contributionTr: [
      'Framework’süz sınırlı döngü — Ollama’ya doğrudan HTTP — projenin bütün savı bu.',
      'Sahte verinin sistem promptunda her zaman kurgusal olarak etiketlenmesi ve bilinmeyen soruların uydurulmak yerine reddedilmesi kuralı; ayrıca iki katmanlı test stratejisi: deterministik offline birim testler ve canlı araç seçimi değerlendirmesi.',
    ],
    limitations: [
      'Two of the four tools return clearly-labelled demonstration data, not real systems. The agent scaffolding is real; the domain data is not.',
      'The 24-scenario evaluation is a hand-run check, and the repository says plainly that it is not a statistical benchmark.',
    ],
    limitationsTr: [
      'Dört aracın ikisi gerçek sistemler değil, açıkça etiketlenmiş gösterim verisi döndürüyor. Ajan iskeleti gerçek; alan verisi değil.',
      '24 senaryoluk değerlendirme elle koşulan bir kontrol ve depo bunun istatistiksel bir benchmark olmadığını açıkça yazıyor.',
    ],
  },
  {
    slug: 'vlm-groundbench',
    category: 'Research & Benchmarks',
    cover: '/projects/vlm-groundbench/cover.svg',
    mark: 'MARK XXVIII',
    codename: 'The Surveyor',
    title: 'VLM-GroundBench',
    subtitle: 'A benchmark you can trust precisely because it does not have results yet',
    subtitleTr: 'Henüz sonucu olmadığı için tam da bu yüzden güvenilebilecek bir benchmark',
    oneLiner: 'Most benchmarks publish numbers first and methodology later. This one locks the method, the metrics, and the model claims before any experiment exists.',
    oneLinerTr: 'Çoğu benchmark önce sayıları, sonra yöntemi yayınlar. Bu, hiçbir deney yokken yöntemi, metrikleri ve model iddialarını kilitliyor.',
    language: 'Python',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.5)',
    tags: ['VLM', 'Grounding', 'Evaluation'],
    github: gh('vlm-groundbench'),
    images: [
      { src: '/projects/vlm-groundbench/cover.svg', caption: 'The task: localize an object from a natural-language description — scored against immutable ground truth', captionTr: 'Görev: bir nesneyi doğal dil açıklamasından konumlandırmak — değiştirilemez referansa karşı puanlanır' },
      { src: '/projects/vlm-groundbench/protocol.svg', caption: 'Frozen-first design — protocol locked before experiments, raw outputs kept separate from derived metrics', captionTr: 'Donmuş-öncelikli tasarım — deneylerden önce kilitlenen protokol, türetilmiş metriklerden ayrı tutulan ham çıktılar' },
    ],
    overview:
      'A benchmark framework for measuring how well vision-language models localize objects described in free text — and an experiment in doing evaluation in the honest order. The evaluator, the metric definitions, the prompt registry, and the model capability matrix are written and tested first; the protocol is frozen; only then do experiments get to run. Two end-to-end smoke runs prove the pipeline works on fixtures, and there are still zero model results, which is the point: nothing in the repository can be tuned toward a number nobody has seen yet.',
    overviewTr:
      'Vision-language modellerinin serbest metinle tarif edilen nesneleri ne kadar iyi konumlandırdığını ölçen bir benchmark çerçevesi — ve değerlendirmeyi dürüst sırayla yapma denemesi. Değerlendirici, metrik tanımları, prompt kaydı ve model yetenek matrisi önce yazılıp test edilir; protokol dondurulur; deneyler ancak ondan sonra koşabilir. İki uçtan uca smoke koşusu pipeline’ın çalıştığını fikstürler üzerinde kanıtlıyor ve hâlâ sıfır model sonucu var — asıl mesele de bu: depoda hiçbir şey, henüz kimsenin görmediği bir sayıya göre ayarlanamaz.',
    stack: [
      { label: 'Languages', items: ['Python 3'] },
      { label: 'Testing', items: ['pytest — 12 test modules covering metrics, parsers, manifests, raw/derived separation, and locked decisions'] },
      { label: 'Structure', items: ['docs/ (frozen protocol)', 'evaluation/ (metrics + evaluator)', 'models/ (adapter interface)', 'experiments/ (run configs)', 'results/ (raw_outputs vs metrics)'] },
      { label: 'Domain', items: ['Vision-language grounding', 'Object localization', 'Native vs prompt-induced coordinates'] },
    ],
    architecture: [
      'The repository separates what can be argued about from what cannot. docs/ holds the frozen protocol, the metric spec, and the model matrix where every capability carries an evidence tag; evaluation/ implements geometry, parsers, matching, metric families, and the evaluator itself; experiments/ holds committed run configs and the runner; results/ splits verbatim raw_outputs from derived metrics. The tests enforce the rules instead of trusting them — one checks that raw and derived outputs never mix, another that the locked decisions in the protocol have not silently changed.',
      'Coordinate handling is the part most likely to fail silently, so it is pinned per condition: Qwen emits absolute-pixel xyxy and is converted to canonical xywh, Cosmos emits points normalized to 0–1000 and is scaled with post-preprocessing image dimensions, and every prompt-induced coordinate is parsed defensively and labelled as such. Datasets and model adapters are the remaining work; the project deliberately stops at the line where results would begin.',
    ],
    architectureTr: [
      'Depo, tartışılabilir olanı tartışılamaz olandan ayırır. docs/ donmuş protokolü, metrik spesifikasyonunu ve her yeteneğin kanıt etiketi taşıdığı model matrisini barındırır; evaluation/ geometriyi, ayrıştırıcıları, eşleştirmeyi, metrik ailelerini ve değerlendiricinin kendisini uygular; experiments/ commit’lenmiş koşu yapılandırmalarını ve çalıştırıcıyı tutar; results/ olduğu gibi saklanan raw_outputs’u türetilmiş metriklerden ayırır. Testler kuralları varsaymaz, zorunlu kılar — biri ham ve türetilmiş çıktıların asla karışmadığını, diğeri protokoldeki kilitli kararların sessizce değişmediğini denetler.',
      'Sessizce bozulmaya en yatkın kısım koordinat işleme olduğu için her koşul için sabitlenmiştir: Qwen mutlak piksel xyxy üretir ve kanonik xywh’ye çevrilir, Cosmos 0–1000 aralığına normalleştirilmiş nokta üretir ve ön işleme sonrası görüntü boyutlarıyla ölçeklenir, prompt’la üretilmiş her koordinat ise savunmacı biçimde ayrıştırılıp öyle etiketlenir. Veri kümeleri ve model adaptörleri kalan iş; proje, sonuçların başlayacağı çizgide bilinçli olarak duruyor.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'research',
    tier: 'research',
    problem:
      'Benchmarks publish numbers first and write the methodology afterwards. That order leaves the protocol free to drift toward whichever result looks best, and nobody outside the project can tell that it happened.',
    problemTr:
      'Benchmark’lar önce sayı yayınlar, metodolojiyi sonra yazar. Bu sıra, protokolün en iyi görünen sonuca doğru kaymasına açık kapı bırakır ve projenin dışındaki hiç kimse bunun olduğunu anlayamaz.',
    flow: 'Frozen protocol in docs/ → evaluator and metric families in evaluation/ → committed run configs in experiments/ → results/ keeps verbatim raw_outputs separate from derived metrics, enforced by a test',
    flowTr: 'docs/ içinde dondurulmuş protokol → evaluation/ içinde değerlendirici ve metrik aileleri → experiments/ içinde commit edilmiş koşu konfigleri → results/ ham çıktıyı türetilmiş metrikten ayrı tutar, bir testle zorunlu kılınır',
    metrics: [
      { label: 'Model results', value: 'none yet — by design', condition: 'project status — design and specification phase, no datasets downloaded' },
      { label: 'Model matrix', value: '5 models', condition: 'specification scope — each capability tagged with vendor-documented evidence' },
      { label: 'Test modules', value: '13', condition: 'validation scope — metrics, parsers, manifests, raw/derived separation, locked decisions' },
      { label: 'Documentation', value: '29 markdown files', condition: 'specification scope — close to the source-file count; the methodology is the artifact' },
      { label: 'Pipeline proof', value: '2 end-to-end smoke runs', condition: 'plumbing check — on fixtures, explicitly not results' },
    ],
    metricsTr: [
      { label: 'Model sonucu', value: 'henüz yok — bilerek', condition: 'proje durumu — tasarım ve spesifikasyon aşaması, hiçbir veri kümesi indirilmedi' },
      { label: 'Model matrisi', value: '5 model', condition: 'spesifikasyon kapsamı — her yetenek, üretici belgesine dayalı kanıt etiketiyle' },
      { label: 'Test modülü', value: '13', condition: 'doğrulama kapsamı — metrikler, parser’lar, manifest’ler, ham/türetilmiş ayrımı, kilitli kararlar' },
      { label: 'Dokümantasyon', value: '29 markdown dosyası', condition: 'spesifikasyon kapsamı — kaynak dosya sayısına yakın; metodolojinin kendisi çıktı' },
      { label: 'Pipeline kanıtı', value: '2 uçtan uca duman testi', condition: 'tesisat kontrolü — fixture üzerinde, açıkça sonuç değil' },
    ],
    useCases: [
      'VLM selection when vendor claims and actual capability differ',
      'Reproducible multi-model evaluation infrastructure',
    ],
    useCasesTr: [
      'Üretici iddiasıyla gerçek yeteneğin ayrıştığı durumlarda VLM seçimi',
      'Yeniden üretilebilir çok modelli değerlendirme altyapısı',
    ],
    decisions: [
      { choice: 'Models are classified by what the vendor documents, not by what a prompt can coax out', why: 'A prompt-induced box is never reported as native grounding, so the comparison stays honest', tradeoff: 'Some models land in a weaker class than a demo would suggest' },
      { choice: 'A point is never converted into a box and never scored with IoU', why: 'The two capability classes get separate metric families instead of a false head-to-head', tradeoff: 'There is no single leaderboard number across all five models' },
    ],
    decisionsTr: [
      { choice: 'Modeller, bir prompt’un koparabildiğine göre değil üreticinin belgelediğine göre sınıflanır', why: 'Prompt kaynaklı bir kutu asla native grounding olarak raporlanmaz, böylece karşılaştırma dürüst kalır', tradeoff: 'Bazı modeller bir demonun ima edeceğinden daha zayıf bir sınıfa düşüyor' },
      { choice: 'Bir nokta asla kutuya çevrilmez ve asla IoU ile puanlanmaz', why: 'İki yetenek sınıfı sahte bir karşılaştırma yerine ayrı metrik ailelerine sahip olur', tradeoff: 'Beş modelin tamamı için tek bir liderlik tablosu sayısı çıkmıyor' },
    ],
    contribution: [
      'The capability taxonomy — native bbox, native point, prompt-induced — and the rule that keeps them apart.',
      'Per-condition coordinate handling, which is the part most likely to fail silently: absolute-pixel xyxy converted to canonical xywh, points normalised to 0–1000 scaled with post-preprocessing dimensions.',
      'Tests that enforce the rules rather than trusting them — one checks raw and derived outputs never mix, another that locked protocol decisions have not silently changed.',
    ],
    contributionTr: [
      'Yetenek taksonomisi — native bbox, native point, prompt kaynaklı — ve bunları ayrı tutan kural.',
      'Koşul başına koordinat işleme; sessizce bozulmaya en açık kısım: mutlak piksel xyxy kanonik xywh’ye çevrilir, 0–1000’e normalize noktalar ön işleme sonrası boyutlarla ölçeklenir.',
      'Kuralları varsaymak yerine zorunlu kılan testler — biri ham ve türetilmiş çıktıların hiç karışmadığını, diğeri kilitli protokol kararlarının sessizce değişmediğini kontrol eder.',
    ],
    limitations: [
      'There are no results. Datasets and model adapters are the remaining work, and the project deliberately stops at the line where results would begin.',
      'A frozen protocol is only as good as the judgement that froze it, and that judgement stays untested until the first experiment runs.',
    ],
    limitationsTr: [
      'Sonuç yok. Veri kümeleri ve model adaptörleri kalan iş; proje bilinçli olarak sonuçların başlayacağı çizgide duruyor.',
      'Dondurulmuş bir protokol, onu donduran muhakeme kadar iyidir ve o muhakeme ilk deney koşana kadar sınanmamış kalır.',
    ],
    futureWork: [
      'Download the splits, implement the model adapters, then run E1.',
    ],
    futureWorkTr: [
      'Split’leri indir, model adaptörlerini yaz, sonra E1’i koş.',
    ],
  },
  {
    slug: 'algorithm-mentor-mcp',
    category: 'AI Agents & Tooling',
    cover: '/projects/algorithm-mentor-mcp/cover.svg',
    mark: 'MARK XXIX',
    codename: 'The Mentor',
    title: 'Algorithm Mentor MCP',
    subtitle: 'Turns an LLM from an answer machine into something that notices where you are weak',
    subtitleTr: 'Bir LLM’i cevap makinesi olmaktan çıkarıp nerede zayıf olduğunu fark eden bir şeye çevirir',
    oneLiner: 'Ask it for the answer and you will not get one. It hands you a problem, grades the attempt server-side, and picks what you should learn next.',
    oneLinerTr: 'Cevabı sorarsan alamazsın. Sana problem verir, denemeyi sunucu tarafında puanlar ve sırada ne öğrenmen gerektiğine karar verir.',
    language: 'Python',
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.5)',
    tags: ['MCP', 'Mentoring', 'SQLite'],
    github: gh('algorithm-mentor-mcp'),
    images: [
      { src: '/projects/algorithm-mentor-mcp/cover.svg', caption: 'The loop: assess, pick a topic, solve, review, update the profile, choose what comes next', captionTr: 'Döngü: değerlendir, konu seç, çöz, incele, profili güncelle, sıradakini belirle' },
      { src: '/projects/algorithm-mentor-mcp/01-session-start.png', caption: 'A session opens in whichever language you write in — the mentor assesses your level before anything is recorded', captionTr: 'Oturum hangi dilde yazarsan o dilde açılır — mentor, hiçbir şey kaydedilmeden önce seviyeni değerlendirir' },
      { src: '/projects/algorithm-mentor-mcp/02-tool-permission.png', caption: 'Every tool call is visible and approved by the user in the host — topic and difficulty are right there in the arguments', captionTr: 'Her tool çağrısı host’ta görünür ve kullanıcı onayından geçer — konu ve zorluk doğrudan argümanlarda' },
      { src: '/projects/algorithm-mentor-mcp/04-problem.png', caption: 'A problem arrives with starter code and visible examples; the hidden test cases stay hidden', captionTr: 'Problem, başlangıç kodu ve görünür örneklerle gelir; gizli test case’ler gizli kalır' },
      { src: '/projects/algorithm-mentor-mcp/05-hint-and-review.png', caption: 'One hint was used, the code passed on the retry, and the attempt scored 0.8 instead of 1.0', captionTr: 'Bir ipucu kullanıldı, kod ikinci denemede geçti ve deneme 1.0 yerine 0.8 aldı' },
    ],
    overview:
      'A Model Context Protocol server that plugs into a host like Claude Desktop and runs an algorithm study session with you, in Turkish or English. The design problem it solves is the obvious failure mode of studying algorithms with an LLM: ask for help and you get the solution, which teaches nothing and leaves no record of what you actually know. Here the model is only the interface. It cannot award points, cannot see hidden test cases, and cannot write to your profile with a number it made up — the server derives every score from a fixed table, using narrow inputs like whether the tests passed and how many hints were spent.',
    overviewTr:
      'Claude Desktop gibi bir host’a bağlanan ve seninle Türkçe ya da İngilizce bir algoritma çalışma oturumu yürüten bir Model Context Protocol sunucusu. Çözdüğü tasarım problemi, algoritmayı bir LLM’le çalışmanın bariz açığı: yardım istersin, çözümü alırsın; bu hiçbir şey öğretmez ve gerçekte ne bildiğine dair bir kayıt bırakmaz. Burada model yalnızca arayüz. Puan veremez, gizli test case’leri göremez ve profiline uydurduğu bir sayıyı yazamaz — sunucu her puanı sabit bir tablodan, testlerin geçip geçmediği ve kaç ipucu harcandığı gibi dar girdilerle üretir.',
    stack: [
      { label: 'Languages', items: ['Python 3.11+'] },
      { label: 'Frameworks', items: ['MCP Python SDK (v2)'] },
      { label: 'Storage', items: ['SQLite (profile.db)'] },
      { label: 'Testing', items: ['pytest — 535 tests incl. a real end-to-end MCP session'] },
      { label: 'Tools', items: ['Claude Desktop (host)', 'subprocess sandbox with time & resource limits'] },
    ],
    architecture: [
      'The server exposes nine tools and the host calls them in order. The critical boundary is that the host never computes a score: review_solution reads a fixed rubric, classifies the error type, and update_profile validates the result before anything is written. Profile data — per-topic scores, the latest evidence, and the full attempt history — lives in a SQLite database whose path is resolved independently of the working directory, so the session opens the same profile no matter where the server was started from.',
      'Code execution sits behind an ExecutionEngine interface with a subprocess PythonRunner underneath it, bounded by a wall-clock timeout and resource limits; swapping in a Docker-based runner later does not leak into the callers. Domain logic is split from tools and storage (domain/, execution/, storage/, tools/), each tool is specified in docs/TOOLS.md before it is written, and every tool ships with at least one test — 535 of them, up to a real end-to-end MCP session.',
    ],
    architectureTr: [
      'Sunucu dokuz tool yayınlar ve host bunları sırayla çağırır. Kritik sınır şu: host asla puan hesaplamaz; review_solution sabit bir tablodan okur, hata tipini sınıflandırır ve update_profile sonucu, hiçbir şey yazılmadan önce doğrular. Profil verisi — konu bazlı skorlar, son kanıtlar ve tüm deneme geçmişi — yolu çalışma dizininden bağımsız çözülen bir SQLite veritabanında durur; böylece sunucu nereden başlatılırsa başlatılsın aynı profil açılır.',
      'Kod çalıştırma, altında subprocess tabanlı bir PythonRunner bulunan ExecutionEngine arayüzünün arkasındadır ve duvar saati zaman aşımı ile kaynak limitleriyle sınırlanır; ileride Docker tabanlı bir runner’a geçmek çağıranlara sızmaz. Alan mantığı; tool’lar ve depolamadan ayrılmıştır (domain/, execution/, storage/, tools/), her tool yazılmadan önce docs/TOOLS.md’de spesifiye edilir ve her tool en az bir testle gelir — gerçek bir uçtan uca MCP oturumuna kadar toplam 535 test.',
    ],
    // --- new schema (12 Sep 2026). Legacy fields below are kept until the render migration.
    role: 'Solo',
    period: '2026',
    status: 'shipped',
    tier: 'featured',
    problem:
      'Studying algorithms with an LLM has an obvious failure mode: you ask for help, you get the solution, you learn nothing, and no record exists of what you actually know. Letting the model grade you does not fix it, because it can simply award the score.',
    problemTr:
      'Algoritma çalışmanın LLM’le bariz bir kusuru var: yardım istersin, çözümü alırsın, hiçbir şey öğrenmezsin ve neyi bildiğine dair kayıt kalmaz. Puanlamayı modele bırakmak da çözmez, çünkü modeli puanı kendi verebilir.',
    flow: 'Claude Desktop host → 9 MCP tools → domain layer → submitted code runs in a separate process under time and resource limits against hidden tests → server-side rubric → SQLite profile with EMA mastery',
    flowTr: 'Claude Desktop host → 9 MCP tool → domain katmanı → gönderilen kod, gizli testlere karşı zaman ve kaynak sınırlı ayrı bir süreçte çalışır → sunucu tarafı rubrik → EMA ustalıklı SQLite profil',
    metrics: [
      { label: 'Tests', value: '535', condition: 'validation scope — including a real end-to-end MCP session' },
      { label: 'Tools', value: '9', condition: 'system scope — assess, problem, submit, hint, explain, reference, review, update, next' },
      { label: 'Content', value: '22 problems · 11 topics', condition: 'content scope — on a prerequisite graph, authored in Turkish and English' },
      { label: 'Hint cost', value: '1.0 / 0.8 / 0.6 / 0.5', condition: 'scoring rule — no hint / one hint / two or more / approach explained without code' },
      { label: 'Failure handling', value: '3 consecutive failures', condition: 'scoring rule — drops the learner back to a prerequisite instead of repeating the same wall' },
    ],
    metricsTr: [
      { label: 'Test', value: '535', condition: 'doğrulama kapsamı — gerçek bir uçtan uca MCP oturumu dahil' },
      { label: 'Tool', value: '9', condition: 'sistem kapsamı — değerlendir, problem, gönder, ipucu, açıkla, referans, incele, güncelle, sonraki' },
      { label: 'İçerik', value: '22 problem · 11 konu', condition: 'içerik kapsamı — ön koşul grafiğinde, Türkçe ve İngilizce yazıldı' },
      { label: 'İpucu maliyeti', value: '1,0 / 0,8 / 0,6 / 0,5', condition: 'puanlama kuralı — ipuçsuz / bir ipucu / iki ve üzeri / kod yazmadan yaklaşımı açıklamak' },
      { label: 'Başarısızlık yönetimi', value: 'arka arkaya 3', condition: 'puanlama kuralı — aynı duvarı tekrarlamak yerine öğrenciyi bir ön koşula geri düşürür' },
    ],
    useCases: [
      'Technical interview preparation with a record of what was actually learned',
      'MCP-based developer tooling where the host must not be trusted with scoring',
    ],
    useCasesTr: [
      'Gerçekten neyin öğrenildiğinin kaydını tutan teknik mülakat hazırlığı',
      'Puanlama konusunda host’a güvenilmemesi gereken MCP tabanlı geliştirici araçları',
    ],
    decisions: [
      { choice: 'Scoring lives on the server, and the model supplies only bounded facts', why: 'The model cannot inflate a profile by inventing a number — it reports whether tests passed and how many hints were spent, and the server derives the score from a fixed rubric', tradeoff: 'Every new scoring nuance needs a server change; the host cannot be extended by prompting' },
      { choice: 'Code execution behind an ExecutionEngine interface with a subprocess runner underneath', why: 'Swapping in a Docker-based runner later does not leak into the callers', tradeoff: 'A subprocess with resource limits is not a real sandbox for untrusted input' },
    ],
    decisionsTr: [
      { choice: 'Puanlama sunucuda yaşar, model yalnızca sınırlı olgular bildirir', why: 'Model uydurduğu bir sayıyla profili şişiremez — testlerin geçip geçmediğini ve kaç ipucu harcandığını bildirir, skoru sabit bir rubrikten sunucu türetir', tradeoff: 'Her yeni puanlama nüansı sunucu değişikliği gerektirir; host prompt’la genişletilemez' },
      { choice: 'Kod çalıştırma, altında subprocess koşucusu olan bir ExecutionEngine arayüzünün arkasında', why: 'Sonradan Docker tabanlı bir koşucuya geçmek çağıranlara sızmıyor', tradeoff: 'Kaynak sınırlı bir subprocess, güvenilmeyen girdi için gerçek bir sandbox değil' },
    ],
    contribution: [
      'The trust boundary, which is the actual idea: the host never computes a score, and update_profile validates the result before anything is written.',
      'The EMA mastery model and the prerequisite graph that decides what comes next.',
      'Specifying each tool in docs/TOOLS.md before writing it, and a schema test that fails the build on a missing language or edge case. The MCP Python SDK is off the shelf.',
    ],
    contributionTr: [
      'Güven sınırı — asıl fikir bu: host hiçbir zaman skor hesaplamaz ve update_profile, hiçbir şey yazılmadan önce sonucu doğrular.',
      'EMA ustalık modeli ve sıradakini belirleyen ön koşul grafiği.',
      'Her tool’un yazılmadan önce docs/TOOLS.md içinde spesifikasyonunun çıkarılması ve eksik dil ya da uç durumda derlemeyi düşüren şema testi. MCP Python SDK hazır.',
    ],
    limitations: [
      '22 problems across 11 topics is enough to demonstrate the mechanism, not enough for a full curriculum.',
      'The sandbox is a subprocess with time and resource limits, not a container — adequate for a local single-user session, not for untrusted input.',
    ],
    limitationsTr: [
      '11 konuda 22 problem mekanizmayı göstermeye yeter, tam bir müfredata yetmez.',
      'Sandbox, konteyner değil zaman ve kaynak sınırlı bir subprocess — yerel tek kullanıcılı oturum için yeterli, güvenilmeyen girdi için değil.',
    ],
  },
];

export default PROJECTS;
export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);

// Turkish names for the categories in section 6 of the rules. Shared by the
// project grid and the home page showcase.
export const CATEGORY_TR = {
  'Research & Benchmarks': 'Araştırma & Benchmark',
  'LLM & NLP': 'Dil Modelleri & NLP',
  'AI Agents & Tooling': 'Yapay Zekâ Ajanları',
  'Computer Vision': 'Bilgisayarlı Görü',
  'Machine Learning': 'Makine Öğrenmesi',
  'Systems & Graphics': 'Sistem & Grafik',
  'Apps & Tools': 'Uygulamalar & Araçlar',
};
