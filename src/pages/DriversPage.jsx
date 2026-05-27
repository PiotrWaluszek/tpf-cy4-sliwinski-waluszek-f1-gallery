import { useState } from 'react';
import { Flag } from '../components/Flag';
import { Footer } from '../components/Footer';
import { teams, drivers } from '../data/drivers';

const PORTRAITS = {
  'Max Verstappen':  '/drivers/verstappen.jpg',
  'Lando Norris':    '/drivers/norris.jpg',
  'Charles Leclerc': '/drivers/leclerc.jpg',
  'Lewis Hamilton':  '/drivers/hamilton.jpg',
  'Carlos Sainz':    '/drivers/sainz.jpg',
  'Fernando Alonso': '/drivers/alonso.jpg',
  'George Russell':  '/drivers/russell.jpg',
  'Oscar Piastri':   '/drivers/piastri.jpg',
  'Sergio Pérez':    '/drivers/perez.jpg',
};

const DriverModal = ({ driver, onClose }) => {
  const team = teams[driver.teamIdx];
  const portrait = PORTRAITS[driver.name];
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', borderRadius: 16, maxWidth: 560, width: '100%', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ background: '#1F1F27', display: 'flex', alignItems: 'center', gap: 24, padding: '28px 32px', position: 'relative' }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }}>
            {portrait
              ? <img src={portrait} alt={driver.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} onError={e => { e.target.style.display = 'none'; }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: team.color }}>{driver.number}</div>
            }
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Flag a={driver.flagA} b={driver.flagB} c={driver.flagC} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{driver.nat}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{driver.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: team.color }} />
              {team.name} · #{driver.number}
            </div>
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, color: team.color, opacity: 0.25, position: 'absolute', right: 28, top: 16, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.04em' }}>{driver.number}</div>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, borderBottom: '1px solid var(--border)' }}>
          {[['Points', driver.points], ['Wins', driver.wins], ['Podiums', driver.podiums]].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{v}</div>
            </div>
          ))}
        </div>
        {driver.bio && (
          <div style={{ padding: '20px 32px 28px' }}>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{driver.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DriverCard = ({ driver, onClick }) => {
  const team = teams[driver.teamIdx];
  const portrait = PORTRAITS[driver.name];
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(driver)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg)', borderRadius: 12, overflow: 'hidden',
        border: '1px solid var(--border)', cursor: 'pointer',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'all .2s',
      }}
    >
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#1F1F27' }}>
        {portrait
          ? <img src={portrait} alt={driver.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} onError={e => { e.target.style.display = 'none'; }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(135deg,#1a1a20 0 14px,#24242c 14px 28px)' }} />
        }
        <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 44, fontWeight: 800, color: team.color, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>{driver.number}</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'absolute', bottom: 10, left: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Flag a={driver.flagA} b={driver.flagB} c={driver.flagC} />
        </div>
      </div>
      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: team.color }} />
          {team.name}
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--fg)', marginBottom: 12, letterSpacing: '-0.01em' }}>{driver.name}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[['Pts', driver.points], ['W', driver.wins], ['P', driver.podiums]].map(([l, v]) => (
            <div key={l} style={{ textAlign: 'center', padding: '8px 4px', background: 'var(--alt-bg)', borderRadius: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DriversPage = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const teamFilters = ['all', ...new Set(drivers.map(d => teams[d.teamIdx].name))];
  const filtered = filter === 'all' ? drivers : drivers.filter(d => teams[d.teamIdx].name === filter);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {selected && <DriverModal driver={selected} onClose={() => setSelected(null)} />}

      <div style={{ padding: '72px 32px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
          2026 Season
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 14 }}>Kierowcy</div>
        <div style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, lineHeight: 1.5 }}>
          Pełne profile wszystkich 20 kierowców startujących w sezonie 2026.
        </div>
      </div>

      <div style={{ padding: '0 32px 32px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {teamFilters.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              style={{
                padding: '8px 16px', borderRadius: 999, border: '1px solid var(--border)',
                background: filter === t ? 'var(--fg)' : 'transparent',
                color: filter === t ? 'var(--bg)' : 'var(--muted)',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
              }}
            >{t === 'all' ? 'Wszyscy' : t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 32px 96px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {filtered.map(d => (
            <DriverCard key={d.name} driver={d} onClick={setSelected} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
