import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeBackground() {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 theme-transition">
      {theme === 'industrial' && (
        <div className="w-full h-full bg-cover bg-center bg-no-repeat industrial-bg" style={{ backgroundImage: `url(${baseUrl}image.jpg)` }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="industrial-noise" />
          <div className="industrial-glitch-layer" />
          <div className="industrial-fog" />
          <div className="industrial-fog" style={{ animationDelay: '10s', opacity: 0.5 }} />
          <div
            className="industrial-strobe"
            style={{ '--x': `${mousePos.x}%`, '--y': `${mousePos.y}%` } as any}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-black/50 animate-pulse" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      )}

      {theme === 'psytrance' && (
        <div className="w-full h-full bg-cover bg-center bg-no-repeat psytrance-bg" style={{ backgroundImage: `url(${baseUrl}best-psytrance-festivals.jpg)` }}>
             <div className="psytrance-mandala" />
             <div className="psytrance-vortex" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
             <div className="psytrance-liquid" style={{ top: '20%', left: '20%' }} />
             <div className="psytrance-liquid" style={{ bottom: '20%', right: '20%', animationDelay: '4s' }} />
        </div>
      )}

      {theme === 'detroit' && (
        <div className="w-full h-full bg-cover bg-center bg-no-repeat detroit-bg" style={{ backgroundImage: `url(${baseUrl}15-hidden-techno-clubs-in-los-angeles-that-locals-love.webp)` }}>
             <div className="detroit-circuits" />
             <div className="detroit-data-stream" />
             <div className="detroit-scanline" />
             <div className="detroit-wave" style={{ top: '20%' }} />
             <div className="detroit-wave" style={{ top: '60%', animationDelay: '7s' }} />
        </div>
      )}
    </div>
  );
}
