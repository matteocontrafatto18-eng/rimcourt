import type { MVPPlayer, Highlight } from '../../lib/types';

interface Props {
  mvp?: MVPPlayer;
  highlights?: Highlight[];
}

export default function HighlightsNotte({ mvp, highlights = [] }: Props) {
  // Niente da mostrare finché non c'è un contenuto curato
  if (!mvp && highlights.length === 0) return null;

  return (
    <section className="section">
      <h2 className="section__title">Highlights della notte</h2>
      <div className="highlights-grid">

        {mvp && (
          <div className="highlight-card highlight-card--mvp">
            <span className="highlight__label">MVP DELLA NOTTE</span>
            <span className="mvp__name">{mvp.name}</span>
            <div className="mvp__stats">
              <span className="mvp__stat mvp__stat--pts">PTS {mvp.pts}</span>
              <span className="mvp__stat">REB {mvp.reb}</span>
              <span className="mvp__stat">AST {mvp.ast}</span>
            </div>
            {mvp.image && <img src={mvp.image} alt={mvp.name} className="mvp__img" />}
          </div>
        )}

        {highlights.map((h, i) => (
          <div key={i} className="highlight-card">
            <span className="highlight__label">{h.label}</span>
            <span className="highlight__title">{h.title}</span>
            <p className="highlight__desc">{h.description}</p>
          </div>
        ))}

      </div>
    </section>
  );
}
