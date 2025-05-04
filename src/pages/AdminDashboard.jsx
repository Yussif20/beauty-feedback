import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function AdminDashboard({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pendingPosts, setPendingPosts] = useState([]);

  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate('/');
      return;
    }
    fetchPendingPosts();
  }, [user, navigate]);

  const fetchPendingPosts = async () => {
    try {
      const response = await fetch(
        'http://localhost/backend/index.php/posts/pending'
      );
      const data = await response.json();
      setPendingPosts(data);
    } catch (err) {
      console.error('Error fetching pending posts:', err);
    }
  };

  const handleAction = async (postId, action) => {
    try {
      await fetch(
        `http://localhost/backend/index.php/posts/${postId}/${action}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user.id }),
        }
      );
      fetchPendingPosts();
    } catch (err) {
      console.error(`Error ${action} post:`, err);
    }
  };

  if (!user || !user.is_admin) return null;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {t('admin')}
      </h2>
      <div className="space-y-4">
        {pendingPosts.map((post) => (
          <div key={post.id} className="card">
            <p className="text-gray-900 dark:text-white">{post.content}</p>
            {post.image && (
              <img
                src={`/backend/uploads/${post.image}`}
                alt="Post"
                className="mt-2 rounded-lg w-full object-cover"
              />
            )}
            <div className="mt-2 flex space-x-4">
              <button
                onClick={() => handleAction(post.id, 'approve')}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-all duration-300"
              >
                {t('approve')}
              </button>
              <button
                onClick={() => handleAction(post.id, 'reject')}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-all duration-300"
              >
                {t('reject')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
