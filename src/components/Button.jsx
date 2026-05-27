import { Link } from 'react-router-dom';

const variants = {
  primary: { background: 'var(--accent)', color: '#fff', border: '1px solid transparent' },
  outline:  { background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)' },
  ghost:    { background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border)' },
  dark:     { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.4)' },
  danger:   { background: '#DC2626', color: '#fff', border: '1px solid transparent' },
};

export const Button = ({ children, variant = 'primary', size = 'md', to, onClick, type = 'button', disabled, style }) => {
  const pad = size === 'lg' ? '14px 28px' : size === 'sm' ? '8px 16px' : '11px 22px';
  const fs  = size === 'lg' ? 15 : size === 'sm' ? 13 : 14;
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderRadius: 999, padding: pad, fontSize: fs, fontWeight: 500,
    letterSpacing: '-0.01em', cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none', opacity: disabled ? 0.5 : 1,
    transition: 'opacity .15s, transform .15s',
    fontFamily: 'inherit',
    ...variants[variant],
    ...style,
  };
  if (to) return <Link to={to} style={base}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} style={base}>{children}</button>;
};
