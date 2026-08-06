import { ReactNode } from 'react';
import styles from './progress.module.scss';

interface ProgressProps {
  value: number;
  max: number;
  caption?: ReactNode;
}

export function Progress({ value, max, caption }: ProgressProps) {
  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div className={styles.progress}>
      <div className={styles.caption}>
        <span>
          {value} из {max}
        </span>
        {caption ? <span>{caption}</span> : null}
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className={styles.bar} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
