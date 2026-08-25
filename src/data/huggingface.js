// Hugging Face profile — models & datasets published under @gorkemergune.
// Rendered by HuggingFaceActivity on the home page, mirroring the GitHub
// section directly beneath it. Fields with a Tr suffix hold the Turkish copy.
// `downloads` is the last-known count (fetched 2026-08-11); HuggingFaceActivity
// refreshes it live from the Hub API on mount and falls back to this value.

export const HF_PROFILE = 'https://huggingface.co/gorkemergune';

const HF_ARTIFACTS = [
  {
    id: 'gorkemergune/ayarlicazhocam-gemma-4-e4b',
    name: 'ayarlicazhocam-gemma-4-e4b',
    kind: 'model',
    url: 'https://huggingface.co/gorkemergune/ayarlicazhocam-gemma-4-e4b',
    task: 'Text Generation',
    downloads: 34,
    descEn: 'The v2 assistant: a QLoRA fine-tune of Gemma-4-E4B with native thinking and tool calling. Reaches a 92% correct-tool rate (up from 17%) and a single, consistent learned identity — trained locally on one 12 GB GPU.',
    descTr: 'v2 asistan: Gemma-4-E4B’nin yerel düşünme ve araç çağırmalı QLoRA ince ayarı. %92 doğru-araç oranına (%17’den) ve tek, tutarlı bir öğrenilmiş kimliğe ulaşır — tek bir 12 GB GPU’da yerelde eğitildi.',
    tags: ['Gemma', 'PEFT', 'QLoRA', 'tool-calling'],
    stats: [{ label: 'Base', value: 'Gemma-4-E4B' }, { label: 'Method', value: 'QLoRA · 4-bit' }],
    project: 'llm-lora-finetuning',
  },
  {
    id: 'gorkemergune/mihenk-benchmark',
    name: 'mihenk-benchmark',
    kind: 'dataset',
    url: 'https://huggingface.co/datasets/gorkemergune/mihenk-benchmark',
    task: 'LLM Evaluation',
    downloads: 48,
    descEn: 'The public split of MIHENK — my bilingual (TR–EN) reasoning benchmark: original, auto-scored items across 20 disciplines and 4 difficulty tiers, with the majority held out privately against contamination.',
    descTr: 'MIHENK’in herkese açık bölümü — iki dilli (TR–EN) muhakeme benchmark’ım: 20 disiplin ve 4 zorluk seviyesinde özgün, otomatik puanlanan sorular; çoğunluk kontaminasyona karşı özel tutulur.',
    tags: ['benchmark', 'tr', 'en', 'reasoning'],
    stats: [{ label: 'Items', value: '800 · L1–L4' }, { label: 'Split', value: 'public sample' }],
    project: 'mihenk-benchmark',
  },
  {
    id: 'gorkemergune/ayarlicazhocam_finetune_v2',
    name: 'ayarlicazhocam_finetune_v2',
    kind: 'dataset',
    url: 'https://huggingface.co/datasets/gorkemergune/ayarlicazhocam_finetune_v2',
    task: 'Text Generation',
    downloads: 37,
    descEn: 'The v2 bilingual instruction dataset: persona plus ~20% thinking traces and explicit tool-calling turns, built from scraped, hand-written, and 70 synthetic batches merged into one corpus.',
    descTr: 'v2 iki dilli talimat veri kümesi: persona artı ~%20 düşünme izi ve açık araç çağırma turları; kazınmış, elle yazılmış ve 70 sentetik gruptan tek bir derlemde birleştirildi.',
    tags: ['instruction', 'tr', 'en', 'tool-calling'],
    stats: [{ label: 'Content', value: 'persona · thinking · tools' }, { label: 'Langs', value: 'TR + EN' }],
    project: 'llm-lora-finetuning',
  },
  {
    id: 'gorkemergune/ayarlicazhocam_finetune',
    name: 'ayarlicazhocam_finetune',
    kind: 'dataset',
    url: 'https://huggingface.co/datasets/gorkemergune/ayarlicazhocam_finetune',
    task: 'Text Generation',
    downloads: 107,
    descEn: 'The original v1 instruction dataset behind the first ayarlicazhocam fine-tune — a bilingual persona corpus (1K–10K rows) that seeded the whole line before the v2 thinking/tool-calling rebuild.',
    descTr: 'İlk ayarlicazhocam ince ayarının ardındaki özgün v1 talimat veri kümesi — v2’nin düşünme/araç-çağırma yeniden inşasından önce tüm seriyi başlatan iki dilli persona derlemi (1K–10K satır).',
    tags: ['instruction', 'tr', 'en', 'persona'],
    stats: [{ label: 'Version', value: 'v1 · original' }, { label: 'Langs', value: 'TR + EN' }],
    project: 'llm-lora-finetuning',
  },
  {
    id: 'gorkemergune/ayarlicazhocam-llama-3.2-3b',
    name: 'ayarlicazhocam-llama-3.2-3b',
    kind: 'model',
    url: 'https://huggingface.co/gorkemergune/ayarlicazhocam-llama-3.2-3b',
    task: 'Text Generation',
    downloads: 0,
    descEn: 'The v1 fine-tune (retired): a LoRA/SFT of Llama 3.2-3B kept as an honest research record — its report documents the chat-template mismatch that v2 fixes.',
    descTr: 'v1 ince ayarı (emekli): Llama 3.2-3B’nin LoRA/SFT’si, dürüst bir araştırma kaydı olarak tutulur — raporu, v2’nin düzelttiği chat-template uyumsuzluğunu belgeler.',
    tags: ['Llama', 'PEFT', 'Unsloth', 'retired'],
    stats: [{ label: 'Base', value: 'Llama 3.2-3B' }, { label: 'Status', value: 'v1 · record' }],
    project: 'llm-lora-finetuning',
  },
  {
    id: 'gorkemergune/stsb-tr',
    name: 'stsb-tr',
    kind: 'dataset',
    url: 'https://huggingface.co/datasets/gorkemergune/stsb-tr',
    task: 'Sentence Similarity',
    downloads: 33,
    descEn: 'Turkish STS: 1,037 sentence pairs spanning unrelated, related, and paraphrase tiers across 9 news domains — built to calibrate a similarity threshold, not just detect paraphrases.',
    descTr: 'Türkçe STS: 9 haber alanında ilgisiz, ilgili ve yeniden-ifade seviyelerini kapsayan 1.037 cümle çifti — yalnızca yeniden ifadeyi saptamak için değil, bir benzerlik eşiğini kalibre etmek için kuruldu.',
    tags: ['sts', 'tr', 'embeddings', 'similarity'],
    stats: [{ label: 'Pairs', value: '1,037 · 933/104' }, { label: 'Tiers', value: '3 · 9 domains' }],
    project: 'tr-sts-dataset',
  },
];

export default HF_ARTIFACTS;
