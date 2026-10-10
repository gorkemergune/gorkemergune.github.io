// Section titles are two-tone: the part after the "|" in the i18n string is
// rendered in the dim ink. Keeps the split in the copy, not in the markup.
export default function TwoTone({ text }) {
  const [a, b] = String(text || '').split('|');
  return <>{a}{b && <span className="dim">{b}</span>}</>;
}
