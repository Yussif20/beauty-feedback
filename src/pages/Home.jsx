import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Post from './SinglePost';

function Home({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchPosts();
  }, [user, navigate]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost/backend/index.php/posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('user_id', user.id);
    if (image) formData.append('image', image);

    try {
      await fetch('http://localhost/backend/index.php/posts', {
        method: 'POST',
        body: formData,
      });
      setContent('');
      setImage(null);
      fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="card mb-4">
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('new_post')}
            className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            rows="4"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2"
          />
          <button
            type="submit"
            className="mt-2 bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition-all duration-300"
          >
            {t('post')}
          </button>
        </form>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Home;
