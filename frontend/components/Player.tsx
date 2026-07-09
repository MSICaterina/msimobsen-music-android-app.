import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Maximize2 } from 'lucide-react';

export const Player: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-24 bg-dark-100 border-t border-dark-100 flex items-center justify-between px-4 md:px-6 z-50 relative">
      {/* Track Info */}
      <div className="flex items-center gap-4 w-1/3 min-w-[180px]">
        <img src="https://picsum.photos/seed/track1/100/100" alt="Current Track" className="w-14 h-14 rounded-md shadow-lg" />
        <div className="hidden sm:block">
          <h4 className="text-sm font-semibold text-white hover:underline cursor-pointer">Midnight City Lights</h4>
          <p className="text-xs text-gray-400 hover:underline cursor-pointer">The Synthwave Kids</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center w-1/3 max-w-md">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block"><Shuffle size={18} /></button>
          <button className="text-gray-400 hover:text-white transition-colors"><SkipBack size={20} /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={20} className="fill-black" /> : <Play size={20} className="fill-black ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors"><SkipForward size={20} /></button>
          <button className="text-gray-400 hover:text-white transition-colors hidden sm:block"><Repeat size={18} /></button>
        </div>
        <div className="w-full flex items-center gap-2 text-xs text-gray-400">
          <span>1:24</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer group">
            <div className="h-full bg-brand-500 w-1/3 group-hover:bg-brand-400 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow"></div>
            </div>
          </div>
          <span>3:45</span>
        </div>
      </div>

      {/* Extra Controls */}
      <div className="flex items-center justify-end gap-4 w-1/3 hidden md:flex">
        <Volume2 size={20} className="text-gray-400" />
        <div className="w-24 h-1 bg-gray-700 rounded-full cursor-pointer group">
          <div className="h-full bg-gray-300 w-2/3 group-hover:bg-brand-500"></div>
        </div>
        <Maximize2 size={18} className="text-gray-400 ml-2 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};
