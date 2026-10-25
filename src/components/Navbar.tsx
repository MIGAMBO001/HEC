import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useAuth } from '../lib/useAuth';
import Logo from './Logo';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/diseases', label: 'Disease Library' },
  { to: '/articles', label: 'Articles' },
  { to: '/contributions', label: 'Community' },
  { to: '/report', label: 'Report' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-slate-900">HoticeEpiConnect</span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-teal-600">HOTICE Immunotech</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                location.pathname === link.to ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                location.pathname === '/admin' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="h-4 w-4" /> Admin
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!loading && user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                <UserIcon className="h-4 w-4" />
                @{user.username}
              </Link>
              <button onClick={() => logout()} className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/signin" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Sign In</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Admin
              </Link>
            )}
            <Link to="/profile" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Profile
            </Link>
            {!loading && user ? (
              <button onClick={() => { logout(); setOpen(false); }} className="mt-2 rounded-lg border border-slate-200 px-3 py-2 text-left text-sm font-medium text-slate-600">
                Sign out
              </button>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                <Link to="/signin" onClick={() => setOpen(false)} className="btn-secondary text-center">Sign In</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary text-center">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
