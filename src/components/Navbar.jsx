import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSearch,
} from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';
import { API_ENDPOINTS } from '../api';

function Navbar({ user, setUser, isAuthPage }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      const posts = await API_ENDPOINTS.POSTS();
      const filtered = posts.filter((post) =>
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-pink-600 dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          to={user ? '/home' : '/'}
          className="text-white text-xl sm:text-2xl font-bold"
        >
          Beauty Feedback
        </Link>
        <div className="flex items-center space-x-4">
          {!isAuthPage && user && (
            <div className="relative" ref={searchRef}>
              <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg px-3 py-2">
                <FaSearch className="text-gray-500 dark:text-gray-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={t('search')}
                  className="bg-transparent text-gray-900 dark:text-white focus:outline-none w-32 sm:w-48"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg max-h-96 overflow-y-auto">
                  {searchResults.map((post) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      className="block p-4 hover:bg-pink-50 dark:hover:bg-gray-700 transition-all duration-300"
                      onClick={() => {
                        setSearchResults([]);
                        setSearchQuery('');
                      }}
                    >
                      <p className="text-gray-900 dark:text-white text-sm">
                        {post.content}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {t('by')} {post.first_name} {post.last_name}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthPage && user ? (
              <>
                <Link
                  to="/home"
                  className="text-white hover:text-pink-200 transition-colors duration-300 font-medium"
                >
                  {t('home')}
                </Link>
                <Link
                  to="/chat"
                  className="text-white hover:text-pink-200 transition-colors duration-300 font-medium"
                >
                  {t('chat')}
                </Link>
                {user.is_admin && (
                  <Link
                    to="/admin"
                    className="text-white hover:text-pink-200 transition-colors duration-300 font-medium"
                  >
                    {t('admin_dashboard')}
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-white hover:text-pink-200 transition-colors duration-300 font-medium flex items-center"
                >
                  <FaUser className="mr-1" /> {t('profile')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-pink-200 transition-colors duration-300 font-medium flex items-center"
                >
                  <FaSignOutAlt className="mr-1" /> {t('log_out')}
                </button>
              </>
            ) : null}
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-pink-200 transition-colors duration-300 font-medium"
            >
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </button>
            <ThemeSwitcher />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-pink-200 transition-colors duration-300"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-pink-600 dark:bg-gray-800 px-4 py-6 flex flex-col items-center space-y-4">
          {!isAuthPage && user ? (
            <>
              <Link
                to="/home"
                className="text-white text-lg font-medium hover:text-pink-200 transition-colors duration-300 w-full text-center py-2 rounded-lg hover:bg-pink-700 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                to="/chat"
                className="text-white text-lg font-medium hover:text-pink-200 transition-colors duration-300 w-full text-center py-2 rounded-lg hover:bg-pink-700 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {t('chat')}
              </Link>
              {user.is_admin && (
                <Link
                  to="/admin"
                  className="text-white text-lg font-medium hover:text-pink-200 transition-colors duration-300 w-full text-center py-2 rounded-lg hover:bg-pink-700 dark:hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  {t('admin_dashboard')}
                </Link>
              )}
              <Link
                to="/profile"
                className="text-white text-lg font-medium hover:text-pink-200 transition-colors duration-300 w-full text-center py-2 rounded-lg hover:bg-pink-700 dark:hover:bg-gray-700 flex justify-center items-center"
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="mr-2" /> {t('profile')}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-white text-lg font-medium hover:text-pink-200 transition-colors duration-300 w-full text-center py-2 rounded-lg hover:bg-pink-700 dark:hover:bg-gray-700 flex justify-center items-center"
              >
                <FaSignOutAlt className="mr-2" /> {t('log_out')}
              </button>
            </>
          ) : null}
          <button
            onClick={() => {
              toggleLanguage();
              setIsOpen(false);
            }}
            className="text-white text-lg font-medium hover:text-pink-200 transition-colors duration-300 w-full text-center py-2 rounded-lg hover:bg-pink-700 dark:hover:bg-gray-700"
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>
          <div className="py-2 w-full flex justify-center">
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
