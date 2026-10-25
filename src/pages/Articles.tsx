import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
import { articles } from '../lib/data';

const categories = ['All', 'Microbiology', 'Public Health', 'Research'];

export default function Articles() {
  const [category, setCategory] = useState('All');

  const filtered = useMemo(
    () => articles.filter((a) => category === 'All' || a.category === category),
    [category]
  );

  return (
    <div className="section">
      <span className="badge w-fit bg-teal-100 text-teal-700">Health Articles</span>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Education & Research</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Health education, microbiology deep-dives, and public health updates written for students, professionals,
        and the wider community.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === c ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <Link key={a.id} to={`/articles/${a.id}`} className="card transition hover:shadow-md">
            <span className="badge bg-slate-100 text-slate-600">{a.category}</span>
            <h3 className="mt-3 text-base font-semibold text-slate-900">{a.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">{a.excerpt}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{a.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{a.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
