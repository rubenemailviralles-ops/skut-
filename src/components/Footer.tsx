import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          text: 'text-red-500',
          hover: 'hover:text-red-400',
          border: 'border-red-500/30'
        };
      case 'psytrance':
        return {
          text: 'text-purple-400',
          hover: 'hover:text-pink-400',
          border: 'border-purple-500/30'
        };
      case 'detroit':
        return {
          text: 'text-blue-400',
          hover: 'hover:text-purple-400',
          border: 'border-blue-500/30'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <footer className={`bg-black/90 backdrop-blur-md border-t ${colors.border} theme-transition`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-3 leading-none logo-container">
              <h3
                className={`text-2xl tracking-wider ${colors.text} logo-outline`}
                style={{ fontFamily: 'BraveGates, BoldMoves, "Russo One", sans-serif', letterSpacing: '0.1em', fontWeight: 400, lineHeight: 1 }}
              >
                SKUT
              </h3>
              <p
                className={`text-xs tracking-wider ${colors.text} logo-outline`}
                style={{ fontFamily: 'BraveGates, "Audiowide", cursive', letterSpacing: '0.22em', marginTop: '0.1rem', fontWeight: 400, lineHeight: 1.1 }}
              >
                APPAREL
              </p>
            </div>
            <p className={`text-sm ${theme === 'industrial' ? 'led-light-red' : theme === 'psytrance' ? 'led-light-purple' : 'led-light-blue'}`}>FOR RAVERS BY RAVERS</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white text-sm focus:outline-none focus:border-current theme-transition"
                style={{ borderColor: theme === 'industrial' ? '#ef4444' : theme === 'psytrance' ? '#c084fc' : '#60a5fa' }}
              />
              <button
                type="submit"
                className={`${colors.text} ${colors.hover} border ${colors.border} rounded px-6 py-2 text-sm font-medium transition-colors`}
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <button
                  key={idx}
                  className={`${colors.text} ${colors.hover} transition-colors`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`border-t ${colors.border} pt-8 text-center text-gray-500 text-sm`}>
          <p>&copy; 2026 SKUT. For Ravers by Ravers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
