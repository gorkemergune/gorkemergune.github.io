import { projectTech } from '../data/techLogos';

// Up to three technology logos for a project, from the central map in
// data/techLogos.js, each with its name beside it. `labels={false}` is only
// for places with no room for text; the name is then still alt text + tooltip.
export default function TechLogos({ project, labels = true, limit = 3, className = '' }) {
  const tech = projectTech(project, limit);
  if (!tech.length) return null;
  return (
    <ul className={`tech-logos${labels ? ' with-labels' : ''} ${className}`}>
      {tech.map((x) => (
        <li key={x.key} title={x.label}>
          <img src={x.src} alt={labels ? '' : x.label} width="16" height="16" loading="lazy" decoding="async" />
          {labels && <span>{x.label}</span>}
        </li>
      ))}
    </ul>
  );
}
