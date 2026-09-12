import { T, chrome, panel, bracketsAround } from './template.mjs';
const mono=(x,y,s,fill,size=16,ls=0,anchor='start')=>`<text x="${x}" y="${y}" font-family="JetBrains Mono" font-size="${size}" letter-spacing="${ls}" fill="${fill}" text-anchor="${anchor}">${s}</text>`;

// Every string below comes from projects.js or the repository README.
// No score, accuracy, latency or dataset size is introduced here.
export const CARDS = {

  // MARK II — notebook / code-artifact approach, as the existing OG family does
  // for the training projects. Values are the real v2 configuration.
  'llm-lora-finetuning': {
    titleMax: 440,
    mark: 'MARK II', codename: 'THE APPRENTICE', title: 'LLM LoRA Fine-Tuning',
    subtitle: 'Bilingual assistant, trained on one GPU',
    chips: ['QLoRA', 'TRL · PEFT', '4-bit'],
    art: () => {
      const x=636,y=150,w=414,h=300;
      const L=(i,a,b)=>`${mono(x+24,y+72+i*30,a,'#6f67a0',15)}${mono(x+150,y+72+i*30,b,'#c3b6ff',15)}`;
      return `
        ${panel(x,y,w,h,'phase2_train.py')}
        ${mono(x+24,y+62,'$ python src/phase2_train.py','#7c5cff',15)}
        ${L(1,'base','gemma-4-E4B-it')}
        ${L(2,'method','QLoRA  4-bit')}
        ${L(3,'towers','offload → CPU')}
        ${L(4,'template','AutoProcessor')}
        ${L(5,'adapter','merge → eval')}
        <line x1="${x+24}" y1="${y+262}" x2="${x+w-24}" y2="${y+262}" stroke="${T.bracket}" stroke-opacity="0.6"/>
        ${mono(x+24,y+284,'weight-matched against its own base','#5b5480',13)}`;
    },
  },

  // MARK XIV — the pipeline is the product: two scripts, five stages.
  'wiki2bpe': {
    titleMax: 440,
    mark: 'MARK XIV', codename: 'WIKI FORGE', title: 'wiki2bpe',
    subtitle: 'Wikipedia article to published tokenizer',
    chips: ['Byte-level BPE', 'vocab 2,048', 'Hugging Face Hub'],
    art: () => {
      const stages=[['MediaWiki extracts','API'],['text.txt','raw'],['ByteLevel BPE','train'],['PreTrainedTokenizerFast','wrap'],['push_to_hub','publish']];
      const x=640,y=136,w=404;
      return stages.map(([label,tag],i)=>{
        const yy=y+i*66;
        return `
          <rect x="${x}" y="${yy}" width="${w}" height="46" rx="5" fill="#0f0c20" stroke="${T.bracket}" stroke-opacity="${i===4?1:0.7}" stroke-width="1.5"/>
          <rect x="${x}" y="${yy}" width="4" height="46" rx="2" fill="${T.accent}" opacity="${0.35+i*0.16}"/>
          ${mono(x+22,yy+29,label,'#c3b6ff',15)}
          ${mono(x+w-18,yy+29,tag,'#5b5480',12,1,'end')}
          ${i<4?`<path d="M${x+28} ${yy+46} L${x+28} ${yy+66}" stroke="${T.accent}" stroke-opacity="0.55" stroke-width="1.5"/>
                 <path d="M${x+24} ${yy+60} L${x+28} ${yy+66} L${x+32} ${yy+60}" fill="none" stroke="${T.accent}" stroke-opacity="0.55" stroke-width="1.5"/>`:''}`;
      }).join('');
    },
  },

  // MARK XXVII — the real subject is the bounded offline tool loop and its four
  // tools. The project has no telemetry, lap or vehicle data, so none is drawn.
  'automotive-racing-assistant': {
    titleMax: 520,
    mark: 'MARK XXVII', codename: 'THE PIT CREW', title: 'Racing Assistant',
    subtitle: 'Offline tool-calling for the workshop',
    chips: ['Qwen2.5 7B', 'Ollama', 'Fully offline'],
    art: () => {
      const cx=760, cy=300, r=84, railX=918;
      const tools=[['internet_search',-0.80],['get_weather',-0.27],['check_part_status',0.27],['get_race_regulations',0.80]];
      return `
        ${bracketsAround(cx,cy,r)}
        <circle cx="${cx}" cy="${cy}" r="${r+26}" fill="none" stroke="${T.accent}" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="7 9"/>
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0e0b1f" stroke="${T.accent}" stroke-opacity="0.5" stroke-width="2"/>
        ${mono(cx,cy-6,'MODEL','#7c5cff',15,3.5,'middle')}
        ${mono(cx,cy+18,'decides','#6f67a0',13,1,'middle')}
        ${tools.map(([name,a],i)=>{
          const sx=cx+Math.cos(a)*r, sy=cy+Math.sin(a)*r;
          const ly=198+i*34;
          return `<path d="M${sx} ${sy} L${railX-16} ${ly}" fill="none" stroke="${T.accent}" stroke-opacity="0.35" stroke-width="1.3"/>
                  <circle cx="${railX-16}" cy="${ly}" r="4" fill="${T.accent}" fill-opacity="0.85"/>
                  ${mono(railX, ly+5, name, '#a79cd6', 13.5)}`;
        }).join('')}
        <line x1="${railX-16}" y1="188" x2="${railX-16}" y2="${198+3*34+10}" stroke="${T.accent}" stroke-opacity="0.18" stroke-width="1.5"/>
        ${mono(cx, cy+r+50, 'bounded loop  max 5 rounds', '#5b5480', 13, 0.8, 'middle')}`;
    },
  },

  // MARK XXVIII — an evaluation console with the capability taxonomy and,
  // deliberately, no scores: the project has none yet and says so.
  'vlm-groundbench': {
    titleMax: 430,
    mark: 'MARK XXVIII', codename: 'THE SURVEYOR', title: 'VLM-GroundBench',
    subtitle: 'Protocol frozen before the first run',
    chips: ['Native bbox vs point', 'No model runs yet'],
    art: () => {
      const x=628,y=142,w=424,h=312;
      const steps=['IMAGE','VLM','GROUNDING','SCORE'];
      const rows=[['native bbox','IoU'],['native point','in-box'],['prompt-induced','labelled']];
      return `
        ${panel(x,y,w,h,'evaluation/')}
        ${steps.map((s,i)=>{
          const sw=88, sx=x+22+i*96;
          return `<rect x="${sx}" y="${y+58}" width="${sw}" height="34" rx="4" fill="#0f0c20" stroke="${T.accent}" stroke-opacity="${i===3?0.28:0.6}" stroke-width="1.5"/>
                  ${mono(sx+sw/2,y+80,s,i===3?'#5b5480':'#c3b6ff',12,0.6,'middle')}
                  ${i<3?`<path d="M${sx+sw+2} ${y+75} L${sx+sw+6} ${y+75}" stroke="${T.accent}" stroke-opacity="0.6" stroke-width="1.5"/>`:''}`;
        }).join('')}
        <line x1="${x+22}" y1="${y+120}" x2="${x+w-22}" y2="${y+120}" stroke="${T.bracket}" stroke-opacity="0.7"/>
        ${mono(x+22,y+148,'CAPABILITY','#5b5480',12,2.2)}
        ${mono(x+w-22,y+148,'METRIC FAMILY','#5b5480',12,2.2,'end')}
        ${rows.map(([a,b],i)=>`
          ${mono(x+22,y+184+i*38,a,'#c3b6ff',15)}
          ${mono(x+w-22,y+184+i*38,b,'#8f86bd',14,0,'end')}
          <line x1="${x+22}" y1="${y+198+i*38}" x2="${x+w-22}" y2="${y+198+i*38}" stroke="${T.bracket}" stroke-opacity="0.35"/>`).join('')}
        ${mono(x+22,y+292,'raw outputs kept verbatim, never mixed','#5b5480',13)}`;
    },
  },
};

export const svg = (key) => {
  const c = CARDS[key];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${T.W}" height="${T.H}" viewBox="0 0 ${T.W} ${T.H}">
    ${chrome(c)}
    ${c.art()}
  </svg>`;
};
