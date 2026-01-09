import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeBackground from './components/ThemeBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import LearnMorePage from './pages/LearnMorePage';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'Shop':
        return <ShopPage />;
      case 'About Us':
        return <AboutPage />;
      case 'Learn More':
        return <LearnMorePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen text-white overflow-x-hidden">
        <ThemeBackground />
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="relative z-10">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
