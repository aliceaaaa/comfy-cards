import styles from './flashcard.module.scss';

interface FlashCardProps {
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
}

export function FlashCard({ front, back, flipped, onFlip }: FlashCardProps) {
  const innerClassNames = [styles.inner];

  if (flipped) {
    innerClassNames.push(styles.flipped);
  }

  return (
    <button type="button" className={styles.flashcard} onClick={onFlip} aria-live="polite">
      <div className={innerClassNames.join(' ')}>
        <div className={styles.side}>
          <span className={styles.word}>{front}</span>
          <span className={styles.caption}>нажмите, чтобы перевернуть</span>
        </div>
        <div className={`${styles.side} ${styles.back}`}>
          <span className={styles.word}>{back}</span>
          <span className={styles.caption}>перевод</span>
        </div>
      </div>
    </button>
  );
}
