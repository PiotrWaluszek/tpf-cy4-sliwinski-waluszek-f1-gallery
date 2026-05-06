import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Standings } from './pages/Standings';
import { Placeholder } from './pages/Placeholder';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/circuits" element={<Placeholder title="Circuits" description="Explore all 24 circuits on the 2026 Formula One calendar — lap records, track maps, and race history." />} />
        <Route path="/drivers" element={<Placeholder title="Drivers" description="Full profiles for all 20 drivers competing in the 2026 season — stats, career history, and results." />} />
        <Route path="/results" element={<Placeholder title="Results" description="Race-by-race results for every round of the 2026 season, including fastest laps and retirements." />} />
        <Route path="/gallery" element={<Placeholder title="Gallery" description="Photo gallery from the 2026 Formula One season — race highlights, paddock shots, and podium moments." />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
