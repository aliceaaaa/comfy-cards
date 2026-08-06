/** Тасование Фишера — Йетса, возвращает новый массив. */
export function shuffle<T>(items: T[]): T[] {
  const result = items.slice();

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = result[index];

    result[index] = result[swapIndex];
    result[swapIndex] = current;
  }

  return result;
}
