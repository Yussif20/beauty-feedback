import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="card max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t('profile')}
        </h2>
        <p className="text-gray-900 dark:text-gray-300">
          <strong>{t('name')}:</strong> {user.first_name} {user.last_name}
        </p>
        <p className="text-gray-900 dark:text-gray-300">
          <strong>{t('email')}:</strong> {user.email}
        </p>
        <p className="text-gray-900 dark:text-gray-300">
          <strong>{t('bio')}:</strong> {user.bio || t('no_bio')}
        </p>
        <p className="text-gray-900 dark:text-gray-300">
          <strong>{t('role')}:</strong> {user.is_admin ? t('admin') : t('user')}
        </p>
      </div>
    </div>
  );
}

export default Profile;
