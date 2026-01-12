import { Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileThemesOpen, setMobileThemesOpen] = useState(false);
  const { theme, setTheme, gender, setGender } = useTheme();

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          text: 'text-red-500',
          hover: 'hover:text-red-400',
          border: 'border-red-500/30',
          bg: 'bg-black/80'
        };
      case 'psytrance':
        return {
          text: 'text-purple-400',
          hover: 'hover:text-pink-400',
          border: 'border-purple-500/30',
          bg: 'bg-black/80'
        };
      case 'detroit':
        return {
          text: 'text-blue-400',
          hover: 'hover:text-purple-400',
          border: 'border-blue-500/30',
          bg: 'bg-black/80'
        };
    }
  };

  const colors = getThemeColors();
  const navItems = ['Home', 'Shop', 'About Us', 'Learn More'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${colors.bg} backdrop-blur-md border-b ${colors.border} theme-transition`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('Home')}
          className="flex flex-col items-center theme-transition hover:scale-105 transition-transform leading-none logo-container"
        >
          <span
            className={`text-2xl md:text-3xl tracking-wider ${colors.text} theme-transition logo-outline`}
            style={{ fontFamily: '"Permanent Marker", cursive', letterSpacing: '0.05em', fontWeight: 400 }}
          >
            SKUT
          </span>
          <span
            className={`text-[10px] md:text-xs tracking-wider ${colors.text} theme-transition logo-outline`}
            style={{ fontFamily: '"Permanent Marker", cursive', letterSpacing: '0.05em', marginTop: '-2px', fontWeight: 400 }}
          >
            APPAREL
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-8 relative">
          {navItems.map((item) =>
            item === 'Shop' ? (
              <div key={item} className="relative group">
                <button
                  onClick={() => onNavigate(item)}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === item ? colors.text : `text-gray-400 ${colors.hover}`
                  }`}
                >
                  {item.toUpperCase()}
                </button>

                <div className={`absolute left-0 mt-0 w-56 ${colors.bg} border ${colors.border} rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-4`}>
                  <div className="flex">
                    <div className="flex-1 px-4">
                      <p className="text-xs text-gray-500 font-semibold mb-3 uppercase">Themes</p>
                      <div className="space-y-2">
                        {['industrial', 'psytrance', 'detroit'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t as any)}
                            className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                              theme === t ? colors.text + ' bg-white/10' : 'text-gray-400 hover:text-gray-300'
                            }`}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-px bg-white/10"></div>

                    <div className="flex-1 px-4">
                      <p className="text-xs text-gray-500 font-semibold mb-3 uppercase">Gender</p>
                      <div className="space-y-2">
                        {['male', 'female'].map((g) => (
                          <button
                            key={g}
                            onClick={() => setGender(g as any)}
                            className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                              gender === g ? colors.text + ' bg-white/10' : 'text-gray-400 hover:text-gray-300'
                            }`}
                          >
                            {g.charAt(0).toUpperCase() + g.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                key={item}
                onClick={() => onNavigate(item)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item ? colors.text : `text-gray-400 ${colors.hover}`
                }`}
              >
                {item.toUpperCase()}
              </button>
            )
          )}
          <button className={`${colors.text} ${colors.hover} transition-colors`}>
            <ShoppingCart className="w-5 h-5" />
          </button>
        </nav>

        <button
          className={`md:hidden ${colors.text}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className={`md:hidden ${colors.bg} backdrop-blur-md border-t ${colors.border}`}>
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) =>
              item === 'Shop' ? (
                <div key={item}>
                  <button
                    onClick={() => {
                      setMobileThemesOpen(!mobileThemesOpen);
                    }}
                    className={`text-left text-sm font-medium transition-colors ${
                      currentPage === item ? colors.text : `text-gray-400 ${colors.hover}`
                    }`}
                  >
                    {item.toUpperCase()}
                  </button>

                  {mobileThemesOpen && (
                    <div className="mt-3 ml-4 space-y-3">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Themes</p>
                      <div className="space-y-2">
                        {['industrial', 'psytrance', 'detroit'].map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setTheme(t as any);
                              setMobileThemesOpen(false);
                            }}
                            className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                              theme === t ? colors.text + ' bg-white/10' : 'text-gray-400'
                            }`}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>

                      <p className="text-xs text-gray-500 font-semibold uppercase mt-4">Gender</p>
                      <div className={`inline-flex items-center rounded-full ${colors.bg} border ${colors.border} overflow-hidden`}>
                        {['male', 'female'].map((g, idx) => (
                          <div key={g} className="flex items-center">
                            <button
                              onClick={() => setGender(g as any)}
                              className={`px-4 py-2 text-sm font-medium transition-colors ${
                                gender === g
                                  ? colors.text + ' bg-white/10'
                                  : 'text-gray-400'
                              }`}
                            >
                              {g.charAt(0).toUpperCase() + g.slice(1)}
                            </button>
                            {idx === 0 && <div className="h-5 w-px bg-white/10"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item}
                  onClick={() => {
                    onNavigate(item);
                    setMenuOpen(false);
                  }}
                  className={`text-left text-sm font-medium transition-colors ${
                    currentPage === item ? colors.text : `text-gray-400 ${colors.hover}`
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              )
            )}
            <button className={`text-left ${colors.text} ${colors.hover} transition-colors flex items-center`}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              CART
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
