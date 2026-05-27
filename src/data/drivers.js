export const teams = [
  { name: 'Red Bull Racing', color: '#1E3A8A' },
  { name: 'McLaren', color: '#FF8000' },
  { name: 'Ferrari', color: '#DC0000' },
  { name: 'Mercedes', color: '#00A19C' },
  { name: 'Aston Martin', color: '#006F62' },
  { name: 'Alpine', color: '#0090FF' },
  { name: 'Williams', color: '#005AFF' },
  { name: 'Haas', color: '#B6BABD' },
  { name: 'Kick Sauber', color: '#52E252' },
  { name: 'RB', color: '#6692FF' },
];

export const drivers = [
  { pos: 1,  name: 'Max Verstappen',    number: '1',  teamIdx: 0, nat: 'NED', flagA: '#AE1C28', flagB: '#fff', flagC: '#21468B', points: 374, wins: 9,  podiums: 15, bio: 'Reigning four-time World Champion. Dominant force in modern Formula One.' },
  { pos: 2,  name: 'Lando Norris',      number: '4',  teamIdx: 1, nat: 'GBR', flagA: '#012169', flagB: '#fff', flagC: '#C8102E', points: 302, wins: 4,  podiums: 13, bio: 'Charismatic McLaren lead driver with race-winning pace throughout the season.' },
  { pos: 3,  name: 'Oscar Piastri',     number: '81', teamIdx: 1, nat: 'AUS', flagA: '#00008B', flagB: '#fff', flagC: '#FF0000', points: 278, wins: 2,  podiums: 10, bio: 'Quiet but devastatingly quick, the Australian is McLaren\'s rising star.' },
  { pos: 4,  name: 'Charles Leclerc',   number: '16', teamIdx: 2, nat: 'MON', flagA: '#CE1126', flagB: '#fff', flagC: null,       points: 262, wins: 3,  podiums: 11, bio: 'Ferrari\'s talismanic driver — spectacular in Monaco and on street circuits.' },
  { pos: 5,  name: 'Carlos Sainz',      number: '55', teamIdx: 2, nat: 'ESP', flagA: '#AA151B', flagB: '#F1BF00', flagC: '#AA151B', points: 228, wins: 1, podiums: 8,  bio: 'Consistent and clinical, Sainz is among the grid\'s most complete drivers.' },
  { pos: 6,  name: 'George Russell',    number: '63', teamIdx: 3, nat: 'GBR', flagA: '#012169', flagB: '#fff', flagC: '#C8102E', points: 192, wins: 1,  podiums: 5,  bio: 'Mercedes team leader, known for extracting maximum performance in any conditions.' },
  { pos: 7,  name: 'Lewis Hamilton',    number: '44', teamIdx: 3, nat: 'GBR', flagA: '#012169', flagB: '#fff', flagC: '#C8102E', points: 178, wins: 0,  podiums: 4,  bio: 'Seven-time World Champion. One of the greatest drivers in the history of the sport.' },
  { pos: 8,  name: 'Sergio Pérez',      number: '11', teamIdx: 0, nat: 'MEX', flagA: '#006847', flagB: '#fff', flagC: '#CE1126', points: 152, wins: 0,  podiums: 3,  bio: 'Experienced Red Bull number two, known for saving tyres and consistent points finishes.' },
  { pos: 9,  name: 'Fernando Alonso',   number: '14', teamIdx: 4, nat: 'ESP', flagA: '#AA151B', flagB: '#F1BF00', flagC: '#AA151B', points: 92, wins: 0, podiums: 1,  bio: 'Two-time champion still competing at the very top in his forties. Relentless competitor.' },
  { pos: 10, name: 'Lance Stroll',      number: '18', teamIdx: 4, nat: 'CAN', flagA: '#FF0000', flagB: '#fff', flagC: null,       points: 64,  wins: 0,  podiums: 0,  bio: 'Aston Martin\'s consistent scorer, particularly strong in mixed conditions.' },
  { pos: 11, name: 'Pierre Gasly',      number: '10', teamIdx: 5, nat: 'FRA', flagA: '#002654', flagB: '#fff', flagC: '#CE1126', points: 42,  wins: 0,  podiums: 0,  bio: 'Talented Frenchman who scored a surprise Italian GP victory with AlphaTauri in 2020.' },
  { pos: 12, name: 'Esteban Ocon',      number: '31', teamIdx: 5, nat: 'FRA', flagA: '#002654', flagB: '#fff', flagC: '#CE1126', points: 33,  wins: 0,  podiums: 0,  bio: 'Alpine\'s second driver, former Monaco GP winner with a tenacious racing style.' },
  { pos: 13, name: 'Alex Albon',        number: '23', teamIdx: 6, nat: 'THA', flagA: '#A51931', flagB: '#F4F5F8', flagC: '#2D2A4A', points: 28,  wins: 0,  podiums: 0,  bio: 'Williams team leader, beloved by fans and often outperforms the machinery under him.' },
  { pos: 14, name: 'Logan Sargeant',    number: '2',  teamIdx: 6, nat: 'USA', flagA: '#B22234', flagB: '#fff', flagC: '#3C3B6E', points: 8,   wins: 0,  podiums: 0,  bio: 'The American driver pushing hard to make his mark in Formula One.' },
  { pos: 15, name: 'Kevin Magnussen',   number: '20', teamIdx: 7, nat: 'DEN', flagA: '#C60C30', flagB: '#fff', flagC: null,       points: 18,  wins: 0,  podiums: 0,  bio: 'Fan favourite known for hard racing and memorable battles throughout his career.' },
  { pos: 16, name: 'Nico Hülkenberg',   number: '27', teamIdx: 7, nat: 'DEU', flagA: '#000000', flagB: '#DD0000', flagC: '#FFCE00', points: 22,  wins: 0,  podiums: 0,  bio: 'Experienced veteran returning to F1, widely considered one of the fastest drivers without a win.' },
  { pos: 17, name: 'Valtteri Bottas',   number: '77', teamIdx: 8, nat: 'FIN', flagA: '#003580', flagB: '#fff', flagC: '#003580', points: 12,  wins: 0,  podiums: 0,  bio: 'Former Mercedes man now spearheading Kick Sauber\'s development programme.' },
  { pos: 18, name: 'Zhou Guanyu',       number: '24', teamIdx: 8, nat: 'CHN', flagA: '#DE2910', flagB: '#FFDE00', flagC: null,      points: 9,   wins: 0,  podiums: 0,  bio: 'China\'s first F1 driver, steadily building experience at Kick Sauber.' },
  { pos: 19, name: 'Yuki Tsunoda',      number: '22', teamIdx: 9, nat: 'JPN', flagA: '#FFFFFF', flagB: '#BC002D', flagC: null,      points: 31,  wins: 0,  podiums: 0,  bio: 'Rapid Japanese driver known for expressive radio messages and electrifying one-lap pace.' },
  { pos: 20, name: 'Daniel Ricciardo',  number: '3',  teamIdx: 9, nat: 'AUS', flagA: '#00008B', flagB: '#fff', flagC: '#FF0000', points: 14,  wins: 0,  podiums: 0,  bio: 'Eight-time race winner and fan favourite, the Honey Badger is never short of a smile.' },
];

export const wdcStandings = drivers;
