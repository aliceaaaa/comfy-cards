import styles from './segmented.module.scss';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string> {
  ariaLabel?: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export const Segmented = <T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedProps<T>) => (
  <div className={styles.segmented} role="group" aria-label={ariaLabel}>
    {options.map((option) => {
      const isActive = option.value === value;
      const classNames = [styles.option];

      if (isActive) {
        classNames.push(styles.active);
      }

      return (
        <button
          key={option.value}
          type="button"
          className={classNames.join(' ')}
          aria-pressed={isActive}
          onClick={() => {
            onChange(option.value);
          }}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
