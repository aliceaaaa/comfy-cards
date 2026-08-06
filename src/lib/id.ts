/** Локальный идентификатор. Когда появится бэкенд, id будет приходить оттуда. */
export function createId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
