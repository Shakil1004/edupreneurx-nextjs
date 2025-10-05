'use client';

import styles from '../app/styles.module.css';

export interface ProgramData {
  id: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  flagship?: boolean;
}

interface ProgramCardProps {
  program: ProgramData;
  onOpenForm: (formType: string, programName?: string) => void;
}

export default function ProgramCard({ program, onOpenForm }: ProgramCardProps) {
  return (
    <div className={`${styles.programCard} ${program.flagship ? styles.flagship : ''}`}>
      <div className={styles.programBadge}>{program.badge}</div>
      <h3>{program.title}</h3>
      <p>{program.description}</p>

      <ul className={styles.programFeatures}>
        {program.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <div className={styles.btnGroup}>
        <button
          className={styles.btnApply}
          onClick={() => onOpenForm('apply', program.title)}
        >
          Apply Now
        </button>
        <button
          className={styles.btnReserve}
          onClick={() => onOpenForm('reserve', program.title)}
        >
          Reserve Seat
        </button>
        <button
          className={styles.btnInterested}
          onClick={() => onOpenForm('interested', program.title)}
        >
          I'm Interested
        </button>
        <button
          className={styles.btnPayment}
          onClick={() => onOpenForm('payment', program.title)}
        >
          Make Payment
        </button>
      </div>
    </div>
  );
}
