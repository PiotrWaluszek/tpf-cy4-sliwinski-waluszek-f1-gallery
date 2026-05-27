import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext(null);

const DEMO_KEY = 'f1_demo_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!auth) {
      const stored = localStorage.getItem(DEMO_KEY);
      setUser(stored ? JSON.parse(stored) : null);
      return;
    }
    const unsub = onAuthStateChanged(auth, u => setUser(u ?? null));
    return unsub;
  }, []);

  const logout = async () => {
    if (!auth) {
      localStorage.removeItem(DEMO_KEY);
      setUser(null);
      return;
    }
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { DEMO_KEY };
