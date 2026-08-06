import { useCallback, useState } from 'react';
import { Card } from '../types';
import { shuffle } from '../lib/shuffle';

interface StudySessionState {
  queue: Card[];
  index: number;
  flipped: boolean;
  wrongCards: Card[];
}

const emptyState: StudySessionState = {
  queue: [],
  index: 0,
  flipped: false,
  wrongCards: [],
};

/**
 * Прогон колоды: очередь карточек, переворот, счёт ошибок.
 * Ничего не знает про хранилище и про то, какой стороной показывать карточку.
 */
export function useStudySession() {
  const [state, setState] = useState<StudySessionState>(emptyState);

  const start = useCallback((cards: Card[], shuffleCards: boolean) => {
    setState({
      ...emptyState,
      queue: shuffleCards ? shuffle(cards) : cards.slice(),
    });
  }, []);

  const reset = useCallback(() => {
    setState(emptyState);
  }, []);

  const flip = useCallback(() => {
    setState((previous) => {
      return { ...previous, flipped: !previous.flipped };
    });
  }, []);

  const answer = useCallback((isCorrect: boolean) => {
    setState((previous) => {
      const current = previous.queue[previous.index];

      if (!current) {
        return previous;
      }

      return {
        ...previous,
        index: previous.index + 1,
        flipped: false,
        wrongCards: isCorrect ? previous.wrongCards : [...previous.wrongCards, current],
      };
    });
  }, []);

  const isStarted = state.queue.length > 0;
  const isFinished = isStarted && state.index >= state.queue.length;

  return {
    currentCard: state.queue[state.index],
    flipped: state.flipped,
    wrongCards: state.wrongCards,
    doneCount: state.index,
    totalCount: state.queue.length,
    isStarted,
    isFinished,
    start,
    reset,
    flip,
    answer,
  };
}
