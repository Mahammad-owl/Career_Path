import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Globe, Mic, Volume2, CheckCircle2, RotateCcw, 
  Play, Pause, Award, BookOpen, Sparkles, ChevronRight, Flame
} from 'lucide-react';
import { ENGLISH_VERBAL_PROMPTS, JAPANESE_CORE_VOCABULARY } from '../data/careerData';

export function LanguageWing({ state, updateState }) {
  const [activeLanguage, setActiveLanguage] = useState('english'); // english | japanese

  // English 90s Verbal Challenge State
  const [promptIdx, setPromptIdx] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const currentPrompt = ENGLISH_VERBAL_PROMPTS[promptIdx];

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

  // Japanese State
  const [vocabList, setVocabList] = useState(JAPANESE_CORE_VOCABULARY);
  const [vocabFilter, setVocabFilter] = useState('all'); // all | mastered | pending
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleVocabMastery = (id) => {
    setVocabList(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, mastered: !v.mastered };
      }
      return v;
    }));
  };

  const masteredCount = vocabList.filter(v => v.mastered).length;
  const filteredVocab = vocabList.filter(v => {
    if (vocabFilter === 'mastered') return v.mastered;
    if (vocabFilter === 'pending') return !v.mastered;
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
              <span className="text-xs text-slate-400 font-mono">Integrated &bull; Zero Fluff &bull; 10 Mins Daily</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Globe className="w-6 h-6 text-sky-400" />
              Language &amp; Communication Wing
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Master the ability to confidently explain complex technical concepts in English for interviews, 
              while building sustainable Japanese proficiency (JLPT N5 &rarr; N1) at 10 words/day.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveLanguage('english')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeLanguage === 'english' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              English (90s Verbal Drill)
            </button>
            <button
              onClick={() => setActiveLanguage('japanese')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeLanguage === 'japanese' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Japanese Dojo (10 words/day)
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
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Mic className="w-4 h-4 text-sky-400" />
                    Daily 90-Second Technical Speaking Challenge
                  </h3>
                  <p className="text-xs text-slate-400">
                    Rule: Explain the concept aloud in English to an imaginary interviewer. No filler sounds, no hesitation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setPromptIdx((promptIdx + 1) % ENGLISH_VERBAL_PROMPTS.length);
                    resetTimer();
                  }}
                  className="px-3 py-1 rounded-lg border border-slate-700 hover:border-slate-500 text-xs text-slate-300 font-medium"
                >
                  Next Prompt &rarr;
                </button>
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
                    {timerActive ? 'Speaking in progress...' : timerSeconds === 0 ? 'Time is up! Review sample below.' : 'Ready to record'}
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
                  Model Executive Answer (Audio Transcript)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{currentPrompt.sample_answer_bullet}"
                </p>
              </div>
            </div>

            {/* Right: English Communication Milestones */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Communication Progression Milestones
              </h3>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Phase 1: Daily Concept-Aloud</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Eliminate hesitation and regional filler words when explaining daily GATE &amp; DLD concepts aloud.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Phase 2: Simulation Waveform Walkthroughs</span>
                    <span className="text-[10px] font-mono text-slate-500">Sem 2-2</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Verbally explain race conditions, setup/hold margins, and simulation logs in clear technical sentences.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Phase 3: Mock Technical &amp; HR Interviews</span>
                    <span className="text-[10px] font-mono text-slate-500">Sem 4-1</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    30-minute structured mock interviews covering architectural decisions, bug debugging, and teamwork narratives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: JAPANESE LANGUAGE SYSTEM */}
      {activeLanguage === 'japanese' && (
        <div className="space-y-6">
          {/* Top Japanese Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
              <div className="text-xs text-slate-400">Start Date</div>
              <div className="text-base font-bold text-white font-mono">October 2, 2026</div>
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

              <div className="flex items-center gap-2 pt-2">
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

            {/* Vocabulary Table (2 cols) */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">JLPT N5 Core Vocabulary Vault</h3>
                  <p className="text-xs text-slate-400">10 words per day added sustainably without interfering with GATE.</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <button
                    onClick={() => setVocabFilter('all')}
                    className={`px-2.5 py-1 rounded-lg ${vocabFilter === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400'}`}
                  >
                    All ({vocabList.length})
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
                    Pending ({vocabList.length - masteredCount})
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[440px] overflow-y-auto">
                {filteredVocab.map((v) => (
                  <div 
                    key={v.id}
                    onClick={() => toggleVocabMastery(v.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      v.mastered 
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
                          v.mastered ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700 text-slate-500'
                        }`}
                      >
                        {v.mastered ? '✓' : ''}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
