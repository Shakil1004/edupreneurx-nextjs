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
          {/* About Section */}
          <div className={styles.footerSection}>
            <h3>EduPreneurX</h3>
            <p>World's First Revolutionary Programs & CEO Institute</p>
            <p style={{ marginTop: '1rem' }}>Also Known as CEO Institute</p>
            <p>Also Known as EduPreneurX Institute</p>
            <p style={{ marginTop: '1rem' }}>Transforming entrepreneurs into industry leaders globally.</p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><a onClick={() => onNavigate('home')}>Home</a></li>
              <li><a onClick={() => onNavigate('about')}>About Us</a></li>
              <li><a onClick={() => onNavigate('programs')}>All Programs</a></li>
              <li><a onClick={() => onNavigate('admissions')}>Admissions</a></li>
              <li><a onClick={() => onNavigate('global')}>Global Presence</a></li>
              <li><a onClick={() => onNavigate('success')}>Success Stories</a></li>
              <li><a onClick={() => onNavigate('careers')}>Careers</a></li>
              <li><a onClick={() => onNavigate('contact')}>Contact</a></li>
            </ul>
          </div>

          {/* Programs */}
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

          {/* Connect With Us */}
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

        {/* Global Offices */}
        <div className={styles.footerOffices}>
          <h3 style={{ color: '#f0d43a', marginBottom: '1rem' }}>Global Offices</h3>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>🇬🇧 United Kingdom:</span> Office 7253, 182-184 High Street North, East Ham, London E6 2JA
          </div>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>🇮🇳 India:</span> Tower B DLF, 408, Jasola N.Delhi, India
          </div>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>🇵🇱 Poland:</span> Swietokrzyska 30, lok.6300-166, Warszawa
          </div>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>🇨🇦 Canada:</span> International Operations Center
          </div>
          <div className={styles.officeInfo}>
            <span className={styles.officeFlag}>🌍 Network:</span> 65+ Countries Global Presence, 22+ Operational Countries
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2024 EduPreneurX. All rights reserved. | Privacy Policy | Terms of Service</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Powered by World Business Groups - Transforming Education Globally
          </p>
        </div>
      </div>
    </footer>
  );
}
