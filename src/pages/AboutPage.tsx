import { useTheme } from '../context/ThemeContext';
import { Music, Shirt, Zap } from 'lucide-react';

export default function AboutPage() {
  const { theme } = useTheme();

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          accent: 'text-red-500',
          border: 'border-red-500/30',
          bg: 'bg-red-950/20'
        };
      case 'psytrance':
        return {
          accent: 'text-purple-400',
          border: 'border-purple-500/30',
          bg: 'bg-purple-950/20'
        };
      case 'detroit':
        return {
          accent: 'text-blue-400',
          border: 'border-blue-500/30',
          bg: 'bg-blue-950/20'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="mb-6 leading-none logo-container">
            <h1 className={`text-5xl md:text-7xl tracking-wider ${colors.accent} logo-outline`} style={{ fontFamily: 'BoldMoves, "Russo One", sans-serif', letterSpacing: '0.05em', fontWeight: 400 }}>
              SKUT
            </h1>
            <p className={`text-2xl md:text-4xl tracking-wider ${colors.accent} logo-outline`} style={{ fontFamily: 'BoldMoves, "Russo One", sans-serif', letterSpacing: '0.05em', marginTop: '-4px', fontWeight: 400 }}>
              APPAREL
            </p>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Born from the underground, crafted for the dance floor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Music, title: 'Music-Driven', text: 'Every design pulses with the rhythm of techno culture' },
            { icon: Shirt, title: 'Premium Quality', text: 'High-end materials meet underground aesthetics' },
            { icon: Zap, title: 'Culture First', text: 'Authentic rave and festival wear for true enthusiasts' }
          ].map((item, idx) => (
            <div key={idx} className={`${colors.bg} backdrop-blur-sm border ${colors.border} rounded-lg p-8 text-center hover:scale-105 transition-transform duration-300 flow-item`}>
              <item.icon className={`w-12 h-12 ${colors.accent} mx-auto mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>

        <div className={`${colors.bg} backdrop-blur-sm border ${colors.border} rounded-lg p-12 flow-item`}>
          <h2 className={`text-3xl font-bold text-white mb-6 ${colors.accent}`}>Our Story</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              SKUT was born in the heart of the underground techno scene, where the beats are heavy,
              the nights are long, and the culture runs deep. We're not just a clothing brand—we're
              a movement that celebrates the raw energy of industrial warehouses, the psychedelic
              journeys of forest raves, and the innovative spirit of Detroit's pioneering sound.
            </p>
            <p>
              Our mission is simple: to create premium apparel that lets you wear your love for techno
              culture with pride. Every piece is designed with the raver in mind, combining cutting-edge
              style with the durability you need to dance until sunrise.
            </p>
            <p>
              From Industrial Techno's mechanical intensity to Psytrance's cosmic transcendence and
              Detroit Techno's futuristic soul, we honor all corners of the electronic underground.
              Choose your vibe, wear the beat, and join the SKUT family.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className={`text-3xl font-bold text-white mb-8 ${colors.accent}`}>
            Join the Movement
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Stay connected with the underground. Get exclusive drops, event updates,
            and insider access to the SKUT community.
          </p>
          <button className={`${colors.accent} border-2 ${colors.border} px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform duration-300 flow-item`}>
            Connect With Us
          </button>
        </div>
      </div>
    </div>
  );
}
