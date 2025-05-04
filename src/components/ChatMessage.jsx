function ChatMessage({ message, user }) {
  const isOwnMessage = message.sender_id === user.id;

  return (
    <div
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={`max-w-xs p-2 rounded-lg ${
          isOwnMessage
            ? 'bg-pink-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
        }`}
      >
        <p>{message.content}</p>
        <p className="text-xs opacity-75">
          {new Date(message.created_at).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
