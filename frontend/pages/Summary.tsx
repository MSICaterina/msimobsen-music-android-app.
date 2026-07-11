import React, { useState, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Cpu, Users, ArrowUpRight, Calendar, ChevronDown, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { AdUnit } from '../components/AdUnit.tsx';

const growthRates = {
  week: { traffic: 12.5, revenue: 15.2, tasks: 8.4 },
  month: { traffic: 24.8, revenue: 28.5, tasks: 18.2 },
  year: { traffic: 145.2, revenue: 160.4, tasks: 120.5 }
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

export const Summary: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  
  // Use actual current timestamp
  const [initialTimestamp] = useState(Date.now());
  const formattedDate = new Date(initialTimestamp).toLocaleDateString('en-US', { timeZone: 'America/Toronto', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Dynamically generate data ending on the current actual Toronto date
  const { weeklyData, monthlyData, yearlyData } = useMemo(() => {
    const getTorontoLabel = (ts: number, format: 'week' | 'month' | 'year') => {
      const d = new Date(ts);
      if (format === 'week') return d.toLocaleDateString('en-US', { timeZone: 'America/Toronto', weekday: 'short' });
      if (format === 'month') return d.toLocaleDateString('en-US', { timeZone: 'America/Toronto', month: 'numeric', day: 'numeric' });
      if (format === 'year') return d.toLocaleDateString('en-US', { timeZone: 'America/Toronto', month: 'short' });
      return '';
    };

    const dayMs = 24 * 60 * 60 * 1000;

    const week = Array.from({ length: 7 }).map((_, i) => {
      const ts = initialTimestamp - (6 - i) * dayMs;
      return {
        label: i === 6 ? 'Today' : getTorontoLabel(ts, 'week'),
        traffic: 12000 + Math.floor(Math.random() * 5000 + i * 1000),
        revenue: 140 + Math.floor(Math.random() * 50 + i * 10),
        agentTasks: 800 + Math.floor(Math.random() * 200 + i * 100),
      };
    });

    const month = Array.from({ length: 30 }).map((_, i) => {
      const ts = initialTimestamp - (29 - i) * dayMs;
      return {
        label: i === 29 ? 'Today' : getTorontoLabel(ts, 'month'),
        traffic: 10000 + Math.floor(Math.random() * 5000 + i * 500),
        revenue: 120 + Math.floor(Math.random() * 60 + i * 6),
        agentTasks: 800 + Math.floor(Math.random() * 400 + i * 40),
      };
    });

    const currentMonthStr = getTorontoLabel(initialTimestamp, 'year');
    const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIdx = monthsList.indexOf(currentMonthStr) !== -1 ? monthsList.indexOf(currentMonthStr) : new Date(initialTimestamp).getMonth();
    
    const year = Array.from({ length: currentMonthIdx + 1 }).map((_, i) => {
      return {
        label: i === currentMonthIdx ? `${monthsList[i]} (MTD)` : monthsList[i],
        traffic: 300000 + Math.floor(Math.random() * 100000 + i * 20000),
        revenue: 4000 + Math.floor(Math.random() * 1000 + i * 200),
        agentTasks: 25000 + Math.floor(Math.random() * 5000 + i * 1000),
      };
    });

    return { weeklyData: week, monthlyData: month, yearlyData: year };
  }, [initialTimestamp]);

  const currentData = timeframe === 'week' ? weeklyData : timeframe === 'month' ? monthlyData : yearlyData;
  const growth = growthRates[timeframe];

  const totalTraffic = currentData.reduce((acc, curr) => acc + curr.traffic, 0);
  const totalRevenue = currentData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalTasks = currentData.reduce((acc, curr) => acc + curr.agentTasks, 0);

  const stats = [
    {
      title: `Total Traffic (${timeframe === 'week' ? '7d' : timeframe === 'month' ? '30d' : 'YTD'})`,
      value: totalTraffic.toLocaleString(),
      growth: growth.traffic,
      icon: Users,
      color: 'text-brand-400',
      bg: 'bg-brand-500/10',
      border: 'border-brand-500/20'
    },
    {
      title: `Total Revenue (${timeframe === 'week' ? '7d' : timeframe === 'month' ? '30d' : 'YTD'})`,
      value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      growth: growth.revenue,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      title: `Agent Tasks (${timeframe === 'week' ? '7d' : timeframe === 'month' ? '30d' : 'YTD'})`,
      value: totalTasks.toLocaleString(),
      growth: growth.tasks,
      icon: Cpu,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    }
  ];

  const handleSyncAdSense = () => {
    setIsSyncing(true);
    setSyncMessage(null);
    
    // Simulate API call to AdSense
    setTimeout(() => {
      setIsSyncing(false);
      setSyncMessage(`Successfully sent ${timeframe} revenue summary ($${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}) to AdSense pub-9501043041040319 (MSI Mobsen Mobile Social Internet Inc).`);
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setSyncMessage(null);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold text-white">Traffic & Revenue Summary</h1>
          </div>
          <p className="text-gray-400">Overview of your platform's performance as of {formattedDate} (Toronto Time).</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleSyncAdSense}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-dark-100 disabled:text-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg shadow-emerald-900/20"
          >
            {isSyncing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {isSyncing ? 'Syncing to AdSense...' : 'Send to AdSense'}
          </button>

          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
              className="appearance-none bg-dark-200 border border-dark-100 px-4 py-2 pr-10 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">This Year (YTD)</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Sync Success Message */}
      {syncMessage && (
        <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3 animate-fade-in">
          <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-emerald-400 font-bold text-sm">Sync Complete</h4>
            <p className="text-emerald-200/80 text-sm mt-1">{syncMessage}</p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-dark-200 rounded-2xl p-6 border ${stat.border} relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-bold">
                <ArrowUpRight size={14} />
                {stat.growth}%
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <div className="absolute -bottom-4 -right-4 opacity-5">
              <TrendingUp size={100} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Traffic Growth Chart */}
        <div className="bg-dark-200 rounded-2xl p-6 border border-dark-100">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="text-brand-400" size={20} />
            Traffic Growth
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="label" stroke="#4b5563" fontSize={12} tickMargin={10} />
                <YAxis stroke="#4b5563" fontSize={12} tickFormatter={formatNumber} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6' }}
                  itemStyle={{ color: '#8b5cf6' }}
                  formatter={(value: number) => [value.toLocaleString(), 'Traffic']}
                />
                <Area type="monotone" dataKey="traffic" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-dark-200 rounded-2xl p-6 border border-dark-100">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <DollarSign className="text-emerald-400" size={20} />
            AdSense Revenue
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="label" stroke="#4b5563" fontSize={12} tickMargin={10} />
                <YAxis stroke="#4b5563" fontSize={12} tickFormatter={(value) => `$${formatNumber(value)}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6' }}
                  cursor={{ fill: '#1f2937' }}
                  itemStyle={{ color: '#10b981' }}
                  formatter={(value: number) => [`$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent Usage Chart */}
        <div className="bg-dark-200 rounded-2xl p-6 border border-dark-100 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cpu className="text-orange-400" size={20} />
              Agent Automation Usage
            </h2>
            <div className="text-sm text-gray-400 bg-dark-300 px-3 py-1.5 rounded-lg border border-dark-100">
              Total Tasks: <strong className="text-white">{totalTasks.toLocaleString()}</strong>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="label" stroke="#4b5563" fontSize={12} tickMargin={10} />
                <YAxis stroke="#4b5563" fontSize={12} tickFormatter={formatNumber} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6' }}
                  itemStyle={{ color: '#f97316' }}
                  formatter={(value: number) => [value.toLocaleString(), 'Tasks Executed']}
                />
                <Line type="monotone" dataKey="agentTasks" name="Tasks Executed" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', strokeWidth: 2, r: timeframe === 'month' ? 0 : 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Banner Ad */}
      <div className="mt-8 border-t border-dark-100 pt-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">Sponsored</h3>
        <AdUnit format="auto" className="w-full h-[150px]" />
      </div>
    </div>
  );
};
