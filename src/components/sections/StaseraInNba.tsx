import type { Game } from '../../lib/types';
import { formatItalianTime } from '../../lib/api';
import TeamLogo from '../ui/TeamLogo';

interface Props {
  games: Game[];
}

function GameCard({ game }: { game: Game }) {
  return (
    <div className="card game-card">
      <div className="game-card__time">{formatItalianTime(game)} · ORA ITALIANA</div>
      <div className="game-card__matchup">
        <div className="team">
          <TeamLogo abbreviation={game.home_team.abbreviation} name={game.home_team.full_name} />
          <span className="team__name">{game.home_team.full_name}</span>
        </div>
        <span className="vs">—</span>
        <div className="team">
          <TeamLogo abbreviation={game.visitor_team.abbreviation} name={game.visitor_team.full_name} />
          <span className="team__name">{game.visitor_team.full_name}</span>
        </div>
      </div>
      <a href="/dove-vedere" className="game-card__link">Dove vedere la partita ↗</a>
    </div>
  );
}

export default function StaseraInNba({ games }: Props) {
  const tonight = games.filter((g) => g.status !== 'Final').slice(0, 2);

  return (
    <section className="section">
      <div className="section__head">
        <h2 className="section__title">Stasera in NBA</h2>
        <a href="/game" className="section__link">Tutte →</a>
      </div>
      {tonight.length === 0 ? (
        <p className="section__empty">
          Nessuna partita in programma al momento — la stagione riparte a ottobre.
        </p>
      ) : (
        <div className="stasera-grid">
          {tonight.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </section>
  );
}
