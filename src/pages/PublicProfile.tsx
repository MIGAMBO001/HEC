import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarDays, User as UserIcon } from 'lucide-react';
import { api } from '@appdeploy/client';

interface PublicProfileData {
  username: string;
  fullName: string;
  role: string;
  joinedAt: string;
  bio: string;
  contributions: { id: string; title: string; category: string; createdAt: string }[];
}

const ROLE_LABELS: Record<string, string> = {
  public: 'General Contributor',
  student: 'Student / Researcher',
  professional: 'Health Professional',
  admin: 'Administrator',
};

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState<PublicProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;
    let mounted = true;
    setLoading(true);
    setNotFound(false);
    api.get(`/api/users/${username}`)
      .then((res) => { if (mounted) setProfile(res.data); })
      .catch(() => { if (mounted) setNotFound(true); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [username]);

  if (loading) {
    return <div className="section text-center text-sm text-slate-400">Loading profile…</div>;
  }

  if (notFound || !profile) {
    return (
      <div className="section text-center">
        <p className="text-slate-600">That profile could not be found.</p>
        <Link to="/" className="mt-4 inline-block text-teal-600">← Back home</Link>
      </div>
    );
  }

  return (
    <div className="section max-w-2xl">
      <div className="card flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-700">
          <UserIcon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">@{profile.username}</h1>
          <p className="text-sm text-slate-500">{profile.fullName}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="badge bg-teal-100 text-teal-700">{ROLE_LABELS[profile.role] || profile.role}</span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <CalendarDays className="h-3.5 w-3.5" /> Joined {new Date(profile.joinedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      {profile.bio && <p className="card mt-6 text-sm text-slate-600">{profile.bio}</p>}

      <h2 className="mt-8 text-lg font-semibold text-slate-900">Published Contributions</h2>
      <div className="mt-4 space-y-3">
        {profile.contributions.length === 0 && <p className="card text-sm text-slate-500">No published contributions yet.</p>}
        {profile.contributions.map((c) => (
          <div key={c.id} className="card">
            <p className="font-semibold text-slate-900">{c.title}</p>
            <p className="text-xs text-slate-500">{c.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
