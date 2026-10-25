import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ShieldAlert, ShieldCheck, FileText, Users, Clock, Eye, ScrollText,
  CheckCircle2, XCircle, Search, X, BadgeCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@appdeploy/client';
import { useAuth } from '../lib/useAuth';

interface AdminReport {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  date: string;
  status: string;
  userId?: string;
  userEmail?: string;
  attachmentNote?: string;
  createdAt: string;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNotes?: string;
}
interface PendingContribution {
  id: string; title: string; content: string; category: string; authorUsername: string; createdAt: string;
}
interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: string;
  joinedAt: string;
  verifiedAdmin?: boolean;
}
interface AuditLogEntry {
  id: string;
  actorId: string;
  actorUsername: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: Record<string, unknown>;
  createdAt: string;
}

const TABS = ['Overview', 'Reports', 'Contributions', 'Users', 'Audit Log'] as const;
type Tab = typeof TABS[number];

const ROLE_OPTIONS = ['public', 'student', 'professional', 'admin', 'super_admin'];

const STATUS_META: Record<string, { label: string; classes: string }> = {
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700' },
  under_review: { label: 'Under Review', classes: 'bg-blue-100 text-blue-700' },
  reviewed: { label: 'Reviewed', classes: 'bg-indigo-100 text-indigo-700' },
  verified: { label: 'Verified', classes: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Rejected', classes: 'bg-red-100 text-red-700' },
};

function StatusBadge({ status }: { status: string }) {
  const meta = STATUS_META[status] || { label: status, classes: 'bg-slate-100 text-slate-600' };
  return <span className={`badge ${meta.classes}`}>{meta.label}</span>;
}

function formatDate(value?: string) {
  if (!value) return '\u2014';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(value?: string) {
  if (!value) return '\u2014';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/** Simple modal shell reused for the report-details drawer and the verify/reject notes prompt. */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>('Overview');

  const [reports, setReports] = useState<AdminReport[]>([]);
  const [contributions, setContributions] = useState<PendingContribution[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [loadingTab, setLoadingTab] = useState(true);
  const [tabError, setTabError] = useState('');

  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [auditSearch, setAuditSearch] = useState('');
  const [auditActionFilter, setAuditActionFilter] = useState('all');

  const [selectedReport, setSelectedReport] = useState<AdminReport | null>(null);
  const [reportHistory, setReportHistory] = useState<AuditLogEntry[] | null>(null);
  const [actionModal, setActionModal] = useState<{ id: string; type: 'verified' | 'rejected'; notes: string } | null>(null);

  const canReview = !!user && ['admin', 'super_admin', 'professional'].includes(user.role);
  const isAdminRole = !!user && ['admin', 'super_admin'].includes(user.role);
  const isSuperAdmin = user?.role === 'super_admin';

  const visibleTabs = TABS.filter((t) => (t === 'Users' || t === 'Audit Log' ? isAdminRole : true));

  useEffect(() => {
    if (!canReview) { setLoadingTab(false); return; }
    let mounted = true;
    setLoadingTab(true);
    setTabError('');

    const finish = () => { if (mounted) setLoadingTab(false); };

    if (tab === 'Overview') {
      const calls: Promise<any>[] = [api.get('/api/reports')];
      if (isAdminRole) calls.push(api.get('/api/admin/users'));
      Promise.all(calls)
        .then(([reportsRes, usersRes]) => {
          if (!mounted) return;
          setReports(reportsRes.data?.items ?? []);
          if (usersRes) setUsers(usersRes.data?.items ?? []);
        })
        .catch(() => { if (mounted) setTabError('Unable to load overview data.'); })
        .finally(finish);
    } else if (tab === 'Reports') {
      api.get('/api/reports')
        .then((res) => { if (mounted) setReports(res.data?.items ?? []); })
        .catch(() => { if (mounted) setTabError('Unable to load reports.'); })
        .finally(finish);
    } else if (tab === 'Contributions') {
      api.get('/api/contributions/pending')
        .then((res) => { if (mounted) setContributions(res.data?.items ?? []); })
        .catch(() => { if (mounted) setTabError('Unable to load contributions.'); })
        .finally(finish);
    } else if (tab === 'Users' && isAdminRole) {
      api.get('/api/admin/users')
        .then((res) => { if (mounted) setUsers(res.data?.items ?? []); })
        .catch(() => { if (mounted) setTabError('Unable to load users.'); })
        .finally(finish);
    } else if (tab === 'Audit Log' && isAdminRole) {
      api.get('/api/admin/audit-log')
        .then((res) => { if (mounted) setAuditLog(res.data?.items ?? []); })
        .catch(() => { if (mounted) setTabError('Unable to load the audit log.'); })
        .finally(finish);
    } else {
      finish();
    }

    return () => { mounted = false; };
  }, [tab, canReview, isAdminRole]);

  const updateReportStatus = async (id: string, status: string, verificationNotes?: string) => {
    const body: Record<string, unknown> = { status };
    if (verificationNotes) body.verificationNotes = verificationNotes;
    const res = await api.put(`/api/reports/${id}/status`, body);
    setReports((prev) => prev.map((r) => (r.id === id ? {
      ...r,
      status,
      verifiedBy: res.data?.verifiedBy ?? r.verifiedBy,
      verifiedAt: res.data?.verifiedAt ?? r.verifiedAt,
      verificationNotes: res.data?.verificationNotes ?? r.verificationNotes,
    } : r)));
    setSelectedReport((prev) => (prev && prev.id === id ? { ...prev, status, verificationNotes: res.data?.verificationNotes ?? prev.verificationNotes } : prev));
  };

  const updateContributionStatus = async (id: string, status: string) => {
    await api.put(`/api/contributions/${id}/status`, { status });
    setContributions((prev) => prev.filter((c) => c.id !== id));
  };

  const updateUserRole = async (id: string, role: string) => {
    await api.put(`/api/admin/users/${id}/role`, { role });
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const toggleVerifiedAdmin = async (id: string, verifiedAdmin: boolean) => {
    await api.put(`/api/admin/users/${id}/verified-admin`, { verifiedAdmin });
    // Optimistic local update — the users list endpoint doesn't echo this field back on refresh.
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, verifiedAdmin } : u)));
  };

  const openReportDetails = (report: AdminReport) => {
    setSelectedReport(report);
    setReportHistory(null);
    if (isAdminRole) {
      api.get('/api/admin/audit-log')
        .then((res) => {
          const items: AuditLogEntry[] = res.data?.items ?? [];
          setReportHistory(items.filter((e) => e.targetType === 'report' && e.targetId === report.id));
        })
        .catch(() => setReportHistory([]));
    }
  };

  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    return users.filter((u) => {
      const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
      const matchesSearch = !q
        || u.fullName?.toLowerCase().includes(q)
        || u.username?.toLowerCase().includes(q)
        || u.email?.toLowerCase().includes(q);
      return matchesRole && matchesSearch;
    });
  }, [users, userSearch, userRoleFilter]);

  const auditActionTypes = useMemo(() => Array.from(new Set(auditLog.map((e) => e.action))), [auditLog]);
  const filteredAuditLog = useMemo(() => {
    const q = auditSearch.trim().toLowerCase();
    return auditLog.filter((e) => {
      const matchesAction = auditActionFilter === 'all' || e.action === auditActionFilter;
      const matchesSearch = !q
        || e.actorUsername?.toLowerCase().includes(q)
        || e.action?.toLowerCase().includes(q)
        || e.targetType?.toLowerCase().includes(q)
        || e.targetId?.toLowerCase().includes(q);
      return matchesAction && matchesSearch;
    });
  }, [auditLog, auditSearch, auditActionFilter]);

  const overviewCounts = useMemo(() => {
    const byStatus = (s: string) => reports.filter((r) => r.status === s).length;
    return {
      total: reports.length,
      pending: byStatus('pending'),
      underReview: byStatus('under_review'),
      reviewed: byStatus('reviewed'),
      verified: byStatus('verified'),
      rejected: byStatus('rejected'),
    };
  }, [reports]);

  if (!loading && !user) {
    return (
      <div className="section max-w-xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">Sign in to access the admin panel</h1>
        <Link to="/signin" className="btn-primary mx-auto mt-6 inline-flex">Sign In</Link>
      </div>
    );
  }

  if (!loading && user && !canReview) {
    return (
      <div className="section max-w-xl text-center">
        <ShieldAlert className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Access restricted</h1>
        <p className="mt-3 text-slate-600">This area is limited to health professionals and administrators.</p>
      </div>
    );
  }

  return (
    <div className="section">
      <span className="badge flex w-fit items-center gap-1 bg-teal-100 text-teal-700">
        <ShieldCheck className="h-4 w-4" /> {isSuperAdmin ? 'Super Administrator' : isAdminRole ? 'Administrator' : 'Health Professional'}
      </span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Admin Dashboard</h1>
      <p className="mt-2 text-slate-600">Review health observations and community contributions, and manage users.</p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {visibleTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${tab === t ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tabError && <p className="mt-4 text-sm text-red-600">{tabError}</p>}

      {tab === 'Overview' && (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: 'Total Reports', value: overviewCounts.total, icon: FileText },
              { label: 'Pending', value: overviewCounts.pending, icon: Clock },
              { label: 'Under Review', value: overviewCounts.underReview, icon: Eye },
              { label: 'Reviewed', value: overviewCounts.reviewed, icon: ScrollText },
              { label: 'Verified', value: overviewCounts.verified, icon: CheckCircle2 },
              { label: 'Rejected', value: overviewCounts.rejected, icon: XCircle },
            ].map((c) => (
              <div key={c.label} className="card">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <c.icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-xl font-bold text-slate-900">{loadingTab ? '\u2014' : c.value}</p>
                <p className="mt-1 text-xs text-slate-500">{c.label}</p>
              </div>
            ))}
            <div className="card">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Users className="h-4 w-4" />
              </span>
              <p className="mt-3 text-xl font-bold text-slate-900">{isAdminRole ? (loadingTab ? '\u2014' : users.length) : '\u2014'}</p>
              <p className="mt-1 text-xs text-slate-500">Total Users{!isAdminRole && ' (admin only)'}</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'Reports' && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-100">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Reporter</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loadingTab && <tr><td colSpan={7} className="px-4 py-6 text-center text-slate-400">Loading\u2026</td></tr>}
              {!loadingTab && reports.length === 0 && <tr><td colSpan={7} className="px-4 py-6 text-center text-slate-400">No health observations submitted yet.</td></tr>}
              {reports.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{r.title}</td>
                  <td className="px-4 py-3 text-slate-600">{r.userEmail || '\u2014'}</td>
                  <td className="px-4 py-3 text-slate-600">{r.location}</td>
                  <td className="px-4 py-3 text-slate-600">{r.category}</td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(r.createdAt)}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <button onClick={() => openReportDetails(r)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">View</button>
                      {r.status !== 'under_review' && (
                        <button onClick={() => updateReportStatus(r.id, 'under_review')} className="rounded-lg border border-blue-200 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-50">Under Review</button>
                      )}
                      {r.status !== 'reviewed' && (
                        <button onClick={() => updateReportStatus(r.id, 'reviewed')} className="rounded-lg border border-indigo-200 px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-50">Reviewed</button>
                      )}
                      {r.status !== 'verified' && (
                        <button onClick={() => setActionModal({ id: r.id, type: 'verified', notes: '' })} className="rounded-lg border border-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50">Verify</button>
                      )}
                      {r.status !== 'rejected' && (
                        <button onClick={() => setActionModal({ id: r.id, type: 'rejected', notes: '' })} className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-50">Reject</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'Contributions' && (
        <div className="mt-6 space-y-4">
          {loadingTab && <p className="text-sm text-slate-400">Loading\u2026</p>}
          {!loadingTab && contributions.length === 0 && <p className="card text-sm text-slate-500">No contributions pending review.</p>}
          {contributions.map((c) => (
            <div key={c.id} className="card">
              <span className="badge bg-slate-100 text-slate-600">{c.category}</span>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{c.content}</p>
              <p className="mt-2 text-xs text-slate-400">Submitted by @{c.authorUsername}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => updateContributionStatus(c.id, 'approved')} className="rounded-lg border border-emerald-200 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50">Approve</button>
                <button onClick={() => updateContributionStatus(c.id, 'rejected')} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'Users' && isAdminRole && (
        <div className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search users\u2026"
                className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none"
              />
            </div>
            <select
              value={userRoleFilter}
              onChange={(e) => setUserRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="all">All roles</option>
              {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-100">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Verified Admin</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingTab && <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-400">Loading\u2026</td></tr>}
                {!loadingTab && filteredUsers.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-400">No users match your search.</td></tr>}
                {filteredUsers.map((u) => {
                  const isTargetSuperAdmin = u.role === 'super_admin';
                  const canEditRole = isSuperAdmin;
                  const canToggleVerified = isSuperAdmin && (u.role === 'admin' || u.role === 'super_admin');
                  return (
                    <tr key={u.id}>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        <span className="inline-flex items-center gap-1.5">
                          {u.fullName}
                          {u.verifiedAdmin && (
                            <span title="Verified Admin" className="inline-flex items-center rounded-full bg-teal-100 p-0.5 text-teal-700">
                              <BadgeCheck className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">@{u.username}</td>
                      <td className="px-4 py-3 text-slate-600">{u.email}</td>
                      <td className="px-4 py-3">
                        {canEditRole ? (
                          <select
                            value={u.role}
                            onChange={(e) => updateUserRole(u.id, e.target.value)}
                            className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                          >
                            {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                          </select>
                        ) : (
                          <span className="badge bg-slate-100 text-slate-600">{u.role}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {canToggleVerified ? (
                          <button
                            onClick={() => toggleVerifiedAdmin(u.id, !u.verifiedAdmin)}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${u.verifiedAdmin ? 'border-red-200 text-red-700 hover:bg-red-50' : 'border-teal-200 text-teal-700 hover:bg-teal-50'}`}
                          >
                            {u.verifiedAdmin ? 'Revoke' : 'Grant'}
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">{u.verifiedAdmin ? 'Verified' : (isTargetSuperAdmin ? '\u2014' : 'Not verified')}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{formatDate(u.joinedAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-400">Only a super administrator can change roles or grant/revoke Verified Admin status.</p>
        </div>
      )}

      {tab === 'Audit Log' && isAdminRole && (
        <div className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Search audit log\u2026"
                className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none"
              />
            </div>
            <select
              value={auditActionFilter}
              onChange={(e) => setAuditActionFilter(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="all">All actions</option>
              {auditActionTypes.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-100">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Actor</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Target</th>
                  <th className="px-4 py-3">Date/Time</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingTab && <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-400">Loading\u2026</td></tr>}
                {!loadingTab && filteredAuditLog.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-400">No matching audit entries.</td></tr>}
                {filteredAuditLog.map((e) => (
                  <tr key={e.id}>
                    <td className="px-4 py-3 font-medium text-slate-900">@{e.actorUsername}</td>
                    <td className="px-4 py-3 text-slate-600">{e.action}</td>
                    <td className="px-4 py-3 text-slate-600">{e.targetType} \u00b7 {e.targetId}</td>
                    <td className="px-4 py-3 text-slate-600">{formatDateTime(e.createdAt)}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {e.details ? (
                        <code className="text-xs">{JSON.stringify(e.details)}</code>
                      ) : '\u2014'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedReport && (
        <Modal title="Report Details" onClose={() => setSelectedReport(null)}>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-slate-900">{selectedReport.title}</h4>
              <StatusBadge status={selectedReport.status} />
            </div>
            <p className="whitespace-pre-line text-slate-600">{selectedReport.description}</p>
            <dl className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 text-xs">
              <div><dt className="text-slate-400">Location</dt><dd className="mt-0.5 font-medium text-slate-700">{selectedReport.location}</dd></div>
              <div><dt className="text-slate-400">Category</dt><dd className="mt-0.5 font-medium text-slate-700">{selectedReport.category}</dd></div>
              <div><dt className="text-slate-400">Submitted</dt><dd className="mt-0.5 font-medium text-slate-700">{formatDate(selectedReport.createdAt)}</dd></div>
              <div><dt className="text-slate-400">Reporter</dt><dd className="mt-0.5 font-medium text-slate-700">{selectedReport.userEmail || '\u2014'}</dd></div>
            </dl>
            {selectedReport.attachmentNote && (
              <p className="text-xs text-slate-500"><span className="font-medium text-slate-600">Attachment note:</span> {selectedReport.attachmentNote}</p>
            )}
            {(selectedReport.verifiedBy || selectedReport.verificationNotes) && (
              <div className="rounded-xl border border-slate-100 p-3 text-xs text-slate-600">
                <p><span className="font-medium">Last action by:</span> @{selectedReport.verifiedBy} \u00b7 {formatDateTime(selectedReport.verifiedAt)}</p>
                {selectedReport.verificationNotes && <p className="mt-1">{selectedReport.verificationNotes}</p>}
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Review History</p>
              {!isAdminRole && <p className="mt-1 text-xs text-slate-400">Full history is visible to administrators.</p>}
              {isAdminRole && reportHistory === null && <p className="mt-1 text-xs text-slate-400">Loading\u2026</p>}
              {isAdminRole && reportHistory && reportHistory.length === 0 && <p className="mt-1 text-xs text-slate-400">No status changes recorded yet.</p>}
              {isAdminRole && reportHistory && reportHistory.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {reportHistory.map((h) => (
                    <li key={h.id} className="rounded-lg bg-slate-50 p-2 text-xs">
                      <span className="font-medium text-slate-700">@{h.actorUsername}</span> \u2014 {h.action} \u00b7 {formatDateTime(h.createdAt)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Modal>
      )}

      {actionModal && (
        <Modal
          title={actionModal.type === 'verified' ? 'Verify Report' : 'Reject Report'}
          onClose={() => setActionModal(null)}
        >
          <p className="text-sm text-slate-600">
            {actionModal.type === 'verified'
              ? 'You can add optional verification notes for this report.'
              : 'Please provide a reason for rejecting this report.'}
          </p>
          <textarea
            value={actionModal.notes}
            onChange={(e) => setActionModal({ ...actionModal, notes: e.target.value })}
            rows={4}
            placeholder={actionModal.type === 'verified' ? 'Optional notes\u2026' : 'Rejection reason\u2026'}
            className="mt-3 w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-teal-500 focus:outline-none"
          />
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setActionModal(null)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">Cancel</button>
            <button
              onClick={async () => {
                await updateReportStatus(actionModal.id, actionModal.type, actionModal.notes.trim() || undefined);
                setActionModal(null);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium text-white ${actionModal.type === 'verified' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              Confirm {actionModal.type === 'verified' ? 'Verification' : 'Rejection'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
