import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Trophy, Calendar, Briefcase, Bot } from 'lucide-react';
import { sounds } from '../utils/audio';
import { CAMPUS_IMAGES } from '../data/mockData';

interface SlideShowShowcaseProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onOpenApply: () => void;
  onNavigateNotice: () => void;
  onNavigateLabs: () => void;
}

interface SlideItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  action: () => void;
  bgGradient: string;
  bgImage?: string;
  icon: React.ReactNode;
}

export const SlideShowShowcase: React.FC<SlideShowShowcaseProps> = ({
  retroMode,
  langMalayalam,
  onOpenApply,
  onNavigateNotice,
  onNavigateLabs,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const slides: SlideItem[] = [
    {
      id: 'slide-admissions',
      badge: 'ADMISSIONS 2026–2027 · HORMIS NAGAR',
      title: langMalayalam ? 'പ്രവേശനം ആരംഭിച്ചു: ഓൺലൈനായി അപേക്ഷിക്കാം' : 'B.Tech & MCA Admissions 2026 Are Open',
      subtitle: langMalayalam ? 'മെറിറ്റ് സ്കോളർഷിപ്പുകളും സീറ്റ് അലോട്ട്മെന്റും' : 'Federal Institute of Science and Technology, Angamaly',
      description: 'Merit scholarships up to 100% tuition waiver for top KEAM rankers. Direct document verification at Hormis Nagar Admissions Directorate. Autonomous KTU Curriculum.',
      ctaText: langMalayalam ? 'യോഗ്യത പരിശോധിക്കുക' : 'Check Eligibility & Apply',
      action: onOpenApply,
      bgGradient: 'from-[#072420] via-[#0f3b3a]/90 to-[#0a2724]/75',
      bgImage: CAMPUS_IMAGES.entrance,
      icon: <Sparkles className="w-5 h-5 text-[#c99a2e]" />,
    },
    {
      id: 'slide-techfest',
      badge: 'FLAGSHIP TECHNO-CULTURAL CONCLAVE',
      title: langMalayalam ? 'നക്ഷത്ര 2026: നാഷണൽ ടെക് ഫെസ്റ്റ്' : 'Nakshatra 2026 Is Coming: Register Now',
      subtitle: langMalayalam ? 'റോബോവാർസ്, 36 മണിക്കൂർ ഹാക്കത്തോൺ, നൈറ്റ് കൺസേർട്ട്' : 'Robowars, 36-Hour Hackathon & Star Concert Night',
      description: 'Teams from over 120 premier institutions compete for ₹10 Lakhs in prizes. Campus illuminated around the clock from Oct 12–14.',
      ctaText: langMalayalam ? 'വിവരങ്ങൾ കാണുക' : 'View Fest Circular & Delegations',
      action: onNavigateNotice,
      bgGradient: 'from-[#b5502e] via-[#8f3619] to-[#451406]',
      bgImage: CAMPUS_IMAGES.concert,
      icon: <Calendar className="w-5 h-5 text-amber-300" />,
    },
    {
      id: 'slide-placements',
      badge: 'CAREER ACCELERATION & GLOBAL RECRUITERS',
      title: langMalayalam ? 'പ്ലേസ്‌മെന്റ് ഡ്രൈവ്: ₹32 LPA റെക്കോർഡ് പാക്കേജ്' : 'Placements That Start Early: Record ₹32 LPA',
      subtitle: langMalayalam ? '180-ലധികം മുൻനിര കമ്പനികൾ ക്യാമ്പസിലെത്തുന്നു' : '180+ Top Corporates · 94.8% Career Conversion',
      description: 'Systematic coding bootcamps, mock corporate interviews, and dedicated recruitment sessions with Microsoft, Bosch, TCS, Cognizant, and Zoho.',
      ctaText: langMalayalam ? 'പ്ലേസ്‌മെന്റ് വിവരങ്ങൾ' : 'Inspect Placement Statistics',
      action: onNavigateNotice,
      bgGradient: 'from-[#1c3d5a] via-[#0f2c42] to-[#081824]',
      bgImage: CAMPUS_IMAGES.library,
      icon: <Briefcase className="w-5 h-5 text-cyan-300" />,
    },
    {
      id: 'slide-robotics',
      badge: 'INNOVATION & SUPER FABLAB KERALA',
      title: langMalayalam ? 'എം.ഐ.ടി ഫാബ്‌ലാബും മീക ഹ്യൂമനോയിഡ് റോബോട്ടും' : 'MIT Super FabLab & MIKA Humanoid Robot',
      subtitle: langMalayalam ? 'കൊച്ചി മെട്രോയ്ക്കായി വിദ്യാർത്ഥികൾ നിർമ്മിച്ച റോബോട്ട്' : 'Student-Built Humanoid for Kochi Metro & Research Centers',
      description: 'Explore the state-of-the-art additive prototyping suite, autonomous vehicle workshops, and the AI supercluster lab at FISAT.',
      ctaText: langMalayalam ? 'ലാബുകൾ സന്ദർശിക്കുക' : 'Inspect Research Laboratories',
      action: onNavigateLabs,
      bgGradient: 'from-[#3b1d5c] via-[#24103a] to-[#12071e]',
      bgImage: CAMPUS_IMAGES.mikaRobot,
      icon: <Bot className="w-5 h-5 text-purple-300" />,
    },
  ];

  // Automatic slideshow timer
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const handleNext = () => {
    sounds.playClick();
    setSlideDirection('next');
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    sounds.playClick();
    setSlideDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section 
      id="showcase-slides" 
      aria-roledescription="carousel"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer 3D Perspective Card */}
      <div 
        className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 border ${
          retroMode
            ? 'win95-raised text-black border-2 border-black'
            : 'border-white/20 shadow-emerald-950/20'
        }`}
        style={{ perspective: '1200px' }}
      >
        {/* Animated Slide Surface */}
        <div 
          key={current.id}
          className={`relative min-h-[340px] sm:min-h-[380px] p-8 sm:p-14 flex flex-col justify-between text-white transition-all duration-700 ease-out bg-gradient-to-r ${current.bgGradient} ${
            slideDirection === 'next' ? 'animate-in fade-in slide-in-from-right-8' : 'animate-in fade-in slide-in-from-left-8'
          }`}
        >
          {/* Beautiful College Photo Background with Cinematic Gradient Vignette */}
          {current.bgImage && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={current.bgImage}
                alt="FISAT Campus"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 opacity-60 mix-blend-luminosity"
              />
              {/* Rich artistic collegiate gradient overlay ensuring readability while letting the real campus architecture glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#051c19]/95 via-[#082823]/80 to-[#0a2724]/40" />
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60" />
            </div>
          )}

          {/* Top Row: Badge & Slide Index */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-mono font-bold tracking-wider text-[#c99a2e] border border-white/10">
              {current.icon}
              <span>{current.badge}</span>
            </div>

            <div className="text-xs font-mono font-bold tracking-widest text-white/70 bg-black/30 px-3 py-1 rounded-full border border-white/10">
              SLIDE {currentSlide + 1} / {slides.length}
            </div>
          </div>

          {/* Middle Row: Slide Typography */}
          <div className="relative z-10 max-w-3xl my-6 space-y-3">
            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
              retroMode ? 'font-mono text-yellow-300' : 'font-heading'
            }`}>
              {current.title}
            </h2>

            <p className="text-base sm:text-xl font-medium text-amber-200/90 leading-snug">
              {current.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-200/80 max-w-2xl leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Bottom Row: Action Trigger & Slide Dots */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                sounds.playSuccess();
                current.action();
              }}
              className={`px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg ${
                retroMode
                  ? 'win95-button text-black font-mono border-2 border-black'
                  : 'bg-[#c99a2e] hover:bg-[#d6a738] text-black shadow-amber-950/30'
              }`}
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Slide Pagination Dots */}
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    sounds.playClick();
                    setSlideDirection(idx > currentSlide ? 'next' : 'prev');
                    setCurrentSlide(idx);
                  }}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className={`h-2 transition-all rounded-full ${
                    idx === currentSlide
                      ? 'w-8 bg-[#c99a2e]'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Previous / Next Arrow Controls */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-all opacity-80 hover:opacity-100 z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Autoplay Slide Progress Bar at the Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div 
              key={currentSlide}
              className="h-full bg-[#c99a2e] transition-all duration-[6000ms] linear"
              style={{
                width: isHovered ? '100%' : '100%',
                animation: isHovered ? 'none' : 'slideProgress 6s linear forwards',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
