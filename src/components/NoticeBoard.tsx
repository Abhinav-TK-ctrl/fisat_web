import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, Download, ArrowUpRight, Filter, AlertCircle } from 'lucide-react';
import { NoticeEvent } from '../types';
import { NOTICES_DATA } from '../data/mockData';
import { sounds } from '../utils/audio';

interface NoticeBoardProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onSelectNotice: (n: NoticeEvent) => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({
  retroMode,
  langMalayalam,
  onSelectNotice,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 6,
    hours: 14,
    minutes: 32,
    seconds: 18,
  });

  // Real-time countdown timer to Nakshatra 2026 Tech Fest
  useEffect(() => {
    // Target: October 12, 2026 09:00 AM
    const targetDate = new Date('2026-10-12T09:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredNotices = activeCategory === 'all'
    ? NOTICES_DATA
    : NOTICES_DATA.filter((n) => n.category === activeCategory);

  return (
    <section id="notice-board" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-[#b5502e] mb-2 font-mono">
            {langMalayalam ? 'തത്സമയ വിവരങ്ങൾ' : 'CAMPUS TELEMETRY & BULLETIN'}
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            retroMode ? 'font-mono text-black' : 'font-heading text-[#0f3b3a]'
          }`}>
            {langMalayalam ? 'ക്യാമ്പസ് അറിയിപ്പുകൾ (What’s Happening)' : 'Campus Pulse & Official Notices'}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536762] max-w-2xl">
            {langMalayalam
              ? 'ടെക് ഫെസ്റ്റ് കൗണ്ട്ഡൗൺ, പ്ലേസ്‌മെന്റ് ഡ്രൈവുകൾ, പരീക്ഷാ തീയതികൾ എന്നിവ തത്സമയം അറിയുക.'
              : 'Live updates from the Registrar, Examinations Directorate, Placement Cell, and Student Guilds. Click any circular for official dispatch details.'}
          </p>
        </div>

        {/* Live Facility Statuses */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Library: Open till 9:00 PM</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>FabLab Node: Active</span>
          </div>
        </div>
      </div>

      {/* Tech Fest Live Countdown Marquee Strip */}
      <div className={`p-6 rounded-2xl mb-10 flex flex-col md:flex-row items-center justify-between gap-6 border ${
        retroMode
          ? 'bg-[#000080] text-yellow-300 win95-sunken font-mono border-2 border-black'
          : 'bg-gradient-to-r from-[#0f3b3a] to-[#16504d] text-white shadow-md'
      }`}>
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs uppercase font-mono tracking-widest text-[#c99a2e] font-bold">
            ANNUAL TECH FEST FLAGSHIP
          </div>
          <div className="text-xl sm:text-2xl font-bold font-heading">
            Nakshatra 2026 Countdown
          </div>
          <div className="text-xs text-emerald-100/80">
            Robowars · 36h Hackathon · Drone GP · Music Night
          </div>
        </div>

        {/* 4-digit countdown timer */}
        <div className="flex items-center gap-3 text-center font-mono">
          <div className="bg-black/30 px-3 py-2 rounded-lg border border-white/10 min-w-[64px]">
            <span className="text-2xl sm:text-3xl font-black text-[#c99a2e] tabular-nums block">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-white/70 uppercase">Days</span>
          </div>
          <span className="text-xl text-[#c99a2e] font-bold">:</span>
          <div className="bg-black/30 px-3 py-2 rounded-lg border border-white/10 min-w-[64px]">
            <span className="text-2xl sm:text-3xl font-black text-[#c99a2e] tabular-nums block">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-white/70 uppercase">Hours</span>
          </div>
          <span className="text-xl text-[#c99a2e] font-bold">:</span>
          <div className="bg-black/30 px-3 py-2 rounded-lg border border-white/10 min-w-[64px]">
            <span className="text-2xl sm:text-3xl font-black text-[#c99a2e] tabular-nums block">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-white/70 uppercase">Mins</span>
          </div>
          <span className="text-xl text-[#c99a2e] font-bold">:</span>
          <div className="bg-black/30 px-3 py-2 rounded-lg border border-white/10 min-w-[64px]">
            <span className="text-2xl sm:text-3xl font-black text-[#c99a2e] tabular-nums block">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-white/70 uppercase">Secs</span>
          </div>
        </div>
      </div>

      {/* Filter Category Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {[
          { key: 'all', label: 'All Bulletins' },
          { key: 'event', label: 'Flagship Events' },
          { key: 'placement', label: 'Placement Drives' },
          { key: 'circular', label: 'Academic Circulars' },
          { key: 'news', label: 'Research & Grants' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => {
              sounds.playClick();
              setActiveCategory(item.key);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              activeCategory === item.key
                ? retroMode
                  ? 'bg-[#000080] text-yellow-300 font-mono border-2 border-black'
                  : 'bg-[#0f3b3a] text-white shadow-sm'
                : retroMode
                  ? 'win95-button text-black font-mono'
                  : 'bg-white text-[#536762] hover:text-[#0f3b3a] border border-[#d7e2df]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            tabIndex={0}
            role="button"
            onClick={() => {
              sounds.playClick();
              onSelectNotice(notice);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectNotice(notice);
              }
            }}
            className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
              retroMode
                ? 'win95-raised text-black hover:bg-slate-200'
                : 'bg-white border-[#d7e2df] hover:border-[#0f3b3a] hover:shadow-md'
            }`}
          >
            <div>
              {/* Top Row: Date Pill & Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#0f3b3a] text-[#c99a2e] flex flex-col items-center justify-center font-bold text-center leading-none">
                    <span className="text-sm font-heading">{notice.day}</span>
                    <span className="text-[9px] uppercase font-mono tracking-tighter">{notice.month}</span>
                  </div>
                  <span className="text-xs text-[#536762] font-mono">{notice.date}</span>
                </div>

                {notice.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#c99a2e]/20 text-[#855e09] rounded border border-[#c99a2e]/40">
                    {notice.badge}
                  </span>
                )}
              </div>

              {/* Title and Short Deck */}
              <h3 className="text-base font-bold text-[#12211e] font-heading group-hover:text-[#0f3b3a] transition-colors leading-snug line-clamp-2">
                {notice.title}
              </h3>
              <p className="mt-2 text-xs text-[#536762] line-clamp-3 leading-relaxed">
                {notice.description}
              </p>
            </div>

            {/* Bottom Action Trigger */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0f3b3a] group-hover:text-[#b5502e] transition-colors">
              <span className="flex items-center gap-1">
                <span>View Full Dispatch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-mono text-[#536762]">Ref #{notice.id}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
