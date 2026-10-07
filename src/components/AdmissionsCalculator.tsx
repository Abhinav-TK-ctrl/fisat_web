import React, { useState } from 'react';
import { Calculator, Award, CheckCircle, AlertTriangle, ArrowRight, GraduationCap } from 'lucide-react';
import { sounds } from '../utils/audio';

interface AdmissionsCalculatorProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onOpenApplyModal: () => void;
}

export const AdmissionsCalculator: React.FC<AdmissionsCalculatorProps> = ({
  retroMode,
  langMalayalam,
  onOpenApplyModal,
}) => {
  const [programme, setProgramme] = useState<'btech' | 'lateral' | 'mca' | 'mba'>('btech');
  const [marksPercentage, setMarksPercentage] = useState<number>(82);
  const [entranceRank, setEntranceRank] = useState<string>('8450');

  // Logic calculation
  const getEligibilityStatus = () => {
    switch (programme) {
      case 'btech':
        if (marksPercentage >= 60) return { eligible: true, note: 'Eligible for Merit & Management Quotas across all engineering branches.' };
        if (marksPercentage >= 45) return { eligible: true, note: 'Eligible for KTU Admissions under Government / Management quota.' };
        return { eligible: false, note: 'Requires minimum 45% aggregate in Physics, Chemistry & Mathematics for KTU.' };
      case 'lateral':
        if (marksPercentage >= 50) return { eligible: true, note: 'Eligible for direct 3rd Semester B.Tech entry with your Polytechnic Diploma.' };
        return { eligible: false, note: 'Requires minimum 50% in 3-year Diploma.' };
      case 'mca':
        if (marksPercentage >= 50) return { eligible: true, note: 'Eligible for MCA 2-year Master of Computer Applications.' };
        return { eligible: false, note: 'Requires minimum 50% aggregate in degree with Mathematics/Statistics.' };
      case 'mba':
        if (marksPercentage >= 50) return { eligible: true, note: 'Eligible for FISAT Business School MBA (Finance, Marketing, HR, Analytics).' };
        return { eligible: false, note: 'Requires 50% in graduation + valid KMAT / CMAT / CAT score.' };
    }
  };

  const status = getEligibilityStatus();

  // Scholarship calculation
  const getScholarshipTier = () => {
    if (marksPercentage >= 95) return 'Full 100% Tuition Fee Waiver (Founder Patron Fellowship)';
    if (marksPercentage >= 88) return '50% Annual Tuition Fee Merit Scholarship';
    if (marksPercentage >= 80) return '25% Federal Bank Merit Concession';
    return 'Standard Government / Management Fee Structure (Financial Aid available)';
  };

  return (
    <section id="admissions" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Descriptive Guidance */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#b5502e] font-mono">
            {langMalayalam ? 'പ്രവേശന മാർഗ്ഗരേഖ' : 'ADMISSIONS DIRECTORY · BATCH 2026–2030'}
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            retroMode ? 'font-mono text-black' : 'font-heading text-[#0f3b3a]'
          }`}>
            {langMalayalam ? 'പ്രവേശന യോഗ്യത പരിശോധിക്കുക' : 'Check Eligibility & Scholarship Tiers'}
          </h2>

          <p className="text-sm sm:text-base text-[#536762] leading-relaxed">
            {langMalayalam
              ? 'പ്ലസ്ടു മാർക്കും പ്രവേശന പരീക്ഷാ റാങ്കും നൽകി നിങ്ങൾക്ക് ലഭ്യമായ സീറ്റുകളും ഫീസിളവുകളും മുൻകൂട്ടി കണക്കാക്കുക.'
              : 'Federal Institute of Science and Technology awards over ₹1.2 Crores in merit scholarships annually. Use this calculator to simulate branch cutoff probability and tuition waivers.'}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-[#536762]">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Affiliated to APJ Abdul Kalam Technological University (KTU)</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#536762]">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Approved by AICTE, New Delhi &amp; Government of Kerala</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#536762]">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct Bank Loan facilitation with Federal Bank on-campus</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Calculator Box */}
        <div className={`lg:col-span-7 p-6 sm:p-10 rounded-3xl border transition-all ${
          retroMode
            ? 'win95-raised text-black'
            : 'bg-white border-[#d7e2df] shadow-sm'
        }`}>
          <div className="flex items-center gap-2 mb-6 text-xs font-mono font-bold text-[#0f3b3a] pb-3 border-b border-slate-100">
            <Calculator className="w-4 h-4 text-[#c99a2e]" />
            <span>INTERACTIVE SEAT &amp; MERIT MATRIX</span>
          </div>

          {/* Program Switcher */}
          <div className="mb-6">
            <label className="block text-xs font-mono font-bold text-[#12211e] uppercase mb-2">
              Select Desired Academic Programme:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'btech', label: 'B.Tech Regular' },
                { id: 'lateral', label: 'Lateral Entry' },
                { id: 'mca', label: 'MCA (2-Year)' },
                { id: 'mba', label: 'MBA (FBS)' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    sounds.playClick();
                    setProgramme(p.id as any);
                  }}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg text-center transition-all ${
                    programme === p.id
                      ? retroMode
                        ? 'bg-[#000080] text-yellow-300 font-mono border-2 border-black win95-sunken'
                        : 'bg-[#0f3b3a] text-white shadow-sm'
                      : retroMode
                        ? 'win95-button text-black font-mono'
                        : 'bg-slate-50 text-[#536762] hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Marks Slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="qualifying-marks-slider" className="text-xs font-mono font-bold text-[#12211e] uppercase">
                Qualifying Aggregate Marks:
              </label>
              <span className="text-base font-black text-[#0f3b3a] font-mono tabular-nums bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {marksPercentage}%
              </span>
            </div>
            <input
              id="qualifying-marks-slider"
              aria-label="Qualifying Aggregate Marks Percentage"
              type="range"
              min="35"
              max="100"
              value={marksPercentage}
              onChange={(e) => {
                setMarksPercentage(Number(e.target.value));
              }}
              className="w-full accent-[#0f3b3a] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#536762] font-mono mt-1">
              <span>35% (Pass)</span>
              <span>60% (First Class)</span>
              <span>85% (Distinction)</span>
              <span>100%</span>
            </div>
          </div>

          {/* Entrance Examination Rank Field */}
          <div className="mb-6">
            <label htmlFor="entrance-rank-input" className="block text-xs font-mono font-bold text-[#12211e] uppercase mb-1.5">
              Approximate Entrance Rank (KEAM / CMAT / KMAT):
            </label>
            <input
              id="entrance-rank-input"
              type="text"
              value={entranceRank}
              onChange={(e) => setEntranceRank(e.target.value)}
              placeholder="e.g. 5200"
              className={`w-full p-2.5 text-xs rounded-lg border font-mono ${
                retroMode
                  ? 'win95-sunken text-black bg-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:outline-none focus:border-[#0f3b3a]'
              }`}
            />
          </div>

          {/* Result Matrix Feedback Card */}
          <div className={`p-4 rounded-xl border mb-6 space-y-3 ${
            status.eligible
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-start gap-2.5">
              {status.eligible ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-xs uppercase font-mono">
                  {status.eligible ? 'QUALIFIED FOR 2026 COUNSELING' : 'MINIMUM CRITERIA ALERT'}
                </div>
                <div className="text-xs mt-0.5 leading-relaxed">
                  {status.note}
                </div>
              </div>
            </div>

            {/* Estimated Scholarship */}
            <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-2 text-xs">
              <Award className="w-4 h-4 text-[#c99a2e] shrink-0" />
              <div>
                <span className="font-bold">Projected Aid: </span>
                <span>{getScholarshipTier()}</span>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={() => {
              sounds.playSuccess();
              onOpenApplyModal();
            }}
            className={`w-full py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
              retroMode
                ? 'win95-button text-black font-mono border-2 border-black'
                : 'bg-[#0f3b3a] hover:bg-[#16504d] text-white shadow-sm'
            }`}
          >
            <span>Start Express 2026 Application Inquiry</span>
            <ArrowRight className="w-4 h-4 text-[#c99a2e]" />
          </button>

        </div>

      </div>
    </section>
  );
};
