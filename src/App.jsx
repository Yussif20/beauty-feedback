import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import SinglePost from './pages/SinglePost';
import Chat from './pages/Chat';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/admin" element={<AdminDashboard user={user} />} />
        <Route path="/post/:id" element={<SinglePost user={user} />} />
        <Route path="/chat" element={<Chat user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
