import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';

interface ProductCarouselProps {
  category: string;
  itemCount?: number;
}

export default function ProductCarousel({ category, itemCount = 6 }: ProductCarouselProps) {
  const { theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const ledClass = theme === 'industrial' ? 'led-light-red' : theme === 'psytrance' ? 'led-light-purple' : 'led-light-blue';
  const [isMobile, setIsMobile] = useState(false);

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
          accent: 'border-red-500',
          text: 'text-red-400',
          hover: 'hover:border-red-400 hover:shadow-[0_0_18px_rgba(239,68,68,0.18)] duration-300',
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

  const effectiveItemCount = isMobile ? Math.min(itemCount, 4) : itemCount;

  return (
    <section className="py-12 px-4 cv-auto flow-item">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl md:text-4xl tracking-wide ${ledClass}`}>
            {category}
          </h2>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {Array.from({ length: effectiveItemCount }).map((_, idx) => (
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

        <div className="mt-5 flex justify-end md:justify-center gap-3">
          <button
            onClick={() => scroll('left')}
            className={`p-3 md:p-2 rounded-full bg-black/50 border ${colors.accent} ${colors.hover} transition-all md:hover:scale-110 active:scale-[0.98]`}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-3 md:p-2 rounded-full bg-black/50 border ${colors.accent} ${colors.hover} transition-all md:hover:scale-110 active:scale-[0.98]`}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
