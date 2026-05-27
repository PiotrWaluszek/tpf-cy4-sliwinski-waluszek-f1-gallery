import { useState } from 'react';
import { Flag } from '../components/Flag';
import { Footer } from '../components/Footer';
import { raceResults, wccStandings } from '../data/results';
import { circuits } from '../data/circuits';

const flagForCountry = name => {
  const map = {
    'Bahrain': ['#CE1126','#fff',null], 'Saudi Arabia': ['#006C35','#fff',null],
    'Australia': ['#00008B','#fff','#FF0000'], 'Japan': ['#fff','#BC002D',null],
    'China': ['#DE2910','#FFDE00',null], 'USA': ['#B22234','#fff','#3C3B6E'],
    'Italy': ['#009246','#fff','#CE2B37'], 'Monaco': ['#CE1126','#fff',null],
    'Canada': ['#FF0000','#fff',null], 'Spain': ['#AA151B','#F1BF00','#AA151B'],
  };
  return map[name] || ['#ccc','#fff',null];
};

const RaceDetailModal = ({ race, onClose }) => {
  const circ = circuits.find(c => c.name.toLowerCase().includes(race.circuit.toLowerCase()) || race.circuit.toLowerCase().includes(c.location.toLowerCase()));
  const [f1, f2, f3] = flagForCountry(circ?.country || '');
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflowY: 'auto' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', borderRadius: 16, maxWidth: 640, width: '100%', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', margin: 'auto' }}>
        <div style={{ background: '#1F1F27', padding: '28px 32px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>×</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Flag a={f1} b={f2} c={f3} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Round {race.round} · {race.date}</span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>{race.name}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{race.circuit}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderBottom: '1px solid var(--border)' }}>
          {[['Zwycięzca', race.winner], ['Czas', race.time], ['Najszybsze okrążenie', race.fastestLap + ' ' + race.fastestLapTime]].map(([l, v]) => (
            <div key={l} style={{ padding: '18px 20px', borderRight: '1px solid var(--border)' }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>{l}</div>
              <div style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--alt-bg)', borderBottom: '1px solid var(--border)' }}>
                {['Poz', 'Kierowca', 'Zespół', 'Czas/Gap', 'Pkt'].map((h, i) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: i > 2 ? 'right' : 'left', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {race.results.map(r => (
                <tr key={r.pos} style={{ borderBottom: '1px solid var(--border)', background: r.pos === 1 ? 'color-mix(in oklab, var(--accent) 4%, transparent)' : 'transparent' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600 }}>{r.pos}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: r.pos <= 3 ? 600 : 400 }}>{r.driver}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{r.team}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{r.time}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, textAlign: 'right', color: r.pts >= 15 ? 'var(--accent)' : 'var(--fg)' }}>{r.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const ResultsPage = () => {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('races');

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {selected && <RaceDetailModal race={selected} onClose={() => setSelected(null)} />}

      <div style={{ padding: '72px 32px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
          2026 Season · Through Round {raceResults.length}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 14 }}>Wyniki</div>
        <div style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, lineHeight: 1.5 }}>
          Wyniki każdego wyścigu i klasyfikacja konstruktorów sezonu 2026.
        </div>
      </div>

      <div style={{ padding: '0 32px', borderBottom: '1px solid var(--border)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 40 }}>
          {[['races', 'Wyniki wyścigów'], ['wcc', 'Konstruktorzy']].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              padding: '18px 0', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 15, fontWeight: tab === k ? 600 : 500,
              color: tab === k ? 'var(--fg)' : 'var(--muted)',
              borderBottom: tab === k ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: -1,
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '40px 32px 96px', maxWidth: 1200, margin: '0 auto' }}>
        {tab === 'races' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {raceResults.map(race => {
              const circ = circuits.find(c => c.name.toLowerCase().includes(race.circuit.toLowerCase()) || race.circuit.toLowerCase().includes(c.location.toLowerCase()));
              const [f1, f2, f3] = flagForCountry(circ?.country || '');
              return (
                <div key={race.round} onClick={() => setSelected(race)}
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 24px', cursor: 'pointer', transition: 'all .2s', display: 'grid', gridTemplateColumns: '60px 1fr auto auto', alignItems: 'center', gap: 20 }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{String(race.round).padStart(2, '0')}</div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', marginTop: 2 }}>Rd</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Flag a={f1} b={f2} c={f3} />
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{race.date}</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 2 }}>{race.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--muted)' }}>{race.circuit}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Zwycięzca</div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{race.winner}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', marginTop: 2 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: race.winnerTeamColor }} />
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{race.winnerTeam}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>Szczegóły →</div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'wcc' && (
          <div style={{ background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--alt-bg)', borderBottom: '1px solid var(--border)' }}>
                  {['Poz', 'Konstruktor', 'Punkty', 'Zwycięstwa'].map((h, i) => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: i > 1 ? 'center' : 'left', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wccStandings.map(t => (
                  <tr key={t.name} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 20px', fontSize: 16, fontWeight: 600 }}>{t.pos}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 3, height: 24, background: t.color, borderRadius: 2 }} />
                        <span style={{ fontSize: 15, fontWeight: 600 }}>{t.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                        <div style={{ flex: 1, maxWidth: 160, height: 6, background: 'var(--alt-bg)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ width: `${(t.points / wccStandings[0].points) * 100}%`, height: '100%', background: t.color }} />
                        </div>
                        <span style={{ fontSize: 16, fontWeight: 700, fontVariantNumeric: 'tabular-nums', minWidth: 40 }}>{t.points}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center', fontSize: 15, fontWeight: 600 }}>{t.wins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
