import React from 'react';
import { 
  Compass, Calendar, Award, Target, Cpu, CheckCircle2, 
  ArrowRight, ShieldCheck, Flag, GitFork, AlertTriangle
} from 'lucide-react';

export function MasterJourney() {
  const semesters = [
    {
      sem: "Sem 2-1 (Current)",
      timeframe: "October 2026 – November 2026",
      status: "active",
      badge: "Foundation & Overlap Anchor",
      academic_focus: "Digital Logic Design (+ Lab), Control Systems, DSP (+ Lab), IoT. CGPA Target: >= 8.2",
      gate_mission: "Complete 100% GATE Digital Circuits syllabus + Linear Algebra + Transfer Functions in Control.",
      dv_mission: "Stage 1 & 2: Setup/Hold times, Metastability, FSM architectures in Verilog.",
      english_focus: "Establish 90-second technical concept-aloud daily habit (zero filler words).",
      japanese_focus: "Kana mastery (Hiragana + Katakana) + 500 core N5 vocabulary words.",
      exit_deliverable: "Flawless score on DLD & Control college exams + 100 solved GATE PYQs."
    },
    {
      sem: "Sem 2-2",
      timeframe: "December 2026 – May 2027",
      status: "upcoming",
      badge: "Circuits & RTL Synthesis",
      academic_focus: "Networks Theory, Electronic Devices (EDC), Analog Circuits. CGPA Target: >= 8.2",
      gate_mission: "Conquer Networks (Theorems, Transients) + Electronic Devices (MOSFET physics) + Signals & Systems.",
      dv_mission: "Stage 3 & 4: Synthesizable Verilog HDL + Dual-Clock Asynchronous FIFO project with CDC synchronizers.",
      english_focus: "Deliver 2-minute verbal RTL simulation waveform and bug debugging walkthroughs.",
      japanese_focus: "Genki I Grammar / Tae Kim's basic grammar + 80 N5 Kanji + 800 total words.",
      exit_deliverable: "Dual-Clock FIFO Verilog project on GitHub + 400 solved GATE PYQs."
    },
    {
      sem: "Sem 3-1",
      timeframe: "June 2027 – November 2027",
      status: "upcoming",
      badge: "Syllabus Conquest & SV OOP",
      academic_focus: "Communications, Electromagnetics (EMFT), Microprocessors / Embedded.",
      gate_mission: "Finish remaining GATE subjects (Analog Circuits, Communications, EMFT, Calculus & Probability). 100% Syllabus Coverage.",
      dv_mission: "Stage 5, 6 & 7: SystemVerilog for Verification, OOP principles, Constrained Random Verification.",
      english_focus: "Full behavioral & technical interview answer structure (STAR method).",
      japanese_focus: "Appear for official JLPT N5 in December 2027. Begin N4 transition.",
      exit_deliverable: "100% GATE Syllabus finished by November 30, 2027. Layered SV UART Testbench."
    },
    {
      sem: "GATE 2028 War Peak",
      timeframe: "December 2027 – February 2028",
      status: "critical",
      badge: "THE PRIMARY TARGET",
      academic_focus: "College break / Minimal distraction. 100% dedicated to GATE 2028.",
      gate_mission: "15 Full-length Computer Based Mock Tests + 25-Year PYQ re-runs + Error Book spaced review.",
      dv_mission: "Paused / 30m weekly maintenance only to preserve mental momentum.",
      english_focus: "Maintenance (5 mins daily reflection).",
      japanese_focus: "10 words/day streak saver (7 mins daily).",
      exit_deliverable: "APPEAR FOR GATE ECE 2028 (Target: AIR < 300 / 70+ Marks)."
    },
    {
      sem: "Sem 3-2",
      timeframe: "February 2028 – May 2028",
      status: "upcoming",
      badge: "Post-GATE DV Surge",
      academic_focus: "VLSI Design, Advanced Digital Systems. GATE 2028 Result Evaluation.",
      gate_mission: "GATE 2028 Results declared. Decision checkpoint (Option A vs Option B).",
      dv_mission: "Stage 8, 9 & 10: SVA Assertions, Functional Coverage closure, APB Protocol VIP.",
      english_focus: "Live technical presentation skills and group discussion fluency.",
      japanese_focus: "JLPT N4 core grammar and vocabulary accumulation.",
      exit_deliverable: "ARM APB Verification IP with 100% Functional Coverage on GitHub."
    },
    {
      sem: "Sem 4-1",
      timeframe: "June 2028 – November 2028",
      status: "upcoming",
      badge: "UVM Capstone & Placement Drive",
      academic_focus: "B.Tech Final Year Project Phase 1 + Core Semiconductor Campus/Off-Campus Drives.",
      gate_mission: "If GATE 2028 rank is sufficient: Done! If improvement needed: Execute GATE 2029 contingency plan.",
      dv_mission: "Stage 11, 12, 13 & 14: Full UVM 1.2 AXI-to-APB Bridge Verification Environment with regression suite.",
      english_focus: "30-minute mock technical and HR interview simulations with industry mentors.",
      japanese_focus: "JLPT N4 certification attempt. Bridge towards N3.",
      exit_deliverable: "Production-grade Capstone UVM project dossier + High-impact VLSI DV Resume."
    },
    {
      sem: "Sem 4-2",
      timeframe: "December 2028 – May 2029",
      status: "upcoming",
      badge: "Career Launch & Graduation",
      academic_focus: "B.Tech Final Thesis & Degree Completion at RGUKT RK Valley. CGPA >= 8.0.",
      gate_mission: "Optional GATE 2029 improvement exam (if opted) or M.Tech admission counseling.",
      dv_mission: "Transition to Core VLSI DV Engineer role / Internship conversion.",
      english_focus: "Professional workplace communication and cross-cultural engineering collaboration.",
      japanese_focus: "Conversational Japanese proficiency (N3 practical).",
      exit_deliverable: "Graduation with First Class with Distinction + Core VLSI job offer."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            STRATEGIC MASTER TIMELINE
          </span>
          <span className="text-xs text-slate-400 font-mono">October 2026 &rarr; June 2029</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Compass className="w-6 h-6 text-emerald-400" />
          The Empire Progression Journey
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Not a static calendar, but an evolutionary pathway. Every phase answers: Why am I doing this, what do I master, and what career gate does it unlock?
        </p>
      </div>

      {/* Semester by Semester Progression Deck */}
      <div className="space-y-4">
        {semesters.map((item, idx) => (
          <div 
            key={idx}
            className={`rounded-2xl border p-5 transition-all space-y-4 ${
              item.status === 'active' 
                ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-500/40 shadow-xl ring-1 ring-indigo-500/20' :
              item.status === 'critical'
                ? 'bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border-amber-500/40' :
                'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  item.status === 'active' ? 'bg-indigo-500 text-slate-950' :
                  item.status === 'critical' ? 'bg-amber-500 text-slate-950' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                    {item.sem}
                    <span className="text-xs text-slate-400 font-normal">({item.timeframe})</span>
                  </h3>
                </div>
              </div>

              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border self-start sm:self-auto ${
                item.status === 'active' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' :
                item.status === 'critical' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse' :
                'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {item.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">1. GATE Focus</span>
                <p className="text-slate-300 leading-snug">{item.gate_mission}</p>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase block">2. VLSI DV Track</span>
                <p className="text-slate-300 leading-snug">{item.dv_mission}</p>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono font-bold text-sky-400 uppercase block">3. English Habit</span>
                <p className="text-slate-300 leading-snug">{item.english_focus}</p>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase block">4. Japanese Goal</span>
                <p className="text-slate-300 leading-snug">{item.japanese_focus}</p>
              </div>
            </div>

            <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Flag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Semester Exit Criterion: <strong className="text-emerald-300 font-semibold">{item.exit_deliverable}</strong></span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Academic: {item.academic_focus}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GATE 2029 Contingency Decision Engine */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <GitFork className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-base font-bold text-white">The Post-GATE 2028 Decision Matrix (GATE 2029 Contingency)</h3>
            <p className="text-xs text-slate-400">Do NOT make GATE 2029 your primary plan. Treat it strictly as a conditional branch based on March 2028 results.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-emerald-400 uppercase">BRANCH A: GATE 2028 SCORE &ge; 68 (AIR &lt; 500)</span>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">MISSION ACCOMPLISHED</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Your 3rd-year GATE score is valid for 3 years for IIT/IISc admissions and selected PSUs.
            </p>
            <div className="space-y-1 font-mono text-[11px] text-slate-400 pt-2 border-t border-emerald-500/20">
              <div>&bull; Action: Freeze GATE preparation entirely.</div>
              <div>&bull; Redirect 100% of study time to Stage 11–14 (UVM Capstone &amp; AXI Verification).</div>
              <div>&bull; Enter 4th-year placements with an untouchable dual profile: Top GATE Rank + Deep UVM Portfolio.</div>
            </div>
          </div>

          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-amber-400 uppercase">BRANCH B: GATE 2028 EXPOSES WEAKNESSES</span>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">TACTICAL CONTINGENCY</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Analyze the precise error post-mortem. You do NOT start from scratch; you only repair the diagnostic gaps identified in the test.
            </p>
            <div className="space-y-1 font-mono text-[11px] text-slate-400 pt-2 border-t border-amber-500/20">
              <div>&bull; Action: Maintain dual-track (60% DV Capstones + 40% Targeted GATE Weakness Remediation).</div>
              <div>&bull; Retake GATE in 4th Year (GATE 2029) with battle-hardened exam temperament.</div>
              <div>&bull; You remain fully protected because your DV portfolio guarantees core industry readiness regardless.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
