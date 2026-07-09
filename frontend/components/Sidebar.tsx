import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Radio, Library, PlusSquare, Heart, Music2, Activity } from 'lucide-react';
import { AdUnit } from './AdUnit.tsx';

export const Sidebar: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Radio, label: 'News & Blog', path: '/news' },
    { icon: Activity, label: 'Live Traffic', path: '/analytics' },
  ];

  const libraryItems = [
    { icon: Library, label: 'Your Library', path: '/library' },
    { icon: PlusSquare, label: 'Create Playlist', path: '/create' },
    { icon: Heart, label: 'Liked Songs', path: '/liked' },
  ];

  return (
    <aside className="w-64 bg-dark-300 h-full flex flex-col border-r border-dark-100 hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-brand-600 p-2 rounded-lg">
          <Music2 size={24} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">MSIMobsen</h1>
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
        <div>
          <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Menu</p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-dark-100 text-brand-500 font-medium'
                        : 'text-gray-400 hover:text-gray-100 hover:bg-dark-200'
                    }`
                  }
                >
                  <item.icon size={20} />
                  {item.label}
                  {item.label === 'Live Traffic' && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Library</p>
          <ul className="space-y-1">
            {libraryItems.map((item) => (
              <li key={item.path}>
                <a
                  href={`#${item.path}`}
                  className="flex items-center gap-4 px-3 py-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-dark-200 transition-colors"
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Sidebar Bottom Ad Unit */}
      <div className="p-4 mt-auto">
        <div className="text-xs text-gray-500 text-center mb-2">Sponsored</div>
        <div className="bg-dark-200 rounded-lg h-48 flex items-center justify-center border border-dark-100 overflow-hidden">
           <AdUnit format="rectangle" className="w-full h-full" />
        </div>
      </div>
    </aside>
  );
};
