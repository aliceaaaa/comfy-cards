export interface Card {
  id: string;
  original: string;
  translation: string;
}

export interface Deck {
  id: string;
  title: string;
  cards: Card[];
  createdAt: number;
}

/** Какой стороной карточка лежит вверх в начале сессии. */
export type CardSide = 'original' | 'translation';
