import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, CornerDownLeft } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CampusAssistantProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onNavigate: (targetId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionTarget?: string;
  actionLabel?: string;
}

export const CampusAssistant: React.FC<CampusAssistantProps> = ({
  retroMode,
  langMalayalam,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Namaskaram! I am the FISAT Campus Navigator. Ask me about B.Tech/MCA cutoffs, hostel facilities, tech fest, or placement statistics.'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    { label: 'Admissions & Cutoffs', query: 'How does admissions and KEAM cutoff work?' },
    { label: 'Hostel Facilities', query: 'Tell me about boys and girls hostels on campus' },
    { label: 'Top Placements', query: 'What are the top placement packages and recruiters?' },
    { label: 'Campus Map', query: 'Where is the FabLab and Central Library located?' },
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sounds.playBlip();

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Answer logic
    setTimeout(() => {
      sounds.playClick();
      const q = text.toLowerCase();
      let botResponse: ChatMessage;

      if (q.includes('admiss') || q.includes('cutoff') || q.includes('seat') || q.includes('keam')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Admissions are conducted via KEAM State Allotment and Merit Management Quotas. Candidates need minimum 45% in PCM (60% recommended for CSE/ECE merit). Check our interactive Eligibility Matrix!',
          actionTarget: '#admissions',
          actionLabel: 'Open Eligibility Matrix'
        };
      } else if (q.includes('hostel') || q.includes('stay') || q.includes('room') || q.includes('mess')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'FISAT has on-campus high-speed Wi-Fi hostels for both boys and girls, with 24/7 security, gym, badminton courts, and hygienic Kerala/North Indian dining messes.'
        };
      } else if (q.includes('place') || q.includes('salary') || q.includes('recruit') || q.includes('package')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Our 2025–2026 drive recorded a 94.8% placement conversion with a peak salary of ₹32 LPA. Over 180 recruiters including Microsoft, Bosch, Cognizant, TCS, Zoho, and L&T visit annually.',
          actionTarget: '#notice-board',
          actionLabel: 'View Placement Circular'
        };
      } else if (q.includes('fest') || q.includes('nakshatra') || q.includes('event')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Nakshatra 2026 is our flagship national techno-cultural extravaganza scheduled for October 12–14, featuring Robowars, 36-hr Hackathons, and Star Night concerts!',
          actionTarget: '#notice-board',
          actionLabel: 'View Fest Countdown'
        };
      } else if (q.includes('lab') || q.includes('library') || q.includes('map') || q.includes('campus')) {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'The 45-acre green campus includes the Dr. APJ Abdul Kalam Central Library, MIT FabLab Node, High Performance Computing GPU cluster, and student sports complex.',
          actionTarget: '#campus-map',
          actionLabel: 'Explore Campus Map'
        };
      } else {
        botResponse = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: 'Great question! You can explore our academic streams, check eligibility, or inspect the interactive campus map for detailed insights.',
          actionTarget: '#departments',
          actionLabel: 'Explore Engineering Streams'
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen ? (
        <button
          onClick={() => {
            sounds.playClick();
            setIsOpen(true);
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95 ${
            retroMode
              ? 'win95-raised text-black'
              : 'bg-[#b5502e] hover:bg-[#a34423] text-white shadow-orange-950/30'
          }`}
          aria-label="Open FISAT Campus Navigator Assistant"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      ) : (
        /* Floating Chat Panel */
        <div className={`w-[340px] sm:w-[380px] h-[480px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
          retroMode
            ? 'win95-raised text-black'
            : 'bg-white border-[#d7e2df]'
        }`}>
          {/* Header */}
          <div className="bg-[#0f3b3a] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#c99a2e] text-black flex items-center justify-center font-bold text-xs">
                F
              </div>
              <div>
                <div className="font-bold text-xs font-['Bricolage_Grotesque']">
                  FISAT Campus Guide
                </div>
                <div className="text-[10px] text-emerald-200 font-mono">
                  Instant Admissions &amp; Campus Assistant
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                setIsOpen(false);
              }}
              className="p-1 rounded hover:bg-white/10 text-white/80"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0f3b3a] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.actionTarget && m.actionLabel && (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onNavigate(m.actionTarget!);
                      }}
                      className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 bg-[#c99a2e]/20 text-[#855e09] font-bold rounded text-[11px] hover:bg-[#c99a2e]/30"
                    >
                      <span>{m.actionLabel}</span> →
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.query)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-[10px] font-medium whitespace-nowrap shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about admissions, hostel, labs..."
              className="flex-1 p-2 text-xs bg-slate-50 rounded-lg border border-slate-200 outline-none focus:border-[#0f3b3a]"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#0f3b3a] text-white hover:bg-[#16504d]"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
