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
  abstract?: string;
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
  const [additionalNote, setAdditionalNote] = useState('');
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
          additionalNote: additionalNote,
        }),
      });

      if (response.ok) {
        setMessage('✓ Request sent successfully!');
        setName('');
        setEmail('');
        setInstitution('');
        setAdditionalNote('');
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

          <div className={styles.formGroup}>
            <label htmlFor="additionalNote">Additional Note (Optional)</label>
            <textarea
              id="additionalNote"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
              placeholder="Add any additional information or message"
              rows={4}
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
  description: 'Working Paper',
  abstract: `I study Canada's 2018 expansion of the Tax on Split Income rules, which raised the marginal tax rate applied to dividends received by certain spouses of private-business owners and thereby eliminated the tax advantage from a well-known tax-planning strategy. Using linked personal and corporate administrative tax records, I compare families exposed to the reform with those likely exempt and exploit variation in their pre-reform tax incentives and financial exposure. Dividends reported by exposed spouses decline sharply after the reform, while dividends and employment income reported by business owners increase. Family taxable income consequently remains unchanged on average and across family-income quartiles. A \$X,XXX increase in the additional tax a family would owe under TOSI reduces spouse dividends by approximately X\%, with similar proportional responses throughout the income distribution. The magnitude of the response varies with the additional tax a family would owe under TOSI. Families facing larger tax increases reduce spouse dividends by more. For all but the most exposed families, this income is reallocated to the owner and family taxable income remains unchanged. Among the most exposed families, the reallocation is incomplete and family taxable income declines. I find no corresponding changes in ownership, employment, corporate assets, or retained earnings. These findings show that closing an income-splitting channel primarily changes who reports business income, but begins to reduce the family tax base when the financial stakes become sufficiently large.`,
  links: [],
  requestable: true,
};

const workingPapers: Paper[] = [
  {
    id: 2,
    title: 'Should I Stay or Should I Go? The Impact of Taxation on Canadian Inter-Provincial Migration',
    authors: 'With Adam Lavecchia and Alisa Tazhitdinova',
    description: 'Reject and Resubmit, Journal of Public Economics',
    abstract: `This paper estimates the causal effect of income taxation on inter-provincial migration in Canada. We exploit a major tax decentralization reform between 1998-2001 that led to some provinces having higher provincial income tax rates than others. Using administrative tax data and a differences-in-differences framework, we estimate the elasticity of inter-provincial migration with respect to the net-of-tax rate. We find that a 10% increase in the net-of-tax rate leads to approximately 8% more in-migration relative to baseline. The effect is driven primarily by high-income earners and those in mobile occupations. We also find evidence of asymmetries in migration responses: the response to tax increases is larger than the response to equivalent tax decreases, suggesting that migration decisions are not purely based on forward-looking tax considerations but may be influenced by other factors correlated with tax changes.`,
    links: [
      { text: 'Paper Available at SSRN', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6572404' },
    ],
  },
  {
    id: 3,
    title: 'The Impact of Government Social Spending on the Elasticity of Taxable Income',
    authors: '',
    description: 'Working Paper',
    abstract: `Research shows that the elasticity of taxable income (ETI) depends on features of the tax system, and a growing microeconomic literature shows that tax compliance depends partly on social preferences and perceptions of government. In this paper, I investigate whether the level of government social spending affects the ETI. I employ a quasi-experimental research design using administrative tax data and exploit variation in social spending across provinces and over time in Canada. Using a generalized difference-in-differences framework, I estimate how changes in social spending affect the responsiveness of taxable income to marginal tax rate changes. The results suggest that higher government social spending is associated with lower ETI, indicating that individuals are less responsive to tax rate changes when they perceive greater government provision of public services. This finding has important implications for optimal tax policy and government spending decisions.`,
    links: [],
    requestable: true,
  },
  {
    id: 4,
    title: 'Labour Supply Responses to Marginal Tax Rates, Average Tax Rates, and Tax Progressivity',
    authors: 'With Li-Hsin Lin',
    description: 'Working Paper',
    abstract: `Standard models of labour supply predict that individuals respond to the marginal tax rate, which determines the net-of-tax return to work at the margin. Empirical evidence, however, suggests that some individuals also respond to average tax rates and the progressivity of the tax system. In this paper, we develop a theoretical model that allows for both rational responses to marginal rates and behavioural responses to average rates and progressivity. We then test these predictions using quasi-experimental variation in tax rates created by Canadian tax reforms. Using a comprehensive dataset of tax records and labour force surveys, we estimate separate responses to marginal rates, average rates, and progressivity. We find evidence that labour supply responds significantly to marginal tax rates, but also find smaller but non-negligible responses to average tax rates. These results suggest that labour supply responses are not fully captured by standard models that only consider marginal incentives.`,
    links: [],
    requestable: true,
  },
];

const PaperComponent: React.FC<{
  paper: Paper;
  onRequestModal: (title: string) => void;
}> = ({ paper, onRequestModal }) => {
  const [abstractOpen, setAbstractOpen] = useState(false);
  const hasAbstract = paper.abstract && paper.abstract.trim() !== '' && !paper.abstract.includes('[Description to be added]');

  return (
    <div className={styles.paper}>
      <div className={styles.paperTitle}>{paper.title}</div>
      {paper.authors && <div className={styles.paperAuthors}>{paper.authors}</div>}
      {paper.description && <div className={styles.paperDescription}>{paper.description}</div>}
      
      {hasAbstract && (
        <details className={styles.abstractDetails} onToggle={(e) => setAbstractOpen((e.target as HTMLDetailsElement).open)}>
          <summary className={styles.abstractSummary}>
            <span className={styles.abstractTriangle}></span>
            <span className={styles.abstractLabel}>{abstractOpen ? 'Hide Abstract' : 'Show Abstract'}</span>
          </summary>
          <div className={styles.abstractContent}>
            {paper.abstract}
          </div>
        </details>
      )}
      
      <div className={styles.paperActions}>
        {paper.links && paper.links.length > 0 && (
          <>
            {paper.links.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.actionLink}>
                {link.text}
              </a>
            ))}
          </>
        )}
        {paper.requestable && (
          <button
            className={styles.actionButton}
            onClick={() => onRequestModal(paper.title)}
          >
            Paper Available Upon Request
          </button>
        )}
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const [expandedBio, setExpandedBio] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedPaperTitle, setSelectedPaperTitle] = useState('');

  const scrollToSection = (sectionId: string, offset: number = 0) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
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
              <a onClick={() => scrollToSection('about', 150)} style={{ cursor: 'pointer' }}>
                About
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('research', 150)} style={{ cursor: 'pointer' }}>
                Research
              </a>
            </li>
            <li>
              <a onClick={() => scrollToSection('jmp', 150)} style={{ cursor: 'pointer' }}>
                JMP
              </a>
            </li>
            <li>
              <Link href="/cv">
                <a>CV</a>
              </Link>
            </li>
            <li>
              <a onClick={() => scrollToSection('teaching', 150)} style={{ cursor: 'pointer' }}>
                Teaching
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.container}>
        {/* Profile Section */}
        <section className={styles.profileSection}>
          <div className={styles.profilePortrait}>
            <img
              src="/me.jpeg"
              alt="Robert McKercher"
              className={styles.portraitImage}
            />
            
            {/* Contact Info and Education moved to left column */}
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
                <li><strong>PhD Economics</strong> – McMaster University(2021-2027*)</li>
                <li><strong>M.A. Economics</strong> – McMaster University (2021)</li>
                <li><strong>B.A. Honours Economics</strong> – Wilfrid Laurier University (2019)</li>
              </ul>
            </div>
          </div>

          <div className={styles.profileInfo}>
            <h1 className={styles.profileName}>Robert McKercher</h1>
            <p className={styles.profileRole}>PhD Candidate in Economics</p>
            <p className={styles.profileAffiliation}>Department of Economics, McMaster University</p>

            {/* About Section - in right column */}
            <section id="about" className={styles.aboutSectionInline}>
              <h2 className={styles.aboutHeadingInline}>About</h2>
              <p className={styles.aboutText}>
                I am a Ph.D. candidate in economics at McMaster University, currently on the 2026–27 academic job market. My research focuses on questions in public finance using empirical methods, with a particular emphasis on the behavioral responses to taxation and the role of government spending. I am interested in understanding how taxes affect economic decisions, and how public policy can be designed to achieve desired outcomes while minimizing efficiency costs.
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
                    I began my academic career expecting to pursue experimental economics, but my broader interest in income inequality led me towards empirical public finance. I am very happy with the toolkit I have developed. If existing data are insufficient to pursue an idea or identify an underlying mechanism, I can always design an experiment, collect my own data in the lab, and figure out what's driving the behaviour. I am particularly interested in how tax policy affects tax avoidance and evasion and how fiscal policy can reduce income inequality. My prior and current research explores how tax systems influence the choices individuals make to avoid taxation. My future research will extend this agenda to tax evasion and optimal enforcement. I plan to study the joint design of tax schedules and audit policy when audit costs and expected revenue vary across the income distribution, examining how governments should allocate limited enforcement resources.
                  </p>
                  <p>
                    Beyond economics, I'm an avid cook and baker and have somehow managed to get into woodworking despite the humble size of my apartment. I also enjoy rock climbing and usually bring a camera along when I'm doing something fun.
                  </p>
                </div>
              )}
            </section>

            {/* Job Market Paper - in right column */}
            <section id="jmp" className={styles.jobMarketPaperInline}>
              <h2 className={styles.sectionHeadingInline}>Job Market Paper</h2>
              <PaperComponent paper={jobMarketPaper} onRequestModal={openRequestModal} />
            </section>
          </div>
        </section>

        {/* Working Papers Section */}
        <section id="research" className={styles.researchSection}>
          <h2 className={styles.sectionHeading}>Working Papers</h2>
          <div className={styles.papersContainer}>
            {workingPapers.map((paper) => (
              <PaperComponent key={paper.id} paper={paper} onRequestModal={openRequestModal} />
            ))}
          </div>
        </section>

        {/* Teaching Section */}
        <section id="teaching" className={styles.teachingSection}>
          <h2 className={styles.sectionHeading}>Teaching</h2>
          <div className={styles.teachingContainer}>
            <div className={styles.course}>
              <div className={styles.courseCode}>Econ 2ZZ3: Intermediate Microeconomics II</div>
              <div className={styles.courseRole}>Instructor</div>
              <div className={styles.courseDetails}>Winter 2025, McMaster University</div>
            </div>
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
