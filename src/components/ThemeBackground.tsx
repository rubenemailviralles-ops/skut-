import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeBackground() {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

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
        <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/image.jpg)' }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="industrial-fog" />
          <div className="industrial-fog" style={{ animationDelay: '10s', opacity: 0.5 }} />
          <div
            className="industrial-strobe"
            style={{ '--x': `${mousePos.x}%`, '--y': `${mousePos.y}%` } as React.CSSProperties}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-black/50 animate-pulse" />
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      )}

      {theme === 'psytrance' && (
        <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/best-psytrance-festivals.jpg)' }} />
      )}

      {theme === 'detroit' && (
        <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/15-hidden-techno-clubs-in-los-angeles-that-locals-love.webp)' }} />
      )}
    </div>
  );
}
