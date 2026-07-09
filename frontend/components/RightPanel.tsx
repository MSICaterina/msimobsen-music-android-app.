import React from 'react';
import { AdUnit } from './AdUnit.tsx';
import { trendingTracks } from '../data/mockData.ts';

export const RightPanel: React.FC = () => {
  return (
    <aside className="w-80 bg-dark-200 h-full border-l border-dark-100 hidden lg:flex flex-col overflow-y-auto">
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Top Charts</h3>
        <div className="space-y-4 mb-8">
          {trendingTracks.slice(0, 3).map((track, index) => (
            <div key={track.id} className="flex items-center gap-3 group cursor-pointer">
              <span className="text-gray-500 font-bold w-4 text-right">{index + 1}</span>
              <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded shadow-md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-100 truncate group-hover:text-brand-500 transition-colors">{track.title}</p>
                <p className="text-xs text-gray-400 truncate">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>

        {/* High-visibility Sticky Ad Unit */}
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Advertisement</span>
          </div>
          <AdUnit format="rectangle" className="w-full h-[600px]" />
        </div>
      </div>
    </aside>
  );
};
