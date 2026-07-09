import React from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Cpu, Users, ArrowUpRight, Calendar } from 'lucide-react';
import { AdUnit } from '../components/AdUnit.tsx';
import { useSimulatedTime } from '../utils/useSimulatedTime.ts';

// Mock data for the last 7 days ending on Thursday (July 9, 2026)
const dailyData = [
  { day: 'Fri', traffic: 12400, revenue: 145.50, agentTasks: 850 },
  { day: 'Sat', traffic: 13500, revenue: 162.20, agentTasks: 920 },
  { day: 'Sun', traffic: 12800, revenue: 150.00, agentTasks: 890 },
  { day: 'Mon', traffic: 15200, revenue: 185.80, agentTasks: 1100 },
  { day: 'Tue', traffic: 17500, revenue: 210.40, agentTasks: 1350 },
  { day: 'Wed', traffic: 22000, revenue: 280.90, agentTasks: 1800 },
  { day: 'Thu', traffic: 24500, revenue: 315.20, agentTasks: 2100 },
];

export const Summary: React.FC = () => {
  const { formattedDate } = useSimulatedTime();

  // Calculate totals and growth
  const today = dailyData[dailyData.length - 1];
  const yesterday = dailyData[dailyData.length - 2];
  
  const calculateGrowth = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const stats = [
    {
      title: 'Daily Traffic',
      value: today.traffic.toLocaleString(),
      growth: calculateGrowth(today.traffic, yesterday.traffic),
      icon: Users,
      color: 'text-brand-400',
      bg: 'bg-brand-500/10',
      border: 'border-brand-500/20'
    },
    {
      title: 'Daily Revenue',
      value: `$${today.revenue.toFixed(2)}`,
      growth: calculateGrowth(today.revenue, yesterday.revenue),
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      title: 'Agent Tasks Executed',
      value: today.agentTasks.toLocaleString(),
      growth: calculateGrowth(today.agentTasks, yesterday.agentTasks),
      icon: Cpu,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20'
    }
  ];

  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold text-white">Daily Summary</h1>
          </div>
          <p className="text-gray-400">Overview of your traffic growth, ad revenues, and agent automation usage as of {formattedDate}.</p>
        </div>
        <div className="flex items-center gap-2 bg-dark-200 border border-dark-100 px-4 py-2 rounded-lg text-sm text-gray-300">
          <Calendar size={16} className="text-brand-400" />
          <span>Last 7 Days</span>
        </div>
      </div>

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
              <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="day" stroke="#4b5563" fontSize={12} tickMargin={10} />
                <YAxis stroke="#4b5563" fontSize={12} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6' }}
                  itemStyle={{ color: '#8b5cf6' }}
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
            Daily AdSense Revenue
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="day" stroke="#4b5563" fontSize={12} tickMargin={10} />
                <YAxis stroke="#4b5563" fontSize={12} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6' }}
                  cursor={{ fill: '#1f2937' }}
                  itemStyle={{ color: '#10b981' }}
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
              Total Tasks (7d): <strong className="text-white">{dailyData.reduce((acc, curr) => acc + curr.agentTasks, 0).toLocaleString()}</strong>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="day" stroke="#4b5563" fontSize={12} tickMargin={10} />
                <YAxis stroke="#4b5563" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937', color: '#f3f4f6' }}
                  itemStyle={{ color: '#f97316' }}
                />
                <Line type="monotone" dataKey="agentTasks" name="Tasks Executed" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
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
