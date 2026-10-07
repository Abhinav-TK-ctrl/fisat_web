import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  User, 
  Layers, 
  Clock, 
  Printer, 
  Building,
  Heart,
  Send,
  Sparkles
} from 'lucide-react';
import { Department, CampusBuilding, NoticeEvent, Memory } from '../types';
import { CAMPUS_IMAGES } from '../data/mockData';
import { sounds } from '../utils/audio';

interface ModalsProps {
  retroMode: boolean;
  selectedDept: Department | null;
  onCloseDept: () => void;
  selectedBuilding: CampusBuilding | null;
  onCloseBuilding: () => void;
  selectedNotice: NoticeEvent | null;
  onCloseNotice: () => void;
  selectedMemory: Memory | null;
  onCloseMemory: () => void;
  applyModalOpen: boolean;
  onCloseApply: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  retroMode,
  selectedDept,
  onCloseDept,
  selectedBuilding,
  onCloseBuilding,
  selectedNotice,
  onCloseNotice,
  selectedMemory,
  onCloseMemory,
  applyModalOpen,
  onCloseApply,
}) => {
  // Apply Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [chosenBranch, setChosenBranch] = useState('CSE');
  const [plusTwoMarks, setPlusTwoMarks] = useState('88');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Memory Comment State
  const [memoryCheerCount, setMemoryCheerCount] = useState(42);
  const [hasCheered, setHasCheered] = useState(false);
  const [memoryComment, setMemoryComment] = useState('');
  const [commentsList, setCommentsList] = useState<string[]>([
    'Remember this like it was yesterday!',
    'Proud FISATian here in Bangalore.',
  ]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setApplicationSubmitted(true);
  };

  const resetApplyForm = () => {
    setApplicationSubmitted(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    onCloseApply();
  };

  const handleAddCheer = () => {
    if (!hasCheered) {
      sounds.playClick();
      setMemoryCheerCount(c => c + 1);
      setHasCheered(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryComment.trim()) return;
    sounds.playBlip();
    setCommentsList([...commentsList, memoryComment.trim()]);
    setMemoryComment('');
  };

  return (
    <>
      {/* 1. DEPARTMENT DEEP-DIVE MODAL */}
      {selectedDept && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedDept.name}
        >
          <div className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl relative animate-pop-in ${
            retroMode ? 'win95-raised text-black' : 'bg-white text-[#12211e] border-slate-200'
          }`}>
            <button
              onClick={() => {
                sounds.playClick();
                onCloseDept();
              }}
              aria-label="Close Department modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Department Header */}
            <div className="pr-10 mb-6">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="px-2.5 py-0.5 bg-[#0f3b3a] text-[#c99a2e] rounded font-bold">
                  {selectedDept.code}
                </span>
                <span className="text-[#536762]">
                  ESTD. {selectedDept.established} · {selectedDept.accreditation}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f3b3a] font-heading">
                {selectedDept.name}
              </h2>
              <p className="text-sm font-medium text-[#b5502e] italic mt-1">
                "{selectedDept.tagline}"
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-[#12211e] mb-1.5">
                  Academic Mission &amp; Overview
                </h4>
                <p className="text-[#536762] leading-relaxed">
                  {selectedDept.description}
                </p>
              </div>

              {/* Research Labs */}
              <div>
                <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-[#12211e] mb-2">
                  Specialized Laboratory Infrastructure
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#536762]">
                  {selectedDept.labs.map((lab, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-100">
                      <Layers className="w-3.5 h-3.5 text-[#0f3b3a] shrink-0" />
                      <span className="font-medium text-slate-800">{lab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiters & Careers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-[#12211e] mb-1.5">
                    Career Destinations
                  </h4>
                  <p className="text-xs text-[#536762]">
                    {selectedDept.careers.join(' · ')}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-[#12211e] mb-1.5">
                    Key Recruiting Corporations
                  </h4>
                  <p className="text-xs text-[#536762]">
                    {selectedDept.topRecruiters.join(', ')}
                  </p>
                </div>
              </div>

              {/* Department Contact */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-amber-950 block">Department Leadership</span>
                  <span className="text-amber-900">{selectedDept.headOfDept} · HOD Directorate</span>
                </div>
                <div className="text-right font-mono text-amber-800">
                  <span>Intake: {selectedDept.intake} Seats</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  sounds.playClick();
                  onCloseDept();
                }}
                className={`px-5 py-2 text-xs font-bold rounded-xl ${
                  retroMode ? 'win95-button text-black' : 'bg-[#0f3b3a] text-white'
                }`}
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CAMPUS BUILDING INSPECTION MODAL */}
      {selectedBuilding && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedBuilding.name}
        >
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl relative animate-pop-in ${
            retroMode ? 'win95-raised text-black' : 'bg-white text-[#12211e] border-slate-200'
          }`}>
            <button
              onClick={() => {
                sounds.playClick();
                onCloseBuilding();
              }}
              aria-label="Close Building modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-10 mb-4">
              <div className="text-xs font-mono uppercase text-[#b5502e] font-bold mb-1">
                ARCHITECTURAL BLUEPRINT &middot; {selectedBuilding.sqft}
              </div>
              <h2 className="text-2xl font-extrabold text-[#0f3b3a] font-heading">
                {selectedBuilding.name}
              </h2>
            </div>

            {/* Building Photo */}
            <div className="aspect-16/9 rounded-xl overflow-hidden mb-6 bg-slate-900 shadow-inner">
              <img
                src={CAMPUS_IMAGES.aerial}
                alt={selectedBuilding.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm">
              <p className="text-[#536762] leading-relaxed">
                {selectedBuilding.description}
              </p>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 text-xs">
                <div>
                  <span className="font-mono text-[#536762] block">Operating Hours:</span>
                  <span className="font-bold text-slate-900">{selectedBuilding.timings}</span>
                </div>
                <div>
                  <span className="font-mono text-[#536762] block">Elevation / Vertical Levels:</span>
                  <span className="font-bold text-slate-900">{selectedBuilding.floors} Storeys</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-[#12211e] mb-2">
                  Facilities Inside This Block
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedBuilding.facilities.map((fac, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-100">
                      <Building className="w-3.5 h-3.5 text-[#c99a2e] shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 font-medium">
                ★ Notable: {selectedBuilding.highlight}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => {
                  sounds.playClick();
                  onCloseBuilding();
                }}
                className={`px-5 py-2 text-xs font-bold rounded-xl ${
                  retroMode ? 'win95-button text-black' : 'bg-[#0f3b3a] text-white'
                }`}
              >
                Close Building Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. OFFICIAL NOTICE & DISPATCH CIRCULAR MODAL */}
      {selectedNotice && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedNotice.title}
        >
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl relative animate-pop-in ${
            retroMode ? 'win95-raised text-black' : 'bg-white text-[#12211e] border-slate-200'
          }`}>
            <button
              onClick={() => {
                sounds.playClick();
                onCloseNotice();
              }}
              aria-label="Close Notice modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letterhead Header */}
            <div className="text-center pb-4 border-b border-slate-200 mb-6">
              <div className="text-xs uppercase tracking-widest font-mono text-[#0f3b3a] font-bold">
                FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY (FISAT)
              </div>
              <div className="text-[11px] text-[#536762] font-mono">
                HORMIS NAGAR, MOOKKANNOOR P.O., ANGAMALY, ERNAKULAM, KERALA — 683577
              </div>
              <div className="mt-2 text-xs font-mono font-bold text-[#b5502e]">
                DISPATCH REF: FISAT/DIR/2026/{selectedNotice.id.toUpperCase()}
              </div>
            </div>

            {/* Circular Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#536762]">
                <span>Date of Issue: {selectedNotice.date}</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold uppercase">
                  {selectedNotice.badge || 'OFFICIAL CIRCULAR'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#0f3b3a] font-heading">
                {selectedNotice.title}
              </h3>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans space-y-3">
                <p>{selectedNotice.description}</p>
                <p>{selectedNotice.fullDetails}</p>
              </div>

              <div className="pt-3 text-xs text-[#536762] space-y-1">
                <div>Signed,</div>
                <div className="font-bold text-slate-900">Dr. Jacob Thomas</div>
                <div>Principal &amp; Chairman of Academic Board</div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  window.print();
                }}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official PDF</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onCloseNotice();
                }}
                className={`px-5 py-2 text-xs font-bold rounded-xl ${
                  retroMode ? 'win95-button text-black' : 'bg-[#0f3b3a] text-white'
                }`}
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MEMORY LANE POLAROID VIEWER MODAL */}
      {selectedMemory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedMemory.title}
        >
          <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-xl p-6 bg-[#fdfbf7] text-[#1c1917] border border-stone-300 shadow-2xl relative animate-pop-in">
            <button
              onClick={() => {
                sounds.playClick();
                onCloseMemory();
              }}
              aria-label="Close Memory modal"
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5 text-stone-700" />
            </button>

            {/* Polaroid Framing */}
            <div className="relative aspect-4/3 w-full bg-slate-900 rounded-sm overflow-hidden mb-5 shadow-inner">
              <img
                src={selectedMemory.image || CAMPUS_IMAGES.aerial}
                alt={selectedMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/75 text-[#c99a2e] text-[10px] font-mono rounded font-bold border border-[#c99a2e]/30">
                {selectedMemory.category || 'Historical Landmark'}
              </div>
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#0f3b3a] text-white text-[10px] font-mono rounded font-bold">
                {selectedMemory.year || '2002'}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>{selectedMemory.era || 'Archival Record'}</span>
                <span className="text-[#0f3b3a] font-bold">{selectedMemory.verifier || 'FISAT Directorate'}</span>
              </div>

              <h3 className="text-2xl font-bold font-heading text-[#0f3b3a]">
                {selectedMemory.title}
              </h3>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 font-mono">
                <span className="font-bold">IMPACT METRIC: </span>
                <span>{selectedMemory.impactMetric || 'Institutional Milestone'}</span>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed font-['Newsreader'] text-base italic">
                "{selectedMemory.description}"
              </p>

              {selectedMemory.keyDignitaries && (
                <div className="text-xs text-stone-600 font-mono">
                  <span className="font-bold text-stone-800">Dignitaries Involved: </span>
                  <span>{selectedMemory.keyDignitaries}</span>
                </div>
              )}

              {/* Cheer Counter */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleAddCheer}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-transform active:scale-95 ${
                    hasCheered ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasCheered ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{memoryCheerCount} Cheers</span>
                </button>
              </div>

              {/* Comments Stream */}
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <div className="text-xs font-bold text-stone-800 font-mono">
                  MEMORIES SHARED BY STUDENTS:
                </div>
                <div className="space-y-1.5 text-xs text-stone-600 max-h-24 overflow-y-auto">
                  {commentsList.map((c, i) => (
                    <div key={i} className="p-2 bg-stone-100 rounded text-[11px]">
                      "{c}"
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddComment} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={memoryComment}
                    onChange={(e) => setMemoryComment(e.target.value)}
                    placeholder="Leave your memory or thought..."
                    className="flex-1 p-2 text-xs bg-white border border-stone-300 rounded outline-none"
                  />
                  <button type="submit" className="px-3 py-2 bg-[#0f3b3a] text-white rounded text-xs font-bold">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. ADMISSIONS APPLICATION SIMULATOR MODAL */}
      {applyModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Admissions Application"
        >
          <div className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl relative animate-pop-in ${
            retroMode ? 'win95-raised text-black' : 'bg-white text-[#12211e] border-slate-200'
          }`}>
            <button
              onClick={() => {
                sounds.playClick();
                resetApplyForm();
              }}
              aria-label="Close Application modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!applicationSubmitted ? (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#c99a2e]/30 shadow-sm shrink-0 flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="FISAT Official Logo"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#c99a2e] uppercase tracking-wider block">
                      ADMISSIONS REGISTRY 2026–2027
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f3b3a] font-heading">
                      Express Application Inquiry
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#536762]">
                  Fill out this inquiry to initiate document screening with the FISAT Admissions Directorate.
                </p>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                    Full Legal Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Ananya R. Nair"
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-[#0f3b3a]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-[#0f3b3a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                      WhatsApp / Phone:
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 outline-none focus:border-[#0f3b3a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                      Preferred Branch:
                    </label>
                    <select
                      value={chosenBranch}
                      onChange={(e) => setChosenBranch(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 outline-none"
                    >
                      <option value="CSE">Computer Science &amp; Engg (CSE)</option>
                      <option value="ECE">Electronics &amp; Comm. (ECE)</option>
                      <option value="EEE">Electrical &amp; Electronics (EEE)</option>
                      <option value="ME">Mechanical Engineering (ME)</option>
                      <option value="CE">Civil Engineering (CE)</option>
                      <option value="MCA">MCA 2-Year Master</option>
                      <option value="MBA">MBA Business School</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-800 uppercase mb-1">
                      12th / Plus Two %:
                    </label>
                    <input
                      type="number"
                      min="40"
                      max="100"
                      value={plusTwoMarks}
                      onChange={(e) => setPlusTwoMarks(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-slate-50 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetApplyForm}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all ${
                      retroMode ? 'win95-button text-black' : 'bg-[#c99a2e] hover:bg-[#d6a738] text-black shadow-md'
                    }`}
                  >
                    Submit Application Inquiry
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 text-2xl font-bold flex items-center justify-center mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-[#0f3b3a] font-heading">
                  Inquiry Received!
                </h3>
                <p className="text-xs text-[#536762] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{applicantName}</strong>. Your inquiry for <strong>{chosenBranch}</strong> has been assigned tracking ID: <strong>FISAT-2026-APP-{Math.floor(1000 + Math.random() * 9000)}</strong>. The Admissions Officer will contact you on {applicantPhone}.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetApplyForm}
                    className="px-6 py-2.5 text-xs font-bold rounded-xl bg-[#0f3b3a] text-white"
                  >
                    Done &amp; Return to Campus Portal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
