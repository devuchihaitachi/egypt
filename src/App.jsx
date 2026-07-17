import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { NavigationProvider, useNavigation } from './components/Router';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pyramids from './pages/Pyramids';
import Monuments from './pages/Monuments';
import Pharaohs from './pages/Pharaohs';
import Gods from './pages/Gods';
import Hieroglyphics from './pages/Hieroglyphics';
import PlanVisit from './pages/PlanVisit';
import Culture from './pages/Culture';
import GEM from './pages/GEM';
import UNESCO from './pages/UNESCO';
import Discoveries from './pages/Discoveries';
import Timeline from './pages/Timeline';

function AppContent() {
  const { transitionDirection } = useNavigation();
  const location = useLocation();

  return (
    <div className="app-shell">
      <Navbar />
      <main
        key={location.pathname}
        className={`page-transition page-transition-${transitionDirection}`}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/pyramids" element={<Pyramids />} />
          <Route path="/monuments" element={<Monuments />} />
          <Route path="/pharaohs" element={<Pharaohs />} />
          <Route path="/gods" element={<Gods />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/gem" element={<GEM />} />
          <Route path="/unesco" element={<UNESCO />} />
          <Route path="/discoveries" element={<Discoveries />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hieroglyphics" element={<Hieroglyphics />} />
          <Route path="/visit" element={<PlanVisit />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}
