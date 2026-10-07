import React, { useEffect, useRef, useState } from 'react';

interface NaturalCursorTrailProps {
  retroMode?: boolean;
}

interface Point {
  x: number;
  y: number;
  time: number;
}

export const NaturalCursorTrail: React.FC<NaturalCursorTrailProps> = ({ retroMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPointerDevice, setIsPointerDevice] = useState<boolean>(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState<boolean>(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad, not touch)
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsPointerDevice(true);
    } else {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates and historical trail points
    const points: Point[] = [];
    let mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    let isHovering = false;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      // Check if mouse is hovering an interactive element (button, link, input, etc.)
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
        const hoveringNow = !!clickable;
        if (hoveringNow !== isHovering) {
          isHovering = hoveringNow;
          setIsHoveringClickable(hoveringNow);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lag interpolation (lerp) for organic natural movement
      mouse.x += (mouse.targetX - mouse.x) * 0.35;
      mouse.y += (mouse.targetY - mouse.y) * 0.35;

      const now = performance.now();

      // Add point if mouse has moved
      if (mouse.x > 0 && mouse.y > 0) {
        points.push({ x: mouse.x, y: mouse.y, time: now });
      }

      // Keep only recent points within 240ms
      while (points.length > 0 && now - points[0].time > 260) {
        points.shift();
      }

      // Draw Natural Filament Trail Line
      if (points.length > 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        const trailGrad = ctx.createLinearGradient(
          points[0].x,
          points[0].y,
          mouse.x,
          mouse.y
        );

        if (retroMode) {
          trailGrad.addColorStop(0, 'rgba(0, 255, 102, 0)');
          trailGrad.addColorStop(0.5, 'rgba(0, 255, 102, 0.4)');
          trailGrad.addColorStop(1, 'rgba(255, 255, 0, 0.8)');
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = 2.5;
        } else {
          trailGrad.addColorStop(0, 'rgba(16, 185, 129, 0)');
          trailGrad.addColorStop(0.4, 'rgba(16, 185, 129, 0.35)');
          trailGrad.addColorStop(0.8, 'rgba(201, 154, 46, 0.65)');
          trailGrad.addColorStop(1, 'rgba(254, 240, 138, 0.9)');
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = isHovering ? 3 : 2;
        }

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      // Draw Line-Through Crosshair & Natural Reticle when Cursor is Pointing / Hovering
      if (mouse.x > 0 && mouse.y > 0) {
        const x = mouse.x;
        const y = mouse.y;

        // Line-Through Horizontal and Vertical subtle guiding rays
        ctx.beginPath();
        // Horizontal line-through
        const hSpan = isHovering ? 28 : 14;
        ctx.moveTo(x - hSpan, y);
        ctx.lineTo(x + hSpan, y);
        // Vertical line-through
        ctx.moveTo(x, y - hSpan);
        ctx.lineTo(x, y + hSpan);

        ctx.strokeStyle = retroMode
          ? isHovering ? 'rgba(255, 255, 0, 0.75)' : 'rgba(0, 255, 102, 0.4)'
          : isHovering ? 'rgba(201, 154, 46, 0.8)' : 'rgba(16, 185, 129, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Expanding Halo Ring when Hovering on Clickables
        if (isHovering) {
          ctx.beginPath();
          ctx.arc(x, y, 16, 0, Math.PI * 2);
          ctx.strokeStyle = retroMode ? 'rgba(255, 255, 0, 0.8)' : 'rgba(201, 154, 46, 0.7)';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Outer dashed pulse
          ctx.beginPath();
          ctx.arc(x, y, 22, 0, Math.PI * 2);
          ctx.strokeStyle = retroMode ? 'rgba(0, 255, 102, 0.35)' : 'rgba(16, 185, 129, 0.35)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Center cursor core dot
        ctx.beginPath();
        ctx.arc(x, y, isHovering ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = retroMode
          ? isHovering ? '#ffff00' : '#00ff66'
          : isHovering ? '#c99a2e' : '#10b981';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [retroMode]);

  if (!isPointerDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 select-none"
      aria-hidden="true"
    />
  );
};
