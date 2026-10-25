import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, User as UserIcon, Eye, X, CheckCircle2, XCircle, Circle } from 'lucide-react';
import { api } from '@appdeploy/client';
import { useAuth } from '../lib/useAuth';

interface MyReport {
  id: string; title: string; location: string; category: string; date: string; status: string; description: string; createdAt: string; verifiedBy?: string; verifiedAt?: string; verificationNotes?: string;
}

const REPORT_STATUS_META: Record<string, { label: string; classes: string }> = {
  pending: { label: 'Submitted', classes: 'bg-amber-100 text-amber-700' },
  under_review: { label: 'Under Review', classes: 'bg-blue-100 text-blue-700' },
  reviewed: { label: 'Reviewed', classes: 'bg-indigo-100 text-indigo-700' },
  verified: { label: 'Verified', classes: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Rejected', classes: 'bg-red-100 text-red-700' },
};

const REPORT_STATUS_ORDER = ['pending', 'under_review', 'reviewed', 'verified'];

function formatReportDate(value?: string) {
  if (!value) return '\u2014';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatReportDateTime(value?: string) {
  if (!value) return '\u2014';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function reportTimeline(status: string) {
  const isRejected = status === 'rejected';
  const currentIndex = REPORT_STATUS_ORDER.indexOf(status);
  const steps = REPORT_STATUS_ORDER.map((key, idx) => ({
    key,
    label: REPORT_STATUS_META[key].label,
    state: isRejected
      ? (idx === 0 ? 'done' as const : 'skipped' as const)
      : idx < currentIndex ? 'done' as const : idx === currentIndex ? 'current' as const : 'upcoming' as const,
  }));
  if (isRejected) {
    steps.push({ key: 'rejected', label: 'Rejected', state: 'current' as const });
  }
  return steps;
}
interface MyContribution {
  id: string; title: string; category: string; status: string; createdAt: string;
}

const ROLE_LABELS: Record<string, string> = {
  public: 'General Contributor',
  student: 'Student / Researcher',
  professional: 'Health Professional',
  admin: 'Administrator',
};

function ReportDetailsModal({ report, onClose }: { report: MyReport; onClose: () => void }) {
  const meta = REPORT_STATUS_META[report.status] || { label: report.status, classes: 'bg-slate-100 text-slate-600' };
  const timeline = reportTimeline(report.status);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Report Details</h3>
          <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-sm">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-base font-semibold text-slate-900">{report.title}</h4>
            <span className={`badge shrink-0 ${meta.classes}`}>{meta.label}</span>
          </div>
          <p className="whitespace-pre-line text-slate-600">{report.description}</p>
          <dl className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 text-xs">
            <div><dt className="text-slate-400">Location</dt><dd className="mt-0.5 font-medium text-slate-700">{report.location}</dd></div>
            <div><dt className="text-slate-400">Category</dt><dd className="mt-0.5 font-medium text-slate-700">{report.category}</dd></div>
            <div><dt className="text-slate-400">Submitted</dt><dd className="mt-0.5 font-medium text-slate-700">{formatReportDate(report.createdAt)}</dd></div>
          </dl>

          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Status</p>
            <ol className="mt-3 space-y-3">
              {timeline.map((step, idx) => (
                <li key={step.key} className="flex items-start gap-3">
                  <span className="flex flex-col items-center">
                    {step.state === 'done' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                    {step.state === 'current' && (step.key === 'rejected' ? <XCircle className="h-5 w-5 text-red-500" /> : <CheckCircle2 className="h-5 w-5 text-teal-600" />)}
                    {(step.state === 'upcoming' || step.state === 'skipped') && <Circle className="h-5 w-5 text-slate-300" />}
                    {idx < timeline.length - 1 && <span className={`mt-1 h-6 w-px ${step.state === 'done' ? 'bg-emerald-300' : 'bg-slate-200'}`} />}
                  </span>
                  <span className={`pt-0.5 text-sm ${step.state === 'current' ? 'font-semibold text-slate-900' : step.state === 'skipped' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {(report.verificationNotes || report.verifiedBy) && (
            <div className="rounded-xl border border-slate-100 p-3 text-xs text-slate-600">
              <p className="font-medium text-slate-700">Review notes</p>
              {report.verifiedBy && <p className="mt-1">Reviewed by @{report.verifiedBy} \u00b7 {formatReportDateTime(report.verifiedAt)}</p>}
              {report.verificationNotes && <p className="mt-1">{report.verificationNotes}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, loading } = useAuth();
  const [reports, setReports] = useState<MyReport[]>([]);
  const [contributions, setContributions] = useState<MyContribution[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [bio, setBio] = useState('');
  const [savingBio, setSavingBio] = useState(false);
  const [bioSaved, setBioSaved] = useState(false);
  const [selectedReport, setSelectedReport] = useState<MyReport | null>(null);

  useEffect(() => {
    if (!user) { setLoadingData(false); return; }
    setBio(user.bio || '');
    let mounted = true;
    Promise.all([
      api.get('/api/reports/mine'),
      api.get('/api/contributions/mine'),
    ]).then(([reportsRes, contribRes]) => {
      if (!mounted) return;
      setReports(reportsRes.data?.items ?? []);
      setContributions(contribRes.data?.items ?? []);
    }).finally(() => { if (mounted) setLoadingData(false); });
    return () => { mounted = false; };
  }, [user]);

  const saveBio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingBio(true);
    setBioSaved(false);
    try {
      await api.put('/api/users/me', { bio });
      setBioSaved(true);
    } finally {
      setSavingBio(false);
    }
  };

  if (!loading && !user) {
    return (
      <div className="section max-w-xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">Sign in to view your profile</h1>
        <Link to="/signin" className="btn-primary mx-auto mt-6 inline-flex">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="card flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <UserIcon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">@{user?.username}</h1>
          <p className="text-sm text-slate-500">{user?.fullName} · {user?.email}</p>
          <span className="badge mt-2 bg-teal-100 text-teal-700">{user ? ROLE_LABELS[user.role] : ''}</span>
        </div>
      </div>

      <form onSubmit={saveBio} className="card mt-6">
        <label className="text-sm font-medium text-slate-700">About you (shown on your public profile)</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} maxLength={300} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        <div className="mt-3 flex items-center gap-3">
          <button type="submit" disabled={savingBio} className="btn-secondary">{savingBio ? 'Saving…' : 'Save'}</button>
          {bioSaved && <span className="text-sm text-emerald-600">Saved.</span>}
          <Link to={`/profile/${user?.username}`} className="ml-auto text-sm font-semibold text-teal-600">View public profile →</Link>
        </div>
      </form>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">My Health Reports</h2>
      </div>
      <div className="mt-4 space-y-4">
        {loadingData && <p className="text-sm text-slate-400">Loading…</p>}
        {!loadingData && reports.length === 0 && (
          <p className="card text-sm text-slate-500">Your submitted health reports will appear here.</p>
        )}
        {reports.map((r) => {
          const meta = REPORT_STATUS_META[r.status] || { label: r.status, classes: 'bg-slate-100 text-slate-600' };
          return (
            <div key={r.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{r.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span>{r.category}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{r.location}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{formatReportDate(r.createdAt)}</span>
                  </div>
                </div>
                <span className={`badge shrink-0 ${meta.classes}`}>{meta.label}</span>
              </div>
              <button
                onClick={() => setSelectedReport(r)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                <Eye className="h-3.5 w-3.5" /> View Details
              </button>
            </div>
          );
        })}
      </div>

      {selectedReport && <ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} />}

      <h2 className="mt-10 text-lg font-semibold text-slate-900">My Contributions</h2>
      <div className="mt-4 space-y-4">
        {!loadingData && contributions.length === 0 && <p className="card text-sm text-slate-500">You haven't submitted any contributions yet.</p>}
        {contributions.map((c) => (
          <div key={c.id} className="card flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">{c.title}</p>
              <p className="text-xs text-slate-500">{c.category}</p>
            </div>
            <span className={`badge shrink-0 ${
              c.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
              c.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {c.status === 'pending' ? 'Pending review' : c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
