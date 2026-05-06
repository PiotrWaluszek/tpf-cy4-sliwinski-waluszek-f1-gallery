export const Stripe = ({ label = 'image', h = 200, tone = 'dark', style = {} }) => (
  <div style={{
    position: 'relative', width: '100%', height: h,
    background: tone === 'dark'
      ? 'repeating-linear-gradient(135deg, #1a1a20 0 14px, #24242c 14px 28px)'
      : 'repeating-linear-gradient(135deg, #ececee 0 14px, #f5f5f7 14px 28px)',
    color: tone === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
    flexShrink: 0,
    ...style,
  }}>
    <span style={{ padding: '4px 10px', background: tone === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)', borderRadius: 2 }}>{label}</span>
  </div>
);
