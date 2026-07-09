import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.tsx';
import { RightPanel } from './components/RightPanel.tsx';
import { Player } from './components/Player.tsx';
import { Home } from './pages/Home.tsx';
import { Discover } from './pages/Discover.tsx';
import { News } from './pages/News.tsx';
import { Analytics } from './pages/Analytics.tsx';

const App: React.FC = () => {
  return (
    <HashRouter>
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
