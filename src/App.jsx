import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CommandDeck } from './components/CommandDeck';
import { MasterJourney } from './components/MasterJourney';
import { GateWarRoom } from './components/GateWarRoom';
import { DvStudio } from './components/DvStudio';
import { LanguageWing } from './components/LanguageWing';
import { TriageRecovery } from './components/TriageRecovery';
import { ReviewsMetrics } from './components/ReviewsMetrics';
import { INITIAL_USER_STATE } from './data/careerData';
import { 
  Menu, X, Flame, LayoutDashboard, Target, Compass, Cpu, Layers 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [state, setState] = useState(() => {
    try {
      const savedV2 = localStorage.getItem('riyaz_career_os_v2');
      if (savedV2) {
        const parsed = JSON.parse(savedV2);
        return {
          ...INITIAL_USER_STATE,
          ...parsed,
          today: {
            ...INITIAL_USER_STATE.today,
            ...(parsed.today || {})
          },
          streaks: {
            ...INITIAL_USER_STATE.streaks,
            ...(parsed.streaks || {})
          },
          syllabus_completed_ids: parsed.syllabus_completed_ids || [],
          syllabus_in_progress_ids: parsed.syllabus_in_progress_ids || [],
          topic_pyqs: parsed.topic_pyqs || {},
          error_book: parsed.error_book || [],
          dv_projects: parsed.dv_projects || [],
          japanese_mastered_ids: parsed.japanese_mastered_ids || [],
          daily_notes: parsed.daily_notes || ""
        };
      }
    } catch (e) {
      console.error("Failed to load saved state", e);
    }
    return INITIAL_USER_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem('riyaz_career_os_v2', JSON.stringify(state));
    } catch (e) {
      console.error("Failed to persist state", e);
    }
  }, [state]);

  const updateState = (newState) => {
    setState(newState);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-3.5 bg-slate-950/95 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center font-black text-white text-xs shadow-sm">
            R
          </div>
          <div>
            <h2 className="text-xs font-black text-white leading-tight">Riyaz's Career OS</h2>
            <div className="text-[10px] text-slate-400 font-mono">GATE 2028 &bull; VLSI DV</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            <Flame className="w-3.5 h-3.5 fill-amber-400/20" /> {state.streaks.gate_days}d
          </span>
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded-lg border border-slate-800 text-slate-300 hover:text-white active:bg-slate-900"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-indigo-400" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-72 max-w-[85vw] h-full bg-slate-950 border-r border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="text-xs font-bold text-white tracking-wide">SYSTEM DIRECTORY</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }} 
                streaks={state.streaks} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Fixed left bar) */}
      <div className="hidden md:block w-64 shrink-0 border-r border-slate-800">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          streaks={state.streaks} 
        />
      </div>

      {/* Main Content Area (extra bottom padding on mobile for bottom bar) */}
      <main className="flex-1 p-3.5 sm:p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto min-h-screen pb-24 md:pb-8">
        {activeTab === 'today' && (
          <CommandDeck 
            state={state} 
            updateState={updateState} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'journey' && (
          <MasterJourney />
        )}
        {activeTab === 'gate' && (
          <GateWarRoom 
            state={state} 
            updateState={updateState} 
          />
        )}
        {activeTab === 'dv' && (
          <DvStudio 
            state={state} 
            updateState={updateState} 
          />
        )}
        {activeTab === 'languages' && (
          <LanguageWing 
            state={state} 
            updateState={updateState} 
          />
        )}
        {activeTab === 'triage' && (
          <TriageRecovery 
            state={state} 
            updateState={updateState} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'reviews' && (
          <ReviewsMetrics 
            state={state} 
            updateState={updateState} 
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Fast 1-Thumb Switching on Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 px-2 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'today' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Today</span>
        </button>

        <button
          onClick={() => setActiveTab('gate')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'gate' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">GATE</span>
        </button>

        <button
          onClick={() => setActiveTab('journey')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'journey' ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Roadmap</span>
        </button>

        <button
          onClick={() => setActiveTab('dv')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'dv' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">VLSI DV</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            ['languages', 'triage', 'reviews'].includes(activeTab) ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </nav>
    </div>
  );
}
