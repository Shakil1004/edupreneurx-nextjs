'use client';

import { useState } from 'react';
import styles from '../app/styles.module.css';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'All Programs', id: 'programs' },
    { name: 'Admissions', id: 'admissions' },
    { name: 'Global Presence', id: 'global' },
    { name: 'Success Stories', id: 'success' },
    { name: 'Careers', id: 'careers' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logo} onClick={() => handleNavClick('home')}>
            EduPreneurX
          </div>

          <button
            className={styles.mobileMenu}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>

          <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.show : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  onClick={() => handleNavClick(item.id)}
                  className={currentPage === item.id ? styles.active : ''}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
