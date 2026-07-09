import React from 'react';
import { Play, MoreHorizontal, Clock, ShoppingCart } from 'lucide-react';
import { trendingTracks } from '../data/mockData.ts';
import { AdUnit } from '../components/AdUnit.tsx';

export const Home: React.FC = () => {
  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 group cursor-pointer">
        <img 
          src="https://picsum.photos/seed/hero/1200/400" 
          alt="Featured Playlist" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <span className="text-xs font-bold tracking-widest text-brand-400 uppercase mb-2 block">Featured Playlist</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Neon Nights</h2>
          <p className="text-gray-300 max-w-xl mb-6 hidden md:block">Dive into the best synthwave and cyberpunk tracks of the month. Curated for your late-night drives.</p>
          <button className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-colors shadow-lg shadow-brand-900/50">
            <Play size={20} className="fill-white" />
            Listen Now
          </button>
        </div>
      </div>

      {/* Web3 Network Access Promotional Banner */}
      <div className="mb-10 bg-gradient-to-r from-brand-950 via-brand-900 to-dark-200 rounded-2xl p-8 border border-brand-500/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-brand-900/20">
        <div>
          <span className="bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Premium Web3 Access</span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">MSIMobsen Music Network</h3>
          <p className="text-brand-100 max-w-xl text-sm md:text-base">Unlock exclusive Web3 features, decentralized streaming, and direct artist support. Join the future of music today.</p>
        </div>
        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
          <span className="text-3xl font-bold text-white">C$18.00</span>
          <a 
            href="https://msimobsenmusic.com/shop/ols/products/msimobsenmusicnetworkaccessweb3" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full md:w-auto bg-white text-brand-900 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/10"
          >
            <ShoppingCart size={20} />
            Get Access Now
          </a>
        </div>
      </div>

      {/* Top Banner Ad */}
      <div className="mb-10">
        <AdUnit format="fluid" className="w-full h-[100px]" />
      </div>

      {/* Trending Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Trending Now</h3>
          <button className="text-sm font-semibold text-gray-400 hover:text-white uppercase tracking-wider">See All</button>
        </div>

        <div className="bg-dark-200/50 rounded-xl border border-dark-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-dark-100">
                <th className="pb-3 pt-4 px-6 font-medium w-12">#</th>
                <th className="pb-3 pt-4 px-6 font-medium">Title</th>
                <th className="pb-3 pt-4 px-6 font-medium hidden md:table-cell">Album</th>
                <th className="pb-3 pt-4 px-6 font-medium hidden lg:table-cell text-right">Plays</th>
                <th className="pb-3 pt-4 px-6 font-medium text-right"><Clock size={16} className="inline" /></th>
              </tr>
            </thead>
            <tbody>
              {trendingTracks.map((track, index) => (
                <React.Fragment key={track.id}>
                  <tr className="group hover:bg-dark-100 transition-colors cursor-pointer">
                    <td className="py-3 px-6 text-gray-500 font-medium">{index + 1}</td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 rounded overflow-hidden">
                          <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play size={16} className="text-white fill-white" />
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-100 font-medium group-hover:text-brand-400 transition-colors">{track.title}</p>
                          <p className="text-sm text-gray-400">{track.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-gray-400 text-sm hidden md:table-cell">{track.album}</td>
                    <td className="py-3 px-6 text-gray-400 text-sm hidden lg:table-cell text-right">{track.plays.toLocaleString()}</td>
                    <td className="py-3 px-6 text-gray-400 text-sm text-right">
                      <div className="flex items-center justify-end gap-4">
                        <span>{track.duration}</span>
                        <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Inject an In-Feed Ad after the 3rd track */}
                  {index === 2 && (
                    <tr>
                      <td colSpan={5} className="p-4 bg-dark-300/30 border-y border-dark-100">
                        <div className="flex items-center justify-center">
                           <AdUnit format="fluid" className="w-full max-w-3xl h-[120px]" />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <div className="mt-10 border-t border-dark-100 pt-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">Sponsored</h3>
        <AdUnit format="auto" className="w-full h-[250px]" />
      </div>
    </div>
  );
};
