export const Flag = ({ a = '#E10600', b = '#FFFFFF', c = null, w = 18, h = 12 }) => (
  <span style={{ display: 'inline-flex', width: w, height: h, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 1, overflow: 'hidden', verticalAlign: 'middle', flexShrink: 0 }}>
    <span style={{ flex: 1, background: a }} />
    <span style={{ flex: 1, background: b }} />
    {c && <span style={{ flex: 1, background: c }} />}
  </span>
);
