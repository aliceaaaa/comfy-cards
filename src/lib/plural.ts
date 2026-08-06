/** Русские формы числительного: [1 карточка, 2 карточки, 5 карточек]. */
export function plural(count: number, forms: [string, string, string]): string {
  const tens = Math.abs(count) % 100;
  const units = count % 10;

  if (tens > 10 && tens < 20) {
    return forms[2];
  }

  if (units > 1 && units < 5) {
    return forms[1];
  }

  if (units === 1) {
    return forms[0];
  }

  return forms[2];
}

export function cardsLabel(count: number): string {
  return `${count} ${plural(count, ['карточка', 'карточки', 'карточек'])}`;
}
