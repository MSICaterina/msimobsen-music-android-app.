import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Radio, Library, PlusSquare, Heart, Music2, Activity, DollarSign, ShoppingCart, BarChart3, KeyRound } from 'lucide-react';
import { AdUnit } from './AdUnit.tsx';
import { useSimulatedTime } from '../utils/useSimulatedTime.ts';

export const Sidebar: React.FC = () => {
  const { formattedTime, formattedDate, timeZone, location, londonTime, londonDate } = useSimulatedTime();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Radio, label: 'News & Blog', path: '/news' },
    { icon: Activity, label: 'Live Traffic', path: '/analytics' },
    { icon: BarChart3, label: 'Daily Summary', path: '/summary' },
    { icon: DollarSign, label: 'Monetization & Agent', path: '/agent' },
    { 
      icon: KeyRound, 
      label: 'OAuth Client', 
      path: 'https://msimobsen-30560796-7c5e1.web.app',
      external: true,
      badge: 'AUTH'
    },
    { 
      icon: ShoppingCart, 
      label: 'Web3 Access', 
      path: 'https://msimobsenmusic.com/shop/ols/products/msimobsenmusicnetworkaccessweb3',
      external: true,
      badge: 'C$18'
    },
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
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-3 py-2 rounded-md text-brand-300 hover:text-white hover:bg-brand-900/30 transition-colors border border-transparent hover:border-brand-500/30"
                  >
                    <item.icon size={20} />
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-bold bg-brand-600 text-white px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ) : (
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
                )}
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

      {/* Simulated Clock Widget */}
      <div className="px-4 mt-4">
        <div className="bg-dark-200 rounded-lg p-3 border border-dark-100 text-center shadow-inner">
          <p className="text-brand-400 font-mono text-lg font-bold tracking-wider">{formattedTime}</p>
          <p className="text-gray-400 text-xs mt-1">{formattedDate}</p>
          <p className="text-brand-500/80 text-[9px] mt-2 uppercase tracking-widest font-semibold">msimobsenutility genesis time clock start</p>
          <p className="text-gray-500 text-[10px] mt-0.5 uppercase tracking-widest">{timeZone} • {location}</p>
          
          <div className="mt-3 pt-3 border-t border-dark-100">
            <p className="text-brand-400 font-mono text-sm font-bold tracking-wider">{londonTime}</p>
            <p className="text-gray-400 text-[10px] mt-0.5">{londonDate}</p>
            <p className="text-gray-500 text-[9px] mt-0.5 uppercase tracking-widest">BST • London, UK</p>
          </div>

          <p className="text-gray-400 text-[9px] mt-3 leading-tight">The World Clock and the actual time of London United Kingdom on the page</p>
          <a 
            href="https://www.timeanddate.com/worldclock/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand-500 hover:text-brand-400 text-[10px] mt-1 inline-block underline transition-colors"
          >
            Actual time
          </a>
        </div>
      </div>

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
