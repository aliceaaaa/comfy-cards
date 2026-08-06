import { Deck } from '../types';

const STORAGE_KEY = 'comfy-cards:decks';

/**
 * Единственное место, которое знает, где лежат колоды.
 * Когда появится бэкенд, эти четыре функции станут запросами к API.
 */
export function readDecks(): Deck[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as Deck[];
  } catch (error) {
    return [];
  }
}

export function writeDecks(decks: Deck[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
}

export function readDeck(id: string): Deck | undefined {
  return readDecks().find((deck) => {
    return deck.id === id;
  });
}

/** Создаёт колоду или заменяет существующую с тем же id. */
export function saveDeck(deck: Deck): void {
  const decks = readDecks();
  const index = decks.findIndex((item) => {
    return item.id === deck.id;
  });

  if (index === -1) {
    writeDecks([deck, ...decks]);
    return;
  }

  const next = decks.slice();

  next[index] = deck;
  writeDecks(next);
}

export function removeDeck(id: string): void {
  writeDecks(
    readDecks().filter((deck) => {
      return deck.id !== id;
    }),
  );
}
