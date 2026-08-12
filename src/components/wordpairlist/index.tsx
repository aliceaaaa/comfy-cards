import { Card } from '../../types';
import styles from './wordpairlist.module.scss';

interface WordPairListProps {
  cards: Card[];
  emptyText?: string;
}

export const WordPairList = ({
  cards,
  emptyText = 'Empty',
}: WordPairListProps) => {
  if (cards.length === 0) {
    return <p className={styles.empty}>{emptyText}</p>;
  }

  return (
    <ul className={styles.list}>
      {cards.map((card) => (
        <li key={card.id} className={styles.item}>
          <span className={styles.original}>{card.original}</span>
          <span className={styles.separator}>—</span>
          <span className={styles.translation}>{card.translation}</span>
        </li>
      ))}
    </ul>
  );
};
