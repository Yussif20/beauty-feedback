import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from './ThemeSwitcher';
import { FaUserCircle } from 'react-icons/fa';

function Navbar({ user, setUser }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === '/' || location.pathname === '/register';

  const navItems = [
    { path: '/home', label: t('home') },
    { path: '/search', label: t('search') },
    { path: '/chat', label: t('chat') },
  ];

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.setAttribute(
      'dir',
      newLang === 'ar' ? 'rtl' : 'ltr'
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="w-full bg-feminine shadow-sm px-4 lg:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to={user ? '/home' : '/'}
          className="transform hover:scale-105 transition-transform duration-300"
        >
          <span className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300">
            {t('welcome')}
          </span>
        </Link>
        {!isAuthPage && user && (
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-semibold hover:text-pink-400 transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-pink-400 border-b-2 border-pink-400'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-4">
          <button
            className="cursor-pointer text-sm text-gray-900 dark:text-gray-300 hover:text-pink-400 dark:hover:text-pink-400 transition-colors duration-300"
            onClick={handleLanguageChange}
          >
            {i18n.language === 'ar' ? 'English' : 'العربية'}
          </button>
          <ThemeSwitcher />
          {!isAuthPage && user && (
            <div className="relative">
              <button
                className="text-2xl text-gray-900 dark:text-gray-300 focus:outline-none"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                aria-label="Account menu"
              >
                <FaUserCircle />
              </button>
              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-600 dark:hover:text-pink-400"
                    onClick={() => setIsAccountMenuOpen(false)}
                  >
                    {t('profile')}
                  </Link>
                  {user.is_admin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-600 dark:hover:text-pink-400"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      {t('admin')}
                    </Link>
                  )}
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900 hover:text-pink-600 dark:hover:text-pink-400"
                    onClick={handleLogout}
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          )}
          {!isAuthPage && user && (
            <button
              className="md:hidden text-2xl text-gray-900 dark:text-gray-300 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g className="transition-all duration-300 ease-in-out">
                  <path
                    className={`stroke-2 origin-center ${
                      isMenuOpen
                        ? 'rotate-45 translate-y-[6px]'
                        : 'rotate-0 translate-y-0'
                    }`}
                    d="M4 6h16"
                    style={{
                      transition:
                        'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                    }}
                  />
                  <path
                    className={`stroke-2 ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                    d="M4 12h16"
                    style={{ transition: 'opacity 0.3s ease-in-out' }}
                  />
                  <path
                    className={`stroke-2 origin-center ${
                      isMenuOpen
                        ? '-rotate-45 translate-y-[-6px]'
                        : 'rotate-0 translate-y-0'
                    }`}
                    d="M4 18h16"
                    style={{
                      transition:
                        'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                    }}
                  />
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>
      {!isAuthPage && user && (
        <div
          className={`md:hidden bg-gray-800 bg-opacity-90 backdrop-blur-md transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-3 text-lg font-medium text-white hover:text-pink-400 hover:bg-pink-400 hover:bg-opacity-20 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
