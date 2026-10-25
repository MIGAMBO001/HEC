import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Activity, Microscope, Quote, GraduationCap, Stethoscope, Users, Search } from 'lucide-react';
import { api } from '@appdeploy/client';
import { diseases } from '../lib/data';

const features = [
  { icon: Microscope, title: 'Disease Information Library', desc: 'Searchable microbiology-grade profiles covering symptoms, transmission, diagnosis, and prevention.' },
  { icon: FileText, title: 'Community Health Reporting', desc: 'Anyone can submit a community health observation in minutes, reviewed before it goes public.' },
  { icon: BookOpen, title: 'Health Education Articles', desc: 'Public health, microbiology, and research summaries written for real understanding.' },
  { icon: GraduationCap, title: 'Student & Researcher Resources', desc: 'Deeper scientific detail, classification, and references built for coursework and study.' },
  { icon: Stethoscope, title: 'Health Professional Contributions', desc: 'Verified professionals can review submissions and contribute trusted content.' },
];

const steps = [
  { title: 'Learn About Diseases', desc: 'Browse the disease library and health articles to understand risks, transmission, and prevention.' },
  { title: 'Share Community Health Observations', desc: 'Submit a health report from your community; it is reviewed before appearing on the public dashboard.' },
  { title: 'Support Disease Awareness & Surveillance', desc: 'Track trends on the surveillance dashboard and help strengthen early warning across your community.' },
];

const audiences = [
  { icon: Users, title: 'Public Users', desc: 'Understand common diseases, learn prevention steps, and report health concerns in your community.' },
  { icon: GraduationCap, title: 'Students', desc: 'Study microbiology-grade disease profiles with classification, diagnosis, and references for coursework.' },
  { icon: Search, title: 'Researchers', desc: 'Access structured epidemiology, transmission, and outbreak data across a growing disease library.' },
  { icon: Stethoscope, title: 'Health Professionals', desc: 'Review community submissions and contribute verified clinical and public health content.' },
];

const testimonials = [
  { name: 'Amaka O.', role: 'Public Health Student, Enugu', quote: 'The disease library reads like a proper microbiology reference, not a generic health blog. It has genuinely helped my coursework.' },
  { name: 'Dr. Tunde A.', role: 'Community Health Officer', quote: 'Reporting a suspected outbreak now takes minutes instead of phone calls that go nowhere.' },
  { name: 'Blessing N.', role: 'Undergraduate, Microbiology', quote: 'I like that the platform explains transmission and microbiology together. It connects theory to real public health.' },
];

export default function Landing() {
  const [reportCount, setReportCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    api.get('/api/dashboard-stats').then((res) => {
      if (mounted) setReportCount(res.data?.totalReports ?? 0);
    }).catch(() => { if (mounted) setReportCount(0); });
    return () => { mounted = false; };
  }, []);

  const stats = [
    { label: 'Diseases Documented', value: `${diseases.length}+` },
    { label: 'Community Reports', value: reportCount === null ? '—' : `${reportCount}` },
    { label: 'States Covered', value: '36' },
    { label: 'Operated By', value: 'HOTICE Immunotech' },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="badge bg-teal-100 text-teal-700">Health Intelligence Platform</span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Connecting communities with <span className="text-teal-600">health intelligence</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              HoticeEpiConnect is a health-tech platform for disease surveillance, health education, disease
              information, and community health reporting, built for students, health professionals, and
              communities across Nigeria and Africa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/diseases" className="btn-primary">
                Explore Disease Library <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/report" className="btn-secondary">
                Submit Health Report
              </Link>
              <Link to="/articles" className="btn-secondary">
                Learn About Diseases
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="card border-teal-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Live Surveillance Snapshot</span>
                <Activity className="h-5 w-5 text-teal-600" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Everything a modern health platform needs</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            From disease surveillance to community reporting, HoticeEpiConnect is built to scale into a full
            public health ecosystem.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="section">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="card text-left">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Built for every kind of health champion</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Whether you're learning, researching, treating patients, or just staying informed, HoticeEpiConnect
            has a place for you.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <div key={a.title} className="card">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <a.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{a.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Trusted by students and health workers</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card">
              <Quote className="h-5 w-5 text-teal-500" />
              <p className="mt-4 text-sm text-slate-600">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="rounded-3xl bg-teal-600 px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-bold text-white">Ready to strengthen health intelligence in your community?</h2>
          <p className="mx-auto mt-3 max-w-xl text-teal-50">
            Join students, researchers, and health professionals building a healthier, better-informed Africa.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/report" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-50">
              Report Health Concern
            </Link>
            <Link to="/dashboard" className="rounded-xl border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-teal-500">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
