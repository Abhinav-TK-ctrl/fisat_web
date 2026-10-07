import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, MessageSquare, History, Award, Sparkles, Monitor } from 'lucide-react';
import { GuestbookEntry } from '../types';
import { INITIAL_GUESTBOOK } from '../data/mockData';
import { sounds } from '../utils/audio';

interface RetroZoneProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onToggleRetro: () => void;
}

export const RetroZone: React.FC<RetroZoneProps> = ({
  retroMode,
  langMalayalam,
  onToggleRetro,
}) => {
  // Visitor counter state
  const [visitorCount, setVisitorCount] = useState<number>(133742);

  // Guestbook entries state
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>(INITIAL_GUESTBOOK);
  const [authorName, setAuthorName] = useState<string>('');
  const [authorBatch, setAuthorBatch] = useState<string>('');
  const [authorBranch, setAuthorBranch] = useState<string>('CSE');
  const [authorMessage, setAuthorMessage] = useState<string>('');

  // Retro DOS Terminal interactive state
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; out: string }>>([
    { cmd: 'welcome', out: 'FISAT-DOS Kernel v4.11 (C) 1995-2026. Type "help" for available commands.' },
    { cmd: 'status', out: 'ANGAMALY NODE: ONLINE. ACCREDITATION: NAAC A++. BATCH: 2026 ADMISSIONS READY.' }
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Increment visitor count slightly or load from localStorage
    try {
      const stored = localStorage.getItem('fisat_visitor_count');
      if (stored) {
        setVisitorCount(Number(stored) + 1);
        localStorage.setItem('fisat_visitor_count', String(Number(stored) + 1));
      } else {
        localStorage.setItem('fisat_visitor_count', '133743');
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSignGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !authorMessage.trim()) return;

    sounds.playSuccess();
    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name: authorName.trim(),
      batch: authorBatch.trim() || 'Class of 2026',
      branch: authorBranch,
      message: authorMessage.trim(),
      timestamp: 'Just now'
    };

    setGuestbook([newEntry, ...guestbook]);
    setAuthorName('');
    setAuthorMessage('');
    setAuthorBatch('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    sounds.playBlip();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'COMMANDS: help, branches, placement, fest, alumni, matrix, date, clear';
        break;
      case 'branches':
        response = 'ACADEMIC DISCIPLINES: CSE (Computer Science), ECE (Electronics), EEE (Electrical), ME (Mechanical), CE (Civil), MCA, MBA.';
        break;
      case 'placement':
        response = 'PLACEMENTS: Highest CTC ₹32 LPA · Average 8.4 LPA · Top recruiters: Microsoft, Bosch, TCS, Cognizant, Zoho, L&T.';
        break;
      case 'fest':
        response = 'TECH FEST: Nakshatra 2026 kicking off Oct 12. Robowars, 36h Hackathon, Drone racing, Star Night.';
        break;
      case 'alumni':
        response = 'ALUMNI NETWORK: Over 14,000+ graduates active across 38 countries (Google, Apple, ISRO, Intel, AWS).';
        break;
      case 'matrix':
        response = 'WAKING UP THE DIGITAL MATRIX... Connecting to Angamaly Optical Ring Backbone.';
        break;
      case 'date':
        response = new Date().toUTCString();
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = `Command not recognized: "${cmd}". Type "help" for a list of available commands.`;
    }

    setTerminalHistory([...terminalHistory, { cmd: terminalInput, out: response }]);
    setTerminalInput('');
    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Convert visitor count to 6 digits string
  const digits = String(visitorCount).padStart(6, '0').split('');

  return (
    <section id="retro-zone" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 90s Section Banner */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#b5502e] mb-2 uppercase tracking-widest">
          <Monitor className="w-4 h-4 text-[#b5502e]" />
          <span>CYBER NOSTALGIA · WEB 1.0 MEETS MODERN ENGINEERING</span>
        </div>

        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          retroMode ? 'font-mono text-black' : 'font-heading text-[#0f3b3a]'
        }`}>
          {langMalayalam ? '90s റെട്രോ സോൺ (The Nostalgia Vault)' : 'The 90s Vault: Dial-Up Era Nostalgia'}
        </h2>

        <p className="mt-3 text-base sm:text-lg text-[#536762]">
          {langMalayalam
            ? 'വിൻഡോസ് 95 ശൈലിയിലുള്ള ഗസ്റ്റ് ബുക്ക് ഒപ്പിടുക, ഡോസ് ടെർമിനൽ പ്രവർത്തിപ്പിക്കുക, അല്ലെങ്കിൽ സൈറ്റിന്റെ 90s മോഡ് ഓൺ ചെയ്യുക.'
            : 'How engineering colleges presented themselves in the golden age of personal computing. Sign our Windows 95 guestbook or command the nostalgic terminal.'}
        </p>

        {/* Global Retro Switch CTA */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              sounds.playWarp();
              onToggleRetro();
            }}
            className={`px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-transform active:scale-95 ${
              retroMode
                ? 'bg-yellow-300 text-black border-2 border-black font-mono shadow-[3px_3px_0px_#000]'
                : 'bg-[#0f3b3a] hover:bg-[#16504d] text-white shadow-sm'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#c99a2e]" />
            <span>{retroMode ? 'Return to Modern UI Design' : 'Flip to Complete 90s Retro Warp'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Win95 Window + DOS Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Windows 95 Guestbook.exe Window */}
        <div className="lg:col-span-7 win95-raised p-2 text-black shadow-2xl">
          {/* Win95 Classic Title Bar */}
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-3 py-1.5 flex items-center justify-between font-bold text-xs select-none">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="FISAT"
                className="w-4 h-4 object-contain inline-block bg-white/20 rounded-xs"
                referrerPolicy="no-referrer"
              />
              <span className="font-sans">C:\FISAT\COMMUNITY\GUESTBOOK.EXE</span>
            </div>
            <div className="flex items-center gap-1 font-mono">
              <button aria-label="Minimize Guestbook window" className="w-4 h-4 win95-raised text-[10px] text-black leading-none flex items-center justify-center font-bold">_</button>
              <button aria-label="Maximize Guestbook window" className="w-4 h-4 win95-raised text-[10px] text-black leading-none flex items-center justify-center font-bold">□</button>
              <button aria-label="Close Guestbook window" className="w-4 h-4 win95-raised text-[10px] text-black leading-none flex items-center justify-center font-bold">×</button>
            </div>
          </div>

          {/* Win95 Window Body */}
          <div className="p-4 bg-[#c0c0c0] space-y-4">
            
            {/* 7-Segment Digital Visitor Counter */}
            <div className="flex items-center justify-between bg-[#dfdfdf] p-2.5 win95-sunken">
              <div className="text-xs font-bold font-sans">
                OFFICIAL VISITOR HIT COUNTER:
              </div>
              <div className="flex items-center gap-1">
                {digits.map((digit, idx) => (
                  <span
                    key={idx}
                    className="w-6 h-8 bg-black text-[#00ff66] font-mono font-bold text-lg flex items-center justify-center border border-[#003311] shadow-inner select-none"
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>

            {/* Existing Guestbook Entries Stream */}
            <div>
              <div className="text-xs font-bold mb-1.5 font-sans">
                RECENT ALUMNI &amp; VISITOR TESTIMONIALS:
              </div>
              <div className="h-48 overflow-y-auto win95-sunken p-3 bg-white space-y-3 text-xs">
                {guestbook.map((entry) => (
                  <div key={entry.id} className="pb-2.5 border-b border-dashed border-gray-300 last:border-none">
                    <div className="flex items-center justify-between font-bold text-[11px] text-[#000080]">
                      <span>{entry.name} ({entry.branch})</span>
                      <span className="text-gray-500 font-mono text-[10px]">{entry.batch} · {entry.timestamp}</span>
                    </div>
                    <p className="mt-1 text-gray-800 italic leading-snug">
                      "{entry.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guestbook Submission Form */}
            <form onSubmit={handleSignGuestbook} className="space-y-3 pt-1">
              <div className="text-xs font-bold font-sans">
                SIGN THE OFFICIAL FISAT GUESTBOOK:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="win95-sunken p-2 text-xs bg-white text-black outline-none font-sans"
                  required
                />
                <input
                  type="text"
                  placeholder="Batch / Year (e.g. 2024)"
                  value={authorBatch}
                  onChange={(e) => setAuthorBatch(e.target.value)}
                  className="win95-sunken p-2 text-xs bg-white text-black outline-none font-sans"
                />
                <select
                  value={authorBranch}
                  onChange={(e) => setAuthorBranch(e.target.value)}
                  className="win95-sunken p-2 text-xs bg-white text-black outline-none font-sans"
                >
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="ME">Mechanical</option>
                  <option value="CE">Civil</option>
                  <option value="MCA">MCA/MBA</option>
                  <option value="Visitor">Visitor</option>
                </select>
              </div>

              <textarea
                placeholder="Leave your message for students and juniors..."
                rows={2}
                value={authorMessage}
                onChange={(e) => setAuthorMessage(e.target.value)}
                className="w-full win95-sunken p-2 text-xs bg-white text-black outline-none font-sans"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="win95-button px-6 py-2 text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Guestbook</span>
                </button>
              </div>
            </form>

          </div>
        </div>

        {/* Right Column: Retro DOS / UNIX Terminal */}
        <div className="lg:col-span-5 bg-black text-[#00ff66] font-mono rounded-xl overflow-hidden shadow-2xl border-2 border-[#113311] flex flex-col h-[520px]">
          {/* Terminal Title Bar */}
          <div className="bg-[#112211] px-4 py-2 border-b border-[#00ff66]/30 flex items-center justify-between text-xs text-[#00ff66]">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#00ff66]" />
              <span>TERMINAL://FISAT_NODE_1995.sh</span>
            </span>
            <span className="text-[10px] text-[#00ff66]/60">TTY01 · 9600 BAUD</span>
          </div>

          {/* Terminal Output Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs leading-relaxed select-text">
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#00ff66]/70">
                  <span className="text-[#c99a2e]">fisat@angamaly:~$</span>
                  <span className="text-white font-bold">{item.cmd}</span>
                </div>
                <div className="text-[#a3e635] pl-3 border-l border-[#00ff66]/30">
                  {item.out}
                </div>
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <form onSubmit={handleTerminalSubmit} className="p-3 bg-[#0a140a] border-t border-[#00ff66]/30 flex items-center gap-2">
            <span className="text-[#c99a2e] text-xs font-bold">fisat:~$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type 'help' or 'branches'..."
              className="flex-1 bg-transparent text-[#00ff66] outline-none text-xs font-mono placeholder-[#00ff66]/30"
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="text-[11px] text-[#00ff66] px-2 py-0.5 border border-[#00ff66]/40 hover:bg-[#00ff66]/10">
              EXEC
            </button>
          </form>
        </div>

      </div>

      {/* 90s Authentic Web Badges Strip */}
      <div className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap justify-center items-center gap-4 text-[11px] font-mono font-bold select-none">
        <span className="px-3 py-1 bg-black text-[#00ff66] border-2 border-gray-600">
          🚧 UNDER CONSTRUCTION 1996
        </span>
        <span className="px-3 py-1 bg-blue-900 text-white border-2 border-white">
          NETSCAPE NAVIGATOR 4.0 CERTIFIED
        </span>
        <span className="px-3 py-1 bg-[#c0c0c0] text-black win95-raised">
          OPTIMIZED FOR 800×600 RESOLUTION
        </span>
        <span className="px-3 py-1 bg-amber-950 text-amber-200 border-2 border-amber-600">
          MADE WITH NOTEPAD &amp; RAW HTML
        </span>
        <span className="px-3 py-1 bg-emerald-950 text-emerald-200 border-2 border-emerald-600">
          W3C HTML 3.2 VERIFIED
        </span>
      </div>
    </section>
  );
};
