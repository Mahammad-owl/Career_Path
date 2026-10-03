import React, { useState } from 'react';
import { 
  BookOpen, Target, AlertCircle, Award, CheckCircle2, ChevronDown, 
  ChevronRight, Plus, Filter, Calculator, Sparkles, AlertTriangle, 
  Calendar, RotateCcw, Clock, Layers, Zap, Cpu, FileText, Check,
  Search, ShieldAlert, ArrowRight, ShieldCheck
} from 'lucide-react';
import { 
  GATE_SYLLABUS, 
  TRIPLE_OVERLAP_MATRIX, 
  INITIAL_ERROR_BOOK, 
  GATE_FORMULA_VAULT,
  GATE_EXAM_SPECIFICATION,
  GATE_2028_VERIFICATION_CHECKPOINTS,
  PILLAR_DEPENDENCY_DATA
} from '../data/careerData';

export function GateWarRoom({ state, updateState }) {
  const [activeSubTab, setActiveSubTab] = useState('syllabus'); // syllabus | formula_vault | overlap | blueprint | error_book | pyq_system
  const [expandedSection, setExpandedSection] = useState('sec_math');
  const [selectedFormulaSubject, setSelectedFormulaSubject] = useState('f_digital');
  const [showAddErrorModal, setShowAddErrorModal] = useState(false);
  const [errorCategoryFilter, setErrorCategoryFilter] = useState('all');

  const completedIds = state.syllabus_completed_ids || [];
  const inProgressIds = state.syllabus_in_progress_ids || [];
  const topicPyqs = state.topic_pyqs || {};
  const errorBook = state.error_book || [];

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

  const loadSampleErrors = () => {
    updateState({
      ...state,
      error_book: INITIAL_ERROR_BOOK
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

  const filteredErrors = errorBook.filter(err => {
    if (errorCategoryFilter === 'all') return true;
    return err.mistake_category.toLowerCase().includes(errorCategoryFilter.toLowerCase());
  });

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
              <span className="text-xs text-slate-400 font-mono">GATE ECE 2028 &bull; Target: AIR &lt; 300 (70+ Marks)</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Target className="w-6 h-6 text-amber-400" />
              GATE 2028 War Room
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Full official GATE ECE syllabus coverage, real high-yield formula vault, triple-overlap alignment with your RGUKT RK Valley college courses, and spaced-repetition error tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
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
              Pillar Spines &amp; Overlap
            </button>
            <button
              onClick={() => setActiveSubTab('blueprint')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'blueprint' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              2028 Blueprint
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
                          {completedTopics} of {totalTopics} topics mastered &bull; {totalPyqsSolved} / {totalPyqsTarget} PYQs solved ({secPercentage}%)
                        </div>
                      </div>
                    </div>

                    <div className="w-24 sm:w-36 hidden sm:block">
                      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="h-full bg-amber-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, secPercentage)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800/80 bg-slate-950/60 p-4 space-y-3">
                      <div className="grid grid-cols-1 gap-2.5">
                        {sec.topics.map((t) => {
                          const isDone = completedIds.includes(t.id);
                          const isInProg = inProgressIds.includes(t.id);
                          const pyqsDone = topicPyqs[t.id] || 0;

                          return (
                            <div 
                              key={t.id}
                              className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                                isDone ? 'bg-emerald-950/20 border-emerald-500/30' :
                                isInProg ? 'bg-amber-950/20 border-amber-500/30' :
                                'bg-slate-900/60 border-slate-800/80'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <button
                                  onClick={() => toggleTopicStatus(t.id)}
                                  className={`w-6 h-6 rounded-md border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-all ${
                                    isDone ? 'bg-emerald-500 border-emerald-500 text-slate-950' :
                                    isInProg ? 'bg-amber-500/20 border-amber-500 text-amber-300' :
                                    'border-slate-700 bg-slate-800 text-slate-500 hover:border-slate-500'
                                  }`}
                                  title="Cycle Status: Not Started -> In Progress -> Mastered"
                                >
                                  {isDone ? '✓' : isInProg ? '⏳' : ''}
                                </button>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-200">{t.name}</span>
                                    <span className="text-[10px] font-mono text-slate-500 font-semibold">{t.code}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-400 mt-0.5">
                                    Status: <strong className={isDone ? 'text-emerald-400' : isInProg ? 'text-amber-400' : 'text-slate-500'}>
                                      {isDone ? 'Mastered' : isInProg ? 'In Progress' : 'Not Started'}
                                    </strong>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                <div className="text-right mr-2">
                                  <div className="text-xs font-mono font-bold text-white">
                                    {pyqsDone} / {t.pyqs_target} PYQs
                                  </div>
                                </div>

                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => adjustTopicPyqs(t.id, -1)}
                                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center"
                                    title="Subtract 1 PYQ"
                                  >
                                    -
                                  </button>
                                  <button
                                    onClick={() => adjustTopicPyqs(t.id, 1)}
                                    className="px-2 h-6 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center justify-center"
                                    title="Add 1 PYQ"
                                  >
                                    +1
                                  </button>
                                  <button
                                    onClick={() => adjustTopicPyqs(t.id, 5)}
                                    className="px-2 h-6 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center"
                                    title="Add 5 PYQs"
                                  >
                                    +5
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: POCKET FORMULA VAULT */}
      {activeSubTab === 'formula_vault' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            {GATE_FORMULA_VAULT.map((subj) => (
              <button
                key={subj.id}
                onClick={() => setSelectedFormulaSubject(subj.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedFormulaSubject === subj.id 
                    ? 'bg-amber-500 text-slate-950 shadow-md' 
                    : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                }`}
              >
                {subj.subject}
              </button>
            ))}
          </div>

          {GATE_FORMULA_VAULT.filter(s => s.id === selectedFormulaSubject).map((subj) => (
            <div key={subj.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subj.cards.map((card, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-sm font-bold text-white">{card.title}</h4>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Formula #{idx + 1}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-amber-500/20 font-mono text-xs font-bold text-amber-300">
                    {card.key_formula}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {card.explanation}
                  </p>

                  {card.traps && (
                    <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20 text-rose-300 text-xs font-mono flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                      <span>{card.traps}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: PILLAR DEPENDENCY SPINES & TRIPLE OVERLAP */}
      {activeSubTab === 'overlap' && (
        <div className="space-y-6">
          {/* Pillar Dependency Graph Section */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase">
                Section 2: Pillar Dependency Graph
              </span>
              <h3 className="text-base font-bold text-white mt-1.5 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                Interconnected Engineering Spines
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every college subject directly reinforces your GATE rank and builds towards your core VLSI Design Verification role.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PILLAR_DEPENDENCY_DATA.map((spine) => (
                <div key={spine.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-bold text-white">{spine.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{spine.nodes.length} Stages</span>
                  </div>
                  <div className="space-y-1.5">
                    {spine.nodes.map((node, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="text-[10px] font-mono text-indigo-400">↳</span>
                        <span className={node.includes('Sem 2-1') ? 'text-emerald-300 font-semibold' : ''}>
                          {node}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                    <strong className="text-slate-300">Impact: </strong>{spine.feeds_into}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Triple Overlap Matrix */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                Section 2.1: College + GATE + DV High-Value Overlap Matrix
              </span>
              <h3 className="text-base font-bold text-white mt-1.5 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                The Anti-Burnout Overlap Engine
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Never treat college and GATE as separate study tasks. Study once, harvest three times.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {TRIPLE_OVERLAP_MATRIX.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="text-indigo-400 font-mono text-xs">#{idx + 1}</span>
                      {item.topic}
                    </h4>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border self-start sm:self-auto ${
                      item.overlap_tier === 'TRIPLE_VALUE' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                      item.overlap_tier === 'GATE_COLLEGE' ? 'bg-sky-500/10 text-sky-300 border-sky-500/30' :
                      'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}>
                      {item.tier_label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono uppercase mb-0.5">College Semester Sync</div>
                      <div className="font-semibold text-slate-200">{item.college_course}</div>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono uppercase mb-0.5">GATE ECE Return</div>
                      <div className="font-semibold text-amber-400">{item.gate_relevance} ({item.gate_section})</div>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-mono uppercase mb-0.5">VLSI DV Career Value</div>
                      <div className="font-semibold text-indigo-300">{item.dv_relevance}</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 text-xs">
                    <span className="font-bold text-emerald-400 font-mono">Action Protocol: </span>
                    <span className="text-slate-300">{item.strategy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: GATE 2028 BLUEPRINT & CHECKPOINTS */}
      {activeSubTab === 'blueprint' && (
        <div className="space-y-6">
          {/* Blueprint Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400">Total Paper Structure</span>
              <div className="text-xl font-bold text-white font-mono mt-1">65 Questions / 100 Marks</div>
              <span className="text-[10px] text-slate-500 font-mono">3 Hours &bull; Computer Based Test (CBT)</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400">Technical Core Weightage</span>
              <div className="text-xl font-bold text-amber-400 font-mono mt-1">72 Core + 13 Math</div>
              <span className="text-[10px] text-slate-500 font-mono">8 ECE sections + Engineering Math</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400">3rd Year Eligibility</span>
              <div className="text-xl font-bold text-emerald-400 font-mono mt-1">Fully Validated</div>
              <span className="text-[10px] text-slate-500 font-mono">Appear in 3rd year (Feb 2028)</span>
            </div>
          </div>

          {/* Mark Distribution Breakdown */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Official Mark Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {GATE_EXAM_SPECIFICATION.mark_distribution.map((dist, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{dist.section}</span>
                    <span className="text-xs font-bold text-amber-400 font-mono">{dist.marks} Marks</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{dist.questions} Questions</div>
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">{dist.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Question Types & Negative Marking Rules */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-400" />
              Question Types &amp; Tactical Scoring Strategies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {GATE_EXAM_SPECIFICATION.question_types.map((qt, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-white">{qt.type}</div>
                  <div className="text-[11px] font-mono text-amber-300 bg-slate-900 p-2 rounded border border-slate-800">
                    {qt.scoring}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{qt.strategy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2028 Strategic Verification Checkpoints */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              Strategic Verification Checkpoints (Road to 2028)
            </h3>
            <div className="space-y-3">
              {GATE_2028_VERIFICATION_CHECKPOINTS.map((cp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                        {cp.timeline}
                      </span>
                      <span className="text-xs font-bold text-white">{cp.milestone}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{cp.description}</p>
                  </div>
                  <div className="text-xs text-emerald-300 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
                    {cp.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: ERROR BOOK (1-3-7-14-30 SPACED REVIEW) */}
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
            <div className="flex items-center gap-2">
              {errorBook.length === 0 && (
                <button
                  onClick={loadSampleErrors}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
                >
                  Load Sample Trap Templates
                </button>
              )}
              <button
                onClick={() => setShowAddErrorModal(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/20"
              >
                <Plus className="w-4 h-4" />
                Log New Mistake
              </button>
            </div>
          </div>

          {/* Empty State */}
          {errorBook.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Error Book Clean (Day 0 Slate)</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  You have not logged any mistakes yet. As you solve GATE PYQs, enter tricky traps here to schedule automatic 1, 3, 7, 14, and 30-day reviews.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={loadSampleErrors}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700"
                >
                  Load 2 Example Traps
                </button>
                <button
                  onClick={() => setShowAddErrorModal(true)}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold"
                >
                  Log Your First Mistake
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                {['all', 'Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setErrorCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-lg font-mono font-medium transition-all ${
                      errorCategoryFilter === cat 
                        ? 'bg-rose-500 text-white font-bold' 
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {cat === 'all' ? 'All Errors' : cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredErrors.map((err) => (
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
            </div>
          )}

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

      {/* SUBTAB 6: PYQ & TEST ENGINE */}
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

          {/* Virtual Calculator Commandments */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Official Virtual Calculator Commandments
            </h3>
            <p className="text-xs text-slate-300">
              GATE uses an on-screen TCS iON calculator without a physical keypad. Practice these strict habits:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {GATE_EXAM_SPECIFICATION.virtual_calculator_rules.map((rule, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-2">
                  <span className="text-amber-400 font-mono font-bold mt-0.5">{idx + 1}.</span>
                  <span className="text-slate-300">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
