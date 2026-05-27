import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export const NotFoundPage = () => (
  <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 32px' }}>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <div style={{ fontSize: 140, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: 'var(--border)', marginBottom: 24, fontVariantNumeric: 'tabular-nums' }}>404</div>
        <div style={{ width: 40, height: 4, background: 'var(--accent)', borderRadius: 2, margin: '0 auto 28px' }} />
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 14 }}>Strona nie istnieje</div>
        <div style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 40 }}>
          Wygląda na to, że ta strona opuściła tor — albo nigdy na nim nie była. Sprawdź adres URL lub wróć do głównej trasy.
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px',
            borderRadius: 999, background: 'var(--accent)', color: '#fff',
            fontSize: 15, fontWeight: 600, textDecoration: 'none',
          }}>← Strona główna</Link>
          <Link to="/circuits" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px',
            borderRadius: 999, border: '1px solid var(--border)', color: 'var(--fg)',
            fontSize: 15, fontWeight: 500, textDecoration: 'none',
          }}>Tory wyścigowe</Link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
