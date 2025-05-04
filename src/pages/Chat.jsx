import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '../components/ChatMessage';

function Chat({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchMessages();
  }, [user, navigate]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        'http://localhost/backend/index.php/messages'
      );
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost/backend/index.php/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id: user.id,
          content: message,
        }),
      });
      setMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t('chat')}
        </h2>
        <div className="space-y-2 mb-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} user={user} />
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('send_message')}
            className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="mt-2 bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition-all duration-300"
          >
            {t('send')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
