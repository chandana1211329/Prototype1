import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  baseX: number;
  baseY: number;
}

/**
 * StarField Component
 * 
 * Creates an interactive canvas-based star particle effect.
 * Stars respond to cursor movement with a subtle parallax effect,
 * creating an immersive atmospheric background.
 * 
 * The animation uses requestAnimationFrame for smooth 60fps rendering
 * and responds to mouse position to create depth through parallax.
 */
const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Initialize stars with random positions
    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000); // Density based on screen size
      starsRef.current = [];

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        starsRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
        });
      }
    };

    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with background color matching the design system
      ctx.fillStyle = 'hsl(210, 6%, 25%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update each star
      starsRef.current.forEach((star) => {
        // Parallax effect based on mouse position
        // Smaller stars move more (depth illusion)
        const parallaxFactor = star.size * 15;
        const targetX = star.baseX + mouseRef.current.x * parallaxFactor;
        const targetY = star.baseY + mouseRef.current.y * parallaxFactor;

        // Smooth interpolation towards target position
        star.x += (targetX - star.x) * 0.05;
        star.y += (targetY - star.y) * 0.05;

        // Gentle drift animation
        star.baseX += star.speedX;
        star.baseY += star.speedY;

        // Wrap around edges
        if (star.baseX < -10) star.baseX = canvas.width + 10;
        if (star.baseX > canvas.width + 10) star.baseX = -10;
        if (star.baseY < -10) star.baseY = canvas.height + 10;
        if (star.baseY > canvas.height + 10) star.baseY = -10;

        // Twinkle effect
        const twinkle = Math.sin(Date.now() * 0.002 + star.x) * 0.2 + 0.8;
        
        // Draw star with glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, 100%, ${star.opacity * twinkle})`;
        ctx.fill();

        // Add subtle glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(0, 0%, 100%, ${star.opacity * twinkle * 0.15})`;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default StarField;
