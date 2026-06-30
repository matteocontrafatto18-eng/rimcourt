interface Props {
  abbreviation: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 36, md: 52, lg: 64 };

export default function TeamLogo({ abbreviation, name, size = 'md' }: Props) {
  const nbaIds: Record<string, number> = {
    ATL: 1610612737, BOS: 1610612738, BKN: 1610612751, CHA: 1610612766,
    CHI: 1610612741, CLE: 1610612739, DAL: 1610612742, DEN: 1610612743,
    DET: 1610612765, GSW: 1610612744, HOU: 1610612745, IND: 1610612754,
    LAC: 1610612746, LAL: 1610612747, MEM: 1610612763, MIA: 1610612748,
    MIL: 1610612749, MIN: 1610612750, NOP: 1610612740, NYK: 1610612752,
    OKC: 1610612760, ORL: 1610612753, PHI: 1610612755, PHX: 1610612756,
    POR: 1610612757, SAC: 1610612758, SAS: 1610612759, TOR: 1610612761,
    UTA: 1610612762, WAS: 1610612764,
  };

  const px = sizes[size];
  const id = nbaIds[abbreviation];
  const src = id ? `https://cdn.nba.com/logos/nba/${id}/global/L/logo.svg` : null;

  return (
    <div style={{ width: px, height: px, background: '#2a2a2a', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {src ? (
        <img
          src={src}
          alt={name}
          width={px - 12}
          height={px - 12}
          style={{ objectFit: 'contain' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      ) : (
        <span style={{ fontSize: 11, color: '#666', fontWeight: 700 }}>{abbreviation}</span>
      )}
    </div>
  );
}
