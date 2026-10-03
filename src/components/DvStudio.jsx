import React, { useState } from 'react';
import { 
  Cpu, GitBranch, Terminal, Shield, CheckCircle2, ChevronRight, 
  Layers, Code2, FolderGit2, Play, ExternalLink, Sparkles, BookOpen
} from 'lucide-react';
import { DV_ROADMAP_STAGES } from '../data/careerData';

export function DvStudio() {
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);
  const selectedStage = DV_ROADMAP_STAGES[selectedStageIdx];

  const projectLadder = [
    {
      level: "Beginner",
      title: "Self-Checking 4-bit ALU & Status Register",
      tech: "Verilog HDL + Basic Testbench",
      timing: "Sem 2-1 (Nov 2026)",
      deliverables: ["Synthesizable RTL ALU", "Automated self-checking testbench", "Edge case assertion of overflow flag"],
      completed: true
    },
    {
      level: "Intermediate 1",
      title: "Dual-Clock Asynchronous FIFO with Gray Pointers",
      tech: "Verilog / SystemVerilog + CDC Synchronizers",
      timing: "Sem 2-2 (May 2027)",
      deliverables: ["2-FF Gray code pointer synchronization", "Full/Empty condition boundary checks", "Multi-frequency clock domain simulation"],
      completed: false
    },
    {
      level: "Intermediate 2",
      title: "Configurable Full-Duplex UART with Constrained Random Testbench",
      tech: "SystemVerilog OOP + Mailboxes + Scoreboard",
      timing: "Sem 3-1 (Oct 2027)",
      deliverables: ["Layered testbench (Driver, Monitor, Scoreboard)", "Parity & Framing error injection", "Randomized baud rate generator"],
      completed: false
    },
    {
      level: "Advanced",
      title: "ARM AMBA APB Master & Slave Verification IP (VIP)",
      tech: "SystemVerilog + SVA Assertions + Functional Coverage",
      timing: "Sem 3-2 (Post-GATE 2028: Apr 2028)",
      deliverables: ["Full APB state machine protocol checker", "Concurrent SVA assertions for PSLVERR & PENABLE timing", "100% Functional & Code Coverage Report"],
      completed: false
    },
    {
      level: "Capstone",
      title: "Full UVM Verification Environment for AXI-to-APB Bridge",
      tech: "UVM 1.2 + Virtual Sequencers + TLM Scoreboard + CI Regressions",
      timing: "Sem 4-1 (Nov 2028)",
      deliverables: ["UVM Agent hierarchy (AXI Master agent + APB Slave agent)", "Automated Makefile regression scripts", "GitHub portfolio dossier with waveforms & bug detection logs"],
      completed: false
    }
  ];

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
              <span className="text-xs text-slate-400 font-mono">Industry Target: Core VLSI DV Engineer</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-indigo-400" />
              VLSI Design Verification (DV) Studio
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              From Digital Logic fundamentals to Synthesizable RTL, SystemVerilog OOP, SVA Assertions, APB/AXI Protocols, and full UVM Capstones.
              Sequenced to support your college coursework without sabotaging GATE 2028 prep.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 shrink-0">
            <div>Current Stage: <span className="text-indigo-400 font-bold">Stage 1 (Digital Fundamentals)</span></div>
            <div>Target Capstone: <span className="text-amber-400 font-bold">UVM AXI-to-APB VIP</span></div>
          </div>
        </div>
      </div>

      {/* Main Layout: 16 Stages Master Ladder & Interactive Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Stages List (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2 max-h-[720px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">16-Stage Progression</span>
            <span className="text-[10px] font-mono text-indigo-400 font-bold">Sem 2-1 &rarr; Sem 4-2</span>
          </div>

          {DV_ROADMAP_STAGES.map((stg, idx) => {
            const isSelected = selectedStageIdx === idx;
            return (
              <button
                key={stg.stage}
                onClick={() => setSelectedStageIdx(idx)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 select-none ${
                  isSelected 
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md ring-1 ring-indigo-500' 
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                  isSelected ? 'bg-indigo-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {stg.stage}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate leading-tight mb-1 text-slate-200">
                    {stg.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                    <span>{stg.timeframe}</span>
                    <span>•</span>
                    <span className={stg.status === 'in_progress' ? 'text-amber-400' : 'text-slate-500'}>
                      {stg.status === 'in_progress' ? 'Active Now' : 'Queued'}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-400 translate-x-1' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Stage Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                STAGE {selectedStage.stage} OF 16
              </span>
              <span className="text-xs text-slate-400 font-mono">Timeline: {selectedStage.timeframe}</span>
            </div>
            <h2 className="text-lg font-bold text-white">{selectedStage.title}</h2>
            <div className="text-xs text-slate-400 mt-1">
              Prerequisites: <strong className="text-slate-300 font-semibold">{selectedStage.prerequisites}</strong>
            </div>
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
            GitHub Portfolio Target
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {projectLadder.map((proj, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                proj.completed 
                  ? 'bg-emerald-950/20 border-emerald-500/30' 
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Tier {idx + 1} • {proj.level}
                  </span>
                  {proj.completed && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  )}
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
              </div>

              <div className="pt-2 border-t border-slate-800/60">
                <button 
                  className={`w-full py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-all ${
                    proj.completed 
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  {proj.completed ? 'View Specs & Code' : 'Locked (Pending Track)'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layered Testbench Architecture Diagram Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          The Standard Layered Verification Architecture
        </h3>
        <p className="text-xs text-slate-300">
          This is the universal mental model of every testbench you will construct in SystemVerilog and UVM:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
          <pre className="text-slate-300 leading-relaxed">
{`+-------------------------------------------------------------------------------------------------+
|                                    TESTBENCH ENVIRONMENT (ENV)                                  |
|                                                                                                 |
|   +-------------------+        +-------------------+        +-------------------------------+   |
|   | GENERATOR / SEQ   | -----> |      DRIVER       | -----> |       VIRTUAL INTERFACE       |   |
|   | (Creates Packets) | [Mbox] | (Drives Pin Wigg) |        |    (Clocking Block Skew Sync) |   |
|   +-------------------+        +-------------------+        +---------------+---------------+   |
|                                                                             |                   |
|                                                                             v                   |
|   +----------------------------------------------------+        +-----------+---------------+   |
|   |                 SCOREBOARD                         | <----- |          MONITOR          |   |
|   | (Golden Predictor + Automatic Check vs Expected)   | [TLM]  | (Samples DUT Pins via IF) |   |
|   +----------------------------------------------------+        +---------------------------+   |
|                                                                             |                   |
|   +----------------------------------------------------+                    v                   |
|   |            FUNCTIONAL COVERAGE SUBSCRIBER          | <------- [DUT: Device Under Test]      |   |
|   | (Covergroups, Bins, Cross Coverage closure)        |                                        |   |
|   +----------------------------------------------------+                                        |   |
+-------------------------------------------------------------------------------------------------+`}
          </pre>
        </div>
      </div>
    </div>
  );
}
