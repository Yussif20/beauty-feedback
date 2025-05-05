import { useTranslation } from 'react-i18next';

function ChatMessage({ message }) {
  const { t } = useTranslation();

  return (
    <div className="p-2 bg-pink-50 dark:bg-gray-700 rounded-lg mb-2">
      <p className="text-gray-900 dark:text-white">{message.content}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('by')} {message.first_name} {message.last_name} -{' '}
        {new Date(message.created_at).toLocaleString()}
      </p>
    </div>
  );
}

export default ChatMessage;
