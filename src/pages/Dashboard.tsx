import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, FileText, MapPin, TrendingUp, Users } from 'lucide-react';
import { api } from '@appdeploy/client';
import { diseases, nigerianStates } from '../lib/data';

interface RecentReport {
  id: string;
  title: string;
  location: string;
  category: string;
  date: string;
  status: string;
}

interface DashboardStats {
  totalReports: number;
  verified: number;
  pending: number;
  recent: RecentReport[];
}

const trendData = [
  { name: 'Malaria', level: 78 },
  { name: 'Cholera', level: 42 },
  { name: 'Typhoid Fever', level: 55 },
  { name: 'Lassa Fever', level: 28 },
  { name: 'Tuberculosis', level: 34 },
];

const alerts = [
  { title: 'Seasonal Cholera Risk', region: 'Rivers & Bayelsa States', level: 'High' },
  { title: 'Lassa Fever Watch', region: 'Edo & Ondo States', level: 'Moderate' },
  { title: 'Malaria Surge (Rainy Season)', region: 'Nationwide', level: 'High' },
];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let mounted = true;
    api.get('/api/dashboard-stats')
      .then((res) => { if (mounted) setStats(res.data); })
      .catch(() => { if (mounted) setErrorMsg('Could not load live statistics. Showing partial data.'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const cards = [
    { label: 'Total Reports', value: stats?.totalReports ?? 0, icon: FileText },
    { label: 'Verified Reports', value: stats?.verified ?? 0, icon: Activity },
    { label: 'Pending Review', value: stats?.pending ?? 0, icon: TrendingUp },
    { label: 'Diseases Monitored', value: diseases.length, icon: Users },
  ];

  return (
    <div className="section">
      <div className="flex flex-col gap-2">
        <span className="badge w-fit bg-teal-100 text-teal-700">Disease Surveillance</span>
        <h1 className="text-3xl font-bold text-slate-900">Surveillance Dashboard</h1>
        <p className="max-w-2xl text-slate-600">
          A real-time overview of community-submitted health reports, disease trends, and geographic hotspots
          across the HoticeEpiConnect network.
        </p>
      </div>

      {errorMsg && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {errorMsg}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="card">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <c.icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-2xl font-bold text-slate-900">{loading ? '—' : c.value}</p>
            <p className="mt-1 text-sm text-slate-500">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Health Reports</h2>
            <FileText className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-4 divide-y divide-slate-100">
            {loading && <p className="py-6 text-sm text-slate-400">Loading reports…</p>}
            {!loading && (!stats || stats.recent.length === 0) && (
              <p className="py-6 text-sm text-slate-400">No reports submitted yet. Be the first to report a health concern.</p>
            )}
            {!loading && stats?.recent.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{r.title}</p>
                  <p className="text-xs text-slate-500">{r.location} · {r.category} · {r.date}</p>
                </div>
                <span className={`badge ${
                  r.status === 'verified' ? 'bg-emerald-100 text-emerald-700' :
                  r.status === 'reviewed' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Health Alerts</h2>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-4 space-y-3">
            {alerts.map((a) => (
              <div key={a.title} className="rounded-xl border border-slate-100 p-3">
                <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                <p className="text-xs text-slate-500">{a.region}</p>
                <span className={`badge mt-2 ${a.level === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {a.level} risk
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900">Disease Trend Overview</h2>
          <div className="mt-5 space-y-4">
            {trendData.map((t) => (
              <div key={t.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{t.name}</span>
                  <span className="text-slate-500">{t.level}%</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-teal-500" style={{ width: `${t.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Geographic Distribution</h2>
            <MapPin className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-5 space-y-3">
            {nigerianStates.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="w-28 text-sm font-medium text-slate-700">{s.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${s.reports}%` }} />
                </div>
                <span className="w-8 text-right text-xs text-slate-500">{s.reports}%</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-400">Sample regional distribution based on relative report density. Full mapping integration planned.</p>
        </div>
      </div>
    </div>
  );
}
