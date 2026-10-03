import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Globe, Mic, Volume2, CheckCircle2, RotateCcw, 
  Play, Pause, Award, BookOpen, Sparkles, ChevronRight, Flame,
  Check, FileText, Compass, Layers, PenTool
} from 'lucide-react';
import { 
  ENGLISH_VERBAL_PROMPTS, 
  JAPANESE_CORE_VOCABULARY,
  JAPANESE_KANA_SYSTEM,
  JAPANESE_JLPT_ROADMAP,
  ENGLISH_MILESTONES
} from '../data/careerData';

export function LanguageWing({ state, updateState }) {
  const [activeLanguage, setActiveLanguage] = useState('english'); // english | japanese
  const [japaneseSubView, setJapaneseSubView] = useState('vault'); // vault | kana | roadmap

  // English 90s Verbal Challenge State
  const [promptIdx, setPromptIdx] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const currentPrompt = ENGLISH_VERBAL_PROMPTS[promptIdx] || ENGLISH_VERBAL_PROMPTS[0];

  useEffect(() => {
    let interval = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const resetTimer = () => {
    setTimerActive(false);
    setTimerSeconds(90);
  };

  const markEnglishDone = () => {
    const updatedTasks = (state.today?.tasks || []).map(t => 
      t.pillar === 'English' ? { ...t, done: true } : t
    );
    const newStreak = (state.streaks?.english_days || 0) + 1;
    updateState({
      ...state,
      streaks: {
        ...state.streaks,
        english_days: newStreak
      },
      today: {
        ...state.today,
        english_done: true,
        tasks: updatedTasks
      }
    });
    alert("🎉 Excellent! 90-second technical speaking drill completed and streak updated.");
  };

  // Japanese Persistent State
  const masteredIds = state.japanese_mastered_ids || [];
  const [vocabFilter, setVocabFilter] = useState('all'); // all | mastered | pending
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeKanaType, setActiveKanaType] = useState('hiragana'); // hiragana | katakana

  const toggleVocabMastery = (id) => {
    let updatedMastered;
    if (masteredIds.includes(id)) {
      updatedMastered = masteredIds.filter(i => i !== id);
    } else {
      updatedMastered = [...masteredIds, id];
    }
    updateState({
      ...state,
      japanese_mastered_ids: updatedMastered
    });
  };

  const markJapaneseDayDone = () => {
    const updatedTasks = (state.today?.tasks || []).map(t => 
      t.pillar === 'Japanese' ? { ...t, done: true } : t
    );
    const newStreak = (state.streaks?.japanese_days || 0) + 1;
    updateState({
      ...state,
      streaks: {
        ...state.streaks,
        japanese_days: newStreak
      },
      today: {
        ...state.today,
        japanese_done: true,
        tasks: updatedTasks
      }
    });
    alert("🎌 Sugoi! Daily Japanese study logged to your verified streak.");
  };

  const masteredCount = masteredIds.length;
  const filteredVocab = JAPANESE_CORE_VOCABULARY.filter(v => {
    const isMastered = masteredIds.includes(v.id);
    if (vocabFilter === 'mastered') return isMastered;
    if (vocabFilter === 'pending') return !isMastered;
    return true;
  });

  const currentFlashcard = filteredVocab[flashcardIndex] || filteredVocab[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                PILLARS 3 &amp; 4: CONTINUOUS DAILY MICRO-HABITS
              </span>
              <span className="text-xs text-slate-400 font-mono">10 Mins Daily &bull; Zero Fluff &bull; Persistent Storage</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Globe className="w-6 h-6 text-sky-400" />
              Language &amp; Communication Wing
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Master the ability to confidently explain complex technical concepts in English for top-tier semiconductor interviews, 
              while accumulating sustainable Japanese proficiency (JLPT N5 &rarr; N1) at 10 words/day.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveLanguage('english')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeLanguage === 'english' ? 'bg-sky-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              English (90s Feynman Drill)
            </button>
            <button
              onClick={() => setActiveLanguage('japanese')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeLanguage === 'japanese' ? 'bg-rose-500 text-white font-bold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Japanese Dojo ({masteredCount}/800 N5)
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: ENGLISH COMMUNICATION SYSTEM */}
      {activeLanguage === 'english' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* The 90s Feynman Speaking Studio (2 cols) */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Mic className="w-4 h-4 text-sky-400" />
                    Daily 90-Second Technical Speaking Challenge
                  </h3>
                  <p className="text-xs text-slate-400">
                    Rule: Explain the concept aloud in English to an imaginary interviewer. No filler sounds, no hesitation.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPromptIdx((promptIdx + 1) % ENGLISH_VERBAL_PROMPTS.length);
                      resetTimer();
                    }}
                    className="px-3 py-1 rounded-lg border border-slate-700 hover:border-slate-500 text-xs text-slate-300 font-medium"
                  >
                    Next Prompt &rarr;
                  </button>
                  <button
                    onClick={markEnglishDone}
                    className="px-3 py-1 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1"
                    title="Mark challenge done and log streak"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Complete (+1d)
                  </button>
                </div>
              </div>

              {/* Active Prompt Box */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold uppercase">
                    {currentPrompt.pillar}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Prompt #{promptIdx + 1} of {ENGLISH_VERBAL_PROMPTS.length}</span>
                </div>

                <h4 className="text-sm md:text-base font-bold text-white leading-relaxed">
                  "{currentPrompt.prompt}"
                </h4>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-xs text-slate-400 mr-1 self-center">Mandatory Technical Keywords:</span>
                  {currentPrompt.key_terms.map((term, idx) => (
                    <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-slate-800">
                      {term}
                    </span>
                  ))}
                </div>
              </div>

              {/* Countdown Timer Control */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-black font-mono text-white tracking-wider">
                    00:{String(timerSeconds).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-slate-400">
                    {timerActive ? 'Speaking in progress... Deliver without hesitation!' : timerSeconds === 0 ? 'Time up! Review benchmark below.' : '90-second speech window'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!timerActive ? (
                    <button
                      onClick={() => setTimerActive(true)}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      Start Speaking (90s)
                    </button>
                  ) : (
                    <button
                      onClick={() => setTimerActive(false)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Pause className="w-3.5 h-3.5 fill-slate-950" />
                      Pause
                    </button>
                  )}
                  <button
                    onClick={resetTimer}
                    className="p-2 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sample Answer Benchmark */}
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Model Executive Answer (Audio Benchmark)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{currentPrompt.sample_answer_bullet}"
                </p>
              </div>

              {/* Written Sentence Refinement & Reflection */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-sky-400" />
                    Sentence Formation &amp; Technical Grammar (3 Mins Daily)
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Auto-saved to device</span>
                </div>
                <textarea
                  value={state.daily_notes || ""}
                  onChange={(e) => updateState({ ...state, daily_notes: e.target.value })}
                  placeholder="Write a concise 2-sentence technical summary in English of today's study (e.g., 'Today I derived the maximum power transfer theorem for complex impedance...')"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50"
                  rows={2}
                />
              </div>
            </div>

            {/* Right: English Communication Milestones */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-sky-400" />
                Communication Progression Milestones
              </h3>

              <div className="space-y-3">
                {ENGLISH_MILESTONES.map((m) => (
                  <div key={m.milestone} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Milestone {m.milestone}: {m.title}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        m.status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500'
                      }`}>
                        {m.timeframe}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {m.goal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: JAPANESE LANGUAGE SYSTEM */}
      {activeLanguage === 'japanese' && (
        <div className="space-y-6">
          {/* Top Japanese Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs text-slate-400">Streak &amp; Habit</div>
              <div className="text-base font-bold text-white font-mono">{state.streaks?.japanese_days || 0} Days Active</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs text-slate-400">Daily Target Pace</div>
              <div className="text-base font-bold text-rose-400 font-mono">10 Words / Day</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs text-slate-400">Mastered Words (N5)</div>
              <div className="text-base font-bold text-emerald-400 font-mono">{masteredCount} / 800 Target</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs text-slate-400">Target Milestone</div>
              <div className="text-base font-bold text-amber-400 font-mono">JLPT N5 (Dec 2027)</div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setJapaneseSubView('vault')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  japaneseSubView === 'vault' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Vocabulary Vault &amp; Flashcards
              </button>
              <button
                onClick={() => setJapaneseSubView('kana')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  japaneseSubView === 'kana' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                46-Character Kana Studio
              </button>
              <button
                onClick={() => setJapaneseSubView('roadmap')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  japaneseSubView === 'roadmap' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                JLPT N5 &rarr; N1 Pipeline
              </button>
            </div>

            <button
              onClick={markJapaneseDayDone}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Log Daily 10 Words (+1d)
            </button>
          </div>

          {/* SUBVIEW 1: VOCAB VAULT & FLASHCARDS */}
          {japaneseSubView === 'vault' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Flashcard Simulator (1 col) */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">Interactive Flashcard</h3>
                    <span className="text-[10px] font-mono text-slate-400">#{flashcardIndex + 1} of {filteredVocab.length}</span>
                  </div>

                  {currentFlashcard && (
                    <div 
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="cursor-pointer bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-3 min-h-[220px] flex flex-col items-center justify-center transition-all hover:border-rose-500/40"
                    >
                      <div className="text-4xl font-black text-white font-mono">{currentFlashcard.kanji}</div>
                      <div className="text-base text-rose-300 font-medium">{currentFlashcard.kana}</div>
                      
                      {showAnswer ? (
                        <div className="pt-2 border-t border-slate-800/80 space-y-1 animate-fadeIn">
                          <div className="text-xs text-slate-400 font-mono">[{currentFlashcard.romaji}]</div>
                          <div className="text-sm font-bold text-emerald-400">{currentFlashcard.meaning}</div>
                          <span className="text-[10px] text-slate-500">{currentFlashcard.category}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500 italic pt-2">Click to flip card</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  {currentFlashcard && (
                    <button
                      onClick={() => toggleVocabMastery(currentFlashcard.id)}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all border ${
                        masteredIds.includes(currentFlashcard.id)
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      {masteredIds.includes(currentFlashcard.id) ? '✓ Mastered' : 'Mark as Mastered'}
                    </button>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setFlashcardIndex(prev => (prev > 0 ? prev - 1 : filteredVocab.length - 1));
                        setShowAnswer(false);
                      }}
                      className="w-1/2 py-2 rounded-xl border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300"
                    >
                      &larr; Previous
                    </button>
                    <button
                      onClick={() => {
                        setFlashcardIndex(prev => (prev + 1) % filteredVocab.length);
                        setShowAnswer(false);
                      }}
                      className="w-1/2 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold"
                    >
                      Next &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Vocabulary Table (2 cols) */}
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">JLPT N5 Core Vocabulary Vault</h3>
                    <p className="text-xs text-slate-400">10 words per day added sustainably without interfering with GATE.</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <button
                      onClick={() => setVocabFilter('all')}
                      className={`px-2.5 py-1 rounded-lg ${vocabFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
                    >
                      All ({JAPANESE_CORE_VOCABULARY.length})
                    </button>
                    <button
                      onClick={() => setVocabFilter('mastered')}
                      className={`px-2.5 py-1 rounded-lg ${vocabFilter === 'mastered' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-slate-400'}`}
                    >
                      Mastered ({masteredCount})
                    </button>
                    <button
                      onClick={() => setVocabFilter('pending')}
                      className={`px-2.5 py-1 rounded-lg ${vocabFilter === 'pending' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400'}`}
                    >
                      Pending ({JAPANESE_CORE_VOCABULARY.length - masteredCount})
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-[440px] overflow-y-auto">
                  {filteredVocab.map((v) => {
                    const isMastered = masteredIds.includes(v.id);
                    return (
                      <div 
                        key={v.id}
                        onClick={() => toggleVocabMastery(v.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isMastered 
                            ? 'bg-slate-950/60 border-slate-800/80 opacity-75' 
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-white font-mono text-base">
                            {v.kanji}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-200">
                              {v.kana} <span className="text-slate-500 font-normal font-mono text-[11px]">({v.romaji})</span>
                            </div>
                            <div className="text-xs text-rose-300 font-medium">{v.meaning}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">{v.category}</span>
                          <button 
                            className={`w-6 h-6 rounded-md flex items-center justify-center border text-xs font-bold ${
                              isMastered ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700 text-slate-500'
                            }`}
                          >
                            {isMastered ? '✓' : ''}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SUBVIEW 2: 46-CHARACTER KANA STUDIO */}
          {japaneseSubView === 'kana' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">46-Character Kana Foundation Studio</h3>
                  <p className="text-xs text-slate-400">Master all 46 Hiragana (phonetics) &amp; Katakana (foreign loanwords) within Phase A (Oct - Nov 2026).</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveKanaType('hiragana')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      activeKanaType === 'hiragana' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Hiragana (ひらがな)
                  </button>
                  <button
                    onClick={() => setActiveKanaType('katakana')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      activeKanaType === 'katakana' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Katakana (カタカナ)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {JAPANESE_KANA_SYSTEM.map((row) => (
                  <div key={row.row} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">{row.row}</span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {row.characters.map((char) => (
                        <div key={char.r} className="p-2 bg-slate-900 rounded-lg border border-slate-800/80 text-center hover:border-rose-500/40 transition-colors">
                          <div className="text-lg font-bold text-white font-mono">
                            {activeKanaType === 'hiragana' ? char.h : char.k}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{char.r}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBVIEW 3: JLPT N5 -> N1 PIPELINE */}
          {japaneseSubView === 'roadmap' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">JLPT Progression Pipeline (2026 – 2029)</h3>
                <p className="text-xs text-slate-400">Strictly 10–15 minutes/day. Provides the ultimate edge for Tokyo / global semiconductor firms.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {JAPANESE_JLPT_ROADMAP.map((p) => (
                  <div key={p.phase} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{p.phase}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        p.status === 'active' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        p.status === 'target' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-slate-900 text-slate-500'
                      }`}>
                        {p.timeframe}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-semibold">{p.target}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
