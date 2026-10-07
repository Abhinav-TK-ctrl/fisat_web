import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Globe, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface FooterProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  retroMode,
  langMalayalam,
  onOpenApply,
}) => {
  return (
    <footer className={`border-t transition-colors ${
      retroMode 
        ? 'bg-[#000080] text-white border-black font-mono' 
        : 'bg-[#0a2724] text-slate-300 border-emerald-950'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Institutional Brand & Accreditation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md flex items-center justify-center shrink-0 border border-[#c99a2e]/40">
                <img
                  src="/logo.png"
                  alt="FISAT Official Crest Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white font-heading leading-tight">
                  FISAT ANGAMALY
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#c99a2e] uppercase">
                  Focus on Excellence · Autonomous
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300/80 leading-relaxed max-w-sm">
              Federal Institute of Science and Technology (FISAT) is an autonomous-grade premier engineering academy established by the Federal Bank Officers’ Association Educational Society (FBOAES).
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded bg-white/10 text-emerald-300 border border-white/10">
                NAAC A++ ACCREDITED
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-amber-300 border border-white/10">
                NBA TIER-1 ACCREDITED
              </span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-cyan-300 border border-white/10">
                KTU AFFILIATED
              </span>
            </div>
          </div>

          {/* Col 3: Academic Faculties */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">
              Academic Faculties
            </h4>
            <ul className="space-y-2 text-slate-300/80">
              <li><a href="#departments" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">Computer Science &amp; Engg</a></li>
              <li><a href="#departments" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">Electronics &amp; Communication</a></li>
              <li><a href="#departments" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">Electrical &amp; Electronics</a></li>
              <li><a href="#departments" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">Mechanical Engineering</a></li>
              <li><a href="#departments" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">Civil Engineering</a></li>
              <li><a href="#departments" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">MCA &amp; MBA Business School</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Admissions */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">
              Admissions &amp; Portals
            </h4>
            <ul className="space-y-2 text-slate-300/80">
              <li>
                <button onClick={onOpenApply} className="text-[#c99a2e] hover:underline font-bold text-left">
                  Apply Online (2026 Batch)
                </button>
              </li>
              <li><a href="#admissions" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">KEAM Cutoff Matrix</a></li>
              <li><a href="#notice-board" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">Placement Cell Statistics</a></li>
              <li><a href="#campus-map" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">Campus Map &amp; Transport</a></li>
              <li><a href="#achievement-lane" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">Achievement Chronicles</a></li>
              <li><a href="#retro-zone" onClick={() => sounds.playClick()} className="hover:text-white transition-colors">1995 Nostalgia Vault</a></li>
            </ul>
          </div>

          {/* Col 5: Campus Address & Contact */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">
              Campus Directorate
            </h4>
            <div className="space-y-2 text-slate-300/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c99a2e] shrink-0 mt-0.5" />
                <span>Hormis Nagar, Mookkannoor P.O., Angamaly, Ernakulam, Kerala – 683577</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c99a2e] shrink-0" />
                <span>+91 484 2725272 / 2725026</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c99a2e] shrink-0" />
                <span>admissions@fisat.ac.in</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2002–2026 Federal Institute of Science and Technology (FISAT). All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span>ISO 9001:2015 CERTIFIED</span>
            <span>·</span>
            <span>AICTE APPROVED</span>
            <span>·</span>
            <span>NBA TIER 1</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
