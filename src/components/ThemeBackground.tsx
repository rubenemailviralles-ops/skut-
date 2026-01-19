import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { ThemeType } from '../types';

export default function ThemeBackground() {
  const { theme } = useTheme();
  const [industrialUseFallback, setIndustrialUseFallback] = useState(false);
  const [psytranceUseFallback, setPsytranceUseFallback] = useState(false);
  const [detroitUseFallback, setDetroitUseFallback] = useState(false);
  const [lowPowerMode, setLowPowerMode] = useState(false);
  const [previousTheme, setPreviousTheme] = useState<ThemeType | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [previousOpacity, setPreviousOpacity] = useState(1);
  const [currentOpacity, setCurrentOpacity] = useState(1);
  const [loadedThemes, setLoadedThemes] = useState<Record<ThemeType, boolean>>({
    industrial: false,
    psytrance: false,
    detroit: false,
  });
  const loadedThemesRef = useRef(loadedThemes);
  const currentThemeRef = useRef<ThemeType>(theme);
  const transitionTimerRef = useRef<number | null>(null);
  const transitionRafRef = useRef<number | null>(null);
  const preloadInFlightRef = useRef<Record<ThemeType, boolean>>({
    industrial: false,
    psytrance: false,
    detroit: false,
  });
  const strobeRef = useRef<HTMLDivElement | null>(null);
  const mouseRafRef = useRef<number | null>(null);
  const pendingMouseRef = useRef({ x: 50, y: 50 });
  const baseUrl = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const crossfadeDurationMs = lowPowerMode ? 220 : 420;

  useEffect(() => {
    loadedThemesRef.current = loadedThemes;
  }, [loadedThemes]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const deviceMemory = Number((navigator as any).deviceMemory ?? 8);
      const cores = Number(navigator.hardwareConcurrency ?? 8);
      setLowPowerMode(mq.matches || reducedMotionMq.matches || deviceMemory <= 4 || cores <= 4);
    };

    update();

    if ('addEventListener' in mq) {
      mq.addEventListener('change', update);
      reducedMotionMq.addEventListener('change', update);
      return () => {
        mq.removeEventListener('change', update);
        reducedMotionMq.removeEventListener('change', update);
      };
    }

    mq.addListener(update);
    reducedMotionMq.addListener(update);
    return () => {
      mq.removeListener(update);
      reducedMotionMq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (lowPowerMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      pendingMouseRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      if (mouseRafRef.current) return;
      mouseRafRef.current = window.requestAnimationFrame(() => {
        mouseRafRef.current = null;
        if (!strobeRef.current) return;
        strobeRef.current.style.setProperty('--x', `${pendingMouseRef.current.x}%`);
        strobeRef.current.style.setProperty('--y', `${pendingMouseRef.current.y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseRafRef.current) window.cancelAnimationFrame(mouseRafRef.current);
      mouseRafRef.current = null;
    };
  }, [lowPowerMode]);

  useEffect(() => {
    if (theme === 'psytrance') setPsytranceUseFallback(false);
  }, [theme]);

  useEffect(() => {
    const loadImage = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        (img as any).decoding = 'async';
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('image_load_failed'));
        img.src = src;
      });

    const ensureThemeLoaded = async (t: ThemeType) => {
      if (loadedThemesRef.current[t] || preloadInFlightRef.current[t]) return;
      preloadInFlightRef.current[t] = true;

      try {
        if (t === 'industrial') {
          const main = `${baseUrl}industrial-warehouse.jpg`;
          const fallback = `${baseUrl}image.jpg`;
          try {
            await loadImage(main);
            setIndustrialUseFallback(false);
          } catch {
            try {
              await loadImage(fallback);
              setIndustrialUseFallback(true);
            } catch {
              setIndustrialUseFallback(true);
            }
          }
          setLoadedThemes((prev) => ({ ...prev, industrial: true }));
          return;
        }

        if (t === 'detroit') {
          const main = `${baseUrl}detroit-underground.jpg`;
          const fallback = `${baseUrl}15-hidden-techno-clubs-in-los-angeles-that-locals-love.webp`;
          try {
            await loadImage(main);
            setDetroitUseFallback(false);
          } catch {
            try {
              await loadImage(fallback);
              setDetroitUseFallback(true);
            } catch {
              setDetroitUseFallback(true);
            }
          }
          setLoadedThemes((prev) => ({ ...prev, detroit: true }));
          return;
        }

        const main = `${baseUrl}psytrance-stage.jpg`;
        const fallback = `${baseUrl}best-psytrance-festivals.jpg`;
        try {
          await loadImage(main);
          setPsytranceUseFallback(false);
        } catch {
          try {
            await loadImage(fallback);
            setPsytranceUseFallback(true);
          } catch {
            setPsytranceUseFallback(true);
          }
        }
        setLoadedThemes((prev) => ({ ...prev, psytrance: true }));
      } finally {
        preloadInFlightRef.current[t] = false;
      }
    };

    void ensureThemeLoaded(theme);

    if (!lowPowerMode) {
      void ensureThemeLoaded('industrial');
      void ensureThemeLoaded('psytrance');
      void ensureThemeLoaded('detroit');
      return;
    }

    const timer = window.setTimeout(() => {
      void ensureThemeLoaded('industrial');
      window.setTimeout(() => void ensureThemeLoaded('psytrance'), 500);
      window.setTimeout(() => void ensureThemeLoaded('detroit'), 1000);
    }, 650);

    return () => window.clearTimeout(timer);
  }, [baseUrl, lowPowerMode, theme]);

  useEffect(() => {
    if (currentThemeRef.current === theme) {
      setCurrentOpacity(1);
      return;
    }

    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    if (transitionRafRef.current) window.cancelAnimationFrame(transitionRafRef.current);

    const from = currentThemeRef.current;
    setPreviousTheme(from);
    setPreviousOpacity(1);
    setCurrentOpacity(0);
    setIsCrossfading(true);

    const startFade = () => {
      transitionRafRef.current = window.requestAnimationFrame(() => {
        setCurrentOpacity(1);
        setPreviousOpacity(0);
      });

      transitionTimerRef.current = window.setTimeout(() => {
        setIsCrossfading(false);
        setPreviousTheme(null);
        currentThemeRef.current = theme;
      }, crossfadeDurationMs);
    };

    if (loadedThemes[theme]) {
      startFade();
      return;
    }

    const waitTimer = window.setInterval(() => {
      if (!loadedThemes[theme]) return;
      window.clearInterval(waitTimer);
      startFade();
    }, 50);

    return () => window.clearInterval(waitTimer);
  }, [crossfadeDurationMs, loadedThemes, theme]);

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
                ref={strobeRef}
                className="industrial-strobe"
                style={{ '--x': '50%', '--y': '50%' } as any}
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
            onLoad={() => setLoadedThemes((prev) => ({ ...prev, psytrance: true }))}
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
    <div className="fixed inset-0 z-0 pointer-events-none theme-transition bg-black bg-crossfade">
      {isCrossfading && previousTheme && previousTheme !== theme && (
        <div
          className="absolute inset-0 bg-crossfade-layer"
          style={{ opacity: previousOpacity, transitionDuration: `${crossfadeDurationMs}ms` }}
        >
          {renderTheme(previousTheme)}
        </div>
      )}
      <div
        className="absolute inset-0 bg-crossfade-layer"
        style={{ opacity: isCrossfading ? currentOpacity : 1, transitionDuration: `${crossfadeDurationMs}ms` }}
      >
        {renderTheme(theme)}
      </div>
    </div>
  );
}
