import { useCallback, useEffect, useState } from 'react';
import { Deck } from '../types';
import { readDeck, readDecks, removeDeck } from '../lib/storage';

/** Список всех колод + удаление. Данные берутся из слоя storage. */
export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    setDecks(readDecks());
  }, []);

  const deleteDeck = useCallback((id: string) => {
    removeDeck(id);
    setDecks(readDecks());
  }, []);

  return { decks, deleteDeck };
}

/** Одна колода по id. undefined, пока идёт загрузка; null, если её нет. */
export function useDeck(id: string | undefined) {
  const [deck, setDeck] = useState<Deck | null | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      setDeck(null);
      return;
    }

    setDeck(readDeck(id) ?? null);
  }, [id]);

  return deck;
}
