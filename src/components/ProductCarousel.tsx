import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRef } from 'react';

interface ProductCarouselProps {
  category: string;
  itemCount?: number;
}

export default function ProductCarousel({ category, itemCount = 6 }: ProductCarouselProps) {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          accent: 'border-red-500',
          text: 'text-red-400',
          hover: 'hover:border-red-400 hover:[animation:glitch-anim_0.3s_ease-in-out_infinite]',
          bg: 'bg-red-950/20'
        };
      case 'psytrance':
        return {
          accent: 'border-purple-500',
          text: 'text-purple-400',
          hover: 'hover:border-purple-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(192,38,211,0.6)] duration-700 ease-in-out',
          bg: 'bg-purple-950/20'
        };
      case 'detroit':
        return {
          accent: 'border-blue-500',
          text: 'text-blue-400',
          hover: 'hover:border-cyan-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] duration-300',
          bg: 'bg-blue-950/20'
        };
    }
  };

  const colors = getThemeColors();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl md:text-4xl font-bold text-white tracking-wide ${colors.text}`}>
            {category}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className={`p-2 rounded-full bg-black/50 border ${colors.accent} ${colors.hover} transition-all hover:scale-110`}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-2 rounded-full bg-black/50 border ${colors.accent} ${colors.hover} transition-all hover:scale-110`}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Array.from({ length: itemCount }).map((_, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-72 h-96 rounded-lg border-2 border-dashed ${colors.accent} ${colors.bg} backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 ${colors.hover} cursor-pointer group snap-start`}
            >
              <div className={`w-16 h-16 rounded-full ${colors.bg} border-2 ${colors.accent} flex items-center justify-center mb-4 group-hover:rotate-90 transition-transform duration-300`}>
                <Plus className={`w-8 h-8 ${colors.text}`} />
              </div>
              <p className="text-gray-400 text-sm font-medium">Add Product</p>
              <p className="text-gray-600 text-xs mt-2">Placeholder #{idx + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
