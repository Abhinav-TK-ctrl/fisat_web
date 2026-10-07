import React, { useState, useRef } from 'react';
import fisatLogoImg from '../assets/images/logo.png';
import { sounds } from '../utils/audio';

interface Fisat3DLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showLabel?: boolean;
  retroMode?: boolean;
  className?: string;
}

export const Fisat3DLogo: React.FC<Fisat3DLogoProps> = ({
  size = 'md',
  showLabel = true,
  retroMode = false,
  className = '',
}) => {
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [shinePos, setShinePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [imageError, setImageError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-18 h-18',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isFlipping) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -22;
    const rotY = ((x - centerX) / centerX) * 22;

    setRotateX(rotX);
    setRotateY(rotY);
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    if (isFlipping) return;
    setRotateX(0);
    setRotateY(0);
    setShinePos({ x: 50, y: 50 });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sounds.playWarp();
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
      setRotateX(0);
      setRotateY(0);
    }, 700);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
      style={{ perspective: '900px' }}
      title="Official FISAT Emblem · Click to spin 3D Crest"
      role="button"
      tabIndex={0}
      aria-label="FISAT Official Crest"
    >
      {/* 3D Rotating Crest Container */}
      <div
        className={`relative ${sizeClasses[size]} shrink-0 transition-transform duration-200 ease-out`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipping
            ? 'rotateY(360deg) scale(1.15)'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
          transition: isFlipping ? 'transform 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.15s ease-out',
        }}
      >
        {/* 3D Depth Cast Shadow */}
        <div
          className="absolute -inset-1 rounded-2xl blur-md opacity-40 bg-[#0a2724] transition-all duration-200"
          style={{
            transform: `translateZ(-16px) translate(${rotateY * -0.5}px, ${rotateX * 0.5 + 4}px)`,
          }}
        />

        {/* 3D Gold Outer Bezel Medallion */}
        <div
          className={`w-full h-full rounded-2xl shadow-lg relative p-0.5 overflow-hidden transition-all duration-200 ${
            retroMode
              ? 'win95-raised border-2 border-black bg-[#c0c0c0]'
              : 'bg-gradient-to-br from-[#fbe396] via-[#c99a2e] to-[#7c5609] border border-[#fef08a]/60 shadow-xl shadow-black/25'
          }`}
          style={{ transform: 'translateZ(3px)' }}
        >
          {/* Inner Badge Disc */}
          <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden relative shadow-inner p-1">
            {!imageError ? (
              <img
                src={fisatLogoImg}
                alt="FISAT Official Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                loading="eager"
              />
            ) : (
              /* High-contrast authentic vector recreation fallback */
              <svg viewBox="0 0 160 160" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="fisatGoldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fae08c" />
                    <stop offset="50%" stopColor="#c99a2e" />
                    <stop offset="100%" stopColor="#875f0a" />
                  </linearGradient>
                  <linearGradient id="fisatBlueGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0b3864" />
                    <stop offset="50%" stopColor="#062545" />
                    <stop offset="100%" stopColor="#03162b" />
                  </linearGradient>
                  <path id="crestTopArc" d="M 24 80 A 56 56 0 0 1 136 80" fill="none" />
                  <path id="crestBottomArc" d="M 136 80 A 56 56 0 0 1 24 80" fill="none" />
                </defs>

                {/* Deep Blue Outer Field */}
                <circle cx="80" cy="80" r="78" fill="url(#fisatBlueGrad)" stroke="url(#fisatGoldGrad)" strokeWidth="2.5" />
                <circle cx="80" cy="80" r="62" fill="#041a30" stroke="#fae08c" strokeWidth="1" />

                {/* Circular Golden Typography */}
                <text fontSize="7.8" fontWeight="bold" fontFamily="system-ui, sans-serif" fill="#fef08a" letterSpacing="0.8">
                  <textPath href="#crestTopArc" startOffset="50%" textAnchor="middle">
                    FEDERAL INSTITUTE OF SC &amp; TECH
                  </textPath>
                </text>
                <text fontSize="7" fontWeight="bold" fontFamily="system-ui, sans-serif" fill="#fae08c" letterSpacing="0.8">
                  <textPath href="#crestBottomArc" startOffset="50%" textAnchor="middle">
                    ★ FOCUS ON EXCELLENCE ★
                  </textPath>
                </text>

                {/* Center Core Emblem */}
                <circle cx="80" cy="80" r="42" fill="#072b4f" stroke="url(#fisatGoldGrad)" strokeWidth="2" />

                {/* Open Book of Knowledge */}
                <path
                  d="M 64 88 Q 72 84 80 88 Q 88 84 96 88 V 98 Q 88 94 80 98 Q 72 94 64 98 Z"
                  fill="#ffffff"
                  stroke="#c99a2e"
                  strokeWidth="1.2"
                />
                <line x1="80" y1="88" x2="80" y2="98" stroke="#0a2724" strokeWidth="1.2" />

                {/* Golden Flaming Torch of Wisdom */}
                <path d="M 77 84 L 76 74 L 84 74 L 83 84 Z" fill="#c99a2e" stroke="#fae08c" strokeWidth="0.8" />
                <path d="M 80 73 C 74 67 78 59 80 54 C 82 59 86 67 80 73 Z" fill="#f59e0b" />
                <path d="M 80 71 C 77 67 79 62 80 58 C 81 62 83 67 80 71 Z" fill="#fef08a" />

                {/* Gear of Engineering */}
                <circle cx="80" cy="68" r="16" fill="none" stroke="#fae08c" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

                {/* Ribbon FISAT at bottom */}
                <rect x="52" y="118" width="56" height="15" rx="3" fill="url(#fisatGoldGrad)" stroke="#5c4207" strokeWidth="1" />
                <text x="80" y="129" textAnchor="middle" fill="#041a30" fontSize="10" fontWeight="900" fontFamily="sans-serif">
                  FISAT
                </text>
              </svg>
            )}

            {/* Specular 3D Light Sheen Overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-full opacity-55 mix-blend-overlay transition-opacity"
              style={{
                background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 65%)`,
              }}
            />
          </div>
        </div>

        {/* 3D Floating NAAC A+ Star Badge */}
        <div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center text-[9px] text-[#0a2724] font-black shadow-md group-hover:scale-125 transition-transform"
          style={{
            transform: 'translateZ(18px)',
          }}
          title="NAAC A+ Accredited"
        >
          ★
        </div>
      </div>

      {/* Brand Label Typography */}
      {showLabel && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-extrabold tracking-tight leading-none ${
                retroMode ? 'font-mono text-black' : 'font-heading text-[#0f3b3a]'
              }`}
            >
              FISAT
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-[#c99a2e]/20 text-[#855e09] rounded border border-[#c99a2e]/40">
              ESTD 2002
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-[#536762] uppercase leading-tight mt-0.5">
            Federal Institute of Science &amp; Technology · Autonomous
          </span>
        </div>
      )}
    </div>
  );
};
