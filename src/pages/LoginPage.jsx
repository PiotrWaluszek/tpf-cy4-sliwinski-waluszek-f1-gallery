import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth, DEMO_KEY } from '../context/AuthContext';

const Field = ({ label, type, value, onChange, placeholder }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg)' }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: '11px 14px', borderRadius: 10, border: '1px solid var(--border)',
        fontSize: 15, fontFamily: 'inherit', color: 'var(--fg)', background: 'var(--bg)',
        outline: 'none', transition: 'border-color .15s',
      }}
      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
    />
  </div>
);

export const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!auth) {
      const demoUser = { email, displayName: email.split('@')[0], uid: 'demo-' + Date.now() };
      localStorage.setItem(DEMO_KEY, JSON.stringify(demoUser));
      window.location.reload();
      return;
    }

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err) {
      const messages = {
        'auth/user-not-found': 'Nie znaleziono konta z tym adresem e-mail.',
        'auth/wrong-password': 'Nieprawidłowe hasło.',
        'auth/email-already-in-use': 'Ten adres e-mail jest już zajęty.',
        'auth/weak-password': 'Hasło musi mieć co najmniej 6 znaków.',
        'auth/invalid-email': 'Nieprawidłowy format adresu e-mail.',
        'auth/invalid-credential': 'Nieprawidłowy e-mail lub hasło.',
      };
      setError(messages[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--alt-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, fontWeight: 700, fontSize: 22, color: 'var(--fg)', textDecoration: 'none' }}>
            F1 Paddock
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', transform: 'translateY(-2px)' }} />
          </Link>
          <div style={{ marginTop: 10, fontSize: 14, color: 'var(--muted)' }}>
            {mode === 'login' ? 'Zaloguj się, by zarządzać galerią' : 'Utwórz nowe konto'}
          </div>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--bg)', borderRadius: 16, border: '1px solid var(--border)', padding: '36px 32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {/* Mode tabs */}
          <div style={{ display: 'flex', marginBottom: 28, background: 'var(--alt-bg)', borderRadius: 10, padding: 4, gap: 4 }}>
            {[['login', 'Logowanie'], ['register', 'Rejestracja']].map(([m, l]) => (
              <button key={m} onClick={() => { setMode(m); setError(''); }}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 500, transition: 'all .15s',
                  background: mode === m ? 'var(--bg)' : 'transparent',
                  color: mode === m ? 'var(--fg)' : 'var(--muted)',
                  boxShadow: mode === m ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
                }}
              >{l}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Field label="Adres e-mail" type="email" value={email} onChange={setEmail} placeholder="twoj@email.com" />
            <Field label="Hasło" type="password" value={password} onChange={setPassword} placeholder={mode === 'register' ? 'Minimum 6 znaków' : '••••••••'} />

            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(225,6,0,0.08)', border: '1px solid rgba(225,6,0,0.2)', fontSize: 13, color: 'var(--accent)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{
                padding: '13px', borderRadius: 999, border: 'none', cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                background: 'var(--accent)', color: '#fff', fontSize: 15, fontWeight: 600,
                fontFamily: 'inherit', opacity: loading || !email || !password ? 0.6 : 1,
                transition: 'opacity .15s', marginTop: 4,
              }}
            >
              {loading ? 'Proszę czekać…' : mode === 'login' ? 'Zaloguj się' : 'Utwórz konto'}
            </button>
          </form>

          {!auth && (
            <div style={{ marginTop: 20, padding: '10px 14px', borderRadius: 8, background: 'rgba(255,128,0,0.08)', border: '1px solid rgba(255,128,0,0.2)', fontSize: 12, color: '#c45a00', lineHeight: 1.5 }}>
              Tryb demo — Firebase nie jest skonfigurowane. Wypełnij plik <code>.env</code> danymi z Firebase Console, by włączyć prawdziwe logowanie.
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
          <Link to="/" style={{ color: 'var(--accent)', fontWeight: 500 }}>← Wróć na stronę główną</Link>
        </div>
      </div>
    </div>
  );
};
