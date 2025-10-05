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
            World's First CEO Institute
          </div>
          <h1>
            Transform Your{' '}
            <span className={styles.highlight}>Entrepreneurial Journey</span>{' '}
            With Revolutionary Programs
          </h1>
          <p>
            Join the world's most innovative entrepreneurship institute.
            Experience transformative programs designed to turn visionaries into industry leaders.
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
