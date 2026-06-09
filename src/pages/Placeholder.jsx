import { Footer } from '../components/Footer';

export const Placeholder = ({ title, description }) => (
  <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: 'var(--bg)', color: 'var(--fg)', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 32px' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 16 }}>Coming soon</div>
        <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>{title}</div>
        <div style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.6 }}>{description}</div>
      </div>
    </div>
    <Footer />
  </div>
);
