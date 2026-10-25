import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { api } from '@appdeploy/client';
import { diseases as staticDiseases, type Disease } from '../lib/data';
import DiseaseImage from '../components/DiseaseImage';

interface FilterOption {
  label: string;
  test: (d: Disease) => boolean;
}

const filterOptions: FilterOption[] = [
  { label: 'All', test: () => true },
  { label: 'Bacterial', test: (d) => d.organismType === 'bacteria' },
  { label: 'Viral', test: (d) => d.organismType === 'virus' },
  { label: 'Fungal', test: (d) => d.organismType === 'fungi' },
  { label: 'Protozoan', test: (d) => d.organismType === 'protozoa' },
  { label: 'Parasitic', test: (d) => d.organismType === 'parasite' || d.organismType === 'helminth' },
  { label: 'Vector-borne', test: (d) => d.transmissionTags?.includes('vector-borne') ?? false },
  { label: 'Foodborne', test: (d) => d.transmissionTags?.includes('foodborne') ?? false },
];

export default function Diseases() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [dbDiseases, setDbDiseases] = useState<Disease[]>([]);

  useEffect(() => {
    let mounted = true;
    api.get('/api/diseases')
      .then((res) => { if (mounted) setDbDiseases(res.data?.items ?? []); })
      .catch(() => { /* fall back silently to the static library */ });
    return () => { mounted = false; };
  }, []);

  const allDiseases = useMemo(() => {
    const staticIds = new Set(staticDiseases.map((d) => d.id));
    const additions = dbDiseases.filter((d) => !staticIds.has(d.id));
    return [...staticDiseases, ...additions];
  }, [dbDiseases]);

  const activeFilter = filterOptions.find((f) => f.label === filter) ?? filterOptions[0];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return allDiseases.filter((d) => {
      const matchesFilter = activeFilter.test(d);
      const matchesQuery = !q ||
        d.name.toLowerCase().includes(q) ||
        (d.causativeOrganism || '').toLowerCase().includes(q) ||
        (d.scientificName || '').toLowerCase().includes(q) ||
        (d.overview || '').toLowerCase().includes(q) ||
        (d.category || '').toLowerCase().includes(q) ||
        (d.organismType || '').toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [allDiseases, query, activeFilter]);

  return (
    <div className="section">
      <span className="badge w-fit bg-teal-100 text-teal-700">Disease Information Library</span>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Explore Diseases</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        A professional medical microbiology and public health reference covering classification, causative
        organisms, transmission, diagnosis, treatment, and prevention for common and emerging diseases.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by disease, organism, or scientific name…"
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((f) => (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === f.label ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <Link key={d.id} to={`/diseases/${d.id}`} className="card transition hover:shadow-md">
            <DiseaseImage diseaseId={d.id} className="mb-4 h-32 w-full rounded-xl" />
            <div className="flex flex-wrap gap-1.5">
              <span className="badge bg-slate-100 text-slate-600">{d.category}</span>
              {d.transmissionTags?.slice(0, 1).map((t) => (
                <span key={t} className="badge bg-teal-50 text-teal-700">{t}</span>
              ))}
            </div>
            <h3 className="mt-3 text-base font-semibold text-slate-900">{d.name}</h3>
            {d.causativeOrganism && (
              <p className="mt-1 text-xs italic text-slate-400">{d.causativeOrganism}</p>
            )}
            <p className="mt-2 line-clamp-3 text-sm text-slate-600">{d.overview}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-teal-600">View details →</span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-slate-400">No diseases match your search.</p>
        )}
      </div>
    </div>
  );
}
