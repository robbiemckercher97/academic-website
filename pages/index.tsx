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
    abstract: `This paper estimates the causal effect of income taxation on inter-provincial migration in Canada. We exploit a major tax decentralization reform between 1998-2001 that led to some provinces lowering their marginal and average tax rates more than others, particularly for top earners. Using a difference-in-differences design, we estimate a population stock-elasticity with respect to the net-of-average-tax rate of about 2.5-3 for young, unmarried high-income individuals. The estimates for older and married individuals are smaller and mostly statistically insignificant. We find that the population stock elasticity estimates are driven by a reduction the likelihood that young, unmarried and high-income individuals emigrate from their province of residence (i.e.\ out-migration) rather than a change to in-migration. This suggests that individuals react more strongly to tax changes in their home province rather than tax changes in other provinces.`,
    links: [
      { text: 'Paper Available at SSRN', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6572404' },
    ],
  },
  {
    id: 3,
    title: 'The Impact of Government Social Spending on the Elasticity of Taxable Income',
    authors: '',
    abstract: `Research shows that the elasticity of taxable income (ETI) depends on features of the tax system, and a growing microeconomic literature shows that tax compliance depends partly on how governments use tax revenue. This paper asks whether a similar relationship is visible in aggregate by examining whether top earners are less responsive to tax rates in countries that spend more on social programs. I construct a panel of 16 OECD countries from 1981 to 2019, combining top marginal tax rates, top 1% fiscal income shares, and government social expenditure. Using a model with country and year fixed effects, I estimate the ETI for individual countries and groups of countries and examine how it varies with total social spending and expenditure across social program categories. I find that top earners exhibit a lower ETI, on average, in countries with higher social spending. Differences in top income shares, top marginal tax rates, and tax administration expenses do not fully explain this relationship. My findings complement microeconomic evidence on how the use of local tax revenue influences tax compliance by showing that aggregate measures of tax sensitivity also vary with how governments spend revenue at the national level. This relationship is descriptive rather than causal, but it suggests that the behavioural costs of taxation may depend on not only the design of the tax system but also how governments spend the revenue it generates.`,
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
        <details className={styles.abstractDetails} open={abstractOpen} onToggle={() => setAbstractOpen(!abstractOpen)}>
          <summary className={styles.abstractSummary}>
            <span className={styles.abstractTriangle}></span>
            <span className={styles.abstractLabel}>Show Abstract</span>
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
        {/* Profile Section */}
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
                <li><strong>PhD Economics</strong> (in progress) – McMaster University</li>
                <li><strong>M.A. Economics</strong> – McMaster University (2021)</li>
                <li><strong>B.A. Honours Economics</strong> – Wilfrid Laurier University (2019)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutHeading}>About</h2>
          <p className={styles.aboutText}>
            I am a Ph.D. candidate in economics at McMaster University, currently on the 2026–27 academic job market. My research focuses on questions in public finance using empirical methods from applied microeconomics alongside experimental methods. I study how personal tax systems influence individual behaviour, with particular attention to labour supply, migration and tax avoidance.
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
                I began my academic career expecting to pursue experimental economics, but my broader interest in income inequality led me towards empirical public finance. I am very happy with the toolkit I have developed. If existing data are insufficient to pursue an idea or identify an underlying mechanism, I can always design an experiment, collect my own data in the lab, and figure out what’s driving the behaviour. I am particularly interested in how tax policy affects tax avoidance and evasion and how fiscal policy can reduce income inequality. My prior and current research explores how tax systems influence the choices individuals make to avoid taxation. My future research will extend this agenda to tax evasion and optimal enforcement. I plan to study the joint design of tax schedules and audit policy when audit costs and expected revenue vary across the income distribution, examining how governments should allocate limited enforcement resources.
              </p>
            </div>
          )}
        </section>

        {/* Job Market Paper Section */}
        <section id="research" className={styles.researchSection}>
          <h2 className={styles.sectionHeading}>Job Market Paper</h2>
          <PaperComponent paper={jobMarketPaper} onRequestModal={openRequestModal} />
        </section>

        {/* Working Papers Section */}
        <section className={styles.researchSection}>
          <h2 className={styles.sectionHeading}>Working Papers</h2>
          <div className={styles.papersContainer}>
            {workingPapers.map((paper) => (
              <PaperComponent key={paper.id} paper={paper} onRequestModal={openRequestModal} />
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
