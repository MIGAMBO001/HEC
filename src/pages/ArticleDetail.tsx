import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock, User } from 'lucide-react';
import { articles } from '../lib/data';

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="section text-center">
        <p className="text-slate-600">Article not found.</p>
        <Link to="/articles" className="mt-4 inline-block text-teal-600">← Back to Articles</Link>
      </div>
    );
  }

  return (
    <div className="section max-w-3xl">
      <Link to="/articles" className="flex items-center gap-1 text-sm font-medium text-teal-600">
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      <span className="badge mt-6 bg-teal-100 text-teal-700">{article.category}</span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{article.title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1"><User className="h-4 w-4" />{article.author}</span>
        <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />{article.date}</span>
        <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime}</span>
      </div>

      <div className="mt-8 space-y-4 text-slate-700">
        {article.content.map((p, idx) => (
          <p key={idx} className="leading-relaxed">{p}</p>
        ))}
      </div>
    </div>
  );
}
