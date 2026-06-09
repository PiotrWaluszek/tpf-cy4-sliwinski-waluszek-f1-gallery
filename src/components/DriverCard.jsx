import { Stripe } from './Stripe';

export const DriverCard = ({ name, number, team, teamColor, points, flag }) => (
  <div style={{
    background: 'var(--bg)', borderRadius: 12, overflow: 'hidden',
    border: '1px solid var(--border)',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    transition: 'all .2s',
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
  >
    <div style={{ position: 'relative' }}>
      <Stripe label="driver portrait" h={180} tone="dark" />
      <div style={{ position: 'absolute', top: 10, right: 12, fontSize: 40, fontWeight: 800, color: teamColor, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>{number}</div>
    </div>
    <div style={{ padding: '14px 16px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
        {flag} <span>{team}</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: teamColor, marginLeft: 'auto' }} />
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--fg)', marginBottom: 10 }}>{name}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontVariantNumeric: 'tabular-nums' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{points}</div>
        <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>pts</div>
      </div>
    </div>
  </div>
);
