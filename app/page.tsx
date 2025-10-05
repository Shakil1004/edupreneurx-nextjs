'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ProgramCard, { ProgramData } from '../components/ProgramCard';
import FormModal from '../components/FormModal';
import styles from './styles.module.css';

const programs: ProgramData[] = [
  {
    id: 'geep',
    badge: 'FLAGSHIP PROGRAM',
    title: 'GEEP - Global Entrepreneurship Excellence Program',
    description: 'Our most comprehensive program designed for aspiring entrepreneurs who want to build global enterprises. Experience world-class mentorship, international exposure, and hands-on learning.',
    features: [
      'Duration: 12-18 months',
      'International study tours to 5+ countries',
      'Mentorship from Fortune 500 CEOs',
      'Guaranteed funding opportunities',
      'Global network of 10,000+ entrepreneurs',
    ],
    flagship: true,
  },
  {
    id: 'ieep',
    badge: 'EXECUTIVE PROGRAM',
    title: 'IEEP - International Executive Entrepreneurship Program',
    description: 'Designed for experienced professionals and executives looking to transition into entrepreneurship or scale their existing ventures to international markets.',
    features: [
      'Duration: 6-9 months',
      'Executive-level curriculum',
      'International market entry strategies',
      'C-suite mentorship',
      'Investment readiness preparation',
    ],
  },
  {
    id: 'gblp',
    badge: 'LEADERSHIP TRACK',
    title: 'GBLP - Global Business Leadership Program',
    description: 'Focus on developing leadership skills essential for building and scaling successful businesses. Perfect for entrepreneurs in growth phase.',
    features: [
      'Duration: 9-12 months',
      'Leadership development modules',
      'Team building & management',
      'Strategic planning workshops',
      'Global business case studies',
    ],
  },
  {
    id: 'eip',
    badge: 'IMMERSIVE EXPERIENCE',
    title: 'EIP - Entrepreneurship Immersion Program',
    description: 'An intensive, immersive program that throws you into the deep end of entrepreneurship. Learn by doing with real projects and live business challenges.',
    features: [
      'Duration: 3-6 months',
      'Hands-on project-based learning',
      'Live business challenges',
      'Rapid prototyping & validation',
      'Industry expert sessions',
    ],
  },
  {
    id: 'erbp',
    badge: 'RESIDENCY PROGRAM',
    title: 'ERBP - Entrepreneurial Residency & Business Program',
    description: 'A unique residency program where you work alongside successful entrepreneurs, getting firsthand experience in building and running businesses.',
    features: [
      'Duration: 12 months',
      'On-site residency opportunities',
      'Direct mentorship from successful founders',
      'Co-working space access',
      'Business incubation support',
    ],
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState('apply');
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>();

  const handleOpenForm = (type: string, programName?: string) => {
    setFormType(type);
    setSelectedProgram(programName);
    setIsFormOpen(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onOpenForm={handleOpenForm} onNavigate={handleNavigate} />
            <section className={styles.section}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Our Revolutionary Programs</h2>
                <p className={styles.sectionSubtitle}>
                  Choose from our world-class programs designed to transform your entrepreneurial journey
                </p>
                <div className={styles.programsGrid}>
                  {programs.map((program) => (
                    <ProgramCard
                      key={program.id}
                      program={program}
                      onOpenForm={handleOpenForm}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        );

      case 'about':
        return (
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.contentSection}>
                <h2>About EduPreneurX</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  EduPreneurX is the world's first CEO Institute dedicated to transforming aspiring entrepreneurs
                  into industry leaders. Founded with a vision to revolutionize entrepreneurship education, we
                  combine theoretical knowledge with practical, hands-on experience.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  Our programs are designed by industry experts, successful entrepreneurs, and Fortune 500 CEOs
                  who bring decades of real-world experience to the classroom. We don't just teach business theory
                  - we immerse you in the entrepreneurial ecosystem.
                </p>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#ff6b35' }}>Our Mission</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  To create a global community of successful entrepreneurs who drive innovation, create jobs,
                  and make a positive impact on society.
                </p>
              </div>
            </div>
          </section>
        );

      case 'programs':
        return (
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>All Programs</h2>
              <p className={styles.sectionSubtitle}>
                Explore our comprehensive range of entrepreneurship programs
              </p>
              <div className={styles.programsGrid}>
                {programs.map((program) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    onOpenForm={handleOpenForm}
                  />
                ))}
              </div>
            </div>
          </section>
        );

      case 'admissions':
        return (
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.contentSection}>
                <h2>Admissions Process</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                  Join the world's most prestigious CEO Institute through our comprehensive admissions process.
                </p>

                <h3 style={{ color: '#ff6b35', marginTop: '2rem', marginBottom: '1rem' }}>3-Cycle Admission System</h3>
                <p style={{ marginBottom: '2rem' }}>We offer three admission cycles per year:</p>

                <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' }}>
                  <h4 style={{ color: '#333', marginBottom: '1rem' }}>Cycle 1: January Intake</h4>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Application Deadline:</strong> November 30</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Notification:</strong> December 15</p>
                  <p><strong>Program Start:</strong> January 15</p>
                </div>

                <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' }}>
                  <h4 style={{ color: '#333', marginBottom: '1rem' }}>Cycle 2: May Intake</h4>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Application Deadline:</strong> March 31</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Notification:</strong> April 15</p>
                  <p><strong>Program Start:</strong> May 15</p>
                </div>

                <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' }}>
                  <h4 style={{ color: '#333', marginBottom: '1rem' }}>Cycle 3: September Intake</h4>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Application Deadline:</strong> July 31</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Notification:</strong> August 15</p>
                  <p><strong>Program Start:</strong> September 15</p>
                </div>

                <h3 style={{ color: '#ff6b35', marginTop: '2rem', marginBottom: '1rem' }}>Application Requirements</h3>
                <ul style={{ lineHeight: '2', marginBottom: '2rem', paddingLeft: '2rem' }}>
                  <li>Completed application form</li>
                  <li>Academic transcripts</li>
                  <li>Statement of purpose</li>
                  <li>Two letters of recommendation</li>
                  <li>Resume/CV</li>
                  <li>Interview (for shortlisted candidates)</li>
                </ul>

                <button
                  className={styles.ctaPrimary}
                  onClick={() => handleOpenForm('apply')}
                  style={{ display: 'inline-block' }}
                >
                  Start Your Application
                </button>
              </div>
            </div>
          </section>
        );

      case 'global':
        return (
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.contentSection}>
                <h2>Global Presence</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                  EduPreneurX has a truly global footprint with offices and programs across five continents.
                </p>

                <h3 style={{ color: '#ff6b35', marginTop: '2rem', marginBottom: '1.5rem' }}>Our Global Offices</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                  <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>India</h4>
                    <p>Bangalore (HQ)</p>
                    <p>Mumbai</p>
                    <p>Delhi NCR</p>
                  </div>

                  <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>United States</h4>
                    <p>Silicon Valley, CA</p>
                    <p>New York, NY</p>
                  </div>

                  <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>Europe</h4>
                    <p>London, UK</p>
                  </div>

                  <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>Asia-Pacific</h4>
                    <p>Singapore</p>
                  </div>

                  <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>Middle East</h4>
                    <p>Dubai, UAE</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'success':
        return (
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.contentSection}>
                <h2>Success Stories</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                  Our alumni have gone on to build successful companies, raise millions in funding, and create
                  thousands of jobs worldwide.
                </p>

                <div style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '3rem', borderRadius: '20px', marginBottom: '2rem' }}>
                  <h3 style={{ marginBottom: '2rem', fontSize: '2rem' }}>By The Numbers</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    <div>
                      <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>10,000+</div>
                      <div>Alumni Worldwide</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>$2B+</div>
                      <div>Funding Raised</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>500+</div>
                      <div>Companies Founded</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>50+</div>
                      <div>Countries</div>
                    </div>
                  </div>
                </div>

                <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '3rem' }}>
                  Join our community of successful entrepreneurs and write your own success story.
                </p>
              </div>
            </div>
          </section>
        );

      case 'careers':
        return (
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.contentSection}>
                <h2>Careers at EduPreneurX</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                  Join our team of passionate educators, entrepreneurs, and innovators who are transforming
                  entrepreneurship education worldwide.
                </p>

                <h3 style={{ color: '#ff6b35', marginTop: '2rem', marginBottom: '1.5rem' }}>Open Positions</h3>

                <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px', marginBottom: '1.5rem', borderLeft: '5px solid #ff6b35' }}>
                  <h4 style={{ color: '#ff6b35', marginBottom: '0.5rem' }}>Program Director</h4>
                  <p style={{ marginBottom: '1rem', color: '#666' }}>Bangalore, India | Full-time</p>
                  <p style={{ marginBottom: '1rem' }}>Lead our flagship GEEP program and mentor the next generation of entrepreneurs.</p>
                  <button
                    className={styles.btnApply}
                    onClick={() => handleOpenForm('apply')}
                  >
                    Apply Now
                  </button>
                </div>

                <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px', marginBottom: '1.5rem', borderLeft: '5px solid #ff6b35' }}>
                  <h4 style={{ color: '#ff6b35', marginBottom: '0.5rem' }}>Business Development Manager</h4>
                  <p style={{ marginBottom: '1rem', color: '#666' }}>Singapore | Full-time</p>
                  <p style={{ marginBottom: '1rem' }}>Expand our presence in the Asia-Pacific region and build strategic partnerships.</p>
                  <button
                    className={styles.btnApply}
                    onClick={() => handleOpenForm('apply')}
                  >
                    Apply Now
                  </button>
                </div>

                <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px', marginBottom: '1.5rem', borderLeft: '5px solid #ff6b35' }}>
                  <h4 style={{ color: '#ff6b35', marginBottom: '0.5rem' }}>Content & Curriculum Designer</h4>
                  <p style={{ marginBottom: '1rem', color: '#666' }}>Remote | Full-time</p>
                  <p style={{ marginBottom: '1rem' }}>Create engaging curriculum and learning materials for our programs.</p>
                  <button
                    className={styles.btnApply}
                    onClick={() => handleOpenForm('apply')}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.contentSection}>
                <h2>Contact Us</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                  Have questions? We're here to help. Reach out to us through any of our global offices
                  or submit an enquiry form.
                </p>

                <h3 style={{ color: '#ff6b35', marginTop: '2rem', marginBottom: '1.5rem' }}>Get In Touch</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                  <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>Email</h4>
                    <p>info@edupreneurx.com</p>
                    <p>admissions@edupreneurx.com</p>
                  </div>

                  <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>Phone</h4>
                    <p>India: +91 80 1234 5678</p>
                    <p>USA: +1 (650) 555-0123</p>
                  </div>

                  <div style={{ background: '#f8f9fa', padding: '2rem', borderRadius: '15px' }}>
                    <h4 style={{ color: '#ff6b35', marginBottom: '1rem' }}>Address</h4>
                    <p>Bangalore HQ</p>
                    <p>123 Innovation Drive</p>
                    <p>Bangalore 560001, India</p>
                  </div>
                </div>

                <button
                  className={styles.ctaPrimary}
                  onClick={() => handleOpenForm('enquiry')}
                  style={{ display: 'inline-block' }}
                >
                  Send Enquiry
                </button>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        formType={formType}
        programName={selectedProgram}
      />
    </div>
  );
}
