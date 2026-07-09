import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, Folder, BookOpen, Compass, FileText, Beaker, Cpu, Trophy } from 'lucide-react';
import { useLang } from '../i18n.jsx';
import { FEATURES } from '../config';
import PROJECTS from '../data/projects';

export default function CommandPalette() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Toggle with Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ(''); setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const blogItems = t('blogItems');
  const items = useMemo(() => {
    const pages = [
      { label: t('navHome'), sub: '/', to: '/', icon: Compass, kind: 'page' },
      { label: t('projectLabel'), sub: '/project', to: '/project', icon: Folder, kind: 'page' },
      { label: t('compLabel'), sub: '/competitions', to: '/competitions', icon: Trophy, kind: 'page' },
      { label: t('stackLabel'), sub: '/stack', to: '/stack', icon: Cpu, kind: 'page' },
      { label: t('researchLabel'), sub: '/research', to: '/research', icon: Beaker, kind: 'page' },
      { label: t('journeyLabel'), sub: '/journey', to: '/journey', icon: Compass, kind: 'page' },
      { label: t('blogLabel'), sub: '/blog', to: '/blog', icon: BookOpen, kind: 'page' },
      ...(FEATURES.resume ? [{ label: t('navResume'), sub: '/resume', to: '/resume', icon: FileText, kind: 'page' }] : []),
      { label: t('contactLabel'), sub: '/contact', to: '/contact', icon: FileText, kind: 'page' },
      { label: t('funLabel'), sub: '/fun', to: '/fun', icon: Compass, kind: 'page' },
    ];
    const projects = PROJECTS.map((p) => ({
      label: p.title, sub: `${p.mark} · ${p.codename}`, to: `/project/${p.slug}`, icon: Folder, kind: 'project',
    }));
    const blog = Array.isArray(blogItems) ? blogItems.map((b) => ({
      label: b.title, sub: b.category, to: `/blog/${b.slug}`, icon: BookOpen, kind: 'blog',
    })) : [];
    return [...pages, ...projects, ...blog];
  }, [t, blogItems]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => (it.label + ' ' + it.sub + ' ' + it.kind).toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => { setActive(0); }, [q]);

  const go = (it) => { if (!it) return; setOpen(false); navigate(it.to); };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[active]); }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  return (
    <div style={s.overlay} onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Command palette">
      <div style={s.panel} onClick={(e) => e.stopPropagation()}>
        <div style={s.inputRow}>
          <Search size={18} strokeWidth={1.6} style={{ color: '#00d4ff', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={lang === 'tr' ? 'Sayfa, proje veya yazı ara…' : 'Search pages, projects, posts…'}
            style={s.input}
            aria-label="Search"
          />
          <span style={s.kbd}>ESC</span>
        </div>
        <div ref={listRef} style={s.list}>
          {results.length === 0 && <div style={s.empty}>{lang === 'tr' ? 'Sonuç yok' : 'No results'}</div>}
          {results.map((it, i) => {
            const Icon = it.icon;
            const on = i === active;
            return (
              <button
                key={it.to + i}
                data-active={on}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(it)}
                style={{ ...s.item, ...(on ? s.itemActive : null) }}
              >
                <Icon size={15} strokeWidth={1.6} style={{ color: on ? '#00d4ff' : '#6a6a82', flexShrink: 0 }} />
                <span style={s.itemLabel}>{it.label}</span>
                <span style={s.itemSub}>{it.sub}</span>
                {on && <CornerDownLeft size={13} strokeWidth={1.6} style={{ color: '#00d4ff', marginLeft: 8 }} />}
              </button>
            );
          })}
        </div>
        <div style={s.footer}>
          <span><span style={s.kbdSm}>↑</span><span style={s.kbdSm}>↓</span> {lang === 'tr' ? 'gez' : 'navigate'}</span>
          <span><span style={s.kbdSm}>↵</span> {lang === 'tr' ? 'aç' : 'open'}</span>
          <span style={{ marginLeft: 'auto' }}>⌘K</span>
        </div>
      </div>
    </div>
  );
}

const s = {
  overlay: { position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(6,6,12,0.7)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12vh' },
  panel: { width: 'min(600px, calc(100vw - 32px))', background: '#0d0d16', border: '1px solid #26263a', borderRadius: 14, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.05)' },
  inputRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderBottom: '1px solid #1a1a2e' },
  input: { flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#eef0f6', fontFamily: "'Instrument Sans', sans-serif", fontSize: 17 },
  kbd: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: '#6a6a82', border: '1px solid #26263a', borderRadius: 5, padding: '3px 7px' },
  list: { maxHeight: '48vh', overflowY: 'auto', padding: 8 },
  empty: { padding: '24px', textAlign: 'center', fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: '#6a6a82' },
  item: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '11px 12px', background: 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left' },
  itemActive: { background: 'rgba(0,212,255,0.08)' },
  itemLabel: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14.5, color: '#e6e6f0' },
  itemSub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#6a6a82', marginLeft: 'auto', whiteSpace: 'nowrap' },
  footer: { display: 'flex', alignItems: 'center', gap: 18, padding: '12px 18px', borderTop: '1px solid #1a1a2e', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#6a6a82' },
  kbdSm: { display: 'inline-block', border: '1px solid #26263a', borderRadius: 4, padding: '1px 5px', marginRight: 3, color: '#8a8aa0' },
};
