import { nbaLogoUrl } from '../../lib/api';

interface Props {
  abbreviation: string;
  name: string;
  size?: number;
}

export default function TeamLogo({ abbreviation, name, size = 52 }: Props) {
  const src = nbaLogoUrl(abbreviation);

  return (
    <div
      style={{
        width: size,
        height: size,
        background: '#2a2a2a',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          width={size - 14}
          height={size - 14}
          style={{ objectFit: 'contain' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <span style={{ fontSize: 11, color: '#666', fontWeight: 700 }}>{abbreviation}</span>
      )}
    </div>
  );
}
