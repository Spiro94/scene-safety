export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const BACKDROP_SIZE = 'w1280';

export const TRIGGER_THRESHOLD = 2;

export function getFetchOptions(method: string = 'GET') {
  return {
    method: method.toUpperCase(),
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };
}

export type Phobia = {
  name: string;
  description: string;
};

export const PHOBIA_LIST: Phobia[] = [
  { name: 'Acrophobia', description: 'Fear of heights.' },
  { name: 'Aerophobia', description: 'Fear of flying.' },
  { name: 'Agoraphobia', description: 'Fear of open or crowded places.' },
  { name: 'Ailurophobia', description: 'Fear of cats.' },
  { name: 'Algophobia', description: 'Fear of pain.' },
  { name: 'Amaxophobia', description: 'Fear of driving.' },
  { name: 'Arachnophobia', description: 'Fear of spiders.' },
  { name: 'Aquaphobia', description: 'Fear of water.' },
  { name: 'Astraphobia', description: 'Fear of thunder and lightning.' },
  { name: 'Atelophobia', description: 'Fear of imperfection.' },
  { name: 'Atychiphobia', description: 'Fear of failure.' },
  { name: 'Autophobia', description: 'Fear of being alone.' },
  { name: 'Claustrophobia', description: 'Fear of enclosed spaces.' },
  { name: 'Coulrophobia', description: 'Fear of clowns.' },
  { name: 'Cynophobia', description: 'Fear of dogs.' },
  { name: 'Dentophobia', description: 'Fear of dentists or dental treatment.' },
  { name: 'Ecophobia', description: 'Fear of home environments.' },
  { name: 'Emetophobia', description: 'Fear of vomiting.' },
  { name: 'Entomophobia', description: 'Fear of insects.' },
  { name: 'Germophobia', description: 'Fear of germs.' },
  { name: 'Gerascophobia', description: 'Fear of aging.' },
  { name: 'Glossophobia', description: 'Fear of public speaking.' },
  { name: 'Hemophobia', description: 'Fear of blood.' },
  { name: 'Hydrophobia', description: 'Fear of water.' },
  { name: 'Iatrophobia', description: 'Fear of doctors.' },
  { name: 'Megalophobia', description: 'Fear of large objects.' },
  { name: 'Mysophobia', description: 'Fear of dirt or contamination.' },
  { name: 'Necrophobia', description: 'Fear of death or dead things.' },
  { name: 'Nomophobia', description: 'Fear of being without a mobile phone.' },
  { name: 'Nosocomephobia', description: 'Fear of hospitals.' },
  { name: 'Nyctophobia', description: 'Fear of the dark.' },
  { name: 'Ophidiophobia', description: 'Fear of snakes.' },
  { name: 'Ornithophobia', description: 'Fear of birds.' },
  { name: 'Phasmophobia', description: 'Fear of ghosts.' },
  { name: 'Pyrophobia', description: 'Fear of fire.' },
  { name: 'Scopophobia', description: 'Fear of being stared at.' },
  {
    name: 'Social Phobia',
    description: 'Fear of social situations and judgment.',
  },
  { name: 'Thanatophobia', description: 'Fear of death or dying.' },
  { name: 'Thalassophobia', description: 'Fear of deep water.' },
  { name: 'Tokophobia', description: 'Fear of pregnancy or childbirth.' },
  { name: 'Tonitrophobia', description: 'Fear of thunder.' },
  { name: 'Trypanophobia', description: 'Fear of needles or injections.' },
  {
    name: 'Trypophobia',
    description: 'Fear or strong aversion to clusters of small holes.',
  },
  {
    name: 'Xenophobia',
    description: 'Fear of strangers or unfamiliar people.',
  },
  { name: 'Zoophobia', description: 'Fear of animals.' },
];
