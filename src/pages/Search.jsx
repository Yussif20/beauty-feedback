import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost/backend/index.php/posts?search=${query}`
      );
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('search')}</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search_placeholder')}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          type="submit"
          className="mt-2 bg-pink-600 text-white p-2 rounded hover:bg-pink-700"
        >
          {t('search')}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <p>{post.content}</p>
            {post.image && (
              <img
                src={`/backend/uploads/${post.image}`}
                alt="Post"
                className="mt-2 rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
