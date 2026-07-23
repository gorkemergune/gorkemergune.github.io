// Hugging Face profile — models & datasets published under @gorkemergune.
// Rendered by HuggingFaceActivity on the home page, mirroring the GitHub
// section directly beneath it. Fields with a Tr suffix hold the Turkish copy.
// Stats reflect the Hub at the time of writing; they are illustrative, not live.

export const HF_PROFILE = 'https://huggingface.co/gorkemergune';

const HF_ARTIFACTS = [
  {
    id: 'gorkemergune/ayarlicazhocam-llama-3.2-3b',
    name: 'ayarlicazhocam-llama-3.2-3b',
    kind: 'model',
    url: 'https://huggingface.co/gorkemergune/ayarlicazhocam-llama-3.2-3b',
    task: 'Text Generation',
    descEn: 'A LoRA/SFT fine-tune of Llama 3.2-3B for the bilingual "ayarlicazhocam" assistant. Published as an honest first fine-tune — the accompanying report documents a chat-template bug and the fix that follows.',
    descTr: 'İki dilli “ayarlicazhocam” asistanı için Llama 3.2-3B’nin LoRA/SFT ince ayarı. Dürüst bir ilk ince ayar olarak yayınlandı — ekindeki rapor bir chat-template hatasını ve ardından gelen düzeltmeyi belgeler.',
    tags: ['Llama', 'PEFT', 'Unsloth', 'safetensors'],
    stats: [{ label: 'Base', value: 'Llama 3.2-3B' }, { label: 'Method', value: 'LoRA · 4-bit' }],
    project: 'llm-lora-finetuning',
  },
  {
    id: 'gorkemergune/ayarlicazhocam_finetune',
    name: 'ayarlicazhocam_finetune',
    kind: 'dataset',
    url: 'https://huggingface.co/datasets/gorkemergune/ayarlicazhocam_finetune',
    task: 'Text Generation',
    descEn: 'The bilingual (TR + EN) instruction dataset behind the assistant, built from scraped, hand-written, and 70 synthetically generated batches, then merged into a single parquet corpus.',
    descTr: 'Asistanın arkasındaki iki dilli (TR + EN) talimat veri kümesi; kazınmış, elle yazılmış ve programatik üretilen 70 gruptan kurulup tek bir parquet derlemde birleştirildi.',
    tags: ['instruction', 'tr', 'en', 'parquet'],
    stats: [{ label: 'Size', value: '1K–10K rows' }, { label: 'Downloads', value: '80' }],
    project: 'llm-lora-finetuning',
  },
  {
    id: 'gorkemergune/worldcup-bpe-tokenizer',
    name: 'worldcup-bpe-tokenizer',
    kind: 'model',
    url: 'https://huggingface.co/gorkemergune/worldcup-bpe-tokenizer',
    task: 'Tokenizer',
    descEn: 'A 1,024-token byte-level BPE tokenizer trained on 2022 World Cup Wikipedia text — small enough to beat 150K+ production vocabularies on its own domain.',
    descTr: '2022 Dünya Kupası Wikipedia metniyle eğitilmiş 1.024 tokenlık bayt seviyesi BPE tokenizer — kendi alanında 150 bin+ üretim sözlüklerini geçecek kadar minik.',
    tags: ['tokenizer', 'bpe', 'byte-level'],
    stats: [{ label: 'Vocab', value: '1,024' }, { label: 'Domain', value: 'World Cup' }],
    project: 'worldcup-bpe-tokenizer',
  },
  {
    id: 'gorkemergune/my-tokenizer',
    name: 'my-tokenizer',
    kind: 'model',
    url: 'https://huggingface.co/gorkemergune/my-tokenizer',
    task: 'Tokenizer',
    descEn: 'The tokenizer produced by the wiki2bpe pipeline: scrape a Wikipedia article, train a 2,048-token byte-level BPE, and push it straight to the Hub.',
    descTr: 'wiki2bpe hattının ürettiği tokenizer: bir Wikipedia makalesini çek, 2.048 tokenlık bayt seviyesi BPE eğit ve doğrudan Hub’a gönder.',
    tags: ['tokenizer', 'bpe', 'byte-level'],
    stats: [{ label: 'Vocab', value: '2,048' }, { label: 'Source', value: 'Wikipedia' }],
    project: 'wiki2bpe',
  },
];

export default HF_ARTIFACTS;
