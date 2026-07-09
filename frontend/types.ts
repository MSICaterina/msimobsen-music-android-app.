export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: string;
  plays: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface AdProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  style?: React.CSSProperties;
}
