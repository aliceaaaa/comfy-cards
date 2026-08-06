import styles from './segmented.module.scss';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}

/** Переключатель из нескольких равнозначных вариантов. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedProps<T>) {
  return (
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
}
