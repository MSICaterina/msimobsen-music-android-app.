import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.tsx';
import { RightPanel } from './components/RightPanel.tsx';
import { Player } from './components/Player.tsx';
import { Home } from './pages/Home.tsx';
import { Discover } from './pages/Discover.tsx';
import { News } from './pages/News.tsx';
import { Analytics } from './pages/Analytics.tsx';

// Component to track page views on route change for Google Analytics
const PageViewTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore - gtag is attached to window in index.html
    if (typeof window !== 'undefined' && window.gtag) {
      // @ts-ignore
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
      });
    }
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <PageViewTracker />
      <div className="flex flex-col h-screen bg-dark-300 text-gray-100 font-sans">
        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          
          <main className="flex-1 overflow-y-auto relative scroll-smooth">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/news" element={<News />} />
              <Route path="/analytics" element={<Analytics />} />
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <RightPanel />
        </div>

        {/* Persistent Bottom Player */}
        <Player />
      </div>
    </HashRouter>
  );
};

export default App;
