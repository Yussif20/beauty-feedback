import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';
import Post from '../components/Post';

function SinglePost({ user }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchPost();
  }, [user, id, navigate]);

  const fetchPost = async () => {
    try {
      const data = await API_ENDPOINTS.POST_BY_ID(parseInt(id));
      if (data.error || !data.id) {
        setPost(null); // Silently fail without pop-up
        console.error('Post not found');
      } else {
        setPost(data);
      }
    } catch (err) {
      setPost(null); // Silently fail without pop-up
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      {loading && (
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg">
          {t('loading')}...
        </div>
      )}
      {post && (
        <div className="card">
          <Post post={post} user={user} />
        </div>
      )}
    </div>
  );
}

export default SinglePost;
