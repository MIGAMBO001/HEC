import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Diseases from './pages/Diseases';
import DiseaseDetail from './pages/DiseaseDetail';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Report from './pages/Report';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import Admin from './pages/Admin';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Contribute from './pages/Contribute';
import Contributions from './pages/Contributions';

function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diseases" element={<Diseases />} />
            <Route path="/diseases/:id" element={<DiseaseDetail />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/report" element={<Report />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<PublicProfile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
