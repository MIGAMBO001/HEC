import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { api } from '@appdeploy/client';
import { useAuth } from '../lib/useAuth';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="section max-w-md text-center">
        <ShieldAlert className="mx-auto h-10 w-10 text-amber-500" />
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Invalid reset link</h1>
        <p className="mt-3 text-slate-600">
          This password reset link is missing its token. Please request a new one.
        </p>
        <Link to="/forgot-password" className="btn-primary mx-auto mt-6 inline-flex">Request a new link</Link>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (newPassword.length < 8 || !/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setFormError('Password must be at least 8 characters and include both letters and numbers.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/auth/reset-password', { token, newPassword });
      setSuccess(true);
      await refresh();
    } catch (err: any) {
      setFormError(err?.response?.data?.error || 'This reset link is invalid or has expired. Please request a new one.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="section max-w-md text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Password reset</h1>
        <p className="mt-3 text-slate-600">Your password has been changed successfully and you're signed in.</p>
        <button onClick={() => navigate('/')} className="btn-primary mx-auto mt-6 inline-flex">Continue</button>
      </div>
    );
  }

  return (
    <div className="section max-w-md">
      <span className="badge w-fit bg-teal-100 text-teal-700">Account Recovery</span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Choose a new password</h1>
      <p className="mt-2 text-slate-600">Enter and confirm your new password below.</p>

      {formError && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">New password</label>
          <input
            required
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <p className="mt-1 text-xs text-slate-400">At least 8 characters, with letters and numbers.</p>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Confirm new password</label>
          <input
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          {submitting ? 'Resetting\u2026' : 'Reset Password'}
        </button>
        <p className="text-center text-sm text-slate-500">
          Remembered it? <Link to="/signin" className="font-semibold text-teal-600">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
