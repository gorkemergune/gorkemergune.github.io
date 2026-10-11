import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, RotateCcw } from 'lucide-react';
import { useLang } from '../../i18n.jsx';
import { ShareButton, encodeShare, shareUrl } from './FunFrame';

// The "write it" half of every surprise-to-send page: To / Message / From,
// then a share link (the message travels inside the URL — nothing is stored)
// and a preview of what the recipient will see. `extra` renders more fields
// (e.g. the constellation shape) and `extraData` adds them to the payload.
export const COMPOSER_COPY = {
  en: { to: 'To (optional)', msg: 'Your message', from: 'From (optional)', create: 'Create the surprise', ready: 'Ready. Send this link — the message is inside it.', preview: 'Preview it', again: 'Write another', count: 'characters left', need: 'Write a message first.' },
  tr: { to: 'Kime (isteğe bağlı)', msg: 'Mesajın', from: 'Kimden (isteğe bağlı)', create: 'Sürprizi oluştur', ready: 'Hazır. Bu linki gönder — mesaj linkin içinde.', preview: 'Önizle', again: 'Yenisini yaz', count: 'karakter kaldı', need: 'Önce bir mesaj yaz.' },
};
export const MAX_MSG = 180;

export default function Composer({ path, title, placeholder, extra = null, extraData = {} }) {
  const { lang } = useLang();
  const c = COMPOSER_COPY[lang] || COMPOSER_COPY.en;
  const [to, setTo] = useState('');
  const [msg, setMsg] = useState('');
  const [from, setFrom] = useState('');
  const [made, setMade] = useState(null);
  const [err, setErr] = useState('');

  const create = (e) => {
    e.preventDefault();
    if (!msg.trim()) { setErr(c.need); return; }
    setErr('');
    const data = { to: to.trim().slice(0, 40), m: msg.trim().slice(0, MAX_MSG), f: from.trim().slice(0, 40), ...extraData };
    setMade({ url: shareUrl(path, data), d: encodeShare(data) });
  };

  if (made) {
    return (
      <div className="fun-panel" aria-live="polite">
        <p className="fun-msg ok" style={{ textAlign: 'left' }}>{c.ready}</p>
        <div className="fun-row" style={{ marginTop: 16 }}>
          <ShareButton url={made.url} title={title} />
          <Link className="fun-btn ghost" to={`${path}?d=${made.d}`}><Eye size={15} strokeWidth={1.8} /> {c.preview}</Link>
          <button type="button" className="fun-btn ghost" onClick={() => setMade(null)}><RotateCcw size={15} strokeWidth={1.8} /> {c.again}</button>
        </div>
        <p className="fun-hint" style={{ marginTop: 14, textAlign: 'left', wordBreak: 'break-all' }}>{made.url}</p>
      </div>
    );
  }
  return (
    <form className="fun-panel" onSubmit={create} style={{ display: 'grid', gap: 16 }} noValidate>
      <div className="fun-field"><label htmlFor="cp-to">{c.to}</label><input id="cp-to" value={to} maxLength={40} onChange={(e) => setTo(e.target.value)} autoComplete="off" /></div>
      <div className="fun-field">
        <label htmlFor="cp-msg">{c.msg}</label>
        <textarea id="cp-msg" rows={3} value={msg} maxLength={MAX_MSG} placeholder={placeholder} onChange={(e) => setMsg(e.target.value)} aria-describedby="cp-count" required />
        <span id="cp-count" className="fun-hint" style={{ textAlign: 'right' }}>{MAX_MSG - msg.length} {c.count}</span>
      </div>
      <div className="fun-field"><label htmlFor="cp-from">{c.from}</label><input id="cp-from" value={from} maxLength={40} onChange={(e) => setFrom(e.target.value)} autoComplete="off" /></div>
      {extra}
      {err && <p className="fun-msg bad" role="alert">{err}</p>}
      <div><button type="submit" className="fun-btn">{c.create}</button></div>
    </form>
  );
}
