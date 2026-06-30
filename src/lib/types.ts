export interface Team {
  id: number;
  abbreviation: string;
  full_name: string;
  city: string;
  name: string;
  conference: string;
  division: string;
}

export interface Game {
  id: number;
  date: string;
  datetime: string;
  status: string;
  period: number;
  time: string | null;
  postseason: boolean;
  home_team: Team;
  visitor_team: Team;
  home_team_score: number;
  visitor_team_score: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  href: string;
  publishedAt: string;
}

export interface Highlight {
  id: string;
  label: string;
  title: string;
  value?: string;
  description?: string;
}

export interface MVPPlayer {
  name: string;
  team: string;
  pts: number;
  reb: number;
  ast: number;
  imageUrl?: string;
}
