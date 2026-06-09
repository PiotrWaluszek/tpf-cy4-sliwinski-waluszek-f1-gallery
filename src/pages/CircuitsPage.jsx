import { useState } from 'react';
import { Flag } from '../components/Flag';
import { Footer } from '../components/Footer';
import { circuits } from '../data/circuits';

const CircuitModal = ({ circuit, onClose }) => (
  <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
    <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', borderRadius: 16, maxWidth: 680, width: '100%', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
      <div style={{ background: '#1F1F27', padding: '28px 32px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>×</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Flag code={circuit.natCode} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{circuit.country}</span>
          <span style={{ display: 'inline-flex', padding: '3px 9px', borderRadius: 4, fontSize: 11, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', background: circuit.type === 'Street' ? 'rgba(255,128,0,0.2)' : 'rgba(255,255,255,0.1)', color: circuit.type === 'Street' ? '#FF8000' : 'rgba(255,255,255,0.7)' }}>{circuit.type}</span>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>{circuit.name}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{circuit.location} · Round {circuit.round}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
        <div style={{ padding: '24px 28px' }}>
          {circuit.img && (
            <img src={circuit.img} alt={circuit.name} style={{ width: '100%', height: 200, objectFit: 'contain', marginBottom: 20, background: 'var(--alt-bg)', borderRadius: 8 }}
              onError={e => { e.target.style.display = 'none'; }} />
          )}
          <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{circuit.desc}</p>
        </div>
        <div style={{ padding: '24px 28px', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            ['Długość', circuit.length],
            ['Zakręty', circuit.corners],
            ['Rekord okrążenia', circuit.lapRecord],
            ['Posiadacz rekordu', circuit.lapRecordHolder],
            ['Rok rekordu', circuit.lapRecordYear],
            ['Pierwsze GP', circuit.firstGP],
          ].map(([k, v]) => (
            <div key={k} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 16, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CircuitCard = ({ circuit, onClick }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(circuit)}
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
      <div style={{ height: 160, background: 'var(--alt-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflow: 'hidden' }}>
        {(circuit.f1img || circuit.img)
          ? <img
              src={circuit.f1img || circuit.img}
              alt={circuit.name}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              onError={e => {
                const el = e.currentTarget;
                if (circuit.f1img && circuit.img && el.src.includes('formula1.com')) {
                  el.src = circuit.img;
                } else {
                  el.style.display = 'none';
                  el.parentElement.innerHTML = `<div style="font-size:40px;font-weight:700;color:#ccc">R${circuit.round}</div>`;
                }
              }}
            />
          : <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--border)' }}>R{circuit.round}</div>
        }
      </div>
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Flag code={circuit.natCode} />
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{circuit.country}</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>Rd {circuit.round}</span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', marginBottom: 4, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{circuit.name}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>{circuit.location}</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, padding: '8px 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{circuit.length}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>Długość</div>
          </div>
          <div style={{ flex: 1, padding: '8px 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{circuit.corners}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>Zakręty</div>
          </div>
          <div style={{ flex: 1, padding: '8px 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{circuit.firstGP}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>1. GP</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CircuitsPage = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const types = ['all', 'Permanent', 'Street', 'Street/Park', 'Street/Park'];
  const uniqueTypes = ['all', ...new Set(circuits.map(c => c.type))];
  const filtered = filter === 'all' ? circuits : circuits.filter(c => c.type === filter);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {selected && <CircuitModal circuit={selected} onClose={() => setSelected(null)} />}

      <div style={{ padding: '72px 32px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
          2026 Calendar · {circuits.length} rounds
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 14 }}>Tory wyścigowe</div>
        <div style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, lineHeight: 1.5 }}>
          Wszystkie tory w kalendarzu sezonu 2026 — mapy, rekordy i historia.
        </div>
      </div>

      <div style={{ padding: '0 32px 32px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {uniqueTypes.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              style={{
                padding: '8px 16px', borderRadius: 999, border: '1px solid var(--border)',
                background: filter === t ? 'var(--fg)' : 'transparent',
                color: filter === t ? 'var(--bg)' : 'var(--muted)',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
              }}
            >{t === 'all' ? 'Wszystkie' : t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 32px 96px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
          {filtered.map(c => (
            <CircuitCard key={c.id} circuit={c} onClick={setSelected} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
