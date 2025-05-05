import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';
import Post from '../components/Post';
import { FaImage } from 'react-icons/fa';

function Home({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: '', image: null });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchPosts();
  }, [user, navigate]);

  const fetchPosts = async () => {
    try {
      const data = await API_ENDPOINTS.POSTS();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await API_ENDPOINTS.CREATE_POST({
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        content: newPost.content,
        image: newPost.image ? URL.createObjectURL(newPost.image) : null,
        is_admin: user.is_admin, // Pass admin status
      });
      setNewPost({ content: '', image: null });
      setSuccess(t('post_created'));
      fetchPosts();
      setTimeout(() => setSuccess(''), 3000); // Clear success message
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-600 dark:text-pink-400">
        {t('home')}
      </h2>
      {success && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 rounded-lg text-sm mb-4">
          {success}
        </div>
      )}
      <form
        onSubmit={handlePostSubmit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6"
      >
        <textarea
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          placeholder={t('new_post')}
          className="w-full p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500 resize-none"
          rows="4"
        />
        <div className="flex items-center space-x-4 mt-4">
          <label className="flex items-center bg-pink-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-700 transition-all duration-300">
            <FaImage className="mr-2" />
            {t('choose_image')}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewPost({ ...newPost, image: e.target.files[0] })
              }
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {newPost.image ? newPost.image.name : t('no_file_chosen')}
          </span>
        </div>
        <button
          type="submit"
          className="mt-4 bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-all duration-300 font-medium w-full sm:w-auto"
        >
          {t('post')}
        </button>
      </form>
      <div className="space-y-6">
        {posts.map((post) => (
          <Post key={post.id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Home;
