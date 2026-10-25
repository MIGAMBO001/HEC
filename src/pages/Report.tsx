import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { api } from '@appdeploy/client';
import { useAuth } from '../lib/useAuth';

const categories = ['Infectious Disease', 'Waterborne Illness', 'Respiratory Illness', 'Foodborne Illness', 'Vector-borne Disease', 'Other'];

const initialForm = {
  title: '',
  description: '',
  location: '',
  category: categories[0],
  date: new Date().toISOString().slice(0, 10),
  attachmentNote: '',
};

export default function Report() {
  const { user, loading } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const update = (key: keyof typeof initialForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');
    setSuccess(false);

    if (!form.title.trim() || !form.description.trim() || !form.location.trim() || !form.date.trim()) {
      setFormError('Please fill in the title, description, location, and date before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/reports', form);
      setSuccess(true);
      setForm(initialForm);
    } catch (err: any) {
      setFormError(err?.response?.data?.error || 'Something went wrong while submitting your observation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!loading && !user) {
    return (
      <div className="section max-w-xl text-center">
        <span className="badge w-fit bg-teal-100 text-teal-700">Health Signal Reporting</span>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Sign in to submit a health observation</h1>
        <p className="mt-3 text-slate-600">
          To keep community health signals credible, we ask contributors to sign in first. It only takes a moment.
        </p>
        <Link to="/signin" className="btn-primary mx-auto mt-6 inline-flex">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="section max-w-2xl">
      <span className="badge w-fit bg-teal-100 text-teal-700">Health Signal Reporting</span>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Submit a Community Health Observation</h1>
      <p className="mt-2 text-slate-600">
        Share what you're seeing in your community. This is not a diagnosis; a health professional or administrator
        reviews every observation before it appears on the public dashboard.
      </p>

      {success && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <span>Thank you, your observation has been submitted and is under review. You can track it from your profile.</span>
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
          <label className="text-sm font-medium text-slate-700">Observation title</label>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="e.g. Suspected cholera cases in Ajah community"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={4}
            placeholder="Describe what you observed, number of people affected, and any relevant details."
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Location</label>
            <input
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="e.g. Ajah, Lagos State"
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Date observed</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Attachment note (optional)</label>
          <input
            value={form.attachmentNote}
            onChange={(e) => update('attachmentNote', e.target.value)}
            placeholder="Reference to a photo, lab result, or supporting link"
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          <FileText className="h-4 w-4" />
          {submitting ? 'Submitting…' : 'Submit Observation'}
        </button>
      </form>
    </div>
  );
}
