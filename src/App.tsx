import { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeBackground from './components/ThemeBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import LearnMorePage from './pages/LearnMorePage';
import { preloadImages, preloadFont, runWhenIdle } from './lib/preload';
import { getThemeAssetUrls } from './lib/themeAssets';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    runWhenIdle(() => {
      const connection = (navigator as any).connection;
      const saveData = Boolean(connection?.saveData);
      const isSlow =
        typeof connection?.effectiveType === 'string' &&
        (connection.effectiveType.includes('2g') || connection.effectiveType.includes('slow-2g'));
      if (!saveData && !isSlow) {
        const urls = getThemeAssetUrls(baseUrl);
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
          void preloadImages(urls.slice(0, 4));
          window.setTimeout(() => void preloadImages(urls), 6000);
        } else {
          void preloadImages(urls);
        }
      }
      void preloadFont('BraveGates');
      void preloadFont('Audiowide');
      void preloadFont('BoldMoves');
    });
  }, [baseUrl]);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'Shop':
        return <ShopPage />;
      case 'Search':
        return <SearchPage />;
      case 'About Us':
        return <AboutPage />;
      case 'Learn More':
        return <LearnMorePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="relative h-[100dvh] w-full overflow-hidden text-white bg-black">
        <ThemeBackground />
        <div ref={scrollContainerRef} className="relative z-10 app-scroll">
          <Header currentPage={currentPage} onNavigate={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
