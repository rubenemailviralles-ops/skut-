import ProductCarousel from '../components/ProductCarousel';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

export default function ShopPage() {
  const { gender, theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    if ('addEventListener' in mq) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          accent: 'text-red-500',
          border: 'border-red-500/30',
          card: 'hover:border-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.18)] transition-all duration-300'
        };
      case 'psytrance':
        return {
          accent: 'text-purple-400',
          border: 'border-purple-500/30',
          card: 'hover:border-purple-500 hover:shadow-[0_0_30px_rgba(192,38,211,0.4)] transition-all duration-700'
        };
      case 'detroit':
        return {
          accent: 'text-blue-400',
          border: 'border-blue-500/30',
          card: 'hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300'
        };
    }
  };

  const colors = getThemeColors();

  const topCategories = [
    'On Sale',
    'Rave Sets',
    'Accessories',
  ];

  const categories = [
    'Hats',
    'Shades',
    gender === 'female' ? 'Tops' : 'Shirts',
    'Long Pants',
    'Rave Bags',
    'Socks',
  ];

  const visibleCategories = isMobile && !showAllCategories ? categories.slice(0, 3) : categories;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 mb-12">
        <h1 className={`text-5xl md:text-6xl font-black text-white mb-4 ${colors.accent}`}>
          Shop
        </h1>
        <p className="text-xl text-gray-400">
          Discover the full collection of {gender === 'male' ? "men's" : "women's"} rave wear
        </p>
      </div>

      <div className="relative z-10">
        {topCategories.map((category) => (
          <ProductCarousel key={category} category={category} itemCount={8} />
        ))}
        {visibleCategories.map((category) => (
          <ProductCarousel key={category} category={category} itemCount={8} />
        ))}
      </div>

      {isMobile && !showAllCategories && (
        <div className="container mx-auto px-4 mt-6">
          <button
            onClick={() => setShowAllCategories(true)}
            className={`${theme === 'industrial' ? 'led-light-red' : theme === 'psytrance' ? 'led-light-purple' : 'led-light-blue'} led-border border-2 border-current bg-black/40 w-full rounded-lg py-3 text-sm transition-transform duration-200 active:scale-[0.99] flow-item`}
          >
            Load More
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 mt-16">
        <div className={`bg-black/50 backdrop-blur-sm border ${colors.border} ${colors.card} rounded-lg p-12 text-center flow-item`}>
          <h2 className={`text-3xl font-bold text-white mb-4 ${colors.accent}`}>
            Coming Soon
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our full product catalog is being curated with the same attention to detail
            as our designs. Sign up for our newsletter to be the first to know when we launch.
          </p>
        </div>
      </div>
    </div>
  );
}
