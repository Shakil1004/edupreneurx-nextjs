'use client';

import styles from '../app/styles.module.css';

interface HeroProps {
  onOpenForm: (formType: string) => void;
  onNavigate: (page: string) => void;
}

export default function Hero({ onOpenForm, onNavigate }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            World's First Revolutionary Programs & CEO Institute
          </div>
          <h1>
            Build Your{' '}
            <span className={styles.highlight}>Million-Dollar Company</span>{' '}
            Before You Graduate
          </h1>
          <p>
            Join the world's first programs that require you to build a million-dollar company before graduation. Transform from job seeker to job creator through international partnerships with multinational companies and global colleges.
          </p>
          <div className={styles.heroButtons}>
            <button
              className={styles.ctaPrimary}
              onClick={() => onOpenForm('apply')}
            >
              Apply Now
            </button>
            <button
              className={styles.ctaSecondary}
              onClick={() => onNavigate('programs')}
            >
              Explore Programs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
