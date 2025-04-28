import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { searchCompanyNews } from '../services/finnhubService.js';
import Spinner from './UI/Spinner.jsx';

export default function News() {
  const { companySymbol } = useParams();
  const [allNewsData, setAllNewsData] = useState([]);
  const [visibleNews, setVisibleNews] = useState([]);
  const [newsIndex, setNewsIndex] = useState(20);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const news = await searchCompanyNews(
          companySymbol,
          '2025-01-15',
          '2025-02-20'
        );
        setAllNewsData(news);
        setVisibleNews(news.slice(0, 20));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [companySymbol]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreNews();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleNews, allNewsData]);

  const loadMoreNews = useCallback(() => {
    if (newsIndex < allNewsData.length) {
      const nextNews = allNewsData.slice(newsIndex, newsIndex + 10);
      setVisibleNews((prevNews) => [...prevNews, ...nextNews]);
      setNewsIndex((prevIndex) => prevIndex + 10);
    }
  }, [newsIndex, allNewsData]);

  return (
    <>
      {visibleNews.length > 0 ? (
        <div className="flex flex-col gap-4 p-48 pt-14">
          {visibleNews.map((newsItem) => (
            <div
              key={newsItem.id}
              className="flex items-center border rounded-lg p-4 shadow-md bg-white"
            >
              <div className="flex-shrink-0 w-40 h-40">
                {newsItem.image ? (
                  <img
                    src={newsItem.image}
                    alt={newsItem.headline}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <img
                    src="https://placehold.co/150"
                    alt="Placeholder"
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>

              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold mb-2">
                  {newsItem.headline}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Source:</strong> {newsItem.source}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Related:</strong> {newsItem.related}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Published:</strong>{' '}
                  {new Date(newsItem.datetime * 1000).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </p>
                <p className="text-sm text-gray-600 mb-4">{newsItem.summary}</p>
                <a
                  href={newsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
