import { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

const STORAGE_KEY = 'f1_gallery_entries';

const DEFAULT_ENTRIES = [
  {
    id: 1,
    title: 'Monaco Grand Prix 2026 — Start',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/2019_Chinese_Grand_Prix_race_start.jpg/1200px-2019_Chinese_Grand_Prix_race_start.jpg',
    category: 'race',
    description: 'Dramatyczny start na ciasnych ulicach Monako — każdy centymetr toru jest na wagę złota.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-05-25',
  },
  {
    id: 2,
    title: 'Pit Stop McLaren — 2 Sekundy',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/McLaren_F1_pit_stop.jpg/1200px-McLaren_F1_pit_stop.jpg',
    category: 'paddock',
    description: 'Perfekcyjnie zsynchronizowana ekipa McLarena wykonuje zmianę opon w ciągu zaledwie dwóch sekund.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-05-10',
  },
  {
    id: 3,
    title: 'Circuit de Spa-Francorchamps z lotu ptaka',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Spa-Francorchamps_of_Belgium.svg/1200px-Spa-Francorchamps_of_Belgium.svg.png',
    category: 'circuit',
    description: 'Legendarny tor w Ardenach — zielone wzgórza, lasy i jeden z najpiękniejszych układów torów na świecie.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-04-15',
  },
  {
    id: 4,
    title: 'Kimi Antonelli — Mistrz 2026',
    imageUrl: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mercedes/andant01/2026mercedesandant01right.webp',
    category: 'driver',
    description: 'Kimi Antonelli — 18-letnia sensacja Mercedes prowadząca klasyfikację generalną 2026 z pięcioma kolejnymi zwycięstwami.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-05-25',
  },
  {
    id: 5,
    title: 'Lewis Hamilton — Ferrari 2026',
    imageUrl: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/ferrari/lewham01/2026ferrarilewham01right.webp',
    category: 'driver',
    description: 'Siedmiokrotny mistrz świata w czerwonym kombinezonie. Hamilton wygrał Grand Prix Arabii Saudyjskiej 2026 i prowadzi klasyfikację Ferrari.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-03-16',
  },
  {
    id: 6,
    title: 'Monza — Świątynia Prędkości',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Monza_track_map.svg/1200px-Monza_track_map.svg.png',
    category: 'circuit',
    description: 'Autodromo Nazionale Monza — najszybszy tor w kalendarzu Formuły 1, otoczony lasem parkowym.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-01-14',
  },
  {
    id: 7,
    title: 'Podium Australii 2026 — Antonelli, Russell, Hamilton',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/2013_British_Grand_Prix_Podium.jpg/1200px-2013_British_Grand_Prix_Podium.jpg',
    category: 'race',
    description: 'Podwójne podium Mercedes — Antonelli wygrywa, Russell drugi, Hamilton trzeci. Dominacja srebrnych strzał.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-03-30',
  },
  {
    id: 8,
    title: 'George Russell — Kwalifikacje Monaco',
    imageUrl: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mercedes/georus01/2026mercedesgeorus01right.webp',
    category: 'driver',
    description: 'George Russell w kwalifikacjach do Grand Prix Monako — tor, na którym milimetry decydują o pozycji na starcie.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-05-24',
  },
  {
    id: 9,
    title: 'Silverstone Circuit — Mapa Toru',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Silverstone_Circuit_2010.svg/1200px-Silverstone_Circuit_2010.svg.png',
    category: 'circuit',
    description: 'Kolebka Mistrzostw Świata F1 — Silverstone od 1950 roku. Copse, Maggotts, Becketts — najszybsze zakręty w motorsporcie.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-01-05',
  },
  {
    id: 10,
    title: 'Lando Norris — Bahrajn 2026 (Zwycięstwo)',
    imageUrl: 'https://media.formula1.com/image/upload/c_lfill,w_440/q_auto/d_common:f1:2026:fallback:driver:2026fallbackdriverright.webp/v1740000001/common/f1/2026/mclaren/lannor01/2026mclarenlannor01right.webp',
    category: 'race',
    description: 'Lando Norris świętuje pierwsze zwycięstwo sezonu 2026 w Bahrajnie — McLaren wraca na szczyt podium.',
    author: 'admin@f1paddock.com',
    createdAt: '2026-03-02',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'race', label: 'Wyścigi' },
  { id: 'driver', label: 'Kierowcy' },
  { id: 'circuit', label: 'Tory' },
  { id: 'paddock', label: 'Paddock' },
];

const catColors = { race: '#E10600', driver: '#FF8000', circuit: '#0090FF', paddock: '#52E252' };

const AddModal = ({ onClose, onAdd }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('race');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !imageUrl) return;
    onAdd({
      id: Date.now(),
      title, imageUrl, category, description,
      author: user?.email || 'anonymous',
      createdAt: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  const inputStyle = {
    padding: '11px 14px', borderRadius: 10, border: '1px solid var(--border)',
    fontSize: 14, fontFamily: 'inherit', color: 'var(--fg)', background: 'var(--bg)',
    outline: 'none', width: '100%',
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', borderRadius: 16, maxWidth: 560, width: '100%', overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Dodaj zdjęcie do galerii</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--muted)' }}>×</button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Tytuł *</label>
            <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="np. Wyścig w Monako 2026" required
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>URL zdjęcia *</label>
            <input style={inputStyle} value={imageUrl} onChange={e => { setImageUrl(e.target.value); setPreview(false); }} placeholder="https://..." required
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
            {imageUrl && (
              <button type="button" onClick={() => setPreview(!preview)} style={{ marginTop: 6, fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                {preview ? 'Ukryj podgląd' : 'Pokaż podgląd'}
              </button>
            )}
            {preview && imageUrl && (
              <img src={imageUrl} alt="preview" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, marginTop: 8 }} onError={e => { e.target.style.display = 'none'; }} />
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Kategoria</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <button key={c.id} type="button" onClick={() => setCategory(c.id)}
                  style={{ padding: '7px 14px', borderRadius: 999, border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, transition: 'all .15s',
                    background: category === c.id ? catColors[c.id] : 'transparent',
                    color: category === c.id ? '#fff' : 'var(--muted)',
                    borderColor: category === c.id ? catColors[c.id] : 'var(--border)',
                  }}>{c.label}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Opis (opcjonalnie)</label>
            <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} value={description} onChange={e => setDescription(e.target.value)} placeholder="Opisz zdjęcie…"
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
          </div>
          <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: 999, border: '1px solid var(--border)', background: 'transparent', color: 'var(--fg)', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Anuluj</button>
            <button type="submit" disabled={!title || !imageUrl}
              style={{ flex: 2, padding: '12px', borderRadius: 999, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: !title || !imageUrl ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: !title || !imageUrl ? 0.6 : 1 }}>
              Dodaj zdjęcie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GalleryCard = ({ entry, onDelete, isOwner }) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const color = catColors[entry.category] || '#888';
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: 'var(--bg)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.04)', transform: hovered ? 'translateY(-4px)' : 'none', transition: 'all .2s', position: 'relative' }}
    >
      <div style={{ height: 220, overflow: 'hidden', background: '#1F1F27', position: 'relative' }}>
        {!imgError
          ? <img src={entry.imageUrl} alt={entry.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s', transform: hovered ? 'scale(1.04)' : 'scale(1)' }} onError={() => setImgError(true)} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-linear-gradient(135deg,#1a1a20 0 14px,#24242c 14px 28px)', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Brak podglądu</div>
        }
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', background: color, color: '#fff' }}>
            {CATEGORIES.find(c => c.id === entry.category)?.label || entry.category}
          </span>
        </div>
      </div>
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg)', marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{entry.title}</div>
        {entry.description && (
          <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{entry.description}</div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{entry.author} · {entry.createdAt}</div>
          {isOwner && (
            <button onClick={() => onDelete(entry.id)}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 12, padding: '4px 8px', borderRadius: 6, transition: 'all .15s' }}
              onMouseEnter={e => { e.target.style.color = 'var(--accent)'; e.target.style.background = 'rgba(225,6,0,0.08)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--muted)'; e.target.style.background = 'none'; }}
            >Usuń</button>
          )}
        </div>
      </div>
    </div>
  );
};

export const GalleryPage = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_ENTRIES;
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = entry => setEntries(prev => [entry, ...prev]);
  const deleteEntry = id => setEntries(prev => prev.filter(e => e.id !== id));

  const filtered = activeCategory === 'all' ? entries : entries.filter(e => e.category === activeCategory);

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {showAdd && <AddModal onClose={() => setShowAdd(false)} onAdd={addEntry} />}

      <div style={{ padding: '72px 32px 40px', maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
        <div>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            F1 Paddock Gallery
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 14 }}>Galeria</div>
          <div style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, lineHeight: 1.5 }}>
            Zdjęcia z wyścigów, kierowców i torów — dodane przez społeczność.
          </div>
        </div>
        <div>
          {user
            ? (
              <Button variant="primary" size="lg" onClick={() => setShowAdd(true)}>
                + Dodaj zdjęcie
              </Button>
            )
            : (
              <Button variant="outline" size="lg" to="/login">
                Zaloguj się, by dodać
              </Button>
            )
          }
        </div>
      </div>

      <div style={{ padding: '0 32px 32px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '8px 16px', borderRadius: 999, border: '1px solid var(--border)',
                background: activeCategory === cat.id ? 'var(--fg)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--bg)' : 'var(--muted)',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
              }}
            >{cat.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 32px 96px', maxWidth: 1200, margin: '0 auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Brak zdjęć w tej kategorii</div>
            {user && <Button variant="primary" onClick={() => setShowAdd(true)}>Dodaj pierwsze zdjęcie</Button>}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map(entry => (
              <GalleryCard
                key={entry.id}
                entry={entry}
                onDelete={deleteEntry}
                isOwner={user && (user.email === entry.author || user.uid?.startsWith('demo'))}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
