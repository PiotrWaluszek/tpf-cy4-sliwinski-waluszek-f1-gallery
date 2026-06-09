export const Flag = ({ a = '#E10600', b = '#FFFFFF', c = null, code = null, w = 18, h = 12 }) => {
  if (code) return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      width={w}
      height={h}
      style={{ borderRadius: 1, border: '1px solid rgba(0,0,0,0.08)', verticalAlign: 'middle', flexShrink: 0, objectFit: 'cover', display: 'inline-block' }}
      alt=""
    />
  );
  return (
    <span style={{ display: 'inline-flex', width: w, height: h, border: '1px solid rgba(0,0,0,0.08)', borderRadius: 1, overflow: 'hidden', verticalAlign: 'middle', flexShrink: 0 }}>
      <span style={{ flex: 1, background: a }} />
      <span style={{ flex: 1, background: b }} />
      {c && <span style={{ flex: 1, background: c }} />}
    </span>
  );
};
