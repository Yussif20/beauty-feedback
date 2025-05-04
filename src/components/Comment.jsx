import { useTranslation } from 'react-i18next';

function Comment({ comment }) {
  const { t } = useTranslation();

  return (
    <div className="p-2 bg-pink-50 dark:bg-gray-700 rounded-lg">
      <p className="text-gray-900 dark:text-white">{comment.content}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('by')} {comment.first_name} {comment.last_name} -{' '}
        {new Date(comment.created_at).toLocaleString()}
      </p>
    </div>
  );
}

export default Comment;
