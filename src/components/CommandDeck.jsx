import React, { useState, useEffect } from 'react';
import { 
  Flame, CheckCircle2, Clock, Calendar, Zap, AlertTriangle, 
  BookOpen, Cpu, Globe, MessageSquare, ChevronRight, Award,
  Check, ArrowUpRight, ShieldCheck, RefreshCw, Plus, Minus, RotateCcw, 
  Sparkles, Trash2, Play, Pause, PlusCircle, FileText, PenLine
} from 'lucide-react';
import { OPERATING_MODALITIES } from '../data/careerData';

export function CommandDeck({ state, updateState, setActiveTab }) {
  const { profile, active_mode, today, streaks } = state;
  const currentModality = OPERATING_MODALITIES[active_mode] || OPERATING_MODALITIES.normal;

  // Calculate Countdown to GATE 2028 (Feb 5, 2028)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Add Task Modal State
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPillar, setNewTaskPillar] = useState('GATE');
  const [newTaskDuration, setNewTaskDuration] = useState(45);
  const [newTaskTag, setNewTaskTag] = useState('Math');

  // Study Session Focus Timer State
  const [focusDuration, setFocusDuration] = useState(45);
  const [focusSeconds, setFocusSeconds] = useState(45 * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2028-02-05T09:00:00+05:30').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Focus Timer Countdown
  useEffect(() => {
    let timer = null;
    if (timerActive && focusSeconds > 0) {
      timer = setInterval(() => {
        setFocusSeconds(s => s - 1);
      }, 1000);
    } else if (focusSeconds === 0 && timerActive) {
      setTimerActive(false);
      alert("Study sprint complete! Log this block to your Net Study Clock.");
    }
    return () => clearInterval(timer);
  }, [timerActive, focusSeconds]);

  const selectTimerDuration = (mins) => {
    setTimerActive(false);
    setFocusDuration(mins);
    setFocusSeconds(mins * 60);
  };

  const logFocusSession = () => {
    const hours = parseFloat((focusDuration / 60).toFixed(1));
    adjustStreak('total_hours_studied', hours, true);
    setTimerActive(false);
    setFocusSeconds(focusDuration * 60);
    alert(`Logged +${hours} hrs to your Net Study Clock!`);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const task = {
      id: `t_${Date.now()}`,
      pillar: newTaskPillar,
      text: newTaskText.trim(),
      duration: Number(newTaskDuration) || 30,
      done: false,
      tag: newTaskTag.trim() || 'General'
    };
    updateState({
      ...state,
      today: {
        ...today,
        tasks: [...today.tasks, task]
      }
    });
    setNewTaskText('');
    setShowAddTask(false);
  };

  const deleteTask = (taskId, e) => {
    e.stopPropagation();
    const updatedTasks = today.tasks.filter(t => t.id !== taskId);
    const gateMins = updatedTasks
      .filter(t => t.pillar === 'GATE' && t.done)
      .reduce((acc, t) => acc + (t.duration || 0), 0);
    updateState({
      ...state,
      today: {
        ...today,
        gate_minutes_done: gateMins,
        tasks: updatedTasks
      }
    });
  };

  const toggleTask = (taskId) => {
    const updatedTasks = today.tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, done: !t.done };
      }
      return t;
    });

    // Auto-calculate gate minutes done from completed GATE tasks
    const gateMins = updatedTasks
      .filter(t => t.pillar === 'GATE' && t.done)
      .reduce((acc, t) => acc + (t.duration || 0), 0);

    const hasEng = updatedTasks.some(t => t.pillar === 'English' && t.done);
    const hasJp = updatedTasks.some(t => t.pillar === 'Japanese' && t.done);

    updateState({
      ...state,
      today: {
        ...today,
        gate_minutes_done: gateMins,
        english_done: hasEng,
        japanese_done: hasJp,
        tasks: updatedTasks
      }
    });
  };

  const adjustStreak = (key, delta, isFloat = false) => {
    const currentVal = streaks[key] || 0;
    const rawVal = currentVal + delta;
    const newVal = Math.max(0, isFloat ? parseFloat(rawVal.toFixed(1)) : Math.round(rawVal));
    updateState({
      ...state,
      streaks: {
        ...streaks,
        [key]: newVal
      }
    });
  };

  const resetAllProgress = () => {
    if (window.confirm("Reset all streaks, study hours, and completed tasks to Day 0 (Clean Slate)?")) {
      updateState({
        ...state,
        today: {
          ...today,
          gate_minutes_done: 0,
          english_done: false,
          japanese_done: false,
          dv_done: false,
          tasks: today.tasks.map(t => ({ ...t, done: false }))
        },
        streaks: {
          gate_days: 0,
          english_days: 0,
          japanese_days: 0,
          total_hours_studied: 0,
          total_pyqs_solved: 0
        },
        daily_notes: ""
      });
    }
  };

  const markDayComplete = () => {
    const updatedTasks = today.tasks.map(t => ({ ...t, done: true }));
    updateState({
      ...state,
      today: {
        ...today,
        gate_minutes_done: today.gate_minutes_goal,
        english_done: true,
        japanese_done: true,
        tasks: updatedTasks
      },
      streaks: {
        ...streaks,
        gate_days: streaks.gate_days + 1,
        english_days: streaks.english_days + 1,
        japanese_days: streaks.japanese_days + 1
      }
    });
  };

  const setModality = (modeKey) => {
    updateState({
      ...state,
      active_mode: modeKey,
      today: {
        ...today,
        mode: modeKey
      }
    });
  };

  const completedCount = today.tasks.filter(t => t.done).length;
  const progressPercent = today.tasks.length ? Math.round((completedCount / today.tasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner: GATE 2028 Countdown & Profile Summary */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE SEMESTER: 2-1 (Nov 2026 Target)
              </span>
              <span className="text-xs text-slate-400 font-mono">RGUKT RK Valley • CGPA ~8.0</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Command Deck: <span className="text-indigo-400">{profile.name}</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Primary Objective: <strong className="text-amber-400 font-semibold">GATE ECE 2028</strong> (3rd-Year Attempt) + 
              <strong className="text-indigo-300 font-semibold"> VLSI Design Verification Specialization</strong>.
            </p>
          </div>

          {/* Precision Countdown Box */}
          <div className="bg-slate-900/80 backdrop-blur border border-indigo-500/30 rounded-xl p-4 flex flex-col items-center min-w-[280px] shadow-lg">
            <span className="text-xs uppercase tracking-wider text-indigo-300 font-bold mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              GATE 2028 War Countdown
            </span>
            <div className="grid grid-cols-4 gap-2 text-center w-full">
              <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                <span className="text-xl md:text-2xl font-black text-white font-mono">{timeLeft.days}</span>
                <span className="block text-[10px] text-slate-400 uppercase font-medium">Days</span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                <span className="text-xl md:text-2xl font-black text-amber-400 font-mono">{timeLeft.hours}</span>
                <span className="block text-[10px] text-slate-400 uppercase font-medium">Hours</span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                <span className="text-xl md:text-2xl font-black text-indigo-400 font-mono">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-slate-400 uppercase font-medium">Mins</span>
              </div>
              <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                <span className="text-xl md:text-2xl font-black text-emerald-400 font-mono">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-slate-400 uppercase font-medium">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streaks & KPI Ribbon with Interactive Day 0 Controls */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center gap-2">
            {streaks.gate_days === 0 && streaks.total_hours_studied === 0 ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                DAY 0 • FRESH START (Starts Tomorrow Morning)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="w-3.5 h-3.5" />
                ACTIVE MOMENTUM: {streaks.gate_days} DAYS
              </span>
            )}
            <span className="text-xs text-slate-400 hidden md:inline">
              Adjust stats manually or mark the full day complete below.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markDayComplete}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              title="Marks all today tasks complete and adds +1 day to streaks"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Complete Day (+1 Streak)
            </button>
            <button
              onClick={resetAllProgress}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-400 hover:border-rose-500/30 text-slate-400 font-semibold text-xs border border-slate-700 flex items-center gap-1 transition-all"
              title="Reset all streaks and progress back to Day 0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset (Day 0)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* GATE Streak */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400/20" />
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => adjustStreak('gate_days', -1)}
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                  title="Subtract 1 day"
                >
                  -
                </button>
                <button 
                  onClick={() => adjustStreak('gate_days', 1)}
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                  title="Add 1 day"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{streaks.gate_days} Days</div>
              <div className="text-[11px] text-slate-400">GATE Streak</div>
            </div>
          </div>

          {/* PYQs Conquered */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => adjustStreak('total_pyqs_solved', -1)}
                  className="px-1 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-[10px]"
                  title="Subtract 1 PYQ"
                >
                  -1
                </button>
                <button 
                  onClick={() => adjustStreak('total_pyqs_solved', 5)}
                  className="px-1.5 h-5 rounded bg-indigo-600/60 hover:bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold"
                  title="Add 5 PYQs"
                >
                  +5
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{streaks.total_pyqs_solved}</div>
              <div className="text-[11px] text-slate-400">PYQs Conquered</div>
            </div>
          </div>

          {/* Net Study Clock */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => adjustStreak('total_hours_studied', -0.5, true)}
                  className="px-1 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-[10px]"
                  title="Subtract 0.5 hr"
                >
                  -.5
                </button>
                <button 
                  onClick={() => adjustStreak('total_hours_studied', 1, true)}
                  className="px-1.5 h-5 rounded bg-emerald-600/60 hover:bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold"
                  title="Add 1 hr"
                >
                  +1h
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{streaks.total_hours_studied} hrs</div>
              <div className="text-[11px] text-slate-400">Net Study Clock</div>
            </div>
          </div>

          {/* English Habit */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => adjustStreak('english_days', -1)}
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                  title="Subtract 1 day"
                >
                  -
                </button>
                <button 
                  onClick={() => adjustStreak('english_days', 1)}
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                  title="Add 1 day"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{streaks.english_days} Days</div>
              <div className="text-[11px] text-slate-400">English Habit</div>
            </div>
          </div>

          {/* Japanese Dojo */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => adjustStreak('japanese_days', -1)}
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                  title="Subtract 1 day"
                >
                  -
                </button>
                <button 
                  onClick={() => adjustStreak('japanese_days', 1)}
                  className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
                  title="Add 1 day"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white font-mono">{streaks.japanese_days} Days</div>
              <div className="text-[11px] text-slate-400">Japanese Dojo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modality Selector (Realistic Life Adaptor) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Daily Operating Modality
            </h3>
            <p className="text-xs text-slate-400">
              Select how today looks in real life. The system recalibrates expectations instantly.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 self-start sm:self-auto">
            Current: {currentModality.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {Object.entries(OPERATING_MODALITIES).map(([key, mod]) => {
            const isSelected = active_mode === key;
            return (
              <button
                key={key}
                onClick={() => setModality(key)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isSelected 
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500' 
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold leading-tight mb-1 truncate">{mod.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">{mod.badge}</div>
                {isSelected && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Current Mode Description */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="font-semibold text-white">{currentModality.name}: </span>
            <span className="text-slate-400">{currentModality.description}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono shrink-0">
            <span className="text-amber-400">GATE: {currentModality.gate_time}</span>
            <span className="text-slate-600">|</span>
            <span className="text-sky-400">Eng: {currentModality.english_time}</span>
            <span className="text-slate-600">|</span>
            <span className="text-rose-400">Jp: {currentModality.japanese_time}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Mission & Quick Launchpads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Today's Action Protocol
              </h2>
              <p className="text-xs text-slate-400">Execute today's mission. Quality and focused recall &gt; long distracted hours.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddTask(!showAddTask)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                {showAddTask ? 'Close' : 'Add Task'}
              </button>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-white">{completedCount} / {today.tasks.length} Done</span>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Custom Task Form */}
          {showAddTask && (
            <form onSubmit={handleAddTask} className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3 animate-fadeIn">
              <div className="text-xs font-bold text-indigo-300">Create Custom Study Task</div>
              <div>
                <input
                  type="text"
                  placeholder="e.g. Solve 8 GATE PYQs on Op-Amps & Inverting Amplifiers"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">Pillar</label>
                  <select
                    value={newTaskPillar}
                    onChange={(e) => setNewTaskPillar(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value="GATE">GATE ECE</option>
                    <option value="VLSI DV">VLSI DV</option>
                    <option value="College">College</option>
                    <option value="English">English</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">Duration (mins)</label>
                  <select
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white focus:outline-none"
                  >
                    <option value={15}>15 mins</option>
                    <option value={30}>30 mins</option>
                    <option value={45}>45 mins</option>
                    <option value={60}>60 mins</option>
                    <option value={90}>90 mins</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-mono block mb-1">Subject Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Math / DLD"
                    value={newTaskTag}
                    onChange={(e) => setNewTaskTag(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
                >
                  Add to Daily Plan
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {today.tasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`group p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  task.done 
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60' 
                    : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button 
                  className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                    task.done 
                      ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold' 
                      : 'border-slate-700 hover:border-slate-500 bg-slate-900'
                  }`}
                >
                  {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                      task.pillar === 'GATE' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      task.pillar === 'English' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                      task.pillar === 'Japanese' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      task.pillar === 'College' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}>
                      {task.pillar}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">⏱️ {task.duration} mins</span>
                    <span className="text-[10px] text-slate-500 font-mono">{task.tag}</span>
                  </div>
                  <p className={`text-xs md:text-sm ${task.done ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>
                    {task.text}
                  </p>
                </div>

                <button
                  onClick={(e) => deleteTask(task.id, e)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Daily Engineering Notes & Reflections */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <PenLine className="w-3.5 h-3.5 text-indigo-400" />
                Daily Engineering Log &amp; Observations
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Auto-saved to device</span>
            </div>
            <textarea
              value={state.daily_notes || ""}
              onChange={(e) => updateState({ ...state, daily_notes: e.target.value })}
              placeholder="Record breakthroughs, formulas derived, mistakes noted, or questions to ask professors/mentors tomorrow..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
              rows={3}
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
            <span>Minimum Viable Session: <strong>45 mins GATE + 5m Eng + 5m Jp</strong></span>
            <button 
              onClick={() => setActiveTab('triage')}
              className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              Fell Behind? Open Triage <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Launchpads & High-Value Overlap Radar */}
        <div className="space-y-4">
          {/* Study Sprint Focus Timer (Pomodoro Engine) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Study Sprint Timer
              </span>
              <div className="flex items-center gap-1">
                {[25, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => selectTimerDuration(mins)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                      focusDuration === mins && !timerActive 
                        ? 'bg-amber-500 text-slate-950' 
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Display */}
            <div className="text-center py-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-3xl font-black font-mono text-white tracking-widest">
                {String(Math.floor(focusSeconds / 60)).padStart(2, '0')}:{String(focusSeconds % 60).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {timerActive ? 'Deep Work Sprint Active' : 'Ready to Start Sprint'}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTimerActive(!timerActive)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  timerActive ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                {timerActive ? 'Pause' : 'Start Focus Sprint'}
              </button>
              <button
                onClick={logFocusSession}
                className="px-3 py-2 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold"
                title="Log session time to Net Study Clock"
              >
                Log +{parseFloat((focusDuration / 60).toFixed(1))}h
              </button>
            </div>
          </div>

          {/* High-Value Overlap Spotlight */}
          <div className="bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Sem 2-1 Triple Overlap
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                HIGH ROI ⭐⭐⭐
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              You are currently studying <strong className="text-white">Digital Logic Design</strong> &amp; <strong className="text-white">Control Systems</strong>.
              Every hour spent here directly secures your <strong className="text-emerald-300">college GPA</strong>, unlocks <strong className="text-emerald-300">~18 GATE marks</strong>, and prepares RTL design for <strong className="text-emerald-300">VLSI DV</strong>.
            </p>
            <button 
              onClick={() => setActiveTab('gate')}
              className="w-full py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              View College-GATE-DV Matrix <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Pillar Jump Cards */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pillar Fast Launch</h3>
            
            <button 
              onClick={() => setActiveTab('gate')}
              className="w-full p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 text-left flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">G</div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">GATE Error Book</div>
                  <div className="text-[10px] text-slate-400">2 errors due for spaced review today</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
            </button>

            <button 
              onClick={() => setActiveTab('dv')}
              className="w-full p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 text-left flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-xs">DV</div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">VLSI DV Stage 1</div>
                  <div className="text-[10px] text-slate-400">Digital Logic &amp; Hardware Modeling</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
            </button>

            <button 
              onClick={() => setActiveTab('languages')}
              className="w-full p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-rose-500/40 text-left flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">日</div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-rose-400 transition-colors">Japanese Flashcards</div>
                  <div className="text-[10px] text-slate-400">30 / 800 N5 words mastered</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-rose-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
