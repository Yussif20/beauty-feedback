import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Comment from './Comment';

function Post({ post, user }) {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost/backend/index.php/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: post.id,
          user_id: user.id,
          content: comment,
        }),
      });
      setComment('');
      // يفضل تحديث البوستات هنا لو كنتي بتستخدمي state عام
    } catch (err) {
      console.error('Comment failed:', err);
    }
  };

  const handleLike = async (isLike) => {
    try {
      await fetch('http://localhost/backend/index.php/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: post.id,
          user_id: user.id,
          is_like: isLike,
        }),
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

  return (
    <div className="card">
      <Link to={`/post/${post.id}`}>
        <p className="text-gray-900 dark:text-white">{post.content}</p>
        {post.image && (
          <img
            src={`/backend/uploads/${post.image}`}
            alt="Post"
            className="mt-2 rounded-lg w-full object-cover"
          />
        )}
      </Link>
      <div className="mt-2 flex space-x-4">
        <button
          onClick={() => handleLike(true)}
          className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors duration-300"
        >
          {t('like')} ({likes})
        </button>
        <button
          onClick={() => handleLike(false)}
          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-300"
        >
          {t('dislike')} ({dislikes})
        </button>
      </div>
      <form onSubmit={handleComment} className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('add_comment')}
          className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="mt-2 bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition-all duration-300"
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
