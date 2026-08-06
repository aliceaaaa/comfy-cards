import styles from './flashcard.module.scss';

interface FlashCardProps {
  front: string;
  back: string;
  flipped: boolean;
  onFlip: () => void;
  frontCaption?: string;
  backCaption?: string;
}

export const FlashCard = ({
  front,
  back,
  flipped,
  onFlip,
  frontCaption = 'нажмите, чтобы перевернуть',
  backCaption = 'перевод',
}: FlashCardProps) => {
  const innerClassNames = [styles.inner];

  if (flipped) {
    innerClassNames.push(styles.flipped);
  }

  return (
    <button
      type="button"
      className={styles.flashcard}
      onClick={onFlip}
      aria-live="polite"
    >
      <div className={innerClassNames.join(' ')}>
        <div className={styles.side}>
          <span className={styles.word}>{front}</span>
          <span className={styles.caption}>{frontCaption}</span>
        </div>
        <div className={`${styles.side} ${styles.back}`}>
          <span className={styles.word}>{back}</span>
          <span className={styles.caption}>{backCaption}</span>
        </div>
      </div>
    </button>
  );
};
