import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const initial = user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <nav style={{
      height: 56, display: 'flex', alignItems: 'center', padding: '0 32px',
      background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontWeight: 700, fontSize: 17, letterSpacing: '-0.01em', color: 'var(--fg)', textDecoration: 'none', flexShrink: 0 }}>
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
              whiteSpace: 'nowrap',
            }}>{label}</Link>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '6px 10px', borderRadius: 8, transition: 'background .15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--alt-bg)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
            >
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>{initial}</div>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg)', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.displayName || user.email?.split('@')[0]}
              </span>
            </button>
            {menuOpen && (
              <>
                <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 10 }} />
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', minWidth: 180, overflow: 'hidden', zIndex: 11 }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Zalogowany jako</div>
                    <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                  </div>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '11px 16px', fontSize: 14, color: 'var(--fg)', textDecoration: 'none', transition: 'background .1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--alt-bg)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                    Mój profil
                  </Link>
                  <Link to="/gallery" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '11px 16px', fontSize: 14, color: 'var(--fg)', textDecoration: 'none', transition: 'background .1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--alt-bg)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                    Moja galeria
                  </Link>
                  <button onClick={() => { setMenuOpen(false); handleLogout(); }} style={{ display: 'block', width: '100%', padding: '11px 16px', fontSize: 14, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', borderTop: '1px solid var(--border)', transition: 'background .1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(225,6,0,0.05)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                    Wyloguj się
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link to="/login" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 18px', borderRadius: 999, background: 'var(--accent)', color: '#fff',
            fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: '-0.01em',
          }}>Zaloguj się</Link>
        )}
      </div>
    </nav>
  );
};
