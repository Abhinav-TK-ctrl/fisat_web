import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  Monitor, 
  FileText 
} from 'lucide-react';
import { Fisat3DLogo } from './Fisat3DLogo';
import { sounds } from '../utils/audio';
import { ButtonHoverPreview } from './ButtonHoverPreview';

interface HeaderProps {
  retroMode: boolean;
  setRetroMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  langMalayalam?: boolean;
  setLangMalayalam?: (val: boolean) => void;
  onOpenSearch: () => void;
  onOpenApply: () => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  retroMode,
  setRetroMode,
  soundEnabled,
  setSoundEnabled,
  langMalayalam = false,
  setLangMalayalam,
  onOpenSearch,
  onOpenApply,
  onHomeClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playClick();
  };

  const toggleRetro = () => {
    sounds.playWarp();
    setRetroMode(!retroMode);
  };

  const navLinks = [
    { href: '#achievement-lane', label: 'Achievement Lane' },
    { href: '#departments', label: 'Streams' },
    { href: '#campus-map', label: 'Campus Map' },
    { href: '#notice-board', label: 'Notices' },
    { href: '#retro-zone', label: '90s Vault' },
  ];

  return (
    <>
      {/* Top Bar: Sticky Liquid-Glass Glassmorphism Capsule */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        retroMode 
          ? 'bg-[#c0c0c0] text-black border-b border-black win95-raised' 
          : `px-3 sm:px-6 lg:px-8 ${scrolled ? 'py-1.5' : 'py-2.5'}`
      }`}>
        <div className={`mx-auto max-w-7xl h-16 px-4 sm:px-6 transition-all duration-300 flex items-center justify-between relative ${
          retroMode
            ? 'w-full'
            : `rounded-2xl sm:rounded-full border backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${
                scrolled
                  ? 'bg-white/80 border-white/70 shadow-[0_14px_36px_-10px_rgba(10,39,36,0.18),inset_0_1px_1.5px_0_rgba(255,255,255,0.95)]'
                  : 'bg-white/65 border-white/50 shadow-[0_8px_30px_-8px_rgba(10,39,36,0.12),inset_0_1px_1.5px_0_rgba(255,255,255,0.85)]'
              }`
        }`}>
          {/* Subtle Specular Top Highlight for Liquid Glass Glare */}
          {!retroMode && (
            <div 
              className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none opacity-90" 
              aria-hidden="true" 
            />
          )}

          {/* Soft Glass Glow Ambient */}
          {!retroMode && (
            <div 
              className="absolute -top-10 left-1/4 w-72 h-16 bg-gradient-to-b from-white/35 to-transparent blur-xl pointer-events-none rounded-full" 
              aria-hidden="true" 
            />
          )}
          
          {/* ZONE 1: Brand Wordmark with Official 3D FISAT Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <a 
              href="#hero" 
              onClick={(e) => {
                sounds.playClick();
                if (onHomeClick) {
                  onHomeClick();
                }
              }}
              className="group focus-visible:outline-2 focus-visible:outline-[#c99a2e] rounded-full"
            >
              <Fisat3DLogo size="md" showLabel={true} retroMode={retroMode} />
            </a>
          </div>

          {/* ZONE 2: Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-sm font-medium relative z-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  if (onHomeClick) onHomeClick();
                }}
                className={`transition-all py-1.5 px-3.5 rounded-full text-xs font-semibold ${
                  retroMode
                    ? 'font-mono hover:text-[#000080] hover:underline'
                    : 'text-[#2e4742] hover:text-[#0a2724] hover:bg-white/70 hover:shadow-xs'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ZONE 3: Primary Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 relative z-10">
            
            {/* Command Palette Button */}
            <ButtonHoverPreview
              title="Command Search Palette"
              description="Quick jump to all 6 academic departments, admissions calculator, campus map, and recent circulars."
              badge="SHORTCUT"
              position="bottom"
              retroMode={retroMode}
            >
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenSearch();
                }}
                title="Search and Jump (Ctrl+K)"
                className={`p-2 text-xs flex items-center gap-1.5 transition-all duration-200 ${
                  retroMode 
                    ? 'win95-button text-black' 
                    : 'bg-white/60 hover:bg-white/95 text-[#2e4742] hover:text-[#0a2724] border border-white/70 rounded-full shadow-xs hover:shadow-sm'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-mono text-[11px] opacity-75">⌘K</span>
              </button>
            </ButtonHoverPreview>

            {/* 8-bit Audio Toggle */}
            <ButtonHoverPreview
              title="8-Bit Sound Synthesizer"
              description="Web Audio API acoustic feedback for clicks, warps, and chimes."
              badge="AUDIO"
              position="bottom"
              retroMode={retroMode}
            >
              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Mute 8-bit Audio' : 'Enable 8-bit Audio FX'}
                className={`p-2 transition-all duration-200 ${
                  retroMode 
                    ? 'win95-button' 
                    : soundEnabled 
                      ? 'bg-amber-100/90 text-amber-900 border border-amber-300/80 rounded-full shadow-xs' 
                      : 'bg-white/60 hover:bg-white/95 text-[#2e4742] hover:text-[#0a2724] border border-white/70 rounded-full shadow-xs'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </ButtonHoverPreview>

            {/* 90s Retro Warp Switch */}
            <ButtonHoverPreview
              title="90s Retro Warp Engine"
              description="Toggle nostalgic Windows 95 CRT computer aesthetic and vintage theme."
              badge="THEME"
              position="bottom"
              retroMode={retroMode}
            >
              <button
                onClick={toggleRetro}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
                  retroMode
                    ? 'bg-yellow-300 text-black border-2 border-black font-mono shadow-[2px_2px_0px_#000]'
                    : 'bg-[#0f3b3a]/10 hover:bg-[#0f3b3a]/15 text-[#0f3b3a] border border-[#0f3b3a]/20 shadow-xs hover:shadow-sm'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{retroMode ? 'Modern Mode' : '90s Retro'}</span>
                <span className="sm:hidden">{retroMode ? 'Mod' : '90s'}</span>
              </button>
            </ButtonHoverPreview>

            {/* Primary CTA: Apply 2026 */}
            <ButtonHoverPreview
              title="Admissions 2026 Directorate"
              description="Open online application checklist, merit scholarship brackets, and seat allocations."
              badge="ADMISSIONS"
              position="bottom"
              retroMode={retroMode}
            >
              <button
                onClick={() => {
                  sounds.playSuccess();
                  onOpenApply();
                }}
                className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                  retroMode
                    ? 'bg-[#000080] text-white border-2 border-black font-mono'
                    : 'bg-gradient-to-r from-[#d9aa38] via-[#c99a2e] to-[#b38520] hover:brightness-105 text-[#1a1405] rounded-full shadow-md shadow-amber-950/15 border border-[#fff2b2]/40'
                }`}
              >
                Apply 2026
              </button>
            </ButtonHoverPreview>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 lg:hidden ${
                retroMode ? 'win95-button' : 'rounded-full bg-white/60 hover:bg-white/90 border border-white/70 text-[#2e4742]'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className={`lg:hidden max-w-7xl mx-auto mt-2 px-4 py-3 space-y-1.5 transition-all ${
            retroMode 
              ? 'bg-[#c0c0c0] border-black win95-sunken' 
              : 'rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/70 shadow-2xl shadow-black/10'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 text-sm font-semibold rounded-xl ${
                  retroMode
                    ? 'hover:bg-[#000080] hover:text-white font-mono'
                    : 'text-[#12211e] hover:bg-white/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
