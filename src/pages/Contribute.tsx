import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@appdeploy/client';
import { useAuth } from '../lib/useAuth';

const CATEGORIES = ['Health Question', 'Awareness Content', 'Community Health Observation', 'Suggestion', 'Educational Contribution'];

export default function Contribute() {
  const { user, loading } = useAuth();
  const [form, setForm] = useState({ title: '', content: '', category: CATEGORIES[0] });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setSuccess(false);
    if (!form.title.trim() || !form.content.trim()) {
      setFormError('Please fill in a title and content before submitting.');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/api/contributions', form);
      setSuccess(true);
      setForm({ title: '', content: '', category: CATEGORIES[0] });
    } catch (err: any) {
      setFormError(err?.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!loading && !user) {
    return (
      <div className="section max-w-xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">Sign in to contribute</h1>
        <p className="mt-3 text-slate-600">Create an account to submit health questions, awareness content, or educational contributions for review.</p>
        <Link to="/signin" className="btn-primary mx-auto mt-6 inline-flex">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="section max-w-2xl">
      <span className="badge w-fit bg-teal-100 text-teal-700">Community Contribution</span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Submit a Contribution</h1>
      <p className="mt-2 text-slate-600">
        Share a health question, awareness content, or an educational contribution. A health professional or
        administrator reviews every submission before it appears publicly.
      </p>

      {success && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <span>Thank you, your contribution has been submitted and is pending review.</span>
        </div>
      )}
      {formError && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-700">Category</label>
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Title</label>
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Content</label>
          <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={6} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" />
        </div>
        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          {submitting ? 'Submitting…' : 'Submit for Review'}
        </button>
      </form>
    </div>
  );
}
