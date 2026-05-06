import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Circuits', to: '/circuits' },
  { label: 'Drivers', to: '/drivers' },
  { label: 'Results', to: '/results' },
  { label: 'Standings', to: '/standings' },
  { label: 'Gallery', to: '/gallery' },
];

export const Nav = () => {
  const { pathname } = useLocation();

  return (
    <nav style={{
      height: 56, display: 'flex', alignItems: 'center', padding: '0 32px',
      background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em', color: 'var(--fg)', textDecoration: 'none' }}>
        F1 Paddock
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', transform: 'translateY(-2px)' }} />
      </Link>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 32, fontSize: 14 }}>
        {links.map(({ label, to }) => {
          const active = pathname === to;
          return (
            <Link key={to} to={to} style={{
              fontWeight: active ? 600 : 400,
              color: active ? 'var(--fg)' : 'var(--muted)',
              borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
              padding: '18px 0',
              textDecoration: 'none',
            }}>{label}</Link>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--muted)' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/></svg>
      </div>
    </nav>
  );
};
