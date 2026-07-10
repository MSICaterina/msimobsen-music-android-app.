import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Eye, MousePointerClick, DollarSign, Activity, TrendingUp, ShoppingCart, ArrowRight } from 'lucide-react';
import { AdUnit } from '../components/AdUnit.tsx';

// Generate initial mock data for the chart using actual time
const generateInitialData = () => {
  const data = [];
  const now = Date.now();
  let currentUsers = 1200;
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now - i * 3000);
    currentUsers = Math.max(500, currentUsers + (Math.floor(Math.random() * 100) - 40));
    data.push({
      time: time.toLocaleTimeString('en-US', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      users: currentUsers,
    });
  }
  return data;
};

export const Analytics: React.FC = () => {
  const formattedDate = new Date().toLocaleDateString('en-US', { timeZone: 'America/Toronto', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const [trafficData, setTrafficData] = useState(generateInitialData());
  const [activeUsers, setActiveUsers] = useState(trafficData[trafficData.length - 1].users);
  const [pageViews, setPageViews] = useState(145892);
  const [adImpressions, setAdImpressions] = useState(312050);
  const [revenue, setRevenue] = useState(425.50);
  const [web3Sales, setWeb3Sales] = useState(142); // Mock initial sales

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        // Random walk for active users
        const change = Math.floor(Math.random() * 60) - 25; // Bias slightly positive
        const nextUsers = Math.max(800, prev + change);
        
        setTrafficData((currentData) => {
          const now = new Date();
          const newDataPoint = {
            time: now.toLocaleTimeString('en-US', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            users: nextUsers,
          };
          // Keep the last 20 data points
          return [...currentData.slice(1), newDataPoint];
        });

        // Increment cumulative stats slightly
        setPageViews(pv => pv + Math.floor(Math.random() * 5));
        setAdImpressions(ai => ai + Math.floor(Math.random() * 12));
        setRevenue(rev => rev + (Math.random() * 0.05));
        
        // Simulate occasional Web3 sale conversion
        if (Math.random() > 0.92) {
          setWeb3Sales(sales => sales + 1);
        }

        return nextUsers;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      title: 'Active Users Right Now', 
      value: activeUsers.toLocaleString(), 
      icon: Users, 
      color: 'text-blue-400', 
      bg: 'bg-blue-400/10',
      live: true
    },
    { 
      title: 'Pageviews (Today)', 
      value: pageViews.toLocaleString(), 
      icon: Eye, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-400/10' 
    },
    { 
      title: 'Ad Impressions', 
      value: adImpressions.toLocaleString(), 
      icon: MousePointerClick, 
      color: 'text-brand-400', 
      bg: 'bg-brand-400/10' 
    },
    { 
      title: 'Est. Ad Revenue', 
      value: `$${revenue.toFixed(2)}`, 
      icon: DollarSign, 
      color: 'text-yellow-400', 
      bg: 'bg-yellow-400/10' 
    },
  ];

  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold text-white">Live Traffic & Conversions</h1>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
          <p className="text-gray-400">Monitor real-time user engagement, ad performance, and Web3 sales as of {formattedDate}.</p>
        </div>
        <button className="bg-dark-200 hover:bg-dark-100 text-white px-4 py-2 rounded-lg border border-dark-100 flex items-center gap-2 transition-colors">
          <Activity size={18} />
          Detailed Report
        </button>
      </div>

      {/* Web3 Conversion Funnel */}
      <div className="bg-gradient-to-br from-brand-900/40 to-dark-200 rounded-2xl p-6 border border-brand-500/30 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <ShoppingCart className="text-brand-400" />
              Web3 Network Access Conversions
            </h2>
            <p className="text-gray-400 max-w-2xl">
              Track real-time conversion of active users purchasing the MSIMobsen Music Network Access Web3 pass for C$18.00.
            </p>
          </div>
          <a 
            href="https://msimobsenmusic.com/shop/ols/products/msimobsenmusicnetworkaccessweb3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center gap-2 shadow-lg shadow-brand-900/50"
          >
            View Product Page <ArrowRight size={18} />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-300/50 rounded-xl p-4 border border-dark-100 text-center">
            <p className="text-gray-400 text-sm mb-1">Active Users (Potential)</p>
            <p className="text-3xl font-bold text-white">{activeUsers.toLocaleString()}</p>
          </div>
          <div className="bg-dark-300/50 rounded-xl p-4 border border-dark-100 text-center relative">
            <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 text-gray-500"><ArrowRight /></div>
            <p className="text-gray-400 text-sm mb-1">Live Conversion Rate</p>
            <p className="text-3xl font-bold text-brand-400">{(web3Sales / (activeUsers + web3Sales) * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-brand-500/10 rounded-xl p-4 border border-brand-500/30 text-center relative">
            <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 text-gray-500"><ArrowRight /></div>
            <p className="text-brand-200 text-sm mb-1">Web3 Sales (C$18.00)</p>
            <p className="text-3xl font-bold text-white">{web3Sales}</p>
            <p className="text-xs text-emerald-400 mt-1 font-medium">Est. Revenue: C${(web3Sales * 18).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-dark-200 rounded-2xl p-6 border border-dark-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              {stat.live && (
                <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full animate-pulse">
                  LIVE
                </span>
              )}
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            
            {/* Decorative background trend line */}
            <div className="absolute -bottom-4 -right-4 opacity-10">
              <TrendingUp size={100} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Live Chart Section */}
      <div className="bg-dark-200 rounded-2xl p-6 border border-dark-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Active Users Over Time</h2>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-3 h-3 rounded-full bg-brand-500"></span>
            Users online
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#4b5563" 
                fontSize={12} 
                tickMargin={10}
                minTickGap={30}
              />
              <YAxis 
                stroke="#4b5563" 
                fontSize={12} 
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6' }}
                itemStyle={{ color: '#8b5cf6' }}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorUsers)" 
                isAnimationActive={false} // Disable animation for smoother live updates
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monetization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-dark-200 rounded-2xl p-6 border border-dark-100">
          <h2 className="text-xl font-bold text-white mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Direct', percentage: 45, color: 'bg-brand-500' },
              { source: 'Organic Search', percentage: 30, color: 'bg-blue-500' },
              { source: 'Social Media', percentage: 15, color: 'bg-pink-500' },
              { source: 'Referral', percentage: 10, color: 'bg-emerald-500' },
            ].map((item) => (
              <div key={item.source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{item.source}</span>
                  <span className="text-white font-medium">{item.percentage}%</span>
                </div>
                <div className="w-full bg-dark-300 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Unit in Analytics Dashboard */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Publisher Ad Space</h3>
          <div className="flex-1 min-h-[250px]">
            <AdUnit format="rectangle" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
