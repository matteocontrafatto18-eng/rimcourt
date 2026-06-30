import type { NewsArticle } from '../../lib/types';

interface Props {
  articles: NewsArticle[];
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <a href={article.href} style={styles.card}>
      <div style={{ ...styles.img, backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : undefined }} />
      <div style={styles.body}>
        <p style={styles.title}>{article.title}</p>
        <p style={styles.desc}>{article.description}</p>
      </div>
    </a>
  );
}

export default function PrimaPagina({ articles }: Props) {
  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Prima Pagina</h2>
      {articles.length === 0 ? (
        <p style={styles.empty}>Nessuna notizia disponibile.</p>
      ) : (
        <div style={styles.grid}>
          {articles.map(a => <NewsCard key={a.id} article={a} />)}
        </div>
      )}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  heading: { margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#fff', fontFamily: "'Agdasima', sans-serif", letterSpacing: '0.05em' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  empty: { color: '#666', fontSize: '0.9rem' },
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 10, overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s' },
  img: { width: '100%', height: 140, background: '#2a2a2a', backgroundSize: 'cover', backgroundPosition: 'center' },
  body: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  title: { margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#fff', fontFamily: "'Agdasima', sans-serif" },
  desc: { margin: 0, fontSize: '0.8rem', color: '#888' },
};
