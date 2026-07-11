import React, { useState, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Cpu, Users, ArrowUpRight, Calendar, ChevronDown, CheckCircle2, Loader2, CreditCard, History } from 'lucide-react';
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

interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  merchantId: string;
  status: 'Success' | 'Failed';
}

export const Summary: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  
  // Google Pay Payout State
  const [isPayingOut, setIsPayingOut] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState<string | null>(null);
  const [payoutStatus, setPayoutStatus] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);
  
  // Use actual current timestamp (datetime.now() equivalent)
  const [initialTimestamp] = useState(Date.now());
  
  // Mock Payout History updated with relative actual datetimes
  const [payoutHistory, setPayoutHistory] = useState<PayoutRecord[]>([
    { 
      id: 'mock-2', 
      date: new Date(initialTimestamp - 86400000 * 7).toLocaleString('en-US', { timeZone: 'America/Toronto' }), 
      amount: 5120.50, 
      merchantId: 'BCR2DN6D7KB2RK3J', 
      status: 'Success' 
    },
    { 
      id: 'mock-1', 
      date: new Date(initialTimestamp - 86400000 * 30).toLocaleString('en-US', { timeZone: 'America/Toronto' }), 
      amount: 4250.00, 
      merchantId: 'BCR2DN6D7KB2RK3J', 
      status: 'Success' 
    },
  ]);
  
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

  const handleGooglePayPayout = async () => {
    setIsPayingOut(true);
    setPayoutMessage(null);
    setPayoutStatus('Initializing Google Pay client...');
    
    // Simulate the INITIALIZE callback
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPayoutStatus('onPaymentDataChanged(IntermediatePaymentData): INITIALIZE');

    // Simulate user changing accounts (triggering INITIALIZE again)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPayoutStatus('Account changed. onPaymentDataChanged: Re-INITIALIZE');

    // Simulate resolving PaymentDataRequestUpdate
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPayoutStatus('Resolving Promise<PaymentDataRequestUpdate>...');

    // Simulate final processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPayoutStatus('Conclusion: Payment was completed successfully.');
    
    setIsPayingOut(false);
    setPayoutMessage(`Successfully initiated developer payout of $${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to MSI Mobsen Mobile Social Internet Inc (Merchant ID: BCR2DN6D7KB2RK3J) via Google Pay.`);
    
    // Add to history with actual datetime.now()
    const newRecord: PayoutRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' }),
      amount: totalRevenue,
      merchantId: 'BCR2DN6D7KB2RK3J',
      status: 'Success'
    };
    setPayoutHistory(prev => [newRecord, ...prev]);

    // Hide message after 8 seconds
    setTimeout(() => {
      setPayoutMessage(null);
      setPayoutStatus('');
    }, 8000);
  };

  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold text-white">Traffic & Revenue Summary</h1>
          </div>
          <p className="text-gray-400">Overview of your platform's performance as of {formattedDate} (Toronto Time).</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex flex-col gap-1.5 relative">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleGooglePayPayout}
                disabled={isPayingOut}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-dark-100 disabled:text-gray-500 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-900/20"
              >
                {isPayingOut ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
                {isPayingOut ? 'Processing...' : 'GPay Payout'}
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`flex items-center justify-center px-3 rounded-lg border transition-colors ${showHistory ? 'bg-dark-100 border-brand-500 text-brand-400' : 'bg-dark-200 border-dark-100 hover:bg-dark-100 text-gray-400'}`}
                title="View Payout History"
              >
                <History size={18} />
              </button>
            </div>
            <div className="text-[10px] text-gray-500 leading-tight text-center sm:text-left">
              <a href="https://pay.google.com/business/console/info/BCR2DN6D7KB2RK3J" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                MSI Mobsen Mobile Social Internet Inc<br/>
                Merchant ID: BCR2DN6D7KB2RK3J
              </a>
            </div>
            {/* GPay Payout status summary line */}
            {payoutStatus && (
              <div className="text-xs font-mono text-blue-400 mt-1 max-w-xs animate-fade-in">
                Status: {payoutStatus}
              </div>
            )}

            {/* Payout History Dropdown */}
            {showHistory && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-dark-200 border border-dark-100 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                <div className="p-3 border-b border-dark-100 bg-dark-300 flex justify-between items-center">
                  <h4 className="text-white font-bold text-sm flex items-center gap-2">
                    <History size={14} className="text-brand-400" /> Payout History
                  </h4>
                  <span className="text-xs text-gray-400">{payoutHistory.length} records</span>
                </div>
                <div className="max-h-64 overflow-y-auto p-2 space-y-2">
                  {payoutHistory.map(record => (
                    <div key={record.id} className="bg-dark-300 p-3 rounded-lg border border-dark-100 text-xs flex flex-col gap-1.5 hover:border-dark-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-medium">{record.date}</span>
                        <span className={`font-bold flex items-center gap-1 ${record.status === 'Success' ? 'text-emerald-400' : 'text-red-400'}`}>
                          {record.status === 'Success' ? <CheckCircle2 size={12} /> : null}
                          {record.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-end mt-1">
                        <div className="flex flex-col">
                          <span className="text-gray-500 text-[9px] uppercase tracking-wider">Merchant ID</span>
                          <span className="text-gray-300 font-mono text-[10px]">{record.merchantId}</span>
                        </div>
                        <span className="text-white font-bold text-sm">${record.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
              className="w-full appearance-none bg-dark-200 border border-dark-100 px-4 py-2.5 pr-10 rounded-lg text-sm text-white font-medium focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">This Year (YTD)</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-[18px] text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Payout Success Message */}
      {payoutMessage && (
        <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-start gap-3 animate-fade-in">
          <CheckCircle2 className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-blue-400 font-bold text-sm">Payout Initiated</h4>
            <p className="text-blue-200/80 text-sm mt-1">{payoutMessage}</p>
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
