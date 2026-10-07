import React, { useState, useRef } from 'react';

interface ButtonHoverPreviewProps {
  children: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  position?: 'top' | 'bottom';
  className?: string;
  retroMode?: boolean;
}

export const ButtonHoverPreview: React.FC<ButtonHoverPreviewProps> = ({
  children,
  title,
  description,
  badge = 'PREVIEW',
  position = 'top',
  className = '',
  retroMode = false,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 280); // Small 280ms debounce so it doesn't flash on rapid mouse movements
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(false);
  };

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Pop-in Content Preview Tooltip */}
      {isHovered && (
        <div
          role="tooltip"
          className={`absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none w-64 sm:w-72 p-3 rounded-2xl shadow-2xl border text-left animate-pop-in ${
            position === 'top'
              ? 'bottom-full mb-3'
              : 'top-full mt-3'
          } ${
            retroMode
              ? 'win95-raised bg-[#ffffcc] text-black border-2 border-black font-mono'
              : 'bg-[#061e1b]/95 backdrop-blur-xl text-white border-[#c99a2e]/50 shadow-black/50'
          }`}
        >
          {/* Header row with badge */}
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-white/10">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#c99a2e] uppercase">
              {badge}
            </span>
            <span className="text-[9px] font-mono text-slate-400">
              CLICK TO OPEN ↵
            </span>
          </div>

          {/* Title */}
          <div className="text-xs font-bold font-heading text-white leading-snug">
            {title}
          </div>

          {/* Detailed content description */}
          <p className="text-[11px] text-slate-300 leading-relaxed mt-1 font-normal">
            {description}
          </p>

          {/* Arrow anchor */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 border ${
              position === 'top'
                ? 'top-full -mt-1.5 border-b border-r'
                : 'bottom-full -mb-1.5 border-t border-l'
            } ${
              retroMode
                ? 'bg-[#ffffcc] border-black'
                : 'bg-[#061e1b] border-[#c99a2e]/50'
            }`}
          />
        </div>
      )}
    </div>
  );
};
