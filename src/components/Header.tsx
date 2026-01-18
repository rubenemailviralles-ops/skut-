import { Facebook, Home, Instagram, Menu, Search, ShoppingCart, Twitter, X, Youtube } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import GenderPictogram from './GenderPictogram';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownPinned, setDropdownPinned] = useState(false);
  const [dropdownHover, setDropdownHover] = useState(false);
  const [mobileThemesOpen, setMobileThemesOpen] = useState(false);
  const { theme, setTheme, gender, setGender } = useTheme();
  const ledClass = theme === 'industrial' ? 'led-light-red' : theme === 'psytrance' ? 'led-light-purple' : 'led-light-blue';
  const neonColor = theme === 'industrial' ? '#ef4444' : theme === 'psytrance' ? '#c084fc' : '#60a5fa';

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
  const navItems = ['Home', 'Shop', 'About Us', 'Learn More', 'Terms'];
  const shopDropdownVisible = dropdownPinned || dropdownHover;
  const showHomeInMobileMenu = currentPage !== 'Home';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${colors.bg} backdrop-blur-md theme-transition`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('Home')}
          className="flex flex-col items-center theme-transition hover:scale-105 transition-transform leading-none logo-container"
        >
          <span
            className={`text-2xl md:text-3xl tracking-wider ${colors.text} theme-transition logo-outline`}
            style={{ fontFamily: 'BraveGates, BoldMoves, "Russo One", sans-serif', letterSpacing: '0.1em', fontWeight: 400, lineHeight: 1 }}
          >
            SKUT
          </span>
          <span
            className={`text-[10px] md:text-xs tracking-wider ${colors.text} theme-transition logo-outline`}
            style={{ fontFamily: 'BraveGates, "Audiowide", cursive', letterSpacing: '0.22em', marginTop: '0.1rem', fontWeight: 400, lineHeight: 1.1 }}
          >
            APPAREL
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-8 relative">
          {navItems.map((item) =>
            item === 'Shop' ? (
              <div
                key={item}
                className="relative group flex items-center"
                onMouseEnter={() => setDropdownHover(true)}
                onMouseLeave={() => setDropdownHover(false)}
              >
                <button
                  onClick={() =>
                    setDropdownPinned((pinned) => {
                      const next = !pinned;
                      if (!next) setDropdownHover(false);
                      return next;
                    })
                  }
                  className={`text-sm leading-none transition-opacity ${ledClass} ${currentPage === item ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                >
                  {item.toUpperCase()}
                </button>

                <div
                  className={`absolute left-0 top-full mt-3 w-72 ${colors.bg} border ${colors.border} rounded-lg shadow-lg transition-all duration-200 py-4 ${
                    shopDropdownVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <div className="flex">
                    <div className="flex-1 px-4">
                      <p className={`text-xs mb-3 uppercase ${ledClass} opacity-80`}>Themes</p>
                      <div className="space-y-2">
                        {['industrial', 'psytrance', 'detroit'].map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setTheme(t as any);
                              onNavigate('Shop');
                              setDropdownPinned(false);
                              setDropdownHover(false);
                            }}
                            className={`w-full text-left text-sm px-3 py-2 rounded transition-colors whitespace-nowrap ${
                              theme === t ? `${ledClass} bg-white/10` : `${ledClass} opacity-80 hover:opacity-100`
                            }`}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="self-stretch neon-divider-vertical" style={{ ['--neon-color' as any]: neonColor }} />

                    <div className="flex-1 px-4">
                      <p className={`text-xs mb-3 uppercase ${ledClass} opacity-80`}>Gender</p>
                      <div className="space-y-2">
                        {['male', 'female'].map((g) => (
                          <button
                            key={g}
                            onClick={() => setGender(g as any)}
                            className={`w-full text-left text-sm px-3 py-2 rounded transition-colors whitespace-nowrap ${
                              gender === g ? `${ledClass} bg-white/10` : `${ledClass} opacity-80 hover:opacity-100`
                            }`}
                          >
                            <span className="sr-only">{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                            <GenderPictogram
                              variant={g as any}
                              className="w-5 h-5 neon-pictogram"
                              style={{ color: neonColor }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : item === 'About Us' ? (
              <>
                <button
                  key="Search"
                  onClick={() => onNavigate('Search')}
                  className={`${ledClass} led-icon transition-transform duration-200 hover:scale-110 ${
                    currentPage === 'Search' ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                  }`}
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                <button
                  key={item}
                  onClick={() => onNavigate(item)}
                  className={`text-sm leading-none transition-opacity ${ledClass} ${currentPage === item ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                >
                  {item.toUpperCase()}
                </button>
              </>
            ) : (
              <button
                key={item}
                onClick={() => onNavigate(item)}
                className={`text-sm leading-none transition-opacity ${ledClass} ${currentPage === item ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              >
                {item.toUpperCase()}
              </button>
            )
          )}
          <button className={`${ledClass} led-icon transition-transform duration-200 hover:scale-110`}>
            <ShoppingCart className="w-5 h-5" />
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => {
              onNavigate('Search');
              setMenuOpen(false);
              setMobileThemesOpen(false);
            }}
            className={`${ledClass} led-icon transition-all duration-300 active:scale-[0.99] ${
              currentPage === 'Search' ? 'opacity-0 pointer-events-none -translate-y-0.5' : 'opacity-100'
            }`}
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>

          <button
            onClick={() => {
              onNavigate('Home');
              setMenuOpen(false);
              setMobileThemesOpen(false);
            }}
            className={`${ledClass} led-icon transition-all duration-300 active:scale-[0.99] ${
              currentPage === 'Home' ? 'opacity-0 pointer-events-none -translate-y-0.5' : 'opacity-100'
            }`}
            aria-label="Home"
          >
            <Home className="w-6 h-6" />
          </button>

          <button
            className={colors.text}
            onClick={() =>
              setMenuOpen((open) => {
                const next = !open;
                setMobileThemesOpen(next);
                return next;
              })
            }
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className="neon-divider-line" style={{ ['--neon-color' as any]: neonColor }} />

      {menuOpen && (
        <div className={`md:hidden ${colors.bg} backdrop-blur-md max-h-[calc(100dvh-5.25rem)] overflow-y-auto overscroll-contain`}>
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div
              className={`transition-all duration-300 overflow-hidden ${
                showHomeInMobileMenu ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <button
                onClick={() => {
                  onNavigate('Home');
                  setMenuOpen(false);
                  setMobileThemesOpen(false);
                }}
                className={`text-left text-sm transition-opacity ${ledClass} flex items-center`}
              >
                <Home className="w-4 h-4 mr-2" />
                HOME
              </button>
            </div>
            {navItems.filter((item) => item !== 'Home').map((item) =>
              item === 'Shop' ? (
                <div key={item}>
                  <button
                    onClick={() => {
                      setMobileThemesOpen((open) => !open);
                    }}
                    className={`text-left text-sm transition-opacity ${ledClass} ${currentPage === item ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                  >
                    {item.toUpperCase()}
                  </button>

                  {mobileThemesOpen && (
                    <div className="mt-3 ml-4 space-y-3">
                      <p className={`text-xs uppercase ${ledClass} opacity-80`}>Themes</p>
                      <div className="space-y-2">
                        {['industrial', 'psytrance', 'detroit'].map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setTheme(t as any);
                              setMobileThemesOpen(false);
                              setMenuOpen(false);
                              onNavigate('Shop');
                            }}
                            className={`w-full text-left text-sm px-3 py-2 rounded transition-colors ${
                              theme === t ? `${ledClass} bg-white/10` : `${ledClass} opacity-80`
                            }`}
                          >
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </button>
                        ))}
                      </div>

                      <p className={`text-xs uppercase mt-4 ${ledClass} opacity-80`}>Gender</p>
                      <div className={`inline-flex items-center rounded-full ${colors.bg} border ${colors.border} overflow-hidden`}>
                        {['male', 'female'].map((g, idx) => (
                          <div key={g} className="flex items-center">
                            <button
                              onClick={() => setGender(g as any)}
                              className={`px-4 py-2 text-sm font-medium transition-colors ${
                                gender === g
                                  ? `${ledClass} bg-white/10`
                                  : `${ledClass} opacity-80`
                              }`}
                            >
                              <span className="sr-only">{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                              <GenderPictogram
                                variant={g as any}
                                className="w-4 h-4 neon-pictogram"
                                style={{ color: neonColor }}
                              />
                            </button>
                            {idx === 0 && (
                              <div className="h-5 neon-divider-vertical" style={{ ['--neon-color' as any]: neonColor }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : item === 'Terms' ? (
                <button
                  key={item}
                  onClick={() => {
                    onNavigate(item);
                    setMenuOpen(false);
                  }}
                  className={`text-left text-sm transition-opacity ${ledClass} ${currentPage === item ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                >
                  TERMS & CONDITIONS
                </button>
              ) : (
                <button
                  key={item}
                  onClick={() => {
                    onNavigate(item);
                    setMenuOpen(false);
                  }}
                  className={`text-left text-sm transition-opacity ${ledClass} ${currentPage === item ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                >
                  {item.toUpperCase()}
                </button>
              )
            )}
            <button className={`text-left ${ledClass} led-icon transition-transform duration-200 hover:scale-[1.02] flex items-center`}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              CART
            </button>

            <div className="pt-4 mt-2">
              <div className="neon-divider-line mb-4" style={{ ['--neon-color' as any]: neonColor }} />
              <div className="space-y-3">
                <p className={`text-xs uppercase ${ledClass} opacity-80`}>Newsletter</p>
                <form
                  className="flex flex-col gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white text-sm focus:outline-none focus:border-current theme-transition"
                    style={{ borderColor: theme === 'industrial' ? '#ef4444' : theme === 'psytrance' ? '#c084fc' : '#60a5fa' }}
                  />
                  <button
                    type="submit"
                    className={`${ledClass} led-border border-2 border-current bg-black/40 rounded px-6 py-2 text-sm transition-all duration-300 md:hover:scale-105 active:scale-[0.99]`}
                  >
                    Subscribe
                  </button>
                </form>

                <p className={`text-xs uppercase pt-2 ${ledClass} opacity-80`}>Follow Us</p>
                <div className="flex space-x-4">
                  {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                    <button
                      key={idx}
                      className={`${ledClass} led-icon transition-transform duration-200 md:hover:scale-110 active:scale-[0.99]`}
                      type="button"
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
