import type { Game } from '../../lib/types';
import { formatItalianTime } from '../../lib/api';
import TeamLogo from '../ui/TeamLogo';

interface Props {
  games: Game[];
}

function GameCard({ game }: { game: Game }) {
  return (
    <div style={styles.card}>
      <div style={styles.time}>{formatItalianTime(game)}</div>
      <div style={styles.matchup}>
        <div style={styles.team}>
          <TeamLogo abbreviation={game.home_team.abbreviation} name={game.home_team.full_name} size="md" />
          <span style={styles.teamName}>{game.home_team.full_name}</span>
        </div>
        <span style={styles.vs}>—</span>
        <div style={styles.team}>
          <TeamLogo abbreviation={game.visitor_team.abbreviation} name={game.visitor_team.full_name} size="md" />
          <span style={styles.teamName}>{game.visitor_team.full_name}</span>
        </div>
      </div>
      <a href="/dove-vedere" style={styles.link}>Clicca per vedere dove seguire la partita</a>
    </div>
  );
}

export default function StaseraInNba({ games }: Props) {
  const tonight = games.filter(g => g.status !== 'Final').slice(0, 2);

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Stasera in NBA</h2>
        <a href="/partite" style={styles.linkAll}>Tutte →</a>
      </div>
      {tonight.length === 0 ? (
        <p style={styles.empty}>Nessuna partita stasera.</p>
      ) : (
        <div style={styles.grid}>
          {tonight.map(g => <GameCard key={g.id} game={g} />)}
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
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  empty: { color: '#666', fontSize: '0.9rem' },
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  time: { fontSize: '0.85rem', color: '#ff6b1a', fontWeight: 700, letterSpacing: '0.05em', fontFamily: "'Agdasima', sans-serif" },
  matchup: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' },
  team: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1 },
  teamName: { fontSize: '0.85rem', color: '#ccc', textAlign: 'center' },
  vs: { color: '#555', fontSize: '1.2rem', flexShrink: 0 },
  link: { fontSize: '0.8rem', color: '#666', textDecoration: 'none', borderTop: '1px solid #2a2a2a', paddingTop: '0.75rem' },
};
