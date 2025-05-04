import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{t('welcome')}</h1>
      <p className="text-lg">
        This is the For You Page, styled like a social media feed.
      </p>
      {/* Placeholder for posts */}
    </div>
  );
}

export default Home;
