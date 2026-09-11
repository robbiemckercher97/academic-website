import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

interface Paper {
  id: number;
  title: string;
  authors?: string;
  description?: string;
  links?: Array<{ text: string; url: string }>;
  requestable?: boolean;
}

interface RequestModalProps {
  isOpen: boolean;
  paperTitle: string;
  onClose: () => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, paperTitle, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/request-paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paperTitle,
          requesterName: name,
          requesterEmail: email,
          requesterInstitution: institution,
        }),
      });

      if (response.ok) {
        setMessage('✓ Request sent successfully!');
        setName('');
        setEmail('');
        setInstitution('');
        setTimeout(() => {
          onClose();
          setMessage('');
        }, 2000);
      } else {
        setMessage('Error sending request. Please try again.');
      }
    } catch (error) {
      setMessage('Error sending request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.modalTitle}>Request Paper</h2>
        
        <div className={styles.paperTitleDisplay}>{paperTitle}</div>
        
        <div className={styles.messagePreview}>
          <p><strong>Message to be sent:</strong></p>
          <div className={styles.previewText}>
            <p>Hello,</p>
            <p>I would like to request a copy of the following paper:</p>
            <p style={{ fontStyle: 'italic' }}>"{paperTitle}"</p>
            <p>Thank you,<br />{name || '[Your Name]'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.requestForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Your Email *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="institution">Institution (Optional)</label>
            <input
              id="institution"
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Enter your institution"
            />
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Sending...' : 'Send Request'}
          </button>

          {message && <p className={styles.formMessage}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

const jobMarketPaper: Paper = {
  id: 1,
  title: 'Dividend Taxation and Income Shifting within the Family',
  authors: '',
  description: '[Description to be added]',
  links: [],
  requestable: true,
};

const workingPapers: Paper[] = [
  {
    id: 2,
    title: 'Should I Stay or Should I Go? The Impact of Taxation on Canadian Inter-Provincial Migration',
    authors: 'With Adam Lavecchia and Alisa Tazhitdinova',
    description: 'Reject and Resubmit, Journal of Public Economics',
    links: [
      { text: 'Paper Available at SSRN', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6572404' },
    ],
  },
  {
    id: 3,
    title: 'The Impact of Government Social Spending on the Elasticity of Taxable Income',
    authors: '',
    description: '[Description to be added]',
    links: [],
    requestable: true,
  },
  {
    id: 4,
    title: 'Labour Supply Responses to Marginal Tax Rates, Average Tax Rates, and Tax Progressivity',
    authors: 'With Li-Hsin Lin',
    description: '[Description to be added]',
    links: [],
    requestable: true,
  },
];

const Home: NextPage = () => {
  const [expandedBio, setExpandedBio] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedPaperTitle, setSelectedPaperTitle] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openRequestModal = (paperTitle: string) => {
    setSelectedPaperTitle(paperTitle);
    setRequestModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Robert McKercher - Economist</title>
        <meta name="description" content="Robert McKercher - PhD Candidate in Economics, McMaster University" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navBrand}>Robert McKercher</div>
          <ul className={styles.navLinks}>
            <li>
              <a onClick={() => scrollToSection('research')} style={{ cursor: 'pointer' }}>
                Research
              </a>
            </li>
            <li>
              <Link href="/cv">
                <a>CV</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.container}>
        {/* Profile Section - Two Column */}
        <section className={styles.profileSection}>
          <div className={styles.profilePortrait}>
            <img
              src="/me.jpeg"
              alt="Robert McKercher"
              className={styles.portraitImage}
            />
          </div>
          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>Robert McKercher</h1>
            <p className={styles.profileRole}>PhD Candidate in Economics</p>
            <p className={styles.profileAffiliation}>Department of Economics, McMaster University</p>
            
            <div className={styles.contactInfo}>
              <p><strong>Email:</strong> <a href="mailto:mckerchr@mcmaster.ca">mckerchr@mcmaster.ca</a></p>
              <p><strong>Office:</strong> Kenneth Taylor Hall (KTH), Room 706</p>
              <p>
                <strong>Address:</strong><br />
                Department of Economics<br />
                McMaster University<br />
                1280 Main Street West<br />
                Hamilton, Ontario, Canada L8S 4M4
              </p>
            </div>

            <div className={styles.education}>
              <h3 className={styles.educationHeading}>Education</h3>
              <ul className={styles.educationList}>
                <li><strong>PhD in Economics</strong> (in progress) – McMaster University</li>
                <li><strong>Master of Arts in Economics</strong> – McMaster University</li>
                <li><strong>Bachelor of Honours in Economics</strong> – McMaster University</li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutHeading}>About</h2>
          <p className={styles.aboutText}>
            [Brief bio goes here]
          </p>
          <button
            className={styles.expandButton}
            onClick={() => setExpandedBio(!expandedBio)}
          >
            {expandedBio ? 'Show Less' : 'Show More'}
          </button>
          {expandedBio && (
            <div className={styles.expandedBio}>
              <p>
                [More detailed bio and research interests go here]
              </p>
            </div>
          )}
        </section>

        {/* Job Market Paper Section */}
        <section id="research" className={styles.researchSection}>
          <h2 className={styles.sectionHeading}>Job Market Paper</h2>
          <div className={styles.paper}>
            <div className={styles.paperTitle}>{jobMarketPaper.title}</div>
            {jobMarketPaper.authors && <div className={styles.paperAuthors}>{jobMarketPaper.authors}</div>}
            {jobMarketPaper.description && <div className={styles.paperDescription}>{jobMarketPaper.description}</div>}
            <div className={styles.paperLinks}>
              {jobMarketPaper.links && jobMarketPaper.links.length > 0 && (
                <>
                  {jobMarketPaper.links.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </a>
                  ))}
                </>
              )}
              {jobMarketPaper.requestable && (
                <button
                  className={styles.requestButton}
                  onClick={() => openRequestModal(jobMarketPaper.title)}
                >
                  Paper Available Upon Request
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Working Papers Section */}
        <section className={styles.researchSection}>
          <h2 className={styles.sectionHeading}>Working Papers</h2>
          <div className={styles.papersContainer}>
            {workingPapers.map((paper) => (
              <div key={paper.id} className={styles.paper}>
                <div className={styles.paperTitle}>{paper.title}</div>
                {paper.authors && <div className={styles.paperAuthors}>{paper.authors}</div>}
                {paper.description && <div className={styles.paperDescription}>{paper.description}</div>}
                <div className={styles.paperLinks}>
                  {paper.links && paper.links.length > 0 && (
                    <>
                      {paper.links.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.text}
                        </a>
                      ))}
                    </>
                  )}
                  {paper.requestable && (
                    <button
                      className={styles.requestButton}
                      onClick={() => openRequestModal(paper.title)}
                    >
                      Paper Available Upon Request
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>&copy; {new Date().getFullYear()} Robert McKercher. All rights reserved.</p>
        </footer>
      </div>

      <RequestModal
        isOpen={requestModalOpen}
        paperTitle={selectedPaperTitle}
        onClose={() => setRequestModalOpen(false)}
      />
    </>
  );
};

export default Home;
