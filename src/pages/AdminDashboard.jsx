import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';

function AdminDashboard({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pendingPosts, setPendingPosts] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/');
      return;
    }
    fetchPendingPosts();
  }, [user, navigate]);

  const fetchPendingPosts = async () => {
    try {
      const data = await API_ENDPOINTS.PENDING_POSTS();
      setPendingPosts(data);
    } catch (err) {
      console.error('Error fetching pending posts:', err);
    }
  };

  const handleApprove = async (postId) => {
    try {
      await API_ENDPOINTS.APPROVE_POST(postId);
      setSuccess(t('post_approved'));
      fetchPendingPosts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t('action_failed'));
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleReject = async (postId) => {
    try {
      await API_ENDPOINTS.REJECT_POST(postId);
      setSuccess(t('post_rejected'));
      fetchPendingPosts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t('action_failed'));
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!user || !user.is_admin) return null;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-600 dark:text-pink-400">
        {t('admin_dashboard')}
      </h2>
      <div className="card">
        {success && (
          <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 rounded-lg text-sm mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {t('pending_posts')}
        </h3>
        {pendingPosts.length > 0 ? (
          <div className="space-y-4">
            {pendingPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 bg-pink-50 dark:bg-gray-700 rounded-lg shadow-sm"
              >
                <p className="text-gray-900 dark:text-white text-sm">
                  {post.content}
                </p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="mt-2 rounded-lg w-full max-h-48 object-cover"
                  />
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {t('by')} {post.first_name} {post.last_name}
                </p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleApprove(post.id)}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium"
                  >
                    {t('approve')}
                  </button>
                  <button
                    onClick={() => handleReject(post.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium"
                  >
                    {t('reject')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            {t('no_pending_posts')}
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
