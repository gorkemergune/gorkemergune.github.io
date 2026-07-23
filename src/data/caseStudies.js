// Long-form case studies for the strongest projects. Keyed by project slug.
// Each language block has the same six sections. Rendered at
// /project/<slug>/case-study by CaseStudyPage.

export const CASE_STUDIES = {
  'yolo-custom-detector': {
    en: {
      problem: [
        'Modern object detectors are trained on public datasets of common categories. But what if the object you need to find exists in no dataset at all — a single, specific real-world item? I wanted to prove I could teach a detector a brand-new object from scratch, end to end.',
      ],
      solution: [
        'I treated one specific Rotring mechanical pencil as a new class and built the entire pipeline around it: photographing it under varied conditions, hand-annotating bounding boxes, splitting the data, and fine-tuning YOLO11n from its pretrained checkpoint.',
        'Because the backbone already understood generic visual features, fine-tuning only had to teach the new object — which is why roughly a hundred images were enough to reach production-grade accuracy.',
      ],
      architecture: [
        'The repo is a small set of focused scripts: dataset verification, a deterministic 70/20/10 split, training at 640×640 for 50 epochs with auto batch sizing and early stopping, and inference that draws the detection box.',
        'The best checkpoint is copied to models/best.pt automatically, and a central config holds every path and hyperparameter so the whole run is reproducible.',
      ],
      challenges: [
        'My first dataset was shot on one desk, in one light, from one angle — the model scored beautifully in validation and then failed on anything new. It had memorized the scene, not the object.',
        'The fix was deliberate diversity: different lighting, distances, backgrounds, rotations, and partial occlusions, so the network was forced to isolate the object’s own features.',
      ],
      results: [
        '90.3% mAP@50 and 0.90 precision on the validation set.',
        '11 of 12 held-out test images detected at 0.88–0.95 confidence, plus correct detection on a brand-new photo taken after training.',
        '~45 ms per image on a laptop CPU — no GPU required — with a ~5 MB weights file.',
      ],
      lessons: [
        'When a model underperforms, the instinct is to reach for a bigger architecture. Far more often, the answer is hiding in the dataset.',
        'Diversity in the data did more for accuracy than any hyperparameter I touched.',
      ],
    },
    tr: {
      problem: [
        'Modern nesne dedektörleri, yaygın kategorilerden oluşan açık veri kümeleriyle eğitilir. Peki bulman gereken nesne hiçbir veri kümesinde yoksa — tek, belirli bir gerçek nesneyse? Bir dedektöre sıfırdan, uçtan uca yepyeni bir nesne öğretebildiğimi kanıtlamak istedim.',
      ],
      solution: [
        'Belirli tek bir Rotring mekanik kalemi yeni bir sınıf olarak ele aldım ve tüm hattı bunun etrafına kurdum: farklı koşullarda fotoğraflama, sınırlayıcı kutuları elle etiketleme, veriyi bölme ve YOLO11n’i önceden eğitilmiş kontrol noktasından ince ayarlama.',
        'Omurga genel görsel özellikleri zaten bildiği için ince ayarın yalnızca yeni nesneyi öğretmesi yeterliydi — yaklaşık yüz görselin üretim seviyesi doğruluğa ulaşmaya yetmesinin nedeni de budur.',
      ],
      architecture: [
        'Depo, birkaç odaklı betikten oluşur: veri kümesi doğrulama, deterministik %70/%20/%10 bölme, 640×640 çözünürlükte 50 epoch eğitim (otomatik batch ve erken durdurmayla) ve tespit kutusunu çizen çıkarım.',
        'En iyi kontrol noktası otomatik olarak models/best.pt’ye kopyalanır; merkezî bir config tüm yolları ve hiperparametreleri tutar; böylece çalışmanın tamamı yeniden üretilebilir.',
      ],
      challenges: [
        'İlk veri kümem tek bir masada, tek ışıkta, tek açıdan çekilmişti — model doğrulamada harika puan aldı, sonra yeni her şeyde çöktü. Nesneyi değil, sahneyi ezberlemişti.',
        'Çözüm bilinçli çeşitlilikti: farklı ışık, mesafe, arka plan, dönüş ve kısmi kapanmalar; böylece ağ nesnenin kendi özelliklerini yalıtmaya zorlandı.',
      ],
      results: [
        'Doğrulama kümesinde %90,3 mAP@50 ve 0,90 kesinlik.',
        'Ayrılmış 12 test görselinin 11’i 0,88–0,95 güvenle tespit edildi; ayrıca eğitimden sonra çekilmiş yepyeni bir fotoğrafta da doğru tespit.',
        'Dizüstü CPU’da görsel başına ~45 ms — GPU gerektirmez — ve ~5 MB’lik ağırlık dosyası.',
      ],
      lessons: [
        'Bir model beklentiyi karşılamayınca ilk içgüdü daha büyük bir mimariye uzanmaktır. Oysa cevap çok daha sık veri kümesinde saklıdır.',
        'Verideki çeşitlilik, doğruluğa dokunduğum her hiperparametreden daha fazlasını kattı.',
      ],
    },
  },

  'email-phishing-detection': {
    en: {
      problem: ['Phishing emails cost people real money, and they rely on a recognizable vocabulary of urgency and impersonation. Could a simple, transparent model catch them from text alone — and how much does the way you represent the data actually matter?'],
      solution: [
        'I built a clean, linear pipeline: clean the text, vectorize it with TF-IDF over words and bigrams, split 80/20 with stratification, and train a logistic regression.',
        'To make the point about representation, I also trained a model on eight hand-crafted numerical features and compared the two head to head.',
      ],
      architecture: [
        'The whole study lives in one linear notebook, mirrored in English and Turkish. Raw CEAS_08 email text (~39,000 emails) is cleaned and TF-IDF-vectorized, then a logistic regression is trained and evaluated with accuracy, precision, recall, F1, a confusion matrix, and ROC.',
        'A second 525,000-row dataset with only numerical features is used purely for contrast; datasets download automatically via kagglehub, and the final cell classifies any pasted email.',
      ],
      challenges: [
        'The interesting tension was resisting the urge to reach for a heavyweight model. The honest experiment was to show that a simple model on the right features beats a fancier one on the wrong features.',
        'Keeping the evaluation honest — stratified splits, a fixed seed, and being explicit that 0.99 F1 reflects this dataset, not live adversarial email — mattered as much as the accuracy.',
      ],
      results: [
        'TF-IDF + Logistic Regression: 0.99 accuracy, 0.99 precision, 1.00 recall, 0.99 F1 on the held-out test set.',
        'The 8-numerical-feature baseline topped out around 0.68 F1 — same problem, same classifier family, dramatically less signal.',
      ],
      lessons: [
        'Reach for the simplest model that could work, and spend your energy on the features.',
        'The representation of your data often matters more than the sophistication of your model.',
      ],
    },
    tr: {
      problem: ['Oltalama e-postaları insanlara gerçek para kaybettirir ve tanıdık bir aciliyet ve taklit kelime dağarcığına yaslanır. Basit, şeffaf bir model bunları yalnızca metinden yakalayabilir mi — ve veriyi temsil etme biçimin gerçekte ne kadar önemli?'],
      solution: [
        'Temiz, doğrusal bir hat kurdum: metni temizle, kelimeler ve ikili öbekler üzerinde TF-IDF ile vektörleştir, katmanlı %80/%20 böl ve bir lojistik regresyon eğit.',
        'Temsilin önemini göstermek için elle çıkarılmış sekiz sayısal özellikle de bir model eğitip ikisini yan yana karşılaştırdım.',
      ],
      architecture: [
        'Tüm çalışma, İngilizce ve Türkçe olarak yansıtılan tek bir doğrusal not defterinde yaşar. Ham CEAS_08 e-posta metni (~39.000 e-posta) temizlenip TF-IDF ile vektörleştirilir; sonra bir lojistik regresyon eğitilir ve doğruluk, kesinlik, duyarlılık, F1, karışıklık matrisi ve ROC ile değerlendirilir.',
        'Yalnızca sayısal özelliklere sahip 525.000 satırlık ikinci bir veri kümesi sırf karşılaştırma için kullanılır; veri kümeleri kagglehub ile otomatik iner ve son hücre yapıştırılan herhangi bir e-postayı sınıflandırır.',
      ],
      challenges: [
        'İlginç gerilim, ağır sıklet bir modele uzanma dürtüsüne direnmekti. Dürüst deney, doğru özellikler üzerindeki basit bir modelin yanlış özellikler üzerindeki gösterişli bir modeli yendiğini göstermekti.',
        'Değerlendirmeyi dürüst tutmak — katmanlı bölme, sabit tohum ve 0,99 F1’in canlı düşmanca e-postayı değil bu veri kümesini yansıttığını açıkça belirtmek — en az doğruluk kadar önemliydi.',
      ],
      results: [
        'TF-IDF + Lojistik Regresyon: ayrılmış test kümesinde 0,99 doğruluk, 0,99 kesinlik, 1,00 duyarlılık, 0,99 F1.',
        '8 sayısal özellikli temel model ~0,68 F1’de kaldı — aynı problem, aynı sınıflandırıcı ailesi, çarpıcı biçimde daha az sinyal.',
      ],
      lessons: [
        'İşe yarayabilecek en basit modele uzan ve enerjini özelliklere harca.',
        'Verinin temsili çoğu zaman modelin karmaşıklığından daha çok şey ifade eder.',
      ],
    },
  },

  'face-detection-pipeline': {
    en: {
      problem: ['Off-the-shelf short-range face detectors miss small faces and hallucinate faces in blurred textures — and no single confidence threshold fixes both problems at once.'],
      solution: [
        'I wrapped MediaPipe’s BlazeFace in a two-stage detect-and-verify pipeline: collect candidates permissively at a low threshold, then zoom into each one and re-detect at a stricter threshold.',
        'Real faces re-score above 0.90 when enlarged; false positives fail re-detection. Same model, same dependencies, measurably better accuracy.',
      ],
      architecture: [
        'Stage 1 runs the detector at 0.30 over the full image plus its top and bottom halves, so small faces become proportionally larger. Stage 2 zooms into each candidate and re-detects at 0.65, keeping only faces centered in the crop.',
        'Overlapping detections are deduplicated by IoU, and zero-face, low-confidence, or many-face images are routed to a human-review queue.',
      ],
      challenges: [
        'The core tension is recall vs precision: lowering the threshold finds small faces but invites false positives. The two-stage design resolves it by making the second pass do the filtering.',
        'Running a 140,000-image benchmark reliably meant per-image CSV logging, safe resume after interruption, and never crashing on a corrupt file.',
      ],
      results: [
        '140,000 images processed with zero failures in 25 minutes 17 seconds.',
        '~11 ms per image on a single-threaded Apple M3 CPU; only 0.26% of images flagged for human review.',
        '140,836 faces detected — an average of 1.006 per image.',
      ],
      lessons: [
        'You can often beat a model’s limitations with a smarter pipeline around it, without touching the weights.',
        'Designing for failure — resumable runs, corrupt-file handling, a review queue — is what makes a benchmark trustworthy.',
      ],
    },
    tr: {
      problem: ['Hazır kısa menzilli yüz dedektörleri küçük yüzleri kaçırır ve bulanık dokularda olmayan yüzler görür — ve tek bir güven eşiği iki sorunu birden çözmez.'],
      solution: [
        'MediaPipe’ın BlazeFace modelini iki aşamalı bir tespit-et-doğrula hattıyla sardım: adayları düşük eşikte esnekçe topla, sonra her birine yakınlaş ve daha katı bir eşikle yeniden tespit et.',
        'Gerçek yüzler büyütüldüğünde 0,90’ın üzerinde puan alır; hatalı tespitler yeniden doğrulamayı geçemez. Aynı model, aynı bağımlılıklar, ölçülebilir biçimde daha iyi doğruluk.',
      ],
      architecture: [
        '1. aşama, dedektörü görselin tamamı ile üst ve alt yarıları üzerinde 0,30 eşiğiyle çalıştırır; böylece küçük yüzler orantılı olarak büyür. 2. aşama her adaya yakınlaşır ve 0,65 eşiğiyle yeniden tespit eder; yalnızca kırpmanın ortasındaki yüzleri tutar.',
        'Çakışan tespitler IoU ile tekilleştirilir; yüz bulunamayan, düşük güvenli ya da çok yüzlü görseller insan inceleme kuyruğuna yönlendirilir.',
      ],
      challenges: [
        'Temel gerilim duyarlılık ve kesinlik arasındadır: eşiği düşürmek küçük yüzleri bulur ama hatalı tespit davet eder. İki aşamalı tasarım, filtrelemeyi ikinci geçişe yaptırarak bunu çözer.',
        '140.000 görsellik testi güvenilir çalıştırmak; görsel başına CSV kaydı, kesinti sonrası güvenli devam ve bozuk dosyada asla çökmemek demekti.',
      ],
      results: [
        '140.000 görsel, 25 dakika 17 saniyede sıfır hatayla işlendi.',
        'Tek iş parçacıklı Apple M3 CPU’da görsel başına ~11 ms; görsellerin yalnızca %0,26’sı incelemeye ayrıldı.',
        '140.836 yüz tespit edildi — görsel başına ortalama 1,006.',
      ],
      lessons: [
        'Bir modelin sınırlarını, ağırlıklarına dokunmadan, etrafına kuracağın daha akıllı bir hatla çoğu zaman aşabilirsin.',
        'Başarısızlığa göre tasarlamak — devam ettirilebilir çalışmalar, bozuk dosya yönetimi, inceleme kuyruğu — bir testi güvenilir kılan şeydir.',
      ],
    },
  },

  'turkish-english-nmt': {
    en: {
      problem: ['Turkish is agglutinative and low-resource compared to English. How far can a lightweight, pretrained translation model be pushed on Turkish→English with a modest corpus and a single free GPU?'],
      solution: [
        'I fine-tuned Helsinki-NLP’s opus-mt-tr-en (MarianMT) on the Tatoeba parallel corpus, covering the full workflow from data cleaning to BLEU evaluation.',
        'The whole experiment is reproducible end to end on a free Colab T4 in about an hour.',
      ],
      architecture: [
        'A numbered pipeline: clean and 80/10/10-split the corpus, compare character/word/byte/BPE tokenization, fine-tune with the Hugging Face Trainer (fp16, effective batch 128, 3 epochs), then evaluate with SacreBLEU and an interactive beam-search demo.',
        'The model is a Transformer encoder-decoder with a shared 62k-token SentencePiece BPE vocabulary, trained at max length 128.',
      ],
      challenges: [
        'Fitting a real training run into a free GPU’s memory and time budget meant fp16, gradient accumulation for an effective batch of 128, and early stopping.',
        'Turkish morphology makes tokenization choices matter more than usual, which is why the pipeline studies them explicitly.',
      ],
      results: [
        'BLEU improved from ~36 to ~43 (+7) on the test set.',
        '1-gram and 2-gram precision rose by roughly 7% and 8%.',
        'Trained in ~60–90 minutes on a single T4 over 522,975 sentence pairs.',
      ],
      lessons: [
        'A strong pretrained checkpoint plus careful fine-tuning beats training from scratch, especially with limited data and compute.',
        'For morphologically rich languages, how you tokenize is a first-class design decision, not an afterthought.',
      ],
    },
    tr: {
      problem: ['Türkçe, İngilizceye kıyasla sondan eklemeli ve düşük kaynaklı bir dildir. Hafif, önceden eğitilmiş bir çeviri modeli, mütevazı bir derlem ve tek bir ücretsiz GPU ile Türkçe→İngilizce çeviride ne kadar ileri gidebilir?'],
      solution: [
        'Helsinki-NLP’nin opus-mt-tr-en (MarianMT) modelini Tatoeba paralel derlemi üzerinde ince ayarladım; veri temizlemeden BLEU değerlendirmesine tüm iş akışını kapsayarak.',
        'Deneyin tamamı, ücretsiz bir Colab T4’te yaklaşık bir saatte uçtan uca yeniden üretilebilir.',
      ],
      architecture: [
        'Numaralı bir hat: derlemi temizle ve %80/%10/%10 böl, karakter/kelime/bayt/BPE tokenizasyonunu karşılaştır, Hugging Face Trainer ile ince ayarla (fp16, efektif batch 128, 3 epoch), sonra SacreBLEU ve etkileşimli ışın aramalı demo ile değerlendir.',
        'Model, 62 bin tokenlık ortak bir SentencePiece BPE sözlüğüne sahip, en fazla 128 uzunlukta eğitilmiş bir Transformer kodlayıcı-kod çözücüdür.',
      ],
      challenges: [
        'Gerçek bir eğitimi ücretsiz bir GPU’nun bellek ve zaman bütçesine sığdırmak; fp16, 128’lik efektif batch için gradyan biriktirme ve erken durdurma demekti.',
        'Türkçe biçimbilimi, tokenizasyon seçimlerini normalden daha önemli kılar; hattın bunları açıkça incelemesinin nedeni budur.',
      ],
      results: [
        'BLEU, test kümesinde ~36’dan ~43’e (+7) yükseldi.',
        '1-gram ve 2-gram kesinliği kabaca %7 ve %8 arttı.',
        '522.975 cümle çifti üzerinde tek bir T4’te ~60–90 dakikada eğitildi.',
      ],
      lessons: [
        'Güçlü bir önceden eğitilmiş kontrol noktası artı özenli ince ayar, özellikle sınırlı veri ve işlem gücüyle, sıfırdan eğitmeyi yener.',
        'Biçimbilimsel açıdan zengin diller için tokenizasyon, sonradan düşünülecek bir ayrıntı değil, birinci sınıf bir tasarım kararıdır.',
      ],
    },
  },

  'gorkem-os': {
    en: {
      problem: ['I wanted to understand how a computer really works at the lowest level — not read about it, but build it: from the first boot-sector instruction to a running interactive shell.'],
      solution: [
        'I wrote a hobby x86 operating system from scratch in C and NASM assembly, implementing every layer by hand, guided by the OSDev Wiki and the Intel manuals.',
        'Nothing is borrowed wholesale — the bootloader, interrupts, memory manager, scheduler, drivers, file system, and shell are all built up in sequence.',
      ],
      architecture: [
        'The assembly bootloader loads the kernel and jumps to it; the kernel installs the GDT and IDT, remaps the PIC, and wires interrupt handlers. Memory is layered: a physical memory manager, paging, and a kernel heap.',
        'A timer-driven scheduler with assembly context switching runs processes; drivers cover VGA text, keyboard, PIT, and ATA disk, supporting a custom file system and an interactive shell that can even launch Snake.',
      ],
      challenges: [
        'At this level the machine does exactly what you say, even when it makes no sense — a wrong pointer or a mis-set descriptor triple-faults the whole system with no stack trace.',
        'Getting interrupts, paging, and context switching to cooperate required reasoning about the hardware directly, with QEMU and GDB as the only windows in.',
      ],
      results: [
        'Boots on x86 via QEMU with a full kernel: GDT/IDT, paging, physical memory manager, heap, and scheduler.',
        'Drivers for VGA, keyboard, timer, and ATA disk, plus a custom file system, an interactive shell, and Snake running on bare metal.',
      ],
      lessons: [
        'Building the abstraction yourself is the fastest way to stop treating it as magic.',
        'Low-level systems reward patience and precision — the feedback is brutal, but the mental model you build is permanent.',
      ],
    },
    tr: {
      problem: ['Bir bilgisayarın en alt seviyede gerçekte nasıl çalıştığını anlamak istedim — okumak değil, inşa etmek: ilk önyükleme sektörü komutundan çalışan etkileşimli bir kabuğa kadar.'],
      solution: [
        'Sıfırdan, C ve NASM assembly ile hobi amaçlı bir x86 işletim sistemi yazdım; her katmanı OSDev Wiki ve Intel kılavuzları rehberliğinde elle uyguladım.',
        'Hiçbir şey toptan ödünç alınmadı — bootloader, kesmeler, bellek yöneticisi, zamanlayıcı, sürücüler, dosya sistemi ve kabuk sırayla kuruldu.',
      ],
      architecture: [
        'Assembly bootloader çekirdeği yükleyip ona atlar; çekirdek GDT ve IDT’yi kurar, PIC’i yeniden eşler ve kesme işleyicilerini bağlar. Bellek katmanlıdır: fiziksel bellek yöneticisi, sayfalama ve çekirdek yığını.',
        'Assembly bağlam değiştirmeli, zamanlayıcı güdümlü bir görev zamanlayıcı süreçleri çalıştırır; sürücüler VGA metin, klavye, PIT ve ATA diski kapsar; özel bir dosya sistemini ve Snake’i bile başlatabilen etkileşimli bir kabuğu destekler.',
      ],
      challenges: [
        'Bu seviyede makine, anlamsız olsa bile tam olarak söylediğini yapar — yanlış bir işaretçi ya da hatalı kurulmuş bir tanımlayıcı, hiçbir yığın izi olmadan tüm sistemi triple-fault yapar.',
        'Kesmeleri, sayfalamayı ve bağlam değiştirmeyi uyumlu çalıştırmak, tek pencerelerin QEMU ve GDB olduğu bir ortamda donanım hakkında doğrudan akıl yürütmeyi gerektirdi.',
      ],
      results: [
        'QEMU üzerinde x86’da tam bir çekirdekle açılır: GDT/IDT, sayfalama, fiziksel bellek yöneticisi, yığın ve zamanlayıcı.',
        'VGA, klavye, zamanlayıcı ve ATA disk sürücüleri; ayrıca özel bir dosya sistemi, etkileşimli bir kabuk ve doğrudan donanımda çalışan Snake.',
      ],
      lessons: [
        'Soyutlamayı kendin inşa etmek, onu sihir gibi görmeyi bırakmanın en hızlı yoludur.',
        'Düşük seviye sistemler sabrı ve titizliği ödüllendirir — geri bildirim acımasızdır ama kurduğun zihinsel model kalıcıdır.',
      ],
    },
  },
  'miniature-transformers-from-scratch': {
    en: {
      problem: ['Transformers are usually consumed as a black box — you import a model and call it. I wanted the opposite: to understand every moving part of a GPT by building each one myself, with nothing hidden behind a library call.'],
      solution: [
        'I implemented a decoder-only, GPT-style transformer from scratch in PyTorch — writing the tokenizer, embeddings, self- and multi-head attention, causal masking, layer norm, MLP, and decoder blocks by hand, then assembling them into a small trainable model.',
        'The work is staged as numbered notebooks that grow the model piece by piece, so each concept is built and tested before the next is added.',
      ],
      architecture: [
        'usta_embedding maps token ids to vectors; usta_self_attention and usta_multi_head_attention implement scaled dot-product attention with causal masking; usta_layer_norm and usta_mlp form the feed-forward path; usta_decoder_block stacks attention and MLP with residual connections; and usta_model assembles the blocks and projects to vocabulary logits.',
        'A custom usta_tokenizer handles encoding/decoding, compared against a Hugging Face tokenizer. A PyTorch training loop trains V1 — a 64-token-context prototype — end to end on a free Colab GPU.',
      ],
      challenges: [
        'Getting causal masking and the attention shapes exactly right is unforgiving — an off-by-one in the mask silently lets the model peek at the future and quietly breaks training.',
        'Keeping the prototype small enough to train on a free GPU while still learning anything meaningful meant deliberately limiting context and vocabulary.',
      ],
      results: [
        'A working decoder-only GPT built entirely from hand-written components.',
        'V1 prototype: 64-token context, trained end to end on a free Colab GPU.',
        'Text-completion inference: give a prompt, get the model’s continuation.',
      ],
      lessons: [
        'Building a transformer by hand turns the paper diagrams into something you actually understand — attention stops being magic.',
        'The hardest bugs live in shapes and masks, not in the math itself.',
      ],
    },
    tr: {
      problem: ['Transformer’lar genelde kara kutu olarak kullanılır — bir modeli içe aktarır ve çağırırsın. Ben tam tersini istedim: bir GPT’nin her parçasını, hiçbir şey kütüphane çağrısının arkasına saklanmadan, kendim inşa ederek anlamak.'],
      solution: [
        'PyTorch’ta sıfırdan, yalnızca kod çözücülü GPT tarzı bir transformer uyguladım — tokenizer, gömmeler, öz ve çok başlı dikkat, nedensel maskeleme, katman normu, MLP ve kod çözücü bloklarını elle yazıp küçük, eğitilebilir bir modelde birleştirdim.',
        'Çalışma, modeli parça parça büyüten numaralı not defterlerine bölündü; böylece her kavram bir sonraki eklenmeden önce kurulup test edildi.',
      ],
      architecture: [
        'usta_embedding token kimliklerini vektörlere eşler; usta_self_attention ve usta_multi_head_attention nedensel maskelemeli ölçekli nokta-çarpım dikkatini uygular; usta_layer_norm ve usta_mlp ileri besleme yolunu oluşturur; usta_decoder_block dikkat ve MLP’yi artık bağlantılarla yığar; usta_model blokları birleştirip sözlük logit’lerine yansıtır.',
        'Özel bir usta_tokenizer kodlama/kod çözmeyi üstlenir ve bir Hugging Face tokenizer ile karşılaştırılır. Bir PyTorch eğitim döngüsü V1’i — 64 token bağlamlı bir prototip — ücretsiz bir Colab GPU’da uçtan uca eğitir.',
      ],
      challenges: [
        'Nedensel maskelemeyi ve dikkat boyutlarını tam doğru yapmak affetmez — maskede bir kayma, modelin sessizce geleceğe bakmasına izin verip eğitimi usulca bozar.',
        'Prototipi ücretsiz bir GPU’da eğitilecek kadar küçük tutarken anlamlı bir şey öğrenmesini sağlamak, bağlamı ve sözlüğü bilinçli olarak sınırlamayı gerektirdi.',
      ],
      results: [
        'Tamamen elle yazılmış bileşenlerden kurulmuş, çalışan bir yalnızca kod çözücülü GPT.',
        'V1 prototip: 64 token bağlam, ücretsiz bir Colab GPU’da uçtan uca eğitildi.',
        'Metin tamamlama çıkarımı: bir istem ver, modelin devamını al.',
      ],
      lessons: [
        'Bir transformer’ı elle inşa etmek, kâğıttaki şemaları gerçekten anladığın bir şeye dönüştürüyor — dikkat artık sihir olmaktan çıkıyor.',
        'En zor hatalar matematikte değil, boyutlarda ve maskelerde yaşıyor.',
      ],
    },
  },

  'llm-lora-finetuning': {
    en: {
      problem: [
        'Everyone shows off the fine-tune that worked. I wanted to actually learn the full LoRA/SFT workflow — data collection, dataset design, training, publishing, evaluation — on my own assistant, "ayarlicazhocam," built on the open-source Llama 3.2-3B. And I decided up front that whatever the result was, I would measure it honestly and keep the record public.',
      ],
      solution: [
        'I built the entire pipeline end to end. The dataset came from three sources: scrapers pulling public developer content, hand-written conversations to shape the persona, and 70 batches of synthetically generated instruction/response pairs (34 English + 36 Turkish). Everything merged into one bilingual corpus.',
        'Training used Unsloth to load Llama-3.2-3B in 4-bit, LoRA adapters, and TRL’s SFTTrainer. Both the model and the dataset were published to the Hugging Face Hub as gorkemergune/ayarlicazhocam-llama-3.2-3b and gorkemergune/ayarlicazhocam_finetune.',
      ],
      architecture: [
        'Data lives under scrapers/: per-source scrapers (dev.to, GitHub trending, Hugging Face, Stack Overflow, arXiv, Wikipedia), hand-authored JSON, and generate_bulk_*.py producing the synthetic batches, all combined by merge_all.py. Training and merging happen in src/Llama3.2-3BFinetune.ipynb.',
        'Evaluation is where I refused to cut corners. I ported a Turkish MMLU benchmark into a local, safe version (disabling its push_to_hub calls) and scored the merged GGUF under ollama on a stratified 310-question sample — proportional to the full 6,200-question set, so it is representative.',
      ],
      challenges: [
        'The result was bad, and the benchmark told me exactly how bad: 20.65% on Turkish MMLU — statistically identical to random guessing on 5-choice questions, 61st out of 67 models, and roughly half the score of the stock llama3.2:latest of the same size.',
        'Digging in, two symptoms stood out. The model followed the multiple-choice format 0% of the time — it echoed the prompt instead of answering. And asked "Who is Gorkem?", it invented a completely different biography every single run (a model, a blockchain figure, an actor), even though the correct answer is right there in the training data.',
      ],
      results: [
        'Root cause, traced from the published adapter: the shipped chat_template.jinja was still a Gemma-3 template (<start_of_turn> / <end_of_turn>) running on a Llama tokenizer, where those tokens aren’t special — so the turn structure silently broke and the persona facts never made it into the weights.',
        'The inconsistency itself is the proof: a model that had learned a fact would repeat it. Different fabrications each run means the fact was never learned — a distribution shift, not retrieval.',
        'The notebook is now corrected to the proper llama-3.1 template, with retraining and re-evaluation staged as the next iteration. Every number and finding is written up in BENCHMARK_REPORT.md.',
      ],
      lessons: [
        'The chat template is not a formatting detail — it is load-bearing. A template mismatch can quietly zero out an entire training run while every step still "succeeds".',
        'A negative result you can explain is worth more than a positive one you can’t. Measuring the failure properly taught me more than a lucky success would have.',
        'Fine-tuning shifts weight distributions; it does not memorize facts on command. Weak, malformed signal means the base model’s priors win — and you get confident hallucination.',
      ],
    },
    tr: {
      problem: [
        'Herkes işe yarayan ince ayarı sergiler. Ben ise LoRA/SFT iş akışının tamamını gerçekten öğrenmek istedim — veri toplama, veri kümesi tasarımı, eğitim, yayınlama, değerlendirme — hem de açık kaynaklı Llama 3.2-3B üzerine kurduğum kendi asistanım “ayarlicazhocam” üzerinde. Ve sonuç ne olursa olsun onu dürüstçe ölçeceğime, kaydı da herkese açık tutacağıma en baştan karar verdim.',
      ],
      solution: [
        'Tüm hattı uçtan uca kurdum. Veri kümesi üç kaynaktan geldi: herkese açık geliştirici içeriğini çeken kazıyıcılar, personayı şekillendiren elle yazılmış konuşmalar ve programatik üretilen 70 grup sentetik talimat/yanıt çifti (34 İngilizce + 36 Türkçe). Hepsi tek bir iki dilli derlemde birleşti.',
        'Eğitimde Llama-3.2-3B’yi 4-bit yüklemek için Unsloth, LoRA adaptörleri ve TRL’nin SFTTrainer’ı kullanıldı. Hem model hem veri kümesi Hugging Face Hub’a gorkemergune/ayarlicazhocam-llama-3.2-3b ve gorkemergune/ayarlicazhocam_finetune olarak yayınlandı.',
      ],
      architecture: [
        'Veri scrapers/ altında durur: kaynak başına kazıyıcılar (dev.to, GitHub trending, Hugging Face, Stack Overflow, arXiv, Wikipedia), elle yazılmış JSON ve sentetik grupları üreten generate_bulk_*.py; hepsi merge_all.py ile birleştirilir. Eğitim ve birleştirme src/Llama3.2-3BFinetune.ipynb içinde yapılır.',
        'Değerlendirmede köşe kesmeyi reddettim. Bir Türkçe MMLU benchmark’ını yerel ve güvenli bir sürüme taşıdım (push_to_hub çağrılarını devre dışı bırakarak) ve birleştirilmiş GGUF’yi ollama altında katmanlı 310 soruluk bir örneklemle puanladım — tam 6.200 soruluk setle orantılı, dolayısıyla temsili.',
      ],
      challenges: [
        'Sonuç kötüydü ve benchmark tam olarak ne kadar kötü olduğunu söyledi: Türkçe MMLU’da %20,65 — 5 şıklı sorularda rastgele tahminle istatistiksel olarak aynı, 67 model içinde 61., ve aynı boyuttaki stok llama3.2:latest’in yaklaşık yarısı.',
        'Derine indikçe iki belirti öne çıktı. Model çoktan seçmeli formatı %0 oranında takip etti — cevap vermek yerine istemi tekrarladı. Ve “Görkem kimdir?” diye sorulduğunda, doğru cevap eğitim verisinde dururken her koşuda bambaşka bir biyografi uydurdu (model, blockchain figürü, oyuncu).',
      ],
      results: [
        'Yayınlanan adaptörden izlenen kök neden: gönderilen chat_template.jinja hâlâ bir Gemma-3 template’iydi (<start_of_turn> / <end_of_turn>) ve bunlar Llama tokenizer’ında özel token değil — böylece tur yapısı sessizce bozuldu ve persona bilgileri ağırlıklara hiç işlenemedi.',
        'Tutarsızlığın kendisi kanıt: bir gerçeği öğrenmiş model onu tekrar ederdi. Her koşuda farklı uydurma, gerçeğin hiç öğrenilmediği anlamına gelir — bu bir dağılım kayması, retrieval değil.',
        'Not defteri artık doğru llama-3.1 template’ine düzeltildi; yeniden eğitim ve yeniden değerlendirme bir sonraki yineleme olarak sıraya alındı. Her sayı ve bulgu BENCHMARK_REPORT.md’de yazılı.',
      ],
      lessons: [
        'Chat template bir biçimlendirme ayrıntısı değil — taşıyıcı bir öğedir. Bir template uyumsuzluğu, her adım “başarılı” görünürken tüm bir eğitim koşusunu sessizce sıfırlayabilir.',
        'Açıklayabildiğin bir olumsuz sonuç, açıklayamadığın bir olumludan daha değerlidir. Başarısızlığı düzgün ölçmek bana şanslı bir başarıdan çok daha fazlasını öğretti.',
        'İnce ayar ağırlık dağılımlarını kaydırır; komutla gerçek ezberlemez. Zayıf, bozuk sinyal, temel modelin önsel eğilimlerinin kazanması demektir — ve karşılığında kendinden emin halüsinasyon alırsın.',
      ],
    },
  },
};

export const getCaseStudy = (slug) => CASE_STUDIES[slug];
