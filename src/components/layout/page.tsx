import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.scss';

interface PageProps {
  title: string;
  subtitle?: ReactNode;
  backTo?: string;
  backLabel?: string;
  children: ReactNode;
}

export function Page({ title, subtitle, backTo, backLabel = 'Назад', children }: PageProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        {backTo ? (
          <Link className={styles.back} to={backTo}>
            ← {backLabel}
          </Link>
        ) : null}
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </header>
      {children}
    </main>
  );
}
