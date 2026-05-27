import { useState } from 'react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';

const Stat = ({ label, value }) => (
  <div style={{ padding: '20px 24px', background: 'var(--alt-bg)', borderRadius: 12, border: '1px solid var(--border)', textAlign: 'center' }}>
    <div style={{ fontSize: 32, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color: 'var(--fg)' }}>{value}</div>
    <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginTop: 6 }}>{label}</div>
  </div>
);

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('profile');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  const galleryEntries = (() => {
    try {
      const stored = localStorage.getItem('f1_gallery_entries');
      const all = stored ? JSON.parse(stored) : [];
      return all.filter(e => e.author === user?.email);
    } catch { return []; }
  })();

  const handlePwdChange = async e => {
    e.preventDefault();
    setPwdMsg('');
    if (!auth) { setPwdMsg('Zmiana hasła niedostępna w trybie demo.'); return; }
    if (newPwd.length < 6) { setPwdMsg('Hasło musi mieć co najmniej 6 znaków.'); return; }
    setPwdLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPwd);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPwd);
      setPwdMsg('Hasło zostało zmienione pomyślnie.');
      setCurrentPwd('');
      setNewPwd('');
    } catch (err) {
      const msgs = {
        'auth/wrong-password': 'Bieżące hasło jest nieprawidłowe.',
        'auth/requires-recent-login': 'Wyloguj się i zaloguj ponownie, by zmienić hasło.',
      };
      setPwdMsg(msgs[err.code] || 'Nie udało się zmienić hasła.');
    } finally {
      setPwdLoading(false);
    }
  };

  const inputStyle = {
    padding: '11px 14px', borderRadius: 10, border: '1px solid var(--border)',
    fontSize: 14, fontFamily: 'inherit', color: 'var(--fg)', background: 'var(--bg)',
    outline: 'none', width: '100%',
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Użytkownik';
  const initial = displayName[0]?.toUpperCase() || 'U';
  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Demo';

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
      <div style={{ background: '#1F1F27', padding: '80px 32px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{initial}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 4 }}>{displayName}</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>{user?.email}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Konto aktywne · Dołączono {joinDate}</span>
            </div>
          </div>
          <Button variant="dark" onClick={logout} to="/">Wyloguj się</Button>
        </div>
      </div>

      <div style={{ padding: '0 32px', borderBottom: '1px solid var(--border)', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 40 }}>
          {[['profile', 'Profil'], ['security', 'Bezpieczeństwo'], ['gallery', 'Moja galeria']].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              padding: '18px 0', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 15, fontWeight: tab === k ? 600 : 500,
              color: tab === k ? 'var(--fg)' : 'var(--muted)',
              borderBottom: tab === k ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: -1,
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '40px 32px 96px', maxWidth: 900, margin: '0 auto' }}>
        {tab === 'profile' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
              <Stat label="Zdjęcia w galerii" value={galleryEntries.length} />
              <Stat label="Status konta" value="Aktywne" />
              <Stat label="Sezon" value="2026" />
            </div>
            <div style={{ background: 'var(--alt-bg)', borderRadius: 12, border: '1px solid var(--border)', padding: '28px 32px' }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Informacje o koncie</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                  ['Adres e-mail', user?.email || '—'],
                  ['Nazwa użytkownika', displayName],
                  ['Data rejestracji', joinDate],
                  ['Dostawca logowania', auth ? 'Firebase Auth' : 'Demo'],
                ].map(([k, v]) => (
                  <div key={k} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6 }}>{k}</div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'security' && (
          <div style={{ maxWidth: 480 }}>
            <div style={{ background: 'var(--alt-bg)', borderRadius: 12, border: '1px solid var(--border)', padding: '28px 32px' }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Zmień hasło</div>
              <form onSubmit={handlePwdChange} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[['Obecne hasło', currentPwd, setCurrentPwd], ['Nowe hasło', newPwd, setNewPwd]].map(([l, v, set]) => (
                  <div key={l}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{l}</label>
                    <input type="password" value={v} onChange={e => set(e.target.value)} style={inputStyle} placeholder="••••••••"
                      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                  </div>
                ))}
                {pwdMsg && (
                  <div style={{ padding: '10px 14px', borderRadius: 8, background: pwdMsg.includes('pomyślnie') ? 'rgba(34,197,94,0.1)' : 'rgba(225,6,0,0.08)', border: `1px solid ${pwdMsg.includes('pomyślnie') ? 'rgba(34,197,94,0.3)' : 'rgba(225,6,0,0.2)'}`, fontSize: 13, color: pwdMsg.includes('pomyślnie') ? '#16a34a' : 'var(--accent)' }}>
                    {pwdMsg}
                  </div>
                )}
                <button type="submit" disabled={pwdLoading || !currentPwd || !newPwd}
                  style={{ padding: '12px', borderRadius: 999, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', opacity: pwdLoading || !currentPwd || !newPwd ? 0.6 : 1 }}>
                  {pwdLoading ? 'Zmieniam…' : 'Zmień hasło'}
                </button>
              </form>
            </div>
          </div>
        )}

        {tab === 'gallery' && (
          <div>
            <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 28 }}>
              Masz <strong>{galleryEntries.length}</strong> {galleryEntries.length === 1 ? 'zdjęcie' : 'zdjęcia'} w galerii.
            </div>
            {galleryEntries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16 }}>Nie dodałeś jeszcze żadnych zdjęć.</div>
                <Button variant="primary" to="/gallery">Przejdź do galerii</Button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                {galleryEntries.map(e => (
                  <div key={e.id} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img src={e.imageUrl} alt={e.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} onError={i => { i.target.style.display = 'none'; }} />
                    <div style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{e.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{e.createdAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
