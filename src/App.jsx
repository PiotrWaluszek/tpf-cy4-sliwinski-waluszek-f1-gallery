import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hotjar from '@hotjar/browser';
import ReactGA from 'react-ga4';

import { AuthProvider } from './context/AuthContext';
import { AnalyticsListener } from './components/AnalyticsListener';
import { PrivateRoute } from './components/PrivateRoute';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Standings } from './pages/Standings';
import { LoginPage } from './pages/LoginPage';
import { DriversPage } from './pages/DriversPage';
import { CircuitsPage } from './pages/CircuitsPage';
import { ResultsPage } from './pages/ResultsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import './index.css';

const HOTJAR_ID = Number(import.meta.env.VITE_HOTJAR_SITE_ID) || 0;
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

function App() {
  useEffect(() => {
    if (HOTJAR_ID && HOTJAR_ID !== 0) {
      Hotjar.init(HOTJAR_ID, 6);
    }
    if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
      ReactGA.initialize(GA_ID);
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AnalyticsListener />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/circuits" element={<CircuitsPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
