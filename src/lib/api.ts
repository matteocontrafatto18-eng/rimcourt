import type { Game } from './types';

const API_KEY =
  import.meta.env.BALLDONTLIE_API_KEY ??
  process.env.BALLDONTLIE_API_KEY ??
  '';

const BASE_URL = 'https://api.balldontlie.io/v1';

const headers = { Authorization: API_KEY };

function italianDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Rome' }).format(d);
}

export function nbaLogoUrl(abbreviation: string): string {
  const ids: Record<string, number> = {
    ATL: 1610612737, BOS: 1610612738, BKN: 1610612751, CHA: 1610612766,
    CHI: 1610612741, CLE: 1610612739, DAL: 1610612742, DEN: 1610612743,
    DET: 1610612765, GSW: 1610612744, HOU: 1610612745, IND: 1610612754,
    LAC: 1610612746, LAL: 1610612747, MEM: 1610612763, MIA: 1610612748,
    MIL: 1610612749, MIN: 1610612750, NOP: 1610612740, NYK: 1610612752,
    OKC: 1610612760, ORL: 1610612753, PHI: 1610612755, PHX: 1610612756,
    POR: 1610612757, SAC: 1610612758, SAS: 1610612759, TOR: 1610612761,
    UTA: 1610612762, WAS: 1610612764,
  };
  const id = ids[abbreviation];
  return id
    ? `https://cdn.nba.com/logos/nba/${id}/global/L/logo.svg`
    : '';
}

export function formatItalianTime(game: Game): string {
  if (game.status === 'Final') return 'Final';
  if (game.period > 0) return `Q${game.period}${game.time ? ' ' + game.time : ''}`;
  const raw = game.datetime ?? game.status;
  if (!raw) return '–';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleTimeString('it-IT', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatItalianDate(game: Game): string {
  const raw = game.datetime ?? game.status;
  if (!raw) return '–';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '–';
  return d.toLocaleDateString('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: 'short',
  }).toUpperCase();
}

/** Partite dei prossimi 7 giorni (per "Stasera in NBA") */
export async function fetchUpcomingGames(): Promise<Game[]> {
  const dates = Array.from({ length: 7 }, (_, i) => italianDate(i));
  const query = dates.map(d => `dates[]=${d}`).join('&');
  const res = await fetch(`${BASE_URL}/games?${query}&per_page=100`, { headers });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  return (json.data as Game[]).sort(
    (a, b) => new Date(a.datetime ?? a.status).getTime() - new Date(b.datetime ?? b.status).getTime()
  );
}

/** Anno d'inizio della stagione NBA corrente (es. giugno 2026 → 2025) */
function currentSeasonYear(): number {
  const now = new Date();
  return now.getMonth() >= 9 ? now.getFullYear() : now.getFullYear() - 1;
}

/**
 * Ultime partite giocate.
 * In stagione: le partite Final degli ultimi giorni.
 * In offseason: le ultime partite della stagione appena conclusa (Finals).
 */
export async function fetchRecentGames(): Promise<Game[]> {
  // 1) Prova gli ultimi 7 giorni (comportamento in stagione)
  const dates = Array.from({ length: 7 }, (_, i) => italianDate(-i - 1));
  const recentQuery = dates.map(d => `dates[]=${d}`).join('&');
  const recentRes = await fetch(`${BASE_URL}/games?${recentQuery}&per_page=25`, { headers });
  if (recentRes.ok) {
    const recent = ((await recentRes.json()).data as Game[]).filter(g => g.status === 'Final');
    if (recent.length > 0) {
      return recent
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4);
    }
  }

  // 2) Offseason: prendi le ultime partite della stagione conclusa
  const season = currentSeasonYear();
  const seasonRes = await fetch(
    `${BASE_URL}/games?seasons[]=${season}&postseason=true&per_page=100`,
    { headers }
  );
  if (!seasonRes.ok) throw new Error(`API ${seasonRes.status}`);
  return ((await seasonRes.json()).data as Game[])
    .filter(g => g.status === 'Final')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
}
