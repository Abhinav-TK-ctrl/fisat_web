import React, { useState, useRef } from 'react';
import { Award, Trophy, Sparkles, Plus, Camera, ShieldCheck, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import { Achievement } from '../types';
import { sounds } from '../utils/audio';

interface AchievementLaneProps {
  achievements: Achievement[];
  retroMode: boolean;
  langMalayalam: boolean;
  onSelectAchievement: (ach: Achievement) => void;
  onAddAchievement: (ach: Achievement) => void;
}

export const AchievementLane: React.FC<AchievementLaneProps> = ({
  achievements,
  retroMode,
  langMalayalam,
  onSelectAchievement,
  onAddAchievement,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categories = [
    { key: 'all', label: 'Complete Heritage' },
    { key: 'Foundation', label: 'Foundation & Heritage' },
    { key: 'Innovation', label: 'Super FabLab & Tech' },
    { key: 'Robotics', label: 'Humanoid & KMRL' },
    { key: 'Global Honor', label: 'Global Awards' },
    { key: 'Accreditation', label: 'UGC Autonomous & NAAC' },
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sounds.playSuccess();
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = event.target?.result as string;
      const newAchievement: Achievement = {
        id: `ach-${Date.now()}`,
        year: 2026,
        era: 'New Era · 2026',
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'New Campus Landmark',
        description: 'Verified collegiate achievement recorded by community archivist at Federal Institute of Science and Technology.',
        category: 'Innovation',
        accent: '#c99a2e',
        emoji: '🏆',
        image: imgData,
        verifier: 'FISAT Archival Cell',
        impactMetric: 'Community Verified',
      };
      onAddAchievement(newAchievement);
    };
    reader.readAsDataURL(file);
  };

  const handleDropOnCard = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverId(null);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    sounds.playSuccess();
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = event.target?.result as string;
      const existing = achievements.find(a => a.id === targetId);
      if (existing) {
        const updated: Achievement = {
          ...existing,
          image: imgData,
          verifier: 'Archived by Alumni'
        };
        onAddAchievement(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="achievement-lane" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#b5502e] mb-2 font-mono">
            <Trophy className="w-3.5 h-3.5 text-[#b5502e]" />
            <span>HISTORICAL CHRONICLES &middot; 2002–2026</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            retroMode ? 'font-mono text-black' : 'font-heading text-[#0f3b3a]'
          }`}>
            {langMalayalam ? 'നേട്ടങ്ങളുടെ പാത (Achievement Lane)' : 'Achievement Lane: Landmark Triumphs of FISAT'}
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#536762] max-w-2xl">
            {langMalayalam
              ? '2002-ൽ ഫൗണ്ടർ ചെയർമാൻ അഡ്വ. പി.വി. മാത്യുവും FBOAES-ഉം തുടക്കമിട്ട ചരിത്രം മുതൽ യുജിസി ഓട്ടോണമസ് പദവിയും റോബോട്ടിക്സ് വിജയങ്ങളും വരെയുള്ള സുവർണ്ണ നാഴികക്കല്ലുകൾ.'
              : 'From the founding at Hormis Nagar in 2002 by Adv. P.V. Mathew to UGC Autonomous status, the MIKA Humanoid Robot for Kochi Metro, and global engineering laurels.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => {
              sounds.playClick();
              fileInputRef.current?.click();
            }}
            className={`px-4 py-2.5 text-xs font-bold flex items-center gap-2 rounded-xl transition-all shadow-sm active:scale-95 ${
              retroMode
                ? 'win95-button text-black font-mono'
                : 'bg-[#0f3b3a] hover:bg-[#16504d] text-white shadow-emerald-950/20'
            }`}
          >
            <Camera className="w-4 h-4 text-[#c99a2e]" />
            <span>{langMalayalam ? 'ചരിത്ര ഫോട്ടോ ചേർക്കുക' : 'Contribute Milestone Photo'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              sounds.playClick();
              setSelectedCategory(cat.key);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === cat.key
                ? retroMode
                  ? 'bg-[#000080] text-yellow-300 font-mono border-2 border-black'
                  : 'bg-[#0f3b3a] text-white shadow-sm'
                : retroMode
                  ? 'win95-button text-black font-mono'
                  : 'bg-white text-[#536762] hover:text-[#0f3b3a] border border-[#d7e2df]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievement Cards Grid with 3D Tilt and Archival Framing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAchievements.map((ach, index) => {
          const rotationAngle = (index % 3 === 0 ? -1.8 : index % 3 === 1 ? 1.5 : -1.0);
          const isDragOver = dragOverId === ach.id;

          return (
            <div
              key={ach.id}
              tabIndex={0}
              role="button"
              onClick={() => {
                sounds.playClick();
                onSelectAchievement(ach);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectAchievement(ach);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverId(ach.id);
              }}
              onDragLeave={() => setDragOverId(null)}
              onDrop={(e) => handleDropOnCard(e, ach.id)}
              style={{
                transform: `rotate(${rotationAngle}deg)`,
              }}
              className={`group relative bg-[#fdfbf7] text-[#1c1917] p-4 pb-6 rounded-md shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border ${
                isDragOver ? 'ring-4 ring-[#c99a2e] border-dashed border-[#c99a2e]' : 'border-stone-200'
              } hover:!rotate-0 hover:scale-[1.03] hover:z-20`}
            >
              {/* Gold Heraldic Top Notch */}
              <div 
                aria-hidden="true" 
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#c99a2e]/70 shadow-inner -rotate-1 pointer-events-none flex items-center justify-center text-[9px] font-mono font-bold text-black uppercase"
              >
                VERIFIED ARCHIVE
              </div>

              {/* Archival Photo Viewport */}
              <div className="relative aspect-4/3 w-full bg-[#14211f] rounded-xs overflow-hidden mb-4 shadow-inner flex items-center justify-center">
                <img
                  src={ach.image}
                  alt={ach.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Impact Metric Floating Badge */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 bg-black/75 backdrop-blur-md text-[#c99a2e] text-[11px] font-mono font-bold rounded flex items-center gap-1.5 border border-[#c99a2e]/30">
                  <span>{ach.emoji}</span>
                  <span>{ach.impactMetric}</span>
                </div>

                {/* Year Indicator */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#0f3b3a]/90 text-white font-mono text-[11px] font-bold rounded">
                  {ach.year}
                </div>
              </div>

              {/* Achievement Body */}
              <div className="space-y-1.5 px-1">
                <div className="flex items-center justify-between text-xs text-[#536762]">
                  <span className="font-mono font-bold text-[#b5502e]">{ach.era}</span>
                  <span className="text-[10px] font-mono bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                    {ach.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#14211f] font-heading group-hover:text-[#0f3b3a] transition-colors line-clamp-2 leading-snug">
                  {ach.title}
                </h3>

                <p className="text-xs text-[#536762] line-clamp-3 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {/* Footer Citation & Inspection Prompt */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-[#0f3b3a] font-medium">
                <span className="flex items-center gap-1 font-mono font-bold">
                  <span>Inspect Landmark Dossier</span> →
                </span>
                <span className="text-stone-400 text-[10px] truncate max-w-[110px]" title={ach.verifier}>
                  {ach.verifier}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
