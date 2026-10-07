import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, Monitor, Volume2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
  onToggleRetro: () => void;
  onToggleSound: () => void;
  onToggleLang?: () => void;
  onOpenApply: () => void;
  onSelectDept?: (deptId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onToggleRetro,
  onToggleSound,
  onToggleLang,
  onOpenApply,
  onSelectDept,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    { title: 'Computer Science & Engineering (CSE)', category: 'Department', deptId: 'cse', target: '#departments' },
    { title: 'Electronics & Communication (ECE)', category: 'Department', deptId: 'ece', target: '#departments' },
    { title: 'Electrical & Electronics (EEE)', category: 'Department', deptId: 'eee', target: '#departments' },
    { title: 'Mechanical Engineering (ME)', category: 'Department', deptId: 'me', target: '#departments' },
    { title: 'Civil Engineering (CE)', category: 'Department', deptId: 'ce', target: '#departments' },
    { title: 'Postgraduate MBA & MCA', category: 'Department', deptId: 'mca-mba', target: '#departments' },
    { title: 'Achievement Lane Landmark Timeline', category: 'Chronicle', target: '#achievement-lane' },
    { title: 'Branch Finder 3-Step Matcher', category: 'Quiz', target: '#branch-finder' },
    { title: 'Interactive Campus Map', category: 'Navigation', target: '#campus-map' },
    { title: 'Nakshatra 2026 Tech Fest Countdown', category: 'Events', target: '#notice-board' },
    { title: 'Admissions & Eligibility Calculator', category: 'Admissions', target: '#admissions' },
    { title: '90s Retro Vault & Guestbook', category: 'Vault', target: '#retro-zone' },
    { title: 'Express Online Application Form', category: 'Action', action: onOpenApply },
    { title: 'Toggle 90s Retro Warp Theme', category: 'Theme', action: onToggleRetro },
    { title: 'Toggle 8-bit Sound Synthesizer', category: 'Audio', action: onToggleSound },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else sounds.playClick();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filtered[selectedIndex];
        if (selected) {
          executeAction(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  const executeAction = (actionItem: (typeof actions)[0]) => {
    sounds.playClick();
    onClose();
    if (actionItem.deptId && onSelectDept) {
      onSelectDept(actionItem.deptId);
    } else if (actionItem.action) {
      actionItem.action();
    } else if (actionItem.target) {
      onNavigate(actionItem.target);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Bar Input */}
        <div className="flex items-center px-4 border-b border-slate-100 gap-2">
          <img
            src="/logo.png"
            alt="FISAT Logo"
            className="w-6 h-6 object-contain shrink-0"
            referrerPolicy="no-referrer"
          />
          <Search className="w-4 h-4 text-[#536762] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a department, notice, map area, or command..."
            className="w-full py-4 px-2 text-sm outline-none placeholder-slate-400 font-sans"
          />
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            aria-label="Close command search"
            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching commands or campus destinations found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={() => executeAction(item)}
                className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left text-xs transition-colors ${
                  idx === selectedIndex
                    ? 'bg-[#0f3b3a] text-white'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    idx === selectedIndex ? 'bg-white/20 text-[#c99a2e]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.category}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <CornerDownLeft className={`w-3.5 h-3.5 ${idx === selectedIndex ? 'text-[#c99a2e]' : 'text-slate-300'}`} />
              </button>
            ))
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Use ↑↓ arrows to navigate</span>
          <span>Esc to exit</span>
        </div>

      </div>
    </div>
  );
};
