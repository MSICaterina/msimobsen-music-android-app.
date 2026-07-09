import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Copy, CheckCircle2, Package, KeyRound, DollarSign, Wallet, ArrowRight, ShieldCheck, TrendingUp, Settings, Zap, RefreshCw, Coins } from 'lucide-react';
import { AdUnit } from '../components/AdUnit.tsx';
import { useSimulatedTime, getGlobalSimulatedTime } from '../utils/useSimulatedTime.ts';

const MOCK_LOGS = [
  "Optimizing ad slot pub-••••••••••••...",
  "Detected high traffic from organic search. Increasing ad density.",
  "Web3 Network Access purchased. Verifying transaction...",
  "Arbitrage campaign ROI at +14.2%. Scaling up.",
  "Syncing latest revenue data from Google AdSense API...",
  "Adjusting fluid ad formats for mobile viewports.",
  "User engagement spike detected. Delaying ad refresh.",
  "Executing smart contract for Web3 access token minting...",
];

export const Agent: React.FC = () => {
  const { formattedDate } = useSimulatedTime();

  // Agent Token State
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // AdSense Revenue State
  const [balance, setBalance] = useState(84.50);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [payoutMessage, setPayoutMessage] = useState<string | null>(null);
  const threshold = 100.00;
  const progress = Math.min((balance / threshold) * 100, 100);

  // Agent Automation State
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [autoCompound, setAutoCompound] = useState(false);
  const [web3Sync, setWeb3Sync] = useState(true);

  // Agent Logs State
  const [logs, setLogs] = useState<string[]>([
    `[${new Date(getGlobalSimulatedTime()).toLocaleTimeString('en-US', { timeZone: 'America/Toronto' })}] Agent initialized. Monitoring traffic...`
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)];
      setLogs(prev => {
        const updated = [...prev, `[${new Date(getGlobalSimulatedTime()).toLocaleTimeString('en-US', { timeZone: 'America/Toronto' })}] ${newLog}`];
        return updated.slice(-6); // Keep last 6 logs
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const generateToken = () => {
    const prefix = 'msi_wkfl_';
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setToken(prefix + randomString);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const simulateAdRevenue = () => {
    const newRevenue = Math.random() * 3 + 0.5;
    setBalance(prev => prev + newRevenue);
    setPayoutMessage(null);
    setLogs(prev => [...prev.slice(-5), `[${new Date(getGlobalSimulatedTime()).toLocaleTimeString('en-US', { timeZone: 'America/Toronto' })}] Manual revenue simulation triggered: +$${newRevenue.toFixed(2)}`]);
  };

  const handlePayout = (method: 'bank' | 'web3') => {
    if (balance >= threshold) {
      setIsWithdrawing(true);
      setTimeout(() => {
        setBalance(0);
        setIsWithdrawing(false);
        setPayoutMessage(`Success! Funds have been transferred to your connected ${method === 'bank' ? 'bank account' : 'Web3 wallet'}.`);
        setLogs(prev => [...prev.slice(-5), `[${new Date(getGlobalSimulatedTime()).toLocaleTimeString('en-US', { timeZone: 'America/Toronto' })}] Payout executed via ${method.toUpperCase()}. Balance reset.`]);
      }, 2000);
    }
  };

  return (
    <div className="p-6 pb-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold text-white">Monetization & Agent Tools</h1>
            <span className="bg-brand-500/20 text-brand-400 text-xs font-bold px-2 py-1 rounded-md border border-brand-500/30">ADMIN</span>
          </div>
          <p className="text-gray-400">Manage your AdSense payouts, automation settings, and NPM workflow tokens as of {formattedDate}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* AdSense Revenue & Payouts Card */}
          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <DollarSign size={120} />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-600 p-3 rounded-xl">
                  <Wallet size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AdSense Revenue</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Publisher ID: <strong className="text-gray-200">pub-••••••••••••••••</strong></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-dark-300 rounded-xl p-6 border border-dark-100">
                <p className="text-gray-400 text-sm font-medium mb-2">Current Balance</p>
                <p className="text-4xl font-bold text-white mb-2">${balance.toFixed(2)}</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <TrendingUp size={12} /> +$12.40 today
                </p>
              </div>
              
              <div className="bg-dark-300 rounded-xl p-6 border border-dark-100 flex flex-col justify-center">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Payout Progress</span>
                  <span className="text-white font-medium">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-dark-100 rounded-full h-3 mb-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-right">Threshold: ${threshold.toFixed(2)}</p>
              </div>
            </div>

            {payoutMessage && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
                <CheckCircle2 size={16} />
                {payoutMessage}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handlePayout('bank')}
                disabled={balance < threshold || isWithdrawing}
                className={`flex-1 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  balance >= threshold 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
                    : 'bg-dark-100 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isWithdrawing ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    Withdraw to Bank <ArrowRight size={18} />
                  </>
                )}
              </button>

              <button 
                onClick={() => handlePayout('web3')}
                disabled={balance < threshold || isWithdrawing}
                className={`flex-1 font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  balance >= threshold 
                    ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/20' 
                    : 'bg-dark-100 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isWithdrawing ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    Withdraw to Web3 Wallet <Coins size={18} />
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={simulateAdRevenue}
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <RefreshCw size={14} />
                Simulate Traffic Revenue
              </button>
            </div>
          </div>

          {/* Agent Automation Settings */}
          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-600 p-3 rounded-xl">
                <Settings size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Agent Automation</h2>
                <p className="text-sm text-gray-400">Configure how the msimobsenutility agent manages your platform.</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-100">
                <div>
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <Zap size={16} className="text-orange-400" /> Dynamic Ad Placement
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Automatically adjusts AdSense slots based on live user heatmaps to maximize CTR.</p>
                </div>
                <button 
                  onClick={() => setAutoOptimize(!autoOptimize)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${autoOptimize ? 'bg-brand-500' : 'bg-dark-100'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${autoOptimize ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-100">
                <div>
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <TrendingUp size={16} className="text-emerald-400" /> Traffic Arbitrage (Auto-Compound)
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Reinvests 10% of daily AdSense revenue into targeted ad campaigns to drive more traffic.</p>
                </div>
                <button 
                  onClick={() => setAutoCompound(!autoCompound)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${autoCompound ? 'bg-brand-500' : 'bg-dark-100'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${autoCompound ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-100">
                <div>
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <Package size={16} className="text-blue-400" /> Web3 Sales Auto-Sync
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">Automatically verifies C$18.00 purchases and mints network access tokens on-chain.</p>
                </div>
                <button 
                  onClick={() => setWeb3Sync(!web3Sync)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${web3Sync ? 'bg-brand-500' : 'bg-dark-100'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${web3Sync ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Token Generation Card */}
          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Cpu size={120} />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-brand-600 p-3 rounded-xl">
                <KeyRound size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Workflow Token</h2>
                <p className="text-sm text-gray-400">Generate a token to authenticate your local NPM agent.</p>
              </div>
            </div>

            <div className="bg-dark-300 rounded-xl p-6 border border-dark-100 mb-6">
              {token ? (
                <div className="flex items-center justify-between gap-4">
                  <code className="text-brand-400 font-mono text-lg break-all">{token}</code>
                  <button 
                    onClick={copyToClipboard}
                    className="flex-shrink-0 bg-dark-100 hover:bg-dark-50 text-white p-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {copied ? <CheckCircle2 size={20} className="text-emerald-400" /> : <Copy size={20} />}
                    <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 font-mono">
                  No active token. Generate one to get started.
                </div>
              )}
            </div>

            <button 
              onClick={generateToken}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-brand-900/20"
            >
              <Cpu size={20} />
              {token ? 'Regenerate Token' : 'Generate Workflow Token'}
            </button>
          </div>

        </div>

        {/* Sidebar for Logs & Info */}
        <div className="space-y-8">
          
          {/* Live Agent Logs */}
          <div className="bg-dark-200 rounded-2xl border border-dark-100 overflow-hidden flex flex-col h-[400px]">
            <div className="p-4 border-b border-dark-100 bg-dark-300 flex items-center gap-3">
              <Terminal size={18} className="text-brand-400" />
              <h3 className="text-sm font-bold text-white">Live Agent Logs</h3>
              <div className="ml-auto flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
              </div>
            </div>
            <div className="p-4 bg-[#0a0a0a] flex-1 overflow-y-auto font-mono text-xs text-emerald-400/80 space-y-2">
              {logs.map((log, i) => (
                <div key={i} className="animate-fade-in">
                  <span className="text-gray-500 mr-2">&gt;</span>
                  {log}
                </div>
              ))}
              <div className="animate-pulse text-gray-500 mt-2">_</div>
            </div>
          </div>

          <div className="bg-dark-200 p-6 rounded-2xl border border-dark-100">
            <h3 className="text-lg font-bold text-white mb-2">NPM Integration</h3>
            <p className="text-sm text-gray-400 mb-4">
              Install the <code className="text-brand-400 bg-dark-300 px-1 rounded">msimobsenutility</code> CLI to run the agent locally.
            </p>
            <div className="bg-dark-300 rounded-lg p-3 border border-dark-100 font-mono text-xs text-gray-300 mb-3">
              npm install -g msimobsenutility
            </div>
            <div className="bg-dark-300 rounded-lg p-3 border border-dark-100 font-mono text-xs text-gray-300">
              msimobsen start --watch
            </div>
          </div>

          {/* Sticky Sidebar Ad */}
          <div className="sticky top-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 text-center">Sponsored</h3>
            <AdUnit format="rectangle" className="w-full h-[250px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
