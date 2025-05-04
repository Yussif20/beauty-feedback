import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Profile() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user data and posts
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
        const response = await fetch(
          `http://localhost/backend/index.php/posts?user_id=${storedUser.id}`
        );
        const data = await response.json();
        setPosts(data);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div className="container mx-auto p-4">{t('login_required')}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('profile')}</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {user.bio || t('no_bio')}
        </p>
      </div>
      <h3 className="text-xl font-bold mb-4">{t('your_posts')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <p className="text-sm text-gray-500">{post.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
