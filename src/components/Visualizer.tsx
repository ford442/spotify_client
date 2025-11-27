import React, { useRef, useEffect, useCallback } from 'react';
import type { AudioFeatures } from '../types';

interface VisualizerProps {
  isPlaying: boolean;
  features: AudioFeatures | null;
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying, features }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const particles = useRef<{ x: number; y: number; size: number; speedX: number; speedY: number; hue: number; opacity: number }[]>([]);

  const initParticles = useCallback((width: number, height: number) => {
    particles.current = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        hue: Math.random() * 360,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'rgba(10, 10, 20, 0.15)'; // Dark blueish background with a trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const energy = features?.energy ?? 0.5;
    const tempo = features?.tempo ?? 120;
    const valence = features?.valence ?? 0.5; // Mood (0=sad, 1=happy)
    const danceability = features?.danceability ?? 0.5;

    const speedMultiplier = isPlaying ? (tempo / 120) * (energy * 2 + 0.5) : 0.2;
    const baseHue = 180 + valence * 120; // Shift from blue (sad) to green/yellow (happy)
    const pulseFactor = isPlaying ? Math.sin(Date.now() * (tempo / 60000) * Math.PI) : 0;

    particles.current.forEach(p => {
      p.x += p.speedX * speedMultiplier;
      p.y += p.speedY * speedMultiplier;

      if (p.x > canvas.width + p.size) p.x = -p.size;
      else if (p.x < -p.size) p.x = canvas.width + p.size;
      if (p.y > canvas.height + p.size) p.y = -p.size;
      else if (p.y < -p.size) p.y = canvas.height + p.size;

      const sizePulse = pulseFactor * energy * 5 * danceability;
      const currentSize = Math.max(1, p.size + sizePulse);

      ctx.beginPath();
      ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${baseHue + p.hue * 0.1}, 80%, 65%, ${p.opacity})`;
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, [isPlaying, features]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, initParticles]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-80" />;
};

export default Visualizer;
