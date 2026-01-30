import { useEffect, useRef } from "react";

export const DigitalGridRipple = ({ isDark }: { isDark: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const points = useRef<{x: number, y: number, originX: number, originY: number, vx: number, vy: number}[]>([]);
  const frameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true }); // Optimize context
    if (!ctx) return;

    // Further increased grid size for performance
    const gridSize = 90; 
    
    const resize = () => {
      if (!canvas || !container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;
      points.current = [];
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          points.current.push({
            x, y,
            originX: x, originY: y,
            vx: 0, vy: 0
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX + window.scrollX,
        y: e.clientY + window.scrollY
      };
    };
    
    // Throttled resize
    let resizeTimeout: NodeJS.Timeout;
    const handleResizeDebounced = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 200);
    };

    window.addEventListener('resize', handleResizeDebounced);
    window.addEventListener('mousemove', handleMouseMove);

    resize();

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const friction = 0.90; // Higher friction = faster stop
      const ease = 0.15;
      const radius = 300; 
      let active = false;

      // Only calculate if mouse is close or points are moving? 
      // Hard to optimize strictly without complex spatial hashing, 
      // but we can check if points have significant velocity.
      
      // Optimization: Batch drawing
      ctx.beginPath();
      
      const strokeColor = isDark 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(0, 0, 0, 0.06)';
      
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;

      // Update physics
      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        
        // Simple distance check - skip sqrt if possible?
        // keeping sqrt for accuracy for now but could optimize
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        
        // Only apply force if close
        if (Math.abs(dx) < radius && Math.abs(dy) < radius) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
                const angle = Math.atan2(dy, dx);
                const force = (radius - dist) / radius;
                const push = force * 35; 
                
                const targetX = p.originX - Math.cos(angle) * push;
                const targetY = p.originY - Math.sin(angle) * push;
                
                p.vx += (targetX - p.x) * ease;
                p.vy += (targetY - p.y) * ease;
            }
        }

        // Spring back
        const returnX = p.originX - p.x;
        const returnY = p.originY - p.y;
        
        p.vx += returnX * 0.05; // Return force
        p.vy += returnY * 0.05;

        p.vx *= friction;
        p.vy *= friction;
        
        p.x += p.vx;
        p.y += p.vy;

        // Sleep check
        if (Math.abs(p.vx) > 0.01 || Math.abs(p.vy) > 0.01 || Math.abs(p.x - p.originX) > 0.1 || Math.abs(p.y - p.originY) > 0.1) {
            active = true;
        }
      }

      // Draw lines
      // We can't easily skip drawing if we want the grid to be visible at rest
      // So we just draw.
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
              const idx = i * rows + j;
              if (points.current[idx]) {
                  const p = points.current[idx];
                  if (j === 0) ctx.moveTo(p.x, p.y);
                  else ctx.lineTo(p.x, p.y);
              }
          }
      }
      for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
              const idx = i * rows + j;
              if (points.current[idx]) {
                  const p = points.current[idx];
                  if (i === 0) ctx.moveTo(p.x, p.y);
                  else ctx.lineTo(p.x, p.y);
              }
          }
      }
      ctx.stroke();

      // Glow effect
      if (mouse.current.x > -500) {
        ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';
        const gradient = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, radius);
        const glowColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0)';
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }

      frameId.current = requestAnimationFrame(animate);
    };
    
    // Small delay to let main thread settle before starting animation
    const startTimeout = setTimeout(() => {
        animate();
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResizeDebounced);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId.current);
      clearTimeout(startTimeout);
      clearTimeout(resizeTimeout);
    };
  }, [isDark]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[1] pointer-events-none">
      <canvas 
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
