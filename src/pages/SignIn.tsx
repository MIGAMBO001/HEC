import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/useAuth';

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);
    try {
      await login(identifier, password);
      navigate('/');
    } catch (err: any) {
      setFormError(err?.response?.data?.error || 'Could not sign you in. Please check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section max-w-md">
      <span className="badge w-fit bg-teal-100 text-teal-700">Welcome back</span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Sign in</h1>
      <p className="mt-2 text-slate-600">Use your username, email, or phone number.</p>

      {formError && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">Username, email, or phone</label>
          <input required value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
        <div className="flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-teal-600">Forgot password?</Link>
          <Link to="/signup" className="font-semibold text-teal-600">Create an account</Link>
        </div>
      </form>
    </div>
  );
}
