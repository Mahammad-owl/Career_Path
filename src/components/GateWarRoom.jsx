import React, { useState } from 'react';
import { 
  BookOpen, Target, AlertCircle, Award, CheckCircle2, ChevronDown, 
  ChevronRight, Plus, Filter, Calculator, Sparkles, AlertTriangle, 
  Calendar, RotateCcw, Clock, Layers, Zap, Cpu, FileText
} from 'lucide-react';
import { GATE_SYLLABUS, TRIPLE_OVERLAP_MATRIX, INITIAL_ERROR_BOOK, GATE_FORMULA_VAULT } from '../data/careerData';

export function GateWarRoom({ state, updateState }) {
  const [activeSubTab, setActiveSubTab] = useState('syllabus'); // syllabus | formula_vault | overlap | error_book | pyq_system
  const [expandedSection, setExpandedSection] = useState('sec_math');
  const [selectedFormulaSubject, setSelectedFormulaSubject] = useState('f_digital');
  const [showAddErrorModal, setShowAddErrorModal] = useState(false);

  const completedIds = state.syllabus_completed_ids || [];
  const inProgressIds = state.syllabus_in_progress_ids || [];
  const topicPyqs = state.topic_pyqs || {};
  const errorBook = state.error_book && state.error_book.length > 0 ? state.error_book : INITIAL_ERROR_BOOK;

  const [newError, setNewError] = useState({
    subject: "Digital Circuits",
    topic: "",
    question_ref: "",
    question_type: "NAT",
    mistake_category: "Type 2: Formula / Sign Mistake",
    problem_summary: "",
    my_wrong_work: "",
    correct_solution: "",
    root_cause: "",
    corrective_rule: ""
  });

  const toggleTopicStatus = (topicId) => {
    let newCompleted = [...completedIds];
    let newInProgress = [...inProgressIds];

    if (newCompleted.includes(topicId)) {
      newCompleted = newCompleted.filter(id => id !== topicId);
    } else if (newInProgress.includes(topicId)) {
      newInProgress = newInProgress.filter(id => id !== topicId);
      newCompleted.push(topicId);
    } else {
      newInProgress.push(topicId);
    }

    updateState({
      ...state,
      syllabus_completed_ids: newCompleted,
      syllabus_in_progress_ids: newInProgress
    });
  };

  const adjustTopicPyqs = (topicId, delta) => {
    const current = topicPyqs[topicId] || 0;
    const nextVal = Math.max(0, current + delta);
    const updatedPyqs = {
      ...topicPyqs,
      [topicId]: nextVal
    };
    
    const currentTotal = state.streaks.total_pyqs_solved || 0;
    const newTotal = Math.max(0, currentTotal + delta);

    updateState({
      ...state,
      topic_pyqs: updatedPyqs,
      streaks: {
        ...state.streaks,
        total_pyqs_solved: newTotal
      }
    });
  };

  const handleAddError = (e) => {
    e.preventDefault();
    if (!newError.topic || !newError.problem_summary) return;

    const entry = {
      id: `ERR-${String(errorBook.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      ...newError,
      spaced_interval_days: [1, 3, 7, 14, 30],
      current_interval_idx: 0,
      next_review_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      status: "pending_review"
    };

    updateState({
      ...state,
      error_book: [entry, ...errorBook]
    });
    setShowAddErrorModal(false);
    setNewError({
      subject: "Digital Circuits",
      topic: "",
      question_ref: "",
      question_type: "NAT",
      mistake_category: "Type 2: Formula / Sign Mistake",
      problem_summary: "",
      my_wrong_work: "",
      correct_solution: "",
      root_cause: "",
      corrective_rule: ""
    });
  };

  const advanceErrorInterval = (errorId) => {
    const updated = errorBook.map(item => {
      if (item.id === errorId) {
        const nextIdx = item.current_interval_idx + 1;
        if (nextIdx >= item.spaced_interval_days.length) {
          return { ...item, status: "mastered", current_interval_idx: nextIdx };
        }
        const intervalDays = item.spaced_interval_days[nextIdx];
        const nextDate = new Date(Date.now() + intervalDays * 86400000).toISOString().split('T')[0];
        return {
          ...item,
          current_interval_idx: nextIdx,
          next_review_date: nextDate,
          status: "pending_review"
        };
      }
      return item;
    });

    updateState({
      ...state,
      error_book: updated
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                PILLAR 1: PRIMARY ACADEMIC TARGET
              </span>
              <span className="text-xs text-slate-400 font-mono">Exam Date: Feb 2028</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Target className="w-6 h-6 text-amber-400" />
              GATE ECE 2028 War Room
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Based strictly on the official syllabus: 65 Questions • 100 Marks • 3 Hours CBT.
              Syllabus progress is verified through solved PYQs, trap mastery, and spaced repetition error logging.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab('syllabus')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'syllabus' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Syllabus Tree
            </button>
            <button
              onClick={() => setActiveSubTab('formula_vault')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'formula_vault' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Formula Vault
            </button>
            <button
              onClick={() => setActiveSubTab('overlap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'overlap' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Triple Overlap Matrix
            </button>
            <button
              onClick={() => setActiveSubTab('error_book')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'error_book' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Error Book ({errorBook.length})
            </button>
            <button
              onClick={() => setActiveSubTab('pyq_system')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'pyq_system' ? 'bg-indigo-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              PYQ &amp; Test Engine
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: DYNAMIC SYLLABUS TREE */}
      {activeSubTab === 'syllabus' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs text-slate-400">Total Topics Mastered</div>
              <div className="text-lg font-bold text-white font-mono">{completedIds.length} Mastered / {inProgressIds.length} Active</div>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs text-slate-400">Active High-ROI Section</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">Digital Circuits (Sem 2-1)</div>
            </div>
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs text-slate-400">Target Score Benchmark</div>
              <div className="text-lg font-bold text-amber-400 font-mono">&ge; 70 / 100 Marks (AIR &lt; 300)</div>
            </div>
          </div>

          <div className="space-y-3">
            {GATE_SYLLABUS.map((sec) => {
              const isExpanded = expandedSection === sec.id;
              const completedTopics = sec.topics.filter(t => completedIds.includes(t.id)).length;
              const inProgressTopics = sec.topics.filter(t => inProgressIds.includes(t.id)).length;
              const totalTopics = sec.topics.length;
              const totalPyqsSolved = sec.topics.reduce((acc, t) => acc + (topicPyqs[t.id] || 0), 0);
              const totalPyqsTarget = sec.topics.reduce((acc, t) => acc + t.pyqs_target, 0);
              const secPercentage = totalPyqsTarget > 0 ? Math.round((totalPyqsSolved / totalPyqsTarget) * 100) : 0;

              return (
                <div key={sec.id} className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition-all">
                  <div 
                    onClick={() => setExpandedSection(isExpanded ? null : sec.id)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 select-none"
                  >
                    <div className="flex items-center gap-3">
                      <button className="text-slate-400">
                        {isExpanded ? <ChevronDown className="w-5 h-5 text-amber-400" /> : <ChevronRight className="w-5 h-5" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{sec.name}</h3>
                          <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {sec.weightage}
                          </span>
                          {sec.priority.includes('Triple') && (
                            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              TRIPLE OVERLAP ⭐⭐⭐
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {completedTopics} of {totalTopics} topics mastered • {totalPyqsSolved} / {totalPyqsTarget} PYQs solved
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-4">
                      <div className="w-32 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="h-full bg-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, secPercentage)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300 w-10 text-right">
                        {secPercentage}%
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800/80 bg-slate-950/60 p-4 space-y-2.5">
                      {sec.topics.map((top) => {
                        const status = completedIds.includes(top.id) ? 'completed' : inProgressIds.includes(top.id) ? 'in_progress' : 'not_started';
                        const solved = topicPyqs[top.id] || 0;
                        const mastery = Math.min(100, Math.round((solved / (top.pyqs_target || 1)) * 100));

                        return (
                          <div key={top.id} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  status === 'completed' ? 'bg-emerald-400' :
                                  status === 'in_progress' ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'
                                }`}></span>
                                <span className="text-xs font-semibold text-white">{top.name}</span>
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono">
                                PYQs: <span className="text-amber-400 font-bold">{solved}</span> / {top.pyqs_target} • 
                                Mastery Index: <span className="text-indigo-400 font-bold">{mastery}%</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              {/* PYQ Controls */}
                              <div className="flex items-center gap-1 bg-slate-950 px-1.5 py-0.5 rounded-lg border border-slate-800">
                                <button
                                  onClick={() => adjustTopicPyqs(top.id, -1)}
                                  className="w-5 h-5 rounded hover:bg-slate-800 text-slate-400 flex items-center justify-center text-xs"
                                  title="Subtract 1 PYQ"
                                >
                                  -
                                </button>
                                <span className="text-[10px] font-mono font-bold text-slate-300 px-1">{solved}</span>
                                <button
                                  onClick={() => adjustTopicPyqs(top.id, 1)}
                                  className="w-5 h-5 rounded hover:bg-slate-800 text-amber-400 flex items-center justify-center text-xs font-bold"
                                  title="Add 1 PYQ"
                                >
                                  +1
                                </button>
                                <button
                                  onClick={() => adjustTopicPyqs(top.id, 5)}
                                  className="px-1.5 h-5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 flex items-center justify-center text-[10px] font-bold"
                                  title="Add 5 PYQs"
                                >
                                  +5
                                </button>
                              </div>

                              {/* Status Toggle Button */}
                              <button
                                onClick={() => toggleTopicStatus(top.id)}
                                className={`text-[10px] font-mono px-2.5 py-1 rounded-lg font-bold transition-all ${
                                  status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30' :
                                  status === 'in_progress' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30' :
                                  'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                                }`}
                                title="Click to cycle: Not Started -> In Progress -> Completed"
                              >
                                {status === 'completed' ? '✓ Mastered' : status === 'in_progress' ? '⏳ In Progress' : '○ Not Started'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: POCKET FORMULA VAULT (HIGH-YIELD REVISION FOR MOBILE) */}
      {activeSubTab === 'formula_vault' && (
        <div className="space-y-4">
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 text-xs text-slate-300 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <strong className="text-amber-400 block font-bold text-sm mb-1">
                Pocket Formula &amp; Trap Vault
              </strong>
              Review high-yield formulas and classic exam traps directly from your phone on the go.
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {GATE_FORMULA_VAULT.map(vault => (
                <button
                  key={vault.id}
                  onClick={() => setSelectedFormulaSubject(vault.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedFormulaSubject === vault.id
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {vault.subject}
                </button>
              ))}
            </div>
          </div>

          {/* Cards for active subject */}
          {GATE_FORMULA_VAULT.filter(v => v.id === selectedFormulaSubject).map(vault => (
            <div key={vault.id} className="space-y-3">
              {vault.cards.map((card, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-amber-400" />
                      {card.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {vault.subject}
                    </span>
                  </div>

                  {/* Highlight Formula Box */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/30 font-mono text-amber-300 text-xs md:text-sm font-bold tracking-wide">
                    {card.key_formula}
                  </div>

                  {/* Core Explanation */}
                  <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                    {card.explanation}
                  </div>

                  {/* Trap Alert */}
                  {card.traps && (
                    <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{card.traps}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 2: TRIPLE OVERLAP MATRIX */}
      {activeSubTab === 'overlap' && (
        <div className="space-y-4">
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-400 block font-bold text-sm mb-1">
              The Anti-Burnout Doctrine: Study Once, Harvest Three Times
            </strong>
            When a subject overlaps between your college curriculum, GATE ECE, and VLSI Design Verification, 
            never treat it as three separate study tasks. Master the concept deeply during college classes, immediately solve all 25 years of GATE PYQs, 
            and write a synthesizable Verilog testbench on the weekend.
          </div>

          <div className="grid grid-cols-1 gap-4">
            {TRIPLE_OVERLAP_MATRIX.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-indigo-400 font-mono text-xs">#{idx + 1}</span>
                    {item.topic}
                  </h3>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border self-start sm:self-auto ${
                    item.overlap_tier === 'TRIPLE_VALUE' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                    item.overlap_tier === 'GATE_COLLEGE' ? 'bg-sky-500/10 text-sky-300 border-sky-500/30' :
                    item.overlap_tier === 'CORE_DV' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' :
                    'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    {item.tier_label}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-mono uppercase mb-0.5">College Semester Sync</div>
                    <div className="font-semibold text-slate-200">{item.college_course}</div>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-mono uppercase mb-0.5">GATE ECE Return</div>
                    <div className="font-semibold text-amber-400">{item.gate_relevance} ({item.gate_section})</div>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <div className="text-[10px] text-slate-400 font-mono uppercase mb-0.5">VLSI DV Career Value</div>
                    <div className="font-semibold text-indigo-300">{item.dv_relevance}</div>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/60 text-xs">
                  <span className="font-bold text-emerald-400 font-mono">Action Protocol: </span>
                  <span className="text-slate-300">{item.strategy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: ERROR BOOK (1-3-7-14-30 SPACED REVIEW) */}
      {activeSubTab === 'error_book' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-rose-400" />
                Permanent Spaced-Repetition Error Book
              </h2>
              <p className="text-xs text-slate-400">
                Review intervals: Day 1 &rarr; Day 3 &rarr; Day 7 &rarr; Day 14 &rarr; Day 30. A mistake reviewed 5 times never recurs in GATE.
              </p>
            </div>
            <button
              onClick={() => setShowAddErrorModal(true)}
              className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/20"
            >
              <Plus className="w-4 h-4" />
              Log New Mistake
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {errorBook.map((err) => (
              <div key={err.id} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      {err.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{err.subject} • {err.question_ref} ({err.question_type})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                      {err.mistake_category}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">
                      Review #{err.current_interval_idx + 1} due: {err.next_review_date}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-white">{err.topic}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{err.problem_summary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-rose-950/20 border border-rose-500/20 p-2.5 rounded-lg space-y-1">
                    <div className="text-[10px] font-mono font-bold text-rose-400 uppercase">My Error / Flawed Thinking</div>
                    <p className="text-slate-300 font-mono text-[11px]">{err.my_wrong_work}</p>
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-rose-500/10">
                      <strong>Root Cause:</strong> {err.root_cause}
                    </div>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded-lg space-y-1">
                    <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Authoritative Correction &amp; Rule</div>
                    <p className="text-slate-300 font-mono text-[11px]">{err.correct_solution}</p>
                    <div className="text-[11px] text-emerald-300 font-bold pt-1 border-t border-emerald-500/10">
                      <strong>Golden Rule:</strong> {err.corrective_rule}
                    </div>
                  </div>
                </div>

                {/* Spaced Interval Stepper & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-slate-500 text-[10px]">Intervals:</span>
                    {err.spaced_interval_days.map((days, idx) => {
                      const isPassed = idx < err.current_interval_idx;
                      const isCurrent = idx === err.current_interval_idx;
                      return (
                        <span 
                          key={days}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            isCurrent ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' :
                            'bg-slate-800 text-slate-500'
                          }`}
                        >
                          +{days}d
                        </span>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => advanceErrorInterval(err.id)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all self-end sm:self-auto"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verify &amp; Advance to Next Spaced Interval
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal to Log New Mistake */}
          {showAddErrorModal && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-rose-400" />
                    Log Error to Spaced Repetition Engine
                  </h3>
                  <button 
                    onClick={() => setShowAddErrorModal(false)}
                    className="text-slate-400 hover:text-white text-sm"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleAddError} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Subject</label>
                      <select 
                        value={newError.subject}
                        onChange={e => setNewError({...newError, subject: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                      >
                        <option>Digital Circuits</option>
                        <option>Engineering Mathematics</option>
                        <option>Control Systems</option>
                        <option>Networks, Signals and Systems</option>
                        <option>Electronic Devices (EDC)</option>
                        <option>Analog Circuits</option>
                        <option>Communications</option>
                        <option>Electromagnetics</option>
                        <option>General Aptitude</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Question Type</label>
                      <select 
                        value={newError.question_type}
                        onChange={e => setNewError({...newError, question_type: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                      >
                        <option>NAT (Numerical Answer Type)</option>
                        <option>MCQ (Multiple Choice)</option>
                        <option>MSQ (Multiple Select)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Topic Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Nyquist Stability Contour"
                        value={newError.topic}
                        onChange={e => setNewError({...newError, topic: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Question Reference / Year</label>
                      <input 
                        type="text" 
                        placeholder="e.g. GATE 2021 Set-1 Q42"
                        value={newError.question_ref}
                        onChange={e => setNewError({...newError, question_ref: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Mistake Category</label>
                    <select 
                      value={newError.mistake_category}
                      onChange={e => setNewError({...newError, mistake_category: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    >
                      <option>Type 1: Concept Hole (Didn't know underlying theory)</option>
                      <option>Type 2: Formula / Sign Mistake</option>
                      <option>Type 3: Virtual Calculator / Arithmetic Slip</option>
                      <option>Type 4: Question Interpretation / Silly Mistake</option>
                      <option>Type 5: Time Trap (Spent &gt; 5 mins on dead end)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Problem Summary</label>
                    <textarea 
                      rows={2}
                      required
                      placeholder="Brief description of the problem statement"
                      value={newError.problem_summary}
                      onChange={e => setNewError({...newError, problem_summary: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">My Flawed Attempt &amp; Root Cause</label>
                    <textarea 
                      rows={2}
                      placeholder="Why did I get this wrong? (e.g., Forgot negative feedback factor)"
                      value={newError.my_wrong_work}
                      onChange={e => setNewError({...newError, my_wrong_work: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Correct Solution &amp; Permanent Rule</label>
                    <textarea 
                      rows={2}
                      required
                      placeholder="The authoritative rule or formula to prevent this mistake forever"
                      value={newError.corrective_rule}
                      onChange={e => setNewError({...newError, corrective_rule: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button 
                      type="button"
                      onClick={() => setShowAddErrorModal(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold"
                    >
                      Save to Error Engine
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 4: PYQ & TEST ENGINE */}
      {activeSubTab === 'pyq_system' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              The Standard 10-Step GATE Learning Engine
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never passively watch 40 hours of coaching videos. Run every single subtopic through this reproducible pipeline:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block mb-1">Step 1 - 2</span>
                <span className="font-semibold text-white block">Intuition &amp; Physics</span>
                <span className="text-[11px] text-slate-400">Why does this equation exist? Derive from first principles.</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block mb-1">Step 3 - 4</span>
                <span className="font-semibold text-white block">Standard &amp; Blended</span>
                <span className="text-[11px] text-slate-400">Solve 3 direct examples, then combine with another topic.</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block mb-1">Step 5 - 6</span>
                <span className="font-semibold text-white block">25-Year GATE PYQs</span>
                <span className="text-[11px] text-slate-400">Time every question. Use virtual calculator on screen only.</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block mb-1">Step 7 - 8</span>
                <span className="font-semibold text-white block">Trap Identification</span>
                <span className="text-[11px] text-slate-400">Log every mistake into the 1-3-7-14-30 Error Book.</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="font-mono text-amber-400 font-bold block mb-1">Step 9 - 10</span>
                <span className="font-semibold text-white block">1-Page Summary &amp; Test</span>
                <span className="text-[11px] text-slate-400">Distill all formulas into 1 sheet; attempt chapter CBT.</span>
              </div>
            </div>
          </div>

          {/* Test Analysis Checklist */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Post-Mock Diagnostic Protocol
            </h3>
            <p className="text-xs text-slate-300">
              Taking tests without 2 hours of post-test root-cause analysis is a complete waste of time. After every subject or full-length mock, fill this diagnostic sheet:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                <div className="text-slate-500 mb-1">Accuracy Metric</div>
                <div className="text-white font-bold text-sm">&ge; 85% Target</div>
                <div className="text-[10px] text-slate-400">High accuracy beats high reckless attempts.</div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                <div className="text-slate-500 mb-1">Negative Marks Limit</div>
                <div className="text-rose-400 font-bold text-sm">&le; 4.00 Marks</div>
                <div className="text-[10px] text-slate-400">Zero wild guessing on 2-mark MCQs.</div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                <div className="text-slate-500 mb-1">Unattempted Recovery</div>
                <div className="text-amber-400 font-bold text-sm">Classify All</div>
                <div className="text-[10px] text-slate-400">Time-shortage vs genuine concept gap.</div>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                <div className="text-slate-500 mb-1">Virtual Calc Penalty</div>
                <div className="text-sky-400 font-bold text-sm">0 Rounding Slips</div>
                <div className="text-[10px] text-slate-400">Maintain minimum 3 decimal precision.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
