import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../api';

function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const posts = await API_ENDPOINTS.POSTS();
      const filtered = posts.filter(
        (post) =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.first_name.toLowerCase().includes(query.toLowerCase()) ||
          post.last_name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } catch (err) {
      console.error('Error searching posts:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">
        {t('search')}
      </h2>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search_posts')}
          className="w-full p-2 border rounded bg-pink-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="mt-2 bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition-all duration-300"
        >
          {t('search')}
        </button>
      </form>
      <div className="space-y-4">
        {results.map((post) => (
          <div key={post.id} className="card">
            <p className="text-gray-900 dark:text-white">{post.content}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('by')} {post.first_name} {post.last_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
