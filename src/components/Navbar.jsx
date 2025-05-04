import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from './ThemeSwitcher';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/search', label: t('search') },
    { path: '/profile', label: t('profile') },
    { path: '/login', label: t('login') },
    { path: '/signup', label: t('signup') },
    { path: '/admin', label: t('admin') },
  ];

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.setAttribute(
      'dir',
      newLang === 'ar' ? 'rtl' : 'ltr'
    );
  };

  return (
    <nav className="w-full bg-feminine shadow-sm px-4 lg:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="transform hover:scale-105 transition-transform duration-300"
        >
          <span className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300">
            {t('logo')}
          </span>
        </Link>
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
        <div className="flex items-center space-x-4">
          <button
            className="cursor-pointer text-sm text-gray-900 dark:text-gray-300 hover:text-pink-400 dark:hover:text-pink-400 transition-colors duration-300"
            onClick={handleLanguageChange}
          >
            {i18n.language === 'ar' ? 'English' : 'العربية'}
          </button>
          <ThemeSwitcher />
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
        </div>
      </div>
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
    </nav>
  );
}

export default Navbar;
