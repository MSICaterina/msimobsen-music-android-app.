import { Track, NewsArticle } from '../types.ts';

export const trendingTracks: Track[] = [
  { id: '1', title: 'Midnight City Lights', artist: 'The Synthwave Kids', album: 'Neon Dreams', coverUrl: 'https://picsum.photos/seed/track1/200/200', duration: '3:45', plays: 1250430 },
  { id: '2', title: 'Acoustic Sunrise', artist: 'Elena Rivers', album: 'Morning Dew', coverUrl: 'https://picsum.photos/seed/track2/200/200', duration: '4:12', plays: 980210 },
  { id: '3', title: 'Bass Drop Protocol', artist: 'DJ Quantum', album: 'Singularity', coverUrl: 'https://picsum.photos/seed/track3/200/200', duration: '2:58', plays: 2105000 },
  { id: '4', title: 'Lo-Fi Study Beats', artist: 'Chillhop Master', album: 'Library Sessions', coverUrl: 'https://picsum.photos/seed/track4/200/200', duration: '45:00', plays: 5400000 },
  { id: '5', title: 'Summer Anthem', artist: 'The Beach Boys (Cover)', album: 'Endless Summer', coverUrl: 'https://picsum.photos/seed/track5/200/200', duration: '3:15', plays: 750000 },
  { id: '6', title: 'Cyberpunk Overture', artist: 'Neon Grid', album: '2077', coverUrl: 'https://picsum.photos/seed/track6/200/200', duration: '5:20', plays: 420000 },
];

export const latestNews: NewsArticle[] = [
  {
    id: 'n1',
    title: 'The Rise of AI in Music Production: What You Need to Know',
    excerpt: 'How artificial intelligence is shaping the future of beat making and vocal synthesis in 2026.',
    imageUrl: 'https://picsum.photos/seed/news1/600/400',
    date: 'Jul 8, 2026',
    category: 'Industry'
  },
  {
    id: 'n2',
    title: 'Top 10 Indie Artists to Watch This Summer',
    excerpt: 'Discover the underground talent that is about to break into the mainstream charts.',
    imageUrl: 'https://picsum.photos/seed/news2/600/400',
    date: 'Jul 6, 2026',
    category: 'Discovery'
  },
  {
    id: 'n3',
    title: 'Festival Season Recap: The Best Performances',
    excerpt: 'A look back at the most electrifying live shows from this summers biggest music festivals.',
    imageUrl: 'https://picsum.photos/seed/news3/600/400',
    date: 'Jul 4, 2026',
    category: 'Live Music'
  }
];
