import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../api';

function Chat({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchMessages();
  }, [user, navigate]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const data = await API_ENDPOINTS.MESSAGES();
      setMessages(data);
    } catch (err) {
      setError(t('fetch_messages_failed'));
      console.error('Error fetching messages:', err);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      setError(t('empty_message'));
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      await API_ENDPOINTS.SEND_MESSAGE({
        sender_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        content: newMessage,
      });
      setNewMessage('');
      await fetchMessages();
      scrollToBottom(); // <- Force scroll after sending
    } catch (err) {
      setError(t('send_message_failed'));
      console.error('Error sending message:', err);
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-pink-600 dark:text-pink-400">
        {t('chat')}
      </h2>
      <div className="card h-[60vh] flex flex-col">
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        <div
          className="flex-1 overflow-y-auto space-y-4 p-4"
          ref={chatContainerRef}
          onScroll={() => {
            const el = chatContainerRef.current;
            if (!el) return;
            const nearBottom =
              el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
            setIsAtBottom(nearBottom);
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg ${
                message.sender_id === user.id
                  ? 'bg-pink-50 dark:bg-pink-900 ml-auto'
                  : 'bg-gray-100 dark:bg-gray-700 mr-auto'
              } max-w-[70%] shadow-sm`}
            >
              <p className="text-gray-900 dark:text-white text-sm">
                {message.content}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('by')} {message.first_name} {message.last_name} •{' '}
                {new Date(message.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-gray-200 dark:border-gray-600"
        >
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t('type_message')}
              className="flex-1 p-3 border rounded-lg bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-pink-500 focus:border-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-all duration-300 font-medium"
            >
              {t('send')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
