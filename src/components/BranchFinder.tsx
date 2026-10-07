import React, { useState } from 'react';
import { Sparkles, HelpCircle, ArrowRight, RotateCcw, Check, Compass } from 'lucide-react';
import { BRANCH_QUIZ_QUESTIONS, DEPARTMENTS_DATA } from '../data/mockData';
import { Department } from '../types';
import { sounds } from '../utils/audio';

interface BranchFinderProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onSelectDepartment: (dept: Department) => void;
}

export const BranchFinder: React.FC<BranchFinderProps> = ({
  retroMode,
  langMalayalam,
  onSelectDepartment,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cse: 0,
    ece: 0,
    eee: 0,
    me: 0,
    ce: 0,
    'mca-mba': 0,
  });
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const handleSelectOption = (weights: Record<string, number | undefined>) => {
    sounds.playBlip();
    const updated = { ...scores };
    Object.entries(weights).forEach(([deptId, weight]) => {
      if (typeof weight === 'number') {
        updated[deptId] = (updated[deptId] || 0) + weight;
      }
    });
    setScores(updated);

    if (currentStep < BRANCH_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      sounds.playSuccess();
      setQuizCompleted(true);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setCurrentStep(0);
    setScores({ cse: 0, ece: 0, eee: 0, me: 0, ce: 0, 'mca-mba': 0 });
    setQuizCompleted(false);
  };

  // Determine top matching department
  const getTopMatch = (): Department => {
    let topId = 'cse';
    let maxScore = -1;
    Object.entries(scores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topId = id;
      }
    });
    return DEPARTMENTS_DATA.find((d) => d.id === topId) || DEPARTMENTS_DATA[0];
  };

  const topMatch = getTopMatch();
  const currentQuestion = BRANCH_QUIZ_QUESTIONS[currentStep];

  return (
    <section id="branch-finder" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className={`p-8 sm:p-12 rounded-3xl border transition-all ${
        retroMode
          ? 'win95-raised text-black'
          : 'bg-[#0f3b3a] text-white border-emerald-900/60 shadow-xl'
      }`}>
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#c99a2e] mb-2 uppercase tracking-widest font-semibold">
            <Compass className="w-4 h-4 text-[#c99a2e]" />
            <span>INTERACTIVE CAREER ADVISOR</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            retroMode ? 'font-mono text-black' : 'font-heading'
          }`}>
            {langMalayalam ? 'നിങ്ങൾക്ക് ഏറ്റവും യോജിച്ച ബ്രാഞ്ച് കണ്ടെത്തുക' : 'Find Your Branch Match in 3 Steps'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-emerald-100/80">
            {langMalayalam
              ? 'മൂന്ന് ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകൂ. നിങ്ങളുടെ ചിന്താരീതിക്ക് ഏറ്റവും ചേരുന്ന എഞ്ചിനീയറിംഗ് ശാഖ ഞങ്ങൾ നിർദ്ദേശിക്കാം.'
              : 'Unsure between Software, Robotics, Power, or Megastructures? Answer 3 curated questions to reveal your optimal engineering discipline.'}
          </p>
        </div>

        {!quizCompleted ? (
          <div>
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#c99a2e]">
              <span>QUESTION {currentStep + 1} OF {BRANCH_QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / BRANCH_QUIZ_QUESTIONS.length) * 100)}% COMPLETED</span>
            </div>

            <div className="w-full bg-black/30 h-1.5 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-[#c99a2e] transition-all duration-300"
                style={{ width: `${((currentStep + 1) / BRANCH_QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className={`text-lg sm:text-xl font-bold mb-6 text-white ${
              retroMode ? 'font-mono text-black' : 'font-heading'
            }`}>
              {currentQuestion.question}
            </h3>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.weights)}
                  className={`p-4 text-left rounded-xl transition-all flex items-center justify-between group border ${
                    retroMode
                      ? 'win95-button text-black font-mono'
                      : 'bg-white/5 hover:bg-white/15 text-emerald-50 hover:text-white border-white/10 hover:border-[#c99a2e]/50'
                  }`}
                >
                  <span className="text-sm font-medium pr-4 leading-relaxed">
                    {opt.text}
                  </span>
                  <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center shrink-0 group-hover:border-[#c99a2e] group-hover:bg-[#c99a2e] group-hover:text-black transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Match Result Screen */
          <div className="text-center py-4 space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c99a2e] text-black text-2xl font-black mb-2 shadow-lg">
              ✓
            </div>

            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-[#c99a2e] mb-1">
                ALGORITHMIC COMPATIBILITY: 96% MATCH
              </div>
              <h3 className={`text-2xl sm:text-4xl font-extrabold text-white ${
                retroMode ? 'font-mono text-black' : 'font-heading'
              }`}>
                {topMatch.name} ({topMatch.code})
              </h3>
              <p className="mt-2 text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto italic">
                "{topMatch.tagline}"
              </p>
            </div>

            {/* Result Feature Breakdown */}
            <div className="max-w-xl mx-auto bg-black/20 p-5 rounded-2xl border border-white/10 text-left text-xs space-y-3">
              <div>
                <span className="font-bold text-[#c99a2e] uppercase font-mono">Why this matches you:</span>
                <p className="mt-1 text-slate-200">
                  Your project ambitions and preferred tools align strongly with {topMatch.name} labs, including {topMatch.labs[0]} and {topMatch.labs[1]}.
                </p>
              </div>
              <div>
                <span className="font-bold text-[#c99a2e] uppercase font-mono">Top Career Avenues:</span>
                <p className="mt-1 text-slate-200">
                  {topMatch.careers.join(' · ')}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  sounds.playClick();
                  onSelectDepartment(topMatch);
                }}
                className={`px-6 py-3 text-xs font-bold rounded-xl flex items-center gap-2 transition-transform active:scale-95 ${
                  retroMode
                    ? 'win95-button text-black font-mono border-2 border-black'
                    : 'bg-[#c99a2e] hover:bg-[#d6a738] text-black shadow-lg'
                }`}
              >
                <span>Direct to {topMatch.code} Department Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className={`px-5 py-3 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors ${
                  retroMode
                    ? 'win95-button text-black font-mono'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
