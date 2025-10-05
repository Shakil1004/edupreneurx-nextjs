'use client';

import styles from '../app/styles.module.css';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>EduPreneurX</h3>
            <p>World's First Revolutionary Programs & CEO Institute</p>
            <p>Transforming entrepreneurs into industry leaders since our inception.</p>
          </div>

          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><a onClick={() => onNavigate('home')}>Home</a></li>
              <li><a onClick={() => onNavigate('about')}>About Us</a></li>
              <li><a onClick={() => onNavigate('programs')}>All Programs</a></li>
              <li><a onClick={() => onNavigate('admissions')}>Admissions</a></li>
              <li><a onClick={() => onNavigate('careers')}>Careers</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Programs</h3>
            <ul>
              <li><a onClick={() => onNavigate('programs')}>GEEP - Global Entrepreneurship Excellence Program</a></li>
              <li><a onClick={() => onNavigate('programs')}>IEEP - International Executive Entrepreneurship Program</a></li>
              <li><a onClick={() => onNavigate('programs')}>GBLP - Global Business Leadership Program</a></li>
              <li><a onClick={() => onNavigate('programs')}>EIP - Entrepreneurship Immersion Program</a></li>
              <li><a onClick={() => onNavigate('programs')}>ERBP - Entrepreneurial Residency & Business Program</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Connect With Us</h3>
            <ul>
              <li><a onClick={() => onNavigate('contact')}>Contact</a></li>
              <li><a onClick={() => onNavigate('global')}>Global Presence</a></li>
              <li><a onClick={() => onNavigate('success')}>Success Stories</a></li>
            </ul>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Twitter">T</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
            </div>
          </div>
        </div>

        <div className={styles.footerOffices}>
          <h3 style={{ color: '#f0d43a', marginBottom: '1rem' }}>Global Offices</h3>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>India:</span> Bangalore, Mumbai, Delhi
          </div>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>USA:</span> Silicon Valley, New York
          </div>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>UK:</span> London
          </div>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>Singapore:</span> Marina Bay
          </div>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>UAE:</span> Dubai
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2024 EduPreneurX. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
