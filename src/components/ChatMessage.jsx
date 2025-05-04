function ChatMessage({ message, isSender }) {
  return (
    <div
      className={`p-2 rounded ${
        isSender
          ? 'bg-pink-100 dark:bg-pink-900 ml-auto'
          : 'bg-gray-100 dark:bg-gray-700 mr-auto'
      } max-w-xs`}
    >
      <p>{message.content}</p>
      <p className="text-xs text-gray-500">
        {new Date(message.created_at).toLocaleString()}
      </p>
    </div>
  );
}

export default ChatMessage;
