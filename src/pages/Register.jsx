import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

function Register({ setUser }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    repeat_password: '',
    dob: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = t('first_name_required');
    if (!formData.last_name) newErrors.last_name = t('last_name_required');
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t('invalid_email');
    if (!formData.password || formData.password.length < 6)
      newErrors.password = t('password_min');
    if (formData.password !== formData.repeat_password)
      newErrors.repeat_password = t('password_mismatch');
    if (!formData.dob) newErrors.dob = t('dob_required');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch(
        'http://localhost/backend/index.php/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            dob: formData.dob,
            is_admin: formData.role === 'admin',
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        setErrors({ server: data.error });
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/home');
      }
    } catch (err) {
      setErrors({ server: t('server_error') });
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          {t('signup')}
        </h2>
        {errors.server && <p className="text-red-500 mb-4">{errors.server}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-white">
              {t('first_name')}
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              required
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-white">
              {t('last_name')}
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              required
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-white">
              {t('email')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-white">
              {t('password')}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-white">
              {t('repeat_password')}
            </label>
            <input
              type="password"
              value={formData.repeat_password}
              onChange={(e) =>
                setFormData({ ...formData, repeat_password: e.target.value })
              }
              className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              required
            />
            {errors.repeat_password && (
              <p className="text-red-500 text-sm">{errors.repeat_password}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-white">
              {t('dob')}
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              required
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-900 dark:text-white">
              {t('role')}
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            >
              <option value="user">{t('user')}</option>
              <option value="admin">{t('admin')}</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition-all duration-300"
          >
            {t('signup')}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-900 dark:text-gray-300">
          {t('already_have_account')}{' '}
          <Link to="/" className="text-pink-600 hover:text-pink-700">
            {t('login')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
