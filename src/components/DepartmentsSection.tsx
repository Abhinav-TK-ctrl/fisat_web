import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Cog, 
  Building2, 
  Briefcase, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Play, 
  Pause,
  Award,
  Sparkles
} from 'lucide-react';
import { Department } from '../types';
import { DEPARTMENTS_DATA } from '../data/mockData';
import { sounds } from '../utils/audio';
import { ButtonHoverPreview } from './ButtonHoverPreview';

interface DepartmentsSectionProps {
  retroMode: boolean;
  langMalayalam: boolean;
  onOpenDeptModal: (dept: Department) => void;
  onOpenDeptPage: (dept: Department) => void;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({
  retroMode,
  langMalayalam,
  onOpenDeptModal,
  onOpenDeptPage,
}) => {
  const [activeDeptIndex, setActiveDeptIndex] = useState<number>(0);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('up');
  
  // Interactive Simulation Controls
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(true);
  const [simTick, setSimTick] = useState<number>(0);

  const activeDept = DEPARTMENTS_DATA[activeDeptIndex];

  // Dynamic animation ticker for department visualizations
  useEffect(() => {
    if (!isSimPlaying) return;
    const interval = setInterval(() => {
      setSimTick((t) => (t + 1) % 360);
    }, 40 / simSpeed);
    return () => clearInterval(interval);
  }, [isSimPlaying, simSpeed]);

  const handleNextDept = () => {
    sounds.playClick();
    setTransitionDirection('down');
    setActiveDeptIndex((prev) => (prev + 1) % DEPARTMENTS_DATA.length);
  };

  const handlePrevDept = () => {
    sounds.playClick();
    setTransitionDirection('up');
    setActiveDeptIndex((prev) => (prev - 1 + DEPARTMENTS_DATA.length) % DEPARTMENTS_DATA.length);
  };

  const handleSelectDept = (index: number) => {
    sounds.playClick();
    setTransitionDirection(index > activeDeptIndex ? 'down' : 'up');
    setActiveDeptIndex(index);
  };

  const getDeptIcon = (id: string) => {
    switch (id) {
      case 'cse': return <Terminal className="w-4 h-4" />;
      case 'ece': return <Cpu className="w-4 h-4" />;
      case 'eee': return <Zap className="w-4 h-4" />;
      case 'me': return <Cog className="w-4 h-4" />;
      case 'ce': return <Building2 className="w-4 h-4" />;
      case 'mca-mba': return <Briefcase className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  // Render dedicated interactive animated simulation per department
  const renderInteractiveSimulation = () => {
    const angle = simTick;
    const rad = (angle * Math.PI) / 180;

    switch (activeDept.id) {
      case 'cse':
        // CSE: Neural Tensor Graph with pulsating synaptic pulses and binary code cascade
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#051412] text-emerald-400 font-mono text-xs overflow-hidden select-none">
            {/* Background cascading binary rain */}
            <div className="absolute inset-0 opacity-15 overflow-hidden font-mono text-[10px] leading-3 pointer-events-none">
              {Array.from({ length: 8 }).map((_, r) => (
                <div key={r} className="whitespace-nowrap animate-pulse">
                  {`101100101010011101001101010101100101010011101010110010101001110100110101010110010101001110`.slice(
                    (r * 7 + (simTick % 20)) % 40
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-b border-emerald-950 pb-2 z-10">
              <span className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>NVIDIA_GPU_CLUSTER://NODE_04</span>
              </span>
              <span className="text-emerald-600 text-[10px]">EPOCH: {(simTick * 3) % 1000}/1000 · LOSS: {(0.042 - Math.sin(rad) * 0.008).toFixed(4)}</span>
            </div>

            {/* Neural synapsis SVG */}
            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 z-10 stroke-emerald-400 fill-none" strokeWidth="2">
              <circle cx="50" cy="40" r="12" fill="#042f2c" stroke="#10b981" />
              <circle cx="50" cy="80" r="12" fill="#042f2c" stroke="#10b981" />
              <circle cx="50" cy="120" r="12" fill="#042f2c" stroke="#10b981" />

              <circle cx="180" cy="30" r="14" fill="#064e3b" stroke="#34d399" />
              <circle cx="180" cy="80" r="16" fill="#065f46" stroke="#34d399" strokeWidth="3" />
              <circle cx="180" cy="130" r="14" fill="#064e3b" stroke="#34d399" />

              <circle cx="310" cy="55" r="15" fill="#022c22" stroke="#6ee7b7" />
              <circle cx="310" cy="105" r="15" fill="#022c22" stroke="#6ee7b7" />

              {/* Dynamic synaptic lines */}
              <line x1="62" y1="40" x2="166" y2="30" strokeOpacity={0.4 + Math.sin(rad) * 0.4} />
              <line x1="62" y1="40" x2="164" y2="80" strokeOpacity={0.6 + Math.cos(rad) * 0.3} strokeWidth={2.5} />
              <line x1="62" y1="80" x2="164" y2="80" strokeWidth="3" stroke="#34d399" />
              <line x1="62" y1="120" x2="164" y2="80" strokeOpacity={0.5} />
              <line x1="62" y1="120" x2="166" y2="130" strokeOpacity={0.7} />

              <line x1="194" y1="30" x2="295" y2="55" strokeOpacity={0.8} />
              <line x1="196" y1="80" x2="295" y2="55" strokeWidth="3" stroke="#6ee7b7" />
              <line x1="196" y1="80" x2="295" y2="105" strokeWidth="2.5" />
              <line x1="194" y1="130" x2="295" y2="105" strokeOpacity={0.5} />

              {/* Moving data packets along lines */}
              <circle
                cx={62 + (196 - 62) * ((simTick % 60) / 60)}
                cy={80}
                r="4"
                fill="#facc15"
              />
              <circle
                cx={196 + (295 - 196) * ((simTick % 40) / 40)}
                cy={55}
                r="4"
                fill="#facc15"
              />
            </svg>

            <div className="flex items-center justify-between text-[10px] text-emerald-500/80 border-t border-emerald-950 pt-1.5 z-10">
              <span>WEIGHTS: 1.7B PARAMS</span>
              <span>INFERENCE: 14.2ms / TOKEN</span>
            </div>
          </div>
        );

      case 'ece':
        // ECE: Real-time Oscillating Waveform & Cadence VLSI Demodulator
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#0a081a] text-amber-300 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-indigo-950 pb-2">
              <span className="flex items-center gap-2 text-amber-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>TEKTRONIX_OSCILLOSCOPE://CH1_5GHz</span>
              </span>
              <span className="text-amber-500 text-[10px]">CADENCE EDA 7nm</span>
            </div>

            {/* Dynamic Oscillating Waveform */}
            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 stroke-amber-400 fill-none" strokeWidth="2">
              {/* Grid lines */}
              <line x1="0" y1="80" x2="360" y2="80" stroke="#312e81" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="180" y1="0" x2="180" y2="160" stroke="#312e81" strokeWidth="1" strokeDasharray="4 4" />

              {/* Real-time calculated sinusoidal path */}
              <path
                d={Array.from({ length: 72 })
                  .map((_, i) => {
                    const x = i * 5;
                    const y = 80 + Math.sin((x / 25) + rad * 2) * 45 * Math.cos(rad);
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                  })
                  .join(' ')}
                stroke="#fbbf24"
                strokeWidth="2.5"
              />

              {/* Carrier Envelope */}
              <path
                d={Array.from({ length: 72 })
                  .map((_, i) => {
                    const x = i * 5;
                    const y = 80 + Math.sin((x / 50) + rad) * 22;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                  })
                  .join(' ')}
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />

              {/* Logic state indicators */}
              <rect x="260" y="20" width="85" height="40" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="302" y="38" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">
                CLOCK: {(100 + Math.sin(rad) * 10).toFixed(0)} MHz
              </text>
              <text x="302" y="52" textAnchor="middle" fill="#34d399" fontSize="9">
                PLL: LOCKED
              </text>
            </svg>

            <div className="flex items-center justify-between text-[10px] text-amber-500/80 border-t border-indigo-950 pt-1.5">
              <span>VLSI SILICON WAFER DIE #A7</span>
              <span>RF TELEMETRY: ACTIVE</span>
            </div>
          </div>
        );

      case 'eee':
        // EEE: Smart Microgrid & Solar/Wind Turbines Power Flow
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#141202] text-yellow-300 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-yellow-950 pb-2">
              <span className="flex items-center gap-2 text-yellow-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                <span>SCADA_SMART_GRID://100kW_SOLAR</span>
              </span>
              <span className="text-yellow-500 text-[10px]">FREQ: {(50.0 + Math.sin(rad) * 0.05).toFixed(2)} Hz</span>
            </div>

            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 stroke-yellow-400 fill-none" strokeWidth="2">
              {/* Spinning Wind Turbine */}
              <g transform="translate(70, 75)">
                <line x1="0" y1="0" x2="0" y2="70" stroke="#eab308" strokeWidth="3" />
                <circle cx="0" cy="0" r="6" fill="#facc15" />
                {/* 3 Rotating Blades */}
                {[0, 120, 240].map((rot) => (
                  <line
                    key={rot}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-42"
                    stroke="#fde047"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform={`rotate(${rot + simTick * 2.5})`}
                  />
                ))}
              </g>

              {/* Power Transmission Lines */}
              <path d="M 70 75 H 170 M 170 30 V 140 M 170 85 H 280" stroke="#fef08a" strokeWidth="2" strokeDasharray="5 3" />
              
              {/* Central Transformer Station */}
              <rect x="150" y="65" width="40" height="40" rx="6" fill="#422006" stroke="#facc15" strokeWidth="2" />
              <text x="170" y="88" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">11kV</text>

              {/* Battery Storage Bank */}
              <rect x="270" y="60" width="60" height="50" rx="6" fill="#1c1917" stroke="#22c55e" strokeWidth="2" />
              <text x="300" y="82" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">BMS EV</text>
              <rect x="280" y="90" width={`${Math.min(40, 20 + Math.sin(rad) * 18)}`} height="8" rx="2" fill="#22c55e" />

              {/* Animated electricity pulse dots */}
              <circle cx={70 + ((150 - 70) * ((simTick % 50) / 50))} cy={75} r="3.5" fill="#facc15" />
              <circle cx={190 + ((270 - 190) * ((simTick % 50) / 50))} cy={85} r="3.5" fill="#22c55e" />
            </svg>

            <div className="flex items-center justify-between text-[10px] text-yellow-500/80 border-t border-yellow-950 pt-1.5">
              <span>SOLAR EFFICIENCY: 94.6%</span>
              <span>GRID STABILITY: NORMAL</span>
            </div>
          </div>
        );

      case 'me':
        // ME: Rotating Planetary Gear Mesh & Subsonic Fluid Velocity
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#140802] text-orange-300 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-orange-950 pb-2">
              <span className="flex items-center gap-2 text-orange-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                <span>BAJA_SAE_RACING://CFD_AERO_SIM</span>
              </span>
              <span className="text-orange-500 text-[10px]">MACH 0.28 · 5-AXIS CNC</span>
            </div>

            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 stroke-orange-400 fill-none" strokeWidth="2">
              {/* Big Gear Left (Rotates clockwise) */}
              <g transform="translate(100, 80)">
                <circle cx="0" cy="0" r="46" fill="#292524" stroke="#fb923c" strokeWidth="3" />
                <circle cx="0" cy="0" r="14" fill="#0c0a09" stroke="#fed7aa" />
                {/* Gear Teeth */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <rect
                    key={i}
                    x="-4"
                    y="-50"
                    width="8"
                    height="8"
                    rx="1"
                    fill="#fb923c"
                    transform={`rotate(${i * 30 + simTick * 1.5})`}
                  />
                ))}
              </g>

              {/* Small Gear Right (Rotates counter-clockwise) */}
              <g transform="translate(182, 80)">
                <circle cx="0" cy="0" r="32" fill="#292524" stroke="#f97316" strokeWidth="3" />
                <circle cx="0" cy="0" r="10" fill="#0c0a09" stroke="#fed7aa" />
                {/* Gear Teeth */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="-3.5"
                    y="-36"
                    width="7"
                    height="7"
                    rx="1"
                    fill="#f97316"
                    transform={`rotate(${i * 45 - simTick * 2.14})`}
                  />
                ))}
              </g>

              {/* Aerodynamic streamline curves passing across */}
              <path
                d={`M 220 50 Q 280 ${50 + Math.sin(rad) * 12} 350 45`}
                stroke="#fdba74"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d={`M 220 80 Q 280 ${80 + Math.sin(rad + 1) * 15} 350 78`}
                stroke="#fed7aa"
                strokeWidth="2.5"
              />
              <path
                d={`M 220 110 Q 280 ${110 + Math.sin(rad + 2) * 12} 350 112`}
                stroke="#fdba74"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>

            <div className="flex items-center justify-between text-[10px] text-orange-500/80 border-t border-orange-950 pt-1.5">
              <span>RPM: {(1800 * simSpeed).toFixed(0)}</span>
              <span>TORQUE: 240 N·m · ANSYS MESH</span>
            </div>
          </div>
        );

      case 'ce':
        // CE: Structural Tension/Compression Deformation & Drone GIS
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#021017] text-cyan-300 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-cyan-950 pb-2">
              <span className="flex items-center gap-2 text-cyan-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>REVIT_BIM://SEISMIC_BRIDGE_ANALYSIS</span>
              </span>
              <span className="text-cyan-500 text-[10px]">STAAD.PRO SIM</span>
            </div>

            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 stroke-cyan-400 fill-none" strokeWidth="2">
              {/* Ground & Bridge Road Deck */}
              <line x1="20" y1="120" x2="340" y2="120" stroke="#0284c7" strokeWidth="4" />
              
              {/* Dynamic load deflection on middle node */}
              {(() => {
                const defY = 120 + Math.sin(rad) * 6;
                return (
                  <>
                    {/* Truss Web */}
                    <path
                      d={`M 20 120 L 70 50 L 125 120 L 180 ${50 + Math.sin(rad) * 5} L 235 120 L 290 50 L 340 120`}
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                    <path
                      d={`M 70 50 H 290`}
                      stroke="#7dd3fc"
                      strokeWidth="3"
                    />
                    {/* Stress load arrows moving down on center */}
                    <line x1="180" y1="20" x2="180" y2="45" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
                    <circle cx="180" cy="50" r="5" fill="#f43f5e" />
                    <text x="180" y="15" textAnchor="middle" fill="#fda4af" fontSize="9" fontWeight="bold">
                      {(140 + Math.sin(rad) * 20).toFixed(0)} kN LOAD
                    </text>
                  </>
                );
              })()}

              {/* Concrete Foundations */}
              <rect x="15" y="122" width="25" height="25" fill="#0369a1" />
              <rect x="320" y="122" width="25" height="25" fill="#0369a1" />
            </svg>

            <div className="flex items-center justify-between text-[10px] text-cyan-500/80 border-t border-cyan-950 pt-1.5">
              <span>EARTHQUAKE ZONE: III (DEFLECTION &lt; 8mm)</span>
              <span>IGBC PLATINUM</span>
            </div>
          </div>
        );

      default:
        // MBA/MCA: Enterprise Microservices & Real-Time Financial Tick
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#0f041c] text-purple-300 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-purple-950 pb-2">
              <span className="flex items-center gap-2 text-purple-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>FISAT_FBS://TBI_VENTURE_ANALYTICS</span>
              </span>
              <span className="text-purple-500 text-[10px]">BLOOMBERG TERMINAL</span>
            </div>

            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 stroke-purple-400 fill-none" strokeWidth="2">
              {/* Dynamic Bar Charts */}
              {Array.from({ length: 10 }).map((_, idx) => {
                const barHeight = 25 + Math.sin(rad + idx * 0.7) * 20 + idx * 5;
                return (
                  <rect
                    key={idx}
                    x={30 + idx * 30}
                    y={130 - barHeight}
                    width="18"
                    height={barHeight}
                    rx="3"
                    fill="#581c87"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                  />
                );
              })}
              {/* Ascending Trend Line */}
              <path
                d="M 30 110 Q 150 70 320 35"
                stroke="#e9d5ff"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
              <circle cx="320" cy="35" r="5" fill="#22c55e" />
              <text x="320" y="24" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="bold">+148% ROI</text>
            </svg>

            <div className="flex items-center justify-between text-[10px] text-purple-500/80 border-t border-purple-950 pt-1.5">
              <span>SEED FUND DISBURSED: ₹1.4 Cr</span>
              <span>TBI STARTUPS: 24 ACTIVE</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="departments" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#0f3b3a] mb-2 font-mono">
            {langMalayalam ? 'എഞ്ചിനീയറിംഗ് ശാഖകൾ' : 'DEPARTMENTS & DYNAMIC WORKBENCHES'}
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
            retroMode ? 'font-mono text-black' : 'font-heading text-[#0f3b3a]'
          }`}>
            {langMalayalam ? 'നിങ്ങളുടെ ശാഖ തിരഞ്ഞെടുക്കുക' : 'Pick a Stream. See What You Build.'}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#536762]">
            {langMalayalam
              ? 'വിഭാഗങ്ങളിലൂടെ മുന്നോട്ട് പോകൂ. തത്സമയ ഗ്രാഫിക്കൽ സിമുലേഷനുകൾ പരിശോധിച്ച് ഓരോ എഞ്ചിനീയറിംഗ് ശാഖയുടെയും ആഴം മനസ്സിലാക്കുക.'
              : 'Cycle forward across specialized faculties. Watch live computational, RF, grid, mechanical, and structural simulations update dynamically in real time.'}
          </p>
        </div>

        {/* Forward & Backward Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePrevDept}
            aria-label="Previous Department"
            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
              retroMode
                ? 'win95-button text-black font-mono'
                : 'bg-white hover:bg-slate-50 text-[#0f3b3a] border-[#d7e2df] shadow-sm'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-mono font-bold text-[#536762]">
            {activeDeptIndex + 1} / {DEPARTMENTS_DATA.length}
          </span>

          <button
            onClick={handleNextDept}
            aria-label="Next Department"
            className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all font-bold text-xs ${
              retroMode
                ? 'win95-button text-black font-mono'
                : 'bg-[#0f3b3a] hover:bg-[#16504d] text-white shadow-sm'
            }`}
          >
            <span>Forward Stream</span>
            <ChevronRight className="w-4 h-4 text-[#c99a2e]" />
          </button>
        </div>
      </div>

      {/* Stream Selector Buttons with Hover Content Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
        {DEPARTMENTS_DATA.map((dept, index) => {
          const isSelected = index === activeDeptIndex;
          return (
            <ButtonHoverPreview
              key={dept.id}
              title={`${dept.code} · ${dept.name}`}
              description={`${dept.tagline} (${dept.intake} seats · ${dept.stats.placements} placements)`}
              badge={dept.code}
              position="top"
              retroMode={retroMode}
              className="w-full"
            >
              <button
                onClick={() => handleSelectDept(index)}
                className={`w-full p-3.5 text-left rounded-xl transition-all duration-200 flex flex-col justify-between min-h-[92px] border ${
                  isSelected
                    ? retroMode
                      ? 'bg-[#000080] text-yellow-300 font-mono border-2 border-black win95-sunken'
                      : 'bg-[#0f3b3a] text-white border-[#0f3b3a] shadow-md scale-[1.02]'
                    : retroMode
                      ? 'win95-button text-black font-mono'
                      : 'bg-white text-[#12211e] hover:bg-slate-50 border-[#d7e2df]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-white/10 text-[#c99a2e]' : 'bg-slate-100 text-[#536762]'
                  }`}>
                    {getDeptIcon(dept.id)}
                  </span>
                  <span className={`text-[11px] font-mono font-bold ${
                    isSelected ? 'text-[#c99a2e]' : 'text-[#536762]'
                  }`}>
                    {dept.code}
                  </span>
                </div>
                <div className="font-bold text-xs leading-snug font-heading mt-2">
                  {dept.name.split(' ')[0]} {dept.name.split(' ')[1] || ''}
                </div>
              </button>
            </ButtonHoverPreview>
          );
        })}
      </div>

      {/* Active Department Dynamic Workbench */}
      <div 
        key={activeDept.id}
        className={`p-6 sm:p-10 rounded-2xl border transition-all duration-300 ${
          transitionDirection === 'down' ? 'animate-in slide-in-from-bottom-4' : 'animate-in slide-in-from-top-4'
        } ${
          retroMode
            ? 'win95-raised text-black'
            : 'bg-white border-[#d7e2df] shadow-sm'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Descriptive Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 text-xs font-mono font-bold bg-[#0f3b3a] text-[#c99a2e] rounded-md">
                {activeDept.code}
              </span>
              <span className="text-xs text-[#536762] font-mono">
                Estd. {activeDept.established} · Intake: {activeDept.intake} seats
              </span>
              <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                {activeDept.accreditation}
              </span>
            </div>

            <div>
              <h3 className={`text-2xl sm:text-3xl font-extrabold text-[#0f3b3a] tracking-tight ${
                retroMode ? 'font-mono text-black' : 'font-heading'
              }`}>
                {activeDept.name}
              </h3>
              <p className="mt-2 text-sm sm:text-base font-medium text-[#b5502e] italic">
                "{activeDept.tagline}"
              </p>
              <p className="mt-3 text-sm text-[#536762] leading-relaxed">
                {activeDept.description}
              </p>
            </div>

            {/* Department Real-Time Accolades & Statistics Bar */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center font-mono">
              <div>
                <div className="text-lg font-bold text-[#0f3b3a]">{activeDept.stats.patents}</div>
                <div className="text-[10px] text-[#536762] uppercase">Patents Filed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-emerald-700">{activeDept.stats.placements}</div>
                <div className="text-[10px] text-[#536762] uppercase">Placement Rate</div>
              </div>
              <div>
                <div className="text-lg font-bold text-[#b5502e]">{activeDept.stats.publications}</div>
                <div className="text-[10px] text-[#536762] uppercase">Scopus Papers</div>
              </div>
            </div>

            {/* Key Distinctions & Laboratories */}
            <div className="space-y-2">
              <div className="text-xs uppercase font-mono font-bold text-[#12211e] tracking-wider">
                Specialized Laboratories &amp; Research Centers:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#536762]">
                {activeDept.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono text-[#536762]">Toolchain:</span>
              {activeDept.techStack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-mono text-[11px] border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenDeptPage(activeDept);
                }}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all active:scale-95 ${
                  retroMode
                    ? 'win95-button text-black font-mono border-2 border-black'
                    : 'bg-[#c99a2e] hover:bg-[#d6a738] text-[#1a1405] shadow-sm'
                }`}
              >
                <span>Direct to {activeDept.code} Department Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenDeptModal(activeDept);
                }}
                className="px-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 hover:bg-slate-100 text-[#0f3b3a] transition-all"
              >
                <span>Quick Syllabus Modal</span>
              </button>

              <span className="text-xs text-[#536762] ml-1">
                HOD: {activeDept.headOfDept}
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Moving Interactive Simulation */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-900 flex flex-col h-[340px] bg-slate-950">
              
              {/* Simulation Header Controls */}
              <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs text-white font-mono">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE_SIMULATION</span>
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSimPlaying(!isSimPlaying)}
                    title={isSimPlaying ? 'Pause Simulation' : 'Resume Simulation'}
                    className="p-1 rounded hover:bg-white/10 text-white/80"
                  >
                    {isSimPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <select
                    value={simSpeed}
                    onChange={(e) => setSimSpeed(Number(e.target.value))}
                    className="bg-black text-[10px] text-white border border-white/20 rounded px-1.5 py-0.5 outline-none"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={1}>1.0x</option>
                    <option value={2}>2.0x</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Interactive Visualizer Viewport */}
              <div className="flex-1 relative overflow-hidden">
                {renderInteractiveSimulation()}
              </div>

              {/* Simulation Footer */}
              <div className="px-4 py-2 bg-black/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/70">
                <span>INTAKE: {activeDept.intake} SEATS</span>
                <span>STATUS: ACCREDITED</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
