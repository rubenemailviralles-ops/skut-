import { useTheme } from '../context/ThemeContext';
import { ThemeType } from '../types';

export default function HeroSection() {
  const { theme, setTheme, gender, setGender } = useTheme();
  const ledClass = theme === 'industrial' ? 'led-light-red' : theme === 'psytrance' ? 'led-light-purple' : 'led-light-blue';

  const themes: { id: ThemeType; name: string; description: string }[] = [
    { id: 'industrial', name: 'Industrial Techno', description: 'Raw warehouse intensity' },
    { id: 'psytrance', name: 'Psytrance', description: 'Psychedelic transcendence' },
    { id: 'detroit', name: 'Detroit Techno', description: 'Futuristic machine soul' },
  ];

  const getThemeButtonStyle = (themeId: ThemeType) => {
    const isActive = theme === themeId;

    const baseStyle = 'px-4 py-3 md:px-8 md:py-6 rounded-lg font-bold text-sm md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm';

    switch (themeId) {
      case 'industrial':
        return `${baseStyle} ${
          isActive
            ? 'bg-red-600/30 border-2 border-red-500 text-red-400 shadow-lg shadow-red-500/50'
            : 'bg-gray-900/50 border-2 border-gray-700 text-gray-400 hover:border-red-500/50 hover:text-red-400'
        }`;
      case 'psytrance':
        return `${baseStyle} ${
          isActive
            ? 'bg-purple-600/30 border-2 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/50'
            : 'bg-gray-900/50 border-2 border-gray-700 text-gray-400 hover:border-purple-500/50 hover:text-purple-300'
        }`;
      case 'detroit':
        return `${baseStyle} ${
          isActive
            ? 'bg-blue-600/30 border-2 border-blue-500 text-blue-300 shadow-lg shadow-blue-500/50'
            : 'bg-gray-900/50 border-2 border-gray-700 text-gray-400 hover:border-blue-500/50 hover:text-blue-300'
        }`;
    }
  };

  const getGenderButtonStyle = (isActive: boolean) => {
    const accentColor = theme === 'industrial' ? 'red' : theme === 'psytrance' ? 'purple' : 'blue';
    return `px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
      isActive
        ? `bg-${accentColor}-600/40 border-2 border-${accentColor}-500 text-${accentColor}-300`
        : 'bg-gray-900/50 border-2 border-gray-700 text-gray-400 hover:border-gray-500'
    }`;
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 md:pt-24 pb-8">
      <div className="text-center mb-6 md:mb-16 animate-fadeIn">
        <div className="mb-4 md:mb-8 leading-none logo-container">
          <h1
            className={`text-5xl md:text-7xl tracking-wider ${theme === 'industrial' ? 'text-red-400' : theme === 'psytrance' ? 'text-purple-300' : 'text-blue-300'} theme-transition logo-outline`}
            style={{ fontFamily: 'BraveGates, BoldMoves, "Russo One", sans-serif', letterSpacing: '0.1em', fontWeight: 400, lineHeight: 0.92 }}
          >
            SKUT
          </h1>
          <p
            className={`text-xl md:text-3xl tracking-wider ${theme === 'industrial' ? 'text-red-400' : theme === 'psytrance' ? 'text-purple-300' : 'text-blue-300'} theme-transition logo-outline`}
            style={{ fontFamily: 'BraveGates, "Audiowide", cursive', letterSpacing: '0.22em', marginTop: '0.2rem', fontWeight: 400, lineHeight: 1.1 }}
          >
            APPAREL
          </p>
        </div>
        <p className={`text-sm md:text-2xl ${theme === 'industrial' ? 'led-light-red' : theme === 'psytrance' ? 'led-light-purple' : 'led-light-blue'}`}>
          FOR RAVERS BY RAVERS
        </p>
      </div>

      <div className="mb-3 md:mb-8 w-full max-w-4xl">
        <h2 className={`text-lg md:text-3xl mb-2 md:mb-6 text-center ${ledClass}`}>
          Select Your Vibe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={getThemeButtonStyle(t.id)}
            >
              <div className="text-center">
                <div className="text-base md:text-xl font-bold mb-1 md:mb-2 leading-tight">{t.name}</div>
                <div className="text-xs md:text-sm opacity-75">{t.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-3 md:mb-8">
        <span className={`text-xs md:text-sm ${ledClass}`}>FILTER:</span>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={() => setGender('male')}
            className={getGenderButtonStyle(gender === 'male')}
          >
            Male
          </button>
          <button
            onClick={() => setGender('female')}
            className={getGenderButtonStyle(gender === 'female')}
          >
            Female
          </button>
        </div>
      </div>

      <div className="mt-1 animate-bounce">
        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
