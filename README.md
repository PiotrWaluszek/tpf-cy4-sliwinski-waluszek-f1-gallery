# F1 Paddock — Galeria Formuły 1

Projekt zaliczeniowy z przedmiotu **Techniki Projektowania Frontendowego**, Politechnika Krakowska, 2026.

Autorzy: Piotr Waluszek, Sliwinski

---

## Screenshoty aplikacji

> **Uwaga:** Zamieść tu screenshoty przed oddaniem. Zrób je uruchamiając `npm run dev`.

| Strona | Opis |
|--------|------|
| `/` | Strona główna — hero, highlights sezonu, tory |
| `/login` | Formularz logowania / rejestracji |
| `/drivers` | Grid wszystkich 20 kierowców z filtrami |
| `/circuits` | Karty torów z mapami (23 tory) |
| `/results` | Wyniki wyścigów + klasyfikacja konstruktorów |
| `/standings` | Klasyfikacja kierowców WDC |
| `/gallery` | Galeria zdjęć — dodawanie i przeglądanie |
| `/profile` | Profil użytkownika (chroniona trasa) |

---

## Jak uruchomić lokalnie

```bash
git clone <repo-url>
cd tpf-cy4-sliwinski-waluszek-f1-gallery
npm install
```

Uzupełnij plik `.env` (skopiuj wartości z Firebase Console i platform analitycznych):

```env
VITE_FIREBASE_API_KEY=twój-klucz
VITE_FIREBASE_AUTH_DOMAIN=projekt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=projekt-id
VITE_FIREBASE_STORAGE_BUCKET=projekt.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

VITE_HOTJAR_SITE_ID=1234567
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

```bash
npm run dev
```

Otwórz [http://localhost:5173](http://localhost:5173)

---

## Konfiguracja Firebase

1. Utwórz projekt na [firebase.google.com](https://console.firebase.google.com)
2. Dodaj aplikację webową → skopiuj config do `.env`
3. Firebase Console → Authentication → Sign-in method → **Email/Password** → Włącz
4. Po deploymencie: Authentication → Settings → Authorized domains → dodaj domenę

---

## Konfiguracja Hotjar

1. Zarejestruj się na [hotjar.com](https://www.hotjar.com)
2. Dodaj nowy site → skopiuj **Site ID** do `VITE_HOTJAR_SITE_ID`

## Konfiguracja Google Analytics

1. Utwórz property w [analytics.google.com](https://analytics.google.com)
2. Admin → Data Streams → Web → skopiuj **Measurement ID** (`G-XXXXXXXXXX`) do `.env`

---

## Deploy (Railway / Vercel / Netlify)

Zalecany: **Vercel** lub **Netlify** — „one-click deploy" obsługują Vite out-of-the-box.

1. Wypchnij kod na GitHub
2. Połącz repo z Vercel/Netlify
3. Ustaw zmienne środowiskowe (te same co w `.env`)
4. Deploy uruchomi się automatycznie

Alternatywnie: [Railway](https://railway.app) — patrz `https://docs.railway.com/guides/react`

---

## Struktura projektu

```
src/
├── components/
│   ├── AnalyticsListener.jsx  ← Google Analytics page tracking
│   ├── Button.jsx             ← Reużywalny przycisk
│   ├── DriverCard.jsx         ← Karta kierowcy
│   ├── Flag.jsx               ← Flaga kraju
│   ├── Footer.jsx             ← Stopka
│   ├── Nav.jsx                ← Nawigacja z auth state
│   ├── PrivateRoute.jsx       ← Chroniona trasa
│   └── Stripe.jsx             ← Placeholder obrazka
├── context/
│   └── AuthContext.jsx        ← Firebase Auth context
├── data/
│   ├── circuits.js            ← 23 tory wyścigowe
│   ├── drivers.js             ← 20 kierowców
│   └── results.js             ← Wyniki 7 wyścigów
├── firebase/
│   └── config.js              ← Konfiguracja Firebase
└── pages/
    ├── CircuitsPage.jsx       ← /circuits
    ├── DriversPage.jsx        ← /drivers
    ├── GalleryPage.jsx        ← /gallery
    ├── Home.jsx               ← /
    ├── LoginPage.jsx          ← /login
    ├── NotFoundPage.jsx       ← /* (404)
    ├── ProfilePage.jsx        ← /profile (protected)
    ├── ResultsPage.jsx        ← /results
    └── Standings.jsx          ← /standings
```

---

## Checklist projektu

- [x] Aplikacja odwzorowuje prototyp (9 ekranów)
- [x] Każdy ekran dostępny przez React Router
- [x] Widoki podzielone na komponenty w `/pages`
- [x] Powtarzające się elementy wydzielone do `/components`
- [x] Aplikacja ostylowana i czytelna wizualnie (design system F1)
- [x] Logowanie Firebase Authentication (Email/Password + rejestracja)
- [x] Chronione trasy (`/profile`)
- [x] Wylogowanie
- [x] Hotjar — integracja w `App.jsx`
- [x] Google Analytics — integracja z `AnalyticsListener`
- [ ] Deploy — patrz sekcja powyżej
- [ ] Screenshoty — do uzupełnienia po deploymencie

---

## Zrzuty ekranu Google Analytics

> Zamieść tutaj screenshoty z panelu GA po skonfigurowaniu i wygenerowaniu ruchu.

## Zrzuty ekranu Hotjar

> Zamieść tutaj screenshoty z heatmap/nagrań Hotjar.
