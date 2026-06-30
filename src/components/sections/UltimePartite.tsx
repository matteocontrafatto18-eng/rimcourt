import { useState } from 'react';
import type { Game } from '../../lib/types';
import { formatItalianDate } from '../../lib/api';
import TeamLogo from '../ui/TeamLogo';

interface Props {
  games: Game[];
}

function ResultCard({ game }: { game: Game }) {
  const [showScore, setShowScore] = useState(false);

  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <div style={styles.meta}>
          <span style={styles.date}>{formatItalianDate(game)}</span>
          <span style={styles.label}>{game.postseason ? 'Playoffs' : 'Regular Season'}</span>
        </div>
        <button style={styles.btnScore} onClick={() => setShowScore(v => !v)}>
          {showScore ? 'Nascondi' : 'Mostra punteggio'}
        </button>
      </div>

      <div style={styles.teams}>
        <div style={styles.teamRow}>
          <TeamLogo abbreviation={game.home_team.abbreviation} name={game.home_team.full_name} size="sm" />
          <span style={styles.teamName}>{game.home_team.full_name}</span>
          {showScore && <span style={styles.pts}>{game.home_team_score}</span>}
        </div>
        <div style={styles.teamRow}>
          <TeamLogo abbreviation={game.visitor_team.abbreviation} name={game.visitor_team.full_name} size="sm" />
          <span style={styles.teamName}>{game.visitor_team.full_name}</span>
          {showScore && <span style={styles.pts}>{game.visitor_team_score}</span>}
        </div>
      </div>

      <a href={`/recap/${game.id}`} style={styles.btnRecap}>Recap</a>
    </div>
  );
}

export default function UltimePartite({ games }: Props) {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Ultime partite</h2>
        <a href="/partite" style={styles.linkAll}>Tutte →</a>
      </div>
      {games.length === 0 ? (
        <p style={styles.empty}>Nessuna partita recente.</p>
      ) : (
        <div style={styles.grid}>
          {games.map(g => <ResultCard key={g.id} game={g} />)}
        </div>
      )}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#fff', fontFamily: "'Agdasima', sans-serif", letterSpacing: '0.05em' },
  linkAll: { fontSize: '0.9rem', color: '#ff6b1a', textDecoration: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  empty: { color: '#666', fontSize: '0.9rem' },
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  cardTop: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' },
  meta: { display: 'flex', flexDirection: 'column', gap: '0.15rem' },
  date: { fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: "'Agdasima', sans-serif" },
  label: { fontSize: '0.7rem', color: '#ff6b1a' },
  btnScore: { background: '#ff6b1a', color: '#fff', border: 'none', borderRadius: 5, padding: '0.3rem 0.5rem', fontSize: '0.7rem', fontFamily: "'Agdasima', sans-serif", cursor: 'pointer', whiteSpace: 'nowrap' },
  teams: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  teamRow: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  teamName: { fontSize: '0.82rem', color: '#ccc', flex: 1 },
  pts: { fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginLeft: 'auto' },
  btnRecap: { display: 'block', background: '#ff6b1a', color: '#fff', textAlign: 'center', textDecoration: 'none', borderRadius: 5, padding: '0.4rem', fontSize: '0.9rem', fontWeight: 700, fontFamily: "'Agdasima', sans-serif" },
};
