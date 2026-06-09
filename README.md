# F1 Paddock — Galeria Formuły 1

Projekt zaliczeniowy z przedmiotu **Techniki Projektowania Frontendowego**  
Politechnika Krakowska, 2026

**Autorzy:** Piotr Waluszek, Krzysztof Śliwiński  
**Deploy:** https://tpf-cy4-sliwinski-waluszek-f1-galle.vercel.app  
**Repozytorium:** https://github.com/PiotrWaluszek/tpf-cy4-sliwinski-waluszek-f1-gallery

---

## Opis projektu

F1 Paddock to aplikacja webowa poświęcona Formule 1, zbudowana w React. Umożliwia przeglądanie kierowców, torów wyścigowych, wyników i klasyfikacji sezonu 2026. Główną funkcją jest galeria zdjęć — zalogowani użytkownicy mogą dodawać i usuwać własne wpisy. Aplikacja jest w pełni responsywna i wdrożona na platformie Vercel.

---

## Zrealizowane wymagania

| Wymaganie | Realizacja | Punkty |
|-----------|-----------|--------|
| Odwzorowanie prototypu | 9 ekranów zgodnych z makietą — układ, nagłówki, karty, menu, formularze | 2 pkt |
| React Router — routing wszystkich ekranów | `BrowserRouter` + `Routes`, każdy ekran ma własną trasę, fallback 404 | 2 pkt |
| Podział na komponenty stron w `/pages` | 9 plików w `src/pages/`, każdy to osobny widok routingu | 1 pkt |
| Reużywalne komponenty UI w `/components` | `Button`, `Nav`, `Footer`, `DriverCard`, `Flag`, `PrivateRoute`, `AnalyticsListener` — każdy przyjmuje props | 2 pkt |
| Stylowanie i czytelność wizualna | Spójny design system F1 (inline styles + CSS variables), brak surowego HTML | 1 pkt |
| Firebase Authentication | Email/Password — logowanie, rejestracja, wylogowanie, chroniona trasa `/profile` | 2 pkt |
| Hotjar / Contentsquare | Inicjalizacja w `App.jsx`, zbiera sesje, metryki wydajności i zachowania użytkowników | 1 pkt |
| Google Analytics 4 | `ReactGA.initialize` + `AnalyticsListener` śledzący każdą zmianę trasy SPA | 1 pkt |
| Deploy aplikacji | Vercel — automatyczny deploy z gałęzi `main`, środowisko produkcyjne | 1 pkt |
| Dokumentacja README | Screenshoty aplikacji, screenshoty GA i Hotjar, opis techniczny | 3 pkt |
| **SUMA** | | **16 pkt** |

---

## Screenshoty aplikacji

### Strona główna (`/`) — hero section
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

### Klasyfikacja kierowców (`/standings`)
![Standings](screeny/Screenshot%202026-06-10%20at%2000.23.07.png)

### Galeria (`/gallery`)
![Gallery](screeny/Screenshot%202026-06-10%20at%2000.23.13.png)

### Logowanie i rejestracja (`/login`)
![Login](screeny/Screenshot%202026-06-10%20at%2000.23.27.png)

---

## Routing

Aplikacja używa `BrowserRouter` z `Routes` z biblioteki `react-router-dom`. Nawigacja między stronami odbywa się bez przeładowania strony. Zaimplementowano fallback `*` dla nieistniejących ścieżek (strona 404).

| Ścieżka | Komponent | Dostępność |
|---------|-----------|-----------|
| `/` | `Home` | publiczna |
| `/login` | `LoginPage` | publiczna |
| `/circuits` | `CircuitsPage` | publiczna |
| `/drivers` | `DriversPage` | publiczna |
| `/results` | `ResultsPage` | publiczna |
| `/standings` | `Standings` | publiczna |
| `/gallery` | `GalleryPage` | publiczna |
| `/profile` | `ProfilePage` | **chroniona** (wymaga logowania) |
| `*` | `NotFoundPage` | fallback 404 |

Trasa `/profile` jest zabezpieczona przez komponent `PrivateRoute`, który sprawdza stan Firebase Auth i przekierowuje niezalogowanych użytkowników na `/login`.

---

## Reużywalne komponenty

Powtarzające się elementy UI zostały wydzielone do folderu `src/components/`. Każdy komponent przyjmuje props i jest używany wielokrotnie w różnych widokach.

| Komponent | Opis | Używany w |
|-----------|------|-----------|
| `Button` | Przycisk z wariantami (`primary`, `outline`) i rozmiarami (`sm`, `lg`), obsługuje `onClick` i routing przez `to` | Home, Gallery, Login, Standings i inne |
| `Nav` | Pasek nawigacyjny z linkami, stanem zalogowania i przyciskiem wylogowania | Wszystkie strony |
| `Footer` | Stopka z informacjami o projekcie | Wszystkie strony |
| `DriverCard` | Karta kierowcy z numerem, flagą, zespołem i statystykami | DriversPage, Home |
| `Flag` | Flaga kraju na podstawie kodu ISO (np. `pl`, `gb`) | DriverCard, CircuitsPage |
| `PrivateRoute` | Wrapper chroniący trasy — przekierowuje na `/login` jeśli brak sesji | App.jsx |
| `AnalyticsListener` | Komponent-hook nasłuchujący zmian lokalizacji i wysyłający pageview do GA | App.jsx |

---

## Stylowanie

Aplikacja stosuje **inline styles z CSS custom properties** (zmienne CSS) jako spójny design system. Zmienne zdefiniowane w `src/index.css`:

- `--bg`, `--fg` — kolory tła i tekstu (obsługa dark/light mode)
- `--accent` — kolor akcentu F1 (czerwony `#E10600`)
- `--border`, `--muted` — pomocnicze kolory

Takie podejście zapewnia spójność wizualną bez zewnętrznych bibliotek CSS i ułatwia motywowanie komponentów.

---

## Firebase Authentication

Konfiguracja w `src/firebase/config.js` z użyciem zmiennych środowiskowych Vite. Globalny stan auth dostępny przez `AuthContext` (`src/context/AuthContext.jsx`).

**Zaimplementowane funkcje:**
- rejestracja nowego konta (Email + hasło)
- logowanie istniejącego konta
- wylogowanie
- nasłuchiwanie stanu sesji (`onAuthStateChanged`)
- ochrona tras przez `PrivateRoute`

### Firebase Console — zarejestrowani użytkownicy
![Firebase Auth](screeny/Screenshot%202026-06-10%20at%2000.21.50.png)

---

## Google Analytics 4

**Measurement ID:** `G-M9YJL63MWH`

Inicjalizacja w `App.jsx` przez `ReactGA.initialize(GA_ID)`. Komponent `AnalyticsListener` w `src/components/AnalyticsListener.jsx` nasłuchuje zmian `location` z `useLocation()` i wysyła zdarzenie `pageview` przy każdej nawigacji — niezbędne w aplikacji SPA, gdzie strona nie przeładowuje się przy zmianie trasy.

**Śledzone zdarzenia (automatyczne GA4):**
- `page_view` — każde przejście między podstronami
- `scroll` — głębokość scrollowania
- `user_engagement` — czas aktywności na stronie
- `first_visit` — pierwsze wejście użytkownika
- `session_start` — rozpoczęcie sesji

### Google Analytics — dane w czasie rzeczywistym (aktywni użytkownicy, page views, zdarzenia)
![Google Analytics Real-time](screeny/Screenshot%202026-06-10%20at%2000.21.38.png)

---

## Hotjar / Contentsquare

**Site ID:** `870048`  
Platforma Hotjar została przejęta przez Contentsquare — integracja odbywa się przez tę samą bibliotekę `@hotjar/browser`, dane zbierane są w panelu Contentsquare.

Inicjalizacja w `App.jsx`:

```js
import Hotjar from '@hotjar/browser';
Hotjar.init(HOTJAR_ID, 6);
```

Narzędzie zbiera:
- **Session Replay** — nagrania pełnych sesji użytkowników
- **Zoning Analysis** — mapy kliknięć i zachowań na poszczególnych strefach strony
- **Core Web Vitals** — metryki wydajności (TTFB, LCP, CLS)
- **Key Performance Metrics** — współczynnik odrzuceń, czas sesji, liczba sesji

### Contentsquare — RUM Core Web Vitals (metryki wydajności)
![Hotjar RUM](screeny/Screenshot%202026-06-10%20at%2000.21.10.png)

### Contentsquare — Key Performance Metrics (sesje, bounce rate)
![Hotjar KPI](screeny/Screenshot%202026-06-10%20at%2000.21.30.png)

---

## Deploy — Vercel

Aplikacja wdrożona na Vercel. Każdy push na gałąź `main` wyzwala automatyczny redeploy. Zmienne środowiskowe skonfigurowane w panelu Vercel (nie w repozytorium — plik `.env` jest w `.gitignore`).

**Adres produkcyjny:** https://tpf-cy4-sliwinski-waluszek-f1-galle.vercel.app

### Vercel — ostatni deployment (status: Ready)
![Vercel Deploy](screeny/Screenshot%202026-06-10%20at%2000.22.22.png)

### Vercel — skonfigurowane zmienne środowiskowe
![Vercel Env Vars](screeny/Screenshot%202026-06-10%20at%2000.22.29.png)

---

## Technologie i biblioteki

| Technologia | Wersja | Zastosowanie |
|-------------|--------|-------------|
| React | 18 | framework UI |
| Vite | 5 | bundler i dev server |
| react-router-dom | v6 | routing SPA |
| firebase | 10 | Authentication |
| react-ga4 | latest | Google Analytics 4 |
| @hotjar/browser | latest | Contentsquare (Hotjar) |
| Vercel | — | hosting, CI/CD |

---

## Struktura projektu

```
src/
├── components/
│   ├── AnalyticsListener.jsx  ← pageview tracking przy zmianie trasy
│   ├── Button.jsx             ← reużywalny przycisk (warianty, rozmiary, routing)
│   ├── DriverCard.jsx         ← karta kierowcy z flagą i statystykami
│   ├── Flag.jsx               ← flaga kraju po kodzie ISO
│   ├── Footer.jsx             ← stopka aplikacji
│   ├── Nav.jsx                ← nawigacja z obsługą stanu auth
│   ├── PrivateRoute.jsx       ← ochrona tras (redirect → /login)
│   └── Stripe.jsx             ← dekoracyjny pasek
├── context/
│   └── AuthContext.jsx        ← globalny kontekst Firebase Auth
├── data/
│   ├── circuits.js            ← dane 22 torów wyścigowych
│   ├── drivers.js             ← dane 22 kierowców sezonu 2026
│   └── results.js             ← wyniki 7 wyścigów + klasyfikacja
├── firebase/
│   └── config.js              ← inicjalizacja Firebase z env vars
└── pages/
    ├── CircuitsPage.jsx       ← /circuits — karty torów z filtrami
    ├── DriversPage.jsx        ← /drivers — grid kierowców z filtrami
    ├── GalleryPage.jsx        ← /gallery — galeria z dodawaniem wpisów
    ├── Home.jsx               ← / — hero, highlights, circuit of the week
    ├── LoginPage.jsx          ← /login — logowanie i rejestracja
    ├── NotFoundPage.jsx       ← /* — strona 404
    ├── ProfilePage.jsx        ← /profile — profil zalogowanego użytkownika
    ├── ResultsPage.jsx        ← /results — wyniki wyścigów i konstruktorzy
    └── Standings.jsx          ← /standings — klasyfikacja WDC
```

---

## Jak uruchomić lokalnie

```bash
git clone https://github.com/PiotrWaluszek/tpf-cy4-sliwinski-waluszek-f1-gallery.git
cd tpf-cy4-sliwinski-waluszek-f1-gallery
npm install
```

Utwórz plik `.env` w katalogu głównym projektu:

```env
VITE_FIREBASE_API_KEY=twój-klucz
VITE_FIREBASE_AUTH_DOMAIN=projekt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=projekt-id
VITE_FIREBASE_STORAGE_BUCKET=projekt.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_HOTJAR_SITE_ID=870048
VITE_GA_MEASUREMENT_ID=G-M9YJL63MWH
```

```bash
npm run dev
```

Aplikacja dostępna pod adresem: http://localhost:5173
