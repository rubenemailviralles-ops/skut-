import ProductCarousel from '../components/ProductCarousel';
import { useTheme } from '../context/ThemeContext';

export default function ShopPage() {
  const { gender, theme } = useTheme();

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          accent: 'text-red-500',
          border: 'border-red-500/30'
        };
      case 'psytrance':
        return {
          accent: 'text-purple-400',
          border: 'border-purple-500/30'
        };
      case 'detroit':
        return {
          accent: 'text-blue-400',
          border: 'border-blue-500/30'
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
        {categories.map((category) => (
          <ProductCarousel key={category} category={category} itemCount={8} />
        ))}
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className={`bg-black/50 backdrop-blur-sm border ${colors.border} rounded-lg p-12 text-center`}>
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
