import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { api } from '@appdeploy/client';

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/api/auth/forgot-password', { identifier });
      setMessage(res.data?.message || 'If an account matches, password reset instructions have been sent to the email on file.');
    } catch {
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section max-w-md">
      <span className="badge w-fit bg-teal-100 text-teal-700">Account Recovery</span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Forgot your password?</h1>
      <p className="mt-2 text-slate-600">
        Enter your username, email, or phone number and we'll send password reset instructions to the email on file, if an account matches.
      </p>

      {message && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">Username, email, or phone</label>
          <input required value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          {submitting ? 'Sending…' : 'Send Reset Instructions'}
        </button>
        <p className="text-center text-sm text-slate-500">
          Remembered it? <Link to="/signin" className="font-semibold text-teal-600">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
