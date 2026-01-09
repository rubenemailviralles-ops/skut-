import HeroSection from '../components/HeroSection';
import ProductCarousel from '../components/ProductCarousel';
import { useTheme } from '../context/ThemeContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { theme } = useTheme();

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          accent: 'text-red-500',
          border: 'border-red-500/30',
          hover: 'hover:text-red-400',
          bg: 'bg-red-500/20'
        };
      case 'psytrance':
        return {
          accent: 'text-purple-400',
          border: 'border-purple-500/30',
          hover: 'hover:text-pink-400',
          bg: 'bg-purple-500/20'
        };
      case 'detroit':
        return {
          accent: 'text-blue-400',
          border: 'border-blue-500/30',
          hover: 'hover:text-purple-400',
          bg: 'bg-blue-500/20'
        };
    }
  };

  const colors = getThemeColors();

  const categories = [
    'On Sale',
    'Rave Sets',
    'Accessories',
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="relative z-10">
        {categories.map((category) => (
          <ProductCarousel key={category} category={category} itemCount={6} />
        ))}

        <div className="container mx-auto px-4 py-16">
          <button
            onClick={() => onNavigate('Shop')}
            className={`${colors.accent} ${colors.border} border px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${colors.hover} hover:${colors.bg} hover:scale-105`}
          >
            SHOP MORE
          </button>
        </div>
      </div>
    </div>
  );
}
