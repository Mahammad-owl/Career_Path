import React, { useState } from 'react';
import { 
  ShieldAlert, RefreshCw, AlertTriangle, CheckCircle2, BatteryLow, 
  GraduationCap, Clock, Sparkles, ArrowRight
} from 'lucide-react';
import { BACKLOG_RECOVERY_STRATEGIES } from '../data/careerData';

export function TriageRecovery({ state, updateState, setActiveTab }) {
  const [daysMissed, setDaysMissed] = useState(2);
  const [selectedProtocol, setSelectedProtocol] = useState(0);

  const calculateRecovery = (days) => {
    if (days <= 1) {
      return {
        strategy: "Buffer Day Absorption",
        dailyIncreaseMinutes: 0,
        weekendMinutes: 120,
        advice: "Do NOT study extra hours today. Maintain your regular 2-hour rhythm. Absorb the 2 missed hours into the upcoming Sunday revision buffer."
      };
    } else if (days <= 3) {
      return {
        strategy: "Surgical High-Yield Triage",
        dailyIncreaseMinutes: 15,
        weekendMinutes: 180,
        advice: "Skip reading textbook pages for missed topics. Jump straight to the 1-page formula summary, solve only 15 high-weightage PYQs, log errors, and rejoin today's calendar."
      };
    } else if (days <= 7) {
      return {
        strategy: "Macro High-Yield Pruning",
        dailyIncreaseMinutes: 20,
        weekendMinutes: 240,
        advice: "Divide missed topics into High-Yield (Eigenvalues, Op-Amps, State Machines, Bode Plots) vs Low-Yield. Cover High-Yield this weekend; postpone Low-Yield to semester vacation."
      };
    } else {
      return {
        strategy: "Hard Calendar Reset",
        dailyIncreaseMinutes: 0,
        weekendMinutes: 240,
        advice: "Do not attempt to catch up on 2+ weeks of past work by exhausting yourself. Re-anchor your study to TODAY'S date. Move all skipped content into the December vacation buffer."
      };
    }
  };

  const recoveryPlan = calculateRecovery(daysMissed);

  const applyTriageToToday = () => {
    const triageTask = {
      id: `t_triage_${Date.now()}`,
      pillar: "GATE",
      text: `Backlog Triage: ${recoveryPlan.strategy} (Cover top 15 core PYQs, zero textbook reading)`,
      duration: 60,
      done: false,
      tag: "Recovery"
    };
    updateState({
      ...state,
      active_mode: "backlog",
      today: {
        ...state.today,
        mode: "backlog",
        tasks: [triageTask, ...(state.today?.tasks || []).filter(t => !t.id.startsWith('t_triage'))]
      }
    });
    alert(`Applied "${recoveryPlan.strategy}"! Today's mode recalibrated to Backlog Triage.`);
    setActiveTab('today');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
            SYSTEM RESILIENCE &amp; RECOVERY ENGINE
          </span>
          <span className="text-xs text-slate-400 font-mono">Anti-Burnout &bull; Anti-Guilt Protocols</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-rose-400" />
          Backlog Triage &amp; Recovery Deck
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Every college student falls behind due to illness, surprise assignments, or exhaustion. 
          A broken system causes guilt and collapse; our Career Operating System recalculates realistic recovery paths instantly.
        </p>
      </div>

      {/* Interactive Backlog Calculator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            Interactive Backlog Recovery Calculator
          </h3>
          <p className="text-xs text-slate-400">
            How many days of study were interrupted? Slide to generate your personalized recovery prescription.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">
              Days Lost: <span className="text-rose-400 font-mono text-lg font-bold">{daysMissed} Day{daysMissed > 1 ? 's' : ''}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="21" 
              value={daysMissed}
              onChange={(e) => setDaysMissed(Number(e.target.value))}
              className="w-full sm:w-64 accent-rose-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Prescribed Strategy</span>
              <div className="text-sm font-bold text-white">{recoveryPlan.strategy}</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Weekday Hour Adjustment</span>
              <div className="text-sm font-bold text-emerald-400 font-mono">
                +{recoveryPlan.dailyIncreaseMinutes} mins/day max
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Weekend Buffer Allocation</span>
              <div className="text-sm font-bold text-indigo-400 font-mono">
                {recoveryPlan.weekendMinutes} mins buffer
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-500/20 text-xs text-slate-300 space-y-3">
            <div>
              <span className="font-bold text-indigo-300 font-mono uppercase block text-[11px] mb-1">
                Triage Directive:
              </span>
              <p className="leading-relaxed">{recoveryPlan.advice}</p>
            </div>

            <button
              onClick={applyTriageToToday}
              className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Apply This Triage Strategy to Today's Operating Plan
            </button>
          </div>
        </div>
      </div>

      {/* The Two Life Saver Modes: Low-Energy & Exam Season */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Low-Energy Mode / MVD */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <BatteryLow className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Minimum Viable Day (MVD Protocol)</h3>
              <span className="text-[11px] text-slate-400">When physically or mentally exhausted</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The secret to competitive exams is not studying 10 hours once a week; it is never allowing a zero day. 
            On days when you have zero energy, do NOT force 2 hours of hard calculus. Run this 20-minute friction-free circuit:
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
              <span>1. Error Book Flashcards (5 items)</span>
              <span className="text-amber-400 font-bold">10 mins</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
              <span>2. Read 1 English Tech summary aloud</span>
              <span className="text-sky-400 font-bold">5 mins</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
              <span>3. Review 5 Japanese words</span>
              <span className="text-rose-400 font-bold">5 mins</span>
            </div>
          </div>

          <button
            onClick={() => {
              updateState({
                ...state,
                active_mode: "low_energy",
                today: { ...state.today, mode: "low_energy" }
              });
              setActiveTab('today');
            }}
            className="w-full py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            Activate Low-Energy Mode for Today
          </button>
        </div>

        {/* College Exam Season Shield */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">College Exam Season Shield</h3>
              <span className="text-[11px] text-slate-400">Mid-terms &amp; Semester Finals Protocol</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Tier-1 semiconductor companies (Qualcomm, Intel, NVIDIA, Synopsys) screen out candidates with CGPA below 7.5 or 8.0. 
            During college exam weeks, college academics must take 90% priority.
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
              <span>1. College Subject Mastery (DLD, DSP, etc.)</span>
              <span className="text-emerald-400 font-bold">90% Focus</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
              <span>2. GATE Formula Sheet Maintenance</span>
              <span className="text-amber-400 font-bold">15 mins</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
              <span>3. Japanese Streak Saver (10 Vocab)</span>
              <span className="text-rose-400 font-bold">7 mins</span>
            </div>
          </div>

          <button
            onClick={() => {
              updateState({
                ...state,
                active_mode: "exam",
                today: { ...state.today, mode: "exam" }
              });
              setActiveTab('today');
            }}
            className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
          >
            Activate College Exam Shield Mode
          </button>
        </div>
      </div>
    </div>
  );
}
