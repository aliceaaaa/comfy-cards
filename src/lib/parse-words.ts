import { createId } from './id';
import { Card } from '../types';

/**
 * Разделитель выбирается по самому тексту, чтобы фразы вроде «der Hund» не рвались:
 * есть запятая — режем по запятой (и по строкам), иначе по строкам, иначе по пробелам.
 */
function getSeparator(raw: string): RegExp {
  if (raw.includes(',') || raw.includes(';')) {
    return /[,;\n]+/;
  }

  if (raw.includes('\n')) {
    return /\n+/;
  }

  return /\s+/;
}

export function parseWords(raw: string): string[] {
  return raw
    .split(getSeparator(raw))
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
