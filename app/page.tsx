'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'competitor' | 'vertical' | 'gtm'>('competitor');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>('');

  // Form states
  const [competitorInput, setCompetitorInput] = useState('');
  const [selectedVertical, setSelectedVertical] = useState('Agentic AI Workflows in Commercial Banking');
  const [gtmMarket, setGtmMarket] = useState('Southeast Asia (Cross-border LatAm Real-time Rails)');
  const [gtmHook, setGtmHook] = useState('Yield-bearing programmable Treasury Accounts');

  const runAnalysis = async () => {
    setLoading(true);
    setOutput('');
    
    let payload = {};
    if (activeTab === 'competitor') payload = { target: competitorInput || 'Stripe vs Revolut' };
    if (activeTab === 'vertical') payload = { target: selectedVertical };
    if (activeTab === 'gtm') payload = { target: gtmMarket, hook: gtmHook };

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tab: activeTab, payload }),
      });
      const data = await res.json();
      if (data.result) {
        setOutput(data.result);
      } else {
        setOutput(`<p class="text-rose-400 font-mono text-xs">Error: ${data.error || 'Failed execution pipeline.'}</p>`);
      }
    } catch (err) {
      setOutput('<p class="text-rose-400 font-mono text-xs">Connection error encountered.</p>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-amber-500/20">
      
      {/* Visual background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-zinc-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar Navigation Context Panel */}
      <aside className="w-80 border-r border-zinc-900 bg-zinc-950/80 backdrop-blur-md p-6 flex flex-col justify-between relative z-10">
        <div>
          {/* Logo Brand / Subtle Glow */}
          <div className="flex items-center gap-3 mb-10">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-75" />
            </div>
            <h1 className="text-xs font-bold tracking-widest uppercase text-zinc-400 font-mono">AlphaOffice // V1.0</h1>
          </div>
          
          {/* Executive Mandate Brief */}
          <div className="mb-8 bg-zinc-900/30 border border-zinc-900 rounded-xl p-4">
            <h2 className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-widest mb-1.5">Strategy Mandate</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Automating market gap tracking, competitive intelligence matrix updates, and global launch roadmaps for the CEO Office[cite: 1].
            </p>
          </div>

          {/* Navigation Buttons */}
          <nav className="space-y-1.5">
            {[
              { id: 'competitor', label: 'Competitor Analyzer', icon: '📊' },
              { id: 'vertical', label: 'Vertical Point-of-View', icon: '💡' },
              { id: 'gtm', label: 'GTM Launch Simulator', icon: '🌍' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveTab(t.id as any); setOutput(''); }}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-3 border ${
                  activeTab === t.id 
                    ? 'bg-zinc-900/60 text-amber-400 border-zinc-800 shadow-sm shadow-black/40 font-semibold' 
                    : 'text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-zinc-900/30'
                }`}
              >
                <span className="opacity-80 text-sm">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Identity Token Footer */}
        <div className="border-t border-zinc-900 pt-5">
          <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">Operator Profile</div>
          <div className="text-xs text-zinc-200 font-medium mb-1">Sreevidya Jayachandran</div>
          <a 
            href="https://stirring-fenglisu-d2be28.netlify.app" 
            target="_blank" 
            rel="noreferrer" 
            className="text-[11px] text-amber-500/70 hover:text-amber-400 transition-colors font-mono tracking-wide block group"
          >
            → Inspect Shipped Portfolios <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"></span>
          </a>
        </div>
      </aside>

      {/* Main Execution Workspace */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950/40 relative z-10">
        
        {/* Top Minimal Header */}
        <header className="h-16 border-b border-zinc-900 px-8 flex items-center justify-between bg-zinc-950/20 backdrop-blur-sm">
          <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
            Workspace <span className="text-zinc-700">/</span> <span className="text-zinc-300 font-medium uppercase tracking-wider">{activeTab}</span>
          </div>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="bg-zinc-50 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-40 tracking-wide active:scale-[0.98] shadow-sm"
          >
            {loading ? 'Processing Signals...' : 'Generate Analysis'}
          </button>
        </header>

        {/* Config and Output Split Block */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Active Parameter Configuration Sidebox */}
          <div className="w-80 border-r border-zinc-900 p-6 space-y-6 bg-zinc-950/10 overflow-y-auto">
            <h3 className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-widest">Configuration</h3>

            {activeTab === 'competitor' && (
              <div className="space-y-2 group">
                <label className="block text-[10px] text-zinc-500 font-mono tracking-wider group-focus-within:text-amber-500/80 transition-colors">TARGET ENTITY</label>
                <input
                  type="text"
                  placeholder="e.g., Revolut Business, Wise Pay"
                  value={competitorInput}
                  onChange={(e) => setCompetitorInput(e.target.value)}
                  className="w-full bg-zinc-900/40 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-zinc-800 text-zinc-200 transition-colors placeholder:text-zinc-600 focus:bg-zinc-900/80"
                />
              </div>
            )}

            {activeTab === 'vertical' && (
              <div className="space-y-2">
                <label className="block text-[10px] text-zinc-500 font-mono tracking-wider">STRATEGIC SECTOR</label>
                <div className="relative">
                  <select
                    value={selectedVertical}
                    onChange={(e) => setSelectedVertical(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-zinc-800 text-zinc-200 appearance-none transition-colors focus:bg-zinc-900/80 cursor-pointer"
                  >
                    <option>Agentic AI Workflows in Commercial Banking</option>
                    <option>Embedded Multi-Jurisdictional Trade Rail Infrastructure</option>
                    <option>Real-Time Compliance & Sovereign Ledger Auditing</option>
                  </select>
                  <div className="absolute right-3 top-3.5 text-zinc-500 text-[10px] pointer-events-none">▼</div>
                </div>
              </div>
            )}

            {activeTab === 'gtm' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-wider">TARGET JURISDICTION</label>
                  <input
                    type="text"
                    value={gtmMarket}
                    onChange={(e) => setGtmMarket(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-zinc-800 text-zinc-200 transition-colors focus:bg-zinc-900/80"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-zinc-500 font-mono tracking-wider">PRODUCT INITIATION HOOK</label>
                  <input
                    type="text"
                    value={gtmHook}
                    onChange={(e) => setGtmHook(e.target.value)}
                    className="w-full bg-zinc-900/40 border border-zinc-900 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-zinc-800 text-zinc-200 transition-colors focus:bg-zinc-900/80"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Clean Executive Content Display Panel */}
          <div className="flex-1 p-8 bg-zinc-950/20 overflow-y-auto flex flex-col relative">
            {loading ? (
              <div className="m-auto flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-6 h-6 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                </div>
                <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase animate-pulse">Running synthesis orchestrator...</p>
              </div>
            ) : output ? (
              <div className="max-w-3xl space-y-6 animate-[fadeIn_0.3s_ease-out]">
                {/* Embedded dynamic styling for beautifully rendering clean typography */}
                <style jsx global>{`
                  .prose h3 { font-size: 1rem; font-weight: 600; color: #f4f4f5; margin-top: 1.5rem; margin-bottom: 0.5rem; font-family: ui-mono, monospace; letter-spacing: -0.01em; }
                  .prose p { font-size: 0.875rem; color: #a1a1aa; line-height: 1.6; margin-bottom: 1rem; }
                  .prose ul { list-style-type: square; padding-left: 1.25rem; margin-bottom: 1.2rem; color: #d4d4d8; }
                  .prose li { margin-bottom: 0.4rem; font-size: 0.875rem; }
                  .prose strong { color: #f59e0b; font-weight: 600; }
                  .prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.825rem; text-align: left; }
                  .prose th { border-bottom: 1px solid #27272a; padding: 0.6rem; color: #71717a; font-family: ui-mono, monospace; font-weight: 500; }
                  .prose td { border-bottom: 1px solid #18181b; padding: 0.6rem; color: #d4d4d8; }
                `}</style>
                <div 
                  className="prose text-zinc-300"
                  dangerouslySetInnerHTML={{ __html: output }}
                />
              </div>
            ) : (
              <div className="m-auto text-center max-w-sm bg-zinc-900/10 border border-zinc-900/60 p-6 rounded-2xl backdrop-blur-sm">
                <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1.5">System Operational</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Configure metrics and click <span className="text-zinc-200 font-medium">Generate Analysis</span> above to build data-driven insight streams.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
