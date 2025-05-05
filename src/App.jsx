import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import SinglePost from './pages/SinglePost';
import Chat from './pages/Chat';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Show limited Navbar (logo + switchers) on Login/Register
  const isAuthPage =
    location.pathname === '/' || location.pathname === '/register';

  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900">
      <Navbar user={user} setUser={setUser} isAuthPage={isAuthPage} />
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/admin" element={<AdminDashboard user={user} />} />
        <Route path="/post/:id" element={<SinglePost user={user} />} />
        <Route path="/chat" element={<Chat user={user} />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
