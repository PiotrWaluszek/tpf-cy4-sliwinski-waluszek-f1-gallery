# F1 Paddock — Galeria Formuły 1

Projekt zaliczeniowy z przedmiotu **Techniki Projektowania Frontendowego**, Politechnika Krakowska, 2026.

**Autorzy:** Piotr Waluszek, Śliwiński

**Deploy:** https://tpf-cy4-sliwinski-waluszek-f1-galle.vercel.app

---

## Zrealizowane wymagania

| Wymaganie | Status |
|-----------|--------|
| Odwzorowanie prototypu (9 ekranów) | ✅ |
| Każdy ekran dostępny przez React Router | ✅ |
| Widoki podzielone na komponenty w `/pages` | ✅ |
| Powtarzające się elementy wydzielone do `/components` | ✅ |
| Aplikacja ostylowana i czytelna wizualnie | ✅ |
| Logowanie Firebase Authentication (Email/Password) | ✅ |
| Chroniona trasa `/profile` | ✅ |
| Hotjar / Contentsquare — analiza zachowań użytkowników | ✅ |
| Google Analytics — śledzenie odsłon i zdarzeń | ✅ |
| Deploy na Vercel | ✅ |

---

## Screenshoty aplikacji

### Strona główna (`/`)
![Home](screeny/Screenshot%202026-06-10%20at%2000.22.41.png)

### Strona główna — Circuit of the Week
![Home Circuit](screeny/Screenshot%202026-06-10%20at%2000.22.46.png)

### Strona główna — Drivers to Watch
![Home Drivers](screeny/Screenshot%202026-06-10%20at%2000.22.49.png)

### Tory wyścigowe (`/circuits`)
![Circuits](screeny/Screenshot%202026-06-10%20at%2000.22.57.png)

### Kierowcy (`/drivers`)
![Drivers](screeny/Screenshot%202026-06-10%20at%2000.23.01.png)

### Wyniki (`/results`)
![Results](screeny/Screenshot%202026-06-10%20at%2000.23.03.png)

### Klasyfikacja (`/standings`)
![Standings](screeny/Screenshot%202026-06-10%20at%2000.23.07.png)

### Galeria (`/gallery`)
![Gallery](screeny/Screenshot%202026-06-10%20at%2000.23.13.png)

### Logowanie (`/login`)
![Login](screeny/Screenshot%202026-06-10%20at%2000.23.27.png)

---

## Google Analytics

Aplikacja integruje Google Analytics 4 (Measurement ID: `G-M9YJL63MWH`) z śledzeniem odsłon przy każdej zmianie trasy w React Router za pomocą komponentu `AnalyticsListener`.

### Panel Google Analytics — dane w czasie rzeczywistym
![Google Analytics Real-time](screeny/Screenshot%202026-06-10%20at%2000.21.38.png)

---

## Hotjar / Contentsquare

Aplikacja integruje Contentsquare (dawny Hotjar, Site ID: `870048`) inicjalizowany w `App.jsx`. Narzędzie zbiera dane o zachowaniach użytkowników: nagrania sesji, mapy ciepła oraz metryki wydajności.

### Contentsquare — RUM Core Web Vitals
![Hotjar RUM](screeny/Screenshot%202026-06-10%20at%2000.21.10.png)

### Contentsquare — Key Performance Metrics
![Hotjar KPI](screeny/Screenshot%202026-06-10%20at%2000.21.30.png)

---

## Firebase Authentication

Logowanie i rejestracja przez Email/Password. Zarejestrowane konta widoczne w Firebase Console.

### Firebase — użytkownicy
![Firebase Auth](screeny/Screenshot%202026-06-10%20at%2000.21.50.png)

---

## Deploy — Vercel

Aplikacja wdrożona na Vercel z automatycznym deployem po każdym pushu na gałąź `main`.

### Vercel — szczegóły deploymentu
![Vercel Deploy](screeny/Screenshot%202026-06-10%20at%2000.22.22.png)

### Vercel — zmienne środowiskowe
![Vercel Env Vars](screeny/Screenshot%202026-06-10%20at%2000.22.29.png)

---

## Technologie

- **React 18** + Vite
- **React Router v6** — routing SPA
- **Firebase Authentication** — logowanie Email/Password
- **react-ga4** — Google Analytics 4
- **@hotjar/browser** — Contentsquare (Hotjar)
- **Vercel** — hosting i CI/CD

---

## Struktura projektu

```
src/
├── components/
│   ├── AnalyticsListener.jsx  ← śledzenie odsłon GA przy zmianie trasy
│   ├── Button.jsx             ← reużywalny przycisk z wariantami
│   ├── DriverCard.jsx         ← karta kierowcy
│   ├── Flag.jsx               ← flaga kraju
│   ├── Footer.jsx             ← stopka
│   ├── Nav.jsx                ← nawigacja z obsługą stanu auth
│   └── PrivateRoute.jsx       ← chroniona trasa (wymaga zalogowania)
├── context/
│   └── AuthContext.jsx        ← kontekst Firebase Auth
├── data/
│   ├── circuits.js            ← 22 tory wyścigowe
│   ├── drivers.js             ← 22 kierowców
│   └── results.js             ← wyniki 7 wyścigów
├── firebase/
│   └── config.js              ← konfiguracja Firebase
└── pages/
    ├── CircuitsPage.jsx       ← /circuits
    ├── DriversPage.jsx        ← /drivers
    ├── GalleryPage.jsx        ← /gallery
    ├── Home.jsx               ← /
    ├── LoginPage.jsx          ← /login
    ├── NotFoundPage.jsx       ← /* (404)
    ├── ProfilePage.jsx        ← /profile (chroniona)
    ├── ResultsPage.jsx        ← /results
    └── Standings.jsx          ← /standings
```

---

## Routing

Wszystkie ekrany dostępne przez React Router bez przeładowania strony:

| Ścieżka | Komponent | Opis |
|---------|-----------|------|
| `/` | `Home` | Strona główna |
| `/login` | `LoginPage` | Logowanie i rejestracja |
| `/circuits` | `CircuitsPage` | Tory wyścigowe |
| `/drivers` | `DriversPage` | Kierowcy |
| `/results` | `ResultsPage` | Wyniki wyścigów |
| `/standings` | `Standings` | Klasyfikacja kierowców |
| `/gallery` | `GalleryPage` | Galeria zdjęć |
| `/profile` | `ProfilePage` | Profil użytkownika (chroniona) |
| `*` | `NotFoundPage` | Strona 404 |

---

## Jak uruchomić lokalnie

```bash
git clone https://github.com/PiotrWaluszek/tpf-cy4-sliwinski-waluszek-f1-gallery.git
cd tpf-cy4-sliwinski-waluszek-f1-gallery
npm install
```

Utwórz plik `.env` i uzupełnij wartości:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_HOTJAR_SITE_ID=870048
VITE_GA_MEASUREMENT_ID=G-M9YJL63MWH
```

```bash
npm run dev
```

Otwórz http://localhost:5173
