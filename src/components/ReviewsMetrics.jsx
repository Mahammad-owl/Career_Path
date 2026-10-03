import React, { useState } from 'react';
import { 
  BarChart3, CheckSquare, Download, Upload, Calendar, 
  HelpCircle, Sparkles, TrendingUp, AlertCircle, FileText,
  RotateCcw, ShieldAlert, Check
} from 'lucide-react';
import { INITIAL_USER_STATE } from '../data/careerData';

export function ReviewsMetrics({ state, updateState }) {
  const [reviewCadence, setReviewCadence] = useState('weekly'); // weekly | monthly | quarterly

  const weeklyReview = state.weekly_review || {
    mastered: "",
    struggled: "",
    error_pattern: "",
    next_action: ""
  };

  const updateWeeklyField = (field, val) => {
    updateState({
      ...state,
      weekly_review: {
        ...weeklyReview,
        [field]: val
      }
    });
  };

  const exportDataJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `riyaz_career_os_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJSON = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.profile && parsed.today) {
          updateState(parsed);
          alert("Career Operating System restored successfully!");
        } else {
          alert("Invalid backup file format.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0]);
    }
  };

  const resetToDayZero = () => {
    if (window.confirm("Are you sure you want to reset all progress back to Day 0 Clean Slate? This will clear streaks, tasks, and syllabus progress.")) {
      updateState(INITIAL_USER_STATE);
      alert("System reset to Day 0 Clean Slate!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                CONTINUOUS FEEDBACK LOOPS &amp; DIAGNOSTICS
              </span>
              <span className="text-xs text-slate-400 font-mono">No Delusion &bull; Data-Driven Review</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              Strategic Reviews &amp; Metrics Engine
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              "Am I actually progressing, or just feeling busy?" Every week, month, and quarter, this engine forces honest self-calibration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={exportDataJSON}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all border border-slate-700 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Export Backup
            </button>
            <label className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer shadow-sm">
              <Upload className="w-3.5 h-3.5" />
              Restore Backup
              <input type="file" accept=".json" onChange={importDataJSON} className="hidden" />
            </label>
            <button
              onClick={resetToDayZero}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-300 flex items-center gap-1.5 transition-all border border-rose-500/30"
              title="Reset state to initial clean slate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Day 0
            </button>
          </div>
        </div>
      </div>

      {/* Cadence Selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setReviewCadence('weekly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            reviewCadence === 'weekly' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Weekly Reflection (Every Sunday)
        </button>
        <button
          onClick={() => setReviewCadence('monthly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            reviewCadence === 'monthly' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Monthly Audit (Last Day of Month)
        </button>
        <button
          onClick={() => setReviewCadence('quarterly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            reviewCadence === 'quarterly' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          Quarterly Reassessment (Every 3 Months)
        </button>
      </div>

      {/* REVIEW FORM: WEEKLY */}
      {reviewCadence === 'weekly' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                Sunday Weekly Post-Mortem &amp; Alignment Protocol
              </h3>
              <p className="text-xs text-slate-400">
                Spend 15 minutes every Sunday night answering these 4 questions honestly. Saved directly to device storage.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Live Auto-Save
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                1. What specific concepts can I now solve without checking solutions or theory notes?
              </label>
              <textarea 
                rows={2}
                value={weeklyReview.mastered || ""}
                onChange={e => updateWeeklyField('mastered', e.target.value)}
                placeholder="e.g. Solved 10 MUX PYQs without hesitation. Understood Cayley-Hamilton inverse matrix shortcut."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                2. Where did I stumble or feel anxious when solving GATE-level problems?
              </label>
              <textarea 
                rows={2}
                value={weeklyReview.struggled || ""}
                onChange={e => updateWeeklyField('struggled', e.target.value)}
                placeholder="e.g. Asynchronous ripple counter delay accumulation. Rushed NAT questions without verifying units."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                3. What recurring mistake pattern appeared in the Error Book this week?
              </label>
              <textarea 
                rows={2}
                value={weeklyReview.error_pattern || ""}
                onChange={e => updateWeeklyField('error_pattern', e.target.value)}
                placeholder="e.g. Confused trace (sum) with determinant (product) of eigenvalues. Need to slow down at final arithmetic step."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                4. What single tactical adjustment must I make for the upcoming week?
              </label>
              <textarea 
                rows={2}
                value={weeklyReview.next_action || ""}
                onChange={e => updateWeeklyField('next_action', e.target.value)}
                placeholder="e.g. Dedicate 45 minutes on Tuesday exclusively to sequential counter timing calculations."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-500">
              <span>All reflection responses persist in your browser backup.</span>
              <button 
                onClick={() => alert("Sunday reflection saved successfully!")}
                className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs shadow-md"
              >
                Save Sunday Reflection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW FORM: MONTHLY */}
      {reviewCadence === 'monthly' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              Monthly Diagnostic Audit (October 2026 Checkpoint)
            </h3>
            <p className="text-xs text-slate-400">
              Audit the 4-pillar velocity against monthly milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 font-mono">GATE Velocity Check</div>
              <p className="text-slate-300">Target for October 2026: Complete Linear Algebra (Math) + Combinational &amp; Sequential Circuits (DLD).</p>
              <div className="text-[11px] text-slate-400 font-mono">Status: {state.streaks.total_pyqs_solved} / 120 Target PYQs solved.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-400 font-mono">DV Progression Check</div>
              <p className="text-slate-300">Target for October 2026: Complete Stage 1 (Setup/Hold timing and FSM models on paper).</p>
              <div className="text-[11px] text-slate-400 font-mono">Status: Stage {(state.active_dv_stage || 0) + 1} Active (Aligned with DLD lab).</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-400 font-mono">English Verbal Streak Check</div>
              <p className="text-slate-300">Target: Explain 20 technical topics aloud in English without notes.</p>
              <div className="text-[11px] text-slate-400 font-mono">Status: {state.streaks.english_days} Consecutive Days Logged.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-rose-400 font-mono">Japanese 10 Words/Day Pace Check</div>
              <p className="text-slate-300">Target: Master 300 words by month end (10 words daily).</p>
              <div className="text-[11px] text-slate-400 font-mono">Status: {(state.japanese_mastered_ids || []).length} Words Mastered ({state.streaks.japanese_days} Days Logged).</div>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW FORM: QUARTERLY */}
      {reviewCadence === 'quarterly' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Quarterly Empire Reassessment (Every 3 Months)
            </h3>
            <p className="text-xs text-slate-400">
              High-level strategic audit. Are we building genuine career assets or drifting?
            </p>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">1. College CGPA Health Check</strong>
              Is CGPA strictly maintained &ge; 8.0? Remember: Core semiconductor companies require high cutoffs to even interview.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">2. GATE 2028 Horizon Check</strong>
              Is syllabus coverage tracking toward 100% completion by November 2027?
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-0.5">3. Practical DV Evidence Check</strong>
              Are code repositories and testbench simulation reports being uploaded to GitHub, or only theory?
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
