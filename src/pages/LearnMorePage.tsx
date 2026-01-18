import { useTheme } from '../context/ThemeContext';
import { Brain, Globe, Sparkles } from 'lucide-react';

export default function LearnMorePage() {
  const { theme } = useTheme();

  const getThemeColors = () => {
    switch (theme) {
      case 'industrial':
        return {
          accent: 'text-red-500',
          border: 'border-red-500/30',
          bg: 'bg-red-950/20',
          gradient: 'from-red-950/40 to-transparent'
        };
      case 'psytrance':
        return {
          accent: 'text-purple-400',
          border: 'border-purple-500/30',
          bg: 'bg-purple-950/20',
          gradient: 'from-purple-950/40 to-transparent'
        };
      case 'detroit':
        return {
          accent: 'text-blue-400',
          border: 'border-blue-500/30',
          bg: 'bg-blue-950/20',
          gradient: 'from-blue-950/40 to-transparent'
        };
    }
  };

  const colors = getThemeColors();

  const genres = [
    {
      name: 'Industrial Techno',
      icon: Sparkles,
      description: 'Raw, mechanical, and relentless. Born in the warehouses of Berlin.',
      characteristics: [
        'Heavy, distorted kicks and aggressive basslines',
        'Dark, atmospheric soundscapes',
        'Influenced by EBM and industrial music',
        'BPM: 130-150'
      ],
      artists: 'Surgeon, Regis, Ancient Methods, Perc',
      vibe: 'Underground warehouse raves with intense strobes and fog'
    },
    {
      name: 'Psytrance',
      icon: Brain,
      description: 'Psychedelic, hypnotic, and transcendent. A sonic journey through consciousness.',
      characteristics: [
        'Complex layered melodies and arpeggios',
        'Rolling basslines and organic textures',
        'Influenced by Goa trance and psychedelic culture',
        'BPM: 135-150'
      ],
      artists: 'Infected Mushroom, Astrix, Vini Vici, Shpongle',
      vibe: 'Forest festivals with UV decorations and spiritual energy'
    },
    {
      name: 'Detroit Techno',
      icon: Globe,
      description: 'Futuristic, soulful, and innovative. The original sound of techno.',
      characteristics: [
        'Warm synthesizers and emotional strings',
        'Funky, syncopated rhythms',
        'Influenced by funk, electro, and Chicago house',
        'BPM: 120-135'
      ],
      artists: 'Juan Atkins, Derrick May, Kevin Saunderson, Carl Craig',
      vibe: 'Intimate clubs with hi-tech soul and Afrofuturistic vision'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 flow-item">
          <h1 className={`text-5xl md:text-7xl font-black text-white mb-6 ${colors.accent}`}>
            The Culture
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore the sounds and scenes that inspire every thread we weave
          </p>
        </div>

        <div className="space-y-12">
          {genres.map((genre, idx) => (
            <div
              key={idx}
              className={`${colors.bg} backdrop-blur-sm border ${colors.border} rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 flow-item`}
            >
              <div className={`bg-gradient-to-r ${colors.gradient} p-8 md:p-12`}>
                <div className="flex items-center mb-4">
                  <genre.icon className={`w-10 h-10 ${colors.accent} mr-4`} />
                  <h2 className={`text-3xl md:text-4xl font-bold text-white ${colors.accent}`}>
                    {genre.name}
                  </h2>
                </div>
                <p className="text-gray-300 text-lg mb-6">{genre.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-white font-bold mb-3">Characteristics</h3>
                    <ul className="space-y-2">
                      {genre.characteristics.map((char, charIdx) => (
                        <li key={charIdx} className="text-gray-400 flex items-start">
                          <span className={`${colors.accent} mr-2`}>•</span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-white font-bold mb-3">Key Artists</h3>
                    <p className="text-gray-400 mb-4">{genre.artists}</p>

                    <h3 className="text-white font-bold mb-3">The Vibe</h3>
                    <p className="text-gray-400">{genre.vibe}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-lg p-12 text-center flow-item`}>
          <h2 className={`text-3xl font-bold text-white mb-6 ${colors.accent}`}>
            Experience the Sound
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our website transforms with each theme, immersing you in the visual language
            of these iconic techno subgenres. Switch between themes to feel the essence
            of each culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`${colors.accent} border-2 ${colors.border} px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform duration-300`}>
              Explore Collections
            </button>
            <button className="text-white border-2 border-gray-700 px-8 py-4 rounded-lg font-bold hover:border-gray-500 transition-colors duration-300">
              Join Our Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
