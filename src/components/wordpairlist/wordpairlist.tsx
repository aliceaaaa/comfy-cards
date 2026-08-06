import { Card } from '../../types';
import styles from './wordpairlist.module.scss';

interface WordPairListProps {
  cards: Card[];
  emptyText?: string;
}

/** Список пар «слово — перевод»: превью колоды и разбор ошибок. */
export function WordPairList({ cards, emptyText = 'Пока пусто' }: WordPairListProps) {
  if (cards.length === 0) {
    return <p className={styles.empty}>{emptyText}</p>;
  }

  return (
    <ul className={styles.list}>
      {cards.map((card) => {
        return (
          <li key={card.id} className={styles.item}>
            <span className={styles.original}>{card.original}</span>
            <span className={styles.separator}>—</span>
            <span>{card.translation}</span>
          </li>
        );
      })}
    </ul>
  );
}
