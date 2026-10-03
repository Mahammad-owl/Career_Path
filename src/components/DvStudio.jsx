import React, { useState } from 'react';
import { 
  Cpu, GitBranch, Terminal, Shield, CheckCircle2, ChevronRight, 
  Layers, Code2, FolderGit2, Play, ExternalLink, Sparkles, BookOpen,
  Link, Check, RotateCcw, Filter, Target
} from 'lucide-react';
import { DV_ROADMAP_STAGES, INITIAL_DV_PROJECTS } from '../data/careerData';

export function DvStudio({ state, updateState }) {
  const [selectedStageIdx, setSelectedStageIdx] = useState(state?.active_dv_stage || 0);
  const [phaseFilter, setPhaseFilter] = useState('all'); // all | rtl | sv | uvm | capstone
  const selectedStage = DV_ROADMAP_STAGES[selectedStageIdx] || DV_ROADMAP_STAGES[0];

  const dvProjects = state?.dv_projects && state.dv_projects.length > 0 ? state.dv_projects : INITIAL_DV_PROJECTS;

  const toggleProjectStatus = (projId) => {
    const updated = dvProjects.map(p => {
      if (p.id === projId) {
        const nextStatus = p.status === 'completed' ? 'not_started' : p.status === 'in_progress' ? 'completed' : 'in_progress';
        return { ...p, status: nextStatus, completed: nextStatus === 'completed' };
      }
      return p;
    });
    updateState({
      ...state,
      dv_projects: updated
    });
  };

  const updateProjectRepo = (projId, url) => {
    const updated = dvProjects.map(p => {
      if (p.id === projId) {
        return { ...p, repo_url: url };
      }
      return p;
    });
    updateState({
      ...state,
      dv_projects: updated
    });
  };

  const setCurrentFocusStage = (idx) => {
    updateState({
      ...state,
      active_dv_stage: idx
    });
  };

  const filteredStages = DV_ROADMAP_STAGES.filter(stg => {
    if (phaseFilter === 'rtl') return stg.stage >= 1 && stg.stage <= 4;
    if (phaseFilter === 'sv') return stg.stage >= 5 && stg.stage <= 10;
    if (phaseFilter === 'uvm') return stg.stage >= 11 && stg.stage <= 15;
    if (phaseFilter === 'capstone') return stg.stage >= 16 && stg.stage <= 18;
    return true;
  });

  const completedProjectsCount = dvProjects.filter(p => p.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PILLAR 2: TECHNICAL CAREER SPECIALIZATION
              </span>
              <span className="text-xs text-slate-400 font-mono">Industry Target: Core VLSI DV Engineer (Qualcomm, Intel, NVIDIA)</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-indigo-400" />
              VLSI Design Verification (DV) Studio
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Complete 18-stage roadmap from Digital Logic fundamentals to Synthesizable RTL, SystemVerilog OOP, SVA Assertions, APB/AXI Protocols, and full UVM Capstones.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 shrink-0">
            <div>Current Focus: <span className="text-indigo-400 font-bold">Stage {(state.active_dv_stage || 0) + 1} of 18</span></div>
            <div>Flagship Capstone: <span className="text-amber-400 font-bold">UVM AXI-to-APB VIP</span></div>
          </div>
        </div>
      </div>

      {/* Main Layout: 18 Stages Master Ladder & Interactive Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stages List (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 max-h-[760px] overflow-y-auto">
          <div className="flex flex-col gap-2 pb-2 border-b border-slate-800 px-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">18-Stage Progression</span>
              <span className="text-[10px] font-mono text-indigo-400 font-bold">Sem 2-1 &rarr; Sem 4-2</span>
            </div>
            {/* Phase Filters */}
            <div className="flex items-center gap-1 overflow-x-auto text-[10px] font-mono">
              <button
                onClick={() => setPhaseFilter('all')}
                className={`px-2 py-1 rounded transition-all ${phaseFilter === 'all' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-950 text-slate-400'}`}
              >
                All (18)
              </button>
              <button
                onClick={() => setPhaseFilter('rtl')}
                className={`px-2 py-1 rounded transition-all ${phaseFilter === 'rtl' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-950 text-slate-400'}`}
              >
                RTL (1-4)
              </button>
              <button
                onClick={() => setPhaseFilter('sv')}
                className={`px-2 py-1 rounded transition-all ${phaseFilter === 'sv' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-950 text-slate-400'}`}
              >
                SV OOP (5-10)
              </button>
              <button
                onClick={() => setPhaseFilter('uvm')}
                className={`px-2 py-1 rounded transition-all ${phaseFilter === 'uvm' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-950 text-slate-400'}`}
              >
                UVM (11-15)
              </button>
              <button
                onClick={() => setPhaseFilter('capstone')}
                className={`px-2 py-1 rounded transition-all ${phaseFilter === 'capstone' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-950 text-slate-400'}`}
              >
                Capstones (16-18)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            {filteredStages.map((stg) => {
              const actualIdx = DV_ROADMAP_STAGES.findIndex(s => s.stage === stg.stage);
              const isSelected = selectedStageIdx === actualIdx;
              const isCurrentFocus = (state.active_dv_stage || 0) === actualIdx;

              return (
                <button
                  key={stg.stage}
                  onClick={() => setSelectedStageIdx(actualIdx)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 select-none ${
                    isSelected 
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md ring-1 ring-indigo-500' 
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                    isSelected ? 'bg-indigo-500 text-slate-950' : isCurrentFocus ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {stg.stage}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate leading-tight mb-0.5 text-slate-200">
                      {stg.title}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                      <span>{stg.timeframe}</span>
                      {isCurrentFocus && (
                        <span className="text-amber-400 font-bold">• Active Focus</span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Stage Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  STAGE {selectedStage.stage} OF 18
                </span>
                <span className="text-xs text-slate-400 font-mono">{selectedStage.timeframe}</span>
              </div>
              <h2 className="text-lg font-bold text-white">{selectedStage.title}</h2>
              <div className="text-xs text-slate-400 mt-1">
                Prerequisites: <strong className="text-slate-300 font-semibold">{selectedStage.prerequisites}</strong>
              </div>
            </div>

            <button
              onClick={() => setCurrentFocusStage(selectedStageIdx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all self-start sm:self-auto border ${
                (state.active_dv_stage || 0) === selectedStageIdx
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500'
              }`}
            >
              {(state.active_dv_stage || 0) === selectedStageIdx ? '✓ Current Focus Stage' : 'Set as Current Focus'}
            </button>
          </div>

          {/* Topics Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Syllabus Topics &amp; Hardware Concepts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedStage.topics.map((top, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-400 font-mono text-[10px] mt-0.5">&bull;</span>
                  <span>{top}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Exercises */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              Mandatory Hands-On Coding Exercises
            </h4>
            <div className="space-y-1.5">
              {selectedStage.exercises.map((ex, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 font-mono">
                  {idx + 1}. {ex}
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Project & Exit Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
            <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1">
              <div className="text-[10px] font-mono font-bold text-indigo-300 uppercase">Stage Milestone Project</div>
              <div className="font-bold text-white text-xs">{selectedStage.project}</div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
              <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Stage Exit Verification Criteria</div>
              <div className="text-slate-300 text-xs leading-relaxed">{selectedStage.exit_criteria}</div>
            </div>
          </div>
        </div>
      </div>

      {/* The 5-Tier Project Ladder */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-400" />
              The 5-Tier Verification Project Ladder
            </h3>
            <p className="text-xs text-slate-400">
              Zero toy projects. Every project in this ladder introduces an essential industry concept (CDC, CRV, SVA, UVM) for your hiring portfolio.
            </p>
          </div>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20 font-semibold self-start sm:self-auto">
            {completedProjectsCount} / {dvProjects.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {dvProjects.map((proj, idx) => (
            <div 
              key={proj.id || idx}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                proj.status === 'completed' 
                  ? 'bg-emerald-950/20 border-emerald-500/30' 
                  : proj.status === 'in_progress'
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Tier {idx + 1} • {proj.level}
                  </span>
                  <button
                    onClick={() => toggleProjectStatus(proj.id)}
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-all ${
                      proj.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                        : proj.status === 'in_progress'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                    title="Click to toggle status: Not Started -> In Progress -> Completed"
                  >
                    {proj.status === 'completed' ? '✓ Mastered' : proj.status === 'in_progress' ? '⏳ Building' : '○ Not Started'}
                  </button>
                </div>

                <h4 className="text-xs font-bold text-white leading-snug">{proj.title}</h4>
                <div className="text-[11px] text-indigo-300 font-mono">{proj.tech}</div>
                <div className="text-[10px] text-slate-500 font-mono">Timing: {proj.timing}</div>

                <div className="space-y-1 pt-1 border-t border-slate-800/80">
                  {proj.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="text-[10px] text-slate-400 leading-tight">
                      &rarr; {del}
                    </div>
                  ))}
                </div>

                {/* GitHub Repo URL Input */}
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                    <Link className="w-3 h-3 text-indigo-400" />
                    <span>GitHub Repository URL:</span>
                  </div>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={proj.repo_url || ''}
                    onChange={(e) => updateProjectRepo(proj.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-[11px] text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                  {proj.repo_url && (
                    <a
                      href={proj.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-1 font-mono"
                    >
                      <ExternalLink className="w-2.5 h-2.5" /> Open GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
