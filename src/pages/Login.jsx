import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ setUser }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError(t('fill_all_fields'));
      return;
    }

    try {
      const data = await API_ENDPOINTS.LOGIN(formData);
      if (data.error) {
        setError(t(data.error));
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/home');
      }
    } catch (err) {
      setError(t('login_failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400">
          {t('login')}
        </h2>
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('email')}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('email')}
              className="mt-1 w-full p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('password')}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('password')}
              className="mt-1 w-full p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 flex items-center top-6 ltr:right-0 ltr:pr-3 rtl:left-0 rtl:pl-3"
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-all duration-300 font-medium"
          >
            {t('login')}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t('no_account')}{' '}
          <Link
            to="/register"
            className="text-pink-600 dark:text-pink-400 hover:underline"
          >
            {t('register')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
