import { BookOpen } from 'lucide-react';

// Shown on the first shelf of a bookcase with no real entries: a small brass
// plate, never a fake book.
export default function EmptyCollection({ text }) {
  return (
    <span className="bk-empty" role="note">
      <BookOpen size={16} strokeWidth={1.5} aria-hidden="true" />
      {text}
    </span>
  );
}
