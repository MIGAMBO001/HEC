import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-base font-bold text-slate-900">HoticeEpiConnect</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Connecting communities with health intelligence. A HOTICE Immunotech initiative for disease surveillance, health education, and public health reporting across Nigeria and Africa.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link to="/dashboard" className="hover:text-teal-600">Surveillance Dashboard</Link></li>
              <li><Link to="/diseases" className="hover:text-teal-600">Disease Library</Link></li>
              <li><Link to="/articles" className="hover:text-teal-600">Health Articles</Link></li>
              <li><Link to="/report" className="hover:text-teal-600">Report a Concern</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link to="/profile" className="hover:text-teal-600">My Profile</Link></li>
              <li><Link to="/admin" className="hover:text-teal-600">Admin Panel</Link></li>
              <li><span>Researchers &amp; Students</span></li>
              <li><span>Health Professionals</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> Hoticeimmunotech@gmail.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Minna, Niger State</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +2349069199580</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} HoticeEpiConnect · A HOTICE Immunotech product. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
