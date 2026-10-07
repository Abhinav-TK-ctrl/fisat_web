import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CircuitHero } from './components/CircuitHero';
import { SlideShowShowcase } from './components/SlideShowShowcase';
import { AchievementLane } from './components/AchievementLane';
import { DepartmentsSection } from './components/DepartmentsSection';
import { BranchFinder } from './components/BranchFinder';
import { CampusMap } from './components/CampusMap';
import { NoticeBoard } from './components/NoticeBoard';
import { AdmissionsCalculator } from './components/AdmissionsCalculator';
import { RetroZone } from './components/RetroZone';
import { Modals } from './components/Modals';
import { CommandPalette } from './components/CommandPalette';
import { CampusAssistant } from './components/CampusAssistant';
import { Footer } from './components/Footer';
import { DepartmentDetailPage } from './components/DepartmentDetailPage';
import { NaturalCursorTrail } from './components/NaturalCursorTrail';
import { ButtonHoverPreview } from './components/ButtonHoverPreview';

import { Department, CampusBuilding, NoticeEvent, Achievement } from './types';
import { ACHIEVEMENTS_DATA, DEPARTMENTS_DATA } from './data/mockData';
import { sounds } from './utils/audio';

export default function App() {
  const [retroMode, setRetroMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [langMalayalam, setLangMalayalam] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Active full page view for individual departments
  const [activeDepartmentPage, setActiveDepartmentPage] = useState<Department | null>(null);

  // Modals state
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<NoticeEvent | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // Dynamic achievements list allowing user upload
  const [achievementsList, setAchievementsList] = useState<Achievement[]>(ACHIEVEMENTS_DATA);

  // Sync retro mode class with body & track scroll progress
  useEffect(() => {
    if (retroMode) {
      document.body.classList.add('retro-mode');
    } else {
      document.body.classList.remove('retro-mode');
    }

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [retroMode]);

  const handleNavigate = (targetId: string) => {
    sounds.playClick();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddAchievement = (newAch: Achievement) => {
    setAchievementsList([newAch, ...achievementsList]);
    setSelectedAchievement(newAch);
  };

  return (
    <div className={`min-h-screen flex flex-col ${retroMode ? 'retro-theme' : ''}`}>
      {/* Viewport Scroll Depth Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#c99a2e] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Natural Interactive Cursor Line-Through & Trail Effect */}
      <NaturalCursorTrail retroMode={retroMode} />

      {/* Optional CRT scanline overlay when retro mode is active */}
      {retroMode && <div className="crt-overlay" aria-hidden="true" />}

      {/* Top Bar Navigation */}
      <Header
        retroMode={retroMode}
        setRetroMode={setRetroMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        langMalayalam={langMalayalam}
        setLangMalayalam={setLangMalayalam}
        onOpenSearch={() => setCommandPaletteOpen(true)}
        onOpenApply={() => setApplyModalOpen(true)}
        onHomeClick={() => setActiveDepartmentPage(null)}
      />

      {/* Either Active Department Detail Page OR Full Campus Main Portal */}
      {activeDepartmentPage ? (
        <div className="flex-1 animate-pop-in">
          <DepartmentDetailPage
            department={activeDepartmentPage}
            onBackToHome={() => {
              sounds.playClick();
              setActiveDepartmentPage(null);
            }}
            onSelectDepartment={(dept) => {
              sounds.playClick();
              setActiveDepartmentPage(dept);
            }}
            onOpenApply={() => setApplyModalOpen(true)}
            retroMode={retroMode}
            langMalayalam={langMalayalam}
          />
        </div>
      ) : (
        <main className="flex-1 space-y-12 sm:space-y-16">
          {/* 1. Dynamic Circuit Hero with Interactive Canvas & 3D Logo */}
          <CircuitHero
            retroMode={retroMode}
            langMalayalam={langMalayalam}
            onExploreStreams={() => handleNavigate('#departments')}
            onOpenCalculator={() => handleNavigate('#admissions')}
          />

          {/* 2. Interactive Slideshow Showcase with 3D Slide Transitions */}
          <SlideShowShowcase
            retroMode={retroMode}
            langMalayalam={langMalayalam}
            onOpenApply={() => setApplyModalOpen(true)}
            onNavigateNotice={() => handleNavigate('#notice-board')}
            onNavigateLabs={() => handleNavigate('#departments')}
          />

          {/* Quick Access Floating Links Row with Content Preview Hover Tooltips */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { 
                  label: 'Apply Online', 
                  icon: '📝', 
                  target: '#admissions', 
                  badge: 'NEW',
                  previewTitle: 'Express Online Application',
                  previewDesc: 'Verify Plus-Two & KEAM eligibility, calculate merit scholarships, and apply for B.Tech/PG admissions 2026.'
                },
                { 
                  label: 'Streams & Labs', 
                  icon: '🏛️', 
                  target: '#departments',
                  previewTitle: '6 Academic Disciplines & Labs',
                  previewDesc: 'Direct access to CSE, ECE, EEE, Mechanical, Civil & MBA/MCA departments with interactive engineering simulations.'
                },
                { 
                  label: 'Live Notices', 
                  icon: '📢', 
                  target: '#notice-board',
                  previewTitle: 'Official Circulars & Tech Fest',
                  previewDesc: 'Live countdown to Nakshatra 2026 tech fest and official academic notifications with PDF circular downloads.'
                },
                { 
                  label: 'Campus Map', 
                  icon: '🗺️', 
                  target: '#campus-map',
                  previewTitle: '45-Acre Aerial Campus Radar',
                  previewDesc: 'Point and click on the real aerial photograph of Hormis Nagar to inspect blocks, labs, library, and hostels.'
                },
                { 
                  label: 'Achievement Lane', 
                  icon: '🏆', 
                  target: '#achievement-lane',
                  previewTitle: 'Historical Landmark Timeline',
                  previewDesc: 'Explore 23-year verified history from 2002 inception to 2025 UGC Autonomous NAAC A+ status.'
                },
                { 
                  label: '90s Vault', 
                  icon: '💾', 
                  target: '#retro-zone',
                  previewTitle: 'Windows 95 Retro Computer Vault',
                  previewDesc: 'Nostalgic 1990s collegiate computer experience with interactive UNIX terminal CLI and collegiate guestbook.'
                },
              ].map((item, idx) => (
                <ButtonHoverPreview
                  key={idx}
                  title={item.previewTitle}
                  description={item.previewDesc}
                  badge={item.badge || 'SHORTCUT'}
                  position="top"
                  retroMode={retroMode}
                  className="w-full"
                >
                  <button
                    onClick={() => handleNavigate(item.target)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group hover:-translate-y-1 ${
                      retroMode
                        ? 'win95-button text-black font-mono'
                        : 'bg-white hover:bg-slate-50 border-[#d7e2df] shadow-xs hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                      <span className="text-xs font-bold font-heading text-[#0f3b3a] leading-tight">
                        {item.label}
                      </span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-black px-1.5 py-0.5 bg-amber-400 text-black rounded animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </ButtonHoverPreview>
              ))}
            </div>
          </div>

          {/* 3. Interactive Landmark Achievement Lane Timeline */}
          <div className="scroll-slide-enter scroll-slide-visible">
            <AchievementLane
              achievements={achievementsList}
              retroMode={retroMode}
              langMalayalam={langMalayalam}
              onSelectAchievement={(a) => setSelectedAchievement(a)}
              onAddAchievement={handleAddAchievement}
            />
          </div>

          {/* 4. Academic Streams & Interactive Blueprint Engine with Live Simulations */}
          <div className="scroll-slide-enter scroll-slide-visible">
            <DepartmentsSection
              retroMode={retroMode}
              langMalayalam={langMalayalam}
              onOpenDeptModal={(d) => setSelectedDept(d)}
              onOpenDeptPage={(d) => {
                sounds.playClick();
                setActiveDepartmentPage(d);
              }}
            />
          </div>

          {/* 5. Branch Finder 3-Step Recommendation Quiz */}
          <div className="scroll-slide-enter scroll-slide-visible">
            <BranchFinder
              retroMode={retroMode}
              langMalayalam={langMalayalam}
              onSelectDepartment={(dept) => {
                sounds.playClick();
                setActiveDepartmentPage(dept);
              }}
            />
          </div>

          {/* 6. Interactive Aerial Campus Map with Glowing Hotspot Pins */}
          <div className="scroll-slide-enter scroll-slide-visible">
            <CampusMap
              retroMode={retroMode}
              langMalayalam={langMalayalam}
              onSelectBuilding={(b) => setSelectedBuilding(b)}
            />
          </div>

          {/* 7. Live Campus Notice Board & Nakshatra Tech Fest Countdown */}
          <div className="scroll-slide-enter scroll-slide-visible">
            <NoticeBoard
              retroMode={retroMode}
              langMalayalam={langMalayalam}
              onSelectNotice={(n) => setSelectedNotice(n)}
            />
          </div>

          {/* 8. Interactive Admissions Eligibility & Scholarship Calculator */}
          <div className="scroll-slide-enter scroll-slide-visible">
            <AdmissionsCalculator
              retroMode={retroMode}
              langMalayalam={langMalayalam}
              onOpenApplyModal={() => setApplyModalOpen(true)}
            />
          </div>

          {/* 9. The 90s Vault: Windows 95 Guestbook & Retro Terminal */}
          <div className="scroll-slide-enter scroll-slide-visible">
            <RetroZone
              retroMode={retroMode}
              langMalayalam={langMalayalam}
              onToggleRetro={() => setRetroMode(!retroMode)}
            />
          </div>
        </main>
      )}

      {/* Footer */}
      <Footer
        retroMode={retroMode}
        langMalayalam={langMalayalam}
        onOpenApply={() => setApplyModalOpen(true)}
      />

      {/* Centralized Interactive Modals */}
      <Modals
        retroMode={retroMode}
        selectedDept={selectedDept}
        onCloseDept={() => setSelectedDept(null)}
        selectedBuilding={selectedBuilding}
        onCloseBuilding={() => setSelectedBuilding(null)}
        selectedNotice={selectedNotice}
        onCloseNotice={() => setSelectedNotice(null)}
        selectedMemory={selectedAchievement}
        onCloseMemory={() => setSelectedAchievement(null)}
        applyModalOpen={applyModalOpen}
        onCloseApply={() => setApplyModalOpen(false)}
      />

      {/* Command Search Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onToggleRetro={() => setRetroMode(!retroMode)}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          sounds.enabled = next;
        }}
        onToggleLang={() => setLangMalayalam(!langMalayalam)}
        onOpenApply={() => setApplyModalOpen(true)}
        onSelectDept={(deptId) => {
          const found = DEPARTMENTS_DATA.find((d) => d.id === deptId);
          if (found) {
            setActiveDepartmentPage(found);
          }
        }}
      />

      {/* Floating Virtual Campus Guide Assistant */}
      <CampusAssistant
        retroMode={retroMode}
        langMalayalam={langMalayalam}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
