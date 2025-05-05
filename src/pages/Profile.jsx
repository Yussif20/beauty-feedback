import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';
import Post from '../components/Post';

function Profile({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bio, setBio] = useState(user?.bio || '');
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchUserPosts();
  }, [user, navigate]);

  const fetchUserPosts = async () => {
    try {
      const allPosts = await API_ENDPOINTS.POSTS();
      const userPosts = allPosts.filter((post) => post.user_id === user.id);
      setPosts(userPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleBioUpdate = async (e) => {
    e.preventDefault();
    try {
      // Mock bio update
      localStorage.setItem('user', JSON.stringify({ ...user, bio }));
      setSuccess(t('bio_updated'));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Bio update failed:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-600 dark:text-pink-400">
        {t('profile')}
      </h2>
      <div className="card">
        {success && (
          <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 rounded-lg text-sm mb-4">
            {success}
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.is_admin ? t('admin') : t('user')}
          </p>
        </div>
        <form onSubmit={handleBioUpdate} className="mt-6">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {t('bio')}
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={t('bio_placeholder')}
            className="mt-1 w-full p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500 resize-none"
            rows="4"
          />
          <button
            type="submit"
            className="mt-2 bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition-all duration-300 font-medium w-full sm:w-auto"
          >
            {t('save_bio')}
          </button>
        </form>
      </div>
      <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        {t('your_posts')}
      </h3>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} user={user} />)
        ) : (
          <p className="text-gray-500 dark:text-gray-400">{t('no_posts')}</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
