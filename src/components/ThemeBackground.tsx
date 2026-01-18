import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { ThemeType } from '../types';

export default function ThemeBackground() {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [industrialUseFallback, setIndustrialUseFallback] = useState(false);
  const [psytranceUseFallback, setPsytranceUseFallback] = useState(false);
  const [detroitUseFallback, setDetroitUseFallback] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<ThemeType | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [previousOpacity, setPreviousOpacity] = useState(1);
  const currentThemeRef = useRef<ThemeType>(theme);
  const baseUrl = import.meta.env.BASE_URL;
  const crossfadeDurationMs = lowPowerMode ? 220 : 420;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setLowPowerMode(mq.matches);
    update();
    if ('addEventListener' in mq) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useEffect(() => {
    if (lowPowerMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [lowPowerMode]);

  useEffect(() => {
    if (theme === 'psytrance') setPsytranceUseFallback(false);
  }, [theme]);

  useEffect(() => {
    if (currentThemeRef.current === theme) return;

    setPreviousTheme(currentThemeRef.current);
    setPreviousOpacity(1);
    setIsCrossfading(true);
    currentThemeRef.current = theme;

    const raf = window.requestAnimationFrame(() => setPreviousOpacity(0));
    const timer = window.setTimeout(() => {
      setIsCrossfading(false);
      setPreviousTheme(null);
    }, crossfadeDurationMs);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [crossfadeDurationMs, theme]);

  useEffect(() => {
    if (theme !== 'industrial') return;

    setIndustrialUseFallback(false);
    const img = new Image();
    img.onload = () => setIndustrialUseFallback(false);
    img.onerror = () => setIndustrialUseFallback(true);
    img.src = `${baseUrl}industrial-warehouse.jpg`;
  }, [baseUrl, theme]);

  useEffect(() => {
    if (theme !== 'detroit') return;

    setDetroitUseFallback(false);
    const img = new Image();
    img.onload = () => setDetroitUseFallback(false);
    img.onerror = () => setDetroitUseFallback(true);
    img.src = `${baseUrl}detroit-underground.jpg`;
  }, [baseUrl, theme]);

  const renderTheme = (t: ThemeType) => {
    if (t === 'industrial') {
      return (
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat industrial-bg"
          style={{
            backgroundImage: `url(${baseUrl}${industrialUseFallback ? 'image.jpg' : 'industrial-warehouse.jpg'})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          {!lowPowerMode && (
            <>
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
            </>
          )}
        </div>
      );
    }

    if (t === 'psytrance') {
      return (
        <div className="w-full h-full bg-cover bg-center bg-no-repeat psytrance-bg">
          <img
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src={`${baseUrl}${psytranceUseFallback ? 'best-psytrance-festivals.jpg' : 'psytrance-stage.jpg'}`}
            onError={() => setPsytranceUseFallback(true)}
            alt=""
          />
          <div className="absolute inset-0 bg-black/35" />
          {!lowPowerMode && (
            <>
              <div className="psytrance-mandala" />
              <div className="psytrance-vortex" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              <div className="psytrance-liquid" style={{ top: '20%', left: '20%' }} />
              <div className="psytrance-liquid" style={{ bottom: '20%', right: '20%', animationDelay: '4s' }} />
            </>
          )}
        </div>
      );
    }

    return (
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat detroit-bg"
        style={{
          backgroundImage: `url(${baseUrl}${detroitUseFallback ? '15-hidden-techno-clubs-in-los-angeles-that-locals-love.webp' : 'detroit-underground.jpg'})`,
        }}
      >
        <div className="detroit-overlay" />
        <div className="detroit-grid" />
        {!lowPowerMode && <div className="detroit-noise" />}
        <div className="detroit-vignette" />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 -z-10 theme-transition bg-black bg-crossfade">
      {isCrossfading && previousTheme && previousTheme !== theme && (
        <div
          className="absolute inset-0 bg-crossfade-layer"
          style={{ opacity: previousOpacity, transitionDuration: `${crossfadeDurationMs}ms` }}
        >
          {renderTheme(previousTheme)}
        </div>
      )}
      <div className="absolute inset-0 bg-crossfade-layer" style={{ transitionDuration: `${crossfadeDurationMs}ms` }}>
        {renderTheme(theme)}
      </div>
    </div>
  );
}
