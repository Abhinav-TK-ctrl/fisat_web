import React, { useState, useEffect, useRef } from 'react';

interface RollingCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  retroMode?: boolean;
}

export const RollingCounter: React.FC<RollingCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1800,
  className = '',
  retroMode = false,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            setIsRolling(true);

            let startTime: number | null = null;

            const animate = (time: number) => {
              if (!startTime) startTime = time;
              const elapsed = time - startTime;
              const progress = Math.min(1, elapsed / duration);

              // Smooth ease-out quintic curve for rolling deceleration
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              const current = easeProgress * value;

              setDisplayValue(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
                setIsRolling(false);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  const formattedNumber = displayValue.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={elementRef} className={`inline-flex items-baseline tabular-nums select-none ${className}`}>
      {prefix && <span className="opacity-90 mr-0.5">{prefix}</span>}
      <span className={`inline-block transition-transform duration-75 ${
        isRolling ? 'scale-[1.04] text-amber-300 drop-shadow-sm' : ''
      }`}>
        {formattedNumber}
      </span>
      {suffix && <span className="opacity-90 ml-0.5">{suffix}</span>}
    </div>
  );
};
