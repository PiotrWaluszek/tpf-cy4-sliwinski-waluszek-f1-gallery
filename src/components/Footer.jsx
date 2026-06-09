export const Footer = () => (
  <footer style={{ background: '#16161B', color: '#fff', padding: '56px 32px 32px' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontWeight: 700, fontSize: 20, marginBottom: 10 }}>
        F1 Paddock
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', transform: 'translateY(-3px)' }} />
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', maxWidth: 480, lineHeight: 1.6, marginBottom: 40 }}>
        A one-stop reference for Formula One enthusiasts — circuits, drivers, race results, championship standings.
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
        Student project — Techniki Projektowania Frontendowego, PK 2026
      </div>
    </div>
  </footer>
);
