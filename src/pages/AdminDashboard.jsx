import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function AdminDashboard() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch pending posts
    const fetchPosts = async () => {
      const response = await fetch(
        'http://localhost/backend/index.php/posts?status=pending'
      );
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleApproval = async (postId, status) => {
    try {
      await fetch(
        `http://localhost/backend/index.php/posts/${postId}/approve`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        }
      );
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('admin')}</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <p>{post.content}</p>
            {post.image && (
              <img
                src={`/backend/uploads/${post.image}`}
                alt="Post"
                className="mt-2 rounded"
              />
            )}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleApproval(post.id, 'approved')}
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                {t('approve')}
              </button>
              <button
                onClick={() => handleApproval(post.id, 'rejected')}
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
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
