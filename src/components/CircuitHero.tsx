import React from 'react';
import { ArrowRight, Cpu, Compass, Award } from 'lucide-react';
import { Fisat3DLogo } from './Fisat3DLogo';
import { sounds } from '../utils/audio';
import { RollingCounter } from './RollingCounter';
import { ButtonHoverPreview } from './ButtonHoverPreview';
import fisatHeroBg from '../assets/images/fisat_campus_hero.jpg';

interface CircuitHeroProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onExploreStreams: () => void;
  onOpenCalculator: () => void;
}

export const CircuitHero: React.FC<CircuitHeroProps> = ({
  retroMode,
  langMalayalam,
  onExploreStreams,
  onOpenCalculator,
}) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[680px] lg:min-h-[760px] flex items-center overflow-hidden bg-slate-900"
    >
      {/* Real FISAT Campus Hero Image (Full-width, natural, cinematic) */}
      <img
        src={fisatHeroBg}
        alt="Federal Institute of Science and Technology (FISAT) Campus"
        className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
        loading="eager"
        fetchPriority="high"
        referrerPolicy="no-referrer"
      />

      {/* Subtle Cinematic Dark Gradient Overlay (Keeps building natural, bright & recognizable while making text crisp) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: retroMode
            ? 'linear-gradient(to right, rgba(0, 0, 128, 0.75) 0%, rgba(0, 0, 128, 0.35) 55%, transparent 100%)'
            : 'linear-gradient(to right, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.45) 42%, rgba(0, 0, 0, 0.08) 75%, transparent 100%), linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 35%)',
        }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-white w-full">
        <div className="max-w-3xl">
          
          {/* Institutional Trust Badging & 3D Logo */}
          <div className="flex flex-wrap items-center gap-3.5 mb-5 sm:mb-6">
            <Fisat3DLogo size="lg" showLabel={false} retroMode={retroMode} />
            
            <ButtonHoverPreview
              title="Apex Accreditation & Autonomous Governance"
              description="Conferred 10-year Autonomous status by UGC. Re-accredited with NAAC A+ (3.45 CGPA), NBA Tier-1 across undergraduate programs, and ISO 21001:2018 certified."
              badge="GOVT VERIFIED"
              position="bottom"
              retroMode={retroMode}
            >
              <div className={`inline-flex items-center transition-all duration-300 cursor-help ${
                retroMode
                  ? 'win95-raised p-1 bg-white border-2 border-black'
                  : 'hover:scale-105 transition-transform'
              }`}>
                <img
                  src="/accredited-logos.png"
                  alt="NBA Accredited Programmes · NAAC A+ Grade Accredited Institution · ISO 21001:2018"
                  className="h-10 sm:h-12 md:h-13 w-auto object-contain drop-shadow-lg rounded-xl"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </ButtonHoverPreview>
          </div>

          {/* Grand Editorial Headline */}
          <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.04] text-balance mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] ${
            retroMode ? 'font-mono text-yellow-300' : 'font-heading text-white'
          }`}>
            Where Angamaly Builds<br />
            <span className={retroMode ? 'text-white' : 'text-[#f5df9b]'}>
              What Comes Next.
            </span>
          </h1>

          {/* Subtitle Editorial Prose */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-100 font-normal leading-relaxed max-w-2xl mb-8 text-pretty drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            Federal Institute of Science and Technology (FISAT). Four transformative years, world-class research laboratories, and an inspiring synthesis of engineering discipline and creative exploration in lush Hormis Nagar.
          </p>

          {/* Action CTAs with Hover Previews */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <ButtonHoverPreview
              title="Achievement Lane (2002–2025)"
              description="Explore 23-year historical journey: Foundation by KP Hormis & FBOAES, MIKA Humanoid Robot, MIT FabLab, and UGC Autonomous status."
              badge="HISTORIC TIMELINE"
              position="top"
              retroMode={retroMode}
            >
              <a
                href="#achievement-lane"
                onClick={() => sounds.playClick()}
                className={`px-6 py-3.5 text-sm font-bold flex items-center gap-2 transition-all duration-200 active:scale-95 ${
                  retroMode
                    ? 'win95-button text-black font-mono border-2 border-black'
                    : 'bg-[#c99a2e] hover:bg-[#d6a738] text-[#1a1405] rounded-xl shadow-lg shadow-black/35 hover:shadow-black/50'
                }`}
              >
                <span>Explore Achievement Lane</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </ButtonHoverPreview>

            <ButtonHoverPreview
              title="Academic Streams & Labs"
              description="Interactive explorer for 6 departments: Computer Science, ECE, EEE, Mechanical, Civil & MBA/MCA with real-time simulations."
              badge="6 DEPARTMENTS"
              position="top"
              retroMode={retroMode}
            >
              <button
                onClick={() => {
                  sounds.playClick();
                  onExploreStreams();
                }}
                className={`px-5 py-3.5 text-sm font-medium transition-all duration-200 rounded-xl backdrop-blur-md ${
                  retroMode
                    ? 'win95-button text-black font-mono'
                    : 'bg-black/40 hover:bg-black/60 text-white border border-white/30 shadow-md hover:border-white/50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#c99a2e]" />
                  <span>Academic Streams</span>
                </span>
              </button>
            </ButtonHoverPreview>

            <ButtonHoverPreview
              title="Admissions Eligibility Calculator"
              description="Check Plus-Two PCM aggregate qualification, KEAM cutoffs, and calculate scholarships up to 100% fee waiver."
              badge="CALCULATOR"
              position="top"
              retroMode={retroMode}
            >
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenCalculator();
                }}
                className={`px-4 py-3.5 text-sm font-medium transition-all duration-200 rounded-xl text-emerald-200 hover:text-white ${
                  retroMode ? 'font-mono underline text-yellow-300' : 'hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-300" />
                  <span>Eligibility Calculator</span>
                </span>
              </button>
            </ButtonHoverPreview>
          </div>

          {/* Compact Announcement Marquee Ticker */}
          <div className="mt-4 w-full max-w-xl rounded-xl bg-black/40 backdrop-blur-md border border-white/15 hover:border-[#c99a2e]/40 p-2 overflow-hidden shadow-lg relative transition-colors group">
            {/* Subtle Gradient Fade Masks on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />

            <div className="flex w-max animate-marquee space-x-4 items-center">
              {/* Loop Instance 1 */}
              {[
                { id: 's1', src: '/slide0-1.png', alt: 'TCS, Wipro, Infosys, Accenture' },
                { id: 's2', src: '/slide2.png', alt: 'Cognizant, IBM, UST Global, IBS' },
                { id: 's3', src: '/slide5.png', alt: 'EY, PwC, Federal Bank, SOTI' },
                { id: 's4', src: '/slide7.png', alt: 'Capgemini, Mphasis, Mindtree, Envestnet, Hexaware' },
              ].map((item, idx) => (
                <div 
                  key={`slide-1-${idx}`} 
                  className="shrink-0 bg-white/95 hover:bg-white rounded-lg p-1.5 px-3 flex items-center justify-center border border-white/40 shadow-xs transition-transform duration-200 group-hover:scale-[1.02]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-5 sm:h-6 w-auto object-contain max-w-[150px] sm:max-w-[180px]"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Loop Instance 2 (Identical for seamless infinite scroll) */}
              {[
                { id: 's1', src: '/slide0-1.png', alt: 'TCS, Wipro, Infosys, Accenture' },
                { id: 's2', src: '/slide2.png', alt: 'Cognizant, IBM, UST Global, IBS' },
                { id: 's3', src: '/slide5.png', alt: 'EY, PwC, Federal Bank, SOTI' },
                { id: 's4', src: '/slide7.png', alt: 'Capgemini, Mphasis, Mindtree, Envestnet, Hexaware' },
              ].map((item, idx) => (
                <div 
                  key={`slide-2-${idx}`} 
                  className="shrink-0 bg-white/95 hover:bg-white rounded-lg p-1.5 px-3 flex items-center justify-center border border-white/40 shadow-xs transition-transform duration-200 group-hover:scale-[1.02]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-5 sm:h-6 w-auto object-contain max-w-[150px] sm:max-w-[180px]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Existing Section Divider */}
        <hr className="mt-8 mb-6 border-white/20" />

        {/* Quantifiable Proof Banner (Editorial University Presentation) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 hover:border-[#c99a2e]/50 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5df9b] font-heading tabular-nums">
              <RollingCounter value={3500} suffix="+" retroMode={retroMode} />
            </div>
            <div className="text-xs text-slate-200 mt-1 font-medium">Enrolled Scholars</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 hover:border-emerald-400/50 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-300 font-heading tabular-nums">
              <RollingCounter value={94.8} decimals={1} suffix="%" retroMode={retroMode} />
            </div>
            <div className="text-xs text-slate-200 mt-1 font-medium">Placement Track Record</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 hover:border-[#c99a2e]/50 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f5df9b] font-heading tabular-nums">
              <RollingCounter value={40} suffix="+" retroMode={retroMode} />
            </div>
            <div className="text-xs text-slate-200 mt-1 font-medium">Specialized Lab Facilities</div>
          </div>
          <div className="p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 hover:border-amber-400/50 transition-colors">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-300 font-heading tabular-nums">
              <RollingCounter value={32} prefix="₹" suffix=" LPA" retroMode={retroMode} />
            </div>
            <div className="text-xs text-slate-200 mt-1 font-medium">Highest Package Record</div>
          </div>
        </div>

      </div>
    </section>
  );
};
