import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import Post from '../components/Post';

function SinglePost({ user }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchPost();
  }, [user, id, navigate]);

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `http://localhost/backend/index.php/posts/${id}`
      );
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
        return;
      }
      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  if (!user || !post) return null;

  return (
    <div className="container mx-auto p-4">
      <Post post={post} user={user} />
    </div>
  );
}

export default SinglePost;
