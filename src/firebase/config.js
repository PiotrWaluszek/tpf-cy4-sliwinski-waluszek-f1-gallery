import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

export const isFirebaseConfigured =
  apiKey && apiKey !== 'PLACEHOLDER' &&
  projectId && projectId !== 'PLACEHOLDER';

let auth = null;

if (isFirebaseConfigured) {
  try {
    const app = initializeApp({
      apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    });
    auth = getAuth(app);
  } catch (e) {
    console.warn('Firebase init failed:', e.message);
  }
} else {
  console.info('Firebase not configured — running in demo mode. Fill in .env to enable real auth.');
}

export { auth };
