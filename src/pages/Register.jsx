import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register({ setUser }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    dob: '',
    is_admin: false,
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.first_name || !formData.last_name) {
      setError(t('name_required'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t('invalid_email'));
      return;
    }
    if (formData.password.length < 6) {
      setError(t('password_short'));
      return;
    }
    if (formData.password !== formData.confirm_password) {
      setError(t('password_mismatch'));
      return;
    }
    if (!formData.dob) {
      setError(t('dob_required'));
      return;
    }

    try {
      const data = await API_ENDPOINTS.REGISTER(formData);
      if (data.error) {
        setError(t(data.error));
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/home');
      }
    } catch (err) {
      setError(t('registration_failed'));
    }
  };

  return (
    <div className="min-h-[80vh] py-12 flex items-center justify-center bg-pink-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400">
          {t('register')}
        </h2>
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('first_name')}
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder={t('first_name')}
              className="mt-1 w-full p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('last_name')}
            </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder={t('last_name')}
              className="mt-1 w-full p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
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
          <div className="relative">
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('confirm_password')}
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirm_password"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder={t('confirm_password')}
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
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t('dob')}
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_admin"
              checked={formData.is_admin}
              onChange={handleChange}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('is_admin')}
            </span>
          </label>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-all duration-300 font-medium"
          >
            {t('register')}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t('have_account')}{' '}
          <Link
            to="/"
            className="text-pink-600 dark:text-pink-400 hover:underline"
          >
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
