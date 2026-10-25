import { useEffect, useState } from 'react';
import { CalendarDays, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@appdeploy/client';

interface ContributionItem {
  id: string; title: string; content: string; category: string; authorUsername: string; createdAt: string;
}

const CATEGORIES = ['All', 'Health Question', 'Awareness Content', 'Community Health Observation', 'Suggestion', 'Educational Contribution'];

export default function Contributions() {
  const [category, setCategory] = useState('All');
  const [items, setItems] = useState<ContributionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const query = category === 'All' ? '' : `?category=${encodeURIComponent(category)}`;
    api.get(`/api/contributions${query}`)
      .then((res) => { if (mounted) setItems(res.data?.items ?? []); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [category]);

  return (
    <div className="section">
      <span className="badge w-fit bg-teal-100 text-teal-700">Community</span>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Approved Contributions</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Health questions, awareness content, and educational contributions from students, health professionals,
        and the community, reviewed before publishing.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === c ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {loading && <p className="text-sm text-slate-400">Loading…</p>}
        {!loading && items.length === 0 && <p className="card text-sm text-slate-500">No approved contributions in this category yet.</p>}
        {items.map((c) => (
          <div key={c.id} className="card">
            <span className="badge bg-slate-100 text-slate-600">{c.category}</span>
            <h3 className="mt-3 text-base font-semibold text-slate-900">{c.title}</h3>
            <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{c.content}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
              <Link to={`/profile/${c.authorUsername}`} className="flex items-center gap-1 hover:text-teal-600"><UserIcon className="h-3.5 w-3.5" />@{c.authorUsername}</Link>
              <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
