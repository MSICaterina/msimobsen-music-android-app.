import React from 'react';
import { Search } from 'lucide-react';
import { AdUnit } from '../components/AdUnit.tsx';

const genres = [
  { name: 'Pop', color: 'bg-pink-600' },
  { name: 'Hip-Hop', color: 'bg-orange-600' },
  { name: 'Electronic', color: 'bg-blue-600' },
  { name: 'Rock', color: 'bg-red-600' },
  { name: 'Indie', color: 'bg-teal-600' },
  { name: 'R&B', color: 'bg-purple-600' },
  { name: 'Jazz', color: 'bg-yellow-600' },
  { name: 'Classical', color: 'bg-emerald-700' },
];

export const Discover: React.FC = () => {
  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      <div className="sticky top-0 z-10 bg-dark-300/90 backdrop-blur-md pt-4 pb-6 -mt-4 mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="What do you want to listen to?" 
            className="w-full bg-dark-100 border border-dark-100 text-white rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Browse All</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {genres.map((genre) => (
          <div 
            key={genre.name} 
            className={`${genre.color} rounded-xl p-4 h-40 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform shadow-lg`}
          >
            <h3 className="text-xl font-bold text-white">{genre.name}</h3>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black/20 rounded-full rotate-12"></div>
          </div>
        ))}
      </div>

      {/* Large Bottom Ad Unit */}
      <div className="mt-12 border-t border-dark-100 pt-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">Sponsored Content</h3>
        <AdUnit format="auto" className="w-full h-[250px]" />
      </div>
    </div>
  );
};
