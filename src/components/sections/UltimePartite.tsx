import { useState } from 'react';
import type { Game } from '../../lib/types';
import { formatItalianDate } from '../../lib/api';
import TeamLogo from '../ui/TeamLogo';

interface Props {
  games: Game[];
}

function ResultCard({ game }: { game: Game }) {
  const [showScore, setShowScore] = useState(false);
  const homeWin = game.home_team_score > game.visitor_team_score;

  return (
    <div className="card result-card">
      <div className="result-card__top">
        <div className="result-card__meta">
          <span className="result-card__date">{formatItalianDate(game)}</span>
          <span className="result-card__label">{game.postseason ? 'Playoffs' : 'Regular Season'}</span>
        </div>
        <button className="btn-score" onClick={() => setShowScore((v) => !v)}>
          {showScore ? 'Nascondi' : 'Mostra punteggio'}
        </button>
      </div>

      <div className="result-card__teams">
        <div className="result-team">
          <TeamLogo abbreviation={game.home_team.abbreviation} name={game.home_team.full_name} size={36} />
          <span className="result-team__name">{game.home_team.full_name}</span>
          {showScore && (
            <span className="result-team__pts" style={{ color: homeWin ? '#fff' : '#888' }}>
              {game.home_team_score}
            </span>
          )}
        </div>
        <div className="result-team">
          <TeamLogo abbreviation={game.visitor_team.abbreviation} name={game.visitor_team.full_name} size={36} />
          <span className="result-team__name">{game.visitor_team.full_name}</span>
          {showScore && (
            <span className="result-team__pts" style={{ color: homeWin ? '#888' : '#fff' }}>
              {game.visitor_team_score}
            </span>
          )}
        </div>
      </div>

      <a href={`/recap/${game.id}`} className="btn-recap">Recap</a>
    </div>
  );
}

export default function UltimePartite({ games }: Props) {
  return (
    <section className="section">
      <div className="section__head">
        <h2 className="section__title">Ultime partite</h2>
        <a href="/game" className="section__link">Tutte →</a>
      </div>
      {games.length === 0 ? (
        <p className="section__empty">Nessuna partita recente.</p>
      ) : (
        <div className="results-grid">
          {games.map((g) => (
            <ResultCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </section>
  );
}
