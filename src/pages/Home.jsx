import { Link } from 'react-router-dom';
import { Stripe } from '../components/Stripe';
import { Flag } from '../components/Flag';
import { DriverCard } from '../components/DriverCard';
import { Footer } from '../components/Footer';

const Button = ({ children, variant = 'primary', size = 'md', to }) => {
  const pad = size === 'lg' ? '14px 28px' : '12px 22px';
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    borderRadius: 999, padding: pad,
    fontSize: size === 'lg' ? 15 : 14, fontWeight: 500, letterSpacing: '-0.01em',
    cursor: 'pointer', border: '1px solid transparent',
    textDecoration: 'none',
  };
  const style = variant === 'primary'
    ? { ...base, background: 'var(--accent)', color: '#fff' }
    : { ...base, background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.6)' };
  return <Link to={to || '/'} style={style}>{children}</Link>;
};

const spotlightDrivers = [
  { name: 'M. Verstappen', number: '1',  team: 'Red Bull',  teamColor: '#1E3A8A', points: '374', flag: <Flag a="#AE1C28" b="#fff" c="#21468B" /> },
  { name: 'L. Norris',     number: '4',  team: 'McLaren',   teamColor: '#FF8000', points: '302', flag: <Flag a="#012169" b="#fff" c="#C8102E" /> },
  { name: 'C. Leclerc',    number: '16', team: 'Ferrari',   teamColor: '#DC0000', points: '278', flag: <Flag a="#CE1126" b="#fff" /> },
  { name: 'O. Piastri',    number: '81', team: 'McLaren',   teamColor: '#FF8000', points: '245', flag: <Flag a="#00008B" b="#fff" c="#FF0000" /> },
  { name: 'G. Russell',    number: '63', team: 'Mercedes',  teamColor: '#00A19C', points: '192', flag: <Flag a="#012169" b="#fff" c="#C8102E" /> },
];

export const Home = () => (
  <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: 'var(--bg)', color: 'var(--fg)' }}>

    {/* Hero */}
    <div style={{ position: 'relative', height: 640, overflow: 'hidden' }}>
      <img src="/hero.jpg" alt="Formula One race start" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(31,31,39,0.2) 0%, rgba(31,31,39,0.85) 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '140px 32px 0', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', marginBottom: 20 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
          2026 Season · Round 07
        </div>
        <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 20, maxWidth: 900 }}>
          Everything <span style={{ color: 'var(--accent)' }}>Formula One.</span>
        </div>
        <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.75)', maxWidth: 560, lineHeight: 1.5, marginBottom: 36 }}>
          A reference for every circuit, every driver, every result — all season long.
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <Button variant="primary" size="lg" to="/circuits">Browse Circuits →</Button>
          <Button variant="darkOutline" size="lg" to="/standings">See Standings</Button>
        </div>
      </div>
    </div>

    {/* Season Highlights */}
    <div style={{ padding: '96px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 8 }}>This week</div>
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em' }}>Current Season Highlights</div>
          </div>
          <Link to="/results" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>View all races →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {/* Next race */}
          <div style={{ padding: 28, borderRadius: 12, background: 'var(--alt-bg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 16 }}>Next race</div>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 4 }}>Canadian Grand Prix</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Flag a="#fff" b="#FF0000" c="#fff" /> Circuit Gilles Villeneuve · Montréal
            </div>
            <div style={{ display: 'flex', gap: 18, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
              {[['08', 'Jun'], ['15:00', 'CET'], ['R08', 'Round']].map(([a, b]) => (
                <div key={a}>
                  <div style={{ fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{a}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{b}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest winner */}
          <div style={{ borderRadius: 12, background: '#1F1F27', color: '#fff', overflow: 'hidden' }}>
            <Stripe label="winner photo" h={180} tone="dark" />
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>Latest winner · Monaco GP</div>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 6 }}>Charles Leclerc</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#DC0000' }} /> Ferrari · 2:23:15.554
              </div>
            </div>
          </div>

          {/* WDC leader */}
          <div style={{ padding: 28, borderRadius: 12, background: 'var(--bg)', border: '1px solid var(--border)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)', borderRadius: '12px 12px 0 0' }} />
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 16 }}>WDC leader</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em' }}>Max Verstappen</div>
              <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 600 }}>#1</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1E3A8A' }} /> Red Bull Racing
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontVariantNumeric: 'tabular-nums' }}>
              <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--accent)' }}>374</div>
              <div style={{ fontSize: 14, color: 'var(--muted)' }}>pts · +72 ahead</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Circuit of the Week */}
    <div style={{ padding: '96px 32px', background: 'var(--alt-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 8 }}>Featured · Week 07</div>
        <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 40 }}>Circuit of the Week</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', background: 'var(--bg)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <Stripe label="circuit aerial · Monaco" h={420} tone="dark" />
          <div style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Flag a="#CE1126" b="#fff" />
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>Monaco</span>
              <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 4, fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'rgba(255,128,0,0.14)', color: '#c45a00' }}>Street Circuit</span>
            </div>
            <div style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 12 }}>Circuit de Monaco</div>
            <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 32 }}>
              The crown jewel of the calendar — a ribbon of tarmac threaded through the principality since 1929.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px', marginBottom: 32 }}>
              {[['Length', '3.337 km'], ['Corners', '19'], ['Lap Record', '1:12.909'], ['First GP', '1950']].map(([k, v]) => (
                <div key={k} style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{k}</div>
                  <div style={{ fontSize: 17, fontWeight: 500, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{v}</div>
                </div>
              ))}
            </div>
            <Link to="/circuits" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>See full circuit →</Link>
          </div>
        </div>
      </div>
    </div>

    {/* Drivers Spotlight */}
    <div style={{ padding: '96px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 8 }}>Spotlight</div>
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em' }}>Drivers to Watch</div>
          </div>
          <Link to="/drivers" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>All drivers →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
          {spotlightDrivers.map(d => (
            <DriverCard key={d.name} {...d} />
          ))}
        </div>
      </div>
    </div>

    {/* Quick Stats */}
    <div style={{ background: '#1F1F27', color: '#fff', padding: '64px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {[['20', 'Races'], ['10', 'Teams'], ['24', 'Circuits'], ['75', 'Years of history']].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--accent)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 8 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>

    <Footer />
  </div>
);
