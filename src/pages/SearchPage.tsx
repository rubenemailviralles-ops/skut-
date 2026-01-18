import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import type { ThemeType } from '../types';

type ShopCategory =
  | 'On Sale'
  | 'Hoodies'
  | 'Shirts'
  | 'Rave Sets'
  | 'Accessories'
  | 'Hats'
  | 'Shades'
  | 'Bags'
  | 'Socks';

type Product = {
  id: string;
  name: string;
  category: Exclude<ShopCategory, 'On Sale'>;
  theme: ThemeType;
  onSale: boolean;
};

const categories: Exclude<ShopCategory, 'On Sale'>[] = [
  'Hoodies',
  'Shirts',
  'Rave Sets',
  'Accessories',
  'Hats',
  'Shades',
  'Bags',
  'Socks',
];

const products: Product[] = [
  { id: 'p1', name: 'Warehouse Hoodie', category: 'Hoodies', theme: 'industrial', onSale: true },
  { id: 'p2', name: 'Neon Pulse Hoodie', category: 'Hoodies', theme: 'psytrance', onSale: false },
  { id: 'p3', name: 'Machine Soul Hoodie', category: 'Hoodies', theme: 'detroit', onSale: true },
  { id: 'p4', name: 'Raw Cut Shirt', category: 'Shirts', theme: 'industrial', onSale: false },
  { id: 'p5', name: 'Fractal Shirt', category: 'Shirts', theme: 'psytrance', onSale: true },
  { id: 'p6', name: 'Gridline Shirt', category: 'Shirts', theme: 'detroit', onSale: false },
  { id: 'p7', name: 'Rave Set: Redline', category: 'Rave Sets', theme: 'industrial', onSale: true },
  { id: 'p8', name: 'Rave Set: Kaleidoscope', category: 'Rave Sets', theme: 'psytrance', onSale: true },
  { id: 'p9', name: 'Rave Set: Blueprint', category: 'Rave Sets', theme: 'detroit', onSale: false },
  { id: 'p10', name: 'LED Chain Accessory', category: 'Accessories', theme: 'industrial', onSale: false },
  { id: 'p11', name: 'UV Totem Accessory', category: 'Accessories', theme: 'psytrance', onSale: true },
  { id: 'p12', name: 'Chrome Clip Accessory', category: 'Accessories', theme: 'detroit', onSale: false },
  { id: 'p13', name: 'Raver Hat', category: 'Hats', theme: 'industrial', onSale: false },
  { id: 'p14', name: 'Psy Cap', category: 'Hats', theme: 'psytrance', onSale: true },
  { id: 'p15', name: 'Tech Hat', category: 'Hats', theme: 'detroit', onSale: false },
  { id: 'p16', name: 'Night Shades', category: 'Shades', theme: 'industrial', onSale: true },
  { id: 'p17', name: 'Prism Shades', category: 'Shades', theme: 'psytrance', onSale: false },
  { id: 'p18', name: 'Minimal Shades', category: 'Shades', theme: 'detroit', onSale: false },
  { id: 'p19', name: 'Rave Bag', category: 'Bags', theme: 'industrial', onSale: false },
  { id: 'p20', name: 'Festival Bag', category: 'Bags', theme: 'psytrance', onSale: true },
  { id: 'p21', name: 'Utility Bag', category: 'Bags', theme: 'detroit', onSale: false },
  { id: 'p22', name: 'Bass Socks', category: 'Socks', theme: 'industrial', onSale: false },
  { id: 'p23', name: 'Trance Socks', category: 'Socks', theme: 'psytrance', onSale: false },
  { id: 'p24', name: 'Motor Socks', category: 'Socks', theme: 'detroit', onSale: true },
];

export default function SearchPage() {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Exclude<ShopCategory, 'On Sale'> | 'All'>('All');

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          accent: 'text-red-500',
          border: 'border-red-500/30',
          glow: 'shadow-[0_0_18px_rgba(239,68,68,0.25)]',
          chip: 'border-red-500/40',
          chipActive: 'bg-red-500/20 border-red-500 text-red-300',
        };
      case 'psytrance':
        return {
          accent: 'text-purple-400',
          border: 'border-purple-500/30',
          glow: 'shadow-[0_0_20px_rgba(192,38,211,0.25)]',
          chip: 'border-purple-500/40',
          chipActive: 'bg-purple-500/20 border-purple-500 text-purple-200',
        };
      case 'detroit':
        return {
          accent: 'text-blue-400',
          border: 'border-blue-500/30',
          glow: 'shadow-[0_0_18px_rgba(59,130,246,0.22)]',
          chip: 'border-blue-500/40',
          chipActive: 'bg-blue-500/20 border-blue-500 text-blue-200',
        };
    }
  };

  const colors = getThemeColors();
  const ledClass = theme === 'industrial' ? 'led-light-red' : theme === 'psytrance' ? 'led-light-purple' : 'led-light-blue';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = q.length === 0 || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, query]);

  const onSale = useMemo(() => filtered.filter((p) => p.onSale), [filtered]);
  const byCategory = useMemo(() => {
    const map = new Map<Exclude<ShopCategory, 'On Sale'>, Product[]>();
    for (const c of categories) map.set(c, []);
    for (const p of filtered) map.get(p.category)?.push(p);
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 mb-8">
        <h1 className={`text-5xl md:text-6xl font-black text-white mb-3 ${colors.accent}`}>Shop All</h1>
        <p className="text-xl text-gray-400">Search across all themes and categories</p>
      </div>

      <div className="container mx-auto px-4">
        <div className={`bg-black/60 border ${colors.border} ${colors.glow} rounded-lg p-4 md:p-6 flow-item`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-black/50 border ${colors.border}`}>
              <Search className="w-5 h-5 text-white" />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hoodies, shirts, sets..."
              className="flex-1 bg-black/40 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm md:text-base focus:outline-none focus:border-current theme-transition"
              style={{ borderColor: theme === 'industrial' ? '#ef4444' : theme === 'psytrance' ? '#c084fc' : '#60a5fa' }}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-2 rounded-full text-xs md:text-sm border transition-transform duration-200 active:scale-[0.99] ${
                activeCategory === 'All' ? `${colors.chipActive} ${ledClass}` : `${colors.chip} ${ledClass} opacity-80`
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-2 rounded-full text-xs md:text-sm border transition-transform duration-200 active:scale-[0.99] ${
                  activeCategory === c ? `${colors.chipActive} ${ledClass}` : `${colors.chip} ${ledClass} opacity-80`
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <section className="py-10 px-4 cv-auto">
          <div className="container mx-auto">
            <h2 className={`text-3xl md:text-4xl tracking-wide ${ledClass} mb-5`}>On Sale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {onSale.length === 0 ? (
                <div className={`col-span-full bg-black/50 border ${colors.border} rounded-lg p-8 text-center text-gray-400 flow-item`}>
                  No on-sale items match your search.
                </div>
              ) : (
                onSale.slice(0, 12).map((p) => (
                  <div
                    key={p.id}
                    className={`rounded-lg border ${colors.border} bg-black/50 p-5 transition-transform duration-200 active:scale-[0.99] flow-item`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className={`text-lg font-bold ${ledClass}`}>{p.name}</div>
                        <div className="text-sm text-gray-400">{p.category}</div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${colors.border} ${ledClass}`}>SALE</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {categories.map((c) => {
          const list = byCategory.get(c) ?? [];
          if (activeCategory !== 'All' && activeCategory !== c) return null;
          return (
            <section key={c} className="py-10 px-4 cv-auto flow-item">
              <div className="container mx-auto">
                <h2 className={`text-3xl md:text-4xl tracking-wide ${ledClass} mb-5`}>{c}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.length === 0 ? (
                    <div className={`col-span-full bg-black/50 border ${colors.border} rounded-lg p-8 text-center text-gray-400 flow-item`}>
                      No items match your search.
                    </div>
                  ) : (
                    list.slice(0, 9).map((p) => (
                      <div
                        key={p.id}
                        className={`rounded-lg border ${colors.border} bg-black/50 p-5 transition-transform duration-200 active:scale-[0.99] flow-item`}
                      >
                        <div className={`text-lg font-bold ${ledClass}`}>{p.name}</div>
                        <div className="text-sm text-gray-400">{p.theme.toUpperCase()}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
