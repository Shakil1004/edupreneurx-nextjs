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
    badge: '7 (2+5) Years • Ages 15-22',
    title: 'Global Executive Entrepreneurship Program (GEEP)',
    description: 'Our flagship program combining comprehensive education with real entrepreneurship through international partnerships with multinational companies and colleges.',
    features: [
      "Bachelor's Degree + 10+ Certifications",
      '36% Ownership in Legal Company',
      '3+ International Business Trips',
      'Years 2+ Completely FREE',
      'International Location + Lifetime Support',
    ],
    flagship: true,
  },
  {
    id: 'ieep',
    badge: '5 (2+3) Years • Ages 22-26',
    title: 'International Engineering Enterprise Program (IEEP)',
    description: 'Advanced program for engineering graduates to build technology companies with international focus and multinational partnerships.',
    features: [
      "Master's Degree + 10+ Certifications",
      '36% Company Ownership as CEO',
      'International Location + 3+ Trips',
      'Advanced Tech Business Tracks',
      'Years 2+ FREE + Lifetime Support',
    ],
  },
  {
    id: 'gblp',
    badge: '4 (2+2) Years • Ages 22-45',
    title: 'Global Business Leadership Program (GBLP)',
    description: 'Executive program for business owners and masters graduates to scale existing businesses globally through international networks.',
    features: [
      '10+ Advanced Certifications',
      '36-51% Enhanced Ownership',
      'Business Scaling & Diversification',
      'International Expansion',
      'Years 2+ FREE + Lifetime Support',
    ],
  },
  {
    id: 'eip',
    badge: '3 (1+2) Years • Ages 18-30',
    title: 'Express Innovation Program (EIP)',
    description: 'Fast-track international program for ambitious individuals who want to launch their startup rapidly with intensive mentorship and global market entry.',
    features: [
      'Rapid Business Development',
      '25% Company Ownership',
      '1 Year Paid, 2 Years FREE',
      'International Mentorship',
      'Quick Global Market Entry + Lifetime Support',
    ],
  },
  {
    id: 'erbp',
    badge: '6 (3+3) Years • Ages 16-35',
    title: 'Elite Royal Business Program (ERBP)',
    description: 'Premium international program via Royal Networks for ultra-high net worth families, offering dual degrees and family business integration.',
    features: [
      'Dual Degree + Royal Certifications',
      '50% Company Ownership',
      '3 Years Paid, 3 Years FREE',
      'Global Royal Network Access',
      'Family Business Integration + Lifetime Support',
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

            {/* 3-Cycle Admission System */}
            <section className={styles.admissionCycleSection}>
              <div className={styles.container}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
                  Revolutionary 3-Cycle Admission System Per Year
                </h2>
                <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
                  Current Year Admission Opportunities
                </p>

                <div className={styles.cycleGrid}>
                  <div className={styles.cycleCard}>
                    <div className={styles.cycleTitle}>Spring Cycle</div>
                    <p><strong>January - April</strong><br />40 Seats Available</p>
                  </div>
                  <div className={styles.cycleCard}>
                    <div className={styles.cycleTitle}>Summer Cycle</div>
                    <p><strong>May - August</strong><br />40 Seats Available</p>
                  </div>
                  <div className={styles.cycleCard}>
                    <div className={styles.cycleTitle}>Fall Cycle</div>
                    <p><strong>September - December</strong><br />40 Seats Available</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Choose Your Entrepreneurial Path</h2>
                <p className={styles.sectionSubtitle}>
                  World's first education programs that require you to build million-dollar companies while earning your degree through international partnerships
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

                <div className={styles.guaranteeBox}>
                  <h3>🎯 All Programs Will Try to Make Success to Achieve: Build a $1M+ Company + Lifetime Support</h3>
                  <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                    We're so confident in our international business methodology and approach that we are assuring your success. If you don't build a million-dollar company by graduation, we'll support free of cost to promote and make you successful.
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.section} style={{ background: 'white' }}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Why EduPreneurX Works Globally</h2>
                <div className={styles.featuresGrid}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🏢</span>
                    <h3>Real Business Ownership</h3>
                    <p>Don't just study business - own one! Graduate with actual company shares and CEO experience through international partnerships.</p>
                  </div>

                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🎓</span>
                    <h3>International Academic Excellence</h3>
                    <p>Earn globally recognized degrees and certifications through partnerships with multinational companies and prestigious international colleges.</p>
                  </div>

                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🌍</span>
                    <h3>Global Network Access</h3>
                    <p>Access to WBG's international network including Royal Networks, multinational corporations, and global government partnerships.</p>
                  </div>

                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>💰</span>
                    <h3>Profit, Not Debt</h3>
                    <p>Generate revenue while studying internationally. Graduate financially secure with global business exposure, not burdened with debt.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Institute Growth Projection */}
            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Institute Growth Projection - 10 Year Vision</h2>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>5,000</span>
                    <span>Target Students (10 Years)</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>100,000+</span>
                    <span>Global Employment Target</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>5,000+</span>
                    <span>Companies Target</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>95%+</span>
                    <span>Success Rate Goal</span>
                  </div>
                </div>
                <div className={styles.statsGrid}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>120+</span>
                    <span>Target Students (1 Year)</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>350+</span>
                    <span>Target Students (2 Years)</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>1,000+</span>
                    <span>Target Students (3 Years)</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>5,000+</span>
                    <span>Target Students (10 Years)</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'about':
        return (
          <>
            <section className={styles.section} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', textAlign: 'center', paddingTop: '6rem' }}>
              <div className={styles.container}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>About EduPreneurX</h1>
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                  <div className={styles.alsoKnownBadge}>Also Known as CEO Institute</div>
                  <div className={styles.alsoKnownBadge}>Also Known as EduPreneurX Institute</div>
                </div>
                <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
                  Pioneering the future of international entrepreneurial education through real business ownership and global networks
                </p>
              </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>
                <div className={styles.contentSection}>
                  <h2>Our Global Mission</h2>
                  <p>To revolutionize education by creating the world's first international programs that require students to build million-dollar companies before graduation through partnerships with multinational companies, private institutions, and government colleges worldwide. Our mission is to transform the global concept from job seekers to job creators, as the world doesn't need any more job seekers.</p>

                  <h3 style={{ marginTop: '3rem' }}>Our International Vision</h3>
                  <p>A world where every graduate is not just educated but globally empowered - where they own international businesses, create jobs across borders, and drive global innovation through multinational partnerships. We envision a future where our graduates become the job creators the world needs.</p>

                  <h3 style={{ marginTop: '3rem' }}>Partnership with World Business Groups (WBG)</h3>
                  <p>EduPreneurX is proudly powered by World Business Groups, a global network spanning 65+ countries with operational presence in 22+ countries. Our offices are strategically located in UK, India, Poland, and Canada. Through WBG's extensive international ecosystem including:</p>

                  <div className={styles.featuresGrid} style={{ marginTop: '2rem' }}>
                    <div className={styles.featureItem}>
                      <h4>🌍 Global Network</h4>
                      <p>WBG Global, WBG International, World Business Forum with multinational partnerships across 65+ countries</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h4>💼 International Business Services</h4>
                      <p>WBG Global Mall, Services, RBKS Solutions, NTT Groups operating across continents</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h4>🎓 Global Education Division</h4>
                      <p>International college partnerships, government collaborations, global training portals across 22+ countries</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h4>👑 Elite International Networks</h4>
                      <p>The Royal Networks, Royal Connections, International WBG Certificates with global recognition</p>
                    </div>
                  </div>

                  <h3 style={{ marginTop: '3rem' }}>Multinational Company Partnerships</h3>
                  <p>Our programs are integrated with leading multinational corporations, providing students with real-world experience, mentorship, and business opportunities across various industries and countries.</p>

                  <div className={styles.partnershipHighlight}>
                    <p><strong>🚀 Expanding Partnerships:</strong> We are currently on the way to establishing partnerships with 25+ multinational companies to support our programs and provide enhanced opportunities for our students.</p>
                  </div>

                  <h3 style={{ marginTop: '3rem' }}>Government & Private College Collaborations</h3>
                  <p>We partner with prestigious government and private colleges internationally to provide accredited degrees while students build their businesses, ensuring both academic excellence and entrepreneurial success.</p>

                  <div className={styles.partnershipHighlight}>
                    <p><strong>🎓 Growing Academic Network:</strong> We are currently on the way to establishing collaborations with 15+ Government & Private Colleges to support us and expand our academic partnerships globally.</p>
                  </div>

                  <div className={styles.partnershipHighlight}>
                    <p><strong>What Makes Our Institute Unique:</strong> First institute globally to require company building as part of graduation, 3 flexible admission cycles per year for maximum accessibility, Currently 40 seats per cycle, expanding to 5,000+ students over 10 years, Lifetime support system for continuous success and Real equity ownership in companies students build.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'programs':
        return (
          <>
            <section className={styles.section} style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)', color: 'white', textAlign: 'center', paddingTop: '6rem' }}>
              <div className={styles.container}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>All International Programs</h1>
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                  <div className={styles.alsoKnownBadge}>Also Known as CEO Institute</div>
                  <div className={styles.alsoKnownBadge}>Also Known as EduPreneurX Institute</div>
                </div>
                <p style={{ fontSize: '1.3rem' }}>Detailed information about each revolutionary international program with lifetime support</p>
              </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>

                {/* GEEP Program Details */}
                <div className={styles.contentSection}>
                  <h2>🏆 Global Executive Entrepreneurship Program (GEEP) - Flagship</h2>
                  <div className={styles.highlightBox}>
                    <h3>Program Overview</h3>
                    <p><strong>Duration:</strong> 7 (2+5) Years • <strong>Age:</strong> 15-22 (Post-10th or 12th) • <strong>Location:</strong> International</p>
                  </div>

                  <h3>International Business Tracks</h3>
                  <div className={styles.tracksGrid}>
                    <div className={styles.trackCard}><h4>🔒 Global Cybersecurity Services</h4></div>
                    <div className={styles.trackCard}><h4>🤖 International AI & Automation</h4></div>
                    <div className={styles.trackCard}><h4>🛒 Global E-Commerce & Trading</h4></div>
                    <div className={styles.trackCard}><h4>🏭 International Manufacturing</h4></div>
                    <div className={styles.trackCard}><h4>📱 Global Marketing & Media</h4></div>
                  </div>

                  <h3>Fee Structure (Same for All Programs)</h3>
                  <div className={styles.dataTable}>
                    <table>
                      <thead>
                        <tr><th>Period</th><th>Fee Amount</th><th>Details</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Admission Fee</td><td>$10,000</td><td>One-time payment</td></tr>
                        <tr><td>Years 1-2</td><td>$1,000/month</td><td>24 months = $24,000</td></tr>
                        <tr style={{ background: '#fff3cd' }}><td>Years 2+ onwards</td><td>100% FREE</td><td>No tuition fees + Lifetime Support</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className={styles.btnGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <button className={styles.btnApply} onClick={() => handleOpenForm('apply', 'GEEP')}>Apply Now</button>
                    <button className={styles.btnReserve} onClick={() => handleOpenForm('reserve', 'GEEP')}>Book/Reserve Now</button>
                    <button className={styles.btnPayment} onClick={() => handleOpenForm('payment', 'GEEP')}>Make Payment</button>
                  </div>

                  <div className={styles.guaranteeBox}>
                    <p><strong>Outcomes:</strong> Bachelor's Degree + 10+ International Certifications + 36% Company Ownership + Global Exposure + Lifetime Support</p>
                  </div>
                </div>

                {/* IEEP Program Details */}
                <div className={styles.contentSection}>
                  <h2>⚡ International Engineering Enterprise Program (IEEP)</h2>
                  <div className={styles.highlightBox}>
                    <h3>Program Overview</h3>
                    <p><strong>Duration:</strong> 5 (2+3) Years • <strong>Age:</strong> 22-26 (Post-Bachelor Engineering) • <strong>Location:</strong> International</p>
                  </div>

                  <h3>Advanced Global Business Tracks</h3>
                  <div className={styles.tracksGrid}>
                    <div className={styles.trackCard}><h4>🔒 Global Cybersecurity Services</h4></div>
                    <div className={styles.trackCard}><h4>🤖 International AI & Automation</h4></div>
                    <div className={styles.trackCard}><h4>🛒 Global E-Commerce & Trading</h4></div>
                    <div className={styles.trackCard}><h4>🏭 International Manufacturing</h4></div>
                    <div className={styles.trackCard}><h4>🤖 Advanced Robotics</h4></div>
                    <div className={styles.trackCard}><h4>🧠 Global AI-Agentic Systems</h4></div>
                    <div className={styles.trackCard}><h4>📡 International Telecommunication</h4></div>
                    <div className={styles.trackCard}><h4>🛰️ Global Satellite Communication</h4></div>
                  </div>

                  <div className={styles.btnGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <button className={styles.btnApply} onClick={() => handleOpenForm('apply', 'IEEP')}>Apply Now</button>
                    <button className={styles.btnReserve} onClick={() => handleOpenForm('reserve', 'IEEP')}>Book/Reserve Now</button>
                    <button className={styles.btnPayment} onClick={() => handleOpenForm('payment', 'IEEP')}>Make Payment</button>
                  </div>

                  <div className={styles.guaranteeBox}>
                    <p><strong>Outcomes:</strong> Master's Degree + 10+ International Certifications + 36% Company Ownership + Global Exposure + Lifetime Support</p>
                  </div>
                </div>

                {/* GBLP, EIP, ERBP sections - similar structure */}
                <div className={styles.contentSection}>
                  <h2>👑 Global Business Leadership Program (GBLP)</h2>
                  <div className={styles.highlightBox}>
                    <h3>Program Overview</h3>
                    <p><strong>Duration:</strong> 4 (2+2) Years • <strong>Age:</strong> 22-45 (Post-Bachelor + Business Experience) • <strong>Location:</strong> International</p>
                  </div>

                  <div className={styles.btnGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <button className={styles.btnApply} onClick={() => handleOpenForm('apply', 'GBLP')}>Apply Now</button>
                    <button className={styles.btnReserve} onClick={() => handleOpenForm('reserve', 'GBLP')}>Book/Reserve Now</button>
                    <button className={styles.btnPayment} onClick={() => handleOpenForm('payment', 'GBLP')}>Make Payment</button>
                  </div>

                  <div className={styles.guaranteeBox}>
                    <p><strong>Special Feature:</strong> If you have existing business - 51% ownership retained. New business - 36% ownership. International market expansion guaranteed with lifetime support.</p>
                  </div>
                </div>

                <div className={styles.contentSection}>
                  <h2>🚀 Express Innovation Program (EIP)</h2>
                  <div className={styles.highlightBox}>
                    <h3>Program Overview</h3>
                    <p><strong>Duration:</strong> 3 (1+2) Years • <strong>Age:</strong> 18-30 • <strong>Location:</strong> International</p>
                  </div>

                  <div className={styles.btnGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <button className={styles.btnApply} onClick={() => handleOpenForm('apply', 'EIP')}>Apply Now</button>
                    <button className={styles.btnReserve} onClick={() => handleOpenForm('reserve', 'EIP')}>Book/Reserve Now</button>
                    <button className={styles.btnPayment} onClick={() => handleOpenForm('payment', 'EIP')}>Make Payment</button>
                  </div>

                  <div className={styles.guaranteeBox}>
                    <p><strong>Unique Value:</strong> 1 Year Paid, 2 Years FREE + 25% Company Ownership + International Market Access + Lifetime Support</p>
                  </div>
                </div>

                <div className={styles.contentSection}>
                  <h2>💎 Elite Royal Business Program (ERBP)</h2>
                  <div className={styles.highlightBox}>
                    <h3>Program Overview</h3>
                    <p><strong>Duration:</strong> 6 (3+3) Years • <strong>Age:</strong> 16-35 • <strong>Location:</strong> Global Royal Networks + International</p>
                  </div>

                  <div className={styles.btnGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <button className={styles.btnApply} onClick={() => handleOpenForm('apply', 'ERBP')}>Apply Now</button>
                    <button className={styles.btnReserve} onClick={() => handleOpenForm('reserve', 'ERBP')}>Book/Reserve Now</button>
                    <button className={styles.btnPayment} onClick={() => handleOpenForm('payment', 'ERBP')}>Make Payment</button>
                  </div>

                  <div className={styles.guaranteeBox}>
                    <p><strong>Elite Value:</strong> 3 Years Paid, 3 Years FREE + 50% Company Ownership + Royal Network Access + Family Business Integration + Lifetime Support</p>
                  </div>
                </div>

              </div>
            </section>
          </>
        );

      case 'admissions':
        return (
          <>
            <section className={styles.section} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', textAlign: 'center', paddingTop: '6rem' }}>
              <div className={styles.container}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>International Admissions Process</h1>
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                  <div className={styles.alsoKnownBadge}>Also Known as CEO Institute</div>
                  <div className={styles.alsoKnownBadge}>Also Known as EduPreneurX Institute</div>
                </div>
                <p style={{ fontSize: '1.3rem' }}>Your global journey to building a million-dollar company starts here</p>
              </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>
                <div className={styles.contentSection}>
                  <h2>Global Application Process</h2>
                  <div className={styles.featuresGrid}>
                    <div className={styles.featureItem}>
                      <h3>1. International Application</h3>
                      <p>Complete our comprehensive global application form with program selection and international business interests</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h3>2. Global Virtual Interview</h3>
                      <p>Multi-timezone interview to assess entrepreneurial potential and international business acumen</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h3>3. International Aptitude Assessment</h3>
                      <p>Specialized evaluation of global business thinking and cross-cultural entrepreneurial abilities</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h3>4. Final Selection</h3>
                      <p>Receive acceptance letter and complete international admission process</p>
                    </div>
                  </div>
                </div>

                <div className={styles.deadlineSection}>
                  <h2>Global Application Deadlines</h2>
                  <div className={styles.highlightBox} style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                    <h3>📅 Important Dates</h3>
                    <p><strong>Booking (Global):</strong> January 15, 2026<br />
                    <strong>Interview + Selection (International):</strong> March 15, 2026<br />
                    <strong>Admissions & Registered:</strong> Available for qualified international candidates - March 15, 2026</p>
                  </div>

                  <div className={styles.deadlineButtons}>
                    <button className={styles.btnApply} onClick={() => handleOpenForm('apply')}>Apply Now</button>
                    <button className={styles.btnReserve} onClick={() => handleOpenForm('reserve')}>Book/Reserve Now</button>
                    <button className={styles.btnPayment} onClick={() => handleOpenForm('payment')}>Make Payment</button>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'global':
        return (
          <>
            <section className={styles.section} style={{ background: 'linear-gradient(135deg, #28a745, #20c997)', color: 'white', textAlign: 'center', paddingTop: '6rem' }}>
              <div className={styles.container}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Global International Presence</h1>
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                  <div className={styles.alsoKnownBadge}>Also Known as CEO Institute</div>
                  <div className={styles.alsoKnownBadge}>Also Known as EduPreneurX Institute</div>
                </div>
                <p style={{ fontSize: '1.3rem' }}>World Business Groups operates across 65+ countries with operational presence in 22+ countries</p>
              </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>
                <div className={styles.contentSection}>
                  <h2>WBG International Network</h2>
                  <div className={styles.highlightBox}>
                    <h3>🌍 Global Reach</h3>
                    <p><strong>65+ Countries:</strong> WBG International Network presence<br />
                    <strong>22+ Countries:</strong> Operational Groups Presence</p>
                  </div>

                  <div className={styles.featuresGrid}>
                    <div className={styles.featureItem}>
                      <h3>🇬🇧 United Kingdom</h3>
                      <p><strong>Office 7253</strong><br />182-184 High Street North<br />East Ham, London E6 2JA, UK<br />+44 7481350132</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h3>🇮🇳 India</h3>
                      <p><strong>Tower B DLF</strong><br />408, Jasola N.Delhi<br />India<br />+91 92057 40502</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h3>🇵🇱 Poland</h3>
                      <p><strong>Swietokrzyska 30</strong><br />lok.6300-166<br />Warszawa, Poland<br />+48 (0) 728 319 746</p>
                    </div>
                    <div className={styles.featureItem}>
                      <h3>🇨🇦 Canada</h3>
                      <p><strong>Swietokrzyska 30</strong><br />lok.6300-166<br />Warszawa, Poland<br />+48 (0) 728 319 746</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'success':
        return (
          <>
            <section className={styles.section} style={{ background: 'linear-gradient(135deg, #dc3545, #fd7e14)', color: 'white', textAlign: 'center', paddingTop: '6rem' }}>
              <div className={styles.container}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Global Success Stories</h1>
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                  <div className={styles.alsoKnownBadge}>Also Known as CEO Institute</div>
                  <div className={styles.alsoKnownBadge}>Also Known as EduPreneurX Institute</div>
                </div>
                <p style={{ fontSize: '1.3rem' }}>Building the foundation for tomorrow's international entrepreneurs</p>
              </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>
                <div className={styles.contentSection}>
                  <h2>🚀 Building Tomorrow's Success Stories</h2>
                  <div className={styles.highlightBox}>
                    <h3>📋 Program Status Update</h3>
                    <p><strong>Current Status:</strong> Till now, we have no global success stories because we have still not yet started our revolutionary programs.</p>
                    <p style={{ marginTop: '1rem' }}><strong>Launch Preparation:</strong> We are in the final stages of preparation to launch the world's first programs that guarantee students build million-dollar companies before graduation.</p>
                  </div>

                  <div className={styles.btnGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
                    <button className={styles.btnApply} onClick={() => handleOpenForm('apply')}>Be Among First Students</button>
                    <button className={styles.btnInterested} onClick={() => handleOpenForm('interested')}>Show Interest</button>
                    <button className={styles.btnReserve} onClick={() => handleOpenForm('reserve')}>Reserve Your Spot</button>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'careers':
        return (
          <>
            <section className={styles.section} style={{ background: 'linear-gradient(135deg, #6f42c1, #e83e8c)', color: 'white', textAlign: 'center', paddingTop: '6rem' }}>
              <div className={styles.container}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>International Careers at EduPreneurX</h1>
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                  <div className={styles.alsoKnownBadge}>Also Known as CEO Institute</div>
                  <div className={styles.alsoKnownBadge}>Also Known as EduPreneurX Institute</div>
                </div>
                <p style={{ fontSize: '1.3rem' }}>Join our mission to revolutionize international entrepreneurial education</p>
              </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>
                <div className={styles.contentSection}>
                  <h2>Current International Openings - EduPreneurX Global Employment Target: 200 Positions</h2>
                  <div className={styles.highlightBox}>
                    <h3>🌍 Massive Global Employment Initiative</h3>
                    <p><strong>EduPreneurX Direct Employment:</strong> 200 international positions across 65+ countries<br />
                    <strong>Student Companies Employment:</strong> 5,000+ companies × 15-25 employees each = 100,000+ jobs<br />
                    <strong>Total Employment Target:</strong> 100,000+ positions globally within 10 years</p>
                  </div>

                  <h3 style={{ color: '#ff6b35', marginTop: '3rem' }}>🏆 Senior Leadership Positions (25 Openings)</h3>

                  <div className={styles.careerPosition}>
                    <h4>Chief Executive Officer - Regional</h4>
                    <p><strong>Locations:</strong> USA, UK, India, Germany, Singapore (5 positions)<br /><strong>Experience:</strong> 15+ years international business<br /><strong>Role:</strong> Lead regional operations across continents</p>
                    <div className={styles.careerButtons}>
                      <button className={styles.btnApply} onClick={() => handleOpenForm('apply')}>Apply Now</button>
                      <button className={styles.btnInterested} onClick={() => handleOpenForm('interested')}>Show Interest</button>
                    </div>
                  </div>

                  <div className={styles.guaranteeBox}>
                    <h3>🌟 Be Part of Something Revolutionary & Change World Concept</h3>
                    <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Transform the global concept from job seeker to job creator. The world doesn't need any more job seekers - it needs innovators and business leaders who create opportunities for others.</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        );

      case 'contact':
        return (
          <>
            <section className={styles.section} style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)', color: 'white', textAlign: 'center', paddingTop: '6rem' }}>
              <div className={styles.container}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>International Contact & Apply</h1>
                <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                  <div className={styles.alsoKnownBadge}>Also Known as CEO Institute</div>
                  <div className={styles.alsoKnownBadge}>Also Known as EduPreneurX Institute</div>
                </div>
                <p style={{ fontSize: '1.3rem' }}>Ready to build your million-dollar company globally? Start your international application today</p>
              </div>
            </section>

            <section className={styles.section} style={{ background: '#f8f9fa' }}>
              <div className={styles.container}>

                <div className={styles.privacyNotice}>
                  <h4>🔒 Privacy Protected Communication</h4>
                  <div className={styles.securityBadge}>✓ Secure & Private</div>
                  <p>Your personal information is protected through our secure communication system. All emails are sent through official EduPreneurX channels to ensure your privacy and security. We never share your personal information with unauthorized parties.</p>
                </div>

                <div className={styles.contentSection}>
                  <h2>Global Quick Contact</h2>
                  <div className={styles.featuresGrid}>
                    <div className={styles.featureItem}>
                      <span className={styles.featureIcon}>📧</span>
                      <h3>International Email Support</h3>
                      <p><strong>info@edupreneurx.com</strong><br />General international enquiries and applications</p>
                      <p><strong>ceo@edupreneurx.com</strong><br />Direct CEO contact for international matters</p>
                    </div>

                    <div className={styles.featureItem}>
                      <span className={styles.featureIcon}>🌍</span>
                      <h3>WBG Global Network</h3>
                      <p><strong>info@edu.worldbusinessesgroups.com</strong><br />WBG International Education Division</p>
                    </div>

                    <div className={styles.featureItem}>
                      <span className={styles.featureIcon}>📞</span>
                      <h3>International Phone Support</h3>
                      <p><strong>UK:</strong> +44 7481350132<br /><strong>India:</strong> +91 92057 40502</p>
                      <p><strong>Poland/Europe:</strong> +48 (0) 728 319 746</p>
                    </div>

                    <div className={styles.featureItem}>
                      <span className={styles.featureIcon}>💬</span>
                      <h3>Global Live Chat</h3>
                      <p>Available 24/7 across time zones<br />Instant response for urgent international queries</p>
                    </div>
                  </div>
                </div>

                <div className={styles.guaranteeBox}>
                  <h3>🎯 International Response Time Guarantee</h3>
                  <p><strong>Applications:</strong> 3-4 working weeks • <strong>General Enquiries:</strong> 2-3 working weeks • <strong>Urgent Matters:</strong> 12 hours (across all time zones)</p>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                  <button
                    className={styles.ctaPrimary}
                    onClick={() => handleOpenForm('enquiry')}
                    style={{ display: 'inline-block' }}
                  >
                    Send Enquiry / Apply Now
                  </button>
                </div>

              </div>
            </section>
          </>
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
