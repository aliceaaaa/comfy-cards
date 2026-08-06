import { createId } from './id';
import { Card } from '../types';

/** Запятая, пробел, перевод строки и точка с запятой считаются одним и тем же разделителем. */
const SEPARATORS = /[\s,;]+/;

export function parseWords(raw: string): string[] {
  return raw
    .split(SEPARATORS)
    .map((word) => {
      return word.trim();
    })
    .filter((word) => {
      return word.length > 0;
    });
}

/** Собирает карточки по позициям: n-е слово оригинала — с n-м словом перевода. */
export function buildCards(originalsRaw: string, translationsRaw: string): Card[] {
  const originals = parseWords(originalsRaw);
  const translations = parseWords(translationsRaw);
  const size = Math.min(originals.length, translations.length);
  const cards: Card[] = [];

  for (let index = 0; index < size; index += 1) {
    cards.push({
      id: createId(),
      original: originals[index],
      translation: translations[index],
    });
  }

  return cards;
}
