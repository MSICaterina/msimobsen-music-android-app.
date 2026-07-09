import React from 'react';
import { latestNews } from '../data/mockData.ts';
import { AdUnit } from '../components/AdUnit.tsx';

export const News: React.FC = () => {
  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Music News</h1>
          <p className="text-gray-400">The latest updates from the industry, artists, and culture.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {latestNews.map((article, index) => (
            <React.Fragment key={article.id}>
              <article className="bg-dark-200 rounded-2xl overflow-hidden border border-dark-100 hover:border-dark-50 transition-colors group cursor-pointer flex flex-col sm:flex-row">
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                  <span className="text-sm text-gray-500 mb-2">{article.date}</span>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors line-clamp-2">{article.title}</h2>
                  <p className="text-gray-400 line-clamp-3">{article.excerpt}</p>
                  <div className="mt-4">
                    <span className="text-brand-500 font-semibold text-sm hover:underline">Read Full Article &rarr;</span>
                  </div>
                </div>
              </article>

              {/* Inject Ad after first article */}
              {index === 0 && (
                <div className="py-4">
                  <AdUnit format="fluid" className="w-full h-[150px]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Sidebar for News */}
        <div className="space-y-8">
          <div className="bg-dark-200 p-6 rounded-2xl border border-dark-100">
            <h3 className="text-lg font-bold text-white mb-4">Subscribe to Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Get the latest news and exclusive offers delivered directly to your inbox.</p>
            <div className="space-y-3">
              <input type="email" placeholder="Your email address" className="w-full bg-dark-300 border border-dark-100 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand-500" />
              <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-2 rounded-lg transition-colors">Subscribe</button>
            </div>
          </div>

          {/* Sticky Sidebar Ad */}
          <div className="sticky top-6">
            <AdUnit format="rectangle" className="w-full h-[600px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
