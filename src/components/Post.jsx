import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';
import Comment from './Comment';
import { FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';

function Post({ post, user }) {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await API_ENDPOINTS.COMMENTS({
        post_id: post.id,
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        content: comment,
      });
      setComment('');
      // Note: Mock data updates automatically, but a real backend would require refetching
    } catch (err) {
      console.error('Comment failed:', err);
    }
  };

  const handleLike = async (isLike) => {
    try {
      await API_ENDPOINTS.LIKES({
        post_id: post.id,
        user_id: user.id,
        is_like: isLike,
      });
      if (isLike) {
        setLikes(likes + 1);
      } else {
        setDislikes(dislikes + 1);
      }
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  if (!post?.id) return null;

  return (
    <div className="card">
      <Link to={`/post/${post.id}`} className="block cursor-pointer">
        <p className="text-gray-900 dark:text-white text-lg font-medium">
          {post.content}
        </p>
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="mt-4 rounded-lg w-full max-h-64 object-cover"
          />
        )}
      </Link>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {t('by')} {post.first_name} {post.last_name} •{' '}
        {new Date(post.created_at).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </p>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => handleLike(true)}
          className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 cursor-pointer"
        >
          <FaThumbsUp />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => handleLike(false)}
          className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 cursor-pointer"
        >
          <FaThumbsDown />
          <span>{dislikes}</span>
        </button>
        <Link
          to={`/post/${post.id}`}
          className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 cursor-pointer"
        >
          <FaComment />
          <span>{post.comments?.length || 0}</span>
        </Link>
      </div>
      <form onSubmit={handleComment} className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('add_comment')}
          className="w-full p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
        />
        <button
          type="submit"
          className="mt-2 bg-pink-600 text-white p-2 rounded-lg font-medium w-full sm:w-auto cursor-pointer"
        >
          {t('comment')}
        </button>
      </form>
      <div className="mt-4 space-y-2">
        {post.comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default Post;
