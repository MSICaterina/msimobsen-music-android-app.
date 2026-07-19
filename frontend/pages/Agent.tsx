import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Copy, CheckCircle2, Package, KeyRound, DollarSign, Wallet, ArrowRight, ShieldCheck, TrendingUp, Settings, Zap, RefreshCw, Coins, Server, ExternalLink, Link as LinkIcon, Bot, Send } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { AdUnit } from '../components/AdUnit.tsx';
import { useSimulatedTime, getGlobalSimulatedTime } from '../utils/useSimulatedTime.ts';

declare const process: { env: { API_KEY: string } };

declare global {
  interface Window {
    google?: any;
  }
}

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
  const [linkCopied, setLinkCopied] = useState(false);

  // OAuth State
  const [authUser, setAuthUser] = useState<any>(null);

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

  // AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([
    { role: 'model', text: 'Hello! I am your MSIMobsen utility agent. How can I help you optimize your traffic and revenue today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

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

  const handleOAuthLogin = () => {
    if (window.google) {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: '762658008656-53ncm67h1bfr6464s2t42pnnp3o94uj8.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        callback: (tokenResponse: any) => {
          if (tokenResponse && tokenResponse.access_token) {
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
            })
            .then(res => res.json())
            .then(data => {
               setAuthUser(data);
               setLogs(prev => [...prev.slice(-5), `[${new Date(getGlobalSimulatedTime()).toLocaleTimeString('en-US', { timeZone: 'America/Toronto' })}] OAuth Login successful for ${data.email}`]);
            })
            .catch(err => {
              console.error("Error fetching user info:", err);
              setLogs(prev => [...prev.slice(-5), `[${new Date(getGlobalSimulatedTime()).toLocaleTimeString('en-US', { timeZone: 'America/Toronto' })}] OAuth Error: Failed to fetch user profile.`]);
            });
          }
        },
      });
      client.requestAccessToken();
    } else {
      console.error("Google Identity Services script not loaded.");
      setLogs(prev => [...prev.slice(-5), `[${new Date(getGlobalSimulatedTime()).toLocaleTimeString('en-US', { timeZone: 'America/Toronto' })}] Error: Google Identity Services not loaded.`]);
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

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({apiKey: process.env.API_KEY, vertexai: true});
      
      // 1. Generate the context block using current actual time (datetime.now() equivalent)
      const currentActualDate = new Date();
      
      // Format date as YYYY-MM-DD and time as HH:MM in Toronto timezone
      const dateStr = currentActualDate.toLocaleDateString('en-CA', { timeZone: 'America/Toronto' });
      const timeStr = currentActualDate.toLocaleTimeString('en-CA', { timeZone: 'America/Toronto', hour12: false, hour: '2-digit', minute: '2-digit' });
      
      const contextHeader = `[Context - Date: ${dateStr}, Time: ${timeStr}, Location: Toronto, Canada]\n\n`;
      
      // 2. Combine context and query
      const fullPrompt = `${contextHeader}User Request: ${msg}`;
      
      // 3. Send request
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          systemInstruction: 'You are the MSIMobsen utility agent. Use the provided real-time datetime context for any time-sensitive queries.',
        }
      });

      setChatHistory(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'model', text: 'Error: Unable to reach the AI model. Please check your API key configuration.' }]);
    } finally {
      setIsTyping(false);
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

          {/* AI Agent Chat Card */}
          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100 flex flex-col h-[500px]">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-600 p-3 rounded-xl">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Agent Assistant (AI)</h2>
                <p className="text-sm text-gray-400">Ask the agent to analyze traffic, optimize ads, or check Web3 sales.</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-dark-300 rounded-xl p-4 mb-4 border border-dark-100 space-y-4">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 text-sm ${msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-dark-100 text-gray-200 border border-dark-50'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-dark-100 text-gray-400 border border-dark-50 rounded-xl p-3 text-sm animate-pulse">
                    Agent is thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask the agent..."
                className="flex-1 bg-dark-300 border border-dark-100 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={isTyping || !chatInput.trim()}
                className="bg-brand-600 hover:bg-brand-500 disabled:bg-dark-100 disabled:text-gray-500 text-white p-3 rounded-xl transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* NPM Integration & MCP Card */}
          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Server size={120} />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Package size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">NPM Integration & MCP</h2>
                <p className="text-sm text-gray-400">Install and configure the msimobsenutility CLI with Model Context Protocol.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-dark-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Install the package globally
                </h3>
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100 flex items-center gap-3 font-mono text-sm">
                  <Terminal size={16} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-300 break-all">npm install -g <span className="text-brand-400">msimobsenutility</span></span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-dark-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Authenticate your agent
                </h3>
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100 flex items-center gap-3 font-mono text-sm">
                  <Terminal size={16} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-300 break-all">msimobsen auth --token <span className="text-brand-400">{token || '<YOUR_TOKEN>'}</span></span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-dark-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                  Start the agent with MCP enabled
                </h3>
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100 flex items-center gap-3 font-mono text-sm">
                  <Terminal size={16} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-300 break-all">msimobsen start --watch <span className="text-emerald-400">--mcp</span></span>
                </div>
                <p className="text-xs text-gray-500 mt-3 ml-8 leading-relaxed">
                  Enabling <strong className="text-gray-300">MCP (Model Context Protocol)</strong> allows the agent to securely interface with your local environment, external AI models, and real-time traffic analytics to optimize ad placements dynamically.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-dark-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                  Configure IAM Permissions
                </h3>
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100 text-sm text-gray-300 leading-relaxed">
                  <p className="mb-2">
                    To allow the agent to execute tools via the Model Context Protocol, your Google Cloud principal must have the <code className="text-brand-400 bg-dark-100 px-1.5 py-0.5 rounded">mcp.tools.call</code> permission.
                  </p>
                  <a 
                    href="https://docs.cloud.google.com/iam/docs/roles-permissions/mcp#mcp.tools.call" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-500 hover:text-brand-400 inline-flex items-center gap-1 font-medium transition-colors"
                  >
                    View IAM Documentation <ExternalLink size={14} />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-dark-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">5</span>
                  Enable Secret Manager API
                </h3>
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100 flex items-center gap-3 font-mono text-sm">
                  <Terminal size={16} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-300 break-all">gcloud services enable secretmanager.googleapis.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Python SDK Integration Card */}
          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Terminal size={120} />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-500 p-3 rounded-xl">
                <Terminal size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Python SDK Integration</h2>
                <p className="text-sm text-gray-400">Example of fetching AdSense data and analyzing it with the Google GenAI Python SDK.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-dark-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                  Install Dependencies
                </h3>
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100 flex items-center gap-3 font-mono text-sm overflow-x-auto">
                  <Terminal size={16} className="text-gray-500 flex-shrink-0" />
                  <span className="text-gray-300 whitespace-nowrap">pip install --upgrade google-api-python-client google-auth-oauthlib google-genai google-cloud-bigquery</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-dark-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  AdSense + Gemini Optimization Script
                </h3>
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100 font-mono text-sm overflow-x-auto text-gray-300">
                  <pre className="whitespace-pre-wrap">
{`import os
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google import genai

# 1. AUTHENTICATE GOOGLE ADSENSE
SCOPES = ['https://www.googleapis.com/auth/adsense.readonly']
flow = InstalledAppFlow.from_client_secrets_file('client_secrets.json', SCOPES)
credentials = flow.run_local_server(port=0)
adsense = build('adsense', 'v2', credentials=credentials)

# 2. FETCH ADSENSE REPORT DATA
# Retrieves data grouped by Ad Unit looking at Impressions, Clicks, and Estimated Earnings
account_id = 'accounts/pub-9501043041040319' # Explicitly set Publisher ID

report = adsense.accounts().reports().generate(
  account=account_id,
  dateRange='LAST_30_DAYS',
  metrics=['IMPRESSIONS', 'CLICKS', 'ESTIMATED_EARNINGS'],
  dimensions=['AD_UNIT_NAME']
).execute()

# Format the rows of data for our GenAI prompt
report_rows = report.get('rows', [])
formatted_data = "\\n".join([f"Ad Unit: {r['cells'][0]['value']} | Impressions: {r['cells'][1]['value']} | Clicks: {r['cells'][2]['value']} | Earnings: \${r['cells'][3]['value']}" for r in report_rows])

# 3. INITIALIZE GEMINI CLIENT AND ANALYZE
# Ensure your GEMINI_API_KEY environment variable is set
client = genai.Client()

prompt = f"""
You are an expert ad optimization AI. Analyze the following 30-day Google AdSense performance data and suggest actionable ways to maximize revenue:

{formatted_data}

Provide:
1. Top performing ad units.
2. Underperforming ad units with a low Click-Through Rate (CTR).
3. Strategy adjustments (e.g., placement changes, unit size adjustments).
"""

# Call Gemini model to process the data
interaction = client.models.generate_content(
  model="gemini-2.5-flash",
  contents=prompt
)

print("\\n--- GenAI Optimization Recommendations ---")
print(interaction.text)`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="bg-dark-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                  BigQuery Data Pipeline Script
                </h3>
                <div className="bg-dark-300 rounded-lg p-4 border border-dark-100 font-mono text-sm overflow-x-auto text-gray-300">
                  <pre className="whitespace-pre-wrap">
{`import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from google.cloud import bigquery

# 1. Authenticate with Google AdSense
SCOPES = ['https://www.googleapis.com/auth/adsense.readonly']
creds = service_account.Credentials.from_service_account_file('service_account_key.json', scopes=SCOPES)
adsense_client = build('adsense', 'v2', credentials=creds)

def fetch_and_store_adsense_data():
  # 2. Query AdSense Reports
  # Get your AdSense account ID
  accounts = adsense_client.accounts().list().execute()
  account_id = accounts['accounts'][0]['name']
   
  # Generate the report for the last 30 days
  report = adsense_client.accounts().reports().generate(
    account=account_id,
    dateRange='LAST_30_DAYS',
    metrics=['IMPRESSIONS', 'CLICKS', 'ESTIMATED_EARNINGS'],
    dimensions=['DATE']
  ).execute()
   
  # 3. Stream data into BigQuery (ad_revenues)
  bq_client = bigquery.Client()
  table_id = "feisty-port-483522-q0.ad_revenues.daily_earnings"
   
  rows_to_insert = []
  for row in report.get('rows', []):
    rows_to_insert.append({
      "date": row['cells'][0]['value'],
      "impressions": int(row['cells'][1]['value']),
      "clicks": int(row['cells'][2]['value']),
      "earnings": float(row['cells'][3]['value'])
    })
     
  errors = bq_client.insert_rows_json(table_id, rows_to_insert)
  if errors == []:
    print("AdSense data successfully saved to BigQuery!")`}
                  </pre>
                </div>
              </div>
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
                <h2 className="text-2xl font-bold text-white">Workflow Token & Auth</h2>
                <p className="text-sm text-gray-400">Generate a token to authenticate your local NPM agent (with MCP support) or login via OAuth.</p>
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

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={generateToken}
                className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-900/20"
              >
                <Cpu size={20} />
                {token ? 'Regenerate Token' : 'Generate Workflow Token'}
              </button>
              
              {authUser ? (
                <div className="flex-1 bg-dark-100 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 border border-emerald-500/30">
                  <img src={authUser.picture} alt="Profile" className="w-6 h-6 rounded-full" />
                  <span className="truncate">{authUser.name}</span>
                  <CheckCircle2 size={16} className="text-emerald-400 ml-1" />
                </div>
              ) : (
                <button 
                  onClick={handleOAuthLogin}
                  className="flex-1 bg-dark-100 hover:bg-dark-50 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 border border-dark-50"
                >
                  <KeyRound size={20} className="text-brand-400" />
                  OAuth Client Login
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Sidebar for Logs & Info */}
        <div className="space-y-8">
          
          {/* Customer Access & Info */}
          <div className="bg-dark-200 p-6 rounded-2xl border border-dark-100">
            <h3 className="text-lg font-bold text-white mb-2">Customer Access & Info</h3>
            <p className="text-sm text-gray-400 mb-4">
              Access detailed information about monetization and agent features, or share the portal link.
            </p>
            <div className="space-y-3">
              <a 
                href="https://msimobsenmusic.com/about" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 w-full bg-dark-300 hover:bg-dark-100 text-white text-sm font-semibold py-2.5 rounded-lg border border-dark-100 transition-colors"
              >
                <ExternalLink size={16} className="text-brand-400" />
                About Monetization & Agent
              </a>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('https://genai-app-msimobsenmusic-1-1783599542654-762658008656.us-central1.run.app/?key=uPKsTF6WgnWXmvtDZHPfsni9T0abFshO#/agent');
                  setLinkCopied(true);
                  setTimeout(() => setLinkCopied(false), 2000);
                }}
                className="flex items-center justify-center gap-2 w-full bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
              >
                {linkCopied ? <CheckCircle2 size={16} /> : <LinkIcon size={16} />}
                {linkCopied ? 'Link Copied!' : 'Copy Agent Portal Link'}
              </button>
            </div>
          </div>

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
