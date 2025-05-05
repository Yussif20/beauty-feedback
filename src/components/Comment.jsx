import { useTranslation } from 'react-i18next';

function Comment({ comment }) {
  const { t } = useTranslation();

  return (
    <div className="bg-pink-50 dark:bg-gray-700 rounded-lg p-4">
      <p className="text-gray-900 dark:text-white text-sm">{comment.content}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {t('by')} {comment.first_name} {comment.last_name} •{' '}
        {new Date(comment.created_at).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </p>
    </div>
  );
}

export default Comment;
