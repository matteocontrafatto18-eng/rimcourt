import type { MVPPlayer } from '../../lib/types';

interface Props {
  mvp?: MVPPlayer;
}

// Placeholder finché non colleghiamo l'API statistica
const PLACEHOLDER_HIGHLIGHTS = [
  { id: '1', label: 'RECORD DELLA NOTTE', title: 'Tripla doppia stagionale', description: 'Miglior prestazione individuale della partita' },
  { id: '2', label: 'MOMENTO CHIAVE', title: 'Il buzzer beater del 4° quarto', description: 'Il canestro che ha deciso la gara negli ultimi secondi' },
  { id: '3', label: 'STATISTICA', title: 'Team con più rimbalzi', description: 'Dominio totale sotto canestro' },
];

export default function HighlightsNotte({ mvp }: Props) {
  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Highlights della notte</h2>
      <div style={styles.grid}>

        {/* MVP Card */}
        <div style={styles.mvpCard}>
          <span style={styles.label}>MVP DELLA NOTTE</span>
          <span style={styles.playerName}>{mvp?.name ?? 'In arrivo...'}</span>
          {mvp && (
            <div style={styles.stats}>
              <span style={styles.statPts}>PTS {mvp.pts}</span>
              <span style={styles.stat}>REB {mvp.reb}</span>
              <span style={styles.stat}>AST {mvp.ast}</span>
            </div>
          )}
          {mvp?.imageUrl && (
            <img src={mvp.imageUrl} alt={mvp.name} style={styles.playerImg} />
          )}
        </div>

        {/* Highlight cards */}
        {PLACEHOLDER_HIGHLIGHTS.map(h => (
          <div key={h.id} style={styles.card}>
            <span style={styles.label}>{h.label}</span>
            <span style={styles.cardTitle}>{h.title}</span>
            <p style={styles.cardDesc}>{h.description}</p>
          </div>
        ))}

      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  title: { margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#fff', fontFamily: "'Agdasima', sans-serif", letterSpacing: '0.05em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  mvpCard: { background: '#1a1a1a', border: '1px solid #ff6b1a', borderRadius: 10, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', minHeight: 160, position: 'relative', overflow: 'hidden' },
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', minHeight: 160 },
  label: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#ff6b1a', fontFamily: "'Agdasima', sans-serif" },
  playerName: { fontSize: '1rem', fontWeight: 700, color: '#fff', fontFamily: "'Agdasima', sans-serif" },
  stats: { display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.25rem' },
  statPts: { fontSize: '1.4rem', fontWeight: 700, color: '#ff6b1a', fontFamily: "'Agdasima', sans-serif" },
  stat: { fontSize: '1.1rem', fontWeight: 700, color: '#fff', fontFamily: "'Agdasima', sans-serif" },
  playerImg: { position: 'absolute', right: 0, bottom: 0, height: 130, objectFit: 'contain' },
  cardTitle: { fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: "'Agdasima', sans-serif" },
  cardDesc: { fontSize: '0.8rem', color: '#888', margin: 0 },
};
