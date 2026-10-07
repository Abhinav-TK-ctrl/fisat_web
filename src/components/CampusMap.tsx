import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Building, Maximize2, Layers, Compass, Eye } from 'lucide-react';
import { CampusBuilding } from '../types';
import { CAMPUS_BUILDINGS, CAMPUS_IMAGES } from '../data/mockData';
import { sounds } from '../utils/audio';

interface CampusMapProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onSelectBuilding: (b: CampusBuilding) => void;
}

export const CampusMap: React.FC<CampusMapProps> = ({
  retroMode,
  langMalayalam,
  onSelectBuilding,
}) => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('main-block');
  const [hoveredBuildingId, setHoveredBuildingId] = useState<string | null>(null);

  const activeBuilding = CAMPUS_BUILDINGS.find((b) => b.id === selectedBuildingId) || CAMPUS_BUILDINGS[0];

  const getBuildingImage = (id: string) => {
    switch (id) {
      case 'labs-block': return CAMPUS_IMAGES.robotics;
      case 'library-block': return CAMPUS_IMAGES.library;
      case 'auditorium-block': return CAMPUS_IMAGES.concert;
      default: return CAMPUS_IMAGES.aerial;
    }
  };

  return (
    <section id="campus-map" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#0f3b3a] mb-2 font-mono">
          {langMalayalam ? 'ക്യാമ്പസ് സന്ദർശനം' : 'SPATIAL TELEMETRY · 45-ACRE ANGAMALY CAMPUS'}
        </div>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          retroMode ? 'font-mono text-black' : 'font-heading text-[#0f3b3a]'
        }`}>
          {langMalayalam ? 'ക്യാമ്പസ് ഭൂപടം (Explore the Campus)' : 'Interactive Aerial Campus Map'}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#536762]">
          {langMalayalam
            ? 'യഥാർത്ഥ ക്യാമ്പസ് ചിത്രത്തിലെ കെട്ടിട പോയിന്റുകളിൽ ക്ലിക്ക് ചെയ്യുക. പ്രധാന ബ്ലോക്ക്, ലബോറട്ടറികൾ, ലൈബ്രറി, കാന്റീൻ, ഓഡിറ്റോറിയം എന്നിവ സന്ദർശിക്കുക.'
            : 'Point and click directly onto the actual aerial campus photo of FISAT. Inspect faculties, high-speed labs, library halls, and student centers.'}
        </p>
      </div>

      {/* Main Grid: Interactive Aerial Map + Building Inspector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Real Aerial Campus Photo with Interactive Pins & Radar */}
        <div className={`lg:col-span-8 p-4 sm:p-6 rounded-2xl border ${
          retroMode ? 'win95-raised' : 'bg-white border-[#d7e2df] shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono text-[#536762] pb-3 border-b border-slate-200 mb-4">
            <span className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-[#0f3b3a]" />
              <span>GEOLOCATION: 10.1983° N, 76.3862° E · HORMIS NAGAR, ANGAMALY</span>
            </span>
            <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
              CLICK PINS ON AERIAL PHOTO
            </span>
          </div>

          {/* Real Aerial Photo Container with Interactive Pins */}
          <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden shadow-inner border border-slate-300 select-none group">
            {/* Real Aerial Image */}
            <img
              src={CAMPUS_IMAGES.aerial}
              alt="FISAT Campus Aerial View"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Subtle Vignette & Grid Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Crosshair telemetry lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-full border border-white/40 grid grid-cols-3 grid-rows-3" />
            </div>

            {/* Interactive Pins Pointing Directly on the Real Campus Image */}
            {CAMPUS_BUILDINGS.map((b) => {
              const isSelected = b.id === selectedBuildingId;
              const isHovered = b.id === hoveredBuildingId;

              return (
                <div
                  key={b.id}
                  style={{
                    left: `${b.pinX}%`,
                    top: `${b.pinY}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  onMouseEnter={() => setHoveredBuildingId(b.id)}
                  onMouseLeave={() => setHoveredBuildingId(null)}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedBuildingId(b.id);
                    onSelectBuilding(b);
                  }}
                >
                  {/* Radar Ripple Effect */}
                  <div className={`absolute -inset-3 rounded-full animate-ping pointer-events-none ${
                    isSelected ? 'bg-amber-400 opacity-75' : 'bg-emerald-400 opacity-30'
                  }`} />

                  {/* Pin Beacon */}
                  <div className={`relative flex items-center justify-center rounded-full transition-transform duration-200 shadow-xl ${
                    isSelected
                      ? 'w-10 h-10 bg-[#c99a2e] text-black scale-110 ring-4 ring-black/40 ring-offset-2'
                      : 'w-8 h-8 bg-[#0f3b3a] text-white hover:scale-110 hover:bg-[#16504d] border-2 border-white'
                  }`}>
                    <MapPin className={`w-4 h-4 ${isSelected ? 'fill-black text-black' : 'text-[#c99a2e]'}`} />
                  </div>

                  {/* Floating Tooltip Label */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md text-[11px] font-bold font-heading whitespace-nowrap shadow-lg pointer-events-none transition-all duration-200 ${
                    isSelected || isHovered
                      ? 'opacity-100 translate-y-0 bg-[#0f3b3a] text-[#c99a2e] border border-[#c99a2e]/40'
                      : 'opacity-0 translate-y-1 bg-black/80 text-white'
                  }`}>
                    {b.label}
                    {/* Tiny arrow bottom */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0f3b3a]" />
                  </div>
                </div>
              );
            })}

            {/* Live Campus Coordinates Overlay Badge */}
            <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/75 backdrop-blur-md rounded-lg text-white font-mono text-[10px] flex items-center gap-2 border border-white/10">
              <Compass className="w-3.5 h-3.5 text-[#c99a2e] animate-spin" />
              <span>CAMPUS RADAR: 45 ACRES · ANGAMALY</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#536762] font-mono">
            <span>Click any glowing pin on the photo to inspect the building dossier</span>
            <span>ELEVATION: 38M ABOVE SEA LEVEL</span>
          </div>
        </div>

        {/* Right Column: Building Dossier Inspection Card */}
        <div className={`lg:col-span-4 p-6 rounded-2xl border transition-all ${
          retroMode ? 'win95-raised text-black' : 'bg-white border-[#d7e2df] shadow-sm'
        }`}>
          {/* Selected Building Photo Preview */}
          <div className="aspect-16/9 rounded-xl overflow-hidden mb-4 bg-slate-900 shadow-inner relative">
            <img
              src={getBuildingImage(activeBuilding.id)}
              alt={activeBuilding.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-mono rounded">
              {activeBuilding.sqft}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase font-mono tracking-widest text-[#b5502e] font-semibold">
                BUILDING DOSSIER
              </div>
              <h3 className={`text-xl font-bold text-[#0f3b3a] mt-1 ${
                retroMode ? 'font-mono text-black' : 'font-heading'
              }`}>
                {activeBuilding.name}
              </h3>
              <p className="mt-2 text-xs text-[#536762] leading-relaxed">
                {activeBuilding.description}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-100 text-xs">
              <div>
                <span className="text-[#536762] block font-mono text-[11px]">Elevation:</span>
                <span className="font-bold text-[#12211e]">{activeBuilding.floors} Storeys</span>
              </div>
              <div>
                <span className="text-[#536762] block font-mono text-[11px]">Timings:</span>
                <span className="font-bold text-[#12211e]">{activeBuilding.timings}</span>
              </div>
            </div>

            {/* Facilities Included */}
            <div>
              <div className="text-xs font-mono font-bold text-[#12211e] mb-2 uppercase">
                Housed Facilities:
              </div>
              <ul className="text-xs text-[#536762] space-y-1">
                {activeBuilding.facilities.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c99a2e]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Open Full Inspection Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onSelectBuilding(activeBuilding);
              }}
              className={`w-full py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
                retroMode
                  ? 'win95-button text-black font-mono border-2 border-black'
                  : 'bg-[#0f3b3a] hover:bg-[#16504d] text-white shadow-sm'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#c99a2e]" />
              <span>Inspect Building Blueprint &amp; Details</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
