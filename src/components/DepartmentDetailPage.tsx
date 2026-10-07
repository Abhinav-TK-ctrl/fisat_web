import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Compass, 
  Award, 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Mail, 
  Phone, 
  Layers, 
  FileText, 
  ExternalLink, 
  Cpu, 
  Terminal, 
  Zap, 
  Cog, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Download,
  BookOpen,
  Sliders,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';
import { Department, FacultyMember } from '../types';
import { DEPARTMENTS_DATA, CAMPUS_IMAGES } from '../data/mockData';
import { Fisat3DLogo } from './Fisat3DLogo';
import { sounds } from '../utils/audio';

interface DepartmentDetailPageProps {
  department: Department;
  onBackToHome: () => void;
  onSelectDepartment: (dept: Department) => void;
  onOpenApply: () => void;
  retroMode: boolean;
  langMalayalam: boolean;
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({
  department,
  onBackToHome,
  onSelectDepartment,
  onOpenApply,
  retroMode,
  langMalayalam,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'location' | 'faculty' | 'labs' | 'achievements'>('overview');
  const [facultySearch, setFacultySearch] = useState<string>('');
  
  // Interactive Simulation state
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [simTick, setSimTick] = useState<number>(0);

  // Scroll to top when department opens or changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab('overview');
  }, [department.id]);

  // Dynamic animation ticker for department visualizations
  useEffect(() => {
    if (!isSimPlaying) return;
    const interval = setInterval(() => {
      setSimTick((t) => (t + 1) % 360);
    }, 40 / simSpeed);
    return () => clearInterval(interval);
  }, [isSimPlaying, simSpeed]);

  const getDeptIcon = (id: string) => {
    switch (id) {
      case 'cse': return <Terminal className="w-5 h-5 text-emerald-500" />;
      case 'ece': return <Cpu className="w-5 h-5 text-cyan-500" />;
      case 'eee': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'me': return <Cog className="w-5 h-5 text-rose-500" />;
      case 'ce': return <Building2 className="w-5 h-5 text-emerald-600" />;
      case 'mca-mba': return <Briefcase className="w-5 h-5 text-purple-500" />;
      default: return <Layers className="w-5 h-5 text-[#c99a2e]" />;
    }
  };

  const filteredFaculties = department.faculties.filter(f => 
    f.name.toLowerCase().includes(facultySearch.toLowerCase()) ||
    f.designation.toLowerCase().includes(facultySearch.toLowerCase()) ||
    f.specialization.toLowerCase().includes(facultySearch.toLowerCase())
  );

  const hodFaculty = department.faculties.find(f => f.isHod) || department.faculties[0];

  // Render dedicated interactive animated simulation per department
  const renderInteractiveSimulation = () => {
    const angle = simTick;
    const rad = (angle * Math.PI) / 180;

    switch (department.id) {
      case 'cse':
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#051412] text-emerald-400 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-emerald-950 pb-2 z-10">
              <span className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>NVIDIA_GPU_CLUSTER://NODE_04</span>
              </span>
              <span className="text-emerald-600 text-[10px]">EPOCH: {(simTick * 3) % 1000}/1000 · LOSS: {(0.042 - Math.sin(rad) * 0.008).toFixed(4)}</span>
            </div>
            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 z-10 stroke-emerald-400 fill-none" strokeWidth="2">
              <circle cx="50" cy="40" r="12" fill="#042f2c" stroke="#10b981" />
              <circle cx="50" cy="80" r="12" fill="#042f2c" stroke="#10b981" />
              <circle cx="50" cy="120" r="12" fill="#042f2c" stroke="#10b981" />
              <circle cx="180" cy="30" r="14" fill="#064e3b" stroke="#34d399" />
              <circle cx="180" cy="80" r="16" fill="#065f46" stroke="#34d399" strokeWidth="3" />
              <circle cx="180" cy="130" r="14" fill="#064e3b" stroke="#34d399" />
              <circle cx="310" cy="55" r="15" fill="#022c22" stroke="#6ee7b7" />
              <circle cx="310" cy="105" r="15" fill="#022c22" stroke="#6ee7b7" />
              <line x1="62" y1="40" x2="166" y2="30" strokeOpacity={0.4 + Math.sin(rad) * 0.4} />
              <line x1="62" y1="40" x2="164" y2="80" strokeOpacity={0.6 + Math.cos(rad) * 0.3} strokeWidth={2.5} />
              <line x1="62" y1="80" x2="164" y2="80" strokeWidth="3" stroke="#34d399" />
              <line x1="62" y1="120" x2="164" y2="80" strokeOpacity={0.5} />
              <line x1="196" y1="80" x2="295" y2="55" strokeWidth="3" stroke="#6ee7b7" />
              <line x1="196" y1="80" x2="295" y2="105" strokeWidth="2.5" />
              <circle cx={62 + (196 - 62) * ((simTick % 60) / 60)} cy={80} r="4" fill="#facc15" />
              <circle cx={196 + (295 - 196) * ((simTick % 40) / 40)} cy={55} r="4" fill="#facc15" />
            </svg>
            <div className="flex items-center justify-between text-[10px] text-emerald-500/80 border-t border-emerald-950 pt-1.5 z-10">
              <span>WEIGHTS: 1.7B PARAMS</span>
              <span>INFERENCE: 14.2ms / TOKEN</span>
            </div>
          </div>
        );
      case 'ece':
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#03131c] text-cyan-400 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-cyan-950 pb-2 z-10">
              <span className="flex items-center gap-2 text-cyan-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>TEKTRONIX_OSCILLOSCOPE://CH1_RF</span>
              </span>
              <span className="text-cyan-600 text-[10px]">FREQ: 2.45 GHz · MODULATION: QAM-64</span>
            </div>
            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 z-10 stroke-cyan-400 fill-none" strokeWidth="2">
              <path
                d={Array.from({ length: 60 }).map((_, i) => {
                  const x = i * 6;
                  const y = 80 + Math.sin((x + simTick * 4) * 0.08) * 35 * Math.sin(x * 0.02);
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                }).join(' ')}
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              <path
                d={Array.from({ length: 60 }).map((_, i) => {
                  const x = i * 6;
                  const y = 80 + Math.cos((x + simTick * 3) * 0.05) * 22;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                }).join(' ')}
                stroke="#0284c7"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
            </svg>
            <div className="flex items-center justify-between text-[10px] text-cyan-500/80 border-t border-cyan-950 pt-1.5 z-10">
              <span>VLSI SYNTHESIS: CADENCE EDA</span>
              <span>SAMPLING: 10 GSa/s</span>
            </div>
          </div>
        );
      case 'eee':
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#140e02] text-amber-400 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-amber-950 pb-2 z-10">
              <span className="flex items-center gap-2 text-amber-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>SIEMENS_SCADA://100kW_SOLAR_GRID</span>
              </span>
              <span className="text-amber-600 text-[10px]">POWER: 88.4 kW · 3-PHASE 415V</span>
            </div>
            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 z-10 stroke-amber-400 fill-none" strokeWidth="2">
              {/* 3-Phase AC waveforms */}
              <path
                d={Array.from({ length: 60 }).map((_, i) => {
                  const x = i * 6;
                  const y = 80 + Math.sin((x + simTick * 3) * 0.08) * 38;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                }).join(' ')}
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <path
                d={Array.from({ length: 60 }).map((_, i) => {
                  const x = i * 6;
                  const y = 80 + Math.sin((x + simTick * 3) * 0.08 + (2 * Math.PI) / 3) * 38;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                }).join(' ')}
                stroke="#ef4444"
                strokeWidth="1.8"
                opacity="0.8"
              />
              <path
                d={Array.from({ length: 60 }).map((_, i) => {
                  const x = i * 6;
                  const y = 80 + Math.sin((x + simTick * 3) * 0.08 + (4 * Math.PI) / 3) * 38;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y.toFixed(1)}`;
                }).join(' ')}
                stroke="#3b82f6"
                strokeWidth="1.8"
                opacity="0.8"
              />
            </svg>
            <div className="flex items-center justify-between text-[10px] text-amber-500/80 border-t border-amber-950 pt-1.5 z-10">
              <span>FREQUENCY: 50.02 Hz</span>
              <span>GRID TIE: SYNCHRONIZED</span>
            </div>
          </div>
        );
      case 'me':
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#180a06] text-rose-400 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-rose-950 pb-2 z-10">
              <span className="flex items-center gap-2 text-rose-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span>ANSYS_FLUENT://5-AXIS_KINEMATICS</span>
              </span>
              <span className="text-rose-600 text-[10px]">RPM: 4,800 · TORQUE: 185 Nm</span>
            </div>
            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 z-10 flex items-center justify-center">
              <g transform="translate(180, 80)">
                <circle cx="0" cy="0" r="50" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="8 4" />
                <circle cx="0" cy="0" r="34" fill="#290d0b" stroke="#fb7185" strokeWidth="2" />
                <circle cx="0" cy="0" r="14" fill="#fb7185" />
                {/* Rotating gear teeth spokes */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = ((i * 45 + simTick * 3) * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={Math.cos(a) * 14}
                      y1={Math.sin(a) * 14}
                      x2={Math.cos(a) * 48}
                      y2={Math.sin(a) * 48}
                      stroke="#f43f5e"
                      strokeWidth="3"
                    />
                  );
                })}
              </g>
            </svg>
            <div className="flex items-center justify-between text-[10px] text-rose-500/80 border-t border-rose-950 pt-1.5 z-10">
              <span>CNC FEED: 1,200 mm/min</span>
              <span>PRESSURE: 12.4 MPa</span>
            </div>
          </div>
        );
      case 'ce':
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#041612] text-emerald-400 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-emerald-950 pb-2 z-10">
              <span className="flex items-center gap-2 text-emerald-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>STAAD.PRO://SEISMIC_SHAKE_TABLE</span>
              </span>
              <span className="text-emerald-600 text-[10px]">ZONE V SEISMIC · LOAD: 450 kN</span>
            </div>
            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 z-10 stroke-emerald-400 fill-none" strokeWidth="2">
              {/* Multi-story structural frame with dynamic vibration deflection */}
              <path
                d={`M 80 140 L ${80 + Math.sin(rad * 2) * 8} 30 L ${280 + Math.sin(rad * 2) * 8} 30 L 280 140 Z`}
                stroke="#10b981"
                strokeWidth="2.5"
              />
              <line x1={80 + Math.sin(rad * 2) * 3} y1="95" x2={280 + Math.sin(rad * 2) * 3} y2="95" stroke="#34d399" strokeWidth="2" />
              <line x1={80 + Math.sin(rad * 2) * 6} y1="60" x2={280 + Math.sin(rad * 2) * 6} y2="60" stroke="#34d399" strokeWidth="2" />
              {/* Cross bracings */}
              <line x1="80" y1="140" x2={280 + Math.sin(rad * 2) * 3} y2="95" stroke="#059669" strokeDasharray="3 3" />
              <line x1="280" y1="140" x2={80 + Math.sin(rad * 2) * 3} y2="95" stroke="#059669" strokeDasharray="3 3" />
            </svg>
            <div className="flex items-center justify-between text-[10px] text-emerald-500/80 border-t border-emerald-950 pt-1.5 z-10">
              <span>BIM MODEL: REVIT 2026</span>
              <span>DAMPING RATIO: 5% CRITICAL</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#0f0918] text-purple-400 font-mono text-xs overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-purple-950 pb-2 z-10">
              <span className="flex items-center gap-2 text-purple-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>BLOOMBERG_TERMINAL://VENTURE_METRICS</span>
              </span>
              <span className="text-purple-600 text-[10px]">TBI STARTUPS: 24 · SEED: ₹1.2 Cr</span>
            </div>
            <svg viewBox="0 0 360 160" className="w-full h-36 my-2 z-10 stroke-purple-400 fill-none" strokeWidth="2">
              <path
                d={Array.from({ length: 24 }).map((_, i) => {
                  const x = 30 + i * 13;
                  const y = 130 - Math.pow(i, 1.4) * 1.8 - Math.sin((i + simTick * 0.1)) * 10;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${Math.max(25, y).toFixed(1)}`;
                }).join(' ')}
                stroke="#c084fc"
                strokeWidth="2.5"
              />
              {/* Bar candles */}
              {Array.from({ length: 12 }).map((_, i) => {
                const x = 40 + i * 26;
                const h = 20 + Math.abs(Math.sin((i * 1.5 + simTick * 0.05))) * 60;
                return (
                  <rect
                    key={i}
                    x={x}
                    y={135 - h}
                    width="10"
                    height={h}
                    fill="#581c87"
                    stroke="#a855f7"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                );
              })}
            </svg>
            <div className="flex items-center justify-between text-[10px] text-purple-500/80 border-t border-purple-950 pt-1.5 z-10">
              <span>PORTFOLIO SHARPE: 2.14</span>
              <span>CONVERSION RATE: 94%</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${retroMode ? 'retro-theme' : 'bg-[#f4f7f6]'} text-[#12211e] transition-colors duration-200`}>
      
      {/* 1. Dedicated Top Navigation Bar for Department View */}
      <nav className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all ${
        retroMode
          ? 'bg-[#c0c0c0] border-black win95-raised text-black'
          : 'bg-white/95 border-[#d7e2df] shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Back button & Brand */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                sounds.playClick();
                onBackToHome();
              }}
              className={`p-2 sm:px-3.5 sm:py-2 rounded-xl flex items-center gap-2 font-bold text-xs transition-all active:scale-95 ${
                retroMode
                  ? 'win95-button text-black font-mono border-2 border-black'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#0f3b3a]'
              }`}
              title="Return to Main Campus Portal"
            >
              <ArrowLeft className="w-4 h-4 text-[#c99a2e]" />
              <span className="hidden sm:inline">Back to Campus</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div 
              onClick={() => {
                sounds.playClick();
                onBackToHome();
              }}
              className="cursor-pointer"
            >
              <Fisat3DLogo size="sm" showLabel={false} retroMode={retroMode} />
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold text-[#b5502e] uppercase tracking-wider">
                Department of
              </span>
              <span className="text-sm sm:text-base font-extrabold font-heading text-[#0f3b3a] leading-none truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {department.name}
              </span>
            </div>
          </div>

          {/* Quick Department Switcher Tabs & Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {DEPARTMENTS_DATA.map((d) => {
                const isActive = d.id === department.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectDepartment(d);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      isActive
                        ? retroMode
                          ? 'bg-[#000080] text-yellow-300 win95-sunken'
                          : 'bg-[#0f3b3a] text-white shadow-xs'
                        : 'text-slate-600 hover:text-black hover:bg-white/60'
                    }`}
                  >
                    {d.code}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenApply();
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-95 ${
                retroMode
                  ? 'win95-button text-black font-mono border-2 border-black'
                  : 'bg-[#c99a2e] hover:bg-[#d6a738] text-[#1a1405] shadow-xs'
              }`}
            >
              <span className="hidden sm:inline">Apply for {department.code}</span>
              <span className="sm:hidden">Apply</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* 2. Department Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#08221f] via-[#0b2f2b] to-[#081d1b] text-white py-14 sm:py-20 border-b border-emerald-900/40">
        
        {/* Subtle Campus Architecture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden mix-blend-luminosity">
          <img
            src={CAMPUS_IMAGES.entrance}
            alt=""
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081d1b] via-[#08221f]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#a3c4be] mb-6">
            <button onClick={onBackToHome} className="hover:text-white underline">FISAT Campus</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Academic Divisions</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#c99a2e] font-bold">{department.code}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline Details */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 text-sm font-mono font-black bg-[#c99a2e] text-[#12211e] rounded-lg shadow-sm">
                  {department.code}
                </span>
                <span className="px-3 py-1 text-xs font-mono font-bold bg-white/10 text-emerald-300 rounded-lg border border-white/15">
                  ESTD {department.established}
                </span>
                <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-200 rounded-lg border border-emerald-400/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{department.accreditation}</span>
                </span>
                <span className="px-3 py-1 text-xs font-mono text-amber-200 bg-amber-500/10 rounded-lg border border-amber-400/20">
                  {department.intake} Seats / Batch
                </span>
              </div>

              <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] ${
                retroMode ? 'font-mono text-yellow-300' : 'font-heading'
              }`}>
                {department.name}
              </h1>

              <p className="text-base sm:text-xl font-medium text-amber-300/90 italic leading-snug">
                "{department.tagline}"
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {department.description}
              </p>

              {/* Quick Navigation Anchor Bar */}
              <div className="pt-4 flex flex-wrap items-center gap-2">
                {[
                  { id: 'overview', label: 'Overview & Mission' },
                  { id: 'location', label: '📍 Campus Location' },
                  { id: 'faculty', label: `Faculty (${department.faculties.length})` },
                  { id: 'labs', label: 'Labs & Toolchain' },
                  { id: 'achievements', label: 'Accolades' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sounds.playClick();
                      setActiveTab(tab.id as any);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab.id
                        ? retroMode
                          ? 'win95-sunken bg-[#000080] text-yellow-300 font-mono'
                          : 'bg-[#c99a2e] text-[#12211e] shadow-md scale-105'
                        : retroMode
                          ? 'win95-button text-black font-mono'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Right Interactive Simulation Preview */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col h-[320px] bg-slate-950">
                <div className="px-4 py-2 bg-black/70 border-b border-white/10 flex items-center justify-between text-xs text-white font-mono">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>LAB_SIMULATION</span>
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsSimPlaying(!isSimPlaying)}
                      className="p-1 rounded hover:bg-white/10 text-white/80"
                      title={isSimPlaying ? 'Pause' : 'Play'}
                    >
                      {isSimPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <select
                      value={simSpeed}
                      onChange={(e) => setSimSpeed(Number(e.target.value))}
                      className="bg-black text-[10px] text-white border border-white/20 rounded px-1 py-0.5"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={1}>1.0x</option>
                      <option value={2}>2.0x</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1 relative overflow-hidden">
                  {renderInteractiveSimulation()}
                </div>

                <div className="px-4 py-2 bg-black/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span>HOD: {department.headOfDept}</span>
                  <span className="text-emerald-400">ACTIVE BENCH</span>
                </div>
              </div>
            </div>

          </div>

          {/* Department Verified Quantifiable Track Record Metrics Strip */}
          <div className="mt-12 pt-6 border-t border-emerald-900/40 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3.5 rounded-xl bg-black/30 backdrop-blur-sm border border-emerald-900/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#c99a2e] font-heading tabular-nums">
                {department.stats.placements}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Career Placement Record</div>
            </div>
            <div className="p-3.5 rounded-xl bg-black/30 backdrop-blur-sm border border-emerald-900/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-heading tabular-nums">
                {department.stats.patents}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Patents Filed &amp; Granted</div>
            </div>
            <div className="p-3.5 rounded-xl bg-black/30 backdrop-blur-sm border border-emerald-900/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-heading tabular-nums">
                {department.stats.publications}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Scopus/IEEE Papers</div>
            </div>
            <div className="p-3.5 rounded-xl bg-black/30 backdrop-blur-sm border border-emerald-900/40">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-heading tabular-nums">
                {department.stats.alumniNetwork}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Active Alumni Across Globe</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Department Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* SECTION A: WHERE IS THIS DEPARTMENT LOCATED IN THE COLLEGE? (Prominent Campus Location Guide) */}
        <section id="location" className="scroll-mt-24">
          <div className={`p-6 sm:p-10 rounded-3xl border transition-all ${
            retroMode 
              ? 'win95-raised bg-[#c0c0c0] text-black border-2 border-black' 
              : 'bg-white border-[#d7e2df] shadow-sm'
          }`}>
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-mono font-bold border border-emerald-200 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>CAMPUS LOCATION &amp; ACCESS GUIDE</span>
                </div>
                <h2 className={`text-2xl sm:text-3xl font-extrabold text-[#0f3b3a] ${
                  retroMode ? 'font-mono text-black' : 'font-heading'
                }`}>
                  Where is {department.code} Located in FISAT?
                </h2>
                <p className="text-sm text-[#536762] mt-1">
                  Exact building, floor, room numbers, and navigation instructions on the 45-acre Hormis Nagar campus.
                </p>
              </div>

              <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-[#0f3b3a] font-bold">
                HORMIS NAGAR · MOOKKANNOOR, ANGAMALY
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Specific Location Specs */}
              <div className="lg:col-span-7 space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-mono text-[#536762] uppercase font-bold flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#c99a2e]" />
                      <span>Building / Block</span>
                    </div>
                    <div className="text-base font-extrabold text-[#0f3b3a] mt-1 font-heading">
                      {department.location.buildingName}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Wing: {department.location.wing}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-xs font-mono text-[#536762] uppercase font-bold flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#c99a2e]" />
                      <span>Floors &amp; Rooms</span>
                    </div>
                    <div className="text-base font-extrabold text-[#0f3b3a] mt-1 font-heading">
                      {department.location.floors}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 font-mono">
                      {department.location.roomNumbers}
                    </div>
                  </div>
                </div>

                {/* HOD Office Coordinates */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="text-xs font-mono font-bold text-amber-900 uppercase flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#c99a2e]" />
                    <span>Head of Department (HOD) Office</span>
                  </div>
                  <div className="text-sm font-bold text-[#0f3b3a] mt-1">
                    {department.headOfDept}’s Office Suite
                  </div>
                  <div className="text-xs text-amber-950 mt-1 leading-relaxed">
                    Located in {department.location.buildingName}, {department.location.floors}. Students and visitors can visit during consultation hours (9:00 AM – 4:30 PM).
                  </div>
                </div>

                {/* Walking directions */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-[#536762] space-y-2">
                  <div className="font-bold font-mono text-[#0f3b3a] uppercase">
                    Campus Walking Directions:
                  </div>
                  <div className="leading-relaxed">
                    {department.location.landmark}
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    Tip: Elevator access and tactile paths for accessibility are available in the central foyer of this block.
                  </div>
                </div>

              </div>

              {/* Right Column: Visual Interactive Campus Minimap with Pinpoint */}
              <div className="lg:col-span-5">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
                  {/* Real aerial background map */}
                  <img
                    src={CAMPUS_IMAGES.aerial}
                    alt="FISAT Campus Aerial Map"
                    className="w-full h-full object-cover opacity-60"
                  />
                  
                  {/* SVG overlay for map locator */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Glowing highlight circle around department pin */}
                    <circle
                      cx={department.location.mapPinX}
                      cy={department.location.mapPinY}
                      r="14"
                      fill="none"
                      stroke="#c99a2e"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      className="animate-spin origin-center"
                      style={{
                        transformOrigin: `${department.location.mapPinX}px ${department.location.mapPinY}px`
                      }}
                    />
                    <circle
                      cx={department.location.mapPinX}
                      cy={department.location.mapPinY}
                      r="6"
                      fill="#c99a2e"
                      className="animate-pulse"
                    />
                    <circle
                      cx={department.location.mapPinX}
                      cy={department.location.mapPinY}
                      r="3"
                      fill="#ffffff"
                    />
                  </svg>

                  {/* Pinpoint Callout Badge */}
                  <div 
                    className="absolute bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-[#c99a2e] text-left transform -translate-x-1/2 -translate-y-full mb-3"
                    style={{
                      left: `${department.location.mapPinX}%`,
                      top: `${department.location.mapPinY}%`,
                    }}
                  >
                    <div className="text-[10px] font-mono font-bold text-[#b5502e] uppercase leading-none">
                      HERE: {department.code}
                    </div>
                    <div className="text-xs font-bold text-[#0f3b3a] font-heading leading-tight mt-0.5">
                      {department.location.buildingName}
                    </div>
                  </div>

                  {/* Map Footer Label */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md p-2 rounded-xl text-[10px] font-mono text-white flex items-center justify-between">
                    <span>COORDINATES: {department.location.mapPinX}E, {department.location.mapPinY}N</span>
                    <span className="text-emerald-400">PINPOINT VERIFIED</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION B: UNIQUE THINGS ABOUT THIS DEPARTMENT */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-mono font-bold border border-amber-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c99a2e]" />
              <span>DISTINCTIVE ADVANTAGES</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#0f3b3a] ${
              retroMode ? 'font-mono text-black' : 'font-heading'
            }`}>
              What Makes {department.code} at FISAT Unique?
            </h2>
            <p className="text-sm sm:text-base text-[#536762] max-w-2xl mt-1">
              Pioneering infrastructure, industrial consortia, and student-driven breakthroughs that set our engineers apart.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {department.highlights.map((highlight, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 ${
                  retroMode
                    ? 'win95-raised bg-[#c0c0c0] text-black border-2 border-black'
                    : 'bg-white border-[#d7e2df] shadow-xs hover:shadow-md'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0f3b3a] flex items-center justify-center font-mono font-bold text-lg mb-4 border border-emerald-100">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-base text-[#0f3b3a] font-heading leading-snug mb-2">
                  {highlight}
                </h3>
                <p className="text-xs text-[#536762] leading-relaxed">
                  Engineered with dedicated faculty mentorship, continuous industry updates, and experiential laboratory hours.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION C: VISION & MISSION (Official from FISAT) */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Vision Card */}
            <div className={`lg:col-span-5 p-8 rounded-3xl border flex flex-col justify-between ${
              retroMode
                ? 'win95-raised bg-[#000080] text-yellow-300 font-mono border-2 border-black'
                : 'bg-gradient-to-br from-[#0f3b3a] to-[#08221f] text-white shadow-lg shadow-emerald-950/20'
            }`}>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-mono font-bold text-[#c99a2e] mb-4 border border-white/10">
                  <Target className="w-3.5 h-3.5" />
                  <span>DEPARTMENT VISION</span>
                </div>
                <h3 className="text-2xl font-extrabold font-heading mb-4 text-white">
                  Vision Statement
                </h3>
                <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
                  "{department.vision}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono text-emerald-300">
                <span>ESTD 2002 · HORMISEAN VALUES</span>
                <span>KTU AUTONOMOUS</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className={`lg:col-span-7 p-8 rounded-3xl border ${
              retroMode
                ? 'win95-raised bg-[#c0c0c0] text-black border-2 border-black'
                : 'bg-white border-[#d7e2df] shadow-xs'
            }`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-[#0f3b3a] rounded-full text-xs font-mono font-bold mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>MISSION PILLARS</span>
              </div>
              <h3 className={`text-2xl font-extrabold text-[#0f3b3a] mb-6 ${
                retroMode ? 'font-mono text-black' : 'font-heading'
              }`}>
                Department Mission
              </h3>

              <div className="space-y-4">
                {department.mission.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-7 h-7 rounded-lg bg-[#0f3b3a] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      M{idx + 1}
                    </span>
                    <p className="text-sm text-[#12211e] leading-relaxed">
                      {m}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION D: WHAT STUDENTS WILL ACHIEVE (Outcomes & Career Trajectory) */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-mono font-bold border border-emerald-200 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
              <span>CAREER &amp; COMPETENCIES</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#0f3b3a] ${
              retroMode ? 'font-mono text-black' : 'font-heading'
            }`}>
              What Will You Achieve as a {department.code} Scholar?
            </h2>
            <p className="text-sm sm:text-base text-[#536762] max-w-2xl mt-1">
              Graduate with production-ready engineering capabilities, recognized credentials, and high-impact placement offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Core Competency Trajectory */}
            <div className={`p-6 rounded-2xl border ${
              retroMode ? 'win95-raised bg-[#c0c0c0] text-black' : 'bg-white border-[#d7e2df]'
            }`}>
              <div className="text-xs font-mono font-bold text-[#b5502e] uppercase mb-2">
                1. Professional Roles
              </div>
              <h3 className="text-lg font-bold text-[#0f3b3a] font-heading mb-4">
                Career Pathways
              </h3>
              <div className="space-y-2">
                {department.careers.map((career, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#12211e] font-medium p-2 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Top Recruiters */}
            <div className={`p-6 rounded-2xl border ${
              retroMode ? 'win95-raised bg-[#c0c0c0] text-black' : 'bg-white border-[#d7e2df]'
            }`}>
              <div className="text-xs font-mono font-bold text-[#b5502e] uppercase mb-2">
                2. Corporate Guilds
              </div>
              <h3 className="text-lg font-bold text-[#0f3b3a] font-heading mb-4">
                Top Recruiters for {department.code}
              </h3>
              <div className="flex flex-wrap gap-2">
                {department.topRecruiters.map((recruiter, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#0f3b3a] rounded-lg text-xs font-mono font-bold border border-slate-200"
                  >
                    {recruiter}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-mono">
                Record Package: ₹32 LPA · Average: 8.4 LPA
              </div>
            </div>

            {/* 3. Industry Toolchain */}
            <div className={`p-6 rounded-2xl border ${
              retroMode ? 'win95-raised bg-[#c0c0c0] text-black' : 'bg-white border-[#d7e2df]'
            }`}>
              <div className="text-xs font-mono font-bold text-[#b5502e] uppercase mb-2">
                3. Industry Stack
              </div>
              <h3 className="text-lg font-bold text-[#0f3b3a] font-heading mb-4">
                Mastered Toolchain
              </h3>
              <div className="flex flex-wrap gap-2">
                {department.techStack.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 bg-emerald-50 text-emerald-900 rounded font-mono text-xs border border-emerald-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION E: WHAT ALL IT HAS ACHIEVED (Historic Milestones) */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-900 rounded-full text-xs font-mono font-bold border border-amber-200 mb-2">
              <Award className="w-3.5 h-3.5 text-[#c99a2e]" />
              <span>RECORD OF DISTINCTION</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#0f3b3a] ${
              retroMode ? 'font-mono text-black' : 'font-heading'
            }`}>
              What {department.code} Has Achieved
            </h2>
            <p className="text-sm sm:text-base text-[#536762] max-w-2xl mt-1">
              Historical accolades, KTU University medals, national championship trophies, and patented innovations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {department.achievements.map((ach, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
                  retroMode ? 'win95-raised bg-[#c0c0c0] text-black' : 'bg-white border-[#d7e2df]'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 text-[#b5502e] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ★
                </div>
                <div className="text-sm text-[#12211e] font-medium leading-relaxed">
                  {ach}
                </div>
              </div>
            ))}
          </div>

          {/* Future Roadmap / Goals */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            retroMode 
              ? 'win95-raised bg-[#000080] text-yellow-300 font-mono' 
              : 'bg-emerald-950 text-white'
          }`}>
            <div className="text-xs font-mono text-[#c99a2e] font-bold uppercase mb-2">
              FORWARD MISSION ROADMAP · 2026–2030
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading mb-4 text-white">
              Future Department Goals &amp; Research Horizons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-emerald-100">
              {department.futureGoals.map((goal, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2.5">
                  <span className="text-[#c99a2e] font-bold font-mono">0{idx + 1}.</span>
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION F: FACULTY & LEADERSHIP DIRECTORY (Taken from FISAT Official Website) */}
        <section id="faculty" className="scroll-mt-24 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-[#0f3b3a] rounded-full text-xs font-mono font-bold mb-2">
                <Users className="w-3.5 h-3.5 text-[#0f3b3a]" />
                <span>OFFICIAL FACULTY GUILD</span>
              </div>
              <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#0f3b3a] ${
                retroMode ? 'font-mono text-black' : 'font-heading'
              }`}>
                Department Leadership &amp; Faculty
              </h2>
              <p className="text-sm text-[#536762] mt-1">
                Distinguished academicians, doctoral researchers, and industry consultants registered at FISAT.
              </p>
            </div>

            {/* Faculty Search Bar */}
            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Search faculty by name or area..."
                value={facultySearch}
                onChange={(e) => setFacultySearch(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                  retroMode
                    ? 'win95-sunken bg-white text-black font-mono'
                    : 'bg-white border-slate-300 focus:border-[#c99a2e] focus:ring-2 focus:ring-[#c99a2e]/20'
                }`}
              />
            </div>
          </div>

          {/* Prominent Head of Department Spotlight Card */}
          {hodFaculty && (
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              retroMode
                ? 'win95-raised bg-[#c0c0c0] text-black border-2 border-black'
                : 'bg-gradient-to-r from-emerald-50 via-white to-amber-50/50 border-[#c99a2e]/40 shadow-sm'
            }`}>
              <div className="flex flex-wrap sm:flex-nowrap items-start gap-6">
                
                {/* HOD Avatar */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0f3b3a] text-white flex flex-col items-center justify-center font-heading font-black text-2xl shrink-0 shadow-md border-2 border-[#c99a2e]">
                  <span>{hodFaculty.name.split(' ').slice(1, 3).map(n => n[0]).join('') || 'HOD'}</span>
                  <span className="text-[9px] font-mono font-bold text-[#c99a2e] tracking-wider mt-1">HEAD</span>
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#c99a2e] text-[#12211e]">
                      HEAD OF DEPARTMENT
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {hodFaculty.qualification}
                    </span>
                    {hodFaculty.experienceYears && (
                      <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {hodFaculty.experienceYears} Years Academic &amp; Research Exp.
                      </span>
                    )}
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-extrabold text-[#0f3b3a] ${
                    retroMode ? 'font-mono text-black' : 'font-heading'
                  }`}>
                    {hodFaculty.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#536762]">
                    <span className="font-bold text-[#12211e]">Specialization:</span> {hodFaculty.specialization}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#0f3b3a]">
                    <a href={`mailto:${hodFaculty.email}`} className="flex items-center gap-1.5 hover:underline font-bold">
                      <Mail className="w-3.5 h-3.5 text-[#c99a2e]" />
                      <span>{hodFaculty.email}</span>
                    </a>
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Cabin: {department.location.buildingName}, {department.location.floors}</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Full Faculty Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFaculties.map((faculty) => (
              <div
                key={faculty.id}
                className={`p-5 rounded-2xl border transition-all hover:-translate-y-1 ${
                  retroMode
                    ? 'win95-raised bg-[#c0c0c0] text-black border-2 border-black'
                    : 'bg-white border-[#d7e2df] shadow-xs hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="text-xs font-mono font-bold text-[#b5502e]">
                    {faculty.designation}
                  </div>
                  {faculty.isHod && (
                    <span className="text-[10px] font-mono font-black px-1.5 py-0.5 bg-amber-300 text-black rounded">
                      HOD
                    </span>
                  )}
                </div>

                <h4 className="text-base font-extrabold text-[#0f3b3a] font-heading leading-tight mb-1">
                  {faculty.name}
                </h4>

                <div className="text-xs text-slate-500 font-mono mb-3">
                  {faculty.qualification}
                </div>

                <div className="text-xs text-[#536762] mb-4 line-clamp-2">
                  <span className="font-semibold text-[#12211e]">Research:</span> {faculty.specialization}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <a
                    href={`mailto:${faculty.email}`}
                    className="text-[#0f3b3a] hover:text-[#b5502e] flex items-center gap-1 underline font-bold"
                  >
                    <Mail className="w-3 h-3 text-[#c99a2e]" />
                    <span>{faculty.email.split('@')[0]}</span>
                  </a>
                  {faculty.experienceYears && (
                    <span className="text-slate-400 text-[11px]">
                      {faculty.experienceYears}y exp
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* SECTION G: SPECIALIZED RESEARCH LABORATORIES */}
        <section id="labs" className="scroll-mt-24 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-900 rounded-full text-xs font-mono font-bold border border-cyan-200 mb-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-700" />
              <span>RESEARCH INFRASTRUCTURE</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold text-[#0f3b3a] ${
              retroMode ? 'font-mono text-black' : 'font-heading'
            }`}>
              Laboratories &amp; Prototyping Suites
            </h2>
            <p className="text-sm sm:text-base text-[#536762] max-w-2xl mt-1">
              Fully equipped state-of-the-art facilities providing hands-on hardware and simulation training.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {department.labs.map((lab, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border flex items-start gap-4 ${
                  retroMode
                    ? 'win95-raised bg-[#c0c0c0] text-black border-2 border-black'
                    : 'bg-white border-[#d7e2df] shadow-xs'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f3b3a] flex items-center justify-center font-mono font-bold text-sm shrink-0 border border-slate-200">
                  L{idx + 1}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0f3b3a] font-heading mb-1.5">
                    {lab}
                  </h3>
                  <p className="text-xs text-[#536762] leading-relaxed">
                    Designed according to AICTE / NBA standards with licensed CAD toolchains, high-precision measurement rigs, and direct student access.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Open for Research &amp; Capstone Projects</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION H: ENROLLMENT & CONTACT CALL TO ACTION */}
        <section className={`p-8 sm:p-12 rounded-3xl border text-center ${
          retroMode
            ? 'win95-raised bg-[#000080] text-yellow-300 font-mono border-2 border-black'
            : 'bg-gradient-to-r from-[#0f3b3a] via-[#16504d] to-[#0a2724] text-white shadow-xl'
        }`}>
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono font-bold text-[#c99a2e]">
              JOIN {department.code} CLASS OF 2026–2030
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Begin Your Engineering Journey in {department.name}
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Admissions are open for B.Tech &amp; Postgraduate streams at Federal Institute of Science and Technology (FISAT). Check KEAM eligibility cutoffs, scholarship brackets, and seat allocations.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenApply();
                }}
                className={`px-6 py-3.5 text-sm font-bold rounded-xl flex items-center gap-2 transition-all active:scale-95 ${
                  retroMode
                    ? 'win95-button text-black font-mono border-2 border-black'
                    : 'bg-[#c99a2e] hover:bg-[#d6a738] text-[#1a1405] shadow-lg shadow-black/20'
                }`}
              >
                <span>Express Application for {department.code}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onBackToHome();
                }}
                className="px-6 py-3.5 text-sm font-medium rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <span>Return to Campus Home</span>
              </button>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};
