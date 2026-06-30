import type { NewsArticle } from '../../lib/types';

interface Props {
  articles: NewsArticle[];
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <a href={article.href} className="news-card">
      <div
        className="news-card__img"
        style={article.imageUrl ? { backgroundImage: `url(${article.imageUrl})` } : undefined}
      />
      <div className="news-card__body">
        <p className="news-card__title">{article.title}</p>
        <p className="news-card__desc">{article.description}</p>
      </div>
    </a>
  );
}

export default function PrimaPagina({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="section">
      <h2 className="section__title">Prima Pagina</h2>
      <div className="news-grid">
        {articles.map((a) => (
          <NewsCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
