import React from 'react';
import { 
  LayoutDashboard, Compass, Target, Cpu, MessageSquare, 
  ShieldAlert, BarChart3, Globe, Flame, CheckCircle2, ChevronRight
} from 'lucide-react';

export function Sidebar({ activeTab, setActiveTab, streaks }) {
  const menuItems = [
    { id: 'today', label: 'Command Deck', icon: LayoutDashboard, badge: 'Daily Core', color: 'text-indigo-400' },
    { id: 'journey', label: 'Master Journey', icon: Compass, badge: '2026-2029', color: 'text-emerald-400' },
    { id: 'gate', label: 'GATE War Room', icon: Target, badge: 'GATE 2028', color: 'text-amber-400' },
    { id: 'dv', label: 'VLSI DV Studio', icon: Cpu, badge: '16 Stages', color: 'text-indigo-400' },
    { id: 'languages', label: 'Language Wing', icon: Globe, badge: 'Eng + 日', color: 'text-sky-400' },
    { id: 'triage', label: 'Triage & Recovery', icon: ShieldAlert, badge: 'Resilience', color: 'text-rose-400' },
    { id: 'reviews', label: 'Reviews & Metrics', icon: BarChart3, badge: 'Audit', color: 'text-purple-400' },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
      {/* Brand & User Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center font-black text-white text-sm shadow-md shadow-indigo-500/20">
            R
          </div>
          <div>
            <h2 className="text-sm font-black text-white tracking-tight">Riyaz's Career OS</h2>
            <div className="text-[10px] text-slate-400 font-mono">RGUKT RK Valley • ECE 2-1</div>
          </div>
        </div>

        {/* Priority Hierarchy Tag */}
        <div className="mt-3 p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono leading-tight">
          <div className="text-slate-300 font-bold mb-0.5">Priority Engine:</div>
          <div>GATE &gt; DV &gt; English &gt; Japanese</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all group ${
                isActive 
                  ? 'bg-slate-900 text-white border border-slate-700/80 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? item.color : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                isActive ? 'bg-slate-800 text-slate-300' : 'text-slate-600'
              }`}>
                {item.badge}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Quick Status Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 space-y-2 text-[11px] font-mono">
        <div className="flex items-center justify-between text-slate-400">
          <span>GATE Streak:</span>
          <span className="text-amber-400 font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-400/20" /> {streaks.gate_days}d
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>Japanese Words:</span>
          <span className="text-rose-400 font-bold">10 words/day</span>
        </div>
        <div className="text-[10px] text-slate-600 text-center pt-2 border-t border-slate-900">
          Offline Local Storage &bull; Fast &bull; Private
        </div>
      </div>
    </aside>
  );
}
