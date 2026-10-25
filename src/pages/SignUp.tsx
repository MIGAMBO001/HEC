import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/useAuth';

const ROLE_OPTIONS = [
  { value: 'public', label: 'General Public' },
  { value: 'student', label: 'Student / Researcher' },
  { value: 'professional', label: 'Health Professional' },
];

export default function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', username: '', email: '', phone: '', password: '', role: 'public' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    if (form.password.length < 8 || !/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      setFormError('Password must be at least 8 characters and include both letters and numbers.');
      return;
    }
    setSubmitting(true);
    try {
      await register(form);
      navigate('/');
    } catch (err: any) {
      setFormError(err?.response?.data?.error || 'Could not create your account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section max-w-lg">
      <span className="badge w-fit bg-teal-100 text-teal-700">Join HoticeEpiConnect</span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Create your account</h1>
      <p className="mt-2 text-slate-600">Your username becomes your public identity across the platform.</p>

      {formError && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">Full name</label>
          <input required value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Username</label>
          <input required value={form.username} onChange={(e) => update('username', e.target.value)} placeholder="letters, numbers, underscores" className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Phone number</label>
            <input required value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+234..." className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input required type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="At least 8 characters, letters and numbers" className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">I am joining as a</label>
          <select value={form.role} onChange={(e) => update('role', e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
            {ROLE_OPTIONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <p className="mt-1 text-xs text-slate-400">Health professional and researcher access can be reviewed by an administrator.</p>
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          {submitting ? 'Creating account…' : 'Create Account'}
        </button>
        <p className="text-center text-sm text-slate-500">
          Already have an account? <Link to="/signin" className="font-semibold text-teal-600">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
