import { Flag } from '../components/Flag';
import { Footer } from '../components/Footer';
import { teams, wdcStandings } from '../data/drivers';

const StandingRow = ({ pos, name, teamIdx, natCode, flagA, flagB, flagC, points, wins, podiums, leader }) => {
  const team = teams[teamIdx];
  const pct = (points / leader) * 100;
  const highlighted = pos === 1;
  return (
    <tr style={{
      borderBottom: '1px solid var(--border)',
      background: highlighted ? 'color-mix(in oklab, var(--accent) 4%, transparent)' : 'transparent',
    }}>
      <td style={{ padding: '18px 20px', width: 60, position: 'relative' }}>
        {highlighted && <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, background: 'var(--accent)', borderRadius: 2 }} />}
        <span style={{ fontSize: 18, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--fg)' }}>{pos}</span>
      </td>
      <td style={{ padding: '18px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Flag code={natCode} />
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>{name}</div>
        </div>
      </td>
      <td style={{ padding: '18px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
          <span style={{ width: 3, height: 16, background: team.color, borderRadius: 1 }} />
          {team.name}
        </div>
      </td>
      <td style={{ padding: '18px 12px', width: 220 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 6, background: 'var(--alt-bg)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: team.color }} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', fontVariantNumeric: 'tabular-nums', minWidth: 36, textAlign: 'right' }}>{points}</div>
        </div>
      </td>
      <td style={{ padding: '18px 12px', fontSize: 14, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', textAlign: 'center' }}>{wins}</td>
      <td style={{ padding: '18px 12px', fontSize: 14, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', textAlign: 'center' }}>{podiums}</td>
      <td style={{ padding: '18px 20px', fontSize: 13, fontVariantNumeric: 'tabular-nums', textAlign: 'right', fontWeight: 500, color: pos === 1 ? 'var(--accent)' : 'var(--muted)' }}>
        {pos === 1 ? '—' : `+${leader - points}`}
      </td>
    </tr>
  );
};

export const Standings = () => {
  const leader = wdcStandings[0].points;
  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: 'var(--bg)', color: 'var(--fg)' }}>

      {/* Page header */}
      <div style={{ padding: '72px 32px 40px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            2026 Season · Through Round 07
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 14 }}>Championship Standings</div>
          <div style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 640, lineHeight: 1.5 }}>
            The Drivers' and Constructors' tables, updated after every race.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 32px', borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: 56, zIndex: 5 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 40 }}>
            {[
              { k: 'WDC', l: "Drivers' Championship", active: true },
              { k: 'WCC', l: "Constructors' Championship", active: false },
            ].map(t => (
              <div key={t.k} style={{ padding: '20px 0', borderBottom: t.active ? '2px solid var(--accent)' : '2px solid transparent', marginBottom: -1 }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{t.k}</div>
                <div style={{ fontSize: 16, fontWeight: t.active ? 600 : 500, color: t.active ? 'var(--fg)' : 'var(--muted)' }}>{t.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Season</div>
            <div style={{ padding: '8px 14px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>2026</div>
          </div>
        </div>
      </div>

      {/* Leader strip */}
      <div style={{ padding: '40px 32px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 24 }}>
          {(() => { const d = wdcStandings[0]; const t = teams[d.teamIdx]; const p2 = wdcStandings[1].points; return (
          <div style={{ padding: '28px 32px', borderRadius: 12, background: '#1F1F27', color: '#fff', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: t.color }} />
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>Championship leader</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', background: '#2a2a32', flexShrink: 0 }}>
                <img src={`https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp`} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>{d.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.color }} /> {t.name} · #{d.number}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1 }}>{d.points}</div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>points</div>
              </div>
            </div>
          </div>
          ); })()}
          {[[`+${wdcStandings[0].points - wdcStandings[1].points}`, 'Gap to P2'], [wdcStandings[0].wins, 'Wins this season'], [wdcStandings[0].podiums, 'Podiums']].map(([n, l]) => (
            <div key={l} style={{ padding: 28, borderRadius: 12, background: 'var(--alt-bg)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 10 }}>{l}</div>
              <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{n}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ padding: '0 32px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', background: 'var(--bg)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif' }}>
            <thead>
              <tr style={{ background: 'var(--alt-bg)', borderBottom: '1px solid var(--border)' }}>
                {['Pos', 'Driver', 'Team', 'Points', 'Wins', 'Podiums', 'Gap'].map((h, i) => (
                  <th key={h} scope="col" style={{
                    padding: '14px 20px',
                    textAlign: i === 4 || i === 5 ? 'center' : i === 6 ? 'right' : 'left',
                    fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
                    color: 'var(--muted)', fontWeight: 600,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wdcStandings.map(r => (
                <StandingRow key={r.pos} {...r} leader={leader} />
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ maxWidth: 1200, margin: '20px auto 0', display: 'flex', gap: 24, fontSize: 12, color: 'var(--muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 3, height: 14, background: 'var(--accent)', borderRadius: 2 }} /> Championship leader
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 3, background: 'var(--muted)', borderRadius: 2 }} /> Points relative to leader
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
